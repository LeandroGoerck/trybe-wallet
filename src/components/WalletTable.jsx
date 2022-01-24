import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import * as ACT from '../actions';

class WalletTable extends React.Component {
  render() {
    const { wallet, delExpenseLine, calcTotalExpense } = this.props;
    const { expenses } = wallet;
    // const { description, tag, method, value, currency } = expenses;
    // console.log(expenses);
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
                <td className="border-b border-slate-300">
                  <button
                    className="bg-yellow-500 font-bold py-2 px-4 rounded
                    opacity-50 hover:opacity-100"
                    data-testid="edit-btn"
                    onClick={ () => {
                      delExpenseLine(index);
                      calcTotalExpense();
                    } }
                    type="button"
                  >
                    <AiFillEdit
                      className="text-white"
                    />
                  </button>
                  <button
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded
                    opacity-50 hover:opacity-100 ml-4 "
                    data-testid="delete-btn"
                    onClick={ () => {
                      delExpenseLine(index);
                      calcTotalExpense();
                    } }
                    type="button"
                  >
                    <MdDelete
                      className="text-white"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  delExpenseLine: (payload) => dispatch(ACT.delExpenseLine(payload)),
  calcTotalExpense: () => dispatch(ACT.calcTotalExpense()),
});

WalletTable.propTypes = {
  wallet: PropTypes.shape({
    total: PropTypes.number.isRequired,
    expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  delExpenseLine: PropTypes.func.isRequired,
  calcTotalExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
