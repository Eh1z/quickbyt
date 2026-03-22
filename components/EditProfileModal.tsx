import { updateUserProfile } from "@/lib/appwrite";
import { UpdateUserProfileParams, User } from "@/type";
import React, { useState } from "react";
import { Modal, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  user: User;
  onProfileUpdated: (user: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  user,
  onProfileUpdated,
}) => {
  const [form, setForm] = useState<UpdateUserProfileParams>({
    name: user.name || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    address1: user.address1 || "",
    address2: user.address2 || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    field: keyof UpdateUserProfileParams,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Basic validation
    if (!form.name.trim()) {
      Toast.show({ type: "error", text1: "Name is required" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      Toast.show({ type: "error", text1: "Invalid email address" });
      return;
    }
    if (form.phoneNumber && !/^\+?[0-9\-\s]{7,15}$/.test(form.phoneNumber)) {
      Toast.show({ type: "error", text1: "Invalid phone number" });
      return;
    }
    setLoading(true);
    try {
      const updated = await updateUserProfile(form);
      Toast.show({ type: "success", text1: "Profile updated" });
      onProfileUpdated({ ...user, ...updated });
      onClose();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: error?.message || "Unable to update profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="items-center justify-center flex-1 bg-black/40">
        <View className="w-11/12 p-6 bg-white rounded-2xl">
          <Text className="mb-4 h3-bold text-dark-100">Edit Profile</Text>
          <CustomInput
            label="Full Name"
            value={form.name}
            onChangeText={(v) => handleChange("name", v)}
            placeholder="Full Name"
            className="mb-2"
          />
          <CustomInput
            label="Email"
            value={form.email}
            onChangeText={(v) => handleChange("email", v)}
            placeholder="Email"
            keyboardType="email-address"
            className="mb-2"
          />
          <CustomInput
            label="Phone Number"
            value={form.phoneNumber}
            onChangeText={(v) => handleChange("phoneNumber", v)}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            className="mb-2"
          />
          <CustomInput
            label="Address 1"
            value={form.address1}
            onChangeText={(v) => handleChange("address1", v)}
            placeholder="Address 1"
            className="mb-2"
          />
          <CustomInput
            label="Address 2"
            value={form.address2}
            onChangeText={(v) => handleChange("address2", v)}
            placeholder="Address 2"
            className="mb-4"
          />
          <View className="flex gap-3 mt-2">
            <CustomButton
              title="Cancel"
              style="bg-gray-200"
              textStyle="text-dark-100"
              onPress={onClose}
            />
            <CustomButton
              title="Save"
              isLoading={loading}
              onPress={handleSave}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;
