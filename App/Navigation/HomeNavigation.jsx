import { View, Text } from "react-native";
import React from "react";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessListByCategoryScreen from "../Screens/BusinessListByCategoryScreen/BusinessListByCategoryScreen";
import BusinessDetailsScreen from "../Screens/BusinessDetailsScreen/BusinessDetailsScreen";

const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="business-list"
        component={BusinessListByCategoryScreen}
      />
      <Stack.Screen name="Business-details" component={BusinessDetailsScreen} />
    </Stack.Navigator>
  );
}
