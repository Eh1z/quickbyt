import { CustomButton, CustomHeader, EditProfileModal } from "@/components";

import { images } from "@/constants";
import { logout } from "@/lib/appwrite";
import { useAuthStore } from "@/store";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Placeholder for address fields (not in User type, so hardcoded for now)
  const address1 = user?.address1 || "123 Main St, Springfield";
  const address2 = user?.address2 || "Apt 4B, NY 10001";

  return (
    <SafeAreaView className="flex-1 px-5 bg-white">
      <CustomHeader title="Profile" />

      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={() => (
          <View>
            <View className="items-center mt-8 mb-6">
              <View className="profile-avatar">
                <Image
                  source={user?.avatar ? { uri: user.avatar } : images.avatar}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="mt-4 h1-bold text-dark-100">
                {user?.name || "Full Name"}
              </Text>
              <Text className="text-gray-200 body-medium">
                {user?.email || "email@example.com"}
              </Text>
            </View>

            <View className="mb-8">
              <View className="profile-field">
                <View className="profile-field__icon">
                  <Image
                    source={images.phone}
                    className="size-6"
                    resizeMode="contain"
                  />
                </View>
                <Text className="base-regular text-dark-100">
                  {user?.phoneNumber || "+1 234 567 8901"}
                </Text>
              </View>
              <View className="profile-field">
                <View className="profile-field__icon">
                  <Image
                    source={images.location}
                    className="size-6"
                    resizeMode="contain"
                  />
                </View>
                <Text className="base-regular text-dark-100">{address1}</Text>
              </View>
              <View className="profile-field">
                <View className="profile-field__icon">
                  <Image
                    source={images.location}
                    className="size-6"
                    resizeMode="contain"
                  />
                </View>
                <Text className="base-regular text-dark-100">{address2}</Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="gap-4 mt-auto mb-10">
            <CustomButton
              title="Edit Profile"
              leftIcon={
                <Image
                  source={images.pencil}
                  className="mr-2 size-5"
                  resizeMode="contain"
                />
              }
              onPress={() => setEditModalVisible(true)}
            />
            {user && (
              <EditProfileModal
                visible={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                user={user}
                onProfileUpdated={(updatedUser) => setUser(updatedUser)}
              />
            )}
            <CustomButton
              title="Logout"
              style="bg-dark-100"
              leftIcon={
                <Image
                  source={images.logout}
                  className="mr-2 size-5"
                  resizeMode="contain"
                />
              }
              onPress={async () => {
                try {
                  await logout();
                  useAuthStore.getState().setIsAuthenticated(false);
                  useAuthStore.getState().setUser(null);
                  Toast.show({ type: "success", text1: "Logged out" });
                  router.navigate("/");
                } catch (error) {
                  Toast.show({
                    type: "error",
                    text1: "Logout failed",
                    text2: "Unable to logout.",
                  });
                }
              }}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
