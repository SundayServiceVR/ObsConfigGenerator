import {
  archiveCurrentS4SceneCollections,
} from "./src/obsSceneCollectionManagement.ts";
import { createDirectories } from "./src/directories.ts";

import { generateSceneCollectionFromWhiteboard } from "./src/obsSceneCollectionManagement.ts";
import { copySceneCollectionAssets } from "./src/assetsManagement.ts";

// prompt("Make sure to close OBS, then press enter.");

await createDirectories();
await copySceneCollectionAssets();
await archiveCurrentS4SceneCollections();
await generateSceneCollectionFromWhiteboard();

console.log("Done");
