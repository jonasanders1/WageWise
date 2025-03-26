export type Theme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  regularPay: string;
  overtimePay: string;
  bonusPay: string;
  hoursWorked: string;
}

export const defaultColors: ThemeColors = {
  regularPay: '#10b981',  // emerald-500
  overtimePay: '#f59e0b', // amber-500 
  bonusPay: '#ec4899',    // pink-500
  hoursWorked: '#6366f1', // indigo-500
};