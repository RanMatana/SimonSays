import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '.';
import {colors} from '../utils/colors';

interface SimonState {
  sequence: string[];
  userSequence: string[];
  isPlaying: boolean;
  isLoss: boolean;
  score: number;
}

const initialState: SimonState = {
  sequence: [],
  userSequence: [],
  isPlaying: false,
  isLoss: false,
  score: 0,
};

const simonSlice = createSlice({
  name: 'simon',
  initialState,
  reducers: {
    startGame: state => {
      state.sequence = [];
      state.userSequence = [];
      state.isPlaying = true;
      state.sequence.push(getRandomColor());
      state.isLoss = false;
      state.score = 0;
    },
    pressButton: (state, action: PayloadAction<string>) => {
      if (state.isPlaying) {
        const targetSize = state.sequence.length;
        const isCorrect =
          state.userSequence.length < targetSize &&
          state.sequence[state.userSequence.length] === action.payload;
        if (isCorrect) {
          state.userSequence.push(action.payload);
          if (state.userSequence.length === targetSize) {
            state.score = state.score + 1;
            state.sequence.push(getRandomColor());
            state.userSequence = [];
          }
        } else {
          state.isLoss = true;
          state.isPlaying = false;
        }
      }
    },
    toggleLoss: state => {
      state.isLoss = !state.isLoss;
    },
  },
});

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const {startGame, pressButton, toggleLoss} = simonSlice.actions;

export const selectSimon = (state: RootState) => state.simon;

export default simonSlice.reducer;
