import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.darkBlue,
        },
      }}
    >
      <Tabs.Screen
        name="(users)"
        options={{
          title: "Users",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={focused ? COLORS.white : COLORS.lightBlue}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cog"
              size={24}
              color={focused ? COLORS.white : COLORS.lightBlue}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
