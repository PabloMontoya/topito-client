import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Container, Box, Link, useTheme } from '@mui/material';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => {
  const theme = useTheme();

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ textAlign: 'center', padding: '20px' }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ color: theme.palette.text.white, marginBottom: '20px' }}
      >
        Login to Your Account
      </Typography>
      <Box sx={{ maxWidth: 170, margin: '0 auto', padding: '20px' }}>
        <img
          src="/topito.png"
          alt="Topito Logo"
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
      <LoginForm />
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.white, marginTop: '20px' }}
      >
        Don't have an account?{' '}
        <Link component={RouterLink} to="/" sx={{ color: 'inherit' }}>
          Sign up
        </Link>
      </Typography>
    </Container>
  );
};

export default LoginPage;
