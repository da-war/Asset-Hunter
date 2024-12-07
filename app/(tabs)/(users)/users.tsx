import {
  Image,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/constants/theme";
import { router } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const users = () => {
  const { users, loading, fetchUsers } = useUserStore(); // Access the store
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers(); // This fetches the users from Firestore through the store
  }, [fetchUsers]);

  const openEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };
  return (
    <SafeAreaView style={styles.bg}>
      <Text style={styles.heading}>Users</Text>

      <View style={styles.middleContainer}>
        {loading ? (
          <Text>Loading...</Text> // Show loading text while fetching
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => fetchUsers()} // Fetch users when the user pulls down to refresh
              />
            }
          >
            {users.length === 0 ? (
              <Text>No users found</Text>
            ) : (
              users.map((user, index) => (
                <Pressable key={index} style={styles.userCard}>
                  <Image
                    source={require("@/assets/icons/user.png")}
                    style={{ width: 70, height: 70 }}
                    resizeMode="contain"
                  />
                  <View>
                    <Text style={styles.username}>{user.userName}</Text>
                    <Text
                      onPress={() => openEmail(user.email)}
                      style={styles.email}
                    >
                      {user.email}
                    </Text>
                    <Text>{user.contact}</Text>
                    <Text>{user.issuer}</Text>
                  </View>
                  <View style={styles.balanceContainer}>
                    <MaterialCommunityIcons
                      name="cash"
                      size={18}
                      color={COLORS.white}
                    />
                    <Text style={styles.balanceText}>{user.balance}</Text>
                  </View>
                </Pressable>
              ))
            )}
          </ScrollView>
        )}
      </View>

      <Pressable
        onPress={() => {
          router.push("/createUser"); // Navigate to create user screen
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
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginBottom: 20,
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
  middleContainer: {
    flex: 1,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  username: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.darkBlue,
  },
  email: {},
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: COLORS.darkBlue,
    padding: 3,
    borderRadius: 5,
  },
  balanceText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 12,
    marginLeft: 5,
  },
});
