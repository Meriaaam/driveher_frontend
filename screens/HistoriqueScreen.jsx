import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Header from './Header';
import React from 'react';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HistoriqueScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const [ordersData, setOrdersData] = useState([]);
  const [noHistory, setNoHistory] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetch(
        `https://driveher-backend.vercel.app/orders/userOrders/${user.token}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setOrdersData(data.userOrders);
          } else {
            setNoHistory(true);
          }
        });
    }, [ordersData])
  );

  const historique = ordersData.map((data, i) => {
    let orderDate = new Date(data.date);
    const day = orderDate.getDate();
    const month = orderDate.getMonth();
    const year = orderDate.getFullYear();
    const hour = orderDate.getHours();
    const minutes = orderDate.getMinutes();
    return (
      <View key={i} style={styles.history}>
        <View style={styles.trashIcon}>
          <FontAwesome
            onPress={() => {
              fetch(
                `https://driveher-backend.vercel.app/orders/deleteOrder/${data._id}`,
                {
                  method: 'DELETE',
                }
              ).then((data) => {
                if (data.result) {
                  console.log(data.message);
                }
              });
            }}
            key={i}
            name="trash"
            size={20}
            color="#BE355C"
          />
        </View>
        <Text style={styles.text}>
          <Text style={styles.bold}>De </Text>
          {data.departure} <Text style={styles.bold}> à </Text>
          {data.arrival}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Le </Text>
          {day}/{month}/{year} à {hour}h{minutes}{' '}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Prix:</Text> {data.paymentAmount} €
        </Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView style={styles.historyContainer}>
        <Text style={styles.firstText}>Votre historique de courses:</Text>
        {noHistory && (
          <View style={styles.noHistory}>
            <Text style={styles.noHistoryText}>Votre historique est vide</Text>
          </View>
        )}
        {historique}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  historyContainer: {
    width: '100%',
    padding: 20,
  },

  history: {
    width: '100%',
    padding: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },

  firstText: {
    fontSize: 25,
    // fontWeight: "bold",
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  trashIcon: {
    width: '100%',
    alignItems: 'flex-end',
  },
  noHistory: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    marginTop: 200,
  },
  noHistoryText: {
    fontSize: 20,
  },
});
