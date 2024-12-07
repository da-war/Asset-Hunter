import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/constants/theme";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { router } from "expo-router";

const profile = () => {
  const { data } = useLocalSearchParams();

  const parsedData = JSON.parse(data);
  console.log("hkjsfhkjsahf", parsedData);

  //firebase date format
  const joinedAt = new Date(parsedData.date);
  const date = joinedAt.getDate().toString();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text onPress={() => router.back()} style={styles.backText}>
        Back
      </Text>
      <Text style={styles.title}>User Profile</Text>
      <View style={styles.userInfo}>
        <View style={styles.horizontalContainer}>
          <Text style={styles.textHeading}>Name:</Text>
          <Text style={styles.name}>{parsedData.userName}</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.textHeading}>Date:</Text>
          <Text style={styles.name}>{date}</Text>
        </View>
        <Text>{parsedData.issuer}</Text>
      </View>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: "row",
    gap: 10,
  },
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
  userInfo: {
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  textHeading: {
    color: COLORS.darkBlue,
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  name: {
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
});
