import * as path from "https://deno.land/std/path/mod.ts";
import { obsSceneCollectionFolder, sceneCollectionPrefix } from "./const.ts";

export async function getCurrentS4Configs() {
  for await (const dirEntry of Deno.readDir(obsSceneCollectionFolder)) {
    if (!dirEntry.name.startsWith(sceneCollectionPrefix)) {
      continue;
    }

    console.log(path.join(obsSceneCollectionFolder, dirEntry.name));
  }
}
