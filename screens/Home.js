import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import RestaurantItems, {
  restaurants,
} from "../components/home/RestaurantItems";
import BottomTabs from "../components/home/BottomTabs";
import HeaderTabs from "../components/home/HeaderTabs";
import Categories from "../components/home/Categories";
import SearchBar from "../components/home/SearchBar";

const YELP_API_KEY =
  "DK2s01UIEPZE9IpPfaT7y9q0SXivMuOGrY8Oughjd25-BJAoE1upOt_R7T9BJBlBJ9qVAa1hdZg-2AnXXoRVJd0PUZhwiqlO4VAn4IDM_-pI9QqXQy-ym3j8VQVHYnYx";

export default function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = useState(restaurants);
  const [city, setCity] = useState("LosAngeles");
  const [activeTab, setActiveTab] = useState("Delivery");
  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };
    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };
  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#eee",
        flex: 1,
      }}
    >
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar setCity={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
}
