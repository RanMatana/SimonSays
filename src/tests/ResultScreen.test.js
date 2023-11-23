import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {resetGame} from '../store/simonSlice';
import ResultScreen from './ResultScreen';

const mockStore = configureStore([]);

describe('ResultScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      simon: {},
    });
  });

  test('renders correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <ResultScreen />
      </Provider>,
    );

    expect(getByText('Result Screen Title')).toBeTruthy();
  });

  test('dispatches resetGame action on component mount', () => {
    render(
      <Provider store={store}>
        <ResultScreen />
      </Provider>,
    );

    const actions = store.getActions();

    expect(actions).toContainEqual(resetGame());
  });

  test('navigates back on button press', () => {
    const {getByText} = render(
      <Provider store={store}>
        <ResultScreen />
      </Provider>,
    );

    fireEvent.press(getByText('Back'));
    const actions = store.getActions();
    console.log(actions);
  });
});
