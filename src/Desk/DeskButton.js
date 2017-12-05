import React from "react";
import { THEMES_DATA_0, THEMES_DATA_1, THEMES_DATA_2 } from "../model";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Desk from "./Desk";

class DeskButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.buttonName
    };
  }

  render() {
    return (
      <div>
        <button>{this.state.name}</button>
      </div>
    );
  }
}

export default DeskButton;
