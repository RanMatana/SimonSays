import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SimonGameScreen} from './src/screens';
import {store} from './src/store';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <SimonGameScreen />
    // <Provider store={store}>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="SimonGame"
    //       component={SimonGameScreen}
    //       options={{title: 'Simon Says'}}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // </Provider>
  );
};

export default App;
