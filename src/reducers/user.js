// Esse reducer será responsável por tratar as informações da pessoa usuária
const INIT = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const user = (state = INIT, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default user;
