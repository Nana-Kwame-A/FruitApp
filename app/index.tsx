import React from "react";
import { FlatList, RefreshControl } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { H6, Input, Paragraph, ScrollView, Spinner, View } from "tamagui";

const url = "https://nekos.best/api/v2/neko?amount=20";

export default function index() {
  const insets = useSafeAreaInsets();
  const [fruits, setFruits] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const fetchFruits = React.useCallback(async () => {
    setLoading(true);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const fruits = await response.json();
    setLoading(false);

    setFruits(fruits.results);
  }, []);

  React.useEffect(() => {
    fetchFruits();
  }, []);

  console.log(JSON.stringify(fruits, null, 2));

  if (loading)
    return (
      <View
        flex={1}
        ai="center"
        justifyContent="center"
      >
        <Spinner
          size="large"
          color="red"
        />
      </View>
    );

  return (
    <View
      paddingTop={insets.top + 10}
      paddingBottom={insets.bottom}
      flex={1}
      px={"$4"}
      gap="$3"
    >
      <H6 size="$8">Let&apos;s Search for your fruits</H6>

      <Input
        bg="#d4d4d4"
        placeholder="Search for fruit"
        px="$5"
        mb="$2"
      />

      <FlatList
        data={fruits}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ItemSeparatorComponent={() => <View h={hp(2)} />}
        keyExtractor={(item) => item.name}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              fetchFruits();
            }}
          />
        }
        renderItem={({ item, index }) => (
          <View
            key={index}
            bg="#d4d4d4"
            overflow="hidden"
            borderRadius="$10"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            w={wp(43.5)}
            h={hp(25)}
          >
            <Image
              source={{ uri: item.url }}
              style={{ height: "100%", width: "100%" }}
              transition={100}
              placeholder={
                "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
              }
            />
          </View>
        )}
      />
    </View>
  );
}
