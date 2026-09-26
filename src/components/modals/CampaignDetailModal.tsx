import React from 'react';
import {
  X,
  Megaphone,
  TrendingUp,
  Percent,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Target
} from 'lucide-react';
import { Campaign } from '../../types/marketing';

interface CampaignDetailModalProps {
  campaign: Campaign | null;
  onClose: () => void;
  onToggleStatus: (id: string) => void;
}

export const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
  campaign,
  onClose,
  onToggleStatus,
}) => {
  if (!campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Banner with image if available */}
        <div className="relative h-44 w-full bg-slate-900 overflow-hidden shrink-0">
          {campaign.image ? (
            <img
              src={campaign.image}
              alt={campaign.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 flex items-center justify-center">
              <Megaphone className="w-12 h-12 text-purple-400/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-black/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-xl backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Headline on Banner */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-slate-900">
                  {campaign.platform} Ads
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white">
                  {campaign.status}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {campaign.name}
              </h2>
              <span className="text-xs text-purple-200">
                {campaign.targetAudience}
              </span>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-xs text-purple-300 block">Flight ROAS</span>
              <span className="text-2xl font-black text-white tabular-nums">
                {campaign.roas}x
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Allocated Budget
              </span>
              <span className="text-base font-extrabold text-slate-900 tabular-nums">
                ₹{campaign.budget.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200/70">
              <span className="text-[10px] text-purple-600 font-semibold uppercase tracking-wider block mb-1">
                Capital Spent
              </span>
              <span className="text-base font-extrabold text-purple-900 tabular-nums">
                ₹{campaign.spend.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                Total Conversions
              </span>
              <span className="text-base font-extrabold text-slate-900 tabular-nums">
                {campaign.conversions.toLocaleString()}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/70">
              <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider block mb-1">
                Cost Per Click (CPC)
              </span>
              <span className="text-base font-extrabold text-emerald-800 tabular-nums">
                ₹{campaign.cpc}
              </span>
            </div>
          </div>

          {/* Details breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
              <span className="font-bold text-slate-900 block text-xs">
                Flight Parameters
              </span>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Launch Date:</span>
                  <span className="font-medium text-slate-800">{campaign.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Impressions:</span>
                  <span className="font-medium text-slate-800 tabular-nums">
                    {campaign.impressions.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Clicks:</span>
                  <span className="font-medium text-slate-800 tabular-nums">
                    {campaign.clicks.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Click Through Rate:</span>
                  <span className="font-medium text-slate-800 tabular-nums">
                    {campaign.ctr}%
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2">
              <span className="font-bold text-slate-900 block text-xs">
                Targeting & Strategy
              </span>
              <div className="space-y-1.5 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px]">Objective:</span>
                  <span className="font-semibold text-slate-800">{campaign.objective}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Audience Segment:</span>
                  <span className="font-semibold text-slate-800">
                    {campaign.targetAudience}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => onToggleStatus(campaign.id)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              campaign.status === 'Active'
                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
          >
            {campaign.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 font-bold text-white rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 shadow-md shadow-purple-500/20 text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
