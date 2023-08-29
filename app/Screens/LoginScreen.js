import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import COLORS from "../const/colors";
import { authorisation } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigation();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authorisation, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        // nav.replace('Home')
        alert("Registration succesful!");
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(authorisation, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        nav.replace("HomeScreen");
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      <Image
        source={require("../assets/login.png")}
        style={{ width: "60%", height: "50%", alignSelf: "center" }}
      ></Image>
      <View>
        <Text style={{ fontSize: "30%", alignSelf: "center" }}>
          Let's get you a table!
        </Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          style={styles.textInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          style={styles.textInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerBtn} onPress={handleSignUp}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textInput: {
    padding: "3%",
    marginTop: "2%",
    borderWidth: "1",
    borderRadius: 10,
    paddingVertical: 15,
    borderColor: "#df8610",
  },
  loginBtn: {
    backgroundColor: "#df8610", // Background color of the button
    paddingVertical: 15, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 8, // Border radius
    alignItems: "center", // Center content horizontally
    justifyContent: "center",
    marginTop: "3%",
  },
  registerBtn: {
    backgroundColor: "#df8610", // Background color of the button
    paddingVertical: 15,
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 8, // Border radius
    alignItems: "center", // Center content horizontally
    justifyContent: "center",
    marginTop: "5%",
  },
  btnText: {
    color: "#ffffff", // Text color
    fontSize: 18, // Font size
    fontWeight: "bold", // Font weight
  },
});
