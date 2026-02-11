
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ProjectionPoint } from '../types';

interface GrowthChartProps {
  data: ProjectionPoint[];
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { notation: 'compact', compactDisplay: 'short' }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-xl">
          <p className="font-bold text-slate-800 mb-2">{label}</p>
          <p className="text-sm text-emerald-600">Total: R$ {payload[0].value.toLocaleString('pt-BR')}</p>
          <p className="text-sm text-slate-500">Investido: R$ {payload[1].value.toLocaleString('pt-BR')}</p>
          <p className="text-sm text-blue-500">Juros: R$ {(payload[0].value - payload[1].value).toLocaleString('pt-BR')}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[400px]">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Projeção de Crescimento</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#64748b" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="label" 
            tick={{fontSize: 12, fill: '#64748b'}} 
            axisLine={false} 
            tickLine={false}
            interval={Math.floor(data.length / 6)}
          />
          <YAxis 
            tickFormatter={formatCurrency} 
            tick={{fontSize: 12, fill: '#64748b'}} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36}/>
          <Area 
            type="monotone" 
            name="Valor Total Acumulado"
            dataKey="totalAmount" 
            stroke="#10b981" 
            fillOpacity={1} 
            fill="url(#colorTotal)" 
            strokeWidth={3}
          />
          <Area 
            type="monotone" 
            name="Capital Investido"
            dataKey="totalInvested" 
            stroke="#64748b" 
            fillOpacity={1} 
            fill="url(#colorInvested)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
