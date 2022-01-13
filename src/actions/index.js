// Coloque aqui suas actions

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';

const addEmail = (email) => ({ type: ADD_EMAIL, payload: email });
const addExpense = (payload) => ({ type: ADD_EXPENSE, payload });
const getCurrencies = () => ({ type: GET_CURRENCIES });

export {
  addEmail,
  addExpense,
  getCurrencies,
};
