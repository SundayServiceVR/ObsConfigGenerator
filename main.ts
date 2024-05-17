import {
  archiveCurrentS4SceneCollections,
} from "./src/obsSceneCollectionManagement.ts";
import { createDirectories } from "./src/directories.ts";

import { generateSceneCollectionFromWhiteboard } from "./src/obsSceneCollectionManagement.ts";
import { copySceneCollectionAssets } from "./src/assetsManagement.ts";

createDirectories();
copySceneCollectionAssets();
archiveCurrentS4SceneCollections();
await generateSceneCollectionFromWhiteboard();
