import { useNavigate } from 'react-router-dom';

import { Button, Grid, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { SearchIcon } from '@heroicons/react/outline';

import Autocomplete from './Autocomplete';

import { User } from 'Types/api';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 60,
  },
  button: {
    marginLeft: theme.spacing(1),
    height: '100%',
  },
  icon: {
    width: 25,
    height: 25,
  },
}));

interface SearchBarProps {
  query: Partial<User>,
  setQuery: (value: Partial<User>) => void
}

const SearchBar = ({ query, setQuery }: SearchBarProps) => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <Grid className={classes.container}>
      <Autocomplete query={query} setQuery={setQuery} />
      <Button variant="contained" className={classes.button} onClick={() => navigate(`/report/${query.screen_name}`)}>
        <SearchIcon className={classes.icon} />
      </Button>
    </Grid>
  );
};
export default SearchBar;
