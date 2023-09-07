import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { collection, doc, getDocs, db, deleteDoc } from "../firebase";

const UserReservations = ({ route }) => {
  const [restuarants, setRestuarants] = useState([]);
  const navigation = useNavigation();
  const { userUID } = route.params;

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "restuarants"));
        const data = [];

        querySnapshot.forEach((doc) => {
          data.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setRestuarants(data);
        // console.log('outside');
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("UserReserv", { restuarant: item, userUID })
      }
    >
      <Image source={{ uri: item.images }} style={styles.image} />
      <View style={{ width: "50%" }}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.text}>{item.address}</Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          height: "50%",
          marginTop: "4%",
          marginLeft: "2%",
        }}
      ></View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBtn}>
          <Icon name="arrow-back-ios" size={20} onPress={navigation.goBack} />
        </View>
      </View>

      <FlatList
        data={restuarants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{
          marginTop: "5%",
          width: "100%",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default UserReservations;
