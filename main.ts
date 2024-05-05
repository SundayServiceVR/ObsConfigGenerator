import * as path from "https://deno.land/std/path/mod.ts";

import { S4ObsConfig } from "./src/obsConfig.ts";
import { SceneType } from "./src/obsConfig.ts";

const cwd = Deno.cwd();

const output_directory = path.join(cwd, "output");
const output_path = path.join(output_directory, "S4-Generated.json");

try {
  await Deno.mkdir(output_directory);
} catch {
  // Do Nothing, I hate it.  What if the error is for something weird?
}

await Deno.create(output_path);

const s4Config = new S4ObsConfig(
  name = `Sunday Service (${new Date(Date.now()).toDateString()})`,
);
s4Config.addScene(
  "Lebull",
  SceneType.Stream,
  "rtmp://stream.vrcdn.live/live/lebull",
);
s4Config.addScene(
  "Frosty",
  SceneType.Stream,
  "rtmp://stream.vrcdn.live/live/lebull",
);
s4Config.addScene(
  "Strawbs",
  SceneType.Stream,
  "rtmp://stream.vrcdn.live/live/strawbs",
);

await Deno.writeTextFile(output_path, s4Config.getConfig());
