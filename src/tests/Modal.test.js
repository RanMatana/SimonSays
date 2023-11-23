import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {updateScoreTable} from '../utils/storage';
import Modal from './Modal';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('[]')),
  setItem: jest.fn(() => Promise.resolve()),
}));

const mockStore = configureStore([]);

describe('Modal', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      simon: {
        score: 10,
      },
    });
  });

  test('renders correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <Modal
          modalVisible={true}
          setModalVisible={() => {}}
          setScoreTable={() => {}}
        />
      </Provider>,
    );

    expect(getByText('Input Modal Text')).toBeTruthy();
  });

  test('updates score table and closes modal on submit', async () => {
    const setScoreTableMock = jest.fn();
    const setModalVisibleMock = jest.fn();

    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <Modal
          modalVisible={true}
          setModalVisible={setModalVisibleMock}
          setScoreTable={setScoreTableMock}
        />
      </Provider>,
    );

    fireEvent.changeText(getByTestId('player-input'), 'TestPlayer');
    fireEvent.press(getByText('Save Modal Text'));

    expect(updateScoreTable).toHaveBeenCalledWith('TestPlayer', 10);

    expect(setScoreTableMock).toHaveBeenCalled();
    expect(setModalVisibleMock).toHaveBeenCalled();
  });
});
