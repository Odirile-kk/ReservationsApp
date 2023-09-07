import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import COLORS from "../const/colors";
import * as ImagePicker from "expo-image-picker";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const UserProfile = ({ route }) => {

  const { userEmail, userUID, isAdmin } = route.params;
  const navigate = useNavigation();
  const [user, setUserData] = useState('');


  useEffect(() => {
    const getData = async () => {
      try {
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("uid", "==", userUID));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setUserData(data);
        // console.log("Data:", data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
    console.log("Data:", user);
  }, []);


  const cardProfile = ({item}) => {


    return (
      <View >
        <Text style={{fontSize: 30}}>Hello, {item.name} {item.surname}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>

    
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-around",
        // flexDirection: "row",
        marginTop: "2%",
      }}
    >
    <FlatList 
      data={user}
      renderItem={cardProfile}
      style={{
        top: '-110%'
      }}
    />
      {!isAdmin && ( 
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: 15, 
            borderRadius: 25, 
            borderColor: COLORS.secondary, 
            borderWidth: 2, 
          }}
          onPress={() => navigate.navigate("UserReservations", { userUID })}
        >
          <Text>View Your Reservations</Text>
        </TouchableOpacity>
      )}
  
      <TouchableOpacity
        onPress={() => {
          if (isAdmin) {
            navigate.navigate("Home");
          }
        }}
        style={{
          backgroundColor: COLORS.secondary,
          padding: 15,
          borderRadius: 25,
          borderColor: COLORS.primary,
          borderWidth: 2,
          display: isAdmin ? "flex" : "none", // Show the button only if isAdmin is true
        }}
      >
        <Text>{isAdmin ? "Admin Dashboard" : "View Dash Board"}</Text>
      </TouchableOpacity>

    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.primary
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: "#888",
    marginBottom: 10,
  },
});

export default UserProfile;
