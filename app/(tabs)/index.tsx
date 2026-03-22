import { CartButton } from "@/components";
import { images, offers } from "@/constants";
import cn from "clsx";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        contentContainerClassName="pb-24 px-4"
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row",
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#fffff2" }}
              >
                {({ pressed }) => (
                  <React.Fragment>
                    <View className={"h-full w-1/2"}>
                      <Image
                        source={item.image}
                        className={"size-full"}
                        resizeMode={"contain"}
                      />
                    </View>
                    <View
                      className={cn(
                        "offer-card__info",
                        isEven ? "pl-10 " : "pl-10",
                      )}
                    >
                      <Text className="leading-tight text-white h1-bold">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode="contain"
                        tintColor="white"
                      />
                    </View>
                  </React.Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        ListHeaderComponent={() => (
          <View className="flex-row w-full my-4 flex-between ">
            <View className="flex-start">
              <Text className="mt-5 text-center uppercase small-bold text-primary">
                Deliver To
              </Text>
              <TouchableOpacity className="flex-row flex-center gap-x-1 mt-0.5">
                <Text className="uppercase paragraph-bold text-dark-100">
                  42 Chiltern St, Marylebone
                </Text>
                <Image
                  source={images.arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
