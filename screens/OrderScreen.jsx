// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import React, { useState, useEffect, useRef } from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import { GOOGLE_API_KEY } from '@env';
// import * as Location from 'expo-location';
// import MapViewDirections from 'react-native-maps-directions';

// export default function ChooseOrderScreen() {
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const [departure, setDeparture] = useState('');
//   const [arrival, setArrival] = useState('');

//   const [depCoords, setDepCoords] = useState(null);
//   const [arrCoords, setArrCoords] = useState(null);

//   const mapRef = useRef();

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();

//       if (status === 'granted') {
//         Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
//           setCurrentPosition(location.coords);
//         });
//       }
//     })();
//   }, []);

//   const handleSubmit = () => {
//     fetch(`https://api-adresse.data.gouv.fr/search/?q=${departure}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const departData = data.features[0];

//         const departPlace = {
//           latitude: departData.geometry.coordinates[1],
//           longitude: departData.geometry.coordinates[0],
//         };
//         setDepCoords(departPlace);
//         setDeparture('');
//       });
//     fetch(`https://api-adresse.data.gouv.fr/search/?q=${arrival}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const arrivalData = data.features[0];
//         const arrivalPlace = {
//           latitude: arrivalData.geometry.coordinates[1],
//           longitude: arrivalData.geometry.coordinates[0],
//         };
//         setArrCoords(arrivalPlace);
//         setArrival('');
//       });
//     // fetch(
//     //   `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${depCoords}&destinations=${arrCoords}&units=meter&key=${GOOGLE_API_KEY}`
//     // )
//     //   .then((res) => res.json)
//     //   .then((data) => {
//     //     console.log(data);
//     //   });
//   };

//   const { width, height } = Dimensions.get('window');

//   const ASPECT_RATIO = width / height;
//   const LATITUDE_DELTA = 0.02;
//   const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//   const INITIAL_POSITION = {
//     latitude: 48.859,
//     longitude: 2.347,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.centeredView}>
//         <View style={styles.inputBlock}>
//           <TextInput
//             placeholder="Départ"
//             onChangeText={(value) => setDeparture(value)}
//             value={departure}
//             style={styles.input}
//           />
//           <TextInput
//             placeholder="Destination"
//             onChangeText={(value) => setArrival(value)}
//             value={arrival}
//             style={styles.input}
//           />
//         </View>
//         <MapView
//           initialRegion={INITIAL_POSITION}
//           ref={mapRef}
//           style={styles.map}
//         >
//           <Marker coordinate={depCoords} title="Départ" pinColor="green" />
//           <Marker coordinate={arrCoords} title="Arrivée" pinColor="yellow" />
//           <MapViewDirections
//             origin={depCoords}
//             destination={arrCoords}
//             apikey={GOOGLE_API_KEY}
//             strokeColor="hotpink"
//             strokeWidth={5}
//             optimizeWaypoints={true}
//             onReady={(result) => {
//               mapRef.current.fitToCoordinates(result.coordinates, {
//                 edgePadding: {
//                   right: 30,
//                   bottom: 300,
//                   left: 30,
//                   top: 100,
//                 },
//               });
//             }}
//           />
//         </MapView>
//         <View style={styles.buttonsBlock}>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Précédent</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               handleSubmit();
//             }}
//             style={styles.button}
//           >
//             <Text style={styles.buttonText}>C'est parti !</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   input: {
//     width: 250,
//     borderBottomColor: '#ec6e5b',
//     borderBottomWidth: 1,
//     fontSize: 16,
//     paddingBottom: 5,
//     marginBottom: 20,
//   },
//   inputBlock: {
//     marginTop: 100,
//     marginBottom: 50,
//   },
//   centeredView: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   map: {
//     width: 400,
//     height: 400,
//   },
//   button: {
//     backgroundColor: '#BE355C',
//     padding: 20,
//   },
//   buttonsBlock: {
//     width: 300,
//     marginTop: 50,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   buttonText: {
//     color: '#fff',
//   },
// });
