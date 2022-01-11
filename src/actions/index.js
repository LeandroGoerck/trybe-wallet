// Coloque aqui suas actions
const ADD_NAME = 'ADD_NAME';
const ADD_EMAIL = 'ADD_EMAIL';
const ADD_USER = 'ADD_USER';

const addName = (name) => ({ type: ADD_NAME, payload: name });
const addEmail = (email) => ({ type: ADD_EMAIL, payload: email });
const addUser = (email) => ({ type: ADD_USER, payload: email });

export {
  addEmail,
  addName,
  addUser,
};
