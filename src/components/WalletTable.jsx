import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletTable extends React.Component {
  render() {
    const { wallet } = this.props;
    const { expenses } = wallet;
    // const { description, tag, method, value, currency } = expenses;
    console.log(expenses);
    return (
      <table className="table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-slate-300">Descrição</th>
            <th className="px-4 py-2 border-b border-slate-300">Tag</th>
            <th className="px-4 py-2 border-b border-slate-300">
              Método de pagamento
            </th>
            <th className="px-4 py-2 border-b border-slate-300">Valor</th>
            <th className="px-4 py-2 border-b border-slate-300">Moeda</th>
            <th className="px-4 py-2 border-b border-slate-300">
              Câmbio utilizado
            </th>
            <th className="px-4 py-2 border-b border-slate-300">
              Valor convertido
            </th>
            <th className="px-4 py-2 border-b border-slate-300">
              Moeda de conversão
            </th>
            <th className="px-4 py-2 border-b border-slate-300">
              Editar/Excluir
            </th>
          </tr>
        </thead>
        {expenses.length > 0
        && expenses.map((exp, index) => {
          const exchangeDesc = exp.exchangeRates[exp.currency].name.split('/');
          const exchangeAsk = Number(exp.exchangeRates[exp.currency].ask);
          const convertedValue = Number(exp.value) * exchangeAsk;
          return (
            <tbody key={ index } className="text-center">
              <tr>
                <td className="border-b border-slate-300">
                  {exp.description}
                </td>
                <td className="border-b border-slate-300">{exp.tag}</td>
                <td className="border-b border-slate-300">{exp.method}</td>
                <td className="border-b border-slate-300">{exp.value}</td>
                <td className="border-b border-slate-300">
                  {exchangeDesc[0]}
                </td>
                <td className="border-b border-slate-300">{exchangeAsk.toFixed(2)}</td>
                <td className="border-b border-slate-300">{convertedValue.toFixed(2)}</td>
                <td className="border-b border-slate-300">Real</td>
                <td className="border-b border-slate-300">9</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  }
}

const mapStateToProps = (state) => state;

WalletTable.propTypes = {
  wallet: PropTypes.shape({
    total: PropTypes.number.isRequired,
    expenses: PropTypes.shape({
      map: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

};

export default connect(mapStateToProps, null)(WalletTable);
