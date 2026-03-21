import { CustomButtonProps } from "@/type";
import React from "react";
import { Text, View } from "react-native";

const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  leftIcon,
  textStyle,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <View>
      <Text>CustomButton</Text>
    </View>
  );
};

export default CustomButton;
