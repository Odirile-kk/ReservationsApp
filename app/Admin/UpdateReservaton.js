import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
   
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { doc, getDocs, db, collection, updateDoc } from "../firebase";

const UpdateReservation = ({route}) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [guests, setGuests] = useState('');
  const [reservationsData, setReservationsData] = useState([]);
  const {restuarant, reservationId} = route.params

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

  useEffect(() => {
    const getData = async () => {
      const restuarantId = restuarant.id;
      const restuarantRef = doc(db, "restuarant", restuarantId);
      // const reservationCollectionRef = collectionGroup( db, "reservations");
      const reservationCollection = collection(restuarantRef, "reservations");

      try {
        const querySnapshot = await getDocs(reservationCollection);
        const reservations = [];
  
        querySnapshot.forEach((doc) => {
          const reservationData = {
            id: doc.id,
            ...doc.data(),
          };
  
          reservations.push(reservationData);
        });
  
        setReservationsData(reservations);
  
        // Find the reservation that matches the specified reservationId
        const matchingReservation = reservations.find(
          (reservation) => reservation.id === reservationId
        );
  
        if (matchingReservation) {
          console.log("Matching Reservation:", matchingReservation);
          setReservationsData(matchingReservation);
          // You can use 'matchingReservation' here outside of the function
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    getData();
  }, []);


  const handleSubmit = async () => {
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
     
      const restuarantId = restuarant.id;
      const reservationId = reservationsData.id
    const reservationRef = doc(db, 'restuarant', restuarantId, 'reservations', reservationId);
    await updateDoc(reservationRef, reservationData);
      alert('Reservation has been added successfully!');
    } catch (error) {
      console.error('Error adding reservation: ', error);
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Table Reservation</Text>
      <TextInput 
        style={styles.input}
        value={reservationsData.name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput 
        style={styles.input}
        value={reservationsData.email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TouchableOpacity onPress={showDatepicker} style={styles.input}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={reservationsData.date}
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
          value={reservationsData.time}
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

      <TouchableOpacity style={styles.button}
      onPress={handleSubmit}
      >
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
    backgroundColor: 'blue',
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

export default UpdateReservation;
