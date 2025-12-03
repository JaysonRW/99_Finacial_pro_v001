import React from 'react';
import { calculateNominalReturn } from '../services/financeUtils';

interface EducationPanelProps {
  inflationRate: number;
  realReturnRate: number;
}

const EducationPanel: React.FC<EducationPanelProps> = ({ inflationRate, realReturnRate }) => {
  const nominalRate = calculateNominalReturn(realReturnRate, inflationRate);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="bg-indigo-600 w-2 h-8 rounded-full"></span>
          Retorno Nominal vs. Real
        </h2>
        
        <p className="text-slate-600 mb-6 leading-relaxed">
          Ao planejar para o longo prazo (20+ anos), o dinheiro perde valor devido à inflação.
          Planejadores financeiros tipicamente usam <strong>Retornos Reais</strong> (Retorno Nominal - Inflação)
          para manter todos os cálculos em "Valores de Hoje". Isso torna mais fácil entender
          o poder de compra futuro.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-4">A Equação de Fisher</h3>
            <div className="text-center py-4 px-2 bg-white rounded-lg border border-slate-100 shadow-sm mb-4 overflow-x-auto">
              <span className="font-serif italic text-lg text-slate-800">
                (1 + r<sub>nominal</sub>) = (1 + r<sub>real</sub>) × (1 + i)
              </span>
            </div>
            <p className="text-xs text-slate-500 text-center">
              Onde <strong>i</strong> é a inflação.
            </p>
          </div>

          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
             <h3 className="font-semibold text-emerald-800 mb-4">Seus Dados Atuais</h3>
             <ul className="space-y-3 text-sm">
               <li className="flex justify-between border-b border-emerald-100 pb-2">
                 <span className="text-emerald-700">Retorno Real (Input):</span>
                 <span className="font-bold text-emerald-900">{realReturnRate.toFixed(2)}%</span>
               </li>
               <li className="flex justify-between border-b border-emerald-100 pb-2">
                 <span className="text-emerald-700">Inflação (Input):</span>
                 <span className="font-bold text-emerald-900">{inflationRate.toFixed(2)}%</span>
               </li>
               <li className="flex justify-between pt-2">
                 <span className="text-emerald-700 font-bold">Retorno Nominal Implícito:</span>
                 <span className="font-bold text-emerald-900 text-lg">{nominalRate.toFixed(2)}%</span>
               </li>
             </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Taxa de Retirada Segura (SWR)</h2>
        <p className="text-slate-600 mb-4 leading-relaxed">
          A taxa na qual você pode retirar fundos do seu portfólio de investimentos sem ficar sem dinheiro antes do fim da sua vida.
        </p>
        <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
            <p className="text-indigo-800 font-medium italic">
              "A Regra dos 4%" sugere que retirar 4% do seu portfólio no primeiro ano de aposentadoria,
              e ajustar esse valor pela inflação nos anos subsequentes, historicamente proporcionou uma alta probabilidade
              de não sobreviver ao seu dinheiro em um período de 30 anos.
            </p>
        </div>
      </div>
    </div>
  );
};

export default EducationPanel;