import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  typography: {
    h1: {
      fontSize: '3rem',
    },
    body1: {
      fontSize: '1.2rem',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#E96B00',
    },
    background: {
      default: '#212121',
    },
  },
});

export default darkTheme;
