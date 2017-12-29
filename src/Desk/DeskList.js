import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Desk from "./Desk";
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { setBlockViewVisible } from "../actions/deskActions";
//import PropTypes from 'prop-types'

import "./desk.css";

class DeskList extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
  }

  render() {
    const blocksTemp = [];
    const routes = [];
    const desks = this.props.desks;

    console.log("DeskList::render: " + this.props.desks.length)

    if (desks) {
      for (var i = 0; i < desks.length; i++) {
        var path = "/" + i;

        blocksTemp.push(
          <th key={i} className="deskTop_name">
            <Link key={i} to={path}>{desks[i].title}</Link>
          </th>
        );
      }

      routes.push(<Route key={0} path="/0" component={Desk} />);
      routes.push(<Route key={1} path="/1" component={Desk} />);
      routes.push(<Route key={2} path="/2" component={Desk} />);
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

export default connect(
  mapStateToProps)
(DeskList);
