import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [userName, setUserName] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");

  useEffect(() => {
    AsyncStorage.getItem("isAdmin").then((value) => {
      if (value === "true") {
        router.replace("/settings");
      }
    });
  }, []);

  const handleLogin = async () => {
    if (userName === "" || pinCode === "") {
      Alert.alert("Credentials Missing", "Please enter correct credentials");
      return;
    }
    if (userName.toLocaleLowerCase() === "admin" && pinCode === "4575") {
      Alert.alert("Login Success", "You are now logged in as Admin");
      await AsyncStorage.setItem("isAdmin", "true");
      router.replace("/settings");
    } else {
      Alert.alert("Invalid Credentials", "Please enter correct credentials");
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require("@/assets/images/asset.png")}
        />
        <Text style={styles.adminLoginText}>Admin Login</Text>
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.heading}>User Name</Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={userName}
          onChangeText={(text) => setUserName(text)}
          autoCorrect={false}
          autoCapitalize="none"
        />

        <Text style={styles.heading}>PinCode</Text>
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={pinCode}
          onChangeText={(text) => setPinCode(text)}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      <Pressable onPress={() => handleLogin()} style={styles.btn}>
        <Text style={styles.loginText}>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  logo: {
    width: "100%",
    height: 200,
  },
  adminLoginText: {
    textAlign: "center",
    fontFamily: FONTS.bold,
    fontSize: SIZES.h2,
  },
  heading: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.h4,
  },
  pinCode: {},
  btn: {
    backgroundColor: COLORS.darkerGreen,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  loginText: {
    color: COLORS.white,
    textAlign: "center",
    justifyContent: "center",
    fontFamily: FONTS.bold,
    fontSize: SIZES.h3,
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
});
