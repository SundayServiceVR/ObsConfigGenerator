import {
  archiveCurrentS4SceneCollections,
} from "./obsSceneCollectionManagement.ts";
import {
  createDirectories,
  s4vrSceneCollectionArchiveFolder,
} from "./filepaths.ts";

import { generateSceneCollectionFromWhiteboard } from "./obsSceneCollectionManagement.ts";
import {
  copySceneCollectionAssets,
  downloadMediaRecource,
} from "./assetsManagement.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { exists } from "https://deno.land/std/fs/exists.ts";
import { openDataFolder } from "./util/executors.ts";
import { downloadPrerecords } from "./prerecordManagement.ts";

async function cleanupArchives() {
  const archiveFolder = s4vrSceneCollectionArchiveFolder;

  if (await exists(archiveFolder)) {
    for await (const file of Deno.readDir(archiveFolder)) {
      const filePath = path.join(archiveFolder, file.name);
      await Deno.remove(filePath, { recursive: true });
      console.log(`Removed: ${filePath}`);
    }
    console.log("Archives cleaned up.");
  } else {
    console.log("Archive folder does not exist.");
  }
}

async function generateWeeklySceneCollection() {
  console.log("Copying stream assets");
  await copySceneCollectionAssets();
  console.log("Downloading endsong.");
  await downloadMediaRecource(
    `https://drive.google.com/uc?export=download&id=1k0Vd1ciDm9Ny_o9QjQvLOOkaq8GqNsHP`,
    "end_video.mp4",
    "ASSETS",
  );
  console.log("Archiving old scene collections");
  await archiveCurrentS4SceneCollections();
  console.log("Archiving old scene collections");
  await generateSceneCollectionFromWhiteboard();
  console.log("Weekly Scene Collection generated.");
}

export async function cli() {
  await createDirectories();
  while (true) {
    console.log("\n=== Sunday Service ObsConfigGenerator ===");
    console.log("1. Generate Weekly Scene Collection");
    console.log("2. Cleanup Archives");
    console.log("3. Open data folder");
    console.log("4. Download prerecords");
    console.log("q. Quit");
    const input = prompt("Enter your choice: ");
    switch (input) {
      case "1":
        await generateWeeklySceneCollection();
        break;
      case "2":
        await cleanupArchives();
        break;
      case "3":
        await openDataFolder();
        break;
      case "4":
        console.log(JSON.stringify(
          await downloadPrerecords(),
          null,
          4,
        ));
        break;
      case "q":
        console.log("Exiting...");
        Deno.exit(0);
        break;
      default:
        console.log("Invalid option.");
    }
  }
}
