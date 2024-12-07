import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AssetStore {
  assets: Asset[];
  loading: boolean;
  addAsset: (asset: Asset) => Promise<void>;
  removeAsset: (assetId: string) => Promise<void>;
  fetchAssets: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAssetStore = create<AssetStore>()(
  persist(
    (set) => ({
      assets: [],
      loading: false,

      // Set loading state
      setLoading: (loading: boolean) => set({ loading }),

      // Add asset
      addAsset: async (asset: Asset) => {
        set({ loading: true });
        try {
          // Add asset to Firestore
          await firestore().collection("assets").doc(asset.assetId).set(asset);
          Alert.alert("Asset Created");

          // Add asset to local state
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
          // Remove asset from Firestore
          await firestore().collection("assets").doc(assetId).delete();
          Alert.alert("Asset Deleted");

          // Remove asset from local state
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
    }),
    {
      name: "asset-store", // The name of the persisted store
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
