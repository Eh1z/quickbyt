import { images } from "@/constants";
import { useAuthStore } from "@/store";
import { TabBarIconProps } from "@/type";
import cn from "clsx";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const TabIcon = ({ title, icon, focused }: TabBarIconProps) => (
  <View className="tab-icon">
    <Image
      source={icon}
      className="size-7"
      resizeMode="contain"
      tintColor={focused ? "#fe8c00" : "#5d5f6d"}
    />
    <Text
      className={cn(
        "text-sm font-bold",
        focused ? "text-primary" : "text-gray-100",
      )}
    >
      {title}
    </Text>
  </View>
);

export default function Tablayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          marginHorizontal: 20,
          height: 80,
          position: "absolute",
          bottom: 30,
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={images.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={images.search} focused={focused} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={images.bag} focused={focused} title="Cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={images.user} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
