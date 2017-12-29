import React from "react";
import { connect } from "react-redux";
import watch from "redux-watch";
import store from "./index.js";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'

import * as deskActions from "./actions/deskActions";
import { setBlockViewVisible } from "./actions/deskActions";

class BlockView extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    //dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      text: props.text,
      isVisible: false,
      themeId: -1
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { dispatch } = this.props
    dispatch(setBlockViewVisible(!this.props.isVisible))
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    //console.log("BlockView::componentWillReceiveProps " + JSON.stringify(nextProps));
    
    if (nextProps.themeId != -1 && this.props.themeId != nextProps.themeId)
    {
      console.log("Reload with: " + nextProps.themeId);
    }
  }
  
  render() {
    return (
      <div>
        {this.props.isVisible &&
        <div style={BlockViewStyle} onClick={this.handleClick}>
          <button onClick={this.handleClick}>x</button>
          <div style={{ fontSize: "16px", fontWeight: "bolder" }}>
            {this.state.title}
          </div>
          <div
            style={TextStyle}
            dangerouslySetInnerHTML={{ __html: this.state.text }}
          />
        </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  //console.log("BlockView mapStateToProps " + JSON.stringify(state));
  return {
    isVisible: state.blockView.isVisible,
    themeId: state.blockView.themeId
  };
}


function mapDispatchToProps(dispatch) {
  return {
    //actions: bindActionCreators(deskActions, dispatch)
  };
}


export default connect(
  mapStateToProps//,
  //mapDispatchToProps
)(BlockView);


const TextStyle = {
  overflowY: "scroll",
  height: "300px"
};

const BlockViewStyle = {
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