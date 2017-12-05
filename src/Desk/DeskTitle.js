import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import DeskButton from "./DeskButton";

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Menu"
    };
  }

  render() {
    return (
      <div>
        <button> {this.state.title} </button>
      </div>
    );
  }
}

class DeskTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.deskTitle
    };
  }

  render() {
    return (
      <div>
        <DeskButton name={this.state.title} />
        <MenuButton />
      </div>
    );
  }
}

export default DeskTitle;
