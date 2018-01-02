import React from "react";
import { render } from "react-dom";
import Box from "../Box";
import BoardTitle from "./BoardTitle";
import CardView from "../CardView";
import { connect } from 'react-redux';
import { setCardViewVisible } from "../actions/boardActions";
import { bindActionCreators } from 'redux';
//import PropTypes from 'prop-types'

import BOARDS_DATA from "../api/model.js";

//import { BOARDS_DATA_0, BOARDS_DATA_1, BOARDS_DATA_2} from "./model";

//import "temp.styl";


class Board extends React.Component {
  constructor(props) {
    super(props);
    var id = parseInt(this.props.match.path[1], 10);
    var boards = [];
    var boardTitle = "";

    if (id === 0) {
      boardTitle = BOARDS_DATA.ALL_BOARDS[0].title;
      boards = BOARDS_DATA.BOARDS_DATA_0[0].boards;
    } else if (id === 1) {
      boardTitle = BOARDS_DATA.ALL_BOARDS[1].title;
      boards = BOARDS_DATA.BOARDS_DATA_1[0].boards;
    } else if (id === 2) {
      boardTitle = BOARDS_DATA.ALL_BOARDS[2].title;
      boards = BOARDS_DATA.BOARDS_DATA_2[0].boards;
    }

    this.state = {
      boards: boards,
      title: boardTitle
    };
    //boardActions.setCardViewVisible(false);
  }

  render() {
    const boards = [];
    console.log("Board::render: " + this.props.isCardViewVisible);

    if (this.state.boards) {
      for (var i = 0; i < this.state.boards.length; i++) {
        boards.push(
          <td key={i}>
            <Box
              title={this.state.boards[i].title}
              cards={this.state.boards[i].cards}
              id={i}
            />
          </td>
        );
        //console.log(this.state.boards[i].title);
      }
    }

    return (
      <div style={BoardStyle}>
        <BoardTitle BoardTitle={this.state.title} />
        <table><tbody><tr>{boards}</tr></tbody></table>
        <CardView />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isVisible: state.isVisible
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(setCardViewVisible, dispatch)
  };
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps)
(Board);

const BoardStyle = {
  font: '14px "Helvetica Neue", Arial, Helvetica, sans-serif',
  color: "#4d4d4d",
  fontWeight: "normal",
  padding: "0 10px",
  backgroundColor: "rgb(0, 121, 191)",
  position: "relative",
  height: "100vh",
  padding: "0",
  margin: "0"
};
