import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TextInput,
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

  const [text, setText] = React.useState("");

  const [focus, setFocus] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const [firstName, setFirstName] = useState("");

  
useEffect(() => {

  fetch(`https://driveher-backend.vercel.app/users/userData/${user.token}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("dataaa", data);

      if (data.result) {
        setFirstName(data.userData.firstName);
        //         setPassword("");
        //         // setIsModalVisible(false)
      }
    });
},[])
    // .catch((error) => console.log(error));
  
  return (
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
        <TouchableOpacity onPress={() => setIsEditable(true)}>
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
          // placeholder="Prenom"
          onChangeText={(value) => setFirstName(value)}
          value={firstName} // onFocus={() => this.onFocus()}
          editable={isEditable}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom"
          // value={text}
          editable={isEditable}
          onChangeText={(text) => setText(text)}

          // onPress={() => null}
          // onFocus={() => this.setState({ bgColor: "green" })}
          // onBlur={() => this.setState({ bgColor: "gray" })}
        />
        <TextInput
          style={styles.input}
          TextInput="Numero de telephone"
          // value={text}
          editable={isEditable}
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          style={styles.input}
          label="Email"
          // value={text}
          editable={isEditable}
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          style={styles.input}
          labeltext="Adresse favorite"
          editable={isEditable}
          onChangeText={(text) => setText(text)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setIsEditable(false)}>
            <FontAwesome name="rotate-left" size={30} color="#BE355C" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsEditable(false)}>
            <FontAwesome name="check" size={30} color="#73DDAA" />
          </TouchableOpacity>
        </View>
        {/* </TouchableOpacity> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "aqua",
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
