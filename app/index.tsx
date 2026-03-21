import { router } from "expo-router";
import React from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomePage = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-4">
      <Text className="h1-bold text-primary">WelcomePage</Text>
      <Button title="Sign Up" onPress={() => router.push("/sign-up")} />
      <Button title="Sign In" onPress={() => router.push("/sign-in")} />
    </SafeAreaView>
  );
};

export default WelcomePage;
