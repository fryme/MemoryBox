import * as types from "./actionTypes";
import * as Api from "../api/MemoryBoxesApi";

export function loadDesksSuccess(desks) {
  return { type: types.LOAD_CATS_SUCCESS, desks };
}

export function loadDesks() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    /*
    return Api.getAllDesks()
      .then(desks => {
        dispatch(loadDesksSuccess(desks));
      })
      .catch(error => {
        throw error;
      });
      */
    
  };
  return Api.getAllDesks();
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
