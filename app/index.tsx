import React from "react";
import { FlatList, RefreshControl } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { H6, Input, Paragraph, ScrollView, Spinner, View } from "tamagui";

const url = "https://fakestoreapi.com/products";

export default function index() {
  const insets = useSafeAreaInsets();
  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const fetchProducts = React.useCallback(async () => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  console.log(JSON.stringify(products, null, 2));

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
      <H6 size="$8">Let&apos;s Search for your Products</H6>

      <Input
        bg="#d4d4d4"
        placeholder="Search for fruit"
        px="$5"
        mb="$2"
      />

      <FlatList
        data={products}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ItemSeparatorComponent={() => <View h={hp(2)} />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              fetchProducts();
            }}
          />
        }
        renderItem={({ item, index }) => (
          <View
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
