import React from 'react';
import PropTypes from 'prop-types';
import Loginbutton from '../components/Loginbutton';
import Logininput from '../components/LoginInput';
import Title from '../components/Title';

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
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div
          className="flex flex-row items-center justify-evenly border pl-24 shadow-2xl
          relative"
        >
          <Title />
          <form
            className="bg-white shadow-2xl rounded px-12 pt-6 pb-8 mb-4 mr-28 flex
              flex-col items-center"
          >
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
            <Loginbutton
              email={ email }
              buttonDisable={ buttonDisable }
              history={ history }
            />
          </form>
          <img
            src="https://image.freepik.com/free-vector/savings-background-design_1270-10.jpg"
            alt="wallet"
          />
        </div>
      </div>

    );
  }
}

Login.propTypes = {
  // bbuttonDisable: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
