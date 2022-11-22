import { User } from 'Types/api';

// eslint-disable-next-line import/prefer-default-export
export const mapUserTypeUtil = (user: User) => ({
  retweetCount: Math.ceil(user.statuses_count / 10),
  tweetCount: user.statuses_count
        - Math.ceil(user.statuses_count / 10),
  likeCount: user.favourites_count,
  isVerified: user.verified,
  bio: user.description,
  followerCount: user.followers_count,
  followingCount: user.friends_count,
  creationYear: new Date(user.created_at).getFullYear(),
});
