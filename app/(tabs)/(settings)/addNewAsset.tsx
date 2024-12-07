import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/constants/theme";
import { useAssetStore } from "@/store/assetStore";
import { randomString } from "@/utils";

const addNewAsset = () => {
  const [assetName, setAssetName] = useState("");
  const [totalSupply, setTotalSupply] = useState<string>("");
  const [pricePerShare, setPricePerShare] = useState<string>("");
  const [details, setDetails] = useState("");

  const handleCreateAsset = () => {
    const { loading, addAsset } = useAssetStore();
    const assetId = randomString(20);
    const asset = {
      assetId,
      assetName,
      totalSupply,
      pricePerShare,
      details,
      holders: [],
    };
    console.log(asset);
    addAsset(asset);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading && <ActivityIndicator size="large" color={COLORS.white} />}
      <Text style={styles.title}>Add New Asset</Text>
      <View style={styles.middleContainer}>
        <Text style={styles.label}>Asset Name</Text>
        <TextInput
          style={styles.input}
          value={assetName}
          onChangeText={(text) => setAssetName(text)}
          placeholder="Enter asset name"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.label}>Total Supply</Text>
        <TextInput
          style={styles.input}
          value={totalSupply}
          onChangeText={(text) => setTotalSupply(text)}
          placeholder="Enter asset name"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.label}>Price Per Share</Text>
        <TextInput
          style={styles.input}
          value={pricePerShare}
          onChangeText={(text) => setPricePerShare(text)}
          placeholder="Enter asset name"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.label}>Details</Text>
        <TextInput
          style={styles.input}
          value={details}
          onChangeText={(text) => setDetails(text)}
          placeholder="Enter asset name"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Pressable onPress={() => handleCreateAsset()} style={styles.btn}>
          <Text style={styles.btnText}>Add Asset</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default addNewAsset;

const styles = StyleSheet.create({
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

  middleContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  input: {
    backgroundColor: COLORS.lightBlue,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    color: COLORS.black,
    fontFamily: FONTS.regular,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: COLORS.darkerGreen,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
});
