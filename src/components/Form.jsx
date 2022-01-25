import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GiPayMoney } from 'react-icons/gi';
import { connect } from 'react-redux';
import * as ACT from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
      exchangeRates: {},
      currencies: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        this.setState({ currencies: Object.keys(data) });
      });
  }

  buttonSelectedLine() {
    const { wallet } = this.props;
    const { selectedLine } = wallet;

    if (selectedLine >= 0) {
      this.setState({
        id: wallet.expenses[selectedLine].id,
        value: wallet.expenses[selectedLine].value,
        currency: wallet.expenses[selectedLine].currency,
        method: wallet.expenses[selectedLine].method,
        tag: wallet.expenses[selectedLine].tag,
        description: wallet.expenses[selectedLine].description,
      });
    }
  }

  clearInput() {
    this.setState({
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
      exchangeRates: {},
    });
  }

  handleChange(event) {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  }

  render() {
    const { id, value, currency, method, tag, description, currencies,
      exchangeRates } = this.state;
    const { wallet, addExpense, editExpenseLine } = this.props;
    const { clearInput } = this;
    const { selectedLine } = wallet;

    return (
      <div
        className={ selectedLine >= 0
          ? `h-20 bg-yellow-100 border-b-green-500 flex flex-row shadow-xl
          items-center space-x-5 `
          : `h-20 bg-white border-b-green-500 flex flex-row shadow-xl
          items-center space-x-5` }
      >
        <form
          className="w-full flex flex-row justify-evenly"
        >
          <span
            className="pl-6 pr-6 text-yellow-500 font-bold "
          >
            <GiPayMoney className="h-12 w-12" />
          </span>

          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0
            flex flex-row"
            htmlFor="value"
          >
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200
                rounded w-full py-2 px-4 text-gray-700 leading-tight
                focus:outline-none focus:bg-white focus:border-green-500"
              placeholder="valor"
              data-testid="value-input"
              type="number"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0
            flex flex-row"
            htmlFor="description"
          >
            <span
              className="pr-6"
            />
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200
                rounded w-full py-2 px-4 text-gray-700 leading-tight
                focus:outline-none focus:bg-white focus:border-green-500"
              placeholder="descrição"
              data-testid="description-input"
              type="text"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <select
            className="form-select appearance-none block px-3 py-1.5
            text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300 rounded transition ease-in-out
            pr-8 ml-8
            focus:text-gray-700 focus:bg-white focus:border-green-600
            focus:outline-none"
            aria-label="moeda"
            data-testid="currency-input"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((cur) => (<option key={ cur } value={ cur }>{cur}</option>))}
          </select>

          <select
            className="form-select appearance-none block px-3 py-1.5
            text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300 rounded transition ease-in-out
            pr-8 ml-8
            focus:text-gray-700 focus:bg-white focus:border-green-600
            focus:outline-none"
            aria-label="Metodo Pagamento"
            data-testid="method-input"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            className="form-select appearance-none block px-3 py-1.5
            text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300 rounded transition ease-in-out
            pr-8 ml-8
            focus:text-gray-700 focus:bg-white focus:border-green-600
            focus:outline-none"
            aria-label="Categoria"
            data-testid="tag-input"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option defaultValue="Alimentação" value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button
            className={ selectedLine >= 0
              ? `h-min-10  bg-yellow-500  text-black rounded  opacity-80
              hover:opacity-100 pr-2 pl-2 ml-4 mr-2`
              : `h-min-10  bg-green-500  text-black rounded  opacity-80
              hover:opacity-100 pr-2 pl-2 ml-4 mr-2` }
            type="button"
            onClick={ () => {
              const expenseObj = {
                id,
                value,
                currency,
                method,
                tag,
                description,
                exchangeRates,
              };
              if (selectedLine >= 0) {
                editExpenseLine(expenseObj);
              } else {
                addExpense(expenseObj);
              }
              this.setState({ value: '' });
              clearInput();
            } }
          >
            {selectedLine >= 0 ? 'Editar despesa' : 'Adicionar despesa'}
          </button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  addExpense: (payload) => dispatch(ACT.addExpense(payload)),
  requestExchangeRates: () => dispatch(ACT.requestExchangeRates()),
  fetchExchangeRates: (payload) => dispatch(ACT.fetchExchangeRates(payload)),
  editExpenseLine: (payload) => dispatch(ACT.editExpenseLine(payload)),
});

Form.propTypes = {
  wallet: PropTypes.shape({
    total: PropTypes.number.isRequired,
    expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedLine: PropTypes.number.isRequired,
  }).isRequired,
  addExpense: PropTypes.func.isRequired,
  editExpenseLine: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
