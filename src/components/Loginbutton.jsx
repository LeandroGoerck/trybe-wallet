import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ACT from '../actions';

class Loginbutton extends Component {
  render() {
    const { addEmail, email, buttonDisable, history } = this.props;
    return (
      <div className="flex items-center justify-between">
        <button
          className={
            buttonDisable
              ? `bg-green-500 text-white font-bold py-2 px-4 rounded opacity-50
              cursor-not-allowed`
              : 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          }
          type="button"
          disabled={ buttonDisable }
          onClick={ () => {
            addEmail(email);
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => ({
  addEmail: (userInfo) => dispatch(ACT.addEmail(userInfo)),
});

Loginbutton.propTypes = {
  buttonDisable: PropTypes.bool.isRequired,
  addEmail: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  // history: PropTypes.objectOf().isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Loginbutton);
