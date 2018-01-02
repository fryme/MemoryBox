
import ALL_BOARDS from "./model";

class MemoryBoxesApi {
  static getAllBoards() {
    return fetch('http://localhost:5000/api/v1/cats').then(response => {
      return response.json();
    }).catch(error => {
      return ALL_BOARDS.ALL_BOARDS;
      //return error;
    });
  }
}

export default MemoryBoxesApi;

/*
class CatsApi {
  
  static getAllCats() {
    return fetch('http://localhost:5000/api/v1/cats').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateCat(cat) {
    const request = new Request(`http://localhost:5000/api/v1/cats/${cat.id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ cat: cat })
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
    
  }

  static createCat(cat) {
    const request = new Request('http://localhost:5000/api/v1/cats/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ cat: cat })
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteCat(cat) {
    const request = new Request(`http://localhost:5000/api/v1/cats/${cat.id}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}
*/


