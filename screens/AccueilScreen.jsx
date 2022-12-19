import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
// import React from 'react';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Header from './Header';
import { addItinery, setCurrentPosition } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function AccueilScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [driversPosition, setDriversPosition] = useState([]);
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          dispatch(setCurrentPosition(location.coords));
        });
      }
    })();
  }, []);

  useEffect(() => {
    fetch('https://driveher-backend.vercel.app//drivers/displayDrivers')
      .then((res) => res.json())
      .then((data) => {
        const drivers = data.drivers.map((driver) => {
          let driverLocation = {
            firstName: driver.firstName,
            lastName: driver.lastName,
            latitude: driver.latitude,
            longitude: driver.longitude,
          };
          return driverLocation;
        });

        setDriversPosition(drivers);
      });
  }, []);

  const drivers = driversPosition.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
        title={data.firstName}
      >
        <Text>🚗</Text>
      </Marker>
    );
  });
  const handleDepart = async () => {
    const departPlace = {};
    const arrivalPlace = {};
    var dist = 0;
    let time = 0;
    let price = 0;

    await fetch(`https://api-adresse.data.gouv.fr/search/?q=${departure}`)
      .then((res) => res.json())
      .then((data) => {
        const departData = data.features[0];

        (departPlace.latitude = departData.geometry.coordinates[1]),
          (departPlace.longitude = departData.geometry.coordinates[0]),
          setDeparture('');
      });
    await fetch(`https://api-adresse.data.gouv.fr/search/?q=${arrival}`)
      .then((res) => res.json())
      .then((data) => {
        const arrivalData = data.features[0];
        (arrivalPlace.latitude = arrivalData.geometry.coordinates[1]),
          (arrivalPlace.longitude = arrivalData.geometry.coordinates[0]),
          setArrival('');
      });

    /* fonction de calcul d'une distance
      entre deux points
      */
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1); // deg2rad below
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in km
      dist = d.toFixed(2);
      return dist;
    }

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    getDistanceFromLatLonInKm(
      departPlace.latitude,
      departPlace.longitude,
      arrivalPlace.latitude,
      arrivalPlace.longitude
    );

    time = Math.round((dist / 50) * 60);
    price = (time * 1.2).toFixed(1);

    dispatch(
      addItinery({
        departure: departPlace,
        arrival: arrivalPlace,
        departureAddress: departure,
        arrivalAddress: arrival,
        distance: dist,
        time: time,
        price: price,
      })
    );
    navigation.navigate('Order');
  };

  const handleCancel = () => {
    setDeparture('');
    setArrival('');
  };

  const { width, height } = Dimensions.get('window');

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.03;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = {
    latitude: user.latitude,
    longitude: user.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={(value) => setDeparture(value)}
          value={departure}
          style={styles.input}
          placeholder="Départ"
        />
        <TextInput
          onChangeText={(value) => setArrival(value)}
          value={arrival}
          style={styles.input}
          placeholder="Destination"
        />
      </View>

      <MapView style={styles.map} initialRegion={INITIAL_POSITION}>
        <Marker
          coordinate={{
            latitude: user.latitude,
            longitude: user.longitude,
          }}
          title="My Position"
        >
          <Text style={styles.flag}>🚩</Text>
        </Marker>
        {drivers}
      </MapView>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => handleCancel()} style={styles.button}>
          <Text style={styles.btnText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDepart()} style={styles.button}>
          <Text style={styles.btnText}>C'est parti!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#73DDAA',
  },
  logo: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    // fontFamily:'Verdana'
  },
  formContainer: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    width: '70%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 10,
  },
  map: {
    width: '100%',
    height: '45%',
  },
  btnContainer: {
    marginTop: 20,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '42%',
    backgroundColor: '#BE355C',
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  flag: {
    fontSize: 30,
  },
});
