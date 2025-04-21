import { DownloadedFile } from "https://deno.land/x/download@v2.0.2/types.ts";
import { downloadMediaRecource } from "./assetsManagement.ts";
import { getNextEvent } from "./whiteboard.ts";

export const isGoogleDriveShareLink = (url: string) => {
  const match = url.match(/https:\/\/drive\.google\.com\/file\/d\/([^/]+)\//);
  return match && match?.length > 0;
};

/**
 * Converts a Google Drive share link into a direct download link.
 * @param shareLink - The Google Drive share link.
 * @returns The direct download link.
 */
export const convertGoogleDriveLinkToDirectDownload = (
  shareLink: string,
): string => {
  const match = shareLink.match(
    /https:\/\/drive\.google\.com\/file\/d\/([^/]+)\//,
  );
  if (!match || match.length < 2) {
    throw new Error("Invalid Google Drive share link format.");
  }
  const fileId = match[1];
  return `https://drive.google.com/uc?id=${fileId}&export=download`;
};

/**
 * Sanitizes a string by removing or replacing invalid characters.
 * @param name - The string to sanitize.
 * @returns The sanitized string.
 */
const sanitizeName = (name: string): string => {
  return name.replace(/[^a-zA-Z0-9-_]/g, "_"); // Replace invalid characters with underscores
};

export const downloadPrerecords = async () => {
  const event = await getNextEvent();
  const slots: any[] = event.slots;
  const prerecords: {
    name: string;
    slot_index: number;
    source_url: string;
    direct_source_url: string;
    output_file: DownloadedFile | undefined;
  }[] = [];

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];

    if (slot.stream_source_type !== "PRERECORD") {
      continue;
    }

    const direct_source_url = isGoogleDriveShareLink(slot.stream_source_url)
      ? convertGoogleDriveLinkToDirectDownload(slot.stream_source_url)
      : slot.stream_source_url;

    const sanitizedSlotName = sanitizeName(
      `${event.start_datetime}-${slot.name}`,
    );

    console.log(`${slot.name} - download at ${direct_source_url}`);

    const resultFile = await downloadMediaRecource(
      direct_source_url,
      sanitizedSlotName,
      "PRERECORDS",
    );

    prerecords.push({
      name: slot.name,
      slot_index: i,
      source_url: slot.stream_source_url,
      direct_source_url,
      output_file: resultFile,
    });
  }

  return 4;
};
