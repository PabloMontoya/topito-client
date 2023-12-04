import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '../../context/Authentication/useAuthentication';
import { Typography, Container, Box, Link, useTheme } from '@mui/material';
import SignupForm from '../../components/SignupForm/SignupForm';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const SignupPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ textAlign: 'center', padding: '20px' }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ color: theme.palette.text.white }}
      >
        Create an Account using Your Email
      </Typography>
      <Box sx={{ maxWidth: 170, margin: '0 auto', padding: '20px' }}>
        <img
          src="/topito.png"
          alt="Topito Logo"
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
      <SignupForm />
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.white, marginTop: '20px' }}
      >
        Already have an Account?{' '}
        <Link component={RouterLink} to="/login" sx={{ color: 'inherit' }}>
          Log in instead
        </Link>
      </Typography>
    </Container>
  );
};

export default SignupPage;
