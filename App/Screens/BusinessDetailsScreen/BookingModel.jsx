import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../../Utils/Colors";
import Heading from "../../Componenets/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import { format } from "date-fns";

export default function BookingModel({ businessId, hideModel }) {
  const [timeList, setTimeList] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [note, setNote] = useState();
  const { user } = useUser();
  useEffect(() => {
    getTime();
  }, []);
  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };

  //Create Booking Method
  const createNewBooking = () => {
    if (!selectedTime || !selectedDate) {
      ToastAndroid.show("Please Select Date And Time", ToastAndroid.LONG);
      return;
    }
    const data = {
      userName: user?.fullName,
      userEmail: user.primaryEmailAddress.emailAddress,
      time: selectedTime,
      note: note,
      businessId: businessId,
      date: format(selectedDate, "MM/dd/yyyy"),
    };
    GlobalApi.createBooking(data).then((resp) => {
      console.log("resp", resp);
      ToastAndroid.show("Booking Created Successfully!", ToastAndroid.LONG);
      hideModel();
    });
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 20, paddingTop: 30 }}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={() => hideModel()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="black" />
          <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
            Booking
          </Text>
        </TouchableOpacity>
        {/* Calendar Section */}
        <Heading text={"Select Day"} />
        <View style={styles.calendarContainer}>
          <CalendarPicker
            onDateChange={setSelectedDate}
            width={350}
            minDate={Date.now()}
            todayBackgroundColor={Colors.BLACK}
            todayTextStyle={{ color: Colors.WHITE }}
            selectedDayColor={Colors.PRIMARY}
            selectedDayTextColor={Colors.WHITE}
          />
        </View>
        {/* Time Select Section */}
        <View style={{ marginTop: 20 }}>
          <Heading text={"Select TiMe Slot "} />
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={[
                    selectedTime == item.time
                      ? styles.selectedTime
                      : styles.unselectedTime,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* Note Section */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={"Any Suggestion Note"} />
          <TextInput
            placeholder="Note"
            numberOfLines={4}
            multiline={true}
            style={styles.noteTextArea}
            onChange={(text) => setNote(text)}
          />
        </View>
        {/* Confirmation Button */}
        <View>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => createNewBooking()}
          >
            <Text style={styles.confirmBtn}> Confirm & Book</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  },
  selectedTime: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: Colors.PRIMARY,
    color: Colors.WHITE,
    paddingHorizontal: 18,
  },
  unselectedTime: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: Colors.PRIMARY,
    color: Colors.PRIMARY,
    paddingHorizontal: 18,
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    fontFamily: "outfit-regular",
    borderColor: Colors.PRIMARY,
  },
  confirmBtn: {
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 13,
    borderRadius: 99,
    elevation: 2,
  },
});
