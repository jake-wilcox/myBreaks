import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import 'react-native-gesture-handler';
import HomeStackNavigator from './app/routes/HomeStack';
import DrawerNav from './app/routes/Drawer';


export default function App() {

  

    


    return(
        <NavigationContainer>
            <HomeStackNavigator/>
        </NavigationContainer>
        
    )




}

