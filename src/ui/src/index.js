import React from "react";
import { render } from "react-dom";
import BoardList from "./Board/BoardList";
import { Provider } from "react-redux";
import configureStore from "./configureStore"
import { loadBoards, setCardViewVisible } from "./actions/boardActions";

const store = configureStore();

//store.dispatch(loadBoards());
//store.dispatch(setCardViewVisible(false));

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <BoardList />;
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
