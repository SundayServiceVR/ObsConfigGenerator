export async function getNextEvent() {
  const response = await fetch("https://nextevent-diczrrhb6a-uc.a.run.app/");
  const whiteboard = await response.json();

  console.log(`Whiteboard State`);
  console.log(JSON.stringify(whiteboard, null, 4));

  return whiteboard;
}
