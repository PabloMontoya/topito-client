import { useContext } from 'react';
import { AuthenticationContext } from './AuthenticationContext';

const useAuthentication = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(
    AuthenticationContext
  );

  return { isAuthenticated, setIsAuthenticated };
};

export default useAuthentication;
