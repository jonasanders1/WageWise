import { IncomeEntry, BonusEntry, ProjectSummary, MonthlySummary, YearlySummary } from '../types/income';

// Calculate payment details based on time spent and rates
export const calculatePayment = (
  timeSpent: number,
  standardHours: number,
  payRate: number,
  overtimeRate: number
): { regularPay: number; overtimePay: number; totalPay: number } => {
  const regularHours = Math.min(timeSpent, standardHours);
  const overtimeHours = Math.max(0, timeSpent - standardHours);
  
  const regularPay = regularHours * payRate;
  const overtimePay = overtimeHours * overtimeRate;
  const totalPay = regularPay + overtimePay;

  return {
    regularPay,
    overtimePay,
    totalPay
  };
};

// Get totals by project
export const getProjectSummaries = (entries: IncomeEntry[], bonuses: BonusEntry[]): ProjectSummary[] => {
  const projectMap = new Map<string, ProjectSummary>();

  // Process regular entries
  entries.forEach(entry => {
    const current = projectMap.get(entry.projectName) || {
      projectName: entry.projectName,
      regularPay: 0,
      overtimePay: 0,
      bonusPay: 0,
      totalPay: 0,
      hoursWorked: 0
    };

    projectMap.set(entry.projectName, {
      ...current,
      regularPay: current.regularPay + entry.regularPay,
      overtimePay: current.overtimePay + entry.overtimePay,
      totalPay: current.totalPay + entry.totalPay,
      hoursWorked: current.hoursWorked + entry.timeSpent
    });
  });

  // Process bonuses
  bonuses.forEach(bonus => {
    const current = projectMap.get(bonus.projectName) || {
      projectName: bonus.projectName,
      regularPay: 0,
      overtimePay: 0,
      bonusPay: 0,
      totalPay: 0,
      hoursWorked: 0
    };

    projectMap.set(bonus.projectName, {
      ...current,
      bonusPay: current.bonusPay + bonus.amount,
      totalPay: current.totalPay + bonus.amount
    });
  });

  return Array.from(projectMap.values());
};

// Get monthly summaries
export const getMonthlySummaries = (entries: IncomeEntry[], bonuses: BonusEntry[]): MonthlySummary[] => {
  const monthMap = new Map<string, MonthlySummary>();

  // Process regular entries
  entries.forEach(entry => {
    const month = entry.date.substring(0, 7); // Get YYYY-MM format
    const current = monthMap.get(month) || {
      month,
      regularPay: 0,
      overtimePay: 0,
      bonusPay: 0,
      totalPay: 0,
      hoursWorked: 0
    };

    monthMap.set(month, {
      ...current,
      regularPay: current.regularPay + entry.regularPay,
      overtimePay: current.overtimePay + entry.overtimePay,
      totalPay: current.totalPay + entry.totalPay,
      hoursWorked: current.hoursWorked + entry.timeSpent
    });
  });

  // Process bonuses
  bonuses.forEach(bonus => {
    const month = bonus.date.substring(0, 7); // Get YYYY-MM format
    const current = monthMap.get(month) || {
      month,
      regularPay: 0,
      overtimePay: 0,
      bonusPay: 0,
      totalPay: 0,
      hoursWorked: 0
    };

    monthMap.set(month, {
      ...current,
      bonusPay: current.bonusPay + bonus.amount,
      totalPay: current.totalPay + bonus.amount
    });
  });

  // Sort by month (most recent first)
  return Array.from(monthMap.values()).sort((a, b) => b.month.localeCompare(a.month));
};

// Get yearly summaries
export const getYearlySummaries = (entries: IncomeEntry[], bonuses: BonusEntry[]): YearlySummary[] => {
  const yearMap = new Map<number, YearlySummary>();

  // Process regular entries
  entries.forEach(entry => {
    const year = parseInt(entry.date.substring(0, 4));
    const current = yearMap.get(year) || {
      year,
      regularPay: 0,
      overtimePay: 0,
      bonusPay: 0,
      totalPay: 0,
      hoursWorked: 0
    };

    yearMap.set(year, {
      ...current,
      regularPay: current.regularPay + entry.regularPay,
      overtimePay: current.overtimePay + entry.overtimePay,
      totalPay: current.totalPay + entry.totalPay,
      hoursWorked: current.hoursWorked + entry.timeSpent
    });
  });

  // Process bonuses
  bonuses.forEach(bonus => {
    const year = parseInt(bonus.date.substring(0, 4));
    const current = yearMap.get(year) || {
      year,
      regularPay: 0,
      overtimePay: 0,
      bonusPay: 0,
      totalPay: 0,
      hoursWorked: 0
    };

    yearMap.set(year, {
      ...current,
      bonusPay: current.bonusPay + bonus.amount,
      totalPay: current.totalPay + bonus.amount
    });
  });

  // Sort by year (most recent first)
  return Array.from(yearMap.values()).sort((a, b) => b.year - a.year);
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format hours
export const formatHours = (hours: number): string => {
  return `${hours.toFixed(1)}h`;
};

// Get month name from YYYY-MM format
export const getMonthName = (month: string): string => {
  const date = new Date(month + '-01');
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

// Get current month in YYYY-MM format
export const getCurrentMonth = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

// Get total income stats
export const getTotalStats = (entries: IncomeEntry[], bonuses: BonusEntry[]) => {
  const entriesTotal = entries.reduce(
    (acc, entry) => {
      return {
        regularPay: acc.regularPay + entry.regularPay,
        overtimePay: acc.overtimePay + entry.overtimePay,
        totalPay: acc.totalPay + entry.totalPay,
        hoursWorked: acc.hoursWorked + entry.timeSpent,
      };
    },
    { regularPay: 0, overtimePay: 0, totalPay: 0, hoursWorked: 0 }
  );

  const bonusesTotal = bonuses.reduce(
    (acc, bonus) => acc + bonus.amount, 
    0
  );

  return {
    regularPay: entriesTotal.regularPay,
    overtimePay: entriesTotal.overtimePay,
    bonusPay: bonusesTotal,
    totalPay: entriesTotal.totalPay + bonusesTotal,
    hoursWorked: entriesTotal.hoursWorked
  };
};