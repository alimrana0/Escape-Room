import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import spotify from "../spotify/client";

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async () => {
    const response = await spotify.getMe();
    const image = response.images.length > 0 ? response.images[0] : "";
    return image.url;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // "pending" | "fetching" | "authenticated" | "failed"
    authInfo: {},
    status: "pending",
    error: null,
  },
  reducers: {
    tokenReceived: (state, action) => {
      state.authInfo.accessToken = action.payload;
      spotify.setAccessToken(action.payload);
    },
  },

  extraReducers: {
    [fetchUserInfo.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.authInfo.url = action.payload;
      state.status = "authenticated";
    },
    [fetchUserInfo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const { tokenReceived } = authSlice.actions;

export default authSlice.reducer;
