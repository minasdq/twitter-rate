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
import SearchBar from 'Components/SearchBar';

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

  const {
    data: usernameInfo, isLoading: isUsernameInfoLoading, isError: isUsernameInfoError,
  } = useQuery({
    queryKey: ['getUser', initialUsername],
    queryFn: () => axios.get(`get/user/${initialUsername}`),
  });

  const {
    data: mutualFollowers, isLoading: isMutualFollowersLoading,
    isError: isMutualFollowersError,
  } = useQuery({
    queryKey: ['mutualFollowers', initialUsername],
    queryFn: () => axios.get(`get/mutual-followers/?username=${initialUsername}&id=${usernameInfo?.data?.body?.id_str}`),
    enabled: !!usernameInfo?.data?.body?.id_str,
  });

  const showResult = () => {
    if (isMutualFollowersLoading) {
      return <CircularProgress />;
    } if (isMutualFollowersError) {
      return (
        <Typography>
          An unknown error occurred
        </Typography>
      );
    }
    return (
      <Card content="6" media={<Avatar />} />
    );
  };

  const showUserInfo = () => {
    if (isUsernameInfoLoading) {
      return <CircularProgress />;
    } if (isUsernameInfoError) {
      return (
        <Typography>
          An unknown error occurred
        </Typography>
      );
    }
    if (!usernameInfo?.data.body) {
      return (
        <Typography>
          User with this profile was not found
        </Typography>
      );
    }
    return (
      <>
        <Grid container justifyContent="center">
          <Card
            content={usernameInfo?.data.body.favourites_count}
            media={<HeartIcon className={classes.icon} />}
          />
          <Card
            content={usernameInfo?.data.body.followers_count}
            media={<UserAddIcon className={classes.icon} />}
          />
          <Card
            content={usernameInfo?.data.body.friends_count}
            media={<UsersIcon className={classes.icon} />}
          />
          <Card content="6" media={<ChatAlt2Icon className={classes.icon} />} />
          <Card content="6" media={<SwitchVerticalIcon className={classes.icon} />} />
        </Grid>
        <Grid className={classes.resultCard}>
          {showResult()}
        </Grid>
      </>
    );
  };

  return (
    <Grid className={classes.container}>
      <Grid className={classes.searchContainer}>
        <SearchBar username={username} setUsername={setUsername} />
      </Grid>
      <Grid className={classes.cardsContainer}>
        {showUserInfo()}
      </Grid>
    </Grid>
  );
};

export default Report;
