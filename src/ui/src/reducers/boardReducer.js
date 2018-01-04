import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function boardReducer(state = initialState.boards, action) {
  switch (action.type) {
    case types.LOAD_BOARDS_SUCCESS:
      return Object.assign([], state, action.boards)
    case types.RECEIVE_ALL_BOARDS:
    console.log("boardReducer.RECEIVE_ALL_BOARDS " + JSON.stringify(action.boards));
      return {
        ...state,
        boards: action.boards
      } 
    default:
      return state;
  }
}
