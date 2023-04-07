import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from '../screens/MainScreen';

const stack = createNativeStackNavigator();

const SetupStackNavigator = () => {
    <stack.Navigator>
        <stack.Group>
            <stack.Screen name='Home' component={MainScreen} options={{headerShown: false}}  />
        </stack.Group>
    </stack.Navigator>
};
export default SetupStackNavigator;
