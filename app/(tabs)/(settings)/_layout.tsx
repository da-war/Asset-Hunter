import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Settinglayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="settings" />
      <Stack.Screen name="manageAssets" />
      <Stack.Screen name="adminLogin" />
    </Stack>
  );
};

export default Settinglayout;

const styles = StyleSheet.create({});
