import {configureStore} from '@reduxjs/toolkit';
import simonReducer from './simonSlice';

export const store = configureStore({
  reducer: {
    simon: simonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
