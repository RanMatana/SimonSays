import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import SimonButton from './SimonButton';

const mockStore = configureStore([]);

describe('SimonButton', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      simon: {
        isPlaying: true,
      },
    });
  });

  test('renders correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <SimonButton index={0} color="red" onPress={() => {}} />
      </Provider>,
    );

    expect(getByTestId('simon-button')).toBeTruthy();
  });

  test('dispatches onPress action on button press', () => {
    const mockOnPress = jest.fn();

    const {getByTestId} = render(
      <Provider store={store}>
        <SimonButton index={0} color="red" onPress={mockOnPress} />
      </Provider>,
    );

    fireEvent.press(getByTestId('simon-button'));

    expect(mockOnPress).toHaveBeenCalled();
  });
});
