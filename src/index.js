import React from "react";
import { render } from "react-dom";
import DeskList from "./Desk/DeskList";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { connect } from "react-redux";
import { combineReducers } from "redux";
import * as Api from "./api/MemoryBoxesApi.js";
import configureStore from "./configureStore"
import PropTypes from 'prop-types'

import { loadDesks, setBlockViewVisible } from "./actions/deskActions";

const initialState = ["isBlockViewVisible=false"];

/*
function storeCallback(state = initialState, action) {
  console.log("storeCallback 0");

  var newState = state;
  if (action.type === "SET_BLOCKVIEW_VISIBLE") {
    var isBlockViewVisible = false;
    console.log("storeCallback 1 " + action.payload);

    newState.forEach(function(item, index) {
      var values = item.split("=");
      if (values && values.length === 2) {
        if (values[0] === "isBlockViewVisible") {
          newState[index] = "isBlockViewVisible=" + action.payload;
        }
      }
    });
  }

  for (var i = 0; i < newState.length; ++i) console.log(newState[i]);

  return newState;
}
*/

//const store = createStore(storeCallback);
const store = configureStore();

store.dispatch(loadDesks());
store.dispatch(setBlockViewVisible(false));

//store.dispatch(loadHobbies());

class App extends React.Component {
  static propTypes = {
    desks: PropTypes.array.isRequired,
    isBlockViewVisible: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    store.dispatch(setBlockViewVisible(true));
    store.dispatch(setBlockViewVisible(true));
  }

  render() {
    return <DeskList />;
  }
}

/*
export default connect(
  state => ({
    testStore: state
  }),
  dispatch => ({
    onSetBlockViewVisibleState: isVisible => {
      dispatch({ type: "SET_BLOCKVIEW_VISIBLE", payload: isVisible });
    }
  })
)(App);
*/

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
