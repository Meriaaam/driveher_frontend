import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React from 'react';
import { removeItinery } from '../reducers/user';
import { useSelector, useDispatch } from 'react-redux';
import { GOOGLE_API_KEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';
import Header from './Header';

export default function OrderResumeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const { width, height } = Dimensions.get('window');

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.1;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = {
    latitude: 48.859,
    longitude: 2.347,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  console.log('user', user);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      {/* <View style={styles.centeredView}> */}
        <MapView initialRegion={INITIAL_POSITION} style={styles.map}>
          <Marker coordinate={user.departure} title="Départ" pinColor="green" />
          <Marker coordinate={user.arrival} title="Arrivée" pinColor="yellow" />
          <MapViewDirections
            origin={user.departure}
            destination={user.arrival}
            apikey={GOOGLE_API_KEY}
            strokeColor="hotpink"
            strokeWidth={5}
            optimizeWaypoints={true}
          />
        </MapView>
        <View style={styles.buttonsBlock}>
          <TouchableOpacity style={styles.button}>
            <Text
              onPress={() => {
                dispatch(removeItinery());
                navigation.navigate('Accueil');
              }}
              style={styles.buttonText}
            >
              Précédent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Text style={styles.buttonText}>Réserver !</Text>
          </TouchableOpacity>
        </View>
      {/* </View> */}
      <View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: 250,
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 16,
    paddingBottom: 5,
    marginBottom: 20,
  },
  inputBlock: {
    marginTop: 100,
    marginBottom: 50,
  },
  centeredView: {
    width:'100%',
    height:'40%',
    alignItems: 'center',
  },
  map: {
    width: 400,
    height: 400,
  },
  button: {
    backgroundColor: '#BE355C',
    alignItems:'center',
    width:'40%',
    padding: 15,
    borderRadius:7
  },
  buttonsBlock: {
    width: '100%',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {
    color: '#fff',
    fontSize:18
  },
});
