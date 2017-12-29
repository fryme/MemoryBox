import React from "react";
import "./desk.css";

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
        <a className="deskButton">{this.state.name}</a>
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
      <div className="deskTitle">
        <table>
          <tbody>
          <tr>
          <td>
            <DeskButton buttonName={this.state.title} />
          </td>
          <td style={{ color: "white" }}>|</td>
          <td>
            <DeskButton buttonName="Menu" />
          </td>
          <td style={{ color: "white" }}>|</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DeskTitle;
