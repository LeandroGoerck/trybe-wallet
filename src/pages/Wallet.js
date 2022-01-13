import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      moedas: [],
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Form
          handleChange={ this.handleChange }
        />
      </div>
    );
  }
}

export default Wallet;
