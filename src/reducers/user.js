// Esse reducer será responsável por tratar as informações da pessoa usuária
// reducers/user

import * as ACT from '../actions';

const INIT = {
  email: '',
  enableButton: false,
};

// user reducer
const user = (state = INIT, action) => {
  switch (action.type) {
  case ACT.ADD_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
