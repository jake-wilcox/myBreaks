import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultDataScreen from '../screens/defaultData';

const stack = createNativeStackNavigator();


const setupStackNavigator = () => {

    <stack.Navigator>

    <stack.Screen name="Default Data" component={DefaultDataScreen}/>

</stack.Navigator>
}

// I DONT THINK I NEED THIS STACK
