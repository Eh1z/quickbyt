import useAuthStore from "@/lib/auth.store";
import { Redirect } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

export default function Tablayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <Icon sf="magnifyingglass" drawable="custom_search_drawable" />
        <Label>Search</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="cart">
        <Icon sf="cart" drawable="custom_cart_drawable" />
        <Label>Cart</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon sf="person" drawable="custom_profile_drawable" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
