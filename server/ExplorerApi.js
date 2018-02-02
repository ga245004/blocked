const path = require("path");

class ExplorerApi {
  constructor(app, DATA_DIR) {
    this.app = app;
    this.routePrefix = "/api/";
    this.dataFolder = DATA_DIR;
    this.blocksFolder = path.join(this.dataFolder, "blocks");
    this.registerRoutes();
  }

  registerRoutes() {
    let p = this.__proto__;
    let routeList = Object.getOwnPropertyNames(p).filter(ps => {
      return ps.startsWith("get") || ps.startsWith("post");
    });
    console.log(routeList);
    routeList.map(
      function(r) {
        p[r].bind(this)();
      }.bind(this)
    );
  }

  getLastHashKey() {
    this.app.get(this.routePrefix + "getLastHashKey", (req, res) => {
      res.sendFile(path.join(this.blocksFolder, "lastHashKey.json"));
    });
  }

  getHash() {
    this.app.get(this.routePrefix + "getHash/:hash", (req, res) => {
      console.log(req.params);
      res.sendFile(path.join(this.blocksFolder, req.params.hash + ".json"));
    });
  }
}

module.exports = ExplorerApi;
