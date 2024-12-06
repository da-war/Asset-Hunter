import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/theme";
import { router } from "expo-router";

const index = () => {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/(tabs)/(users)/users");
    }, 2500);
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.text}>Loading...</Text>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    backgroundColor: COLORS.blue,
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
