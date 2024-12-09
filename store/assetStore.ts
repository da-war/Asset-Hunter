import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AssetStore {
  assets: Asset[];
  singleUserAssets: Asset[];
  loading: boolean;
  addAsset: (asset: Asset) => Promise<void>;
  removeAsset: (assetId: string) => Promise<void>;
  updateAsset: (
    assetId: string,
    updatedFields: Partial<Asset>
  ) => Promise<void>; // Update function

  fetchAssets: () => Promise<void>;
  fetchAssetsByUserId: (userId: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAssetStore = create<AssetStore>()(
  persist(
    (set) => ({
      assets: [],
      singleUserAssets: [],
      loading: false,

      // Set loading state
      setLoading: (loading: boolean) => set({ loading }),

      // Add asset
      addAsset: async (asset: Asset) => {
        set({ loading: true });
        try {
          await firestore().collection("assets").doc(asset.assetId).set(asset);
          set((state) => ({
            assets: [...state.assets, asset],
            loading: false,
          }));
        } catch (err) {
          console.error("Error creating asset:", err);
          Alert.alert("Issue in creating asset");
          set({ loading: false });
        }
      },

      // Remove asset
      removeAsset: async (assetId: string) => {
        set({ loading: true });
        try {
          await firestore().collection("assets").doc(assetId).delete();
          Alert.alert("Asset Deleted");
          set((state) => ({
            assets: state.assets.filter((asset) => asset.assetId !== assetId),
            loading: false,
          }));
        } catch (err) {
          console.error("Error deleting asset:", err);
          Alert.alert("Issue in deleting asset");
          set({ loading: false });
        }
      },

      // Update asset (partial or complete)
      updateAsset: async (assetId: string, updatedFields: Partial<Asset>) => {
        set({ loading: true });
        try {
          await firestore()
            .collection("assets")
            .doc(assetId)
            .update(updatedFields);
          set((state) => ({
            assets: state.assets.map((asset) =>
              asset.assetId === assetId ? { ...asset, ...updatedFields } : asset
            ),
            loading: false,
          }));
        } catch (err) {
          console.error("Error updating asset:", err);
          Alert.alert("Issue in updating asset");
          set({ loading: false });
        }
      },

      // Fetch assets from Firestore
      fetchAssets: async () => {
        set({ loading: true });
        try {
          const snapshot = await firestore().collection("assets").get();
          const fetchedAssets = snapshot.docs.map((doc) => doc.data() as Asset);
          set({ assets: fetchedAssets, loading: false });
        } catch (err) {
          console.error("Error fetching assets:", err);
          Alert.alert("Issue in fetching assets");
          set({ loading: false });
        }
      },

      // Fetch assets for a specific user
      fetchAssetsByUserId: async (userId: string) => {
        set({ loading: true });
        try {
          const snapshot = await firestore()
            .collection("assets")
            .where("holders", "array-contains", { userId }) // Query for assets containing the userId in holders
            .get();

          const fetchedAssets = snapshot.docs.map((doc) => {
            const data = doc.data() as Asset;
            return {
              assetId: data.assetId,
              assetName: data.assetName,
              holders: data.holders.filter((holder) => holder.userId === userId),
              details: data.details,
              pricePerShare: data.pricePerShare,
              totalSupply: data.totalSupply,
            };
          });

          set({ singleUserAssets: fetchedAssets, loading: false });
        } catch (err) {
          console.error("Error fetching assets by user ID:", err);
          set({ loading: false });
        }
      },
    }),
    {
      name: "asset-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
