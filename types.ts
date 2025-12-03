export interface FinancialInputs {
  currentAge: number;
  targetAge: number;
  lifeExpectancy: number;
  currentNetWorth: number;
  monthlyContribution: number;
  inflationRate: number; // Percentage (e.g., 4.5)
  realReturnRate: number; // Percentage (e.g., 6.0)
  monthlyLivingCost: number;
  safeWithdrawalRate: number; // Percentage (e.g., 4.0)
}

export interface SimulationYear {
  year: number;
  age: number;
  startBalance: number;
  returns: number;
  contribution: number;
  withdrawal: number;
  endBalance: number;
  phase: 'Accumulation' | 'Distribution';
}

export interface FinancialKPIs {
  annualLivingCost: number;
  perpetualIncome: number;
  fireNumber: number; // Financial Independence, Retire Early number
  wealthGap: number;
  runwayYears: number | string; // Number or "Infinite"
}

export enum TabOption {
  DASHBOARD = 'DASHBOARD',
  TABLE = 'TABLE',
  EDUCATION = 'EDUCATION'
}