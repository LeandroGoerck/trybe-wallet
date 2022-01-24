import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
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
