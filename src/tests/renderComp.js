import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationContext } from '../context/Authentication/AuthenticationContext';
import { NotificationContext } from '../context/Notification/NotificationContext';

export const renderComp = (
  ui,
  {
    authConfig = { isAuthenticated: false },
    notificationConfig = { setNotification: jest.fn() },
  } = {},
) => {
  const setIsAuthenticated = jest.fn();

  const { isAuthenticated } = authConfig;
  const { setNotification } = notificationConfig;

  const wrapper = ({ children }) => (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      <NotificationContext.Provider value={{ setNotification }}>
        <Router>{children}</Router>
      </NotificationContext.Provider>
    </AuthenticationContext.Provider>
  );

  return render(ui, { wrapper });
};
