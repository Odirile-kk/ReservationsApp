import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import COLORS from "../const/colors";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

const EditProfile = ({ route }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const { userUID, isAdmin } = route.params;
  const [user, setUserData] = useState("");
  const storage = getStorage();
  const [isLoading, setIsLoading] = useState(true);

  const nav = useNavigation();

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
        if (data.length > 0) {
          const user = data[0];
          setUserData(user);
          setName(user.name);
          setSurname(user.surname);
          setImage(user.image);
          setUserId(user.id);
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
  
    console.log("Data:", user);
  }, [userUID]);

  // console.log(user);

  const handleImageUpload = async () => {
    // Check for permissions to access the device's image library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access the image library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.uri;
      // Create a reference to Firebase Storage
      const storageRef = ref(storage, `images/${Date.now()}`);

      try {
        // Convert the image file to a Blob
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        setImage(downloadURL);
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  const handleSave = async () => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, {
        name: name,
        surname: surname,
        image: image,
      });
      alert("User Updated");
      nav("UserProfile");
    } catch (error) {
      console.error("Error updating user: ", error);
      // alert("Error updating user profile");
    }
  };

  return (
    
      
      <View style={styles.container}>
        {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
      <View>
      <Image source={{ uri: image }} style={styles.image} />

      <TouchableOpacity onPress={handleImageUpload}>
        <MaterialCommunityIcons
          name="camera"
          size={24}
          color="white"
          style={{ top: "-300%" }}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={(text) => setSurname(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      {!isAdmin && (
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: 15,
            borderRadius: 25,
            borderColor: COLORS.secondary,
            borderWidth: 2,
          }}
          onPress={() => nav.navigate("UserReservations", { userUID })}
        >
          <Text>View Your Reservations</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          if (isAdmin) {
            nav.navigate("Home");
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
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: "100%",
    // marginBottom: 70,
    top: -45,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});

export default EditProfile;

