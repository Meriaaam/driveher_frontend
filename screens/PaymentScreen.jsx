import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "./Header";
import { RadioButton } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function PaymentScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const [checked, setChecked] = useState("first");
  const [cardNumber, setCardNumber] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleValidate = () => {
    console.log("hello");
    fetch(`https://driveher-backend.vercel.app/users/addCard/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardNumber: cardNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          navigation.navigate("TabNavigator", { screen: "AccueilScreen" });
        }
      });
  };

  const handleSkip = () => {
    navigation.navigate("TabNavigator",{screen:"Accueil"});
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.addText}>Ajouter un moyen de paiment</Text>

      <View style={styles.radionBtnContainer}>
        <RadioButton
          value="first"
          status={checked === "first" ? "checked" : "unchecked"}
          onPress={() => setChecked("first")}
        />
        <FontAwesome
          name="credit-card"
          size={20}
          color="black"
          style={styles.icon}
        />
        <RadioButton
          value="second"
          status={checked === "second" ? "checked" : "unchecked"}
          onPress={() => setChecked("second")}
        />
        <FontAwesome name="paypal" size={20} color="blue" style={styles.icon} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={(value) => setCardNumber(value)}
          value={cardNumber}
          placeholder="Numéro de carte"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Expiration"
          onChangeText={(value) => setExpiry(value)}
          value={expiry}
          style={styles.input}
        />
        <TextInput
          placeholder="CVV"
          onChangeText={(value) => setCvv(value)}
          value={cvv}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => handleValidate()}
          style={styles.button}
          activeOpacity={0.8}
          disabled={isDisabled}
        >
          <Text style={styles.textButton}>Valider</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSkip()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Ajouter plus tard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  addText: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  radionBtnContainer: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  formContainer: {
    width: "100%",
    alignItems: "center",
  },

  icon: {
    marginLeft: 10,
    marginRight: 50,
  },

  input: {
    width: "80%",
    marginTop: 35,
    borderColor: "grey",
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 18,
    padding: 10,
  },

  btnContainer: {
    width: "100%",
    alignItems: "center",
  },

  button: {
    alignItems: "center",
    padding: 10,
    width: "80%",
    marginTop: 30,
    backgroundColor: "#BE355C",
    borderRadius: 10,
  },
  textButton: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
