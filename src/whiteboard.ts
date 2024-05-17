export async function getWhiteboardSlotsMapped() {
  return (await getWhiteboard()).event.slots.map(mapWhiteboardSlotToObsSlot);
}

async function getWhiteboard() {
  const response = await fetch("https://whiteboard-diczrrhb6a-uc.a.run.app/");
  const whiteboard = await response.json();
  return whiteboard;
}

function mapWhiteboardSlotToObsSlot(slot: any) {
  const returnSlot = { ...slot };

  if (returnSlot.slotType === "TWITCH") {
    returnSlot.mediaSourceUrl =
      `https://twitch.tv/${slot.twitchUserName}/embed?frameborder="0"`;
  }

  return returnSlot;
}
