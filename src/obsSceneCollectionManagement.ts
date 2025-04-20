import * as path from "https://deno.land/std/path/mod.ts";
import {
  obsSceneCollectionFolder,
  s4vrSceneCollectionArchiveFolder,
  s4vrSceneCollectionAssetsFolder,
  sceneCollectionPrefix,
} from "./filepaths.ts";
import { S4ObsConfig } from "./util/classes.ts";
import { getNextEvent } from "./whiteboard.ts";
import { SceneType } from "./util/types.ts";

export async function archiveCurrentS4SceneCollections() {
  const currentSceneCollections = await getCurrentS4SceneCollections();
  currentSceneCollections.forEach((dirEntry) => {
    const fullPath = path.join(obsSceneCollectionFolder, dirEntry.name);
    const targetPath = path.join(
      s4vrSceneCollectionArchiveFolder,
      dirEntry.name,
    );
    Deno.renameSync(fullPath, targetPath);
    console.log(`Archived: ${fullPath} -> ${targetPath}`);
  });
}

export async function getCurrentS4SceneCollections(): Promise<Deno.DirEntry[]> {
  const result = [];
  for await (const dirEntry of Deno.readDir(obsSceneCollectionFolder)) {
    if (!dirEntry.name.startsWith(sceneCollectionPrefix)) {
      continue;
    }

    result.push(dirEntry);
  }

  return result;
}

function getSourceUrlFromSlot(slot: any) {
  switch (slot.stream_source_type) {
    case "RTMP":
      return slot.stream_source_url;
    case "TWITCH":
      return `${slot.stream_source_url}/embed?frameborder="0"`;
    case "PRERECORD":
      return slot.prerecord_url;
    default:
      return ""; // Will be notaded with MANUAL SOURCE
  }
}

export async function generateSceneCollectionFromWhiteboard() {
  const nextEventSlots = (await getNextEvent()).slots;

  const output_path = path.join(
    obsSceneCollectionFolder,
    `${sceneCollectionPrefix}-${Date.now().toString()}.json`,
  );

  await Deno.create(output_path);

  const s4Config = new S4ObsConfig(
    name = `S4VR (Generated ${new Date(Date.now()).toDateString()}-${
      new Date(Date.now()).toLocaleTimeString()
    })`,
  );

  console.log(`Generating Scene Collection: ${s4Config.config.name}`);

  nextEventSlots.forEach((slot: any, index: number) => {
    s4Config.addScene(
      index,
      slot.name,
      slot.stream_source_type ?? SceneType.Unknown,
      getSourceUrlFromSlot(slot),
    );
  });

  // We need to replace all asset paths from the template config with the user's actual working directory (independent of OS).
  // We additionally need to escape all backslashes for Windows to keep valid JSON.
  await Deno.writeTextFile(
    output_path,
    s4Config.getConfig().replaceAll(
      "%SCENE_ASSET_PATH%",
      s4vrSceneCollectionAssetsFolder.replaceAll("\\", "\\\\"),
    ),
  );
}
