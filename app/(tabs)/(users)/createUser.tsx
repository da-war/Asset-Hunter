import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "@/constants/theme";

import { v4 as uuidv4 } from "uuid";

import firestore from "@react-native-firebase/firestore";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const createUser = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = React.useState(false);

  //add user in firestore

  const addUser = async () => {
    setLoading(true);

    // Generate a random user ID
    const userId = uuidv4();

    // Assemble the data
    const user = {
      userId: userId,
      userName: userName,
      issuer: issuer,
      contact: contact,
      email: email,
      balance: 0,
      date: new Date(),
      assets: [],
    };

    console.log("start");
    await firestore()
      .collection("users")
      .doc(userId) // Set the document ID to the random ID
      .set(user) // Use `.set` to explicitly set the document ID
      .then(() => {
        console.log("good");
        Alert.alert("User Created");
        setLoading(false); // Fix here: should be false
      })
      .catch((err) => {
        console.log("not good", err);
        Alert.alert("Issue in creating user");
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading && (
        <ActivityIndicator
          size="large"
          color={COLORS.white}
          style={{ position: "absolute", top: "50%", left: "50%" }}
        />
      )}
      <View>
        <Text style={styles.title}>Create User</Text>

        <View style={styles.middleContainer}>
          <Text style={styles.heading}>Issuer</Text>
          <TextInput
            placeholder="Issuer Name"
            style={styles.input}
            value={issuer}
            onChangeText={(text) => setIssuer(text)}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Text style={styles.heading}>User Name</Text>
          <TextInput
            placeholder="User Name"
            style={styles.input}
            value={userName}
            onChangeText={(text) => setUserName(text)}
            autoCorrect={false}
            autoCapitalize="none"
          />

          <Text style={styles.heading}>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCorrect={false}
            autoCapitalize="none"
          />

          <Text style={styles.heading}>Contact</Text>
          <TextInput
            placeholder="+123456789"
            style={styles.input}
            value={contact}
            onChangeText={(text) => setContact(text)}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        <Pressable onPress={() => addUser()} style={styles.btn}>
          <Text style={styles.btnText}>Add User</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => {
          router.back();
        }}
        style={styles.smallGoBack}
      >
        <MaterialCommunityIcons name="arrow-left" size={35} color="white" />
      </Pressable>
    </SafeAreaView>
  );
};

export default createUser;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },

  btn: {
    backgroundColor: COLORS.darkerGreen,
    padding: 8,
    margin: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 20,
  },

  heading: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h4,
  },
  middleContainer: {
    marginVertical: 30,
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    fontFamily: FONTS.medium,
  },
  title: {
    textAlign: "center",
    fontFamily: FONTS.bold,
    fontSize: SIZES.h2,
    marginTop: 25,
  },
  smallGoBack: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});
