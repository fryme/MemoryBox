import React from "react";
import { GetBlockView } from "./BlockView";
import BlockView from "./BlockView";

//export default ({ name }) => <h1>Hello {name}!</h1>;

const BlockStyle = {
  width: "90%",
  textAlign: "left",
  background: "#fff",
  borderRadius: "5px",
  borderColor: "#FaFaFa",
  boxShadow: "1px 1px 1px rgba(0,0,0,.3)",
  cursor: "pointer",
  paddingBottom: "10px",
  marginBottom: "10px"
};

const ItemTitleStyle = {
  padding: "5px 10px",
  borderBottom: "1px solid #dbdbdb",
  whiteSpace: "normal",
  wordBreak: "break-all",
  wordWrap: "break-world",
  fontFamily: "sans-serif",
  fontWeight: "bolder"
  //fontSize: "8px",
};

const ItemSnippetStyle = {
  padding: "5px 10px",
  whiteSpace: "normal",
  wordBreak: "break-all",
  wordWrap: "break-world"
  //fontSize: "8px",
  //fontWeight: "bolder"
};

const ButtonStyle = {
  backgroundColor: "transparent",
  backgroundRepeat: "norepeat",
  border: "none",
  cursor: "pointer",
  overflow: "hidden",
  outline: "none",
  border: "0",
  display: "block",
  width: "100%",
  height: "100%",
  textAlign: "left"
};

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      snippet: props.snippet,
      viewOpen: false
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    //this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleClick() {
    console.log("Block.handleClick");
    var bv = GetBlockView();
    bv.setVisible();

    this.setState(prevState => ({
      viewOpen: !prevState.viewOpen
    }));

    /*
    if (!this.state.viewOpen) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    */
  }

  handleOutsideClick(e) {
    console.log("Block.handleOutsideClick");

    /*
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
    */
  }

  render() {
    return (
      <div>
        {this.state.viewOpen && <BlockView title={this.state.title} />}

        <button style={BlockStyle} onClick={this.handleClick}>
          <div style={ItemTitleStyle}>{this.state.title}</div>
          <div style={ItemSnippetStyle}>{this.state.snippet}</div>
        </button>
      </div>
    );
  }
}

export default Block;
