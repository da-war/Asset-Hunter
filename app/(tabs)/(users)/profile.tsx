import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/constants/theme";
import { useSearchParams } from "expo-router/build/hooks";

const profile = () => {
  const hello = useSearchParams();
  console.log(hello);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.backText}>Back</Text>
      <Text style={styles.title}>User Profile</Text>
      <View>
        <Text></Text>
      </View>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  backText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 20,
    fontFamily: FONTS.medium,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontFamily: FONTS.bold,
    textAlign: "center",
  },
});
