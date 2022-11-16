import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
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
