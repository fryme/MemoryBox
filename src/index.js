import React from "react";
import { render } from "react-dom";
import DeskList from "./Desk/DeskList";

import ALL_DESKS from "./model";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <DeskList desksList={ALL_DESKS.ALL_DESKS} />;
  }
}

render(<App desksList={ALL_DESKS} />, document.getElementById("root"));

export default App;
