import { CustomInputProps } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const CustomInput = ({
  placeholder = "Enter Text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const shouldShowPasswordToggle = secureTextEntry;
  const isSecureInput = secureTextEntry && !isPasswordVisible;

  return (
    <View className="w-full mb-5">
      <Text className="label">{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecureInput}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#888"
        className={cn(
          "input",
          shouldShowPasswordToggle && "pr-12",
          isFocused ? "border-primary" : "border-gray-300",
        )}
      />
      {shouldShowPasswordToggle ? (
        <Pressable
          className="absolute right-3 top-[40px] p-1"
          onPress={() => setIsPasswordVisible((prev) => !prev)}
          accessibilityRole="button"
          accessibilityLabel={
            isPasswordVisible ? "Hide password" : "Show password"
          }
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#777"
          />
        </Pressable>
      ) : null}
    </View>
  );
};

export default CustomInput;
