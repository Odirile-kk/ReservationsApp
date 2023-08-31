import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import COLORS from "../const/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  ref,
  uploadString,
  getDownloadURL,
  getStorage,
  storage
} from "firebase/storage";

const UserProfile = ({ route }) => {
  const [username, setUsername] = useState('')
  const {userEmail, userUID, isAdmin} = route.params;
  const navigate = useNavigation();


  return (


    <View style={styles.container}>
    <Text style={styles.username}>{username}</Text>
    <Text style={styles.email}>{userEmail}</Text>
    <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
            marginTop: "2%",
          }}
        >
       
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.secondary,
              padding: 10,
              borderRadius: 10,
              borderColor: COLORS.primary,
              borderWidth: 1,
            }}
            onPress={() => navigate.navigate("UserReservations", {userUID})}
          >
            <Text>Reservations</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
          if (isAdmin) {
            navigate.navigate("Home"); // Navigate to Admin Dashboard only if isAdmin is true
          }
        }}
        style={{
          backgroundColor: COLORS.secondary,
          padding: 10,
          borderRadius: 10,
          borderColor: COLORS.primary,
          borderWidth: 1,
          display: isAdmin ? "flex" : "none", // Show the button only if isAdmin is true
        }}
          >
            <Text>Admin Dashboard</Text>
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
