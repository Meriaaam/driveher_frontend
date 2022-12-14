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
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/user";
import user from "../reducers/user";

export default function SigninScreen({ navigation }) {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(true);
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  const handleRegister = () => {
    fetch("https://driveher-backend.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email.toLocaleLowerCase(),
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(
            login({ token: data.user.token, firstname: data.user.firstName })
          );
          setFirstname("");
          setLastname("");
          setPhoneNumber("");
          setEmail("");
          setPassword("");
          navigation.navigate("TabNavigator", { screen: "AccueilScreen" });
        }
      });
  };

  const handleEmailVerification = () => {
    if (EMAIL_REGEX.test(email)) {
      dispatch(updateEmail(email));
      navigation.navigate({ screen: "" });
    } else {
      setEmailError(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.logoHomeContainer}>
        <Text style={styles.logo}>Driv'Her</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Créer votre compte</Text>

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
          secureTextEntry={passwordVisible}
        />
      </View>
      <Text>Vous avez déja un compte ?</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Signin")}
        activeOpacity={0.8}
      >
        <Text style={styles.link}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleRegister() && handleEmailVerification()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Inscription</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between",
  },

  formContainer: {
    width: "100%",
    alignItems: "center",
  },

  title: {
    width: "80%",
    fontSize: 28,
    fontWeight: "600",
  },
  input: {
    width: "80%",
    marginTop: 35,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    padding: 10,
    width: "80%",
    marginTop: 30,
    backgroundColor: "#73DDAA",
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  link: {
    alignItems: "center",
    width: "80%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#29a3da",
    borderBottomColor: "#29a3da",
    borderBottomWidth: 1,
  },
  logo: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
    // fontFamily:'Verdana'
  },
  logoHomeContainer: {
    width: "100%",
    height: "18%",
    backgroundColor: "#BE355C",
    justifyContent: "center",
    alignItems: "center",
  },
});
