import { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SigninScreen({ navigation }) {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    fetch("https://driveher-backend.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // dispatch(login({ email: signUpEmail, token: data.token }));
          setFirstname("");
          setLastname("");
          setPhoneNumber("");
          setEmail("");
          setPassword("");
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Créer ton compte cutie</Text>

      <TextInput
        placeholder="Prénom"
        onChangeText={(value) => setFirstname(value)}
        value={firstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Nom"
        onChangeText={(value) => setLastname(value)}
        value={lastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Mobile"
        onChangeText={(value) => setPhoneNumber(value)}
        value={phoneNumber}
        style={styles.input}
      />
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
      <Text>Vous avez déja un compte ?</Text>
      <Button
        title="Connexion"
        onPress={() => navigation.navigate('Signin')}
      />
      <TouchableOpacity
        onPress={() => handleRegister()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Trouver une drivher !</Text>
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
  title: {
    width: "80%",
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "80%",
    marginTop: 30,
    backgroundColor: "#ec6e5b",
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
});
