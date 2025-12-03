import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  colorClass: string;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  colorClass,
  description 
}) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${colorClass}`}>
        <Icon size={48} />
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10 text-opacity-100`}>
          <Icon size={18} className="text-current" />
        </div>
        <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
      </div>

      <div className="text-2xl font-bold text-slate-800 tracking-tight">
        {value}
      </div>
      
      {description && (
        <p className="text-xs text-slate-400 mt-2 font-medium">
          {description}
        </p>
      )}
    </div>
  );
};

export default MetricCard;