import { View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const restaurants = [
  {
    name: "My House",
    image_url:
      "https://lh3.googleusercontent.com/p/AF1QipPQd-MoRxFj6TI3SB-cPwyTbY442T-vWdgh8Ygx=s1600-w400",
    rating: 4,
  },
];
export default function RestaurantItems({ navigation, ...props }) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{ marginBottom: 30 }}
      onPress={() =>
        navigation.navigate("RestaurantDetail" )
      }
    >
      {props.restaurantData.map((restaurant, index) => (
        <View
          key={index}
          style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
        >
          <RestaurantImage image={restaurant.image_url} />
          <RestaurantInfo name={restaurant.name} rate={restaurant.rating} />
        </View>
      ))}
    </TouchableOpacity>
  );
}

const RestaurantImage = (props) => (
  <>
    <Image
      source={{
        uri: props.image,
      }}
      style={{ width: "100%", height: 180 }}
    />
    <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </>
);
const RestaurantInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}> {props.name}</Text>
      <Text style={{ fontSize: 13, color: "gray" }}> 30-45 . min</Text>
    </View>
    <View
      style={{
        backgroundColor: "#eee",
        height: 30,
        width: 30,
        alignItems: "center",
        borderRadius: 15,
        justifyContent: "center",
      }}
    >
      <Text> {props.rate}</Text>
    </View>
  </View>
);
