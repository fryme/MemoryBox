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
  content: json//Object.values(json)
})

export const receiveBoards = (json) => ({
  type: types.RECEIVE_ALL_BOARDS,
  boards: Object.values(json)
})

export const fetchCard = cardId => dispatch => {
  console.log("fetchCard " + cardId);
  dispatch(requestCards(cardId))
  return fetch(`http://localhost:9090/api/v1/cards?cardId=` + cardId)
    .then(response => response.json())
    .then(json => dispatch(receiveCard(cardId, json)))
}

export const fetchAllBoards = cardId => dispatch => {
  console.log("fetchAllBoards");
  /*
  var myHeaders = new Headers();
  dispatch(requestAllBoards())
  var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
    */           
  return fetch(`http://localhost:9090/api/v1/boards`/*, myInit*/)
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

