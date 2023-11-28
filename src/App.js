// src/App.js

import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      {!isLoggedIn ? <LoginPage /> : <HomePage />}
    </div>
  );
};

export default App;
