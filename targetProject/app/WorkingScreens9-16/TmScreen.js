import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import getData from '../components/getData';
import useGetData from '../components/getData';


 const TmScreen = (obj) => {


    var tmItem = obj.route.params.tmItem
    const index = obj.route.params.index

    console.log(obj)

    console.log(tmItem)
    console.log(index)

    var teamList = null

    const tbButtonClick = () =>{
        console.log('tb button clicked')
       teamList = seturl('http://172.16.38.81:3000/tm' + index)
        obj.navigation.goBack()

    }



    


    const PlzWork = () => {
        console.log('inside plz work function')
        console.log(tmItem.breaks_needed)
        console.log(tmItem.breaks_taken)


        switch (tmItem.breaks_taken){
            case 0:
                var color1 = 'red'
                var color2 = 'red'
                var color3 = 'red'
                break;
            case 1:
                var color1 = 'green'
                var color2 = 'red'
                var color3 = 'red'
                break;
            case 2:
                var color1 = 'green'
                var color2 = 'green'
                var color3 = 'red'
                break;
            default:
                var color1 = 'green'
                var color2 = 'green'
                var color3 = 'green'
                break;
        }







        
        if (tmItem.breaks_needed == 3){
            return(
                <View style={styleSheet.breakTimes}>

                    <View style={[styleSheet.breakTimeContainer, {backgroundColor: color1}]}><Text style={styleSheet.breakText}>15</Text></View>
                    <View style={[styleSheet.breakTimeContainer, {backgroundColor: color2}]}><Text style={styleSheet.breakText}>30</Text></View>
                    <View style={[styleSheet.breakTimeContainer, {backgroundColor: color3}]}><Text style={styleSheet.breakText}>15</Text></View>
                
                </View>
                
            )
        }
        else if(tmItem.breaks_needed == 2){
            return(
                <View style={styleSheet.breakTimes}>

                    <View style={[styleSheet.breakTimeContainer, {backgroundColor: color1}]}><Text style={styleSheet.breakText}>15</Text></View>
                    <View style={[styleSheet.breakTimeContainer, {backgroundColor: color2}]}><Text style={styleSheet.breakText}>30</Text></View>

                </View>
                
            )
        }
        else{
            return(
                <View style={styleSheet.breakTimes}>

                    <View style={[styleSheet.breakTimeContainer, {backgroundColor: color1}]}><Text style={styleSheet.breakText}>15</Text></View>

                </View>
                )
        }
        
    }

    return(

        <View style={styleSheet.wholeScreen}>


            <View style={styleSheet.tmName}>
                <Text style={{color: 'white', fontSize: 40}}>
                    {tmItem.name}
                </Text>
                <View style={styleSheet.workTimesContainer}>
                    <Text style={styleSheet.workTimes} flex={1}>
                        Time in: {tmItem.time_in}
                    </Text>
                    <Text style={styleSheet.workTimes} flex={1}>
                        Time out: {tmItem.time_out}
                    </Text>
                </View>
            </View>
            <View style={{flex: 5}}>
                <PlzWork />
            </View>

            <View style={{flex: 1}}>
                <Button
                title="Take Break"
                onPress={tbButtonClick}
                
                
                
                />

            </View>
                
        </View>
    )



};

export default TmScreen;


const styleSheet = StyleSheet.create({

    wholeScreen:{
        flex: 1,
        backgroundColor: '#181818'
    },

    tmName:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CC000090',
        borderRadius: 6,

    },

    workTimesContainer:{
        flex: 1,
        flexDirection: 'row',
    },
    workTimes:{
        padding: 'auto',
        margin:10,
        maxHeight: 50,
        maxWidth: 128,
        fontSize: 15,
        color: 'white',

        
    },
    breakTimes:{
        flexDirection: 'row',
        flex: 5,
        backgroundColor: '#181818',
        justifyContent: 'space-around'
    },

    breakText: {
        color: 'white',
        fontSize: 20
    },

    breakTimeContainer: {
        maxHeight: 50,
        minWidth: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

});

