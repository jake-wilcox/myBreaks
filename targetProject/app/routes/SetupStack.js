import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import defaultDataScreen from '../screens/defaultData';

const stack = createNativeStackNavigator();


const setupStackNavigator = () => {

    <stack.Navigator>

    <stack.Screen name="Default Data" component={defaultDataScreen}/>

</stack.Navigator>
}
