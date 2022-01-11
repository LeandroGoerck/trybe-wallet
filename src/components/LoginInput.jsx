import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AiFillCheckCircle } from 'react-icons/ai';

class Logininput extends Component {
  render() {
    const { testID, type, placeholder, id, value, handleChange, enableCheckIcon,
    } = this.props;
    return (
      <div className="max-w-xs relative">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={ id }
          >
            { type.charAt(0).toUpperCase() + type.slice(1) }
          </label>
          <input
            className="shadow appearance-none border rounded w-80 py-2
            px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            data-testid={ testID }
            type={ type }
            placeholder={ placeholder }
            id={ id }
            value={ value }
            onChange={ (event) => handleChange(event) }
          />
        </div>
        <AiFillCheckCircle
          className={ enableCheckIcon
            ? 'absolute top-10 right-2 z-10 text-green-500'
            : 'absolute top-10 right-2 z-10 text-red-500 opacity-50' }
        />
      </div>
    );
  }
}

Logininput.propTypes = {
  testID: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  enableCheckIcon: PropTypes.bool.isRequired,
};

export default Logininput;
