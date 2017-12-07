import React from "react";
import { THEMES_DATA_0, THEMES_DATA_1, THEMES_DATA_2 } from "../api/model.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Desk from "./Desk";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as deskActions from '../actions/deskActions';

import "./desk.css";

class DeskList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const blocksTemp = [];
    const routes = [];
    const desks = this.props.desks;

    console.log("DeskList::render: ")

    if (desks) {
      for (var i = 0; i < desks.length; i++) {
        var path = "/" + i;

        blocksTemp.push(
          <th className="deskTop_name">
            <Link to={path}>{desks[i].title}</Link>
          </th>
        );
      }

      routes.push(<Route path="/0" component={Desk} />);
      routes.push(<Route path="/1" component={Desk} />);
      routes.push(<Route path="/2" component={Desk} />);
    }

    return (
      <Router>
        <div>
          <table>
            <tbody>
              <tr>{blocksTemp}</tr>
            </tbody>
          </table>
          {routes}
        </div>
      </Router>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return { desks: state.desks };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(deskActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeskList);
