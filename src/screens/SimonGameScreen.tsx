import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SimonButton} from '../components';

const SimonGameScreen = () => {
  const handlePress = (quarter: number) => {
    switch (quarter) {
      case 1:
        console.log('First quarter pressed (12:00-15:00)');
        break;
      case 2:
        console.log('Second quarter pressed (15:00-18:00)');
        break;
      case 3:
        console.log('Third quarter pressed (18:00-21:00)');
        break;
      case 4:
        console.log('Fourth quarter pressed (21:00-24:00)');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <View style={styles.view_play}>
          <Pressable
            style={styles.btn_play}
            onPress={() => console.log('Start Game')}>
            <Text style={styles.text}>Start Game</Text>
          </Pressable>
        </View>
        <SimonButton
          style={[styles.quarter, styles.firstQuarter]}
          onPress={() => handlePress(1)}
        />
        <SimonButton
          style={[styles.quarter, styles.secondQuarter]}
          onPress={() => handlePress(2)}
        />
        <SimonButton
          style={[styles.quarter, styles.thirdQuarter]}
          onPress={() => handlePress(3)}
        />
        <SimonButton
          style={[styles.quarter, styles.fourthQuarter]}
          onPress={() => handlePress(4)}
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
    backgroundColor: 'white',
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
    borderColor: 'black',
  },
  quarter: {
    flex: 1,
    position: 'absolute',
  },
  firstQuarter: {
    backgroundColor: 'red',
    top: 0,
    left: 0,
    width: '50%',
    height: '50%',
  },
  secondQuarter: {
    backgroundColor: 'green',
    top: 0,
    left: '50%',
    width: '50%',
    height: '50%',
  },
  thirdQuarter: {
    backgroundColor: 'blue',
    top: '50%',
    left: 0,
    width: '50%',
    height: '50%',
  },
  fourthQuarter: {
    backgroundColor: 'yellow',
    top: '50%',
    left: '50%',
    width: '50%',
    height: '50%',
  },
  view_play: {
    width: '45%',
    height: '45%',
    backgroundColor: 'black',
    zIndex: 1,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_play: {
    width: '70%',
    height: '70%',
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SimonGameScreen;
