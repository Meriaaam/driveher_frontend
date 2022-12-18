import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import * as React from "react";
import Header from "./Header";
import { Avatar } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useState } from "react";

export default function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const [isEditable, setIsEditable] = useState(false);

  const [firstName, setFirstName] = useState({ history: "", new: "" });
  const [lastName, setLastName] = useState({ history: "", new: "" });
  const [phoneNumber, setPhoneNumber] = useState({ history: "", new: "" });
  const [email, setEmail] = useState({history: "", new: "" });

  function changeHistory() {
    setFirstName({ ...firstName, new: firstName.history });
    setLastName({ ...lastName, new: lastName.history });
    setPhoneNumber({ ...phoneNumber, new: phoneNumber.history });
    setEmail({...email, new: email.history})
  }
  useEffect(() => {
    fetch(`https://driveher-backend.vercel.app/users/userData/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setFirstName({
            ...firstName,
            history: data.userData.firstName,
            new: data.userData.firstName,
          });
          setLastName({
            ...lastName,
            history: data.userData.lastName,
            new: data.userData.lastName,
          });

          setPhoneNumber({
            ...phoneNumber,
            history: data.userData.phoneNumber,
            new: data.userData.phoneNumber,
          });
          setEmail({
            ...email,
            history: data.userData.email,
            new: data.userData.email,
          });
        }
      });
  }, []);
  // .catch((error) => console.log(error));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Avatar.Image
          style={styles.avatar}
          size={100}
          source={require("../assets/photo_profile.png")}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsEditable(true);
            }}
          >
            <FontAwesome name="pencil" size={30} color="#BE355C" />
            {/* <Text style={styles.textButton}>Modifier</Text> */}
          </TouchableOpacity>

          {/* <TouchableOpacity
        
          // onPress={() => null}
          // onFocus={() => this.setState({ bgColor: "green" })}
          // onBlur={() => this.setState({ bgColor: "gray" })}
        > */}
          <TextInput
            style={styles.input}
            placeholder="Prenom"
            onChangeText={(value) => setFirstName({ ...firstName, new: value })}
            value={firstName.new}
            editable={isEditable}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            onChangeText={(value) => setLastName({ ...lastName, new: value })}
            value={lastName.new}
            editable={isEditable}
          />
          <TextInput
            style={styles.input}
            placeholder="Numero de telephone"
            onChangeText={(value) => setPhoneNumber({ ...phoneNumber, new: value })}
            value={phoneNumber.new.toString()}
            editable={isEditable}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(value) => setEmail({...email, new: value})}
            value={email.new}
            editable={isEditable}
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse favorite"
            editable={isEditable}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => changeHistory()}>
              <FontAwesome name="rotate-left" size={30} color="#BE355C" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsEditable(false)}>
              <FontAwesome name="check" size={30} color="#73DDAA" />
            </TouchableOpacity>
          </View>
          {/* </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    width: "80%",
    // flexDirection: "column",
    borderBottomColor: "#BE355C",
    //alignItems: "center",
    // justifyContent: "center",
    //     // backgroundColor: '#fbe29c',
  },

  input: {
    width: "80%",
    height: "10%",
    marginTop: 5,
    borderBottomColor: "#BE355C",
    borderBottomWidth: 1,
    // borderColor: "#BE355C",
    // borderWidth: 1,
    // borderRadius: 15,
    fontSize: 18,
  },

  avatar: {
    marginTop: 40,
    marginBottom: 40,
  },

  buttonContainer: {
    width: 300,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
