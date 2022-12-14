import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import user from '../reducers/user';
import { useSelector } from 'react-redux';

export default function Header() {
  const user = useSelector((state) => state.user.value);
  //console.log(user);

  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logo}>Bienvenu</Text>
      <TouchableOpacity>
        <FontAwesome name="power-off" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#73DDAA',
    padding: 30,
  },
  logo: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    // fontFamily:'Verdana'
  },
});
