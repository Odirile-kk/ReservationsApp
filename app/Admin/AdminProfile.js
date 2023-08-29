import React, {useState} from "react";
import * as ImagePicker from "expo-image-picker";

import { View, Text, StyleSheet, Button, Image } from "react-native";

const AdminProfile = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: "center", justifyContent: "center" }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, borderRadius: "50%" }}
          />
        )}
      </View>
      <Text style={styles.username}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>
      <Text style={styles.bio}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum
        quam non orci convallis, non tincidunt massa viverra.
      </Text>
      <Text style={styles.bookings}>Total Bookings: 2</Text>
      <Button title="Update Profile" />
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
  bio: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  bookings: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AdminProfile;
