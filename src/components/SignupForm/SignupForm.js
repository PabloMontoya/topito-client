import React, { useRef, useState, useEffect } from 'react';
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton';
import './SignupForm.css';

const SignupForm = ({ setIsAuthenticated }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const isEmailFilled = emailRef.current && emailRef.current.value;
    const isPasswordFilled = passwordRef.current && passwordRef.current.value;
    setIsFormValid(isEmailFilled && isPasswordFilled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the signup logic here
  };

  useEffect(() => {
    validateForm();
  }, [emailRef, passwordRef]);

  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          onChange={validateForm}
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          onChange={validateForm}
        />
        <button type="submit" disabled={!isFormValid}>Sign Up</button>
      </form>
  
      <div className="divider">
        <span className="or-text">OR</span>
      </div>

      <GoogleAuthButton context={'signup'} setIsAuthenticated={setIsAuthenticated} />
    </>
  );
};

export default SignupForm;
