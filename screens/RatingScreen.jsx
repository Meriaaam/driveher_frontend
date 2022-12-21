import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "./Header";
import driver from "../reducers/driver";
// import AnimatedInput from "react-native-animated-input";

export default function RatingScreen({ navigation }) {
  const [star, setStar] = useState("");
  const [comment, setComment] = useState("");
  const [personalNote, setPersonalNote] = useState(0);
 
  const handleRating = () => {
    fetch("https://driveher-backend.vercel.app/ratings/addRating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        starRating: personalNote,
        commentRating: comment,
        textInput: comment, // Add this line to include the text input in the body of the request
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // if (data.result) {
          setStar("");
          setComment(""); // Reset the value of comment to an empty string
          navigation.navigate('Accueil');
        // }
      });
  };

  const personalStar = [];
  for (let i = 0; i < 5; i++) {
    personalStar.push(
      <TouchableOpacity key={i} onPress={() => setPersonalNote(i + 1)}>
        <Text>
          <FontAwesome
            name="star"
            size={24}
            color={i < personalNote ? "gold" : "#E1E1E1"}
          />
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.titleRate}>Notez {driver.firstName} </Text>
      <View style={styles.stars}>{personalStar}</View>
      <Text style={styles.titleOpinion}>Ecrire un avis</Text>

      <TextInput
        placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, ab!"
        onChangeText={(value) => setComment(value)}
        value={comment}
        style={styles.input}
        multiline={true} 
        onSubmitEditing={handleRating}
        returnKeyType="send"
        padding={10}
      />

      <TouchableOpacity
        onPress={() => handleRating()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },

  stars: {
    paddingTop: 10,
    flexDirection: "row",
    margin: 20,
  },

  button: {
    alignItems: "center",
    padding: 10,
    width: "80%",
    marginTop: 100,
    backgroundColor: "#BE355C",
    borderRadius: 10,
    height: 50,
    marginBottom: 50,
  },

  textButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  titleRate: {
    paddingTop: 40,
    fontSize: 30,
    marginTop: 30,
  },

  titleOpinion: {
    paddingTop: 50,
    fontSize: 30,
  },

  input: {
    width: "80%",
    marginTop: 25,
    fontSize: 18,
    flexDirection: "row",
    justifyContent: "flex-start",
    justifyContent: "center",
    alignItems: "stretch",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: 100,
    borderColor: "#BE355C",
    textAlignVertical: "top",
    width: "70%",
    height: "20%",
  },
});
