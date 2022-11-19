import {
  Card as MuiCard, CardContent, CardMedia, Theme,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

interface CardProps {
  content: string,
  media: JSX.Element
}

const useStyles = makeStyles()((theme: Theme) => ({
  cardContainer: {
    margin: theme.spacing(3, 3, 0, 0),
    width: 200,
    height: 200,
  },
  media: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(3, 'auto'),
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Card = ({
  content, media,
}: CardProps) => {
  const { classes } = useStyles();

  return (
    <MuiCard className={classes.cardContainer}>
      <CardMedia component="div" className={classes.media}>
        {media}
      </CardMedia>
      <CardContent className={classes.content}>
        {content}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
