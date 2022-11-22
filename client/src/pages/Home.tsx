import { useState } from 'react';

import { Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import SearchBar from 'Components/SearchBar';

import Formaloo from 'Assets/images/Formaloo.jpg';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    minHeight: '70vh',
    width: 600,
    maxWidth: '80%',
    margin: '0 auto',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: theme.spacing(4),
  },
  description: {
    margin: theme.spacing(0.5, 0, 4, 0),
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const [username, setUsername] = useState('');
  const { classes } = useStyles();

  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className={classes.container}
    >
      <img src={Formaloo} alt="formaloo" className={classes.image} />
      <Typography variant="h1">Formaloo</Typography>
      <Typography
        className={classes.description}
        variant="body1"
      >
        A tool to detect who is fake on Twitter
      </Typography>
      <SearchBar username={username} setUsername={setUsername} />
    </Grid>
  );
};

export default Home;
