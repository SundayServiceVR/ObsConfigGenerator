import { exec } from "https://deno.land/x/exec@0.0.5/mod.ts";
import { rootRoamingS4Path } from "../filepaths.ts";

export async function openDataFolder() {
  const folderPath = rootRoamingS4Path;
  if (Deno.build.os === "windows") {
    await exec(`explorer "${folderPath}"`);
  } else if (Deno.build.os === "darwin") {
    await exec(`open "${folderPath}"`);
  } else if (Deno.build.os === "linux") {
    await exec(`xdg-open "${folderPath}"`);
  } else {
    console.error("Unsupported operating system.");
  }
}
