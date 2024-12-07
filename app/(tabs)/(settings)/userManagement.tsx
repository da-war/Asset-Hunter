import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useUserStore } from "@/store/userStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS } from "@/constants/theme";

const userManagement = () => {
  const { loading, removeUser, users } = useUserStore();
  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading && <Text>Loading...</Text>}
      {users.map((user) => (
        <View style={styles.userManagementCard} key={user.userId}>
          <Text>{user.userName}</Text>

          <TouchableOpacity
            onPress={() => removeUser(user.userId)}
            style={styles.deleteContainer}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default userManagement;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  userManagementCard: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteContainer: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
  },
  deleteText: {
    color: "white",
    fontFamily: FONTS.semiBold,
  },
});
