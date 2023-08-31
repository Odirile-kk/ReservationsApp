import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/colors';
import { collection, getDocs, db } from "../firebase";
const {width} = Dimensions.get('screen');


const DetailsScreen = ({navigation, route}) => {
  const {restuarant} = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);
  const {userEmail, userUID } = route.params;
  const [restuarants, setRestuarants] = useState([]);

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
        // Find the specific restaurant's data by its ID
        const specificRestaurant = data.find(r => r.id === restuarant.id);

        // Prepopulate the form fields with the specific restaurant's data
        if (specificRestaurant) {
          setName(specificRestaurant.name);
          setDescription(specificRestaurant.description);
          setAddress(specificRestaurant.address);
          setImages(specificRestaurant.images)
        }
        console.log(specificRestaurant)
      
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.light}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* restuarant image */}

        <View style={style.backgroundImageContainer}>
          <ImageBackground style={style.backgroundImage}  source={{ uri: images }}>
            <View style={style.header}>
              <View style={style.headerBtn}>
                <Icon
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                />
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={style.detailsContainer}>
          {/* Name and rating view container */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {name}
            </Text>
            
          </View>

          {/* Location text */}
          <Text style={{fontSize: 16, color: COLORS.grey}}>
          <Icons name="map-marker" color={COLORS.primary} size={18} />
          {address}
          </Text>

          
          <Text style={{marginTop: 20, color: COLORS.grey}}>
            {description}
          </Text>

          {/* footer container */}
      
            <TouchableOpacity style={style.bookNowBtn} onPress={() => navigation.navigate('Reserve', {userEmail, restuarant, userUID } )}>
              <Text style={{color: COLORS.white}}>Reserve Now</Text>
            </TouchableOpacity>
          </View>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    height: 350,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 10
  },
  detailsContainer: {flex: 1, paddingHorizontal: 20, marginTop: 40},
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS.grey},
});

export default DetailsScreen;






