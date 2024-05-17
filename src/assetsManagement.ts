import { copy } from "https://deno.land/std@0.224.0/fs/copy.ts";

import {
  localSceneCollectionAssetsFolder,
  s4vrSceneCollectionAssetsFolder,
} from "./directories.ts";

export async function copySceneCollectionAssets() {
  await copy(
    localSceneCollectionAssetsFolder,
    s4vrSceneCollectionAssetsFolder,
    {
      overwrite: true,
      preserveTimestamps: true,
    },
  );
}
