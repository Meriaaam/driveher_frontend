import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'


export default function RatingScreen({navigation}) {
    return (
      <View style={styles.container}>
          <Text>Rating</Text>

        
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