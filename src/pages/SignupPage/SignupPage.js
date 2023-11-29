import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../../components/SignupForm/SignupForm';
import './SignupPage.css';

const SignupPage = ({ setIsAuthenticated }) => {
  return (
    <div>
      <h1>Create an Account using Your Email</h1>
      <img src="/topito.png" alt="Topito Logo" className="signup-logo" />
      <SignupForm setIsAuthenticated={setIsAuthenticated} />
      <p>
        Already have an Account? <Link to="/login">Log in instead</Link>
      </p>
    </div>
  );
};

export default SignupPage;
