import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Heading from "../../Componenets/Heading";
import Colors from "../../Utils/Colors";

export default function BusinessAboutMe({ business }) {
  const [isReadMore, setIsReadMore] = useState(false);
  return (
    business && (
      <View>
        <View>
          <Heading text={"About Me"} />
          <Text
            style={{
              fontFamily: "outfit-regular",
              lineHeight: 28,
              color: Colors.GREY,
              fontSize: 16,
            }}
            numberOfLines={isReadMore ? 20 : 5}
          >
            {business.about}
          </Text>
          <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
            <Text
              style={{
                color: Colors.PRIMARY,
                fontSize: 16,
                fontFamily: "outfit-regular",
              }}
            >
              {isReadMore ? "Read Less" : "Read More"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}
