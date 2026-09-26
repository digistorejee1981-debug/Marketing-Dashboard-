import React from 'react';
import {
  Wallet,
  TrendingUp,
  AlertCircle,
  PlusCircle,
  Settings2,
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { BUDGET_METRICS } from '../../data/mockData';

interface BudgetSpendingProps {
  currentSpend: number;
  totalBudget: number;
  onOpenIncreaseBudget: () => void;
  onManageCampaigns: () => void;
}

export const BudgetSpending: React.FC<BudgetSpendingProps> = ({
  currentSpend,
  totalBudget,
  onOpenIncreaseBudget,
  onManageCampaigns,
}) => {
  const remaining = Math.max(0, totalBudget - currentSpend);
  const percentSpent = Math.min(100, Math.round((currentSpend / totalBudget) * 1000) / 10);
  const dailyAverage = Math.round(currentSpend / 30);

  return (
    <div className="rounded-2xl bg-white border border-purple-100/80 p-5 sm:p-6 shadow-xs relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600">
              <Wallet className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Budget & Spending Overview
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-700">
              On Pace (99.1%)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time capital pacing, fiscal cycle runway, and daily burn velocity.
          </p>
        </div>

        {/* Action gradient buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={onOpenIncreaseBudget}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-indigo-600 hover:opacity-95 shadow-md shadow-fuchsia-500/20 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Increase Budget</span>
          </button>

          <button
            onClick={onManageCampaigns}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 rounded-xl transition-all"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Manage Campaign</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 py-5">
        {/* Total Budget */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Total Budget
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
            ₹{totalBudget.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">
            Monthly Cap Allocation
          </span>
        </div>

        {/* Amount Spent */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50/50 border border-purple-200/70">
          <span className="text-[11px] font-semibold text-purple-700 uppercase tracking-wider block mb-1">
            Amount Spent
          </span>
          <span className="text-xl sm:text-2xl font-black text-purple-900 tabular-nums">
            ₹{currentSpend.toLocaleString('en-IN')}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-purple-600 font-bold mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>{percentSpent}% of total spent</span>
          </div>
        </div>

        {/* Remaining Budget */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Remaining Budget
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-600 tabular-nums">
            ₹{remaining.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">
            Available runway
          </span>
        </div>

        {/* Daily Average Spend */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Daily Average Spend
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
            ₹{dailyAverage.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">
            Burn rate across channels
          </span>
        </div>
      </div>

      {/* Animated Glowing Progress Bar as required by prompt */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">
              Budget Utilization Progress
            </span>
            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
              ₹{currentSpend.toLocaleString('en-IN')} / ₹{totalBudget.toLocaleString('en-IN')}
            </span>
          </div>
          <span className="font-extrabold text-purple-900 tabular-nums">
            {percentSpent}%
          </span>
        </div>

        {/* Bar */}
        <div className="w-full h-3.5 bg-slate-200/80 rounded-full overflow-hidden relative shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 transition-all duration-700 relative shadow-sm"
            style={{ width: `${percentSpent}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse-subtle" />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <span>Target Runout: 10 days remaining</span>
          <span>Automatic rollover enabled at Month-End</span>
        </div>
      </div>
    </div>
  );
};
