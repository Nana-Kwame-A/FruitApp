import React from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ShoppingCart } from "@tamagui/lucide-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
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

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

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
        placeholder="Search for products"
        px="$5"
        mb="$2"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <AnimatePresence>
        <FlatList
          data={filteredProducts}
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
            <Link
              asChild
              href={{
                pathname: `/${item.id}`,
                params: { ...item }
              }}
            >
              <TouchableOpacity>
                <MotiView
                  transition={{ delay: index * 100, damping: 30, mass: 1 }}
                  from={{
                    opacity: 0,
                    translateY: -50
                  }}
                  animate={{
                    opacity: 1,
                    translateY: 0
                  }}
                  exit={{
                    opacity: 0,
                    translateX: 50
                  }}
                >
                  <View
                    bg="#d4d4d4"
                    overflow="hidden"
                    borderRadius="$10"
                    justifyContent="space-between"
                    alignItems="center"
                    w={wp(43.5)}
                    h={hp(30)}
                    borderWidth={3}
                    borderColor={"skyblue"}
                    gap="$3"
                  >
                    <View
                      h="60%"
                      w="100%"
                      bg="white"
                      p="$5"
                    >
                      <Image
                        source={{ uri: item.image }}
                        contentFit="contain"
                        style={{ height: "80%", width: "100%" }}
                        transition={100}
                      />
                    </View>

                    <View
                      h="40%"
                      space="$4"
                      w="100%"
                      jc="flex-end"
                      position="relative"
                    >
                      <Paragraph
                        fontWeight="600"
                        size="$2"
                        numberOfLines={2}
                        px="$3"
                      >
                        {item.title}
                      </Paragraph>

                      <Paragraph
                        size="$6"
                        px="$4"
                        pb="$2"
                      >
                        ${item.price}
                      </Paragraph>

                      <Pressable
                        style={{
                          position: "absolute",
                          zIndex: 10,
                          right: 0,
                          bottom: 0,
                          paddingHorizontal: 10,
                          paddingVertical: 20,
                          backgroundColor: "skyblue",
                          borderTopLeftRadius: 500
                        }}
                      >
                        <ShoppingCart
                          // @ts-ignore
                          bottom={8}
                          size={15}
                          color="white"
                        />
                      </Pressable>
                    </View>
                  </View>
                </MotiView>
              </TouchableOpacity>
            </Link>
          )}
        />
      </AnimatePresence>
    </View>
  );
}
