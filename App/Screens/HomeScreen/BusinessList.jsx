import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Heading from "../../Componenets/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItemSmall from "./BusinessListItemSmall";

export default function BusinessList() {
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    getBusinnesList();
  }, []);

  const getBusinnesList = () => {
    GlobalApi.getBusinessList().then((resp) => {
      setBusinessList(resp.businessLists);
    });
  };
  return (
    <View style={{ marginTop: 20 }}>
      <Heading text={"Latest Business"} isViewAll={true} />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={businessList}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 10 }}>
            <BusinessListItemSmall business={item} />
          </View>
        )}
      />
    </View>
  );
}
