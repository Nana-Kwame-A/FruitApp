import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Paragraph, View } from "tamagui";

export default function ProductDetails() {
  const params = useLocalSearchParams();

  alert(JSON.stringify(params, null, 2));

  console.log();


  

  return (
    <View>
      <Paragraph>[product_id]</Paragraph>
    </View>
  );
}
