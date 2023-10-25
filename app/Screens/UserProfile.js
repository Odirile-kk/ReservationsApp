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
import { ActivityIndicator } from "react-native";

const UserProfile = ({ route }) => {
  const { userEmail, userUID, isAdmin } = route.params;
  const navigate = useNavigation();
  const [user, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
    // console.log("Data:", user);
  }, []);

  const cardProfile = ({ item }) => {
    return (
      <View
        style={{
          elevation: 20,
          // marginHorizontal: 20,
          // marginTop: '-30%',
          alignItems: "center",
          height: 350,
          // backgroundColor: 'pink'
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            height: "50%",
            width: "70%",
            borderRadius: "50%",
            backgroundColor: "pink",
          }}
        />
          
        <Text style={{ fontSize: 30, marginTop: 10 }}>
          {item.name} {item.surname}
        </Text>
        <TouchableOpacity
          onPress={() => navigate.navigate("EditProfile", { userUID })}
          style={{
            marginTop: "40%",
            backgroundColor: COLORS.secondary,
            padding: 10,
            borderRadius: 25,
            borderColor: COLORS.primary,
            borderWidth: 2,
          }}
        >
          <Text>Edit profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
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
            showsVerticalScrollIndicator={false}
            style={{
              width: "200%",
              height: 400,
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.primary,
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

