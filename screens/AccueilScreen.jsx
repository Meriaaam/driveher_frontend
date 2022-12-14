import { StyleSheet, Text, View, TouchableWithoutFeedback , Keyboard, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
// import React from 'react';
import MapView,{Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import Header from './Header';


import { useState, useEffect } from 'react';

export default function AccueilScreen () {

    const [position, setPosition] = useState({latitude:48.34, longitude:2.8})

    useEffect(() => {
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
       
          if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            setPosition({
                latitude:location.coords.latitude,
                longitude: location.coords.longitude
            })
            
          }
        })();
       }, []);

    const [departure, setDeparture] = useState('')
    const [arrival, setArrival] = useState('')
    const [departurePosition, setDeparturePosition] = useState({latitude:0, longitude:0})
    const [arrivalPosition, setArrivalPosition] = useState({latitude:0, longitude:0})

    

    const handleCancel = () => {
        setDeparture('');
        setArrival('');
    }

    


    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style = {styles.container}>
            <Header/>
            <View style = {styles.formContainer}>
                <TextInput onChangeText={value => setDeparture(value)} value={departure}   style={styles.input} placeholder='Départ' />
                <TextInput onChangeText={value => setArrival(value)} value={arrival}  style = {styles.input} placeholder='Destination' />
            </View>
        
            <MapView style = {styles.map}
                initialRegion={{
                latitude: position.latitude,
                longitude: position.longitude,
                latitudeDelta: 0.06,
                longitudeDelta: 0.06,
                }}
               
            >
                <Marker coordinate={{ latitude: position.latitude, longitude: position.longitude }} />
            </MapView> 
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => handleCancel()} style={styles.button}>
                    <Text style={styles.btnText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDepart() } style={styles.button} >
                    <Text style={styles.btnText}>C'est parti!</Text>
                </TouchableOpacity>
            </View>    
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-evenly',
        paddingBottom:30
    },
    logoContainer:{
        width:'100%',
        height:'15%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#73DDAA'
    },
    logo:{
        fontSize:40,
        color:'#fff',
        fontWeight:'bold'
        // fontFamily:'Verdana'
    },
    formContainer:{
        width:'100%',
        height:'20%',
        alignItems:'center',
        marginTop:20
    },
    input:{
        width:'70%',
        borderBottomColor:'grey',
        borderBottomWidth:1,
        padding:10
    },
    map:{
        width:'100%',
        height:'45%'
    },
    btnContainer:{
        marginTop:20,
        width:'90%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    button:{
        width: '42%',
        backgroundColor:'#BE355C',
        padding:10,
        alignItems:'center',
        borderRadius:7

    },
    btnText:{
        color:'#FFF',
        fontWeight:'bold',
        fontSize:18
    }
})