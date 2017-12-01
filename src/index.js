import React from "react";
import { render } from "react-dom";
import Desk from "./Desk";

import DESKDATA from "./model";

//import "temp.styl";

const MainStyle = {
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

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const desks = [];

    var desksTemp = DESKDATA.DESKDATA;
    //console.log(desksTemp.length);

    for (var i = 0; i < desksTemp.length; i++) {
      desks.push(
        <td>
          <Desk title={desksTemp[i].title} blocks={desksTemp[i].blocks} />
        </td>
      );
      console.log(desksTemp[i].title);
    }

    return (
      <div style={MainStyle}>
        <table>{desks}</table>
      </div>
    );
  }
}

render(<App desksList={DESKDATA} />, document.getElementById("root"));

export default App;
