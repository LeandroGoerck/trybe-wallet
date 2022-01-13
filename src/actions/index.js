// Coloque aqui suas actions

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';

const addEmail = (email) => ({ type: ADD_EMAIL, payload: email });
const addExpense = (payload) => ({ type: ADD_EXPENSE, payload });

export {
  addEmail,
  addExpense,
};
