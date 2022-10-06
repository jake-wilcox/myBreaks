import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackNavigator from './HomeStack';
import DefaultDataScreen from '../screens/DefaultDataScreen';
import AddTmScreen from ''
const drawer = createDrawerNavigator();

const DrawerStackNavigator = () =>{
    return(

        <drawer.Navigator>
            <drawer.Screen name='Home' component={HomeStackNavigator}/>
            <drawer.Screen name='Default Breaks' component={DefaultDataScreen}/>
            <drawer.Screen name='Add Team Member' component={AddTmScreen}/>

        </drawer.Navigator>
    )
   
}
export default DrawerStackNavigator;