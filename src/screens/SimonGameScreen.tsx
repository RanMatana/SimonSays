import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SimonButton} from '../components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {pressButton, selectSimon, startGame} from '../store/simonSlice';
import {Colors} from '../utils/colors';

const SimonGameScreen = () => {
  const dispatch = useDispatch();
  const game = useSelector(selectSimon);

  console.log(game);

  const onStartGame = () => {
    dispatch(startGame());
  };

  const onButtonPress = (color: string) => {
    dispatch(pressButton(color));
  };

  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Animated.View style={[styles.view_play, rStyle]}>
          <Pressable
            style={styles.btn_play}
            onPress={() => {
              scale.value = withSequence(withTiming(1.1), withTiming(1));
              onStartGame();
            }}>
            <Text style={styles.text}>Start Game</Text>
          </Pressable>
        </Animated.View>
        <SimonButton
          style={[styles.quarter, styles.firstQuarter]}
          onPress={() => onButtonPress(Colors.red)}
        />
        <SimonButton
          style={[styles.quarter, styles.secondQuarter]}
          onPress={() => onButtonPress(Colors.green)}
        />
        <SimonButton
          style={[styles.quarter, styles.thirdQuarter]}
          onPress={() => onButtonPress(Colors.blue)}
        />
        <SimonButton
          style={[styles.quarter, styles.fourthQuarter]}
          onPress={() => onButtonPress(Colors.yellow)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  circle: {
    width: 350,
    height: 350,
    borderRadius: 250,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    borderWidth: 25,
    borderColor: Colors.black,
    backgroundColor: Colors.black,
  },
  quarter: {
    flex: 1,
    position: 'absolute',
  },
  firstQuarter: {
    backgroundColor: Colors.red,
    top: 0,
    left: 0,
    width: '50%',
    height: '50%',
  },
  secondQuarter: {
    backgroundColor: Colors.green,
    top: 0,
    left: '50%',
    width: '50%',
    height: '50%',
  },
  thirdQuarter: {
    backgroundColor: Colors.blue,
    top: '50%',
    left: 0,
    width: '50%',
    height: '50%',
  },
  fourthQuarter: {
    backgroundColor: Colors.yellow,
    top: '50%',
    left: '50%',
    width: '50%',
    height: '50%',
  },
  view_play: {
    width: '45%',
    height: '45%',
    backgroundColor: Colors.black,
    zIndex: 1,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_play: {
    width: '70%',
    height: '70%',
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
  },
  text: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SimonGameScreen;
