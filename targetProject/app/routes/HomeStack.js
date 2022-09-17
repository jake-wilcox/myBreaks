import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "../screens/MainScreen";
import TmScreen from '../screens/TmScreen';


const stack = createNativeStackNavigator();

const HomeStackNavigator = () =>{
    return(
        <stack.Navigator>
            <stack.Group>
                <stack.Screen name='Home' component={MainScreen} options={{headerShown: false}}  />
                <stack.Screen name='Team Member' component={TmScreen} />
            </stack.Group>
        </stack.Navigator>
    )
}
export default HomeStackNavigator;