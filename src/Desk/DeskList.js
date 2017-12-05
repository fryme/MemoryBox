import React from "react";
import { THEMES_DATA_0, THEMES_DATA_1, THEMES_DATA_2 } from "../model.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Desk from "./Desk";

import "./desk.css";

class DeskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desks: props.desksList
    };
  }

  render() {
    const blocksTemp = [];
    const routes = [];

    if (this.state.desks) {
      for (var i = 0; i < this.state.desks.length; i++) {
        var path = "/" + i;

        blocksTemp.push(
          <td class="deskTop_name">
            <Link to={path}>{this.state.desks[i].title}</Link>
          </td>
        );
      }

      routes.push(<Route path="/0" component={Desk} />);
      routes.push(<Route path="/1" component={Desk} />);
      routes.push(<Route path="/2" component={Desk} />);
    }

    return (
      <Router>
        <div>
          <table>{blocksTemp}</table>
          {routes}
        </div>
      </Router>
    );
  }
}

export default DeskList;
