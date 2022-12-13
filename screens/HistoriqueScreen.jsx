import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'


export default function HistoriqueScreen({navigation}) {
    return (
      <View style={styles.container}>
          <Text>Historique</Text>

        
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