import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface SimonButtonProps {
  color: string;
  onPress: () => void;
}

const SimonButton: React.FC<SimonButtonProps> = ({color, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
  },
});

export default SimonButton;
