import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage = ({ setIsAuthenticated }) => {
  return (
    <div>
      <h1>Login to Your Account</h1>
      <img src="/topito.png" alt="Topito Logo" className="login-logo" />
      <LoginForm setIsAuthenticated={setIsAuthenticated} />
      <p>
        Don't have an account? <Link to="/">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
