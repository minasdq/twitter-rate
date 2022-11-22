import { getTotalActionScore } from '../getUserStatusUtils';

const userInfo = {
  tweetCount: 888,
  retweetCount: 88,
  followerCount: 4,
  followingCount: 1235,
  likeCount: 550,
  isVerified: true,
  creationYear: 2000,
  bio: '',
};

describe('rate twitter util ', () => {
  it('it should rate twitter util works correctly', () => {
    const rateTwitter = getTotalActionScore(userInfo);

    expect(rateTwitter).toBe(5);
  });
});
