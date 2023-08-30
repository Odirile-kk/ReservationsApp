import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import WelcomeScreen from "./Screens/WelcomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import DrawerNavigator from './Screens/DrawerNavigator';
import DetailsScreen from './Screens/DetailsScreen';
import HomeScreen from "./Screens/HomeScreen";
import Home from "./Admin/Home";
import Reservations from "./Admin/Reserations";
import AddRestuarant from "./Admin/AddRestuarant";
import AddReservation from "./Admin/AddReservation";
import UpdateReservation from "./Admin/UpdateReservaton";
import UpdateRestuarant from "./Admin/UpdateRestuarant";
import AdminProfile from "./Admin/AdminProfile";
import UserProfile from "./Screens/UserProfile";
import Reserve from "./Screens/Reserve";
import UserReservations from "./Screens/UserReservations";

export default function Page() {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator >
    <Stack.Screen options={{ headerShown: false}} name="welcome" component={WelcomeScreen}/>
    <Stack.Screen options={{ headerShown: false}} name="login" component={LoginScreen}/>

    <Stack.Screen options={{ headerShown: false}} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen  options={{ headerShown: false}} name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen  name="Reserve" component={Reserve} />
        <Stack.Screen options={{ headerShown: false}} name="UserReservations" component={UserReservations} />

        {/*Admin panel */}
        {/* <Stack.Screen  options={{ headerShown: false}} name="Home" component={Home} /> 
        <Stack.Screen  options={{ headerShown: false}} name="Reservations" component={Reservations} />
        <Stack.Screen  options={{ headerShown: false}} name="AddRestuarant" component={AddRestuarant} />  
        <Stack.Screen  options={{ headerShown: false}} name="AddReservation" component={AddReservation} />  
        <Stack.Screen  options={{ headerShown: false}} name="UpdateReservation" component={UpdateReservation} />
        <Stack.Screen  options={{ headerShown: false}} name="UpdateRestuarant" component={UpdateRestuarant} />
        <Stack.Screen  options={{ headerShown: false}} name="AdminProfile" component={AdminProfile} />  */}
    </Stack.Navigator>
  );
}

