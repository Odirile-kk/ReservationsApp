import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { collection, doc, setDoc, updateDoc, getDocs,} from "firebase/firestore"; 
import { db } from '../firebase';
import {
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
  getStorage,
} from "firebase/storage";


const UpdateRestuarant = ({ route }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);
 
  const [restuarants, setRestuarants] = useState([]);
  const {restuarant} = route.params;
  const storage = getStorage();

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "restuarants"));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setRestuarants(data);
        // console.log('outside');
         // Find the specific restaurant's data by its ID
         const specificRestaurant = data.find(r => r.id === restuarant.id);

         // Prepopulate the form fields with the specific restaurant's data
         if (specificRestaurant) {
           setName(specificRestaurant.name);
           setDescription(specificRestaurant.description);
           setAddress(specificRestaurant.address);
         }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
  }, []);


  const handleImageUpload = async () => {
    // Check for permissions to access the device's image library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Permission to access the image library is required!');
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
  
      const storageRef = ref(storage, `images/${Date.now()}`);
  
      try {
       // Convert the image file to a Blob
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Upload the Blob to Firebase Storage
      await uploadBytes(storageRef, blob);

      // Get the download URL for the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Set the download URL in your component state or do whatever you need with it
      setImages(downloadURL);
     
      } catch (error) {
        console.error('Error uploading image: ', error);
      
      }
    }
  };

  const handleSubmit = async () => {

  const newCityRef = doc(db, "restuarants", restuarant.id);
  
  await updateDoc(newCityRef, {
      name : name ,
      description : description,
      address : address,
      images: images,
  })
  .then(() => {
    alert("Restaurant Updated Successfully")
  })
  .catch((error) => {
    alert('Error adding document: ', error);
  });
  }
  

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

      <Text style={styles.label}>Images:</Text>
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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  uploadedImage: {
    width: 80,
    height: 80,
    margin: 5,
  },
  uploadButton: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  uploadButtonText: {
    color: '#3498db',
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UpdateRestuarant;
