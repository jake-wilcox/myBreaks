import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Pressable, Button} from 'react-native';
import loadData from '../components/LoadData';

const DefaultDataScreen = () =>{
    return(
       <View>
        <Text>
            By clicking this button, you will loose all current data and 
            return to the default schedule.
        </Text>
        <Button title="Restore Defaults" onPress={() => {loadData('/d')}}>Restore Defaults</Button>
    </View>  
    )

}
export default DefaultDataScreen
