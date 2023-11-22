import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {selectSimon} from '../store/simonSlice';

interface SimonButtonProps {
  index: number;
  color: string;
  onPress: () => void;
}

const slice = [
  {top: 0, left: 0, width: '50%', height: '50%'},
  {top: 0, left: '50%', width: '50%', height: '50%'},
  {top: '50%', left: 0, width: '50%', height: '50%'},
  {top: '50%', left: '50%', width: '50%', height: '50%'},
];

const SimonButton: React.FC<SimonButtonProps> = ({index, color, onPress}) => {
  const {isPlaying} = useSelector(selectSimon);
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(withTiming(0.9), withTiming(1));
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View
      style={[
        styles.quarter,
        {backgroundColor: color},
        slice[index] as ViewStyle,
        animatedStyle,
      ]}>
      <TouchableOpacity
        disabled={!isPlaying}
        style={styles.btn}
        onPress={handlePress}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  quarter: {
    flex: 1,
    position: 'absolute',
  },
  btn: {width: '100%', height: '100%'},
});

export default SimonButton;
