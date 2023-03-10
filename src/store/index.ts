import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/postsSlice";

const store = configureStore({
   reducer: {
      posts: postsSlice,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
