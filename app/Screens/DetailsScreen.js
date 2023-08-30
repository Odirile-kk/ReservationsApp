import React from 'react';
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
const {width} = Dimensions.get('screen');


const DetailsScreen = ({navigation, route}) => {
  const {restuarant} = route.params;
  const {userEmail, userUID } = route.params;

 

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.light}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* restuarant image */}

        <View style={style.backgroundImageContainer}>
          <ImageBackground style={style.backgroundImage} source={restuarant.images}>
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
            {restuarant.name}
            </Text>
            
          </View>

          {/* Location text */}
          <Text style={{fontSize: 16, color: COLORS.grey}}>
          <Icons name="map-marker" color={COLORS.primary} size={18} />
          {restuarant.address}
          </Text>

          
          <Text style={{marginTop: 20, color: COLORS.grey}}>
            {restuarant.description}
          </Text>

          {/* Interior list */}
          <FlatList
            contentContainerStyle={{marginTop: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={restuarant}
            renderItem={({item}) => <InteriorCard interior={item} />}
          />

          {/* footer container */}
          {/* <View style={style.footer}> */}
            
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
  },
  detailsContainer: {flex: 1, paddingHorizontal: 20, marginTop: 40},
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS.grey},
});

export default DetailsScreen;






