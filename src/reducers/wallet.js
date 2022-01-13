// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INIT = {
  expenses: [],
};

const ADD_EXPENSE = 'ADD_EXPENSE';

const wallet = (state = INIT, action) => {
  const { id, value, currency, method, tag, description, exchangeRates } = action;
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses, {
          id,
          value,
          currency,
          method,
          tag,
          description,
          exchangeRates,
        },
      ],
    };
  default:
    return state;
  }
};

export default wallet;
