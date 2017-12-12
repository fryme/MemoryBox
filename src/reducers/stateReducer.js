import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { browserHistory } from 'react-router';


export default function isBlockViewVisibleReducer(state = initialState.isBlockViewVisible, action) {
  switch (action.type) {
    case types.SET_BLOCKVIEW_VISIBLE:
      console.log("SET_BLOCKVIEW_VISIBLE " + action.isBlockViewVisible);
      return Object.assign([], state, action.isBlockViewVisible)
    default:
      return Object.assign([], state, true)
  }
}
