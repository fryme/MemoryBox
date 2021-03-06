import React from "react";
import { GetCardView } from "./CardView";
import { connect } from "react-redux";
import "./card_style.css";
import { setCardViewVisible, setCardViewOpenedId } from "./actions/boardActions";

//export default ({ name }) => <h1>Hello {name}!</h1>;

class Card extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: props.title,
      snippet: props.snippet,
      isHovering: false,
      cardId: props.cardId
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }
  
  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  handleClick() {
    console.log("Card.handleClick " + this.state.cardId);
    const { dispatch } = this.props
    
    dispatch(setCardViewOpenedId(this.state.cardId))
    dispatch(setCardViewVisible(true))
  }

  render() {
    return (
      <div
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        <a className="cardButton" onClick={this.handleClick}>
          <div className="cardTitle">{this.state.title}</div>
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
)(Card);


const ItemSnippetStyle = {
  padding: "5px 5px",
  whiteSpace: "normal",
  wordBreak: "break-all",
  wordWrap: "break-world"
  //fontSize: "8px",
  //fontWeight: "bolder"
};

const ButtonStyle = {
  backgroundColor: "transparent",
  backgroundRepeat: "norepeat",
  border: "none",
  cursor: "pointer",
  overflow: "hidden",
  outline: "none",
  width: "100%",
  height: "100%",
  textAlign: "left"
};
