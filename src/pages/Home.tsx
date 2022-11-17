import { Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import Searchbar from 'Components/Searchbar';

import Formaloo from 'Assets/images/Formaloo.jpg';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    minHeight: '100vh',
    width: 600,
    maxWidth: '80%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: theme.spacing(4),
  },
  description: {
    margin: theme.spacing(0.5, 0, 4, 0),
    color: theme.palette.grey[800],
  },
}));

const Home = () => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.container}>
      <img src={Formaloo} alt="formaloo" className={classes.image} />
      <Typography variant="h1">Formaloo</Typography>
      <Typography
        className={classes.description}
        variant="body1"
      >
        A tool to detect who is fake on Twitter
      </Typography>
      <Searchbar />
    </Grid>
  );
};

export default Home;
