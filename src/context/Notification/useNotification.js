import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';

const useNotification = () => {
  const { setNotification } = useContext(NotificationContext);

  const showNotification = (type, message) => {
    setNotification({ type, message, open: true });
  };

  return showNotification;
};

export default useNotification;
