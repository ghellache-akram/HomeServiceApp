import { createStackNavigator } from "@react-navigation/stack";
import BookingScreen from "../Screens/BookingScreen/BookingScreen";
import BusinessDetailsScreen from "../Screens/BusinessDetailsScreen/BusinessDetailsScreen";
import React from "react";

const Stack = createStackNavigator();

export default function BookingNavigation() {
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="booking" component={BookingScreen} />
    <Stack.Screen name="business-detail" component={BusinessDetailsScreen} />
  </Stack.Navigator>;
}
