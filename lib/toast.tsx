import React from "react";
import { Text, View } from "react-native";
import Toast, {
    BaseToast,
    ErrorToast,
    ToastConfig,
    ToastShowParams,
} from "react-native-toast-message";

const show = (params: ToastShowParams) => {
  Toast.show({
    position: "top",
    topOffset: 64,
    visibilityTime: 3200,
    autoHide: true,
    ...params,
  });
};

export const showError = (message: string, title = "Something went wrong") => {
  show({
    type: "error",
    text1: title,
    text2: message,
  });
};

export const showSuccess = (message: string, title = "Success") => {
  show({
    type: "success",
    text1: title,
    text2: message,
  });
};

export const toastConfig: ToastConfig = {
  success: (props) =>
    React.createElement(BaseToast, {
      ...props,
      style: {
        borderLeftColor: "#0D9488",
        borderLeftWidth: 5,
        borderRadius: 14,
        backgroundColor: "#F0FDFA",
        minHeight: 68,
      },
      contentContainerStyle: { paddingHorizontal: 12 },
      text1Style: {
        fontSize: 14,
        fontFamily: "QuickSand-SemiBold",
        color: "#0F172A",
      },
      text2Style: {
        fontSize: 13,
        fontFamily: "QuickSand-Medium",
        color: "#334155",
      },
    }),
  error: (props) =>
    React.createElement(ErrorToast, {
      ...props,
      style: {
        borderLeftColor: "#DC2626",
        borderLeftWidth: 5,
        borderRadius: 14,
        backgroundColor: "#FEF2F2",
        minHeight: 68,
      },
      contentContainerStyle: { paddingHorizontal: 12 },
      text1Style: {
        fontSize: 14,
        fontFamily: "QuickSand-SemiBold",
        color: "#7F1D1D",
      },
      text2Style: {
        fontSize: 13,
        fontFamily: "QuickSand-Medium",
        color: "#991B1B",
      },
    }),
  info: ({ text1, text2 }) =>
    React.createElement(
      View,
      {
        style: {
          width: "92%",
          borderRadius: 14,
          backgroundColor: "#EFF6FF",
          borderLeftColor: "#2563EB",
          borderLeftWidth: 5,
          minHeight: 68,
          paddingHorizontal: 14,
          justifyContent: "center",
        },
      },
      React.createElement(
        Text,
        {
          style: {
            fontSize: 14,
            fontFamily: "QuickSand-SemiBold",
            color: "#1E3A8A",
          },
        },
        text1,
      ),
      text2
        ? React.createElement(
            Text,
            {
              style: {
                marginTop: 2,
                fontSize: 13,
                fontFamily: "QuickSand-Medium",
                color: "#1D4ED8",
              },
            },
            text2,
          )
        : null,
    ),
};
