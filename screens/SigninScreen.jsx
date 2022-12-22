import { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import { Octicons, Ionicons } from "@expo/vector-icons";
import {
  Button,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { Modal } from "react-native";

export default function SigninScreen({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (user.token) {
      navigation.navigate("TabNavigator");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    fetch("https://driveher-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          console.log("hellotoo");
          dispatch(
            login({ token: data.user.token, firstname: data.user.firstName })
          );
          setEmail("");
          setPassword("");
          navigation.navigate("TabNavigator", { screen: "AccueilScreen" });
        } else {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
           }, 5000);
        }
      })
      .catch((error) => console.log(error));
  };

  const pressInscription = () => {
    navigation.navigate("Signup");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (user.token) {
      navigation.navigate("TabNavigator", { screen: "AccueilScreen" });
    }
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logoHomeContainer}>
        <Text onPress={() => navigation.navigate("Home")} style={styles.logo}>
          Driv'Her
        </Text>
      </View>

      <Modal
        animationType='fade'
        transparent={true}
        
        
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <FontAwesome name="warning" size={20} color="red" />
          <Text style={styles.connexionError}>
            Coordonnées de connexion incorrectes
          </Text>
          <Pressable
            style={styles.buttonClose}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textCloseStyle}>OK</Text>
          </Pressable>
        </View>
      </Modal>

      <View style={styles.formContainer}>
        <Text style={styles.titletop}>S'identifier</Text>

        <TextInput
          placeholder="E-mail"
          onChangeText={(value) => setEmail(value)}
          value={email}
          style={styles.input}
        />

        <View style={styles.containerPassword}>
          <TextInput
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.input}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            style={{ marginLeft: 300, marginTop: 50, position: "absolute" }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={
                showPassword
                  ? require("../assets/eye-closed.jpg")
                  : require("../assets/eye-open.jpg")
              }
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <Text style={styles.titlebottom}>Vous n'avez pas de compte?</Text>

        <TouchableOpacity
          onPress={() => pressInscription()}
          activeOpacity={0.8}
        >
          <Text style={styles.link}>S'inscrire</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleLogin()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Valider</Text>
        </TouchableOpacity>
      </View>
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

  formContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
  },

  btnContainer: {
    width: "100%",
    height: "30%",
    // marginTop:30,
    alignItems: "center",
  },

  titletop: {
    width: "30%",
    fontSize: 24,
    fontWeight: "10",
    // marginTop: "30%",
    textAlign: "center",
  },

  titlebottom: {
    width: "80%",
    fontSize: 18,
    fontWeight: "10",
    // marginTop: "20%",
    textAlign: "center",
    // position: "relative",
  },

  input: {
    width: "80%",
    marginTop: 50,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    fontSize: 18,
    // { width: 200, height: 40, borderColor: 'gray', borderWidth: 1 }}
  },

  containerPassword: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  button: {
    alignItems: "center",
    width: "80%",
    marginTop: 30,
    backgroundColor: "#73DDAA",
    borderRadius: 20,
    // marginBottom: 80,
    justifyContent: "center",
    // marginVertical: 5,
  },

  link: {
    alignItems: "center",
    width: "80%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#29a3da",
    borderBottomColor: "#29a3da",
    borderBottomWidth: 1,
    marginTop: 20,
  },

  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    margin: 15,
  },

  icon: {
    color: "green",
    height: 30,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    margin: 15,
  },
  errorContainer: {
    flexDirection: "row",
  },

  connexionError: {
    color: "red",
    fontSize: 12,
    // marginLeft: 10,
    width: "80%",
  },

  centeredView: {
    backgroundColor: "#fff",
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
    height: "20%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "75%",
    marginLeft: "10%",
  },

  buttonClose: {
    backgroundColor: "#BE355C",
    width: "30%",
    padding: 10,
    alignItems: "center",
    borderRadius: 7,
  },

  textCloseStyle: {
    color: "#fff",
  },
});
