import React from "react";
import { render } from "react-dom";
import Theme from "../Theme";
import DeskTitle from "./DeskTitle";
import BlockView from "../BlockView";

import DESK_THEMES_DATA from "../api/model.js";

//import { THEMES_DATA_0, THEMES_DATA_1, THEMES_DATA_2} from "./model";

//import "temp.styl";

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

class Desk extends React.Component {
  constructor(props) {
    super(props);
    var id = parseInt(this.props.match.path[1], 10);
    var deskThemes = [];
    var deskTitle = "";

    if (id === 0) {
      deskThemes = DESK_THEMES_DATA.THEMES_DATA_0[0].themes;
      deskTitle = DESK_THEMES_DATA.ALL_DESKS[0].title;
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
  }

  render() {
    const themes = [];

    if (this.state.themes) {
      for (var i = 0; i < this.state.themes.length; i++) {
        themes.push(
          <td>
            <Theme
              title={this.state.themes[i].title}
              blocks={this.state.themes[i].blocks}
            />
          </td>
        );
        //console.log(this.state.themes[i].title);
      }
    }

    return (
      <div style={DeskStyle}>
        <DeskTitle deskTitle={this.state.title} />
        <table>{themes}</table>
        <BlockView />
      </div>
    );
  }
}

export default Desk;
