import { combineReducers } from 'redux';
import desks from './deskReducer';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

const blockView = (state = initialState.blockView, action) => {
  switch (action.type) {
    case types.SET_BLOCKVIEW_VISIBLE:
      return {...state, isVisible: action.isBlockViewVisible};
    case types.SET_BLOCKVIEW_OPENED_ID:
      let s = {...state, themeId: action.blockViewOpenedId};
      console.log("SET_BLOCKVIEW_OPENED_ID " + JSON.stringify(s))
      return s
    default:
      return state
  }
}


const rootReducer = combineReducers({
  desks,
  blockView
})

export default rootReducer;