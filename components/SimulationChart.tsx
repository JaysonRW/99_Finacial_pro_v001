import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend
} from 'recharts';
import { SimulationYear } from '../types';
import { formatCurrency } from '../services/financeUtils';

interface SimulationChartProps {
  data: SimulationYear[];
  targetAmount: number;
}

const SimulationChart: React.FC<SimulationChartProps> = ({ data, targetAmount }) => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis 
            dataKey="age" 
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            label={{ value: 'Idade (Anos)', position: 'insideBottomRight', offset: -5, fill: '#94a3b8' }}
          />
          <YAxis 
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `R$${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            formatter={(value: number) => [formatCurrency(value), '']}
            labelFormatter={(label) => `Idade: ${label}`}
            labelStyle={{ color: '#64748b', fontWeight: 'bold' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          
          <ReferenceLine 
            y={targetAmount} 
            label={{ 
              value: 'Meta FIRE', 
              position: 'insideTopLeft', 
              fill: '#10b981',
              fontSize: 12,
              fontWeight: 600
            }} 
            stroke="#10b981" 
            strokeDasharray="5 5" 
          />

          <Area 
            type="monotone" 
            dataKey="endBalance" 
            name="Saldo Projetado" 
            stroke="#6366f1" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorBalance)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimulationChart;