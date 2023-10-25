
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, doc, serverTimestamp, addDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import { useNavigation } from 'expo-router';
import COLORS from "../const/colors";
import { ActivityIndicator } from "react-native";


const Reserve = ({ route}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [guests, setGuests] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const {userEmail, userUID, restuarant } = route.params;
  const [isLoading, setIsLoading] = useState(true);

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
        email: userEmail,
        userId: userUID,
        timestamp: serverTimestamp(),
      };
    
      try {
        const restuarantId = restuarant.id; 
        const restuarantRef = doc(collection(db, 'restuarant'), restuarantId);
        const reservationCollectionRef = collection(restuarantRef, 'reservations');
        
        // Add a reservation document to the subcollection
        await addDoc(reservationCollectionRef, reservationData);
        
        alert('Reservation has been added successfully!');
      } catch (error) {
        console.error('Error adding reservation: ', error);
      }

      // navigation.navigate('Reservations')
      console.log(restuarant.id)
  };


  return (
    <View style={styles.container}>

<Text style={styles.heading}>Table Reservation</Text>
      <Image 
        source={require('../assets/eating.png')}
      style={{
        width: '90%',
        height: '40%',

      }}
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
          style={{ width: '60%', marginTop: '-10%' }}
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
    padding: 10,
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
    backgroundColor:COLORS.primary ,
    padding: 10,
    borderRadius :10,
    borderColor: COLORS.primary,
    borderWidth: 1
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

export default Reserve;

