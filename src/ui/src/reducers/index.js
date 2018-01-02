import { combineReducers } from 'redux';
import boards from './boardReducer';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

const cardView = (state = initialState.cardView, action) => {
  console.log("CardView state changed, state:", JSON.stringify(state) + " action:" + JSON.stringify(action))
  switch (action.type) {
    case types.SET_CARDVIEW_VISIBLE:
      return {
        ...state, 
        isVisible: action.isCardViewVisible
      };
    case types.SET_CARDVIEW_OPENED_ID:
      let s = {
        ...state, 
        cardId: action.cardViewOpenedId
      };
      console.log("SET_CARDVIEW_OPENED_ID " + JSON.stringify(s))
      return s
    case types.REQUEST_CARD:
      return {
        ...state,
        isFetchingCard: true
      }
    case types.RECEIVE_CARD:
      return {
        ...state,
        isFetchingCard: false,
        title: action.title,
        content: action.content
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  boards,
  cardView
})

export default rootReducer;