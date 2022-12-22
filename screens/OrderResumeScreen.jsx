import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import React from "react";
import { removeItinery } from "../reducers/user";
import { useSelector, useDispatch } from "react-redux";
import { GOOGLE_API_KEY } from "@env";
import MapViewDirections from "react-native-maps-directions";
import { useState, useEffect } from "react";
import Header from "./Header";
import { addDriver } from "../reducers/driver";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function OrderResumeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [driversData, setDriversData] = useState([]);

  /** fonction qui met à jour
   * la latitude delta selon la distance de
   * l'initneraire
   */
  function setLatDelta(dist) {
    let latDelta;
    if (dist > 680) {
      latDelta = 6;
    } else if (dist > 400 && dist < 679) {
      latDelta = 4.5;
    } else if (dist > 260 && dist < 399) {
      latDelta = 3;
    } else if (dist > 140 && dist < 259) {
      latDelta = 1.5;
    } else if (dist > 40 && dist < 139) {
      latDelta = 0.6;
    } else if (dist > 0 && dist < 39) {
      latDelta = 0.2;
    }

    return latDelta;
  }

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = setLatDelta(user.distance);
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = {
    latitude: (user.departure.latitude + user.arrival.latitude) / 2,
    longitude: (user.departure.longitude + user.arrival.longitude) / 2,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const handleCancel = () => {
    dispatch(removeItinery());
    navigation.goBack();
  };

  // GET DRIVERS FROM DATABASE
  useEffect(() => {
    fetch("https://driveher-backend.vercel.app/drivers/displayDrivers")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setDriversData(data.drivers);
        }
      });
  }, []);

  var dist = 0;

  // CALCULATE DISTANCE FUNCTION
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

  // FIND THE CLOSEST DRIVER
  let result = [];
  let shortestDistance;
  let closestDriverIndex;
  let closestDriver;
  for (const driver of driversData) {
    result.push(
      getDistanceFromLatLonInKm(
        user.departure.latitude,
        user.departure.longitude,
        driver.latitude,
        driver.longitude
      )
    );
  }

  shortestDistance = result[0];
  for (const dist of result) {
    if (dist < shortestDistance) {
      shortestDistance = dist;
      closestDriverIndex = result.indexOf(dist);
    }
  }

  closestDriver = driversData[closestDriverIndex];

  const handleOrder = () => {
    fetch(`https://driveher-backend.vercel.app/users/userCard/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          fetch(
            `https://paymentapi-one.vercel.app/cards/updateSolde/${data.userCard._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                newSolde: Number(data.userCard.solde) - user.price,
              }),
            }
          )
            .then((response) => response.json())
            .then(async (Paymentdata) => {
              if (Paymentdata.result) {
                await fetch(
                  "https://driveher-backend.vercel.app/orders/newOrder",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      token: user.token,
                      departure: user.departureAddress,
                      arrival: user.arrivalAddress,
                      paymentAmount: user.price,
                    }),
                  }
                )
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.result) {
                      console.log("order enregistré");
                      dispatch(addDriver(closestDriver));
                      navigation.navigate("Driver");
                    }
                  });
              }
            });
        }
      });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      {/* <View style={styles.centeredView}> */}
      <MapView initialRegion={INITIAL_POSITION} style={styles.map}>
        <Marker coordinate={user.departure} title={user.departureAddress}>
          <Text style={styles.flag}>🚩</Text>
        </Marker>
        <Marker coordinate={user.arrival} title={user.arrivalAddress}>
          <Text style={styles.flag}>🏁</Text>
        </Marker>
        <MapViewDirections
          origin={user.departure}
          destination={user.arrival}
          apikey={GOOGLE_API_KEY}
          strokeColor="hotpink"
          strokeWidth={5}
          optimizeWaypoints={true}
        />
      </MapView>
      <View style={styles.textBlock}>
        <Text style={styles.text}>
          <Text style={styles.textStyle}>Départ : </Text>
          {user.departureAddress}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.textStyle}>Destination : </Text>
          {user.arrivalAddress}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.textStyle}>Temps estimé : </Text> {user.time}{" "}
          minutes
        </Text>
        <Text style={styles.text}>
          <Text style={styles.textStyle}>Distance : </Text> {user.distance} km
        </Text>
        <Text style={styles.text}>
          <Text style={styles.textStyle}>Prix : </Text> {user.price} €
        </Text>
      </View>
      <View style={styles.buttonsBlock}>
        <TouchableOpacity style={styles.button} onPress={() => handleCancel()}>
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOrder()} style={styles.button}>
          <Text style={styles.buttonText}>Réserver !</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    width: 250,
    borderBottomColor: "#ec6e5b",
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
    width: "100%",
    height: "40%",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "45%",
  },
  button: {
    backgroundColor: "#BE355C",
    alignItems: "center",
    width: "40%",
    padding: 15,
    borderRadius: 7,
  },
  buttonsBlock: {
    width: "100%",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  textBlock: {
    width: "100%",
    paddingLeft: 20,
    alignItems: "flex-start",
  },
  textStyle: {
    fontWeight: "bold",
  },
  text: {
    marginTop: 10,
    fontSize: 18,
  },
  flag: {
    fontSize: 30,
  },
});
