import React from "react";
import "./board.css";

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
        <a className="boardButton">{this.state.name}</a>
      </div>
    );
  }
}

class BoardTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.BoardTitle
    };
  }

  render() {
    return (
      <div className="boardTitle">
        <table>
          <tbody>
          <tr>
          <td>
            <BoardButton buttonName={this.state.title} />
          </td>
          <td style={{ color: "white" }}>|</td>
          <td>
            <BoardButton buttonName="Menu" />
          </td>
          <td style={{ color: "white" }}>|</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default BoardTitle;
