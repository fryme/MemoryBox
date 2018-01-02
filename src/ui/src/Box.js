import React from "react";
import Card from "./Card";
import "./card_style.css";
import { connect } from "react-redux";
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

class Box extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      cards: props.cards,
      id: props.id
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Box.handleClick");
  }

  render() {
    const cardsTemp = [];

    if (this.state.cards) {
      for (var i = 0; i < this.state.cards.length; i++) {
        cardsTemp.push(
          <Card key={i}
            title={this.state.cards[i].title}
            snippet={this.state.cards[i].data}
            cardId={i}
          />
        );
      }
    }
    return (
      <div style={BoxStyle}>
        <div className="boxRow">
          <div className="boxTitleStyle">{this.state.title}</div>
        </div>
        <div onClick={this.handleClick} className="boxRow">{cardsTemp}</div>
        <a
          style={{
            marginLeft: "15px",
            textAlign: "left",
            cursor: "pointer"
          }}
        >
          Добавить карточку...
        </a>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {}
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
  marginRight: "10px",
  marginLeft: "10px",
  verticalAlign: "top"
};

const BoxTitleStyle = {};