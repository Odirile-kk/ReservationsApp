import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { collection, doc, setDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../firebase';


const UpdateRestuarant = ({ route }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);
  const {restuarant} = route.params;

  const handleImageUpload = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 5 - images.length,
      },
      response => {
        if (!response.didCancel && !response.error) {
          setImages(prevImages => [...prevImages, response.uri]);
        }
      }
    );
  };

  const handleSubmit = async () => {

  const newCityRef = doc(db, "restuarants", restuarant.id);
  
  await updateDoc(newCityRef, {
      name : name ,
      description : description,
      address : address
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
        {images.map(imageUri => (
          <Image key={imageUri} source={{ uri: imageUri }} style={styles.uploadedImage} />
        ))}
        {images.length < 5 && (
          <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
        )}
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
