import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

interface SimonButtonProps {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}

const SimonButton: React.FC<SimonButtonProps> = ({onPress, style}) => {
  return <TouchableOpacity style={style} onPress={onPress} />;
};

export default SimonButton;
