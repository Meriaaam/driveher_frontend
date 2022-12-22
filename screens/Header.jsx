import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { logout } from '../reducers/user';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function Header({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Signin');
  };

  return (
    <View style={styles.logoContainer}>
      <Text
        style={styles.welcomeText}
        onPress={() =>
          navigation.navigate('TabNavigator', { screen: 'Accueil' })
        }
      >
        Bienvenue {user.firstname[0].toUpperCase() + user.firstname.slice(1)}
      </Text>
      <TouchableOpacity>
        <FontAwesome
          onPress={() => handleLogout()}
          name="power-off"
          size={40}
          color="#fff"
        />
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
    alignItems: 'flex-end',
    backgroundColor: '#73DDAA',
    padding: 20,
  },
  welcomeText: {
    fontSize: 30,
    color: '#fff',
  },
  logo: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    // fontFamily:'Verdana'
  },
  logoHomeContainer: {
    width: '100%',
    height: '18%',
    backgroundColor: '#BE355C',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
