
import React from 'react';
import { CalculationResults } from '../types';

interface ResultsSummaryProps {
  results: CalculationResults;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ results }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
        <p className="text-emerald-700 text-sm font-semibold uppercase tracking-wider mb-1">Valor Total</p>
        <p className="text-2xl font-bold text-emerald-900">{formatCurrency(results.finalAmount)}</p>
      </div>
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Total Investido</p>
        <p className="text-2xl font-bold text-slate-800">{formatCurrency(results.totalInvested)}</p>
      </div>
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <p className="text-blue-700 text-sm font-semibold uppercase tracking-wider mb-1">Total em Juros</p>
        <p className="text-2xl font-bold text-blue-900">{formatCurrency(results.totalInterest)}</p>
      </div>
    </div>
  );
};

export default ResultsSummary;
