import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import {
  Avatar, CircularProgress, Grid, Theme, Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import {
  ChatAlt2Icon, SwitchVerticalIcon, UserAddIcon, UsersIcon,
} from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';

import Card from 'Components/Card';
import Searchbar from 'Components/Searchbar';

import axios from 'Configs/axios';

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    minHeight: '100vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(10),
    alignItems: 'center',
  },
  searchContainer: {
    width: 600,
    maxWidth: '80%',
  },
  cardsContainer: {
    margin: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  icon: {
    width: 50,
    height: 50,
  },
  resultCard: {
    marginBottom: theme.spacing(3),
  },
}));

const Report = () => {
  const { username: initialUsername } = useParams();
  const [username, setUsername] = useState(initialUsername || '');
  const { classes } = useStyles();

  const { data: usernameInfo, isLoading, isError } = useQuery({
    queryKey: ['getUser', initialUsername],
    queryFn: () => axios.get(`getUser/${initialUsername}`),
  });

  const getResult = () => {
    if (isLoading) {
      return <CircularProgress />;
    } if (isError) {
      return (
        <Typography>
          An unknown error occurred
        </Typography>
      );
    }
    return (
      <>
        <Grid className={classes.resultCard}>
          <Card content="6" media={<Avatar />} />
        </Grid>
        <Grid container justifyContent="center">
          <Card content="6" media={<HeartIcon className={classes.icon} />} />
          <Card content="6" media={<UserAddIcon className={classes.icon} />} />
          <Card content="6" media={<UsersIcon className={classes.icon} />} />
          <Card content="6" media={<ChatAlt2Icon className={classes.icon} />} />
          <Card content="6" media={<SwitchVerticalIcon className={classes.icon} />} />
        </Grid>
      </>
    );
  };

  return (
    <Grid className={classes.container}>
      <Grid className={classes.searchContainer}>
        <Searchbar username={username} setUsername={setUsername} />
      </Grid>
      <Grid className={classes.cardsContainer}>
        {getResult()}
      </Grid>
    </Grid>
  );
};

export default Report;
