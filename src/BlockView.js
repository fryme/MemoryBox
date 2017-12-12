import React from "react";
import { connect } from "react-redux";
import watch from "redux-watch";
import store from "./index.js";
import { bindActionCreators } from 'redux';

import * as deskActions from "./actions/deskActions";

class BlockView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      text: props.text,
      isVisible: false,
      test: props.text
    };
    // This binding is necessary to make `this` work in the callback

    this.handleClick = this.handleClick.bind(this);
    /*
    let w = watch(store, "admin.name");
    store.subscribe(
      w((newVal, oldVal, objectPath) => {
        console.log("%s changed from %s to %s", objectPath, oldVal, newVal);
      })
    );
    */

    /*
    store.subscribe(() => {
      console.log("BlockView:" + store.getState());
    });
    */
  }

  setBlockViewVisibleState() {
    console.log("setBlockViewVisibleState");
  }

  setVisible() {
    console.log("BlockView.setVisible");
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  }

  handleClick() {
    console.log("BlockView.handleClick");

    //this.props.onSetBlockViewVisibleState(false);
    //deskActions.setBlockViewVisible(false);
    //dispatch(deskActions.setBlockViewVisible(true));
    this.setState({ isBlockViewVisible: 1 });
    
    this.setState(prevState => ({
      isBlockViewVisible: false,
      isVisible: !prevState.isVisible
    }));
  }

  render() {
    console.log("BlockView.render" + this.props.isVisible);
    return (
      <div>
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
      </div>
    );
  }
}

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

function mapStateToProps(state, ownProps) {
  console.log("mapStateToProps " + state.isBlockViewVisible);
  return {
    isBlockViewVisible: state.isBlockViewVisible
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(deskActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockView);