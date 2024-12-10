import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface TransactionStore {
  transactions: Transaction[]; // Keyed by userId
  loading: boolean;
  addTransaction: (userId: string, transaction: Transaction) => Promise<void>;
  fetchTransactions: (userId: string) => Promise<void>;
  deleteTransaction: (userId: string, transactionId: string) => Promise<void>;
  cancelTransaction: (userId: string, transactionId: string) => Promise<void>;
  updateTransactionStatus: (userId: string, transactionId: string, status: 'pending' | 'completed' | 'cancelled') => Promise<void>;
    setLoading: (loading: boolean) => void;
    fetchTransactionsById: (userId: string) => Promise<void>;

}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: [],
      loading: false,

      setLoading: (loading: boolean) => set({ loading }),

      addTransaction: async (transactionId, transaction:Transaction) => {
        set({ loading: true });
        try {
            const userRef = firestore().collection('transactions').doc(transactionId);
            //add transaction to the transaction collection
            await userRef.set(transaction);
            Alert.alert('Transaction Added');

          
        } catch (err) {
          console.error('Error adding transaction:', err);
          Alert.alert('Issue in adding transaction');
          set({ loading: false });
        }
      },

      fetchTransactions: async (userId) => {
        set({ loading: true });
        try {
          const userDoc = await firestore().collection('users').doc(userId).get();
          const userData = userDoc.data();
          const userTransactions = (userData?.transactions || []) as Transaction[];

          // Sort transactions by time (latest first)
          const sortedTransactions = userTransactions.sort(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
          );

          set((state) => ({
            transactions: {
              ...state.transactions,
              [userId]: sortedTransactions,
            },
            loading: false,
          }));
        } catch (err) {
          console.error('Error fetching transactions:', err);
          Alert.alert('Issue in fetching transactions');
          set({ loading: false });
        }
          },
      fetchTransactionsById: async (userId: string) => {
  set({ loading: true });
  try {
    // Query Firestore for transactions where the userId is in transactionStakeHolders
    const transactionsSnapshot = await firestore()
      .collection('transactions')
      .where('transactionStakeHolders', 'array-contains', userId)
      .get();

    if (!transactionsSnapshot.empty) {
      // Map and format the transactions
      const transactions = transactionsSnapshot.docs.map((doc) => ({
        ...(doc.data() as Transaction),
        transactionId: doc.id, // Include transactionId explicitly
      }));

      // Update Zustand store with the fetched transactions
      set((state) => ({
        transactions: transactions,
        loading: false,
      }));
    } else {
      // No transactions found, assign an empty array
      set((state) => ({
        transactions: [],
        loading: false,
      }));
    
    }
  } catch (err) {
    console.error('Error fetching transactions:', err);
    Alert.alert('Issue in fetching transactions');
    set({ loading: false });
  }
      }
        ,   



      deleteTransaction: async (userId, transactionId) => {
        set({ loading: true });
        try {
          const userRef = firestore().collection('users').doc(userId);
          const userDoc = await userRef.get();
          const userTransactions = (userDoc.data()?.transactions || []) as Transaction[];

          const updatedTransactions = userTransactions.filter(
            (transaction) => transaction.transactionId !== transactionId
          );

          await userRef.update({ transactions: updatedTransactions });

          // Sort transactions by time after deletion
          set((state) => ({
            transactions: {
              ...state.transactions,
              [userId]: updatedTransactions.sort(
                (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
              ),
            },
            loading: false,
          }));
          Alert.alert('Transaction Deleted');
        } catch (err) {
          console.error('Error deleting transaction:', err);
          Alert.alert('Issue in deleting transaction');
          set({ loading: false });
        }
      },

      cancelTransaction: async (userId, transactionId) => {
        set({ loading: true });
        try {
          const userRef = firestore().collection('users').doc(userId);
          const userDoc = await userRef.get();
          const userTransactions = (userDoc.data()?.transactions || []) as Transaction[];

          const updatedTransactions = userTransactions.map((transaction) =>
            transaction.transactionId === transactionId
              ? { ...transaction, status: 'cancelled' }
              : transaction
          );

          await userRef.update({ transactions: updatedTransactions });

          // Sort transactions by time after cancellation
         set((state) => ({ 
  transactions: {
    ...state.transactions,
    [userId]: updatedTransactions
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()) as Transaction[], // Ensure type is Transaction[]
  },
  loading: false,
}));

          Alert.alert('Transaction Cancelled');
        } catch (err) {
          console.error('Error cancelling transaction:', err);
          Alert.alert('Issue in cancelling transaction');
          set({ loading: false });
        }
      },

      updateTransactionStatus: async (userId, transactionId, status) => {
        set({ loading: true });
        try {
          const userRef = firestore().collection('users').doc(userId);
          const userDoc = await userRef.get();
          const userTransactions = (userDoc.data()?.transactions || []) as Transaction[];

          const updatedTransactions = userTransactions.map((transaction) =>
            transaction.transactionId === transactionId
              ? { ...transaction, status }
              : transaction
          );

          await userRef.update({ transactions: updatedTransactions });

          // Sort transactions by time after status update
          set((state) => ({
            transactions: {
              ...state.transactions,
              [userId]: updatedTransactions.sort(
                (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
              ),
            },
            loading: false,
          }));
          Alert.alert('Transaction Status Updated');
        } catch (err) {
          console.error('Error updating transaction status:', err);
          Alert.alert('Issue in updating transaction status');
          set({ loading: false });
        }
      },
    }),
    {
      name: 'transaction-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
