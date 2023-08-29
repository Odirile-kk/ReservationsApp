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
import { collection, doc, getDocs, db, deleteDoc } from "../firebase";

const App = () => {
  const [restuarants, setRestuarants] = useState([]);
  const navigation = useNavigation();

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
        // console.log("Restuarant querysnapshot:", querySnapshot);
        data.forEach((data) => {
          // console.log("Restuarant:", data);
        });
        // console.log('outside');
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
  }, []);

  const handleDelete = async (restuarantId) => {
    try {
      await deleteDoc(doc(db, "restuarants", restuarantId));
      setRestuarants((prevrestuarant) =>
        prevrestuarant.filter((restuarant) => restuarant.id !== restuarantId)
      );
      console.log("item deleted");
    } catch (error) {
      console.error("Error deleting restaurant: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("Reservations", { restuarant: item })}
    >
      <Image source={require("../assets/login.png")} style={styles.image} />
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
      >
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() =>
              navigation.navigate("UpdateRestuarant", { restuarant: item })
            }
          >
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("AddRestuarant")}
          style={{
            padding: 10,
            backgroundColor: "#ff6f61",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AdminProfile")}
          style={{
            padding: 10,
            backgroundColor: "#ff6f61",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>profile</Text>
        </TouchableOpacity>
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

export default App;
