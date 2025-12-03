import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  Activity, 
  LayoutDashboard, 
  Table as TableIcon, 
  BookOpen,
  LogOut,
  Menu
} from 'lucide-react';

import Login from './components/Login';
import Sidebar from './components/Sidebar';
import MetricCard from './components/MetricCard';
import SimulationChart from './components/SimulationChart';
import DetailedTable from './components/DetailedTable';
import EducationPanel from './components/EducationPanel';

import { FinancialInputs, TabOption } from './types';
import { calculateKPIs, formatCurrency, runSimulation } from './services/financeUtils';

const DEFAULT_INPUTS: FinancialInputs = {
  currentAge: 30,
  targetAge: 55,
  lifeExpectancy: 85,
  currentNetWorth: 50000,
  monthlyContribution: 2000,
  inflationRate: 3.5,
  realReturnRate: 5.5,
  monthlyLivingCost: 5000,
  safeWithdrawalRate: 4.0,
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputs, setInputs] = useState<FinancialInputs>(DEFAULT_INPUTS);
  const [activeTab, setActiveTab] = useState<TabOption>(TabOption.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleInputChange = (key: keyof FinancialInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const kpis = useMemo(() => calculateKPIs(inputs), [inputs]);
  const simulationData = useMemo(() => runSimulation(inputs), [inputs]);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Responsive Wrapper */}
      {/* Correção: Adicionado 'h-screen' para garantir altura no mobile e 'inset-y-0' */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 transition-transform duration-300 transform h-screen lg:h-auto ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar inputs={inputs} onChange={handleInputChange} />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 -ml-2 rounded-lg hover:bg-slate-100 lg:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Financial Planner Pro
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab(TabOption.DASHBOARD)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === TabOption.DASHBOARD ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  Dashboard
                </div>
              </button>
              <button
                onClick={() => setActiveTab(TabOption.TABLE)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === TabOption.TABLE ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <div className="flex items-center gap-2">
                  <TableIcon size={16} />
                  Tabela
                </div>
              </button>
              <button
                onClick={() => setActiveTab(TabOption.EDUCATION)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === TabOption.EDUCATION ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                 <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  Aprenda
                </div>
              </button>
            </div>
            
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              title="Sair"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Tab Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          
          {/* Dashboard View */}
          {activeTab === TabOption.DASHBOARD && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* KPI Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <MetricCard 
                  title="Custo Projetado (Anual)" 
                  value={formatCurrency(kpis.annualLivingCost)} 
                  icon={DollarSign}
                  colorClass="text-amber-500 bg-amber-500"
                  description={`Baseado em R$${inputs.monthlyLivingCost}/mês`}
                />
                <MetricCard 
                  title="Número FIRE (Meta)" 
                  value={formatCurrency(kpis.fireNumber)} 
                  icon={Target}
                  colorClass="text-indigo-500 bg-indigo-500"
                  description={`Taxa de retirada: ${inputs.safeWithdrawalRate}%`}
                />
                <MetricCard 
                  title="Gap Patrimonial" 
                  value={formatCurrency(kpis.wealthGap)} 
                  icon={TrendingUp}
                  colorClass={kpis.wealthGap === 0 ? "text-emerald-500 bg-emerald-500" : "text-rose-500 bg-rose-500"}
                  description={kpis.wealthGap === 0 ? "Meta Atingida!" : "Falta acumular"}
                />
                <MetricCard 
                  title="Runway Atual" 
                  value={kpis.runwayYears === "Infinito" ? "∞ Anos" : `${kpis.runwayYears} Anos`} 
                  icon={Activity}
                  colorClass="text-teal-500 bg-teal-500"
                  description="Se a renda parasse hoje"
                />
              </div>

              {/* Chart Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Projeção Patrimonial</h2>
                    <p className="text-sm text-slate-400">Saldo estimado ajustado por retornos reais.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Renda Perpétua</p>
                    <p className="text-lg font-bold text-indigo-600">{formatCurrency(kpis.perpetualIncome)} <span className="text-sm text-slate-400 font-normal">/ mês</span></p>
                  </div>
                </div>
                <SimulationChart data={simulationData} targetAmount={kpis.fireNumber} />
              </div>
            </div>
          )}

          {/* Table View */}
          {activeTab === TabOption.TABLE && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Detalhamento Ano a Ano</h2>
                  <p className="text-sm text-slate-500">Análise detalhada do fluxo de caixa nas fases de acumulação e distribuição.</p>
               </div>
               <DetailedTable data={simulationData} />
            </div>
          )}

          {/* Education View */}
          {activeTab === TabOption.EDUCATION && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <EducationPanel inflationRate={inputs.inflationRate} realReturnRate={inputs.realReturnRate} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;