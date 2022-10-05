import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackNavigator from './HomeStack';

const drawer = createDrawerNavigator();

const DrawerStackNavigator = () =>{
    return(

        <drawer.Navigator>
            <drawer.Screen name='Home' component={HomeStackNavigator}/>
        </drawer.Navigator>
    )
   
}
export default DrawerStackNavigator;