import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthentication from '../context/Authentication/useAuthentication';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthentication();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
