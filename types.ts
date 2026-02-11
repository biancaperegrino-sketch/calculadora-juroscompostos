
export interface CalculationInputs {
  initialAmount: number;
  monthlyContribution: number;
  annualInterestRate: number;
  period: number;
  periodType: 'years' | 'months';
}

export interface ProjectionPoint {
  month: number;
  totalAmount: number;
  totalInvested: number;
  totalInterest: number;
  label: string;
}

export interface CalculationResults {
  finalAmount: number;
  totalInvested: number;
  totalInterest: number;
  projection: ProjectionPoint[];
}

export interface AIInsight {
  summary: string;
  advice: string;
  comparison: string;
}
