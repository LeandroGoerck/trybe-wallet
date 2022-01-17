// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// reducers/wallet

import * as ACT from '../actions';

const INIT = {
  expenses: [],
  total: 0,
};

// wallet reducer
const wallet = (state = INIT, action) => {
  const { payload } = action;
  switch (action.type) {
  case ACT.REQUEST_EXCHANGE_RATES:
    return state;
  case ACT.ADD_EXCHANGE_RATES:
    return ({ ...state,
      expenses: [
        ...state.expenses, {
          ...payload,
          id: state.expenses.length,
        },
      ],
      total: 111,
    });
  case ACT.ADD_TOTAL_VALUE:
    state.total = payload.toFixed(2);
    return { ...state };
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
