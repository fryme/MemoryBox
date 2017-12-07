import { combineReducers } from 'redux';
import desks from './deskReducer';

const rootReducer = combineReducers({
  // short hand property names
  desks
})

export default rootReducer;