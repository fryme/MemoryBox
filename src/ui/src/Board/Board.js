import React from "react";
import { render } from "react-dom";
import Box from "../Box";
import BoardTitle from "./BoardTitle";
import CardView from "../CardView";
import { connect } from 'react-redux';
import * as boardActions from "../actions/boardActions";
import { bindActionCreators } from 'redux';

import BOARDS_DATA from "../api/model.js";

class AddNewBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false
    }
  
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  handleCloseClick() {
    const { dispatch } = this.props
    this.state.isClicked = !this.state.isClicked
    
    console.log("BoardAddButton.handleCloseClick " + this.state.isClicked)
    this.forceUpdate()
  }

  handleAddClick() {
    this.props.dispatch(boardActions.addBox(this.props.boardId, this.input.value))
    this.state.isClicked = !this.state.isClicked
    this.forceUpdate()
  }

  handleKeyPress = (event) => {
    // Escape to cancel?
    if(event.key == 'Enter'){
      this.handleAddClick()
    }
  }

  render() {
      return (
        <div className="AddBox_container">
          {!this.state.isClicked&& 
            <div className="AddBox_addButton">
              <a onClick={this.handleCloseClick}>Новый список</a>
            </div>
          }
          {this.state.isClicked&& 
            <div className="AddBox_innerContainer">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <input id="newBoxName" 
                            name="newBoxName" 
                            type="text" 
                            placeholder="Новый список..." 
                            onKeyPress={this.handleKeyPress}
                            autoFocus
                            ref={(input) => this.input = input} 
                            />
                            </td>
                  </tr>
                  <tr>
                    <td>
                      <a className="AddBox_addButton" onClick={this.handleAddClick}>Добавить</a>
                      <a className="AddBox_closeButton" onClick={this.handleCloseClick}>X</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </div>
      )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      boxes: [],
      id: ""
    }
    
    this.state.id = props.match.url.substr(1)
    this.setCurrentBoard(props.boards.boards);
  }

  setCurrentBoard = function(obj) {
    // Looking for curret board
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].id == this.state.id) {
        this.state.boxes = obj[i].boxes
        this.state.title = obj[i].title
      }
    }
  }

  componentWillReceiveProps(newProps) {
    this.setCurrentBoard(newProps.boards.boards);
  }

  render() {
    const boxes = [];
    console.log("Board.render: " + this.props.isCardViewVisible + " " + this.state.boxes);

    if (this.state.boxes) {
      for (var i = 0; i < this.state.boxes.length; i++) {
        boxes.push(
          <td key={i}>
            <div className="containingBlock">
              <Box
                title={this.state.boxes[i].title}
                cards={this.state.boxes[i].cards}
                boxId={this.state.boxes[i].id}
                boardId={this.state.id}
              />
            </div>
          </td>
        );
      }
    }

    return (
      <div className="Board">
        <BoardTitle BoardTitle={this.state.title} />
        <table>
          <tbody>
            <tr>
              {boxes}
              <td style={{position: relative}}>
                <AddNewBox boardId={this.state.id} dispatch={this.props.dispatch}/>
              </td>
            </tr>
          </tbody>
        </table>
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

export default connect(
  mapStateToProps)
(Board);

