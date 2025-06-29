import {
  obsSceneCollectionFolder,
  sceneCollectionPrefix,
} from "./filepaths.ts";
import { getCurrentS4SceneCollections } from "./obsSceneCollectionManagement.ts";
import * as path from "https://deno.land/std/path/mod.ts";

export const templateName = `${sceneCollectionPrefix}-Template`;

export async function copyTemplateFile() {
  const destinationPath = "./template/Sunday_Service-template.json";
  try {
    const sceneTemplate = await findSceneTemplate();

    const templateContent = JSON.stringify(sceneTemplate, null, 4);

    if (!templateContent) {
      throw new Error("Template content is empty or not found.");
    }

    await Deno.mkdir("./template", { recursive: true });

    await Deno.writeTextFile(destinationPath, templateContent);

    console.log(`Copied template to ${destinationPath}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to copy template file: ${error.message}`);
    } else {
      console.error("Failed to copy template file: Unknown error");
    }
  }
}

export async function findSceneTemplate(): Promise<any | null> {
  const sceneCollections = await getCurrentS4SceneCollections();
  for (const dirEntry of sceneCollections) {
    if (dirEntry.name === `${templateName}.json`) {
      const filePath = path.join(obsSceneCollectionFolder, dirEntry.name);
      const fileContent = await Deno.readTextFile(filePath);
      return JSON.parse(fileContent).sources[0]; // Assuming the template has a single scene
    }
  }
  console.log(`${templateName} not found.`);
  return null;
}
