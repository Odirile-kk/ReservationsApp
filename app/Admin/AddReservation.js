
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, doc, setDoc, addDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import { useNavigation } from 'expo-router';

const AddReservation = ({ route}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [guests, setGuests] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const {restuarant} = route.params;
  const navigation = useNavigation()

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  const [showPickerOptions, setShowPickerOptions] = useState(false);
 
  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const handleReservation = async () => {
      if (!guests || guests === '') {
        alert('Please select the number of guests.');
        return;
      }
    
      const reservationData = {
        date: date.toDateString(),
        time: time.toLocaleTimeString(),
        guests: guests,
        name: name,
        email: email
      };
    
      try {
        // Replace 'restaurantId' with the ID of the specific restaurant
        const restuarantId = restuarant.id; // Replace with the actual restaurant ID
        const restuarantRef = doc(collection(db, 'restuarant'), restuarantId);
        
        // Create a subcollection 'reservations' under the restaurant document
        const reservationCollectionRef = collection(restuarantRef, 'reservations');
        
        // Add a reservation document to the subcollection
        await addDoc(reservationCollectionRef, reservationData);
        
        alert('Reservation has been added successfully!');
      } catch (error) {
        console.error('Error adding reservation: ', error);
      }

      // navigation.navigate('Reservations')
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Table Reservation</Text>

      <TextInput 
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TouchableOpacity onPress={showDatepicker} style={styles.input}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity onPress={showTimepicker} style={styles.input}>
        <Text>{time.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <TouchableOpacity
        style={styles.picker}
        onPress={() => setShowPickerOptions(true)}
      >
        <Text>
          {guests === '' ? 'Select Number of Guests' : guests}
        </Text>
      </TouchableOpacity>
      {showPickerOptions && (
      <Picker
        selectedValue={guests}
          style={{ width: '100%', height: 40 }}
          onValueChange={(itemValue, itemIndex) => {
            setGuests(itemValue);
            setShowPickerOptions(false);
          }}
      >
        <Picker.Item label="Select Number of Guests" value="" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
      </Picker>
      )}

      <TouchableOpacity style={styles.button} onPress={handleReservation}>
        <Text style={styles.buttonText}>Reserve Table</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#ff6f61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default AddReservation;
