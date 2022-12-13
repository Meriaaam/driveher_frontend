import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'


export default function OrderResumeScreen({navigation}) {
    return (
      <View style={styles.container}>
          <Text>Order resume</Text>

        
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