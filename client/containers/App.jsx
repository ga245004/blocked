import React from "react";
import Api from "../Api";
import InfiniteScroll from "react-infinite-scroller";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      blockCount: 20,
      hasMoreBlock: true
    };
  }

  componentWillMount() {
    console.log("new App");
  }

  fetchAllBlocks(hash) {
    this.state.blockCount > 0 &&
      Api.getHash(hash).then(block => {
        let { blocks, blockCount } = this.state;
        blocks.push(block);
        this.setState({ blocks: blocks, blockCount: blockCount - 1 }, () => {
          //block.previousblockhash &&
          //  this.fetchAllBlocks(block.previousblockhash);
        });
      });
  }

  loadBlock() {
    let { blocks, blockCount } = this.state;
    if (blocks.length > 0) {
      let lastBlock = blocks[blocks.length - 1];
      Api.getHash(lastBlock.previousblockhash).then(block => {
        let { blocks } = this.state;
        blocks.push(block);
        this.setState(
          { blocks: blocks, hasMoreBlock: !!block.previousblockhash },
          () => {}
        );
      });
    }
  }

  componentWillMount() {
    Api.getLastHashKey().then(last => {
      console.log(last);
      this.fetchAllBlocks(last.lastblockhash);
    });
  }

  renderBlock(b) {
    return (
      <li
        key={b.hash}
        style={{ margin: 10, padding: 10, border: "1px solid black" }}
      >
        <div>
          <div>
            <label>Hash: </label>
            <label>{b.hash}</label>
          </div>
          <div>
            <label>Height: </label>
            <label>{b.height}</label>
          </div>
          <div>
            <label>Time: </label>
            <label>{b.time}</label>
          </div>
          <div>
            <label>Bits: </label>
            <label>{b.bits}</label>
          </div>
          <div>
            <label>Previous Hash: </label>
            <label>{b.previousblockhash}</label>
          </div>
          <div>
            <label>Merkle Root: </label>
            <label>{b.merkleroot}</label>
          </div>
          <div>
            <label>Nonce: </label>
            <label>{b.nonce}</label>
          </div>
        </div>
      </li>
    );
  }

  renderBlocks() {
    let { blocks } = this.state;
    let renderedBlocks = [];
    blocks.map(b => {
      renderedBlocks.push(this.renderBlock(b));
    });

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadBlock.bind(this)}
        hasMore={this.state.hasMoreBlock}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {renderedBlocks}
        </ul>
      </InfiniteScroll>
    );
  }

  render() {
    return <div>{this.renderBlocks()}</div>;
  }
}
