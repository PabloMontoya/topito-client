import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c2c54',
    },
    secondary: {
      main: '#342a47',
    },
    text: {
      primary: '#2c2c54',
      white: '#FFF',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2c2c54', // Focus color for input fields
          },
        },
      },
    },
  },
});

export default theme;
