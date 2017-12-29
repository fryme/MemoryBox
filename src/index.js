import React from "react";
import { render } from "react-dom";
import DeskList from "./Desk/DeskList";

import { Provider } from "react-redux";
import configureStore from "./configureStore"
import { loadDesks, setBlockViewVisible } from "./actions/deskActions";

const store = configureStore();

store.dispatch(loadDesks());
store.dispatch(setBlockViewVisible(false));

//store.dispatch(loadHobbies());

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <DeskList />;
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
