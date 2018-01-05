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

    this.state = {
      title: "",
      boxes: []
    }
    
    var id = props.match.url.substr(1)
    var obj = props.boards.boards
    
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].id == id) {
        this.state.boxes = obj[i].boxes
        this.state.title = obj[i].title
        this.state.id = id
      }
    }
  }

  render() {
    const boards = [];
    console.log("Board::render: " + this.props.isCardViewVisible + " " + this.state.boxes);

    if (this.state.boxes) {
      for (var i = 0; i < this.state.boxes.length; i++) {
        boards.push(
          <td key={i}>
            <Box
              title={this.state.boxes[i].title}
              cards={this.state.boxes[i].cards}
              id={i}
            />
          </td>
        );
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
    isVisible: state.isVisible,
    boards: state.boards
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
