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
  dispatch(requestAllBoards())

  /*
  var myHeaders = new Headers();
  var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
    */           
  return fetch(`http://localhost:9090/api/v1/boards`/*, myInit*/)
    .then(response => response.json())
    .then(json => dispatch(receiveBoards(json)))
}

export const addBoard = boardName_ => dispatch => {
  console.log("addBoard " + boardName_);
  return fetch(`http://localhost:9090/api/v1/boards/add`, {
    method: "POST",
    body: JSON.stringify({boardName: boardName_})
  })
  .then(dispatch(fetchAllBoards()))
}

export const addBox = (boardId_, boxName_) => dispatch => {
  console.log("addBox " + boardId_ + " " + boxName_)
  return fetch(`http://localhost:9090/api/v1/boxes/add`, {
    method: "POST",
    body: JSON.stringify({boardId: boardId_, boxName: boxName_})
  })
  .then(dispatch(fetchAllBoards()))
}

export const addCard = (boardId_, boxId_, cardName_) => dispatch => {
  console.log("addBox " + boardId_ + " " + boxId_ + " " + cardName_)
  return fetch(`http://localhost:9090/api/v1/cards`, {
    method: "POST",
    body: JSON.stringify({boardId: boardId_, boxId: boxId_, cardName: cardName_})
  }).then(dispatch(fetchAllBoards()))
}

export const updateCardData = (cardId_, cardTitle_, cardData_) => dispatch => {
  console.log("updateCardData " + cardId_ + " " + cardTitle_)
  return fetch(`http://localhost:9090/api/v1/cards/update`, {
    method: "POST",
    body: JSON.stringify({cardId: cardId_, cardTitle: cardTitle_, cardData: cardData_})
  }).then(dispatch(fetchCard(cardId_)))
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

