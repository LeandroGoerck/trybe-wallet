import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ACT from '../actions';

class Header extends Component {
  componentDidMount() {
    const { calcTotalExpense } = this.props;
    calcTotalExpense();
  }

  render() {
    const { user } = this.props;
    const { email } = user;
    const { wallet } = this.props;
    const { total = '187.12' } = wallet;
    const displayTotal = Math.round(Number(total) * 100) / 100;
    return (
      <div
        className="h-20 bg-white-200 border-b-green-500 flex flex-row border
        items-center space-x-5 place-content-between"
      >
        <div
          className="text-4xl m-4 ml-8"
          style={ { fontFamily: '"Alegreya Sans SC", sans-serif' } }
        >
          <span className="text-green-600">T</span>
          <span>rybe </span>
          <span className="text-yellow-400">W</span>
          <span>allet</span>
        </div>
        <div>
          <span
            data-testid="email-field"
            className="p-10 text-yellow-400"
          >
            {email}
          </span>
          <span className="text-green-500 mr-2">
            Despesa total: R$
          </span>
          <span data-testid="total-field" className="text-green-500 mr-1">
            {displayTotal}
          </span>
          <span data-testid="header-currency-field" className="text-green-500 mr-8">
            BRL
          </span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => ({
  calcTotalExpense: () => dispatch(ACT.calcTotalExpense()),
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    total: PropTypes.number.isRequired,
  }).isRequired,
  calcTotalExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
