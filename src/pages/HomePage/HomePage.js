import React from 'react';
import { Typography, Container, useTheme } from '@mui/material';

const HomePage = () => {
  const theme = useTheme();

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ textAlign: 'center', padding: '20px' }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ color: theme.palette.text.white, marginBottom: '20px' }}
      >
        Home
      </Typography>
    </Container>
  );
};

export default HomePage;
