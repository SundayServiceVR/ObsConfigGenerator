import * as path from "https://deno.land/std/path/mod.ts";

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

export const obsSceneCollectionFolder = path.join(
  Deno.env.get("APPDATA"),
  "\\obs-studio\\basic\\scenes",
);

export const sceneCollectionPrefix = "Sunday_Service";

export const s4vrSceneCollectionArchiveFolder = path.join(
  Deno.env.get("APPDATA"),
  "\\s4vr\\archives\\sceneCollections",
);

export const s4vrPreRecordsFolder = path.join(
  Deno.env.get("APPDATA"),
  "\\s4vr\\prerecords",
);
