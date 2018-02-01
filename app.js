const path = require("path");
const Explorer = require("./scr/explorer");

const options = {
  server: "https://blockexplorer.com",
  blockFolder: path.join(__dirname, "data", "blocks")
};

var explorer = new Explorer(options);
explorer.start();
