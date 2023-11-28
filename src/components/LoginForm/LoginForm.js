import React, { useRef, useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = () => {
    const isUsernameFilled = usernameRef.current && usernameRef.current.value;
    const isPasswordFilled = passwordRef.current && passwordRef.current.value;
    setIsFormValid(isUsernameFilled && isPasswordFilled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Username"
        ref={usernameRef}
        onChange={handleInputChange}
      />
      <input 
        type="password"
        placeholder="Password"
        ref={passwordRef}
        onChange={handleInputChange}
      />
      <button type="submit" disabled={!isFormValid}>Login</button>
    </form>
  );
};

export default LoginForm;
