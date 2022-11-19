import { useNavigate } from 'react-router-dom';

import { Button, Grid, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { SearchIcon } from '@heroicons/react/outline';

import Autocomplete from './Autocomplete';

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
  username: string,
  setUsername: (value: string) => void
}

const SearchBar = ({ username, setUsername }: SearchBarProps) => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <Grid className={classes.container}>
      <Autocomplete username={username} setUsername={setUsername} />
      <Button variant="contained" className={classes.button} onClick={() => navigate(`profile/${username}`)}>
        <SearchIcon className={classes.icon} />
      </Button>
    </Grid>
  );
};
export default SearchBar;
