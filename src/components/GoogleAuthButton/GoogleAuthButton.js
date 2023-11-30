import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../../utils/decodeToken';
import './GoogleAuthButton.css';

const GoogleAuthButton = ({ setIsAuthenticated, context }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
    /* global google */
    google.accounts.id.initialize({
      client_id: REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleGoogleCallbackResponse,
      context,
      ux_mode: 'popup',
    });
    google.accounts.id.renderButton(
      document.getElementById('googleAuthButton'),
      { theme: 'outline', size: 'large' }
    );
    google.accounts.id.prompt();
    // eslint-disable-next-line
  }, []);

  const handleGoogleCallbackResponse = (response) => {
    const { credential } = response;
    const decoded = decodeToken(credential);
    const { given_name, family_name, email, picture } = decoded;

    sessionStorage.setItem('user_name', given_name);
    sessionStorage.setItem('user_lastname', family_name);
    sessionStorage.setItem('user_email', email);
    sessionStorage.setItem('user_picture', picture);

    setIsAuthenticated(true);
    navigate('/home');
  };

  return <div id="googleAuthButton" className="google-login-container"></div>;
};

export default GoogleAuthButton;
