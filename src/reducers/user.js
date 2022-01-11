// Esse reducer será responsável por tratar as informações da pessoa usuária
const INIT = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
  enableButton: false,
};

const ADD_NAME = 'ADD_NAME';
const ADD_EMAIL = 'ADD_EMAIL';

const user = (state = INIT, action) => {
  switch (action.type) {
  case ADD_NAME:
    return { ...state, name: action.payload };
  case ADD_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
