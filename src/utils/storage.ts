import { IncomeEntry, BonusEntry } from '../types/income';

const STORAGE_KEY = 'wagewise-data';
const BONUS_STORAGE_KEY = 'wagewise-bonuses'; 

// Load data from localStorage
export const loadEntries = (): IncomeEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
  
  return [];
};

// Save data to localStorage
export const saveEntries = (entries: IncomeEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// Add a new entry
export const addEntry = (entry: IncomeEntry): IncomeEntry[] => {
  const entries = loadEntries();
  const updatedEntries = [...entries, entry];
  saveEntries(updatedEntries);
  return updatedEntries;
};

// Update an existing entry
export const updateEntry = (updatedEntry: IncomeEntry): IncomeEntry[] => {
  const entries = loadEntries();
  const updatedEntries = entries.map(entry => 
    entry.id === updatedEntry.id ? updatedEntry : entry
  );
  saveEntries(updatedEntries);
  return updatedEntries;
};

// Delete an entry
export const deleteEntry = (id: string): IncomeEntry[] => {
  const entries = loadEntries();
  const updatedEntries = entries.filter(entry => entry.id !== id);
  saveEntries(updatedEntries);
  return updatedEntries;
};

// Clear all data
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(BONUS_STORAGE_KEY);
};

// Bonus handling
export const loadBonuses = (): BonusEntry[] => {
  try {
    const data = localStorage.getItem(BONUS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading bonuses from localStorage:', error);
  }
  
  return [];
};

export const saveBonuses = (bonuses: BonusEntry[]): void => {
  try {
    localStorage.setItem(BONUS_STORAGE_KEY, JSON.stringify(bonuses));
  } catch (error) {
    console.error('Error saving bonuses to localStorage:', error);
  }
};

export const addBonus = (bonus: BonusEntry): BonusEntry[] => {
  const bonuses = loadBonuses();
  const updatedBonuses = [...bonuses, bonus];
  saveBonuses(updatedBonuses);
  return updatedBonuses;
};

export const updateBonus = (updatedBonus: BonusEntry): BonusEntry[] => {
  const bonuses = loadBonuses();
  const updatedBonuses = bonuses.map(bonus => 
    bonus.id === updatedBonus.id ? updatedBonus : bonus
  );
  saveBonuses(updatedBonuses);
  return updatedBonuses;
};

export const deleteBonus = (id: string): BonusEntry[] => {
  const bonuses = loadBonuses();
  const updatedBonuses = bonuses.filter(bonus => bonus.id !== id);
  saveBonuses(updatedBonuses);
  return updatedBonuses;
};