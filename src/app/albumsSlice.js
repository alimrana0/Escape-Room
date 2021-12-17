import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import spotify from "../spotify/client";
import { knapsack, makePlaylist } from "../spotify/knapsack";

export const fetchAlbums = createAsyncThunk("albums/fetchAlbums", async () => {
  let response = await spotify.getMySavedAlbums();
  let rawAlbums = response.items;
  let albums = {};
  for (let i = 0; i < rawAlbums.length; i++) {
    let album = rawAlbums[i].album;
    let trackIds = album.tracks.items.map((track) => track.id);

    albums[album.id] = {
      id: album.id,
      imageURL: album.images[0].url,
      isSelected: false,
      trackIds: trackIds,
    };
  }

  return albums;
});

export const generatePlaylist = createAsyncThunk(
  "albums/generate",
  async (arg, { getState }) => {
    let trackIds = [];
    Object.values(getState().albums.albums)
      .filter((album) => album.isSelected)
      .forEach((album) => {
        trackIds = trackIds.concat(album.trackIds);
      });
    let tracks = [];
    let offset = 0;
    while (tracks.length < trackIds.length) {
      let trackResp = await spotify.getTracks(
        trackIds.slice(offset, offset + 50)
      );
      offset += 50;
      tracks = tracks.concat(trackResp.tracks);
    }

    let plistTracks = knapsack(tracks, getState().form.duration * 60);
    await makePlaylist(getState().form.name, plistTracks);
  }
);

export const albumsSlice = createSlice({
  name: "albums",
  initialState: {
    // "pending" | "fetching" | "authenticated" | "failed"
    albums: {},
    status: "pending",
    error: null,
  },
  reducers: {
    albumSelected: (state, action) => {
      const id = action.payload;
      state.albums[id].isSelected = !state.albums[id].isSelected;
    },
  },
  extraReducers: {
    [fetchAlbums.pending]: (state) => {
      state.albums = [];
    },
    [fetchAlbums.fulfilled]: (state, action) => {
      state.albums = action.payload;
      state.status = "authenticated";
    },
    [fetchAlbums.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const { albumSelected } = albumsSlice.actions;

export default albumsSlice.reducer;
