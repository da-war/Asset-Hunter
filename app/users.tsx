import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/theme";

const users = () => {
  const [users, setUsers] = useState([]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View></View>
    </SafeAreaView>
  );
};

export default users;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },
});
