import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    duration: 1,
    name: "",
  },
  reducers: {
    durationChanged: (state, action) => {
      state.duration = action.payload;
    },
    nameChanged: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { durationChanged, nameChanged } = formSlice.actions;

export default formSlice.reducer;
