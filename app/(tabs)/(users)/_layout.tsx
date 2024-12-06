import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const UserLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="users" />
      <Stack.Screen name="createUser" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="editUser" />
      <Stack.Screen name="wallet" />
    </Stack>
  );
};

export default UserLayout;

const styles = StyleSheet.create({});