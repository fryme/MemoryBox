import React from "react";
import Block from "./Block";

//export default ({ name }) => <h1>Hello {name}!</h1>;

const DeskStyle = {
  width: "500px",
  display: "inline-block",
  height: "100%",
  overflow: "hidden",
  minheight: "100px",
  backgroundColor: "#e2e4e6",
  boxShadow: "1px 1px 1px rgba(0, 0, 0, .5)",
  borderRadius: "3px",
  paddingBottom: "20px",
  paddingLeft: "20px",
  marginRight: "10px",
  marginLeft: "10px",
  verticalAlign: "top"
};

const Row =
{
    display: "table",
    width: "100%", /*Optional*/
    tableLayout: "fixed", /*Optional*/
    borderSpacing: "10px" /*Optional*/
}

const Column =
{
  display: "table-cell",
  //backgroundColor: "red" /*Optional*/
}

const DeskTitleStyle = {
  position: "relative",
  padding: "5px 8px",
  marginBottom: "10px",
  fontWeight: "bold",
  whiteSpace: "normal",
  width: "100%"
  //fontSize: "8px"
};


class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
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

class Desk extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: props.title };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <div style={DeskStyle}>
        <div style={Row}>
          <div style={Column}>
            <div style={DeskTitleStyle}>{this.state.title}</div>
          </div>
          <div style={Column}>
            <Toggle />
          </div>
        </div>
        <div>
          <Block
            title="This is a ugly block!"
            snippet="Content of ugly block"
          />
          <Block title="This is a bad block!" snippet="Other stuff" />
          <Block title="This is a good block!" snippet="Seems to be empty" />
        </div>
      </div>
    );
  }
}

export default Desk;