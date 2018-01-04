import * as types from "./actionTypes";
import MemoryBoxesApi from "../api/MemoryBoxesApi";
import * as model from "../api/model.js"

export function loadBoardsSuccess(boards) {
  return   {  type: types.LOAD_BOARDS_SUCCESS,    boards   };
}

export function loadBoards() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return MemoryBoxesApi.getAllBoards().then(boards =>
    {
      dispatch(loadBoardsSuccess(boards));
    }).catch(error => {
      throw (error);
    });
  };
  //return Api.getAllBoards();
}

export const requestCards = cardId => ({
  type: types.REQUEST_CARD,
  cardId
})

export const requestAllBoards = cardId => ({
  type: types.REQUEST_ALL_BOARDS
})

export const receiveCard = (cardId, json) => ({
  type: types.RECEIVE_CARD,
  cardId,
  title: "TITLE",//json.data.children.map(child => child.data),
  content: "CONTENT"
})

export const receiveBoards = (json) => ({
  type: types.REQUEST_ALL_BOARDS,
  boards: json.data.children.map(child => child.data),
})

export const fetchCard = cardId => dispatch => {
  dispatch(requestCards(cardId))
  return fetch(`localhost/r/${cardId}.json`)
    //.then(response => response.json())
    .then(json => dispatch(receiveCard(cardId, json)))
}

export const fetchAllBoards = cardId => dispatch => {
  console.log("fetchAllBoards");
  var headers = Headers
  headers.append("Access-Control-Allow-Origin", "*")
  dispatch(requestAllBoards())
  return fetch(`http://localhost:9090/api/v1/boards`)
    .then(response => response.json())
    .then(json => dispatch(receiveBoards(json)))
}

export function setCardViewVisibleSuccess(isCardViewVisible) {
  return { type: types.SET_CARDVIEW_VISIBLE, isCardViewVisible };
}

export function setCardViewVisible(isCardViewVisible) {
  //console.log("setCardViewVisible!!" + isCardViewVisible);
  return function (dispatch) {
    dispatch(setCardViewVisibleSuccess(isCardViewVisible));
  };
}

export function setCardViewOpenedIdSuccess(cardViewOpenedId) {
  return { type: types.SET_CARDVIEW_OPENED_ID, cardViewOpenedId };
}

export function setCardViewOpenedId(cardViewOpenedId) {
  return function (dispatch) {
    dispatch(setCardViewOpenedIdSuccess(cardViewOpenedId));
  };
}

/*
export function loadCatsSuccess(cats) {
  return { type: types.LOAD_CATS_SUCCESS, cats };
}

export function updateCatSuccess(cat) {
  return { type: types.UPDATE_CAT_SUCCESS, cat };
}

export function createCatSuccess(cat) {
  return { type: types.CREATE_CAT_SUCCESS, cat };
}

export function deleteCatSuccess(cat) {
  return { type: types.DELETE_CAT_SUCCESS, cat };
}

export function loadCats() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return catApi
      .getAllCats()
      .then(cats => {
        dispatch(loadCatsSuccess(cats));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function updateCat(cat) {
  return function(dispatch) {
    return catApi
      .updateCat(cat)
      .then(responseCat => {
        dispatch(updateCatSuccess(responseCat));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function createCat(cat) {
  return function(dispatch) {
    return catApi
      .createCat(cat)
      .then(responseCat => {
        dispatch(createCatSuccess(responseCat));
        return responseCat;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteCat(cat) {
  return function(dispatch) {
    return catApi
      .deleteCat(cat)
      .then(() => {
        console.log(`Deleted ${cat.id}`);
        dispatch(deleteCatSuccess(cat));
        return;
      })
      .catch(error => {
        throw error;
      });
  };
}

*/
