import React, { createContext, useState } from 'react';
import { NOTIFICATION_TYPES } from '../../constants/notificationTypes';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: NOTIFICATION_TYPES.INFO,
  });

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
