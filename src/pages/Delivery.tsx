import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {View, Text} from 'react-native';
import Complete from './Complete';
import Ing from './Ing';

const Stack = createNativeStackNavigator();

const Delivery = () => {
  return (
    <Stack.Navigator initialRouteName="Ing">
      <Stack.Screen name="Ing" component={Ing} />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Delivery;
