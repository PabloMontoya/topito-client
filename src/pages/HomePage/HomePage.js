import React from 'react';
import { Typography, Container } from '@mui/material';

const HomePage = () => {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ textAlign: 'center', padding: '20px' }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ color: 'white', marginBottom: '20px' }}
      >
        Home
      </Typography>
    </Container>
  );
};

export default HomePage;
