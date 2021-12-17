import spotify from "./client";

export const knapsack = (tracks, duration) => {
  let dp = new Array(tracks.length + 1).fill([]);

  dp.forEach((item, i) => {
    dp[i] = new Array(duration + 1).fill(0);
  });

  for (let i = 1; i < dp.length; i++) {
    for (let j = 0; j < duration + 1; j++) {
      if (Math.floor(tracks[i - 1].duration_ms / 1000) > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        let prev = dp[i - 1][j];
        let withCurr =
          tracks[i - 1].popularity +
          dp[i - 1][duration - Math.floor(tracks[i - 1].duration_ms / 1000)];

        if (prev > withCurr) {
          dp[i][j] = prev;
        } else {
          dp[i][j] = withCurr;
        }
      }
    }
  }

  let res = [];
  let maxVal = dp[tracks.length][duration];
  let w = duration;
  for (let i = dp.length - 1; i > 0; i--) {
    if (dp[i][w] === dp[i - 1][w]) {
      continue;
    } else {
      res.push(tracks[i - 1]);
      maxVal = maxVal - tracks[i - 1].popularity;
      w -= Math.floor(tracks[i - 1].duration_ms / 1000);
    }
  }

  return res;
};

export const makePlaylist = async (name, tracks) => {
  const me = await spotify.getMe();
  const newPlaylist = await spotify.createPlaylist(me.id, { name });
  await spotify.addTracksToPlaylist(
    newPlaylist.id,
    tracks.map((track) => track.uri)
  );
};
