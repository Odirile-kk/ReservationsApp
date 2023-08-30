import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {  doc, getDocs, db, collection } from "../firebase";
import { collectionGroup, deleteDoc } from "firebase/firestore";

const Reservations = ({ route }) => {
  const navigation = useNavigation();
  const [reservationsData, setReservationsData] = useState([]);
  const [isArrived, setIsArrived] = useState(false)
  const { restuarant } = route.params;

  useEffect(() => {
    const getData = async () => {
      const restuarantId = restuarant.id;
      const restuarantRef = doc(db, "restuarant", restuarantId);
      // const reservationCollectionRef = collectionGroup( db, "reservations");
      const reservationCollection = collection(restuarantRef, 'reservations')

      try {
        const querySnapshot = await getDocs(reservationCollection);
        console.log("query:", querySnapshot);
        const reservations = [];
        
        querySnapshot.forEach((doc) => {
          reservations.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setReservationsData(reservations);
        // console.log("Reservations:", reservations);
        
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
      
    };
    getData();
  }, []);

  const handleDelete = async (reservationsId) => {
    try {
      await deleteDoc(collectionGroup(db, 'reservations', reservationsId));
      setReservationsData(prevreservation => prevreservation.filter(reservationsData => reservationsData.id !== reservationsId));
      console.log('item deleted')
    } catch (error) {
      console.error("Error deleting restaurant: ", error);
    }
  }


  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
      }}
    >
      <Image source={{ uri: restuarant.images }} style={styles.image} />
      <View style={styles.detailItem}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.email}</Text>
        <Text style={styles.text}>{item.date}</Text>
        <Text>Time: {item.time}</Text>
        <Text>Guests: {item.guests}</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
    alignItems: "flex-end",
        }}
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={[styles.button, isArrived ? styles.arrivedButton : null]} onPress={() => setIsArrived(!isArrived)}
        >
        <Text style={styles.buttonText} >  {isArrived ? "Confirmed" : "Pending"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text 
      style={{  fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,}}>Reservations</Text>
      <Text style={{fontSize: 18,
    marginBottom: 10,}}>{restuarant.name}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text
          style={styles.buttonText}
          onPress={() => navigation.navigate("AddReservation", { restuarant })}
       
        >
          Add
        </Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={reservationsData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={{
            marginTop: "5%",
            width: "100%",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  detailItem: {
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#ccc",
    padding: 25,
    marginTop: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#ff6f61",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  arrivedButton: {
    backgroundColor: "gray",
  },
});

export default Reservations;
