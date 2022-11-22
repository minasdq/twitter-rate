import { useRecoilState } from 'recoil';

import {
  AppBar, Container, Grid, IconButton, Theme, Toolbar, Tooltip,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { SunIcon, MoonIcon } from '@heroicons/react/outline';

import themeAtom from 'Atoms/theme';

import { ThemeMode } from 'Types/common';

import DarkLogo from 'Assets/images/DarkLogo.svg';
import LightLogo from 'Assets/images/LightLogo.svg';

const useStyles = makeStyles()((theme: Theme) => ({
  header: {
    background: theme.palette.background.default,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    color: theme.palette.primary.main,
  },
  iconContainer: {
    flexGrow: 0,
  },
}));

const Header = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const { classes } = useStyles();

  return (
    <AppBar position="static" className={classes.header}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={classes.toolbar}>
          <Grid>
            <img src={theme.mode === ThemeMode.LIGHT ? LightLogo : DarkLogo} alt="logo" />
          </Grid>
          <Grid className={classes.iconContainer}>
            <Tooltip title={(theme.mode as string).toLocaleLowerCase()}>
              <IconButton onClick={() => setTheme({
                mode: theme.mode === ThemeMode.LIGHT
                  ? ThemeMode.DARK : ThemeMode.LIGHT,
              })}
              >
                {theme.mode === ThemeMode.LIGHT
                  ? <SunIcon className={classes.icon} />
                  : <MoonIcon className={classes.icon} />}
              </IconButton>
            </Tooltip>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
