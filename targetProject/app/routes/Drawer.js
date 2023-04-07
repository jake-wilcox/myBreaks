import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackNavigator from "./HomeStack";
import SetupStackNavigator from "./SetupStack";

const drawer = createDrawerNavigator();

const DrawerNav = () => {

    <drawer.Navigator>
        <drawer.Group>
            <HomeStackNavigator/>
            <SetupStackNavigator/>
        </drawer.Group>
    </drawer.Navigator>

};
export default DrawerNav;