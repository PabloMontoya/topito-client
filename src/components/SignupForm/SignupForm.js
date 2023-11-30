import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { SignupSchema } from './SingupForm.schema';
import { TextField, Button, Box, Typography, Divider, useTheme } from '@mui/material';
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton';

const SignupForm = ({ setIsAuthenticated }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      sessionStorage.setItem('user_email', values.email);
      setIsAuthenticated(true);
      navigate('/home');
      // Handle the signup logic here
    },
  });

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: '20px', backgroundColor: theme.palette.background.paper, borderRadius: '8px' }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          type="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          margin="normal"
          variant="outlined"
        />
        <Button 
          type="submit" 
          fullWidth
          sx={{
            marginY: 2,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': { backgroundColor: theme.palette.primary.dark },
            '&:disabled': { backgroundColor: theme.palette.action.disabled, color: theme.palette.action.disabledBackground }
          }}
          disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
        >
          Sign Up
        </Button>
      </form>

      <Divider sx={{ my: 2, borderColor: theme.palette.primary.main }} textAlign="center">
        <Typography variant="h7" component="span" sx={{ color: theme.palette.primary.main, px: 2 }}>OR</Typography>
      </Divider>

      <GoogleAuthButton context={'signup'} setIsAuthenticated={setIsAuthenticated} />
    </Box>
  );
};

export default SignupForm;
