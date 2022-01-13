import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     expenses: [],
  //     moedas: [],
  //   };
  // }

  render() {
    return (
      <div>
        <Header />
        <Form />
        <WalletTable />
      </div>
    );
  }
}

export default Wallet;
