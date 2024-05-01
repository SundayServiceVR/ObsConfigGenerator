import * as path from "https://deno.land/std/path/mod.ts";
import { exists } from "https://deno.land/std@0.224.0/fs/mod.ts";

const userHomePath = Deno.env.get("APPDATA");
if (!userHomePath) {
  throw (new Error("Environment Variable 'APPDATA' is not set"));
}

const sceneFolderPath = path.join(userHomePath, "\\obs-studio\\basic\\scenes");
const backupSceneFolderPath = path.join(
  userHomePath,
  "\\obs-studio\\basic\\s4-backup-scenes",
);

const sceneFiles: string[] = [];
for await (const file of Deno.readDir(sceneFolderPath)) {
  if (file.name.endsWith(".json")) {
    sceneFiles.push(file.name);
  }
}

if (sceneFiles.length !== 1) {
  throw (new Error(
    `Expected exactly 1 configuration file to be present, but found ${sceneFiles.length}`,
  ));
}

const sceneFilepath = path.join(sceneFolderPath, sceneFiles[0]);
const backupSceneFilepath = path.join(
  backupSceneFolderPath,
  `${sceneFiles[0]}.${Date.now().toString()}.bak`,
);

if (!exists(backupSceneFolderPath)) {
  await Deno.mkdir(backupSceneFolderPath);
}

await Deno.copyFile(sceneFilepath, backupSceneFilepath);

console.log(sceneFilepath);
