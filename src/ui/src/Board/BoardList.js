import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Board from "./Board";
import { connect } from 'react-redux';

import * as boardActions from "../actions/boardActions";
import { Button, Input } from 'semantic-ui-react'
import "./board.css";


class BoardSelectButton extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
  }

  render() {
    return (
      <Button className="ui small compact button">
        <Link key={this.props.key} to={this.props.to} >{this.props.title}</Link>
      </Button>
    )
  }
}

class BoardAddButton extends React.Component {
  constructor(props) {
    super(props);
    console.log("BoardAddButton " + this.props.dispatch)
    
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
    console.log('A name was submitted: ' + this.input);
    this.props.dispatch(boardActions.addBoard(this.input))
    this.state.isClicked = !this.state.isClicked
    this.forceUpdate()
  }

  handleKeyPress = (event) => {
    // Escape to cancel?
    if(event.key == 'Enter'){
      this.handleAddClick()
    }
  }

  setInputValue = function(value) {
    this.input = value
    console.log(this.input)
  }

  //<a className="boardAddButton" onClick={this.handleCloseClick}>Новая доска</a>
  //<a className="AddBoardButton_addButton" onClick={this.handleAddClick}>Добавить</a>
  //<a className="AddBoardButton_closeButton" onClick={this.handleCloseClick}>X</a>
  render() {
    console.log("BoardAddButton.render")
    return (
      <div>
        {!this.state.isClicked&& 
        <Button onClick={this.handleCloseClick} className="ui small green basic button">+</Button>
        }
        {this.state.isClicked&& 
          <div>
              <Input id="newBoardName" 
                    name="newBoardName" 
                    type="text" 
                    placeholder="Введите имя..." 
                    onKeyPress={this.handleKeyPress}
                    autoFocus
                    ref={(input) => this.input = input}
                    onChange={e => this.setInputValue(e.target.value)}
                    className="ui small input"
                    />
            <Button onClick={this.handleAddClick} className="ui small primary button" style={{marginLeft:"10px"}}> Добавить </Button>
            <Button onClick={this.handleCloseClick} className="ui small basic button"> x </Button>
          </div>
        }
      </div>
    )
  }
}

class BoardList extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;

    console.log("BoardList.constructor " + dispatch);

    dispatch(boardActions.fetchAllBoards())
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { dispatch } = this.props
    //dispatch(setCardViewVisible(!this.props.isVisible))
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
          <th key={i}>
            <BoardSelectButton key={i} to={path} title={boards[i].title} />
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
              <tr>
                {boardsTemp}
                <th>
                  <BoardAddButton dispatch={this.props.dispatch}/>
                </th>
              </tr>
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
  mapStateToProps)//, mapDispatchToProps)
(BoardList);
