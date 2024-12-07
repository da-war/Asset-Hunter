import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Settinglayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="adminLogin" />
      <Stack.Screen name="manageAssets" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="assets" />
      <Stack.Screen name="addNewAsset" />
      <Stack.Screen name="userManagement" />
    </Stack>
  );
};

export default Settinglayout;

const styles = StyleSheet.create({});
