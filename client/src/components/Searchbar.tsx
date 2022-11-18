import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import TwitterApi from 'twitter-v2';

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

  const data = useQuery({
    queryKey: ['todos'],
    queryFn: () => axios.get('http://localhost:5000/api/getUsers'),
  });

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
