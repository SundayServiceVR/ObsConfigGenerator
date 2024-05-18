import * as path from "https://deno.land/std/path/mod.ts";
import {
  obsSceneCollectionFolder,
  s4vrSceneCollectionArchiveFolder,
  sceneCollectionPrefix,
} from "./directories.ts";
import { S4ObsConfig } from "./obsConfig.ts";
import { getWhiteboardSlotsMapped } from "./whiteboard.ts";

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

export async function generateSceneCollectionFromWhiteboard() {
  const whiteboard = await getWhiteboardSlotsMapped();

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

  whiteboard.forEach((slot: any, index: number) => {
    s4Config.addScene(
      index,
      slot.dj.name,
      slot.slotType,
      slot.mediaSourceUrl,
    );
  });

  await Deno.writeTextFile(output_path, s4Config.getConfig());
}
