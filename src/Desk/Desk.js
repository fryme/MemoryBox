import React from "react";
import { render } from "react-dom";
import Theme from "../Theme";
import DeskTitle from "./DeskTitle";
import BlockView from "../BlockView";
import { connect } from 'react-redux';
import { setBlockViewVisible } from "../actions/deskActions";
import { bindActionCreators } from 'redux';
//import PropTypes from 'prop-types'

import DESK_THEMES_DATA from "../api/model.js";

//import { THEMES_DATA_0, THEMES_DATA_1, THEMES_DATA_2} from "./model";

//import "temp.styl";


class Desk extends React.Component {

  constructor(props) {
    super(props);
    var id = parseInt(this.props.match.path[1], 10);
    var deskThemes = [];
    var deskTitle = "";

    if (id === 0) {
      deskTitle = DESK_THEMES_DATA.ALL_DESKS[0].title;
      deskThemes = DESK_THEMES_DATA.THEMES_DATA_0[0].themes;
    } else if (id === 1) {
      deskTitle = DESK_THEMES_DATA.ALL_DESKS[1].title;
      deskThemes = DESK_THEMES_DATA.THEMES_DATA_1[0].themes;
    } else if (id === 2) {
      deskTitle = DESK_THEMES_DATA.ALL_DESKS[2].title;
      deskThemes = DESK_THEMES_DATA.THEMES_DATA_2[0].themes;
    }

    this.state = {
      themes: deskThemes,
      title: deskTitle
    };
    //deskActions.setBlockViewVisible(false);
  }

  render() {
    const themes = [];
    console.log("Desk::render: " + this.props.isBlockViewVisible);

    if (this.state.themes) {
      for (var i = 0; i < this.state.themes.length; i++) {
        themes.push(
          
          <td key={i}>
            <Theme
              title={this.state.themes[i].title}
              blocks={this.state.themes[i].blocks}
              id={i}
            />
          </td>
        );
        //console.log(this.state.themes[i].title);
      }
    }

    return (
      <div style={DeskStyle}>
        <DeskTitle deskTitle={this.state.title} />
        <table><tbody><tr>{themes}</tr></tbody></table>
        <BlockView />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isVisible: state.isVisible
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(setBlockViewVisible, dispatch)
  };
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps)
(Desk);

const DeskStyle = {
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
