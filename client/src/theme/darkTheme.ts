import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  typography: {
    h1: {
      fontSize: '3rem',
    },
    body1: {
      fontSize: '1.2rem',
    },
    body2: {
      fontSize: '1rem',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#E96B00',
    },
    secondary: {
      dark: '#053F5C',
      main: '#429EBD',
      light: '#9FE7F5',
    },
    background: {
      default: '#272727',
    },
  },
});

export default darkTheme;
