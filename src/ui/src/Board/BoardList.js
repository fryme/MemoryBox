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
    //boards
  }

  render() {
    const boardsTemp = [];
    const routes = [];
    const boards = this.props.boards;

    console.log("BoardList::render: " + this.props.boards.length)

    if (boards) {
      for (var i = 0; i < boards.length; i++) {
        var path = "/" + i;

        boardsTemp.push(
          <th key={i} className="boardTop_name">
            <Link key={i} to={path}>{boards[i].title}</Link>
          </th>
        );
        console.log(">>>>" + JSON.stringify(boards[i]))
      }

      routes.push(<Route key={0} path="/0" component={Board} />);
      routes.push(<Route key={1} path="/1" component={Board} />);
      routes.push(<Route key={2} path="/2" component={Board} />);
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
