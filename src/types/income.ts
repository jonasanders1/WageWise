export interface IncomeEntry {
  id: string;
  date: string; // ISO format: YYYY-MM-DD
  projectName: string;
  payRate: number;
  timeSpent: number; // in hours
  standardHours: number; // typically 1 hour as per requirements
  overtimeRate: number; // typically $16/hour as per requirements
  regularPay: number;
  overtimePay: number;
  totalPay: number;
}

export interface BonusEntry {
  id: string;
  date: string; // ISO format: YYYY-MM-DD
  projectName: string;
  amount: number;
  description: string;
}

export interface ProjectSummary {
  projectName: string;
  regularPay: number;
  overtimePay: number;
  bonusPay: number;
  totalPay: number;
  hoursWorked: number;
}

export interface MonthlySummary {
  month: string; // Format: YYYY-MM
  regularPay: number;
  overtimePay: number;
  bonusPay: number;
  totalPay: number;
  hoursWorked: number;
}

export interface YearlySummary {
  year: number;
  regularPay: number;
  overtimePay: number;
  bonusPay: number;
  totalPay: number;
  hoursWorked: number;
}