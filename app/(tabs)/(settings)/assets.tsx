import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/constants/theme";
import { router } from "expo-router";

const assets = () => {
  const handlePress = () => {
    console.log("hello world");
    router.push("/addNewAsset");
  };

  return (
    <SafeAreaView style={styles.mainBackground}>
      <Text>assets</Text>

      <Pressable style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Add New Asset</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default assets;

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    backgroundColor: COLORS.darkerGreen,
    borderRadius: 15,
    padding: 8,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
  mainBackground: {
    backgroundColor: COLORS.darkBlue,
    flex: 1,
  },
});
