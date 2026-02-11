
import React from 'react';
import { CalculationInputs } from '../types';

interface InputSectionProps {
  inputs: CalculationInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculationInputs>>;
  onCalculate: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, setInputs, onCalculate, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'periodType' ? value : parseFloat(value) || 0
    }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Parâmetros de Simulação
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Valor Inicial (R$)</label>
          <input
            type="number"
            name="initialAmount"
            value={inputs.initialAmount}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="Ex: 1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Aporte Mensal (R$)</label>
          <input
            type="number"
            name="monthlyContribution"
            value={inputs.monthlyContribution}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="Ex: 200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Taxa de Juros Anual (%)</label>
          <input
            type="number"
            name="annualInterestRate"
            value={inputs.annualInterestRate}
            onChange={handleChange}
            step="0.1"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="Ex: 12.5"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-600 mb-1">Período</label>
            <input
              type="number"
              name="period"
              value={inputs.period}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Ex: 10"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium text-slate-600 mb-1">Unidade</label>
            <select
              name="periodType"
              value={inputs.periodType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all appearance-none bg-white"
            >
              <option value="years">Anos</option>
              <option value="months">Meses</option>
            </select>
          </div>
        </div>

        <button
          onClick={onCalculate}
          disabled={isLoading}
          className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
          ) : (
            <>
              Calcular e Analisar
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
