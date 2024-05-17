import * as path from "https://deno.land/std/path/mod.ts";

export const sceneCollectionPrefix = "Sunday_Service";

export async function createDirectories() {
  await Deno.mkdir(
    s4vrSceneCollectionArchiveFolder,
    { recursive: true },
  );
  await Deno.mkdir(
    s4vrPreRecordsFolder,
    { recursive: true },
  );
}

// TODO:  I think this is the only thing blocking mac compatibility,
// and I know at least one person streams from a mac.
export const obsSceneCollectionFolder = path.join(
  Deno.env.get("APPDATA"),
  "\\obs-studio\\basic\\scenes",
);

export const s4vrSceneCollectionArchiveFolder = path.join(
  Deno.env.get("APPDATA"),
  "\\s4vr\\archives\\sceneCollections",
);

export const s4vrPreRecordsFolder = path.join(
  Deno.env.get("APPDATA"),
  "\\s4vr\\prerecords",
);

export const s4vrSceneCollectionAssetsFolder = path.join(
  Deno.env.get("APPDATA"),
  "\\s4vr\\sceneColletions\\assets",
);

export const localSceneCollectionAssetsFolder = "./sceneCollectionAssets";
