import React from 'react';
import { IncomeProvider } from '@/context/IncomeContext';
import { ThemeProvider } from '@/context/ThemeProvider';
import Dashboard from './Dashboard';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <ThemeProvider>
        <IncomeProvider>
          <Dashboard />
        </IncomeProvider>
      </ThemeProvider>
    </div>
  );
};

export default Index;