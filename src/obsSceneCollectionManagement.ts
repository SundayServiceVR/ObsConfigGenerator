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
import { sceneTemplate } from "./obsSceneData.tsx";
import { findSceneTemplate, templateName } from "./templateManagement.ts";

export async function archiveCurrentS4SceneCollections() {
  const currentSceneCollections = (await getCurrentS4SceneCollections()).filter(
    (collection) => !collection.name.startsWith(templateName),
  );
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
    case "VRCDN":
      return slot.stream_source_url;
    case "TWITCH":
      return `${slot.stream_source_url}/embed?frameborder="0"`;
    case "PRERECORD":
      return slot.prerecord_url;
    default:
      return ""; // Will be notaded with MANUAL SOURCE
  }
}

async function saveSceneTemplateAsS4Template() {
  const outputPath = path.join(
    obsSceneCollectionFolder,
    `${templateName}.json`,
  );
  // const templateConfig = {
  //   sources: [scene],
  // };
  // await Deno.writeTextFile(outputPath, JSON.stringify(templateConfig, null, 2));

  const templateFilePath = path.join(
    obsSceneCollectionFolder,
    "./template/Sunday_Service-template.json",
  );
  const templateContent = await Deno.readTextFile(templateFilePath);
  await Deno.writeTextFile(outputPath, templateContent);

  console.log(`Saved ${templateName} to ${outputPath}`);
}

export async function generateSceneCollectionFromWhiteboard() {
  const nextEventSlots = (await getNextEvent()).slots;

  let templateScene = await findSceneTemplate();

  if (!templateScene) {
    const userResponse = prompt(
      "S4-Template scene not found. Would you like to create one? (yes/no)",
    );
    if (userResponse?.toLowerCase() === "yes") {
      const newTemplateScene = sceneTemplate(
        { name: "Default Source", uuid: crypto.randomUUID() },
        "S4-Template",
      );
      await saveSceneTemplateAsS4Template();
      templateScene = newTemplateScene;
    } else {
      console.log("Using default base_config as the starting point.");
    }
  }

  const outputPath = path.join(
    obsSceneCollectionFolder,
    `${sceneCollectionPrefix}-${Date.now().toString()}.json`,
  );

  await Deno.create(outputPath);

  const s4Config = new S4ObsConfig(
    name = `S4VR (Generated ${new Date(Date.now()).toDateString()}-${
      new Date(Date.now()).toLocaleTimeString()
    })`,
  );

  if (templateScene) {
    s4Config.config.sources.push(templateScene);
    console.log(`Using ${templateName} as the starting point.`);
  }

  console.log(`Generating Scene Collection: ${s4Config.config.name}`);

  nextEventSlots.forEach((slot: any, index: number) => {
    s4Config.addScene(
      index,
      slot.name,
      slot.stream_source_type ?? SceneType.Unknown,
      getSourceUrlFromSlot(slot),
    );
  });

  await Deno.writeTextFile(
    outputPath,
    s4Config.getConfig().replaceAll(
      "%SCENE_ASSET_PATH%",
      s4vrSceneCollectionAssetsFolder.replaceAll("\\", "\\\\"),
    ),
  );
}
