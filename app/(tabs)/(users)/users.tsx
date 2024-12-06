import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/constants/theme";
import { router } from "expo-router";

import firestore from "@react-native-firebase/firestore";

const users = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  //get users from the firestore in react native functions

  function onResult(QuerySnapshot: any) {
    console.log("Got Users collection result.");
  }

  function onError(error: any) {
    console.error(error);
  }

  // firestore().collection("Users").onSnapshot(onResult, onError);
  const getUsers = async () => {
    setLoading(true);
    const users = [];
    await firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
      });
    console.log("users", users);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView style={styles.bg}>
      <Text>users</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          {users.map((user: any, index: number) => (
            <View key={index}>
              <Text>{user.userName}</Text>
              <Text>{user.email}</Text>
              <Text>{user.contact}</Text>
              <Text>{user.issuer}</Text>
            </View>
          ))}
        </View>
      )}

      <Pressable
        onPress={() => {
          router.push("/createUser");
        }}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Create User</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default users;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: COLORS.blue,
    flex: 1,
  },
  btn: {
    alignItems: "center",
    backgroundColor: COLORS.darkerGreen,
    borderRadius: 15,
    justifyContent: "center",
    margin: 20,
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
});
