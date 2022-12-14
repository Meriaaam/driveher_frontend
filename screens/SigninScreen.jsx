import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import { Octicons, Ionicons } from "@expo/vector-icons";
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
import Header from "./Header";
// import { useDispatch } from "react-redux";
// import { updateNickname } from '../reducers/user';

export default function SigninScreen({ navigation }) {
  // const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // const myTextInput = ({icon})

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

    if (EMAIL_REGEX.test(email)) {
      navigation.navigate("TabNavigator", { screen: "AccueilScreen" });
    } else {
      setEmailError(true);
    }
    // const handleSubmit = () => {
    //   // dispatch(updateNickname(nickname));
    //   // navigation.navigate('TabNavigator');
    // };
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.logoContainer}>
          <Text style={styles.logo} >Driv'Her</Text>
        </View>

      <View style={styles.formContainer}>

      <Text style={styles.titletop}>S'identifier</Text>

      <TextInput
      
        placeholder="E-mail"
        onChangeText={(value) => setEmail(value)}
        value={email}
        style={styles.input}
      />
      
      {emailError && (
        <Text style={styles.error}>
          Veuillez saisir une adresse electronique valide
        </Text>
      )}

      <TextInput
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        value={password}
        style={styles.input}
        secureTextEntry={true}
      />
      </View>

      <View style={styles.btnContainer}>

      <Text style={styles.titlebottom}>Vous n'avez pas de compte?</Text>

      <TouchableOpacity onPress={() => handleSubmit()} activeOpacity={0.8}>
        <Text style={styles.link}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleSubmit()}
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
    justifyContent: "space-evenly",
  },
  logoContainer:{
    width:'100%',
    height:'18%',
    backgroundColor:'#BE355C',
    justifyContent:'center',
    alignItems:'center',
    
  },
  logo:{
    color:'#fff',
    fontSize:40,
    fontWeight:'bold'
  },

  formContainer:{
    width:'100%',
    height:'30%',
    alignItems:'center'

  },
  btnContainer:{
    width:'100%',
    height:'30%',
    // marginTop:30,
    alignItems:'center'
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
    borderBottomColor: "dark",
    borderBottomWidth: 1,
    fontSize: 18,
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
    // paddingTop: 10,
    width: "80%",
    // marginTop: 40,
    // marginBottom: 60,
    fontSize: 20,
    color: "red",
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
  // emailContainer: {
  //   width: "80%",
  
});
