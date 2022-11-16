import { useRecoilValue } from 'recoil';

import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import themeAtom from 'Atoms/theme';

import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

import { ThemeMode } from 'Types/theme';

interface ThemeProviderProps {
  children: JSX.Element
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { mode: themeMode } = useRecoilValue(themeAtom);

  return (
    <MuiThemeProvider theme={themeMode === ThemeMode.LIGHT ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
