import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../const/colors";

const UserReservations = ({ navigation, route }) => {
// const {userEmail} = route.params;
// const {restuarant} = route.params;

    const cardItem = ({ item }) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DetailsScreen", {restuarant: item})}
          >
            <View style={styles.cardContainer}>
              {/* Render the card image */}
              {/* <View style={styles.cardImageContainer}>
                <Image
                  source={require('../assets/logo-bigbite.png')}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 15,
                    resizeMode: "cover",
                  }}
                />
              </View> */}
      
              {/* Render all the card details here */}
              <View style={styles.cardDetailsContainer}>
                {/* Name and gender icon */}
                <View
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Text
                    style={{ fontWeight: "bold", color: COLORS.dark, fontSize: 20 }}
                  >
                   Name
                  </Text>
                  <Icon name="arrow-expand" size={22} color={COLORS.grey} />
                  {/* <MdOpenInFull size={22} color={COLORS.grey} /> */}
                </View>
                <Text style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}>
                Desc
                </Text>
      
                {/* Render distance and the icon */}
                <View style={{ marginTop: 5, flexDirection: "row" }}>
                  <Icon name="map-marker" color={COLORS.primary} size={18} />
                  <Text style={{ fontSize: 12, color: COLORS.grey, marginLeft: 5 }}>
                  Address
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerBtn}>
          <Icon name="arrow-back-ios" size={20} onPress={navigation.goBack} />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
        //   data={filteredRestaurants}
          renderItem={cardItem}
        keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default UserReservations;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
