// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// reducers/wallet
// import { response } from '../tests/mockData';
import * as ACT from '../actions';

const INIT = {
  expenses: [],
  total: 0,
};

// const INIT = {
//   expenses: [
//     {
//       id: 0,
//       value: '10',
//       currency: 'USD',
//       method: 'Cartão de crédito',
//       tag: 'Lazer',
//       description: 'Dez dólares',
//       exchangeRates: response,
//     },
//     {
//       id: 1,
//       value: '20',
//       currency: 'EUR',
//       method: 'Dinheiro',
//       tag: 'Trabalho',
//       description: 'Vinte euros',
//       exchangeRates: response,
//     },
//   ],
//   total: 0,
// };

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
    });

  case ACT.ADD_TOTAL_VALUE:
    state.total = Number(payload);
    return { ...state };

  case ACT.DEL_EXPENSE_LINE:
    return ({ ...state,
      expenses: [
        ...state.expenses.filter((_exp, index) => (index !== payload)),
      ],
    });

  case ACT.SELECT_LINE:
    state.selectedLine = Number(payload);
    return { ...state };

  default:
    return state;
  }
};

export default wallet;
