import { FinancialInputs, SimulationYear, FinancialKPIs } from '../types';

export const calculateKPIs = (inputs: FinancialInputs): FinancialKPIs => {
  const { monthlyLivingCost, safeWithdrawalRate, currentNetWorth } = inputs;

  const annualLivingCost = monthlyLivingCost * 12;
  
  // Rule of thumb: Annual Cost / Withdrawal Rate (e.g. 40,000 / 0.04 = 1,000,000)
  const fireNumber = safeWithdrawalRate > 0 ? annualLivingCost / (safeWithdrawalRate / 100) : 0;
  
  const wealthGap = Math.max(0, fireNumber - currentNetWorth);
  
  // Perpetual Income based on current net worth (assuming safe withdrawal rate)
  const perpetualIncome = (currentNetWorth * (safeWithdrawalRate / 100)) / 12;

  // Simple runway calculation (static, just based on cash burn vs current net worth, strictly speaking)
  // However, a better runway considers growth. For this KPI, we'll keep it simple: 
  // "If you stopped earning today, how long would it last assuming 0% real return?"
  // Or better, simple math: Net Worth / Annual Cost. 
  const runwayYears = annualLivingCost > 0 ? (currentNetWorth / annualLivingCost).toFixed(1) : "Infinito";

  return {
    annualLivingCost,
    perpetualIncome,
    fireNumber,
    wealthGap,
    runwayYears
  };
};

export const runSimulation = (inputs: FinancialInputs): SimulationYear[] => {
  const {
    currentAge,
    targetAge,
    lifeExpectancy,
    currentNetWorth,
    monthlyContribution,
    realReturnRate,
    monthlyLivingCost
  } = inputs;

  const data: SimulationYear[] = [];
  let balance = currentNetWorth;
  const annualContribution = monthlyContribution * 12;
  const annualExpenses = monthlyLivingCost * 12;
  const realRate = realReturnRate / 100;

  const currentYear = new Date().getFullYear();

  for (let age = currentAge; age <= lifeExpectancy; age++) {
    const isAccumulation = age < targetAge;
    const yearIndex = age - currentAge;
    const year = currentYear + yearIndex;
    const startBalance = balance;
    
    let contribution = 0;
    let withdrawal = 0;
    
    // Calculate returns based on start balance
    // Note: We are doing a simplified annual step.
    const returns = startBalance * realRate;

    if (isAccumulation) {
      contribution = annualContribution;
      // In accumulation, we add returns + contribution
      balance = startBalance + returns + contribution;
    } else {
      withdrawal = annualExpenses;
      // In distribution, we add returns - withdrawals
      // We assume withdrawals happen throughout the year, but for simple modeling,
      // we often subtract at start or end. Let's subtract at end to be optimistic, 
      // or simplistic: (Balance + Returns) - Withdrawal
      balance = startBalance + returns - withdrawal;
    }

    // Prevent negative balance for cleaner charts, or allow it to show ruin?
    // Let's allow negative to show "Run out of money" clearly, but maybe floor at a certain debt for visualization.
    
    data.push({
      year,
      age,
      startBalance,
      returns,
      contribution,
      withdrawal,
      endBalance: balance,
      phase: isAccumulation ? 'Accumulation' : 'Distribution'
    });

    if (balance < 0 && age > targetAge + 5) {
      // optimization: stop simulation if broke for a long time to save rendering checks, 
      // but strictly following lifeExpectancy is better for the table.
    }
  }

  return data;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
};

export const calculateNominalReturn = (realRate: number, inflationRate: number): number => {
  // Fisher Equation: (1 + n) = (1 + r) * (1 + i)
  // n = (1+r)(1+i) - 1
  const r = realRate / 100;
  const i = inflationRate / 100;
  const nominal = ((1 + r) * (1 + i)) - 1;
  return nominal * 100;
};