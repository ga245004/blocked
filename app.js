const path = require("path");
const express = require("express");
const Explorer = require("./server/explorer");
const ExplorerApi = require("./server/ExplorerApi");

const DIST_DIR = path.join(__dirname, "dist");
const DATA_DIR = path.join(__dirname, "data");
const options = {
  server: "https://blockexplorer.com",
  blockFolder: path.join(DATA_DIR, "blocks")
};

const explorer = new Explorer(options);
const app = express();

const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config");
const compiler = webpack(webpackConfig);
app.use(middleware(compiler, webpackConfig.devServe));
app.use(hotMiddleware(compiler));

//app.use(express.static(DIST_DIR));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(DIST_DIR, "index.html"));
// });

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
  //explorer.start();
  new ExplorerApi(app, DATA_DIR);
});
