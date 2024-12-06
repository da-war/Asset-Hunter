import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Stack } from "expo-router";

import { useFonts } from "expo-font";

const RootLayout = () => {
  const [loaded] = useFonts({
    "PixelifySans-Bold": require("../assets/fonts/PixelifySans-Bold.ttf"),
    "PixelifySans-SemiBold": require("../assets/fonts/PixelifySans-SemiBold.ttf"),
    "PixelifySans-Medium": require("../assets/fonts/PixelifySans-Medium.ttf"),
    "PixelifySans-Regular": require("../assets/fonts/PixelifySans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default RootLayout;
