import React from 'react';
import Loginbutton from '../components/Loginbutton';
import Logininput from '../components/LoginInput';

class Login extends React.Component {
  render() {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <Logininput
                data-testid="email-input"
                type="email"
                placeholder="Email-Input"
                id="email"
                value={ 0 }
                onChange={ 0 }
              />
              <Logininput
                data-testid="password-input"
                type="password"
                placeholder="*******"
                id="password"
                value={ 0 }
                onChange={ 0 }
              />
            </div>
            <Loginbutton />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
