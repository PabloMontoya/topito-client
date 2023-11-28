import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css'; // Assuming you have a CSS file for LoginPage

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1 className="login-title">Welcome</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
