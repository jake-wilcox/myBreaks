import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TextInput, Button, Modal } from 'react-native';



const AddTmScreen = () =>{
    const [name, setName] = useState('')
    const [hours, setHours] =useState('')
    const [minutes, setMinutes] = useState('')
    const [modalVisable, setModalVisable] = useState(false)
    const [timeTitle, setTimeTitle] = useState('Time In')
    const [ampm, setampm] = useState('')

    const [timeIn, setTimeIn] = useState('00:00')
    const [timeOut, setTimeOut] = useState('00:00')
    const [lanes, setLanes] = useState(false)

    function nameInputHandeler(enteredName){
        setName(enteredName)
        console.log(name)
    }

    function hoursInputHandeler(enteredHours){
        setHours(enteredHours)
        console.log(hours)
    }
    function minutesInputHandeler(enteredMinutes){
        setMinutes(enteredMinutes)
    }

    // function test(){
    //     console.log('test')

    //     if('00' == 0){
    //         console.log('00 = 0')
    //     }
    // }

    function handleTimeSubmit(){
        if(hours > 12 || hours < 1){
            console.log('Invalid hours')
            console.log(hours)
            setHours('00')
            return false
        }
        else if(minutes > 59 || minutes < 0){
            console.log('invalid minutes')
            return false
        }else if(ampm === ''){
            console.log('am or pm not selected')
            return false
        }else{
            var t = hours + ':' + minutes + ' ' + ampm
            console.log(t)

            if(timeTitle === 'Time In'){
                setTimeIn(t)
            }else{
                setTimeOut(t)
            }
            // append stuff here
            return true
        }
       
        
    }

    function handleSubmit(){
        // could do more time exception handeling. if end time < start time
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'name': name, 'timeIn': timeIn, 'timeOut': timeOut, 'lanes': lanes })
        };

        fetch('http://172.16.38.81:3000/add', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
    }


   


    return(
        <View style={{flex:1}}>
            <SafeAreaView style={{}}>
                <Text style={[styleSheet.labels, {margin: 5}]}>Team Member Name</Text>
                <TextInput
                placeholder='Enter Name'
                style={styleSheet.input}
                onChangeText={nameInputHandeler}/>
            </SafeAreaView>

            <View style={{flexDirection: 'row', justifyContent:'space-evenly', marginBottom:40}}>
                <View style={styleSheet.timeContainer}>
                    <Button title='Change Time in' onPress={() => {setModalVisable(true); setTimeTitle('Time In')}}/>
                    <Text style={styleSheet.labels}>Time In</Text>
                    <Text>{timeIn}</Text>
                </View>
                <View style={styleSheet.timeContainer}>
                    <Button title='Change Time out' onPress={() => {setModalVisable(true); setTimeTitle('Time Out')}}/>
                    <Text style={styleSheet.labels}>Time Out</Text>
                    <Text>{timeOut}</Text>
                </View>
            </View>


            <View style={{flexDirection: 'row', justifyContent:'space-evenly'}}>
                <View style={{maxWidth: 200,}}>
                    <Button title="Checkout Advocate" onPress={() => {setLanes(true)}}/>
                </View>
                <View style={{maxWidth: 200,}}>
                    <Button title="Service Advocate" onPress={() => {setLanes(false)}}/>
                </View>                
            </View>  

            <View style={{flexDirection: 'row', justifyContent:'space-evenly', marginTop: 350}}>
                <View style={{maxWidth: 100,}}>
                    <Button title="Submit"
                    onPress={handleSubmit}
                    />
                </View>                
            </View>


            

            <Modal visible={modalVisable} transparent={true}>
                <View style={styleSheet.centered}>
                    <View style={styleSheet.modal}>

                        <Text style={{fontSize: 20}}>{timeTitle}</Text>
                        <View style={styleSheet.modalInput}>
                            <TextInput placeholder='Hour' style={styleSheet.input} onChangeText={hoursInputHandeler}></TextInput>
                            <Text style={{fontSize: 25, marginBottom: 10}}>:</Text>
                            <TextInput placeholder='Minute' style={styleSheet.input} onChangeText={minutesInputHandeler}></TextInput>
                            <View style={{width: 50, margin: 3, marginBottom: 9}}>
                                <Button title='AM'
                                onPress={() => setampm('AM')}/>
                            </View>
                            <View style={{width: 50, margin: 3, marginBottom: 9}}>
                                <Button title='PM'
                                onPress={() => setampm('PM')}/>
                            </View>
                        </View>


                        <View style={styleSheet.modalbuttons}>
                            <Button title='Close' onPress={() => {setModalVisable(false)}}/>
                            <Button title='Submit' onPress={() => {if(handleTimeSubmit()){setModalVisable(false)}}}/>
                        </View>
                        
                    </View>
                </View>
            </Modal>


        </View>

    )
}
export default AddTmScreen

const styleSheet = StyleSheet.create({

    input:{
        height: 40,
        margin: 10,
        marginTop: 1,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white'
    },

    modal:{
        backgroundColor: 'blue',
        width:  300,
        height: 200,
        padding: 10,
    },
    centered:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    modalbuttons:{
        marginBottom:10,
        alignContent: 'flex-end',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 'auto'
    },
    modalInput:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 3
    },
    timeContainer:{
        flex: 1,
        maxWidth: 170,
        alignItems:'center'
    },
    evenColumns:{
        flexDirection: 'row',
        justifyContent:'space-evenly'
    },
    labels:{
        fontSize: 25
    }






})