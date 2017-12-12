import { combineReducers } from 'redux';
import desks from './deskReducer';
import isBlockViewVisible from './stateReducer';

const rootReducer = combineReducers({
  // short hand property names
  desks,
  isBlockViewVisible
})

export default rootReducer;