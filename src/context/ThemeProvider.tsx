import React, { useState, useEffect } from 'react';
import { Theme, ThemeColors, defaultColors } from '@/types/theme';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('system');
  const [colors, setColors] = useState<ThemeColors>(defaultColors);

  useEffect(() => {
    const savedTheme = localStorage.getItem('wagewise-theme');
    const savedColors = localStorage.getItem('wagewise-colors');

    if (savedTheme) {
      setTheme(savedTheme as Theme);
    }
    if (savedColors) {
      setColors(JSON.parse(savedColors));
    }
  }, []);

  // This is for the theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // This is for the system theme
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('wagewise-theme', newTheme);
  };

  const updateColors = (newColors: ThemeColors) => {
    setColors(newColors);
    localStorage.setItem('wagewise-colors', JSON.stringify(newColors));
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        colors, 
        setTheme: updateTheme, 
        setColors: updateColors 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}; 