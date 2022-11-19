import { CircularProgress, Grid } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  container: {
    height: '100vh',
  },
}));

const Fallback = () => {
  const { classes } = useStyles();

  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.container}>
      <CircularProgress />
    </Grid>
  );
};
export default Fallback;
