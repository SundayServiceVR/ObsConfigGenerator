import { mapWhiteboardSlotToObsSlot } from "./whiteboardSlotToObsMapper.tsx";

export async function getWhiteboard() {
  const response = await fetch("https://whiteboard-diczrrhb6a-uc.a.run.app/");
  const whiteboard = await response.json();
  return whiteboard;
}

export async function getWhiteboardSlotsMapped() {
  return (await getWhiteboard()).event.slots.map(mapWhiteboardSlotToObsSlot);
}
