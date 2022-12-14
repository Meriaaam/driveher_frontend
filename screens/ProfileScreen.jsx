import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function ProfileScreen({navigation}) {
    return (
      <View style={styles.container}>
          <Image style={styles.image} source={require('../assets/photo profile.png.png')} />
          <Text>Profile</Text>
        
      </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'aqua'
  },

  image: {
    width: '30%',
    height: '30%',
borderRadius: 50
  },
})
