import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  ref,
  uploadString,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

const AddRestuarant = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigation();
  const storage = getStorage();

  const handleImageUpload = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setImages(result.assets[0].uri);

      const imageUri = result.uri;

      const storageRef = ref(storage, `images/${Date.now()}`);

      await uploadString(storageRef, imageUri, "data_url");

      const downloadURL = await getDownloadURL(storageRef);

      setImages(downloadURL); 
    }
    console.log(images);
  };

  const handleSubmit = async () => {
    // Add a new document with a generated id
    const newCityRef = doc(collection(db, "restuarants"));

    await setDoc(newCityRef, {
      name: name,
      description: description,
      address: address,
      images: images,
    });

    console.log("Document written with ID: ", newCityRef.id);
    alert("Restuarant added");
    navigate.navigate("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
      />

      <Text style={styles.label}>Image:</Text>
      <View style={styles.imageContainer}>
        {images && (
          <Image source={{ uri: images }} style={styles.uploadedImage} />
        )}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleImageUpload}
        >
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  uploadedImage: {
    width: 80,
    height: 80,
    margin: 5,
  },
  uploadButton: {
    // width: 80,
    // height: 80,
    // borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  uploadButtonText: {
    color: "#3498db",
  },
  submitButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddRestuarant;
