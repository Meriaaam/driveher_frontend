import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import Header from "./Header";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Avatar } from "react-native-paper";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function YourDriverScreen({ navigation }) {
  let star = [];
  for (let i = 0; i < 5; i++) {
    star.push(<FontAwesome key={i} name="star" size={20} color="#BE355C" />);
  }

  const driver = useSelector((state) => state.driver.value);

  const [modalVisible, setModalVisible] = useState(true);

  setTimeout(() => {
    setModalVisible(false);
  }, 3000);

  setTimeout(() => {
    navigation.navigate("Rating");
  }, 7000);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.title}>Votre driv'her</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <FontAwesome name="check" size={40} color="green" />
          <Text style={styles.paymentMsg}>
            Le paiment a été effectué avec succès 🙃
          </Text>
          <Pressable
            style={styles.buttonClose}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textCloseStyle}>OK</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.borderGreen}></View>
      <View style={styles.driverBlock}>
        <View style={styles.infoBlock}>
          <View style={styles.nameStarBlock}>
            <Text style={styles.name}>
              {driver.firstName} {driver.lastName}{" "}
            </Text>
            <View style={styles.stars}>{star}</View>
          </View>
          <Avatar.Image
            style={styles.avatar}
            size={80}
            source={require("../assets/Driver.png")}
          />
        </View>
        <View style={styles.descriptionBlock}>
          <Text style={styles.descriptionText}>Description</Text>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
            nulla aliquam earum fugiat. Neque nostrum esse quidem. Facilis rem
            quo esse ut? Eius nesciunt nemo eum nobis odio labore repellendus.
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textBtn}>Contacter {driver.firstName} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.textBtn}>Suivre {driver.firstName} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  infoBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  driverBlock: {
    position: "relative",
    width: "70%",
    height: "40%",
    padding: 10,
    marginTop: 60,
    borderColor: "#BE355C",
    borderWidth: 2,
    borderTopEndRadius: 40,
    borderStyle: "dashed",
  },
  stars: {
    paddingTop: 10,
    flexDirection: "row",
  },
  title: {
    paddingTop: 40,
    fontSize: 40,
  },
  name: {
    fontSize: 30,
  },
  descriptionBlock: {
    marginTop: 50,
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 15,
  },
  borderGreen: {
    position: "absolute",
    top: 220,
    right: 60,
    width: "70%",
    height: "40%",
    padding: 10,
    marginTop: 60,
    borderColor: "#73DDAA",
    borderWidth: 2,
    borderTopEndRadius: 40,
    borderStyle: "dashed",
  },
  btnContainer: {
    width: "100%",
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#BE355C",
    padding: 10,
    borderRadius: 7,
    width: "40%",
    alignItems: "center",
  },
  textBtn: {
    color: "#fff",
    fontWeight: "bold",
  },
  centeredView: {
    backgroundColor: "#fff",
    padding: 20,
    width: "90%",
    height: "60%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "40%",
    marginLeft: "5%",
  },
  paymentMsg: {
    fontSize: 20,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonClose: {
    width: "50%",
    alignItems: "center",
    padding: 10,
    marginTop: 80,
    backgroundColor: "#73DDAA",
    borderRadius: 7,
  },
  textCloseStyle: {
    color: "#fff",
  },
});
