import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Paragraph, ScrollView, View } from "tamagui";

export default function ProductDetails() {
  const params = useLocalSearchParams();

  // alert(JSON.stringify(params, null, 2));

  console.log(params);
  const insets = useSafeAreaInsets();

  console.log(params.image);

  return (
    <View
      bg="lightblue"
      flex={1}
      paddingTop={insets.top + 10}
      paddingBottom={insets.bottom}
    >
      <Paragraph>Product Details</Paragraph>

      <View
        flex={6}
        // alignItems="center"
      >
        <View
          // h="100%"
          // w="100%"
          flex={1}
          // bg="white"
          // p="$5"
          w="100%"
          bg="red"
        >
          <Image
            source={params.image}
            style={{ height: "100%", width: "100%", backgroundColor: "white" }}
            contentFit="cover"
          />
        </View>
      </View>

      <View flex={4}>
        <View
          space="$4"
          alignItems="center"
          position="relative"
        >
          <Paragraph
            fontWeight="600"
            size="$5"
            px="$3"
          >
            {params.title}
          </Paragraph>

          <Paragraph
            size="$6"
            px="$4"
            pb="$2"
          >
            ${params.price}
          </Paragraph>
          <Paragraph
            size="$6"
            px="$4"
            pb="$2"
          >
            {params.description}
          </Paragraph>
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <View pb="$7">
            <Paragraph>Add to Cart</Paragraph>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
