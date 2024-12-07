import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/constants/theme";
import { router } from "expo-router";

const settings = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>Admin Settings</Text>

      <View style={styles.cardsContainer}>
        <SettingCard
          title="Asset Management"
          description="Manage assets and their details"
          onPress={() => router.push("/assets")}
        />
        <SettingCard
          title="App Settings"
          description="Manage app settings and configurations"
        />
        <SettingCard
          title="Billing"
          description="Manage billing and subscription"
        />
        <SettingCard
          title="Logs"
          description="View logs and activity history"
        />
      </View>
    </SafeAreaView>
  );
};

interface SettingCardProps {
  title: string;
  description: string;
  onPress?: () => void;
}
const SettingCard: React.FC<SettingCardProps> = ({
  title = "title",
  description = "description",
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </Pressable>
  );
};

export default settings;

const styles = StyleSheet.create({
  cardsContainer: {
    marginVertical: 20,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginTop: 15,
  },
  card: {
    backgroundColor: COLORS.lightBlue,
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  cardTitle: {
    color: COLORS.darkBlue,
    fontFamily: FONTS.bold,
    fontSize: 22,
    textAlign: "center",
  },
  cardDescription: {
    color: COLORS.darkBlue,
    fontFamily: FONTS.medium,
    fontSize: 16,
    textAlign: "center",
  },
});
