import React, { useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useAuthentication from '../../context/Authentication/useAuthentication';
import { ROUTES } from '../../constants/routes';

const { HOME, PROFILE, SETTINGS } = ROUTES;

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useAuthentication();

  const userName = sessionStorage.getItem('user_name');
  const userPicture = sessionStorage.getItem('user_picture');

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

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    isAuthenticated && (
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Toolbar>
          <img
            src="/topito.png"
            alt="Topito Logo"
            style={{
              maxHeight: '40px',
              marginRight: '10px',
              cursor: 'pointer',
            }}
            onClick={() => handleNavigation(HOME.PATH)}
          />
          <Typography
            variant="h6"
            style={{
              marginLeft: '10px',
              fontWeight: 'bold',
              flexGrow: 0,
              cursor: 'pointer',
            }}
            onClick={() => handleNavigation(HOME.PATH)}
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
            <MenuItem onClick={() => handleNavigation(PROFILE.PATH)}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleNavigation(SETTINGS.PATH)}>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    )
  );
};

export default Navbar;
