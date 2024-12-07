import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  userId: string;
  userName: string;
  issuer: string;
  contact: string;
  email: string;
  balance: number;
  date: Date;
  assets: any[];
}

interface UserStore {
  users: User[];
  loading: boolean;
  addUser: (user: User) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  updateUser: (userId: string, updatedFields: Partial<User>) => Promise<void>; // Update function
  fetchUsers: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}



export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      loading: false,

      // Set loading state
      setLoading: (loading: boolean) => set({ loading }),

      // Add user
      addUser: async (user: User) => {
        set({ loading: true });
        try {
          await firestore().collection('users').doc(user.userId).set(user);
          Alert.alert('User Created');
          set((state) => ({
            users: [...state.users, user],
            loading: false,
          }));
        } catch (err) {
          console.error('Error creating user:', err);
          Alert.alert('Issue in creating user');
          set({ loading: false });
        }
      },

      // Remove user
      removeUser: async (userId: string) => {
        set({ loading: true });
        try {
          await firestore().collection('users').doc(userId).delete();
          Alert.alert('User Deleted');
          set((state) => ({
            users: state.users.filter((user) => user.userId !== userId),
            loading: false,
          }));
        } catch (err) {
          console.error('Error deleting user:', err);
          Alert.alert('Issue in deleting user');
          set({ loading: false });
        }
      },

      // Update user (partial or complete)
      updateUser: async (userId: string, updatedFields: Partial<User>) => {
        set({ loading: true });
        try {
          await firestore().collection('users').doc(userId).update(updatedFields);
          set((state) => ({
            users: state.users.map((user) =>
              user.userId === userId ? { ...user, ...updatedFields } : user
            ),
            loading: false,
          }));
          Alert.alert('User Updated');
        } catch (err) {
          console.error('Error updating user:', err);
          Alert.alert('Issue in updating user');
          set({ loading: false });
        }
      },

      // Fetch users from Firestore
      fetchUsers: async () => {
        set({ loading: true });
        try {
          const snapshot = await firestore().collection('users').get();
          const fetchedUsers = snapshot.docs.map((doc) => doc.data() as User);
          set({ users: fetchedUsers, loading: false });
        } catch (err) {
          console.error('Error fetching users:', err);
          Alert.alert('Issue in fetching users');
          set({ loading: false });
        }
      },
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
