import { combineReducers } from 'redux';
import desks from './deskReducer';
import isBlockViewVisible from './stateReducer';

const rootReducer = combineReducers({
  desks,
  isBlockViewVisible
})

export default rootReducer;