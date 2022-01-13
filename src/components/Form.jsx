import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IoIosAddCircle } from 'react-icons/io';
import { connect } from 'react-redux';
import * as ACT from '../actions';

const tesObj = {
  id: 0,
  value: '10',
  currency: 'USD',
  method: 'Cartão de crédito',
  tag: 'Lazer',
  description: 'Dez dólares',
  exchangeRates: 'mockData',
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: 0 ,
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
      // exchangeRates: {},
      currencies: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
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

  handleChange(event) {
    const { value, id } = event.target;
    this.setState({ [id]: value });
    console.log(id, value);
  }

  render() {
    // const { value, currency, method, tag, description,
    //   exchangeRates, addExpense } = this.props;
    const { value, currency, method, tag, description, currencies } = this.state;
    const { addExpense } = this.props;
    const { getCurrencies } = this;

    return (
      <div
        className="h-20 bg-white-200 border-b-green-500 flex flex-row shadow-xl
        items-center space-x-5 place-content-between"
      >
        <form className="w-full flex flex-row justify-evenly">

          <span
            className="pl-6 pr-6 text-yellow-500 font-bold "
          >
            Adicionar despesa
          </span>

          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0
            flex flex-row"
            htmlFor="value-input"
          >
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200
                rounded w-full py-2 px-4 text-gray-700 leading-tight
                focus:outline-none focus:bg-white focus:border-green-500"
              placeholder="valor"
              data-testid="value-input"
              type="text"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0
            flex flex-row"
            htmlFor="description-input"
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
            {/* <option value="BRL">BRL</option>
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option> */}
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
            className="h-full "
            type="button"
            onClick={ () => {
              // addExpense([{ expenses: { id: 'id', value: 'value', currency: 'currency' } }]);
              addExpense(tesObj);
              getCurrencies();
            } }
          >
            <IoIosAddCircle
              className="ml-4 text-4xl text-green-500  hover:text-green-700"
            />
          </button>

        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (payload) => dispatch(ACT.addExpense(payload)),
});

Form.propTypes = {
  // bbuttonDisable: PropTypes.bool.isRequired,
  // value: PropTypes.number.isRequired,
  // currency: PropTypes.string.isRequired,
  // method: PropTypes.string.isRequired,
  // tag: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  // addExpense: PropTypes.func.isRequired,
  // exchangeRates: PropTypes.string.isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Form);
