import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import SoundPlayer from 'react-native-sound-player';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../App';
import {SimonButton} from '../components';
import {pressButton, selectSimon, startGame} from '../store/simonSlice';
import {Colors, colors} from '../utils/colors';
import {START_GAME} from '../utils/constants';

type GameScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameScreen'
>;

interface GameScreenProps {
  navigation: GameScreenNavigationProp;
}

const GameScreen = ({navigation}: GameScreenProps) => {
  const dispatch = useDispatch();
  const {score, isLoss, sequence} = useSelector(selectSimon);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (sequence.length > 0) {
        setCurrentIndex(
          (prevIndex: number) => (prevIndex + 1) % sequence.length,
        );
      } else if (sequence.length === currentIndex) {
        setCurrentIndex(0);
      }
    }, 1200);

    return () => clearInterval(intervalId);
  }, [currentIndex, sequence.length]);

  useEffect(() => {
    if (isLoss) {
      navigation.navigate('ResultScreen');
    }
  }, [isLoss, navigation, score]);

  const onStartGame = () => {
    dispatch(startGame());
  };

  const handleSound = (color: string) => {
    switch (color) {
      case Colors.red:
        SoundPlayer.playSoundFile('a1', 'mp3');
        break;
      case Colors.green:
        SoundPlayer.playSoundFile('b2', 'mp3');
        break;
      case Colors.blue:
        SoundPlayer.playSoundFile('c3', 'mp3');
        break;
      case Colors.yellow:
        SoundPlayer.playSoundFile('d4', 'mp3');
        break;

      default:
        break;
    }
  };

  const onButtonPress = (color: string) => {
    handleSound(color);
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
            <Text style={styles.text}>{START_GAME}</Text>
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
      {sequence[currentIndex] && (
        <Text
          style={[
            styles.text,
            {
              color: sequence[currentIndex],
              textDecorationLine: 'underline',
              backgroundColor: Colors.black,
              padding: 10,
              borderRadius: 8,
            },
          ]}>
          {sequence[currentIndex]}
        </Text>
      )}
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

export default GameScreen;
