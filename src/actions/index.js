// Coloque aqui suas actions
// actions/index
// actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_EXCHANGE_RATES = 'REQUEST_EXCHANGE_RATES';
export const ADD_EXCHANGE_RATES = 'ADD_EXCHANGE_RATES';
export const ADD_TOTAL_VALUE = 'ADD_TOTAL_VALUE';
export const DEL_EXPENSE_LINE = 'DEL_EXPENSE_LINE';
export const CHANGE_LINE = 'CHANGE_LINE';
export const SELECT_LINE = 'SELECT_LINE';

// action creators
export const addEmail = (email) => ({ type: ADD_EMAIL, payload: email });
export const getCurrencies = () => ({ type: GET_CURRENCIES });
export const requestExchangeRates = () => ({ type: REQUEST_EXCHANGE_RATES });
export const addExchangeRates = (payload) => ({ type: ADD_EXCHANGE_RATES, payload });
export const addTotalValue = (payload) => ({ type: ADD_TOTAL_VALUE, payload });
export const delExpenseLine = (payload) => ({ type: DEL_EXPENSE_LINE, payload });
export const changeLine = (payload, index) => ({ type: CHANGE_LINE, payload, index });
export const selectLine = (payload) => ({ type: SELECT_LINE, payload });

const ECONO_URL = 'https://economia.awesomeapi.com.br/json/all';

// action creator que retorna uma função, possível por conta do pacote redux-thunk
export const calcTotalExpense = () => async (dispatch, getState) => {
  const state = getState();
  const calcLines = state.wallet.expenses.map((expense) => {
    const expentValue = Number(expense.value);
    const changeDescription = expense.exchangeRates[expense.currency].name;
    const exchangeRate = Number(expense.exchangeRates[expense.currency].ask);
    const calcValue = expentValue * exchangeRate;
    const viewLine = [expentValue, changeDescription, exchangeRate, calcValue];
    // console.log(viewLine);
    return viewLine;
  });
  const totalSum = calcLines.reduce((acc, cur) => (acc + cur[3]), 0);
  calcLines.total = totalSum;
  // console.log({ calcLines });
  // console.log({ calcLines });
  return dispatch(addTotalValue(totalSum));
};

export function addExpense(payload) {
  return (dispatch) => { // thunk declarado
    dispatch(requestExchangeRates());
    return fetch(ECONO_URL)
      .then((response) => response.json())
      .then((data) => {
        const { id, value, currency, method, tag, description } = payload;
        const dataObj = {
          id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates: data,
        };
        dispatch(addExchangeRates(dataObj));
        dispatch(calcTotalExpense());
      });
  };
}

// action creator que retorna uma função, possível por conta do pacote redux-thunk
export function fetchExchangeRates() {
  return (dispatch) => { // thunk declarado
    dispatch(requestExchangeRates());
    return fetch(ECONO_URL)
      .then((response) => response.json())
      .then((data) => (data));
  };
}

export function editExpenseLine(payload) {
  return (dispatch, getState) => { // thunk declarado
    const { selectedLine } = getState().wallet;
    dispatch(requestExchangeRates());
    return fetch(ECONO_URL)
      .then((response) => response.json())
      .then((data) => {
        const { id, value, currency, method, tag, description } = payload;
        const dataObj = {
          id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates: data,
        };
        dispatch(changeLine(dataObj, selectedLine));
        dispatch(calcTotalExpense());
      });
  };
}
