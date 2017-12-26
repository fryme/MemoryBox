import React from "react";
import { THEMES_DATA_0, THEMES_DATA_1, THEMES_DATA_2 } from "../api/model.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Desk from "./Desk";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setBlockViewVisible } from "../actions/deskActions";
import PropTypes from 'prop-types'

import "./desk.css";

class DeskList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    
    
  }
  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch(setBlockViewVisible(false ));
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

const mapDispatchToProps = (dispatch) => {
  return {
    isVisible: (st) => {dispatch(setBlockViewVisible(st))
    }
  };
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps)
(DeskList);
