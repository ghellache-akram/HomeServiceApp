import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "./Header";
import Slider from "./Slider";
import Categories from "./Categories";
import BusinessList from "./BusinessList";

export default function HomeScreen() {
  return (
    <View>
      {/* HEADER */}
      <Header />
      {/* SLIDER */}
      <View style={styles.sliderBar}>
        <Slider />
        {/* Category */}
        <Categories />
        {/* Business List */}
        <BusinessList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderBar: {
    padding: 20,
  },
});
