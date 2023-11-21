import React from 'react';
import {StyleProp, Text, TouchableOpacity, ViewStyle} from 'react-native';

interface SimonButtonProps {
  color: string;
  onPress: () => void;
  styles?: StyleProp<ViewStyle>;
  text?: string;
}

const SimonButton: React.FC<SimonButtonProps> = ({
  color,
  onPress,
  styles,
  text,
}) => {
  return (
    <TouchableOpacity
      style={[styles, {backgroundColor: color}]}
      onPress={onPress}>
      {text && <Text>{text}</Text>}
    </TouchableOpacity>
  );
};

export default SimonButton;
