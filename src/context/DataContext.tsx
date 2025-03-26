import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { useAuth } from "./AuthContext";
import { IncomeEntry, BonusEntry } from "@/types/income";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc,
  doc,
  onSnapshot,
  deleteDoc
} from "firebase/firestore";
import { toast } from "sonner";

interface DataContextType {
  entries: IncomeEntry[];
  bonuses: BonusEntry[];
  addEntry: (entry: Omit<IncomeEntry, 'id'>) => Promise<void>;
  updateEntry: (id: string, entry: Partial<IncomeEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  addBonus: (bonus: Omit<BonusEntry, 'id'>) => Promise<void>;
  updateBonus: (id: string, bonus: Partial<BonusEntry>) => Promise<void>;
  deleteBonus: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [entries, setEntries] = useState<IncomeEntry[]>([]);
  const [bonuses, setBonuses] = useState<BonusEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setEntries([]);
      setBonuses([]);
      setLoading(false);
      return;
    }

    // Subscribe to income entries
    const entriesQuery = query(
      collection(db, "incomeEntries"),
      where("userId", "==", user.uid)
    );

    // Subscribe to bonus entries
    const bonusesQuery = query(
      collection(db, "bonuses"),
      where("userId", "==", user.uid)
    );

    const unsubscribeEntries = onSnapshot(entriesQuery, 
      (snapshot) => {
        const newEntries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as IncomeEntry[];
        setEntries(newEntries);
      },
      (error) => setError(error.message)
    );

    const unsubscribeBonuses = onSnapshot(bonusesQuery,
      (snapshot) => {
        const newBonuses = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BonusEntry[];
        setBonuses(newBonuses);
      },
      (error) => setError(error.message)
    );

    setLoading(false);
    return () => {
      unsubscribeEntries();
      unsubscribeBonuses();
    };
  }, [user]);

  const addEntry = async (entry: Omit<IncomeEntry, 'id'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "incomeEntries"), {
        ...entry,
        userId: user.uid,
        createdAt: new Date()
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const updateEntry = async (id: string, entry: Partial<IncomeEntry>) => {
    if (!user) return;
    try {
      const docRef = doc(db, "incomeEntries", id);
      await updateDoc(docRef, entry);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const deleteEntry = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "incomeEntries", id));
      toast.success("Entry deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error("Failed to delete entry");
      }
    }
  };

  const addBonus = async (bonus: Omit<BonusEntry, 'id'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "bonuses"), {
        ...bonus,
        userId: user.uid,
        createdAt: new Date()
      });
      toast.success("Bonus added successfully");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error("Failed to add bonus");
      }
    }
  };

  const updateBonus = async (id: string, bonus: Partial<BonusEntry>) => {
    if (!user) return;
    try {
      const docRef = doc(db, "bonuses", id);
      await updateDoc(docRef, bonus);
      toast.success("Bonus updated successfully");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error("Failed to update bonus");
      }
    }
  };

  const deleteBonus = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "bonuses", id));
      toast.success("Bonus deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error("Failed to delete bonus");
      }
    }
  };

  return (
    <DataContext.Provider value={{ 
      entries, bonuses, addEntry, updateEntry, deleteEntry,
      addBonus, updateBonus, deleteBonus, loading, error 
    }}>
      {children}
    </DataContext.Provider>
  );
}; 