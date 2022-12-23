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
  ScrollView,
} from "react-native";
import Header from "./Header";
import * as React from "react";
import { Avatar } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useState } from "react";

export default function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const [isEditable, setIsEditable] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const [firstName, setFirstName] = useState({ history: "", new: "" });
  const [lastName, setLastName] = useState({ history: "", new: "" });
  const [phoneNumber, setPhoneNumber] = useState({ history: "", new: "" });
  const [email, setEmail] = useState({ history: "", new: "" });

  function changeHistory() {
    setFirstName({ ...firstName, new: firstName.history });
    setLastName({ ...lastName, new: lastName.history });
    setPhoneNumber({ ...phoneNumber, new: phoneNumber.history });
    setEmail({ ...email, new: email.history });
    setCanEdit(false);
    setIsEditable(false);
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

  const handleEdit = () => {
    setIsEditable(true);
    setCanEdit(true);
  };

  const handleSave = () => {
    console.log(firstName);
    fetch(
      `https://driveher-backend.vercel.app/users/updateUser/${user.token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
        }),
      }
    ).then((data) => {
      setIsEditable(false);
      setCanEdit(false);
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header navigation={navigation} />
      <View>
        <Avatar.Image
          style={styles.avatar}
          size={100}
          source={require("../assets/photo_profile.png")}
        />
      </View>
      <TouchableOpacity onPress={() => handleEdit()}>
        <FontAwesome name="pencil" size={30} color="#BE355C" />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.inputContainer}
      >
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
          onChangeText={(value) =>
            setPhoneNumber({ ...phoneNumber, new: value })
          }
          value={phoneNumber.new.toString()}
          editable={isEditable}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(value) => setEmail({ ...email, new: value })}
          value={email.new}
          editable={isEditable}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Adresse favorite"
          editable={isEditable}
        /> */}
      </ScrollView>

      {canEdit && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => changeHistory()}>
            <FontAwesome name="rotate-left" size={30} color="#BE355C" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSave()}>
            <FontAwesome name="check" size={30} color="#73DDAA" />
          </TouchableOpacity>
        </View>
      )}
      {/* </TouchableOpacity> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  inputContainer: {
    width: "100%",
    // height: "50%",
    margingTop:20,
    // paddingBottom:20,
    // flexDirection: "column",
    // borderBottomColor: "#BE355C",
    // alignItems: 'center',
    // justifyContent: "center",
    //     // backgroundColor: '#fbe29c',
  },

  input: {
    width: "80%",
    padding: 10,
    // height: "10%",
    marginTop: 15,
    borderColor: "#BE355C",
    borderWidth: 1,
    // borderColor: "#BE355C",
    // borderWidth: 1,
    borderRadius: 7,
    fontSize: 18,
    overflow: "hidden",
  },

  avatar: {
    marginTop: 40,
    marginBottom: 30,
  },

  buttonContainer: {
    width: "100%",
    height:'20%',
    // marginTop:60,
    flexDirection: "row",
    justifyContent: "space-around",
  }
});
