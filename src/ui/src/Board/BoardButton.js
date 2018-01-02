import React from "react";
import { BOARDS_DATA_0, BOARDS_DATA_1, BOARDS_DATA_2 } from "../model";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Board from "./Board";

class BoardButton extends React.Component {
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

export default BoardButton;
