import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    sessionStorage.clear();
    setIsAuthenticated(false);
    navigate('/');
  };

  const userName = sessionStorage.getItem('user_name');
  const userPicture = sessionStorage.getItem('user_picture');

  return (
    isAuthenticated && (
      <AppBar
        position="static"
        sx={{ backgroundColor: 'var(--primary-color)' }}
      >
        <Toolbar>
          <img
            src="/topito.png"
            alt="Topito Logo"
            style={{ maxHeight: '40px', marginRight: '10px' }}
          />
          <Typography
            variant="h6"
            style={{ marginLeft: '10px', fontWeight: 'bold', flexGrow: 0 }}
          >
            Topito
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {userPicture ? (
              <img
                src={userPicture}
                alt={userName}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
            ) : (
              <AccountCircleIcon fontSize="large" />
            )}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
            <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    )
  );
};

export default Navbar;
