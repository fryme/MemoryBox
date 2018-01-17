import React from "react";
import { connect } from "react-redux";
import watch from "redux-watch";
import store from "./index.js";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'

import * as boardActions from "./actions/boardActions";
import { setCardViewVisible } from "./actions/boardActions";

import { Modal }  from 'semantic-ui-react'

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
    console.log("CardView.handleClick " + this.div.innerHTML);
    if (this.div.innerHTML != this.props.content.content) {
      dispatch(boardActions.updateCardData(this.props.cardId, this.props.content.title, this.div.innerHTML))
      dispatch(boardActions.fetchCard(this.props.cardId));
    }
  }

  handleOutsideClick(e) {
    console.log("Card.handleOutsideClick");
  }

  componentDidMount() {
  }

  reloadCard = function(cardId) {

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
  
  onChange(event) {
    console.log("CardView.onChange")
  }
  // <div className="CardView">
  render() {
    //console.log("CardView.render " + this.props.content.title)
    return (
      <div
        //onClick={this.handleOutsideClick}
      >
        {this.props.isVisible &&
        <div className="CardView">
          <button onClick={this.handleClick}>x</button>
          <div className="CardView_Title">
            {this.props.content.title}
          </div>
          <div
            className="CardView_TextBlock"
            contentEditable="true"
            dangerouslySetInnerHTML={{ __html: this.props.content.content }}
            ref={(div) => this.div = div} 
            onChange={this.onChange.bind(this)}
          />
        </div>
        }
      </div>
    );
  }
}

/*
<textarea value={this.props.content.content} />

*/

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

