import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/constants/theme";

import firestore from "@react-native-firebase/firestore";

const users = () => {
  const [users, setUsers] = useState([]);

  //add user in firestore

  const addUser = async () => {
    await firestore().collection("Users").add({
      name: "Ada Lovelace",
      age: 30,
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text>Create User</Text>

        <Pressable onPress={() => addUser()} style={styles.btn}>
          <Text style={styles.btnText}>Add User</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default users;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },

  btn: {
    backgroundColor: COLORS.darkerGreen,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
});
