import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GiPayMoney } from 'react-icons/gi';
import { connect } from 'react-redux';
import * as ACT from '../actions';

const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      currency: '',
      method: methodOptions[0],
      tag: tagOptions[0],
      description: '',
      exchangeRates: {},
      currencies: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.buttonSelectedLine = this.buttonSelectedLine.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  componentDidUpdate() {
    const { buttonSelectedLine } = this;
    const { wallet, updateForm } = this.props;
    if (wallet.updateForm === true) {
      buttonSelectedLine();
      updateForm(false);
    }
  }

  getCurrencies() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        const currencyOptions = Object.keys(data);
        this.setState({ currencies: currencyOptions, currency: currencyOptions[0] });
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
    const { currencies } = this.state;
    this.setState({
      value: '',
      currency: currencies[0],
      method: methodOptions[0],
      tag: tagOptions[0],
      description: '',
      exchangeRates: {},
    });
  }

  handleChange(event) {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  }

  renderOptions(optionsArray) {
    return (optionsArray.map((option, index) => (
      <option key={ index } value={ option }>
        {option}
      </option>
    )));
  }

  render() {
    const { id, value, currency, method, tag, description, currencies,
      exchangeRates } = this.state;
    const { wallet, addExpense, editExpenseLine } = this.props;
    const { clearInput, renderOptions } = this;
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
            {renderOptions(currencies)}
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
            {renderOptions(methodOptions)}

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
            {renderOptions(tagOptions)}
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
  updateForm: (payload) => dispatch(ACT.updateForm(payload)),
});

Form.propTypes = {
  addExpense: PropTypes.func.isRequired,
  editExpenseLine: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedLine: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    updateForm: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
