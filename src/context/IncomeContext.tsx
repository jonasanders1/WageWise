// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { IncomeEntry, BonusEntry } from '../types/income';
// import * as storage from '../utils/storage';
// import { toast } from '@/hooks/use-toast';

// interface IncomeContextType {
//   entries: IncomeEntry[];
//   bonuses: BonusEntry[];
//   addEntry: (entry: IncomeEntry) => void;
//   updateEntry: (entry: IncomeEntry) => void;
//   deleteEntry: (id: string) => void;
//   addBonus: (bonus: BonusEntry) => void;
//   updateBonus: (bonus: BonusEntry) => void;
//   deleteBonus: (id: string) => void;
//   loading: boolean;
// }

// const IncomeContext = createContext<IncomeContextType | undefined>(undefined);

// export const IncomeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [entries, setEntries] = useState<IncomeEntry[]>([]);
//   const [bonuses, setBonuses] = useState<BonusEntry[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Load data on initial render
//   useEffect(() => {
//     try {
//       const savedEntries = storage.loadEntries();
//       const savedBonuses = storage.loadBonuses();
//       setEntries(savedEntries);
//       setBonuses(savedBonuses);
//     } catch (err) {
//       console.error('Failed to load income data:', err);
//       toast({
//         title: 'Error',
//         description: 'Failed to load your income data.',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const addEntry = (entry: IncomeEntry) => {
//     try {
//       const updatedEntries = storage.addEntry(entry);
//       setEntries(updatedEntries);
//       toast({
//         title: 'Entry Added',
//         description: 'Your income entry has been saved.',
//       });
//     } catch (err) {
//       console.error('Failed to add entry:', err);
//       toast({
//         title: 'Error',
//         description: 'Failed to save your entry.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const updateEntry = (entry: IncomeEntry) => {
//     try {
//       const updatedEntries = storage.updateEntry(entry);
//       setEntries(updatedEntries);
//       toast({
//         title: 'Entry Updated',
//         description: 'Your income entry has been updated.',
//       });
//     } catch (err) {
//       console.error('Failed to update entry:', err);
//       toast({
//         title: 'Error',
//         description: 'Failed to update your entry.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const deleteEntry = (id: string) => {
//     try {
//       const updatedEntries = storage.deleteEntry(id);
//       setEntries(updatedEntries);
//       toast({
//         title: 'Entry Deleted',
//         description: 'Your income entry has been removed.',
//       });
//     } catch (err) {
//       console.error('Failed to delete entry:', err);
//       toast({
//         title: 'Error',
//         description: 'Failed to delete your entry.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const addBonus = (bonus: BonusEntry) => {
//     try {
//       const updatedBonuses = storage.addBonus(bonus);
//       setBonuses(updatedBonuses);
//       toast({
//         title: 'Bonus Added',
//         description: 'Your bonus has been saved.',
//       });
//     } catch (err) {
//       console.error('Failed to add bonus:', err);
//       toast({
//         title: 'Error',
//         description: 'Failed to save your bonus.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const updateBonus = (bonus: BonusEntry) => {
//     try {
//       const updatedBonuses = storage.updateBonus(bonus);
//       setBonuses(updatedBonuses);
//       toast({
//         title: 'Bonus Updated',
//         description: 'Your bonus has been updated.',
//       });
//     } catch (err) {
//       console.error('Failed to update bonus:', err);
//       toast({
//         title: 'Error',
//         description: 'Failed to update your bonus.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const deleteBonus = (id: string) => {
//     try {
//       const updatedBonuses = storage.deleteBonus(id);
//       setBonuses(updatedBonuses);
//       toast({
//         title: 'Bonus Deleted',
//         description: 'Your bonus has been removed.',
//       });
//     } catch (err) {
//       console.error('Failed to delete bonus:', err);
//       toast({
//         title: 'Error',
//         description: 'Failed to delete your bonus.',
//         variant: 'destructive',
//       });
//     }
//   };

//   return (
//     <IncomeContext.Provider 
//       value={{ 
//         entries, 
//         bonuses,
//         addEntry, 
//         updateEntry, 
//         deleteEntry,
//         addBonus,
//         updateBonus,
//         deleteBonus, 
//         loading 
//       }}
//     >
//       {children}
//     </IncomeContext.Provider>
//   );
// };

// export const useIncome = (): IncomeContextType => {
//   const context = useContext(IncomeContext);
//   if (context === undefined) {
//     throw new Error('useIncome must be used within an IncomeProvider');
//   }
//   return context;
// };