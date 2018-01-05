import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Board from "./Board";
import { connect } from 'react-redux';

import * as boardActions from "../actions/boardActions";

import "./board.css";

class BoardList extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;

    dispatch(boardActions.fetchAllBoards())
  }

  componentWillReceiveProps(nextProps) {
    console.log("BoardList.componentWillReceiveProps" + JSON.stringify(nextProps))
  }

  render() {
    const boardsTemp = [];
    const routes = [];
    const boards = this.props.boards.boards;
    
    if (boards) {
      for (var i = 0; i < boards.length; i++) {
        var path = "/" + boards[i].id;

        boardsTemp.push(
          <th key={i} className="boardTop_name">
            <Link key={i} to={path} >{boards[i].title}</Link>
          </th>
        );
        routes.push(<Route key={i} path={path} component={Board} />);
      }
    }

    return (
      <Router>
        <div>
          <table>
            <tbody>
              <tr>{boardsTemp}</tr>
            </tbody>
          </table>
          {routes}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    boards: state.boards
  };
}

export default connect(
  mapStateToProps)
(BoardList);
