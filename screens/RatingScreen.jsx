import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons';

export default function RatingScreen({navigation}) {
  
const Stars = () => {
  const [rating, setRataing] = useState(0); //initial rating value 

  const stars =[];
  for (let i = 0; i < 10; i++ ) {
    let style = {'cursor': 'pointer'};
    if (i < rating) {
      style = { 'color': '#2196f3', 'cursor': 'pointer'  };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} onClick={()=> setRataing(i + 1)} style={style} />);
  }
  }
  }

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