import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/constants/theme";
import { router, useLocalSearchParams } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useAssetStore } from "@/store/assetStore";
import { useUserStore } from "@/store/userStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTransactionStore } from "@/store/transactionStore";
import { randomString } from "@/utils";

const userAssetManagement = () => {
  const { userId } = useLocalSearchParams();
  const [leftModal, setLeftModal] = useState(false);

  const { addTransaction } = useTransactionStore();

  const [user, setUser] = useState<USER | null>();

  const [selectedLeftAsset, setSelectedLeftAsset] = useState<Asset | String>(
    "Select"
  );
  const [selectedRightAsset, setSelectedRightAsset] = useState<Asset | String>(
    "Select"
  );
  const [selectedAsset, setSelectedAsset] = useState<string>("Select");

  const [assetValue, setAssetValue] = useState<string>("0");
  const [currentValueOfAsset, setCurrentValueOfAsset] = useState<number>(0);

  const {
    assets,
    singleUserAssets,
    fetchAssets,
    loading,
    fetchAssetsByUserId,
    updateAsset,
  } = useAssetStore();
  const { users, updateUser } = useUserStore();

  useEffect(() => {
    getCurrentUser();
    fetchAssetsByUserId(userId);
  }, [fetchAssets]);

  const getCurrentUser = () => {
    const user = users.find((user) => user.userId === userId);
    console.log("hello", user);
    setUser(user);
    console.log(user?.userName);
  };

  const onPressRight = () => {
    console.log("right");
    setLeftModal(true);
  };

  const onPressAsset = (asset: Asset) => {
    console.log("asset", asset);
    setSelectedRightAsset(asset);
    setSelectedAsset(asset.assetName);
    setLeftModal(false);
  };

  const handleAssetValueChange = (text: string) => {
    setAssetValue(text);
    // change to integer
    const value = parseInt(text);
    console.log(selectedRightAsset.pricePerShare);
    const valueInDollars = value * parseFloat(selectedRightAsset.pricePerShare);
    setCurrentValueOfAsset(valueInDollars);
  };

  const handleMakeTransaction = () => {
    if (currentValueOfAsset > user?.balance) {
      Alert.alert("Insufficient Balance");
      return;
    }

    if (typeof selectedRightAsset === "string") {
      Alert.alert("Please select an asset");
      return;
    }

    // Calculate the new user balance
    const newBalance = user?.balance - currentValueOfAsset;

    // Update the `holders` array
    const updatedHolders = selectedRightAsset?.holders.map((holder) =>
      holder.userId === user?.userId
        ? {
            ...holder,
            quantity: parseInt(holder.quantity) + parseInt(assetValue),
          }
        : holder
    );

    // If user is not already a holder, add them to the array
    const isHolderExisting = updatedHolders.some(
      (holder) => holder.userId === user?.userId
    );

    if (!isHolderExisting) {
      updatedHolders.push({
        userId: user?.userId,
        quantity: parseInt(assetValue),
      });
    }

    // Create the updated asset object
    const updatedAsset = {
      ...selectedRightAsset,
      holders: updatedHolders,
    };

    // Update asset in the database
    updateAsset(selectedRightAsset.assetId, updatedAsset);

    // Update the user's balance in the database
    updateUser(userId, { balance: newBalance });

    // Create a transaction
    const transactionId = randomString(20);
    const transaction = {
      transactionId,
      asset: selectedRightAsset.assetName,
      quantity: parseInt(assetValue),
      from: user?.userId,
      to: "Issuer",
      time: new Date(),
      status: "completed",
      transactionStakeHolders: [user?.userName, "admin"],
    };

    // Add the transaction to the database
    addTransaction(transactionId, transaction);

    Alert.alert("Transaction Successful");
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        {loading && <ActivityIndicator size="large" color={COLORS.white} />}
        <View style={{ flex: 1 }}>
          <Text onPress={() => router.back()} style={styles.backText}>
            Back
          </Text>
          <View style={styles.infoContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.heading}>Name:</Text>
              <Text style={styles.detail}>{user?.userName}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.heading}>Current Balance:</Text>
              <Text style={styles.detail}>${user?.balance}</Text>
            </View>
          </View>
          <View style={styles.exchangeContainer}>
            <View style={styles.assetContainer}>
              <Text style={styles.assetName}>Balance</Text>
            </View>
            <View>
              <FontAwesome name="arrow-down" size={28} color="white" />
            </View>
            <Pressable style={styles.assetContainer} onPress={onPressRight}>
              <Text style={styles.assetName}>{selectedAsset}</Text>
            </Pressable>
          </View>

          <View style={styles.mainTop}>
            <View style={styles.inner}>
              <Text style={styles.label}>{selectedAsset}</Text>
              <TextInput
                value={assetValue.toString()}
                onChangeText={(text) => handleAssetValueChange(text)}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
          </View>
          {selectedAsset !== "Select" && (
            <Text style={styles.centeredText}>
              1 Share of {selectedAsset} is equal to $
              {selectedRightAsset.pricePerShare}
            </Text>
          )}
          {selectedAsset !== "Select" && (
            <Text style={styles.centeredText}>
              {assetValue} {selectedAsset} shares is equal to $
              {currentValueOfAsset.toString()}
            </Text>
          )}
        </View>
        <Pressable onPress={() => handleMakeTransaction()} style={styles.btn}>
          <Text style={styles.btnText}>Make Transaction</Text>
        </Pressable>
      </SafeAreaView>
      <Modal animationType="slide" style={{ flex: 1 }} visible={leftModal}>
        <View
          style={{ flex: 1, backgroundColor: COLORS.lightBlue, paddingTop: 80 }}
        >
          <Text style={styles.modalHeading} onPress={() => setLeftModal(false)}>
            Close
          </Text>
          <ScrollView>
            {assets.map((asset, index) => (
              <Pressable
                onPress={() => onPressAsset(asset)}
                style={styles.picker}
                key={index}
              >
                <Text style={styles.assetTexto}>{asset.assetName}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default userAssetManagement;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  backText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.bold,
    marginLeft: 20,
  },
  infoContainer: {
    backgroundColor: COLORS.lightBlue,
    padding: 20,
    marginVertical: 15,
  },
  heading: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.darkBlue,
  },
  detail: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 10,
  },
  btn: {
    alignItems: "center",
    backgroundColor: COLORS.darkerGreen,
    borderRadius: 15,
    justifyContent: "center",
    margin: 20,
    padding: 10,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 20,
  },

  exchangeContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  assetName: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.darkBlue,
  },
  assetContainer: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightBlue,
    minWidth: 300,
    marginVertical: 10,
    borderRadius: 10,
  },
  modalHeading: {
    color: COLORS.darkBlue,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: "center",
  },
  picker: {
    backgroundColor: COLORS.darkBlue,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 2,
  },
  assetTexto: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  label: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10,
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 16,
    padding: 10,
  },
  mainTop: {
    flexDirection: "row",
  },
  inner: {
    flex: 1,
    marginHorizontal: 10,
  },
  centeredText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
