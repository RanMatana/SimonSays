import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface SimonButtonProps {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}

const SimonButton: React.FC<SimonButtonProps> = ({onPress, style}) => {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(withTiming(0.9), withTiming(1));
    onPress();
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <Animated.View style={[rStyle, style]}>
      <TouchableOpacity
        style={{width: '100%', height: '100%'}}
        onPress={handlePress}
      />
    </Animated.View>
  );
};

export default SimonButton;
