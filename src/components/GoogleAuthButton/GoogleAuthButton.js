import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '../../context/Authentication/useAuthentication';
import useNotification from '../../context/Notification/useNotification';
import { decodeJwt } from '../../utils/jwt';
import { googleAuth } from '../../api/auth';
import { ROUTES } from '../../constants/routes';
import { NOTIFICATION_TYPES } from '../../constants/notificationTypes';
import { MESSAGES } from '../../constants/messages';
import './GoogleAuthButton.css';

const { INFO, WARNING, ERROR } = NOTIFICATION_TYPES;
const { WELCOME, SOMETHING_WENT_WRONG } = MESSAGES;

const GoogleAuthButton = ({ context }) => {
  const navigate = useNavigate();
  const showNotification = useNotification();
  const { setIsAuthenticated } = useAuthentication();

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

  const handleGoogleCallbackResponse = async (response) => {
    const { credential } = response;
    const { given_name, family_name, email, picture, exp } =
      decodeJwt(credential);
    const payload = { email, exp };

    await googleAuth(payload)
      .then((response) => {
        if (response.code === 200) {
          showNotification(INFO, WELCOME);
          sessionStorage.setItem('user_name', given_name);
          sessionStorage.setItem('user_lastname', family_name);
          sessionStorage.setItem('user_email', email);
          sessionStorage.setItem('user_picture', picture);
          setIsAuthenticated(true);
          navigate(ROUTES.HOME.PATH);
        } else {
          showNotification(WARNING, SOMETHING_WENT_WRONG);
        }
      })
      .catch((error) => {
        console.error(error);
        showNotification(ERROR, SOMETHING_WENT_WRONG);
      });
  };

  return <div id="googleAuthButton" className="google-login-container"></div>;
};

export default GoogleAuthButton;
