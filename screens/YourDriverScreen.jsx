import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'


export default function YourDriverScreen({navigation}) {
    return (
      <View style={styles.container}>
          <Text>Your Driver</Text>

        
      </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'yellow'
  }
})