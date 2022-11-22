import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';

import {
  Avatar, CircularProgress, Grid, Theme, Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import {
  ChatAlt2Icon, UserAddIcon, UsersIcon,
} from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';

import Card from 'Components/Card';
import SearchBar from 'Components/SearchBar';

import { getRateTwitter } from 'Utils/getUserStatusUtils';
import { mapUserTypeUtil } from 'Utils/mapTypeUtils';
import { socialMediaNumberFormatter } from 'Utils/numberUtils';

import axios from 'Configs/axios';

import { UserResponse, UsersResponse } from 'Types/api';

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
    marginBottom: theme.spacing(1.5),
  },
  infoCards: {
    marginBottom: theme.spacing(4),
  },
  heart: {
    color: theme.palette.error.main,
  },
  avatar: {
    width: 50,
    height: 50,
    marginBottom: theme.spacing(1.5),
  },
  followers: {
    color: theme.palette.primary.main,
  },
  following: {
    color: theme.palette.secondary.dark,
  },
  tweets: {
    color: theme.palette.secondary.main,
  },
  text: {
    fontWeight: 600,
  },
}));

const Report = () => {
  const { username: initialUsername } = useParams();
  const [username, setUsername] = useState(initialUsername || '');
  const { classes } = useStyles();

  const {
    data: usernameInfo, isLoading: isUsernameInfoLoading, isError: isUsernameInfoError,
  } = useQuery<UserResponse>({
    queryKey: ['getUser', initialUsername],
    queryFn: () => axios.get(`get/user/${initialUsername}`),
  });

  const {
    data: mutualFollowers, isLoading: isMutualFollowersLoading,
    isError: isMutualFollowersError,
  } = useQuery < UsersResponse>({
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
      <Card
        content={(
          <Typography variant="body2" className={classes.text}>
            Score:
            &nbsp;
            {getRateTwitter({
              ...mapUserTypeUtil(usernameInfo!.data.body),
              mutualFollowers: [],
            })}
            /10
          </Typography>
          )}
        media={(
          <>
            <Avatar
              className={classes.avatar}
              src={usernameInfo!.data.body.profile_image_url_https}
            />
            <Typography variant="body2" className={classes.text}>
              {`@${initialUsername}`}
            </Typography>
          </>
        )}
      />
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
          UserResponse with this profile was not found
        </Typography>
      );
    }
    return (
      <>
        <Grid container justifyContent="center" className={classes.infoCards}>
          <Card
            content={socialMediaNumberFormatter.format(usernameInfo!.data.body.favourites_count)}
            media={(
              <>
                <HeartIcon className={classnames(classes.icon, classes.heart)} />
                <Typography variant="body2" className={classes.text}>Likes</Typography>
              </>
            )}
          />
          <Card
            content={socialMediaNumberFormatter.format(usernameInfo!.data.body.followers_count)}
            media={(
              <>
                <UserAddIcon className={classnames(classes.icon, classes.followers)} />
                <Typography variant="body2" className={classes.text}>Followers</Typography>
              </>
            )}
          />
          <Card
            content={socialMediaNumberFormatter.format(usernameInfo!.data.body.friends_count)}
            media={(
              <>
                <UsersIcon className={classnames(classes.icon, classes.following)} />
                <Typography variant="body2" className={classes.text}>Following</Typography>
              </>
            )}
          />
          <Card
            content={socialMediaNumberFormatter.format(usernameInfo!.data.body.statuses_count)}
            media={(
              <>
                <ChatAlt2Icon className={classnames(classes.icon, classes.tweets)} />
                <Typography variant="body2" className={classes.text}>Tweets</Typography>
              </>
          )}
          />
        </Grid>
        <Grid>
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
