import React from "react";
import Animated from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { parse } from "react-native-svg";
import { ChevronLeft, Heart } from "@tamagui/lucide-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { Button, H5, Paragraph, View, XStack, YStack } from "tamagui";

import Counter from "../components/Counter";

export default function ProductDetails() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  console.log();
  const [count, setCount] = React.useState<number>(1);

  return (
    <View
      flex={1}
      pt={insets.top}
      px="$4"
    >
      <XStack
        jc="space-between"
        ai="center"
      >
        <Link
          asChild
          href="/"
        >
          <Button
            bg="transparent"
            icon={<ChevronLeft size="$icon.lg" />}
            pressStyle={{
              bg: "transparent",
              borderColor: "transparent"
            }}
          />
        </Link>

        <Button
          bg="transparent"
          color="red"
          icon={<Heart size="$icon.lg" />}
          pressStyle={{
            bg: "transparent",
            borderColor: "transparent"
          }}
        />
      </XStack>

      <View
        bg="white"
        p="$3"
        br="$10"
      >
        <Animated.Image
          sharedTransitionTag={`${params.id}`}
          source={{ uri: params.image as unknown as string }}
          style={{
            width: "100%",
            height: hp("35%"),
            marginVertical: 10,
            objectFit: "contain"
          }}
        />
      </View>

      <YStack
        space="$5"
        mt="$2"
        flex={1}
      >
        <H5 size="$8">{params.title}</H5>

        <XStack
          jc="space-between"
          ai="center"
          mt="$2"
        >
          <Counter
            setCount={setCount}
            value={count.toString()}
          />
          <Paragraph size="$8">
            {/* @ts-ignore */}$
            {(parseFloat(params?.price ?? 1).toFixed(2) * count).toFixed(2)}{" "}
          </Paragraph>
        </XStack>

        <Paragraph>{params.description}</Paragraph>

        <View
          flex={1}
          jc="flex-end"
          pb={insets.bottom + 10}
        >
          <Button
            bg="red"
            color="white"
            width='80%'
            alignSelf='center'
          >
            Add to Cart
          </Button>
        </View>
      </YStack>
    </View>
  );
}
