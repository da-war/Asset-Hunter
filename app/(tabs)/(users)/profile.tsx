import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Button,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAssetStore } from "@/store/assetStore";
import { COLORS, FONTS } from "@/constants/theme";
import { useLocalSearchParams, router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

const profile = () => {
  const { data } = useLocalSearchParams();
  const parsedData = JSON.parse(data);
  const userId = parsedData.userId; // Assuming userId is part of the parsed data
  const date = parsedData.date;
  const dato = new Date(date.seconds * 1000);
  const [openBalanceSheet, setOpenBalanceSheet] = useState(false);
  const balanceBottomSheet = useRef<BottomSheetModal>(null);
  const [addBalance, setAddBalance] = useState("");
  const [removeBalance, setRemoveBalance] = useState("");

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

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    balanceBottomSheet.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleEditBalance = () => {
    setOpenBalanceSheet(true);
  };

  useEffect(() => {
    checkIsAdmin();
    fetchAssets();
  }, []);

  useEffect(() => {
    filterAssetsByUserId(); // Filter assets after fetching them
  }, [assets]);

  const openBalanceBottomSheet = () => {
    balanceBottomSheet.current?.present();
  };

  const closeBalanceBottomSheet = () => {
    balanceBottomSheet.current?.dismiss();
  };

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

        <TouchableOpacity
          onPress={openBalanceBottomSheet}
          style={styles.editBox}
        >
          <MaterialCommunityIcons
            name="pencil"
            color={COLORS.white}
            size={16}
          />
        </TouchableOpacity>
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
      <BottomSheetModalProvider>
        <BottomSheetModal
          snapPoints={["25%", "50%", "90%"]}
          index={2}
          ref={balanceBottomSheet}
          onChange={handleSheetChanges}
          handleIndicatorStyle={{ backgroundColor: COLORS.darkBlue }}
          backgroundComponent={({ style }) => (
            <View style={[style, styles.header]}></View>
          )}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.transactionHeading}>Transactions</Text>
            <Text style={styles.label}>Add Balance</Text>
            <TextInput
              placeholder="Enter amount"
              keyboardType="numeric"
              style={styles.input}
              value={addBalance}
              onChangeText={(text) => setAddBalance(text)}
            />

            <Pressable style={styles.button}>
              <Text style={styles.btnText}>Add Balance</Text>
            </Pressable>
            <Text style={styles.label}>Withdraw Balance</Text>
            <TextInput
              placeholder="Enter amount"
              keyboardType="numeric"
              style={styles.input}
              value={removeBalance}
              onChangeText={(text) => setRemoveBalance(text)}
            />

            <Pressable style={styles.button}>
              <Text style={styles.btnText}>Add Balance</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
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
    padding: 5,
    borderRadius: 20,
    marginLeft: 20,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
    marginHorizontal: 20,
  },
  header: {
    backgroundColor: COLORS.lightBlue,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  transactionHeading: {
    color: COLORS.black,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: "center",
  },
  label: {
    color: COLORS.black,
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.darkBlue,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
});
