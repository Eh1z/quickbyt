import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-7xl  text-primary font-quicksand-bold">
        Welcome to QuickByt!
      </Text>
    </SafeAreaView>
  );
}
