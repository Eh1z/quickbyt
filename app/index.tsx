import { useAuthStore } from "@/store";
import { Redirect, router } from "expo-router";
import React from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomePage = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href={"/(tabs)"} />;
  }
  return (
    <SafeAreaView className="items-center justify-center flex-1 gap-4">
      <Text className="h1-bold text-primary">WelcomePage</Text>
      <Button title="Sign Up" onPress={() => router.push("/sign-up")} />
      <Button title="Sign In" onPress={() => router.push("/sign-in")} />
    </SafeAreaView>
  );
};

export default WelcomePage;
