const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const DIST_DIR = path.join(__dirname, "dist");
const CLIENT_DIR = path.join(__dirname, "client");

module.exports = {
  context: CLIENT_DIR,
  entry: [
    "babel-polyfill",
    "webpack-hot-middleware/client",
    "react-hot-loader/patch",
    "./main.js"
  ],
  output: {
    path: DIST_DIR,
    filename: "bundle.js",
    publicPath: "/"
  },
  devtool: "inline-source-map",
  devServer: {
    publicPath: "/",
    hot: true
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(CLIENT_DIR, "index.html")
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
