import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '.';

interface SimonState {
  sequence: string[];
  userSequence: string[];
  isPlaying: boolean;
}

const initialState: SimonState = {
  sequence: [],
  userSequence: [],
  isPlaying: false,
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
    },
    pressButton: (state, action: PayloadAction<string>) => {
      if (state.isPlaying) {
        state.userSequence.push(action.payload);
        if (state.userSequence.join('') === state.sequence.join('')) {
          state.sequence.push(getRandomColor());
          state.userSequence = [];
        } else {
          state.isPlaying = false;
        }
      }
    },
  },
});

const getRandomColor = () => {
  const colors = ['red', 'green', 'blue', 'yellow'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const {startGame, pressButton} = simonSlice.actions;

export const selectSimon = (state: RootState) => state.simon;

export default simonSlice.reducer;
