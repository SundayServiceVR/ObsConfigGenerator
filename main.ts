import {
  archiveCurrentS4SceneCollections,
} from "./src/obsSceneCollectionManagement.ts";
import { createDirectories } from "./src/folderManagement.ts";

import { generateSceneCollectionFromWhiteboard } from "./src/obsSceneCollectionManagement.ts";
import {
  copySceneCollectionAssets,
  downloadMp4ToAssetsFolder,
} from "./src/assetsManagement.ts";

// prompt("Make sure to close OBS, then press enter.");

await downloadMp4ToAssetsFolder(
  `https://drive.google.com/uc?export=download&id=1k0Vd1ciDm9Ny_o9QjQvLOOkaq8GqNsHP`,
  "end_video.mp4",
  "ASSETS",
);
await createDirectories();
await copySceneCollectionAssets();
await archiveCurrentS4SceneCollections();
await generateSceneCollectionFromWhiteboard();

console.log("Done");
