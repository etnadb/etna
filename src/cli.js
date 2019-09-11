import commander from "commander";
const { version } = require("../package.json");

const etna = new commander.Command();

etna
  .version(version)
  .option('-p, --port <port>', 'Set the Etna server websocket port');

etna.parse(process.argv);