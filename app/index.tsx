import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "@/constants/theme";
import { router } from "expo-router";

const index = () => {
  const [userName, setUserName] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");

  const handleLogin = () => {
    console.log("userName", userName);
    console.log("pinCode", pinCode);
    Alert.alert("Login", "Login Successful");
    router.push("/users");
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
          placeholder="Email"
          style={styles.input}
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />

        <Text style={styles.heading}>PinCode</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={pinCode}
          onChangeText={(text) => setPinCode(text)}
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
  heading: {},
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
  },
});
