import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import albumsReducer from "./albumsSlice";
import formReducer from "./formSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    albums: albumsReducer,
    form: formReducer,
  },
});
