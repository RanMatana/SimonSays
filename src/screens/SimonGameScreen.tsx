import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {SimonButton} from '../components';
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
      <View style={styles.buttonsContainer}>
        {colors.map(color => (
          <SimonButton
            key={color}
            color={color}
            onPress={() => onButtonPress(color)}
          />
        ))}
      </View>
      <View style={styles.startButtonContainer}>
        <SimonButton color="gray" onPress={onStartGame} />
      </View>
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
