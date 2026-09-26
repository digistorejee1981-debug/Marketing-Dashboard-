import React from 'react';
import {
  PlusCircle,
  Sparkles,
  Megaphone,
  Users,
  FileSpreadsheet,
  Share2,
  Zap,
  ArrowRight
} from 'lucide-react';

interface QuickActionsProps {
  onCreateCampaign: () => void;
  onCreateAd: () => void;
  onAddAudience: () => void;
  onGenerateReport: () => void;
  onConnectChannel: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateCampaign,
  onCreateAd,
  onAddAudience,
  onGenerateReport,
  onConnectChannel,
}) => {
  return (
    <div className="rounded-2xl bg-white border border-purple-100/80 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600">
            <Zap className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Quick Actions
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
            Fast Execution
          </span>
        </div>
        <span className="text-xs text-slate-400 hidden sm:inline">
          Launch ads and pull insights with 1 click
        </span>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* 1. Create Campaign */}
        <button
          onClick={onCreateCampaign}
          className="group relative overflow-hidden flex flex-col items-center justify-center text-center p-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-fuchsia-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <div className="p-2 rounded-xl bg-white/20 mb-2 group-hover:scale-110 transition-transform">
            <PlusCircle className="w-4 h-4 text-white" />
          </div>
          <span>+ Create Campaign</span>
          <span className="text-[10px] text-purple-100 font-normal mt-0.5 opacity-90">
            New Ad Flight
          </span>
        </button>

        {/* 2. Create Ad */}
        <button
          onClick={onCreateAd}
          className="group relative flex flex-col items-center justify-center text-center p-3.5 rounded-xl bg-slate-50 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 border border-slate-200/80 hover:border-purple-300 text-slate-800 font-bold text-xs shadow-2xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700 mb-2 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
            <Megaphone className="w-4 h-4" />
          </div>
          <span className="group-hover:text-purple-700">Create Ad</span>
          <span className="text-[10px] text-slate-400 font-normal mt-0.5">
            Creative & Copy
          </span>
        </button>

        {/* 3. Add Audience */}
        <button
          onClick={onAddAudience}
          className="group relative flex flex-col items-center justify-center text-center p-3.5 rounded-xl bg-slate-50 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 border border-slate-200/80 hover:border-purple-300 text-slate-800 font-bold text-xs shadow-2xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <div className="p-2 rounded-xl bg-pink-100 text-pink-700 mb-2 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all">
            <Users className="w-4 h-4" />
          </div>
          <span className="group-hover:text-purple-700">Add Audience</span>
          <span className="text-[10px] text-slate-400 font-normal mt-0.5">
            Lookalike & Cohort
          </span>
        </button>

        {/* 4. Generate Report */}
        <button
          onClick={onGenerateReport}
          className="group relative flex flex-col items-center justify-center text-center p-3.5 rounded-xl bg-slate-50 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 border border-slate-200/80 hover:border-purple-300 text-slate-800 font-bold text-xs shadow-2xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <div className="p-2 rounded-xl bg-blue-100 text-blue-700 mb-2 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <span className="group-hover:text-purple-700">Generate Report</span>
          <span className="text-[10px] text-slate-400 font-normal mt-0.5">
            PDF & CSV Export
          </span>
        </button>

        {/* 5. Connect Channel */}
        <button
          onClick={onConnectChannel}
          className="group relative flex flex-col items-center justify-center text-center p-3.5 rounded-xl bg-slate-50 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 border border-slate-200/80 hover:border-purple-300 text-slate-800 font-bold text-xs shadow-2xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 col-span-2 sm:col-span-1"
        >
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 mb-2 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <Share2 className="w-4 h-4" />
          </div>
          <span className="group-hover:text-purple-700">Connect Channel</span>
          <span className="text-[10px] text-slate-400 font-normal mt-0.5">
            Meta, TikTok, Pinterest
          </span>
        </button>
      </div>
    </div>
  );
};
