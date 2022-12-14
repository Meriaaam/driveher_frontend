import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Driv'Her</Text>
      </View>
      <View style={styles.btnContainer}>
        <Text style={styles.homeText}>
          Pour un déplacement en toute sécurité 😉
        </Text>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.navigate('TabNavigator')}
        >
          <Text style={styles.btnText}>Commencer </Text>
          <FontAwesome name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  logoContainer: {
    width: '100%',
    height: '18%',
    backgroundColor: '#BE355C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  homeText: {
    fontSize: 20,
  },
  btnContainer: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startBtn: {
    backgroundColor: '#73DDAA',
    marginTop: 20,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 15,
    borderRadius: 7,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
