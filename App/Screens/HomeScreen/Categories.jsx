import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GlobalApi from "../../Utils/GlobalApi";
import Heading from "../../Componenets/Heading";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    GlobalApi.getCategories().then((resp) => {
      setCategories(resp?.categories);
    });
  };
  return (
    <View style={{ marginTop: 10 }}>
      <Heading text={"Categories"} isViewAll={true} />
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item, index }) =>
          index <= 3 && (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.push("business-list", { category: item.name })
              }
            >
              <View style={styles.icons}>
                <Image
                  source={{ uri: item?.icon?.url }}
                  style={{ width: 50, height: 50 }}
                />
              </View>
              <Text style={{ fontFamily: "outfit-medium", marginTop: 5 }}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icons: {
    backgroundColor: Colors.LIGHT_GREY,
    padding: 10,
    borderRadius: 99,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});
