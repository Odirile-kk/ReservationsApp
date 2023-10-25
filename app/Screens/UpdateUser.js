import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import COLORS from "../const/colors";
import { ActivityIndicator } from "react-native";


const UpdateUser = ({route}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const {userEmail} =route.params
    const [isLoading, setIsLoading] = useState(true);

    const handleUsernameChange = (text) => {
        setUsername(text);
      };
    
    
      const handleSubmit = () => {
        // console.log("Username:", username);
        // console.log('Email:', userEmail);
        // console.log('Email:', isAdmin);
      };
    

  return (
    <View>
      <View style={styles.container}>

      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={handleUsernameChange}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            defaultValue={userEmail}
            keyboardType="email-address"
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
              marginTop: "2%",
            }}
          >
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: COLORS.secondary,
                padding: 10,
                borderRadius: 10,
                borderColor: COLORS.primary,
                borderWidth: 1,
              }}
            >
              <Text>Update</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      )}
      </View>
    </View>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({});

