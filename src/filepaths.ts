import * as path from "https://deno.land/std/path/mod.ts";

const roamingPath = Deno.env.get("APPDATA") ?? "~/Library/Application Support";

export const rootRoamingS4Path = path.join(
  roamingPath,
  "/s4vr/",
);

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
  roamingPath,
  "/obs-studio/basic/scenes",
);

export const s4vrSceneCollectionArchiveFolder = path.join(
  rootRoamingS4Path,
  "/archives/sceneCollections",
);

export const s4vrPreRecordsFolder = path.join(
  rootRoamingS4Path,
  "/prerecords",
);

export const s4vrSceneCollectionAssetsFolder = path.join(
  rootRoamingS4Path,
  "/sceneCollections/assets",
);

export const localSceneCollectionAssetsFolder = "./sceneCollectionAssets";
