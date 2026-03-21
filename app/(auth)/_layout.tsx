import { images } from "@/constants";
import { Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

export default function _layout() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="h-full bg-white"
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="relative w-full "
          style={{ height: Dimensions.get("screen").height / 2.8 }}
        >
          <ImageBackground
            source={images.loginGraphic}
            className="rounded-b-lg size-full "
            resizeMode="stretch"
          />
          <Image
            source={images.logo}
            className="absolute z-10 self-center size-40 -bottom-16 "
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
