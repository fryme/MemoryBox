import React from "react";
import { GetBlockView } from "./BlockView";
import BlockView from "./BlockView";

import "./block_style.css";

//export default ({ name }) => <h1>Hello {name}!</h1>;

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      snippet: props.snippet,
      viewOpen: false,
      isHovering: false
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    //this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  handleClick() {
    console.log("Block.handleClick");
    var bv = GetBlockView();
    //bv.handleClick();

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
      <div
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {this.state.viewOpen && (
          <BlockView text={this.state.snippet} title={this.state.title} />
        )}

        <a class="blockButton" onClick={this.handleClick}>
          <div class="blockTitle">{this.state.title}</div>
        </a>
      </div>
    );
  }
}

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
  width: "100%",
  height: "100%",
  textAlign: "left"
};
export default Block;
