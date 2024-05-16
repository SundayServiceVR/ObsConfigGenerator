import {
  archiveCurrentS4SceneCollections,
} from "./src/obsSceneCollectionManagement.ts";
import { createDirectories } from "./src/directories.ts";

import { generateSceneCollectionFromWhiteboard } from "./src/obsSceneCollectionManagement.ts";

createDirectories();
archiveCurrentS4SceneCollections();
await generateSceneCollectionFromWhiteboard();
