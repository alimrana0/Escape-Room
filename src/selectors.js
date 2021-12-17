import { createSelector } from "reselect";

const albums = (state) => Object.values(state.albums.albums);

const profileImage = (state) => state.auth.authInfo.url;

export const stateToPropsSelector = createSelector(
  [albums, profileImage],
  (albums, profileImage) => {
    return {
      albums,
      profileImage,
    };
  }
);
