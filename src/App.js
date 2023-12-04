import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

// context
import { AuthenticationProvider } from './context/Authentication/AuthenticationContext';
import { NotificationProvider } from './context/Notification/NotificationContext';

// constants
import { ROUTES } from './constants/routes';

// components
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './utils/ProtectedRoute';
import NotificationSnackbar from './components/NotificationSnackbar/NotificationSnackbar';

// pages
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';

// style
import theme from './theme';
import './App.css';

const { BASE, LOGIN, HOME, NOT_FOUND } = ROUTES;

const App = () => {
  return (
    <AuthenticationProvider>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <NotificationSnackbar />
          <Router>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path={BASE.PATH} element={<SignupPage />} />
                <Route path={LOGIN.PATH} element={<LoginPage />} />
                <Route
                  path={HOME.PATH}
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={NOT_FOUND.PATH}
                  element={<Navigate to={HOME.PATH} />}
                />
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </NotificationProvider>
    </AuthenticationProvider>
  );
};

export default App;
