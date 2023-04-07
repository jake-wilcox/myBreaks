import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Pressable, Button} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Value } from 'react-native-reanimated';
// import getData from '../components/getData';


const MainScreen = () => {

    const nav = useNavigation();
    const [teamMembers, setTeamMembers] = useState([])
    const [url, seturl] = useState('http://172.16.38.81:3000')
    const ref = useRef(0)


 

    useEffect(() => {
      const getData = async(url) => {
        const response = await fetch(url)
        const json = await response.json()
        setTeamMembers(json)
      }
      seturl('')
      getData(url)
      console.log(teamMembers)
      
    }, [url])





        const tmPress = (tmItem) => () => {
            console.log('tmPressin')
            console.log(tmItem)
            var index = 0

            for(let i = 0; i < teamMembers.length; i++){
                console.log(teamMembers[i])

                if(teamMembers[i].id == tmItem.id){
                    console.log('gotcha')
                    var index = i
                    break
                }
            }
            console.log(index)

            nav.navigate('Team Member', {tmItem, index})

        }

        

       

          
    return(

        <View style={styleSheet.wholeScreen}>
 
        <SafeAreaView style={styleSheet.header}>
            <Image source={require('../assets/logo.png')} style={{margin: 7}}/>

            <Text style={styleSheet.title}>myBreaks</Text>

            <Text style={{flex: 1}}>settings button here</Text>
        </SafeAreaView>


        <View style={styleSheet.listBox}>
            <FlatList
                data={teamMembers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>(
                    <TouchableOpacity style={styleSheet.listContainer} onPress={tmPress(item)}>
                        <Text style={{color: 'white', flex: 3, fontSize: 20, alignSelf: 'center'}}>{item.name}</Text>
                        <Text style={{color: 'white', flex: 1, fontSize: 15}}>Next Break: {item.nb[0]}</Text>
                    </TouchableOpacity>
                 
                )}
                
            />
        </View>

        <View style={styleSheet.onBreakBox}>
           <Button
           title={'yo'}
           onPress={() => seturl('http://172.16.38.81:3000/tm/1')}
           
           />

        </View>
        
        
    </View>

    )
}

export default MainScreen;


const styleSheet = StyleSheet.create({

    wholeScreen:{
        flex: 1,
        backgroundColor: 'blue'
    },

    header:{
        backgroundColor: '#404040',
        flex: 2,
        alignItems: 'center',
        flexDirection: 'row'
    },

    title:{
        flex: 1,
        fontSize: 20,
        alignItems: 'center',
        color:'white',
        justifyContent: 'flex-start',
    },

    
    listBox:{
        backgroundColor: '#181818',
        flex: 10
    },

    listContainer: {
        margin: 10,
        padding: 25,
        backgroundColor: '#CC000090',
        borderRadius: 6,
        flexDirection: 'row',

    },

    onBreakBox:{ 
        width: null,
        height: 90,
        backgroundColor: 'green',
        borderRadius: 6
    }
})