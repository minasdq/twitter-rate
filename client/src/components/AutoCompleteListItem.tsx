import { HTMLAttributes, memo, useMemo } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

interface AutoCompleteListItemProps extends HTMLAttributes<HTMLElement> {
  avatarSrc: string;
  name: string;
  username: string;
  inputValue: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
  highlightedText: {
    fontWeight: 700,
  },
  gray: {
    color: theme.palette.grey[700],
  },
}));

const AutoCompleteListItem = ({
  name,
  avatarSrc,
  username,
  inputValue,
  ...otherProps
}: AutoCompleteListItemProps) => {
  const { classes } = useStyles();
  const parts = useMemo(() => {
    const matches = match(name, inputValue, { insideWords: true });
    return parse(name, matches);
  }, [name, inputValue]);

  const highlightedText = useMemo(() => (
    parts.map((part) => (
      <Typography
        key={part.text}
        component="span"
        className={part.highlight ? classes.highlightedText : ''}
      >
        {part.text}
      </Typography>
    ))
  ), [parts]);

  return (
    <ListItem
      alignItems="flex-start"
      {...otherProps}
    >
      <ListItemAvatar>
        <Avatar alt={name} src={avatarSrc} />
      </ListItemAvatar>
      <ListItemText
        primary={highlightedText}
        secondary={(
          <Typography
            variant="body2"
            className={classes.gray}
          >
            @
            {username}
          </Typography>
        )}
      />
    </ListItem>
  );
};

export default memo(AutoCompleteListItem);
