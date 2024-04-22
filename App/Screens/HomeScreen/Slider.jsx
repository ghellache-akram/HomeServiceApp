import React, { useEffect, useState } from "react";
import { Image, FlatList, StyleSheet, View } from "react-native";
import GlobalApi from "../../Utils/GlobalApi";
import Heading from "../../Componenets/Heading";

export default function Slider() {
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = () => {
    GlobalApi.getSlider().then((resp) => {
      setSlider(resp?.sliders);
    });
  };

  return (
    <View>
      <Heading text={"Offers For you"} />
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 20 }}>
            <Image
              source={{ uri: item?.image?.url }}
              style={styles.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: "outfit-medium",
    marginBottom: 10,
  },
  sliderImage: {
    width: 270,
    height: 150,
    borderRadius: 25,
    objectFit: "contain",
  },
});
