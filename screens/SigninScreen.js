import { useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import { useDispatch } from 'react-redux';
// import { updateNickname } from '../reducers/user';

export default function SigninScreen({ navigation }) {
  // const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    fetch("https://driveher-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.result) {
          // dispatch(login({ email: signInEmail, token: data.token }));
          setEmail("");
          setPassword("");
          // setIsModalVisible(false)
        }
      })
      .catch((error) => console.log(error));
  };

  // const handleSubmit = () => {
  //   // dispatch(updateNickname(nickname));
  //   // navigation.navigate('TabNavigator');
  // };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <Image style={styles.image} source={require('../assets/home-image.jpg')} /> */}
      <Text style={styles.titletop}>S'identifier</Text>

      <TextInput
        placeholder="E-mail"
        onChangeText={(value) => setEmail(value)}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        value={password}
        style={styles.input}
      />

      <Text style={styles.titlebottom}>Vous n'avez pas de compte?</Text>

      <Button
        title="S'inscrire"
        onPress={() => navigation.naviagete("Signup")}
      />

      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Valider</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  titletop: {
    width: "30%",
    fontSize: 24,
    fontWeight: "10",
    marginTop: "30%",
    textAlign: "center",
  },
  titlebottom: {
    width: "20%",
    fontSize: 24,
    fontWeight: "10",
    marginTop: "20%",
    textAlign: "center",
    position: "relative",
  },

  input: {
    width: "80%",
    marginTop: 50,
    borderBottomColor: "red",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "80%",
    marginTop: 50,
    backgroundColor: "red",
    borderRadius: 10,
    marginBottom: 80,
  },

  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },

  urlconnection: {},
});
