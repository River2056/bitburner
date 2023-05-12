const fs = require("node:fs");

const main = () => {
  const content = fs.readFileSync("./save.json", {encoding: "utf-8"});
  const buffer = new Buffer.from(content, "base64");
  const obj = JSON.parse(buffer.toString("ascii"));

  // PlayerSave data
  const playerObj = JSON.parse(obj.data.PlayerSave);
  playerObj.data.skills.hacking = 9000;
  playerObj.data.money = 9999999999.652245767;

  const editted = JSON.stringify(playerObj);
  obj.data.PlayerSave = editted;

  const reformatted = JSON.stringify(obj);
  const edittedBuffer = new Buffer.from(reformatted);
  const newBase64 = edittedBuffer.toString("base64");

  fs.writeFileSync("./converted.json", newBase64, {encoding: "utf-8"});
};

main();
