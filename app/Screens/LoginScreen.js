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
import { collection, doc, setDoc , getDocs} from "firebase/firestore";
import { db } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigation();
  const [secretCode, setSecretCode] = useState(""); 
  const adminSecretCode = "12349"; 

  const handleSignUp = () => {

    const isAdmin = secretCode === adminSecretCode
    createUserWithEmailAndPassword(authorisation, email, password)
      .then(async(userCredentials) => {
        const user = userCredentials.user;
       
           // Assuming you have a Firestore collection named 'users'
           const usersCollection = doc(collection(db, "users"));

           // Create a document for the user using their UID as the document ID
           await setDoc(usersCollection, {
             email: user.email,
             uid: user.uid,
             isAdmin: isAdmin,
             // Add other user-related data here if needed
           });

        // nav.replace('Home')
        alert("Registration succesful!");
        console.log(user.isAdmin);
      })
      .catch((error) => alert(error.message));
    
   
  };

  //still working on the isAdmin.. get one user from firestore
  const handleSignIn = () => {
    signInWithEmailAndPassword(authorisation, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;

        const querySnapshot = await getDocs(collection(db, "users"));

    let isAdmin = false;

    querySnapshot.forEach((doc) => {
      console.log("Document ID:", doc.data().uid, user.uid);

      if (doc.data().uid === user.uid) {
        isAdmin = doc.data().isAdmin;
      }
    });

    console.log('isAdmin:', isAdmin);
       
       nav.replace("HomeScreen", { userEmail: user.email, userUID: user.uid, isAdmin: isAdmin});
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
        <TextInput
          placeholder="Secret Code (Admin)"
          placeholderTextColor="gray"
          style={styles.textInput}
          value={secretCode}
          onChangeText={(text) => setSecretCode(text)}
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
