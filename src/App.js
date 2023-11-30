import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ProtectedRoute from './utils/ProtectedRoute';

import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route 
              path="/" 
              element={
                isAuthenticated 
                  ? <Navigate to="/home" />
                  : <SignupPage setIsAuthenticated={setIsAuthenticated} />
              } 
            />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/home" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
