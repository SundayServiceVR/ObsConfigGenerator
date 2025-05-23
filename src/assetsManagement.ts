import { copy } from "https://deno.land/std@0.224.0/fs/copy.ts";
import { exists } from "https://deno.land/std@0.224.0/fs/exists.ts";
import { download } from "https://deno.land/x/download/mod.ts";
import { join } from "https://deno.land/std@0.224.0/path/mod.ts"; // Import the join function

import {
  localSceneCollectionAssetsFolder,
  s4vrPreRecordsFolder,
  s4vrSceneCollectionAssetsFolder,
} from "./folderManagement.ts";

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

export async function downloadMp4ToAssetsFolder(
  source_url: string,
  output_filename: string,
  destination: "ASSETS" | "PRERECORDS" = "PRERECORDS",
) {
  const destinationDir = destination === "ASSETS"
    ? s4vrSceneCollectionAssetsFolder
    : s4vrPreRecordsFolder;

  // Use path.join instead of string concatenation
  const outputFilePath = join(destinationDir, output_filename);

  // Check if the file already exists
  if (await exists(outputFilePath)) {
    console.log(`File already exists at: ${outputFilePath}`);
    return;
  }

  // Download the file if it doesn't exist
  const downloadedFile = await download(source_url, {
    file: output_filename,
    dir: destinationDir,
  });

  console.log(`File downloaded to: ${downloadedFile.fullPath}`);
}
