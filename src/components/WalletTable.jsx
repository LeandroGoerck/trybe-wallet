import React from 'react';

class WalletTable extends React.Component {
  render() {
    return (
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Tag</th>
            <th className="px-4 py-2">Método de pagamento</th>
            <th className="px-4 py-2">Valor</th>
            <th className="px-4 py-2">Moeda</th>
            <th className="px-4 py-2">Câmbio utilizado</th>
            <th className="px-4 py-2">Valor convertido</th>
            <th className="px-4 py-2">Moeda de conversão</th>
            <th className="px-4 py-2">Editar/Excluir</th>
          </tr>
        </thead>
      </table>
    );
  }
}

export default WalletTable;
