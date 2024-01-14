import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Camera, Home, Onboarding} from '../Screens';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default Root;
