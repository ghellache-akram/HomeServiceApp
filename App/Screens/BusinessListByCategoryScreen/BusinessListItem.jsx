import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function BusinessListItem({ business, booking }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push("Business-details", {
          business: business,
        })
      }
    >
      <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />
      <View style={styles.subcontainer}>
        <Text
          style={{
            fontFamily: "outfit-regular",
            color: Colors.GREY,
            fontSize: 15,
          }}
        >
          {business.contactPerson}
        </Text>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 19 }}>
          {business.name}
        </Text>
        {!booking?.id ? (
          <Text
            style={{
              fontFamily: "outfit-regular",
              fontSize: 16,
              color: Colors.GREY,
            }}
          >
            <Ionicons
              name="location-sharp"
              size={20}
              color={Colors.PRIMARY}
              style={{ marginRight: 10 }}
            />
            {business.adress}
          </Text>
        ) : (
          <Text
            style={[
              {
                padding: 5,
                borderRadius: 5,
                fontSize: 14,
                alignSelf: "flex-start",
              },
              booking?.bookingStatus == "Completed"
                ? {
                    backgroundColor: Colors.LIGHT_GREEN,
                    color: Colors.GREEN,
                    fontFamily: "outfit-bold",
                  }
                : booking?.bookingStatus == "Canceled"
                ? {
                    backgroundColor: Colors.LIGHT_RED,
                    color: Colors.RED,
                    fontFamily: "outfit-bold",
                  }
                : {
                    color: Colors.PRIMARY,
                    backgroundColor: Colors.PRIMARY_LIGHT,
                    fontFamily: "outfit-bold",
                  },
            ]}
          >
            {booking?.bookingStatus}
          </Text>
        )}

        {booking?.id ? (
          <Text
            style={{
              fontFamily: "outfit-regular",
              color: Colors.GREY,
              fontSize: 16,
            }}
          >
            <AntDesign
              name="calendar"
              size={24}
              color={Colors.PRIMARY}
              style={{ marginLeft: 15 }}
            />
            {booking.date} at {booking.time}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  subcontainer: {
    display: "flex",
    gap: 7,
  },
});
