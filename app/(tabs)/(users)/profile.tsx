import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAssetStore } from "@/store/assetStore";
import { COLORS, FONTS } from "@/constants/theme";
import { useLocalSearchParams, router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const profile = () => {
  const { data } = useLocalSearchParams();
  const parsedData = JSON.parse(data);
  const userId = parsedData.userId; // Assuming userId is part of the parsed data
  const date = parsedData.date;
  const dato = new Date(date.seconds * 1000);

  const formattedDate = dato.toLocaleDateString("en-GB"); // 'en-GB' for DD/MM/YYYY format
  const formattedTime = dato.toLocaleTimeString("en-GB");

  const [isAdmin, setIsAdmin] = useState(false);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]); // State to hold filtered assets
  const { assets, fetchAssets, loading } = useAssetStore();

  const checkIsAdmin = async () => {
    const isAdmin = await AsyncStorage.getItem("isAdmin");
    setIsAdmin(!!isAdmin);
  };

  const filterAssetsByUserId = () => {
    if (!assets || assets.length === 0) return;

    const filtered = assets.filter((asset) =>
      asset.holders.some((holder) => holder.userId === userId)
    );
    setFilteredAssets(filtered);
  };

  useEffect(() => {
    checkIsAdmin();
    fetchAssets();
  }, []);

  useEffect(() => {
    filterAssetsByUserId(); // Filter assets after fetching them
  }, [assets]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text onPress={() => router.back()} style={styles.backText}>
        Back
      </Text>

      <Text style={styles.title}>User Profile</Text>
      <View style={styles.userInfo}>
        <View style={styles.horizontalContainer}>
          <Text style={styles.textHeading}>Name:</Text>
          <Text style={styles.name}>{parsedData.userName}</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text style={styles.textHeading}>Joined At:</Text>
          <Text style={styles.name}>
            {formattedDate} ----- {formattedTime}
          </Text>
        </View>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Balance</Text>
        <View style={styles.balanceCont}>
          <Text style={styles.balance}>{parsedData.balance}</Text>
        </View>
        <Pressable style={styles.editBox}>
          <MaterialCommunityIcons
            name="pencil"
            color={COLORS.white}
            size={16}
          />
        </Pressable>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.horizontal}>
          <Text style={styles.assetsTitle}>Assets</Text>
          <Pressable onPress={() => {}}>
            <MaterialCommunityIcons name="plus" size={24} color="white" />
          </Pressable>
        </View>
        {loading ? (
          <Text style={styles.loadingText}>Loading assets...</Text>
        ) : filteredAssets.length === 0 ? (
          <Text style={styles.noAssetsText}>No assets found.</Text>
        ) : (
          <FlatList
            data={filteredAssets}
            keyExtractor={(item) => item.assetId}
            renderItem={({ item }) => (
              <View style={styles.assetContainer}>
                <Text style={styles.assetName}>{item.assetName}</Text>
                <Text style={styles.assetDetail}>
                  Total Supply: {item.totalSupply}
                </Text>
                <Text style={styles.assetDetail}>
                  Price Per Share: {item.pricePerShare}
                </Text>
                <Text style={styles.assetDetail}>{item.details}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  horizontalContainer: {
    flexDirection: "row",
    gap: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  backText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 20,
    fontFamily: FONTS.medium,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontFamily: FONTS.bold,
    textAlign: "center",
  },
  userInfo: {
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 10,
  },
  textHeading: {
    color: COLORS.darkBlue,
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  name: {
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
  middleContainer: {
    marginHorizontal: 20,
  },
  assetsTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.bold,
  },
  loadingText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  noAssetsText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  assetContainer: {
    backgroundColor: COLORS.lightBlue,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  assetName: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.darkBlue,
  },
  assetDetail: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.darkBlue,
  },
  balanceTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: 18,
  },
  balanceCont: {
    padding: 5,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    marginLeft: 20,
  },
  balance: {
    color: COLORS.darkBlue,
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
  editBox: {
    backgroundColor: COLORS.darkerGreen,
  },
});
