
import { GoogleGenAI, Type } from "@google/genai";
import { CalculationInputs, CalculationResults } from "../types";

export const getAIInsights = async (inputs: CalculationInputs, results: CalculationResults) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Analise os seguintes resultados de uma simulação de juros compostos:
    - Investimento Inicial: R$ ${inputs.initialAmount.toFixed(2)}
    - Aporte Mensal: R$ ${inputs.monthlyContribution.toFixed(2)}
    - Taxa de Juros Anual: ${inputs.annualInterestRate}%
    - Período: ${inputs.period} ${inputs.periodType === 'years' ? 'anos' : 'meses'}
    
    Resultados Finais:
    - Valor Total Acumulado: R$ ${results.finalAmount.toFixed(2)}
    - Total Investido (Principal): R$ ${results.totalInvested.toFixed(2)}
    - Total Ganho em Juros: R$ ${results.totalInterest.toFixed(2)}
    
    Por favor, forneça:
    1. Um breve resumo do desempenho (o quanto o dinheiro "trabalhou").
    2. Uma dica financeira personalizada baseada nestes números (ex: impacto de aumentar um pouco o aporte ou a taxa).
    3. Uma comparação realista com o poder de compra ou inflação (de forma genérica).
    
    Responda em português do Brasil, de forma encorajadora e profissional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Erro ao obter insights da IA:", error);
    return "Desculpe, não conseguimos gerar insights personalizados no momento. Mas seus números parecem promissores!";
  }
};
