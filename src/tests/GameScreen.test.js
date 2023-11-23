import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {pressButton, startGame} from '../store/simonSlice';
import GameScreen from './GameScreen';

const mockStore = configureStore([]);

describe('GameScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      simon: {
        score: 0,
        isLoss: false,
        sequence: [],
      },
    });
  });

  test('renders correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <GameScreen />
      </Provider>,
    );

    expect(getByText('Start Game')).toBeTruthy();
  });

  test('dispatches startGame action on button press', () => {
    const {getByText} = render(
      <Provider store={store}>
        <GameScreen />
      </Provider>,
    );

    fireEvent.press(getByText('Start Game'));
    const actions = store.getActions();

    expect(actions).toContainEqual(startGame());
  });

  test('dispatches pressButton action on button press', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <GameScreen />
      </Provider>,
    );

    fireEvent.press(getByTestId('red-button'));
    const actions = store.getActions();

    expect(actions).toContainEqual(pressButton('red'));
  });
});
