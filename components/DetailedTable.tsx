import React from 'react';
import { SimulationYear } from '../types';
import { formatCurrency } from '../services/financeUtils';

interface DetailedTableProps {
  data: SimulationYear[];
}

const DetailedTable: React.FC<DetailedTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-slate-500 uppercase font-medium">
          <tr>
            <th className="px-6 py-3">Ano</th>
            <th className="px-6 py-3">Idade</th>
            <th className="px-6 py-3 text-right">Saldo Inicial</th>
            <th className="px-6 py-3 text-right text-emerald-600">Rendimento</th>
            <th className="px-6 py-3 text-right text-indigo-600">Aporte</th>
            <th className="px-6 py-3 text-right text-amber-600">Saque</th>
            <th className="px-6 py-3 text-right font-bold">Saldo Final</th>
            <th className="px-6 py-3 text-center">Fase</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {data.map((row) => (
            <tr key={row.year} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-3 text-slate-500">{row.year}</td>
              <td className="px-6 py-3 font-medium text-slate-700">{row.age}</td>
              <td className="px-6 py-3 text-right text-slate-600 font-mono">
                {formatCurrency(row.startBalance)}
              </td>
              <td className="px-6 py-3 text-right text-emerald-600 font-mono">
                +{formatCurrency(row.returns)}
              </td>
              <td className="px-6 py-3 text-right text-indigo-600 font-mono">
                {row.contribution > 0 ? `+${formatCurrency(row.contribution)}` : '-'}
              </td>
              <td className="px-6 py-3 text-right text-amber-600 font-mono">
                {row.withdrawal > 0 ? `-${formatCurrency(row.withdrawal)}` : '-'}
              </td>
              <td className={`px-6 py-3 text-right font-mono font-bold ${row.endBalance < 0 ? 'text-red-500' : 'text-slate-800'}`}>
                {formatCurrency(row.endBalance)}
              </td>
              <td className="px-6 py-3 text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  row.phase === 'Accumulation' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {row.phase === 'Accumulation' ? 'Acumulação' : 'Usufruto'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailedTable;