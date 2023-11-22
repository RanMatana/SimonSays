import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {SimonButton} from '../components';
import {pressButton, startGame} from '../store/simonSlice';
import {Colors, colors} from '../utils/colors';

const SimonGameScreen = () => {
  const dispatch = useDispatch();

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
        {colors.map((color, index) => (
          <SimonButton
            key={index}
            index={index}
            color={color}
            onPress={() => onButtonPress(color)}
          />
        ))}
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
