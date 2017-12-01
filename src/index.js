import React from "react";
import { render } from "react-dom";

import Desk from "./Desk";

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
  margin: "0",
};


const App = () => (
  <div style={MainStyle}>
  <table>
      <td>
      <div>
        <Desk title="First desk" />
      </div>
      </td>
      <td>
      <div>
          <Desk title="Second desk" />
      </div>
      </td>
  </table>
  </div>

  
);

render(<App />, document.getElementById("root"));
