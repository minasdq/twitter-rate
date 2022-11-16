import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E96B00',
    },
    background: {
      default: '#FFFFFF',
    },
  },
});

export default lightTheme;
