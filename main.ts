import * as path from "https://deno.land/std/path/mod.ts";

import obsConfig from "./scenes/base_config.json" with { type: "json" };
import { addScene, SceneType } from "./obsConfig.ts";

const cwd = Deno.cwd();

const output_directory = path.join(cwd, "output");
const output_path = path.join(output_directory, "S4-Generated.json");

try {
  await Deno.mkdir(output_directory);
} catch {
  // Do Nothing, I hate it.  What if the error is for something weird?
}

await Deno.create(output_path);

const updatedConfig = addScene(
  "Slot 1 - Lebull",
  SceneType.Stream,
  "rtmp://stream.vrcdn.live/live/lebull",
  obsConfig,
);

await Deno.writeTextFile(output_path, JSON.stringify(updatedConfig));
