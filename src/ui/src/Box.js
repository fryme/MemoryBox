import React from "react";
import Card from "./Card";
import "./card_style.css";
import { connect } from "react-redux";
import * as boardActions from "./actions/boardActions.js"
import { Button, Input, TextArea } from 'semantic-ui-react'

//export default ({ name }) => <h1>Hello {name}!</h1>;
/*
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(window.innerHeight);
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "O" : "     I     "}
      </button>
    );
  }
}
*/

class AddCardForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false,
      boardId: this.props.boardId,
      boxId: this.props.boxId
    }

    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  handleAddCardClick() {
    console.log("Box.handleAddCardClick");
  }

  handleCloseClick() {
    this.state.isClicked = !this.state.isClicked
    console.log("BoardAddButton.handleCloseClick " + this.state.isClicked)
    this.forceUpdate()
  }

  handleAddClick() {
    this.props.dispatch(boardActions.addCard(this.props.boardId, this.props.boxId, this.input))
    this.state.isClicked = !this.state.isClicked
    this.forceUpdate()
  }

  handleKeyPress = (event) => {
    // Escape to cancel?
    //if(event.key == 'Enter'){
      //this.handleAddClick()
    //}
  }

  setInputValue = function(value) {
    this.input = value
  }

  render() {
    return (
      <div className="AddCard_container">
        {!this.state.isClicked&& 
          <div className="AddCard_addButton">
            <a onClick={this.handleCloseClick}>Добавить карточку...</a>
          </div>
        }
        {this.state.isClicked&& 
          <div>
            <table>
              <tbody>
                <tr>
                  <td >
                    <TextArea autoHeight rows={1}
                          id="NewCard_Input" 
                          name="NewCard_Input" 
                          type="text" 
                          placeholder="Имя..." 
                          onKeyPress={this.handleKeyPress}
                          autoFocus
                          ref={(input) => this.input = input} 
                          onChange={e => this.setInputValue(e.target.value)}
                          className="ui small icon input"
                          />
                          </td>
                </tr>
                <tr>
                  <td>
                    <Button className="ui small compact circular basic button" onClick={this.handleAddClick}>Добавить</Button>
                    <Button id="NewCard_closeBtn" name="NewCard_closeBtn" className="ui small compact circular basic button" onClick={this.handleCloseClick}>x</Button>
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

class EditableTitle extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="boxTitleStyle">
        {this.props.title}
      </div>
    )
  }
}

class Box extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      cards: props.cards,
      boxId: props.boxId,
      boardId: props.boardId
    };
    //console.log( "Box.constructor "+ props.boxId)
  }

  componentWillReceiveProps(newProps) {
    this.state.cards = newProps.cards
  }

  render() {
    const cardsTemp = [];

    if (this.state.cards) {
      for (var i = 0; i < this.state.cards.length; i++) {
        cardsTemp.push(
          <Card key={i}
            title={this.state.cards[i].title}
            snippet={this.state.cards[i].data}
            cardId={this.state.cards[i].id}
          />
        );
      }
    }
    return (
      <div style={BoxStyle}>
        <EditableTitle title={this.state.title} />
        <div className="boxRow">{cardsTemp}</div>
        <AddCardForm boardId={this.state.boardId} boxId={this.state.boxId} dispatch={this.props.dispatch} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    boards: state.boards
  }
}

export default connect(
  mapStateToProps//,
  //mapDispatchToProps
)(Box);

const CardListStyle = {
  overflowY: "scroll",
  height: "300px"
};

const BoxStyle = {
  width: "300px",
  display: "inline-block",
  height: "100%",
  overflow: "hidden",
  minheight: "100px",
  backgroundColor: "#e2e4e6",
  boxShadow: "1px 1px 1px rgba(0, 0, 0, .5)",
  borderRadius: "3px",
  paddingBottom: "10px",
  marginRight: "5px",
  
  verticalAlign: "top"
};

const BoxTitleStyle = {};