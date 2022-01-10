import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Logininput extends Component {
  render() {
    const { testID, type, placeholder, id, value, handleChange } = this.props;
    return (
      <div className="w- max-w-xs">
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2
            px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            data-testid={ testID }
            type={ type }
            placeholder={ placeholder }
            id={ id }
            value={ value }
            onChange={ (event) => handleChange(event) }
          />
        </div>
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
};

export default Logininput;
