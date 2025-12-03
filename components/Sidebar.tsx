import React from 'react';
import { Settings, HelpCircle } from 'lucide-react';
import { FinancialInputs } from '../types';

interface SidebarProps {
  inputs: FinancialInputs;
  onChange: (key: keyof FinancialInputs, value: number) => void;
}

const InputGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6 border-b border-slate-100 pb-6 last:border-0">
    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InputField: React.FC<{
  label: string;
  value: number;
  onChange: (val: number) => void;
  tooltip?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}> = ({ label, value, onChange, tooltip, prefix, suffix, min = 0, step = 1 }) => (
  <div className="group">
    <div className="flex items-center justify-between mb-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {tooltip && (
        <div className="relative group/tooltip">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
          <div className="absolute right-0 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 bottom-full mb-2">
            {tooltip}
          </div>
        </div>
      )}
    </div>
    <div className="relative">
      {prefix && <span className="absolute left-3 top-2.5 text-slate-500 text-sm">{prefix}</span>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className={`w-full ${prefix ? 'pl-10' : 'pl-3'} ${suffix ? 'pr-8' : 'pr-3'} py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all`}
        min={min}
        step={step}
      />
      {suffix && <span className="absolute right-3 top-2.5 text-slate-500 text-sm">{suffix}</span>}
    </div>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ inputs, onChange }) => {
  return (
    // Removido 'fixed', 'hidden' e 'lg:block' para que o pai controle a visibilidade/layout
    <div className="w-80 h-full bg-white border-r border-slate-200 overflow-y-auto">
      <div className="p-6 sticky top-0 bg-white/95 backdrop-blur z-20 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Settings className="w-5 h-5 text-indigo-700" />
          </div>
          <h2 className="font-bold text-slate-800">Configuração</h2>
        </div>
      </div>

      <div className="p-6">
        <InputGroup title="Perfil Pessoal">
          <InputField
            label="Idade Atual"
            value={inputs.currentAge}
            onChange={(v) => onChange('currentAge', v)}
            suffix="anos"
          />
          <InputField
            label="Idade Alvo / Aposentadoria"
            value={inputs.targetAge}
            onChange={(v) => onChange('targetAge', v)}
            suffix="anos"
            tooltip="Idade em que você planeja parar de contribuir e começar a retirar."
          />
          <InputField
             label="Expectativa de Vida"
             value={inputs.lifeExpectancy}
             onChange={(v) => onChange('lifeExpectancy', v)}
             suffix="anos"
             tooltip="Ponto final da simulação."
          />
        </InputGroup>

        <InputGroup title="Situação Financeira">
          <InputField
            label="Patrimônio Líquido Atual"
            value={inputs.currentNetWorth}
            onChange={(v) => onChange('currentNetWorth', v)}
            prefix="R$"
            step={1000}
          />
          <InputField
            label="Aporte Mensal"
            value={inputs.monthlyContribution}
            onChange={(v) => onChange('monthlyContribution', v)}
            prefix="R$"
            tooltip="Valor investido mensalmente durante a fase de acumulação."
          />
        </InputGroup>

        <InputGroup title="Premissas de Mercado">
          <InputField
            label="Inflação Esperada"
            value={inputs.inflationRate}
            onChange={(v) => onChange('inflationRate', v)}
            suffix="%"
            step={0.1}
            tooltip="Taxa média anual de inflação esperada."
          />
          <InputField
            label="Retorno Real (Acima da Inflação)"
            value={inputs.realReturnRate}
            onChange={(v) => onChange('realReturnRate', v)}
            suffix="%"
            step={0.1}
            tooltip="Retorno anual do investimento menos a inflação. Usar retornos reais simplifica o planejamento de longo prazo."
          />
        </InputGroup>

        <InputGroup title="Metas & Saques">
          <InputField
            label="Custo de Vida Mensal"
            value={inputs.monthlyLivingCost}
            onChange={(v) => onChange('monthlyLivingCost', v)}
            prefix="R$"
            tooltip="Despesas mensais esperadas na aposentadoria (em valores de hoje)."
          />
          <InputField
            label="Taxa de Retirada Segura"
            value={inputs.safeWithdrawalRate}
            onChange={(v) => onChange('safeWithdrawalRate', v)}
            suffix="%"
            step={0.1}
            tooltip="Porcentagem do portfólio retirada anualmente. A regra dos 4% é um padrão comum."
          />
        </InputGroup>
      </div>
    </div>
  );
};

export default Sidebar;