// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import * as ACT from '../actions';

const INIT = {
  expenses: [],
};

// const aADD_EXPENSE = 'ADD_EXPENSE';

const wallet = (state = INIT, action) => {
  // const { id, value, currency, method, tag, description, exchangeRates } = action;
  const { payload } = action;
  switch (action.type) {
  case ACT.ADD_EXPENSE:
    console.log(state.expenses.length);
    return ({ ...state,
      expenses: [
        ...state.expenses, {
          ...payload,
          id: state.expenses.length,
        },
      ],
      status: '' });
  default:
    return state;
  }
};

// const wallet = (state = INIT, action) => {
//   const { id, value, currency, method, tag, description, exchangeRates } = action;
//   switch (action.type) {
//   case ADD_EXPENSE:
//     return {
//       ...state,
//       expenses: [
//         ...state.expenses,
//         {
//           id,
//           value,
//           currency,
//           method,
//           tag,
//           description,
//           exchangeRates,
//         },
//       ],
//     };
//   default:
//     return state;
//   }
// };

export default wallet;
