import React from "react";
import Block from "./Block";
//import Popover from "./Click"

//export default ({ name }) => <h1>Hello {name}!</h1>;

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(window.innerHeight);
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "O" : "     I     "}
      </button>
    );
  }
}

class Theme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      blocks: props.blocks,
      popupVisible: false
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      popupVisible: !prevState.popupVisible
    }));

    console.log("Theme.handleClick");
  }

  render() {
    const blocksTemp = [];

    if (this.state.blocks) {
      for (var i = 0; i < this.state.blocks.length; i++) {
        blocksTemp.push(
          <Block
            title={this.state.blocks[i].title}
            snippet={this.state.blocks[i].data}
          />
        );
      }
    }
    return (
      <div style={ThemeStyle}>
        <div style={Row}>
          <div style={Column}>
            <div style={ThemeTitleStyle}>{this.state.title}</div>
          </div>
        </div>
        <div style={Row}>{blocksTemp}</div>
        <button
          style={{
            backgroundColor: "#e2e4e6",
            marginLeft: "80px",
            textAlign: "center",
            cursor: "pointer",
            border: "none"
          }}
        >
          Добавить карточку...
        </button>
      </div>
    );
  }
}

const BlockListStyle = {
  overflowY: "scroll",
  height: "300px"
};

const ThemeStyle = {
  width: "300px",
  display: "inline-block",
  height: "100%",
  overflow: "hidden",
  minheight: "100px",
  backgroundColor: "#e2e4e6",
  boxShadow: "1px 1px 1px rgba(0, 0, 0, .5)",
  borderRadius: "3px",
  paddingBottom: "20px",
  marginRight: "10px",
  marginLeft: "10px",
  verticalAlign: "top"
};

const Row = {
  display: "table",
  width: "100%" /*Optional*/,
  tableLayout: "fixed" /*Optional*/,
  borderSpacing: "10px" /*Optional*/,
  overflowY: "scroll"
};

const Column = {
  display: "table-cell"
  //backgroundColor: "red" /*Optional*/
};

const ThemeTitleStyle = {
  position: "relative",
  padding: "5px 8px",
  fontWeight: "bold",
  whiteSpace: "normal",
  width: "100%"
  //fontSize: "8px"
};

export default Theme;
