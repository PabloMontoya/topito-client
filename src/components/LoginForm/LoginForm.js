import React, { useRef, useState, useEffect } from 'react';
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton';
import './LoginForm.css';

const LoginForm = ({ setIsAuthenticated }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // Function to update the state based on input values
  const validateForm = () => {
    const isUsernameFilled = usernameRef.current && usernameRef.current.value;
    const isPasswordFilled = passwordRef.current && passwordRef.current.value;
    setIsFormValid(isUsernameFilled && isPasswordFilled);
  };

  // Effect to validate form on each input change
  useEffect(() => {
    validateForm();
  }, [usernameRef, passwordRef]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the login logic here
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          ref={usernameRef}
          onChange={validateForm}
          />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          onChange={validateForm}
          />
        <button type="submit" disabled={!isFormValid}>Login</button>
      </form>

      <div className="divider">
        <span className="or-text">OR</span>
      </div>

      <GoogleAuthButton context={'signin'} setIsAuthenticated={setIsAuthenticated} />
    </>
  );
};

export default LoginForm;
