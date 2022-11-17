import { Button, Grid, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Search } from 'react-feather';

import Autocomplete from './Autocomplete';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(1),
    height: 56,
  },
}));

const Searchbar = () => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.container}>
      <Autocomplete />
      <Button variant="contained" className={classes.button}>
        <Search />
      </Button>
    </Grid>
  );
};
export default Searchbar;
