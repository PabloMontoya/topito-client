import React, { useContext, forwardRef } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { NotificationContext } from '../../context/Notification/NotificationContext';

const NotificationSnackbar = forwardRef((_, ref) => {
  const { notification, setNotification } = useContext(NotificationContext);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={handleClose}
      ref={ref}
    >
      <Alert
        onClose={handleClose}
        severity={notification.type}
        sx={{ width: '100%' }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
});

export default NotificationSnackbar;
