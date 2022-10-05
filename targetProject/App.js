import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import HomeStackNavigator from './app/routes/HomeStack';
import DrawerStackNavigator from './app/routes/Drawer';



export default function App() {

  

    return(
        <NavigationContainer>
            <DrawerStackNavigator />
        </NavigationContainer>
        
    )


}

