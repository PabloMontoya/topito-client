import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

// api
import { login } from '../../api/auth';

// context
import useAuthentication from '../../context/Authentication/useAuthentication';
import useNotification from '../../context/Notification/useNotification';

// constants
import { NOTIFICATION_TYPES } from '../../constants/notificationTypes';
import { ROUTES } from '../../constants/routes';
import { MESSAGES } from '../../constants/messages';

// components
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton';

// schemas
import { LoginSchema } from './LoginForm.schema';

const { INFO, WARNING, ERROR } = NOTIFICATION_TYPES;
const { WELCOME_BACK, SOMETHING_WENT_WRONG } = MESSAGES;

const LoginForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const showNotification = useNotification();
  const { setIsAuthenticated } = useAuthentication();

  const handleSubmit = async (values) => {
    await login(values)
      .then((response) => {
        if (response.code === 200) {
          showNotification(INFO, WELCOME_BACK);
          sessionStorage.setItem('user_email', values.email);
          setIsAuthenticated(true);
          navigate(ROUTES.HOME.PATH);
        } else {
          showNotification(WARNING, response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        showNotification(ERROR, SOMETHING_WENT_WRONG);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: '0 auto',
        padding: '20px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
      }}
    >
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
        <Button
          type="submit"
          fullWidth
          sx={{
            marginY: 2,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': { backgroundColor: theme.palette.primary.dark },
            '&:disabled': {
              backgroundColor: theme.palette.action.disabled,
              color: theme.palette.action.disabledBackground,
            },
          }}
          disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
        >
          Login
        </Button>
      </form>

      <Divider
        sx={{ my: 2, borderColor: theme.palette.primary.main }}
        textAlign="center"
      >
        <Typography
          variant="h7"
          component="span"
          sx={{ color: theme.palette.primary.main, px: 2 }}
        >
          OR
        </Typography>
      </Divider>

      <GoogleAuthButton
        context={'signin'}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Box>
  );
};

export default LoginForm;
