const rest = require("restler");
const path = require("path");
const fs = require("fs");

module.exports = class Explorer {
  constructor(options) {
    console.log("new Explorer()..");
    this.props = options;
  }

  hasBlock(hash) {
    console.log("hasBlock()", hash);
    let { blockFolder } = this.props;
    let hashPath = path.join(blockFolder, hash + ".json");
    if (fs.existsSync(hashPath)) {
      return hashPath;
    }
    return false;
  }

  readBlock(hash) {
    console.log("readBlock()", hash);
    let { blockFolder } = this.props;
    let hashPath = this.hasBlock(hash);
    if (hashPath) {
      let hashBlock = fs.readFileSync(hashPath);
      return JSON.parse(hashBlock);
    }
    return null;
  }

  getBlock(hash, callback) {
    console.log("getBlock()", hash);
    let { server, blockFolder } = this.props;
    let hashPath = path.join(blockFolder, hash + ".json");
    rest.get(server + "/api/block/" + hash).on("complete", function(data) {
      console.log(data);
      if (data.hash && data.hash == hash) {
        fs.writeFileSync(hashPath, JSON.stringify(data));
        callback(data);
      } else {
        throw new Error("not able to fetch block hash " + hash);
      }
    });
  }

  getAllBlocks(hash) {
    let lastBlock = this.readBlock(hash);
    if (!lastBlock) {
      this.getBlock(
        hash,
        function() {
          this.getAllBlocks(hash);
        }.bind(this)
      );
    } else if (lastBlock.previousblockhash) {
      console.log(lastBlock.height);
      this.getAllBlocks(lastBlock.previousblockhash);
    }
  }

  start() {
    console.log("stating exploring..");
    let { server } = this.props;
    rest.get(server + "/api/status?q=getLastBlockHash").on(
      "complete",
      function(data) {
        console.log(data);
        if (data.lastblockhash) {
          this.getAllBlocks(data.lastblockhash);
        }
      }.bind(this)
    );
  }
};
