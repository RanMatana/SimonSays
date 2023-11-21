import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {pressButton, startGame} from '../store/simonSlice';

const colors = ['red', 'green', 'blue', 'yellow'];

const SimonGameScreen: React.FC = () => {
  const dispatch = useDispatch();

  const onStartGame = () => {
    dispatch(startGame());
  };

  const onButtonPress = (color: string) => {
    dispatch(pressButton(color));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}></View>
      <View style={styles.startButtonContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  startButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SimonGameScreen;
