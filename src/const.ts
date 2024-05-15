import * as path from "https://deno.land/std/path/mod.ts";

export const obsSceneCollectionFolder = path.join(
  Deno.env.get("APPDATA"),
  "\\obs-studio\\basic\\scenes",
);

export const sceneCollectionPrefix = "Sunday_Service_";
