export async function getNextEvent() {
  const response = await fetch("https://nextevent-diczrrhb6a-uc.a.run.app/");
  const whiteboard = await response.json();

  // console.log(JSON.stringify(whiteboard, null, 4));

  if (!whiteboard.name || !whiteboard.start_datetime) {
    throw new Error("Unable to find a published event.");
  }

  console.log(
    `Using Published Event: ${whiteboard.name}: ${whiteboard.start_datetime} (${whiteboard.slots.length} slots)`,
  );

  return whiteboard;
}
