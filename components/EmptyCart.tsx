import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";

const EmptyCart = () => {
  const router = useRouter();
  return (
    <View className="items-center justify-center flex-1 px-6 mt-32">
      {/* Illustration / Icon */}
      <View className="items-center justify-center w-40 h-40 mb-6 bg-orange-100 rounded-full">
        <Text className="text-7xl">🍔</Text>
      </View>

      {/* Title */}
      <Text className="mb-2 text-xl font-bold text-gray-900">
        Your cart is empty
      </Text>

      {/* Subtitle */}
      <Text className="mb-6 leading-5 text-center text-gray-500">
        Looks like you haven’t added anything yet. Start exploring delicious
        meals and get them delivered fast.
      </Text>

      {/* CTA Button */}
      <TouchableOpacity
        className="px-6 py-3 rounded-full bg-primary"
        onPress={() => router.push("/(tabs)/search")}
      >
        <Text className="text-sm font-semibold text-white">Browse Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCart;
