import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import COLORS from "../const/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";

const UserProfile = ({ route }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const {userEmail} = route.params;
  const navigate = useNavigation();

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleSubmit = () => {
    console.log("Username:", username);
    console.log('Email:', userEmail);
   
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={handleUsernameChange}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          defaultValue={userEmail}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
            marginTop: "2%",
          }}
        >
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: COLORS.secondary,
              padding: 10,
              borderRadius: 10,
              borderColor: COLORS.primary,
              borderWidth: 1,
            }}
          >
            <Text>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.secondary,
              padding: 10,
              borderRadius: 10,
              borderColor: COLORS.primary,
              borderWidth: 1,
            }}
            onPress={() => navigate.navigate("UserReservations")}
          >
            <Text>Reservations</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    // backgroundColor: COLORS.primary,
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
});

export default UserProfile;
