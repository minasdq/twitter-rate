interface GetActionScoreParams {
  tweetCount: number,
  followerCount: number,
  followingCount: number,
  creationYear: number,
}

interface GetTotalActionScoreParams extends GetActionScoreParams {
  retweetCount: number,
  likeCount: number,
  isVerified: boolean,
  bio: string,
}

export const getActionScore = ({
  tweetCount,
  followerCount,
  followingCount,
  creationYear,
}: GetActionScoreParams) => {
  const year = new Date().getFullYear();
  const differenceYear = year - creationYear;
  const followerToFollowerRatio = followerCount / followingCount;

  if (differenceYear > 10 && followerToFollowerRatio > 1.2
        && followingCount < 2000 && tweetCount < 10000) {
    return 5;
  } if (differenceYear > 5 && followerToFollowerRatio > 1.2
      && followingCount < 2000 && tweetCount < 15000) {
    return 4;
  } if (differenceYear > 3 && followerToFollowerRatio > 1
      && followingCount < 3000 && tweetCount < 30000) {
    return 3;
  } if (differenceYear > 2 && tweetCount < 7000 && followingCount < 2000) {
    return 2;
  } if (differenceYear > 1 && tweetCount < 3000 && followingCount < 2000) {
    return 1;
  }
  return 0;
};

export const getTotalActionScore = ({
  tweetCount,
  retweetCount,
  followerCount,
  followingCount,
  likeCount,
  isVerified,
  creationYear,
}: GetTotalActionScoreParams) => {
  const actionScore = getActionScore({
    tweetCount, followerCount, followingCount, creationYear,
  });
  const year = new Date().getFullYear();
  const differenceYear = year - creationYear;
  const followerToFollowerRatio = followerCount / followingCount;

  let totalActionScore = actionScore;
  if (isVerified) {
    totalActionScore += 3;
  }
  if (likeCount / tweetCount > 100) {
    totalActionScore -= 2;
  }
  if (retweetCount / tweetCount > 20) {
    totalActionScore -= 2;
  } if (followerToFollowerRatio > 0.5 && followerToFollowerRatio < 1.5 && followingCount > 1000) {
    totalActionScore -= 2;
  } if ((tweetCount + retweetCount) / differenceYear > 5000) {
    totalActionScore -= 2;
  }

  return totalActionScore;
};
