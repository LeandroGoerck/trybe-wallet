import React from 'react';
import PropTypes from 'prop-types';
import Loginbutton from '../components/Loginbutton';
import Logininput from '../components/LoginInput';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      buttonDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }

  handleChange(event) {
    const { value, id } = event.target;
    this.setState({ [id]: value }, () => this.checkInput());
  }

  checkInput() {
    const { email, password } = this.state;
    const validation = /\S+@\S+\.\S+/;
    const MIN = 6;
    if (validation.test(email) && MIN <= password.length) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  }

  render() {
    const { buttonDisable, email, password } = this.state;
    const { history } = this.props;
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <Logininput
                testID="email-input"
                type="email"
                placeholder="alguem@alguem.com"
                id="email"
                value={ email }
                handleChange={ this.handleChange }
              />
              <Logininput
                testID="password-input"
                type="password"
                placeholder="*******"
                id="password"
                value={ password }
                handleChange={ this.handleChange }
              />
            </div>
            <Loginbutton
              email={ email }
              buttonDisable={ buttonDisable }
              history={ history }
            />
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  // bbuttonDisable: PropTypes.bool.isRequired,
  history: PropTypes.func.isRequired,
};

export default Login;
