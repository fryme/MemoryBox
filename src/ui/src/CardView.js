import React from "react";
import { connect } from "react-redux";
import watch from "redux-watch";
import store from "./index.js";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'

import * as boardActions from "./actions/boardActions";
import { setCardViewVisible } from "./actions/boardActions";

class CardView extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    //dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      content: props.content,
      isVisible: false,
      cardId: -1
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleClick() {
    const { dispatch } = this.props
    dispatch(setCardViewVisible(!this.props.isVisible))
  }

  handleOutsideClick(e) {
    console.log("Card.handleOutsideClick");
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    //console.log("CardView::componentWillReceiveProps " + JSON.stringify(nextProps));
    
    if (nextProps.cardId != -1 && this.props.cardId != nextProps.cardId)
    {
      const { dispatch } = this.props
      console.log("Reload with: " + nextProps.cardId);
      dispatch(boardActions.fetchCard(nextProps.cardId));
    }
  }
  
  render() {
    //console.log("CardView.render " + this.props.content.title)
    return (
      <div
        //onClick={this.handleOutsideClick}
      >
        {this.props.isVisible &&
        <div style={CardViewStyle} onClick={this.handleClick}>
          <button onClick={this.handleClick}>x</button>
          <div style={{ fontSize: "16px", fontWeight: "bolder" }}>
            {this.props.content.title}
          </div>
          <div
            style={TextStyle}
            dangerouslySetInnerHTML={{ __html: this.props.content.content }}
          />
        </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  //console.log("CardView mapStateToProps " + JSON.stringify(state));
  return {
    isVisible: state.cardView.isVisible,
    cardId: state.cardView.cardId,
    title: state.cardView.title,
    content: state.cardView.content,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //actions: bindActionCreators(boardActions, dispatch)
  };
}

export default connect(
  mapStateToProps//,
  //mapDispatchToProps
)(CardView);

const TextStyle = {
  overflowY: "scroll",
  height: "300px"
};

const CardViewStyle = {
  background: "#efefef",
  borderRadius: "5px",
  borderColor: "#fff",
  boxShadow: "2px 2px 2px rgba(0,0,0,.3)",
  cursor: "pointer",
  paddingBottom: "0px",
  zIndex: "99",
  position: "absolute",
  top: "100px",
  left: "200px",

  width: "600px",
  padding: "10px",
  paddingLeft: "40px",
  paddingTop: "20px",
  lineHeight: "20px"
};