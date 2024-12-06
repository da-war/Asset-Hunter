import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/constants/theme";
import { router } from "expo-router";
import useUserStore from "@/store/userStore"; // Import the store

const Users = () => {
  const { users, loading, fetchUsers } = useUserStore(); // Access the store
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers(); // This fetches the users from Firestore through the store
  }, [fetchUsers]);

  return (
    <SafeAreaView style={styles.bg}>
      <Text style={styles.heading}>Users</Text>

      {loading ? (
        <Text>Loading...</Text> // Show loading text while fetching
      ) : (
        <View>
          {users.length === 0 ? (
            <Text>No users found</Text>
          ) : (
            users.map((user, index) => (
              <View key={index} style={styles.userCard}>
                <Text>{user.userName}</Text>
                <Text>{user.email}</Text>
                <Text>{user.contact}</Text>
                <Text>{user.issuer}</Text>
              </View>
            ))
          )}
        </View>
      )}

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

export default Users;

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
  userCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
