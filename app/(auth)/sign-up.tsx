import { CustomButton, CustomInput } from "@/components";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submit = async () => {
    const { name, email, password, confirmPassword } = form;

    if (!name.trim() || !email.trim() || !password || !confirmPassword)
      return Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Please fill in all required fields.",
      });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return Toast.show({
        type: "error",
        text1: "Invalid email",
        text2: "Please enter a valid email address.",
      });
    }

    if (password.length < 8) {
      return Toast.show({
        type: "error",
        text1: "Weak password",
        text2: "Password must be at least 8 characters long.",
      });
    }

    if (password !== confirmPassword) {
      return Toast.show({
        type: "error",
        text1: "Password mismatch",
        text2: "Passwords do not match.",
      });
    }

    setIsSubmitting(true);

    try {
      await createUser({ email: email.trim(), password, name: name.trim() });

      router.replace("/");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Sign up failed",
        text2: error?.message || "Unable to create your account right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 p-5 mt-5 bg-white rounded-lg">
      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Full name"
      />
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />
      <CustomInput
        placeholder="Confirm your password"
        value={form.confirmPassword}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, confirmPassword: text }))
        }
        label="Confirm Password"
        secureTextEntry={true}
      />

      <CustomButton title="Sign Up" isLoading={isSubmitting} onPress={submit} />

      <View className="flex flex-row justify-center gap-2 mt-5">
        <Text className="text-gray-100 base-regular">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
