import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GameScreen, ResultScreen} from './src/screens';
import {store} from './src/store';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GAME_SCREEN_HEADER, RESULT_SCREEN_HEADER} from './src/utils/constants';

export type RootStackParamList = {
  GameScreen: undefined;
  ResultScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="GameScreen"
              component={GameScreen}
              options={{title: GAME_SCREEN_HEADER}}
            />
            <Stack.Screen
              name="ResultScreen"
              component={ResultScreen}
              options={{title: RESULT_SCREEN_HEADER}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
