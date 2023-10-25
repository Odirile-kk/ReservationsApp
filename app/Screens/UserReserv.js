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
import { collectionGroup, deleteDoc , query, where } from "firebase/firestore";
import { ActivityIndicator } from "react-native";


const UserReserv = ({ route }) => {
  const navigation = useNavigation();
  const [reservationsData, setReservationsData] = useState([]);
  const { restuarant, userUID } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const restuarantId = restuarant.id;
      const restuarantRef = doc(db, "restuarant", restuarantId);
      const reservationCollection = collection(restuarantRef, 'reservations')

      try {
        const querySnapshot = await getDocs(query(reservationCollection, where('userId', '==', userUID)));
        // console.log("query:", querySnapshot);
        const reservations = [];
        
        querySnapshot.forEach((doc) => {
          reservations.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setReservationsData(reservations);
        setIsLoading(false)
        
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
      
    };
    getData();
  }, []);



  const handleDelete = async (reservationId) => {
    try {
      const restaurantId = restuarant.id;
      const reservationRef = doc(db, 'restaurants', restaurantId, 'reservations', reservationId);
  
      await deleteDoc(reservationRef);
      
      setReservationsData((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== reservationId)
      );
      
      console.log("Reservation deleted");
    } catch (error) {
      console.error("Error deleting reservation: ", error);
    }
  };


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
      <Image source={require('../assets/logo-bigbite.png')} style={styles.image} />
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
        <TouchableOpacity style={styles.button} 
         onPress={() => navigation.navigate('EditReservation', {restuarant, reservationId : item.id})}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Cancel</Text>
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
   
      <View>

      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={reservationsData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={{
            marginTop: "5%",
            width: "100%",
          }}
        />
      )}
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
    borderRadius: '100%',
    marginRight: 10,
    marginTop: 30
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 8,
    paddingVertical: 5,
    // paddingHorizontal: 15,
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
  }
});

export default UserReserv;

