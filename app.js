const path = require("path");
const express = require("express");
const Explorer = require("./server/explorer");

const DIST_DIR = path.join(__dirname, "dist");
const options = {
  server: "https://blockexplorer.com",
  blockFolder: path.join(__dirname, "data", "blocks")
};

const explorer = new Explorer(options);
const app = express();

const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config");
const compiler = webpack(webpackConfig);
app.use(middleware(compiler, webpackConfig.devServe));

//app.use(express.static(DIST_DIR));

app.get("/", (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
  explorer.start();
});
