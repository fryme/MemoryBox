import React from "react";
import { render } from "react-dom";
import BoardList from "./Board/BoardList";
import { Provider } from "react-redux";
import configureStore from "./configureStore"
import { loadBoards, setCardViewVisible } from "./actions/boardActions";
import "./style.css"
//import { Button } from 'semantic-ui-css/semantic.min.css';


//import { Button } from 'semantic-ui-react'

const store = configureStore();

//store.dispatch(loadBoards());
//store.dispatch(setCardViewVisible(false));


class App extends React.Component {
  constructor(props) {
    super(props);
  }  

  render() {
    return (
    <div className="GlobalStyle">
      <BoardList />
    </div>  
    )
  }  
}  

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
