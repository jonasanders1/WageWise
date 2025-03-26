import { createContext } from 'react';
import { Theme, ThemeColors } from '@/types/theme';

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  setTheme: (theme: Theme) => void;
  setColors: (colors: ThemeColors) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined); 