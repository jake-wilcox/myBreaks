import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackNavigator from './HomeStack';
import DefaultDataScreen from '../screens/DefaultDataScreen';

const drawer = createDrawerNavigator();

const DrawerStackNavigator = () =>{
    return(

        <drawer.Navigator>
            <drawer.Screen name='Home' component={HomeStackNavigator}/>
            <drawer.Screen name='Default Breaks' component={DefaultDataScreen}/>
        </drawer.Navigator>
    )
   
}
export default DrawerStackNavigator;