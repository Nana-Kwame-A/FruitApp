import React from "react";
import {
  Appearance,
  FlatList,
  Pressable,
  RefreshControl,
  TouchableOpacity,
  useColorScheme
} from "react-native";
import Animated from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import switchTheme from "react-native-theme-switch-animation";
import { Moon, ShoppingCart, Sun } from "@tamagui/lucide-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import { Button, H6, Input, Paragraph, Spinner, View, XStack } from "tamagui";

const url = "https://fakestoreapi.com/products";

export default function index() {
  const insets = useSafeAreaInsets();
  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = React.useState(colorScheme);

  const changeTheme = React.useCallback(() => {
    if (theme === "dark") {
      Appearance.setColorScheme("dark");
    } else {
      Appearance.setColorScheme("light");
    }
  }, [theme]);

  React.useEffect(() => {
    changeTheme();
  }, [changeTheme]);

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

  return (
    <View
      paddingTop={insets.top + 10}
      paddingBottom={insets.bottom}
      flex={1}
      px={"$4"}
      gap="$3"
      // backgroundColor={"$background"}
      backgroundColor={theme === "dark" ? "black" : "white"}
    >
      <XStack
        space="$2"
        ai="center"
      >
        <H6
          color={theme === "dark" ? "white" : "black"}
          size="$8"
        >
          Let&apos;s Search for your Products
        </H6>
        <Button
          bg="transparent"
          color={theme === "dark" ? "white" : "black"}
          icon={
            theme === "dark" ? <Moon size="icon.md" /> : <Sun size="icon.md" />
          }
          onPress={(e) => {
            (e.currentTarget as any).measure((x, y, width, height, px, py) => {
              switchTheme({
                switchThemeFunction: () => {
                  setTheme(theme === "light" ? "dark" : "light");
                },
                animationConfig: {
                  type: "circular",
                  duration: 1000,
                  startingPoint: {
                    cy: py + height / 2,
                    cx: px + width / 2
                  }
                }
              });
            });
          }}
        />
      </XStack>

      <Input
        bg="#d4d4d4"
        placeholder="Search for products"
        px="$5"
        mb="$2"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <AnimatePresence>
        {loading ? (
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
        ) : (
          <FlatList
            data={filteredProducts.slice(0, 14)}
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
                      bg= {theme === "dark" ? "#525355" : "white"}
                      overflow="hidden"
                      borderRadius="$10"
                      justifyContent="space-between"
                      alignItems="center"
                      w={wp(43.5)}
                      h={hp(30)}
                      borderWidth={3}
                      borderColor={"skyblue"}
                    >
                      <View
                        h="60%"
                        w="100%"
                        bg={theme === "dark" ? "#525355" : "white"}
                        p="$5"
                      >
                        <Animated.Image
                          sharedTransitionTag={`${item.id}`}
                          source={{ uri: item.image }}
                          style={{
                            height: "80%",
                            width: "100%",
                            objectFit: "contain",
                            
                          }}
                        />
                      </View>

                      <View
                        h="40%"
                        space="$4"
                        w="100%"
                        jc="flex-end"
                        position="relative"
                        bg={theme === "dark" ? "#525355" : "white"}
                      >
                        <Paragraph
                          fontWeight="600"
                          color={theme === "dark" ? "white" : "black"}
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
                          color={theme === "dark" ? "white" : "black"}
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
                            bottom={3}
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
        )}
      </AnimatePresence>
    </View>
  );
}
