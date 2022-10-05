import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Pressable, Button} from 'react-native';

const defaultDataScreen = () =>{
    return(
       <View>
        <Text>
            By clicking this button, you will loose all current data and 
            return to the default schedule.
        </Text>
        <Button/>
    </View>  
    )

}
export default defaultDataScreen
