import React, { useState, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import COLORS from "../const/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import {MdOpenInFull} from 'react-icons/md'
import { collection, doc, getDocs, db, deleteDoc } from "../firebase";
import {
  query,
  where,
} from "firebase/firestore";
import { ActivityIndicator } from "react-native";



const { height } = Dimensions.get("window");

const HomeScreen = ({ navigation, route }) => {
  const [restuarants, setRestuarants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const { userEmail, userUID, isAdmin } = route.params;
  const [user, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
        setFilteredRestaurants(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
  
    console.log(isAdmin);
  }, []);

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
        setUserData(data);
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
    
    console.log("Data :", user);
  }, []);


  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = restuarants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  const cardItem = ({ item }) => {
    return (
      <View style={{
       
      }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("DetailsScreen", {
              restuarant: item,
              userEmail,
              userUID,
            })
          }
          
        >
          <View style={style.cardContainer}>
            {/* Render the card image */}
            <View style={style.cardImageContainer}>
              <Image
                source={{ uri: item.images }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 15,
                  resizeMode: "cover",
                  
                }}
              />
            </View>

            {/* Render all the card details here */}
            <View style={style.cardDetailsContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: COLORS.dark,
                    fontSize: 20,
                  }}
                >
                  {item.name}
                </Text>
                <Icon name="arrow-expand" size={22} color={COLORS.grey} />
                {/* <MdOpenInFull size={22} color={COLORS.grey} /> */}
              </View>
              <Text style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}>
                {item.description}
              </Text>

              {/* Render distance and the icon */}
              <View style={{ marginTop: 5, flexDirection: "row" }}>
                <Icon name="map-marker" color={COLORS.primary} size={18} />
                <Text
                  style={{ fontSize: 12, color: COLORS.grey, marginLeft: 5 }}
                >
                  {item.address}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      
      <View style={style.mainContainer}>


        <TouchableOpacity
          style={{ display: "flex", flexDirection: "row", padding: "3%" }}
          onPress={() =>
            navigation.navigate("EditProfile", { userEmail, userUID, isAdmin })
          }
        >
         <Text style={{
            fontWeight: 600,
            fontSize: 30
          }}>Hello, {user[0]?.name}</Text>
          <Icon name="account" size={30} color={COLORS.primary} 
            style={{
              marginLeft: '40%'
            }} />
        
        </TouchableOpacity>

        {/* Render the search inputs and icons */}
        <View style={style.searchInputContainer}>
          <Icon name="magnify" size={24} color={COLORS.grey} />
          <TextInput
            placeholderTextColor={COLORS.grey}
            placeholder="Search..."
            style={{ flex: 1 }}
            onChangeText={handleSearch}
          />
          <Icon name="sort-ascending" size={24} color={COLORS.grey} />
        </View>
        {/* Render the cards with flatlist */}
        {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredRestaurants}
          renderItem={cardItem}
          keyExtractor={(item) => item.id}
          style={{
            width: '105%',
            alignSelf: 'center',
            marginTop: '5%',
            
          }}
        />
        )}
      </View>
      
    </ScrollView>
  );
};

const style = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    marginTop: 20,
    paddingHorizontal: 20,
    // paddingVertical: 40,
    minHeight: height,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryBtn: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  categoryBtnName: {
    color: COLORS.dark,
    fontSize: 10,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardDetailsContainer: {
    height: 120,
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: "center",
  },
  cardImageContainer: {
    height: 150,
    width: 140,
    backgroundColor: COLORS.background,
    borderRadius: 20,
  },
});
export default HomeScreen;

