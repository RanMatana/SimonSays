import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';

interface SimonState {}

const initialState: SimonState = {
  sequence: [],
  userSequence: [],
  isPlaying: false,
};

const simonSlice = createSlice({
  name: 'simon',
  initialState,
  reducers: {},
});

export const {} = simonSlice.actions;

export const selectSimon = (state: RootState) => state.simon;

export default simonSlice.reducer;
