import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";

import useAuthStore from "@/lib/auth.store";
import * as Sentry from "@sentry/react-native";
import "../global.css";

Sentry.init({
  dsn: "https://34b95f3e0ea87e40a25baade188de1a1@o4511083918458880.ingest.de.sentry.io/4511083954700368",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#0D9488",
        borderLeftWidth: 5,
        borderRadius: 14,
        backgroundColor: "#F0FDFA",
        minHeight: 68,
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: 14,
        fontFamily: "QuickSand-SemiBold",
        color: "#0F172A",
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: "QuickSand-Medium",
        color: "#334155",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#DC2626",
        borderLeftWidth: 5,
        borderRadius: 14,
        backgroundColor: "#FEF2F2",
        minHeight: 68,
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: 14,
        fontFamily: "QuickSand-SemiBold",
        color: "#7F1D1D",
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: "QuickSand-Medium",
        color: "#991B1B",
      }}
    />
  ),
};

export default Sentry.wrap(function RootLayout() {
  const isLoading = useAuthStore((state) => state.isLoading);
  const fetchAuthenticatedUser = useAuthStore(
    (state) => state.fetchAuthenticatedUser,
  );

  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

  if (!fontsLoaded || isLoading) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast config={toastConfig} />
    </>
  );
});
