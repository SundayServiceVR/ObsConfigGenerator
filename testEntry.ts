import { downloadPrerecords } from "./src/prerecordManagement.ts";

console.log(JSON.stringify(
  await downloadPrerecords(),
  null,
  4,
));
