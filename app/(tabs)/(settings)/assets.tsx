import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/constants/theme";
import { router } from "expo-router";
import { useAssetStore } from "@/store/assetStore";

const assets = () => {
  const handlePress = () => {
    console.log("hello world");
    router.push("/addNewAsset");
  };

  const { assets, fetchAssets, loading } = useAssetStore();

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <SafeAreaView style={styles.mainBackground}>
      {loading && <ActivityIndicator size="large" color={COLORS.white} />}
      <Text style={styles.title}>Assets</Text>

      <View style={styles.tableHeadings}>
        <Text style={styles.heading}>Asset Name</Text>
        <Text style={styles.heading}>Total Supply</Text>
        <Text style={styles.heading}>Price Per Share</Text>
      </View>

      <ScrollView>
        {assets.map((asset) => (
          <View style={styles.assetCard} key={asset.assetId}>
            <View style={styles.cell}>
              <Text style={styles.assetName}>{asset.assetName}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.assetDetails}>{asset.totalSupply}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.assetDetails}>{asset.pricePerShare}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Pressable style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Add New Asset</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default assets;

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    backgroundColor: COLORS.darkerGreen,
    borderRadius: 15,
    padding: 8,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
  mainBackground: {
    backgroundColor: COLORS.darkBlue,
    flex: 1,
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 24,
    marginTop: 15,
    textAlign: "center",
  },
  tableHeadings: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  heading: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  assetCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  assetName: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  assetDetails: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    fontSize: 16,
    textAlign: "center",
  },
  cell: {
    flex: 1,
  },
});
