import React from "react";
import { render } from "react-dom";
import Theme from "../Theme";
import DeskTitle from "./DeskTitle";

import DESK_THEMES_DATA from "../model";

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

    if (id === 0) deskThemes = DESK_THEMES_DATA.THEMES_DATA_0[0].themes;
    else if (id === 1) deskThemes = DESK_THEMES_DATA.THEMES_DATA_1[0].themes;
    else if (id === 2) deskThemes = DESK_THEMES_DATA.THEMES_DATA_2[0].themes;

    this.state = {
      themes: deskThemes
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
        <DeskTitle />
        <table>{themes}</table>
      </div>
    );
  }
}

export default Desk;
