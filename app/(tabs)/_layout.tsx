import useAuthStore from "@/lib/auth.store";
import { Redirect, Tabs } from "expo-router";
// import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

export default function Tablayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href={"/sign-in"} />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
        }}
      />
    </Tabs>
  );
}

// <NativeTabs>
//       <NativeTabs.Trigger name="index">
//         <Label>Home</Label>
//         <Icon sf="house.fill" drawable="custom_android_drawable" />
//       </NativeTabs.Trigger>
//       <NativeTabs.Trigger name="settings">
//         <Icon sf="gear" drawable="custom_settings_drawable" />
//         <Label>Settings</Label>
//       </NativeTabs.Trigger>
//     </NativeTabs>
