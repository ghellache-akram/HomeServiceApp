import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Utils/Colors";

import BusinessPhoto from "./BusinessPhotos";
import BusinessAboutMe from "./BusinessAboutme";
import BookingModel from "./BookingModel";

export default function BusinessDetailsScreen() {
  const navigation = useNavigation();
  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    param && setBusiness(param.business);
  }, [param]);

  const onMssageBtnClick = () => {
    Linking.openURL(
      "mailto:" +
        business?.email +
        "?subject= I am looking for your service&body=Hi, There"
    );
  };
  return (
    <View>
      <ScrollView style={{ height: "91%" }}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Image
          source={{ uri: business?.images[0]?.url }}
          style={{ width: "100%", height: 300 }}
        />
        <View style={styles.infoContainer}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
            {business?.name}
          </Text>
          <View style={styles.subContainer}>
            <Text
              style={{
                fontFamily: "outfit-medium",
                color: Colors.PRIMARY,
                fontSize: 20,
              }}
            >
              {business?.contactPerson} 🌟
            </Text>
            <Text
              style={{
                color: Colors.PRIMARY,
                backgroundColor: Colors.PRIMARY_LIGHT,
                padding: 5,
                borderRadius: 5,
                fontSize: 14,
              }}
            >
              {business?.category.name}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 19,
              fontFamily: "outfit-regular",
              color: Colors.GREY,
            }}
          >
            <Ionicons
              name="location-sharp"
              size={22}
              color={Colors.PRIMARY}
              style={{ marginRight: 10 }}
            />
            {business?.adress}
          </Text>
          {/* Horizontal line */}
          <View
            style={{
              borderWidth: 0.4,
              borderColor: Colors.GREY,
              marginTop: 25,
              marginBottom: 20,
            }}
          ></View>
          {/* About Me Section */}
          <BusinessAboutMe business={business} />
          {/* Horizontal line */}
          <View
            style={{
              borderWidth: 0.4,
              borderColor: Colors.GREY,
              marginTop: 25,
              marginBottom: 20,
            }}
          ></View>
          <BusinessPhoto business={business} />
        </View>
      </ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 8,
          gap: 8,
        }}
      >
        <TouchableOpacity
          style={styles.messagebtn}
          onPress={() => {
            onMssageBtnClick();
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              color: Colors.PRIMARY,
              fontSize: 18,
            }}
          >
            Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookingbtn}
          onPress={() => {
            setShowModel(true);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              color: Colors.WHITE,
              fontSize: 18,
            }}
          >
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
      {/* Booking Model */}
      <Modal animationType="slide" visible={showModel}>
        <BookingModel
          businessId={business.id}
          hideModel={() => {
            setShowModel(false);
          }}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
  },
  infoContainer: {
    padding: 20,
    display: "flex",
    gap: 7,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  messagebtn: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    textAlign: "center",
    flex: 1,
  },
  bookingbtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    textAlign: "center",
    flex: 1,
  },
});
