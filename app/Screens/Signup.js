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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigation();
  const [secretCode, setSecretCode] = useState("");
  const adminSecretCode = "12349";

  const handleSignUp = () => {
    const isAdmin = secretCode === adminSecretCode;

    createUserWithEmailAndPassword(authorisation, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;

      
        const usersCollection = collection(db, "users");

        // Create a document for the user using their UID as the document ID
        await setDoc(doc(usersCollection), {
          email: user.email,
          uid: user.uid,
          isAdmin: isAdmin,
          name: name,
          surname: surname,
        });

        alert("Registration succesful!");
        nav.replace("login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      <Image
        source={require("../assets/login.png")}
        style={{ width: "40%", height: "30%", alignSelf: "center" }}
      ></Image>
      <View>
        <Text style={{ fontSize: "30%", alignSelf: "center" }}>Sign up</Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor="gray"
          style={styles.textInput}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Surname"
          placeholderTextColor="gray"
          style={styles.textInput}
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />
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
        <TextInput
          placeholder="Secret Code (Admin)"
          placeholderTextColor="gray"
          style={styles.textInput}
          value={secretCode}
          onChangeText={(text) => setSecretCode(text)}
        />
        <TouchableOpacity style={styles.registerBtn} onPress={handleSignUp}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "8%",
          }}
        >
          <Text>Already registered? </Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => nav.navigate("login")}
          >
            <Text style={{ color: COLORS.primary }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textInput: {
    padding: "3%",
    marginTop: "2%",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    borderColor: "#df8610",
  },
  loginBtn: {
    //   backgroundColor: "#df8610",
    //   paddingVertical: 15,
    //   paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    //   marginTop: "3%",
    //   width: '45%',
  },
  registerBtn: {
    backgroundColor: "#df8610",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8, //
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  btnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

