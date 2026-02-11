
import React, { useState, useCallback, useEffect } from 'react';
import InputSection from './components/InputSection';
import ResultsSummary from './components/ResultsSummary';
import GrowthChart from './components/GrowthChart';
import { CalculationInputs, CalculationResults, ProjectionPoint } from './types';
import { getAIInsights } from './services/geminiService';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    initialAmount: 1000,
    monthlyContribution: 200,
    annualInterestRate: 12,
    period: 10,
    periodType: 'years',
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const calculateResults = useCallback(() => {
    const { initialAmount, monthlyContribution, annualInterestRate, period, periodType } = inputs;
    
    const totalMonths = periodType === 'years' ? period * 12 : period;
    const monthlyRate = Math.pow(1 + annualInterestRate / 100, 1 / 12) - 1;
    
    let currentTotal = initialAmount;
    let totalInvested = initialAmount;
    const projection: ProjectionPoint[] = [{
      month: 0,
      totalAmount: initialAmount,
      totalInvested: initialAmount,
      totalInterest: 0,
      label: 'Início'
    }];

    for (let m = 1; m <= totalMonths; m++) {
      // Contribution happens at start of month
      currentTotal = (currentTotal + monthlyContribution) * (1 + monthlyRate);
      totalInvested += monthlyContribution;
      
      // Save data points selectively to avoid chart lag on long periods
      if (totalMonths <= 60 || m % Math.ceil(totalMonths / 24) === 0 || m === totalMonths) {
        projection.push({
          month: m,
          totalAmount: Math.round(currentTotal * 100) / 100,
          totalInvested: Math.round(totalInvested * 100) / 100,
          totalInterest: Math.round((currentTotal - totalInvested) * 100) / 100,
          label: periodType === 'years' ? `Ano ${Math.floor(m / 12)}` : `Mês ${m}`
        });
      }
    }

    const finalResults = {
      finalAmount: currentTotal,
      totalInvested: totalInvested,
      totalInterest: currentTotal - totalInvested,
      projection
    };

    setResults(finalResults);
    return finalResults;
  }, [inputs]);

  const handleCalculate = async () => {
    setLoading(true);
    setAiAnalysis('');
    const newResults = calculateResults();
    
    try {
      const insight = await getAIInsights(inputs, newResults);
      setAiAnalysis(insight || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial calculation on mount
  useEffect(() => {
    calculateResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">CompoundCalc <span className="text-emerald-600">Pro</span></h1>
          </div>
          <div className="hidden sm:block text-sm text-slate-500 font-medium">
            Sua jornada financeira começa aqui
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs - Left Column */}
          <div className="lg:col-span-4 space-y-6">
            <InputSection 
              inputs={inputs} 
              setInputs={setInputs} 
              onCalculate={handleCalculate} 
              isLoading={loading}
            />
            
            <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
              <h4 className="font-bold text-lg mb-2">Por que usar Juros Compostos?</h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                Diferente dos juros simples, aqui os rendimentos são reinvestidos. 
                Com o tempo, o crescimento torna-se exponencial — seu dinheiro gera mais dinheiro!
              </p>
            </div>
          </div>

          {/* Results - Right Column */}
          <div className="lg:col-span-8 space-y-8">
            {results && (
              <>
                <ResultsSummary results={results} />
                
                <div className="space-y-6">
                  <GrowthChart data={results.projection} />
                  
                  {/* AI Insights Card */}
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-emerald-100 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">Insights da IA Gemini</h3>
                    </div>
                    
                    {loading ? (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                        <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                      </div>
                    ) : aiAnalysis ? (
                      <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                          {aiAnalysis}
                        </p>
                      </div>
                    ) : (
                      <p className="text-slate-500 italic">Clique em "Calcular e Analisar" para receber uma estratégia personalizada da nossa IA.</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer Mobile Call to Action (Optional if primary button is sticky, but here we made it visible) */}
      <footer className="mt-12 text-center text-slate-400 text-sm">
        <p>© 2024 CompoundCalc Pro - Desenvolvido com Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
