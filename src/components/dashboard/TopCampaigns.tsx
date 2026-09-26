import React from 'react';
import {
  Flame,
  TrendingUp,
  ArrowUpRight,
  ExternalLink,
  Eye,
  Sparkles,
  Zap
} from 'lucide-react';
import { Campaign } from '../../types/marketing';

interface TopCampaignsProps {
  campaigns: Campaign[];
  onViewCampaign: (campaign: Campaign) => void;
}

export const TopCampaigns: React.FC<TopCampaignsProps> = ({
  campaigns,
  onViewCampaign,
}) => {
  // Sort by ROAS descending and pick top 3
  const topList = [...campaigns].sort((a, b) => b.roas - a.roas).slice(0, 3);

  const getPerformanceBadge = (index: number) => {
    switch (index) {
      case 0:
        return {
          label: '98% Excellent',
          style: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
      case 1:
        return {
          label: '94% High Growth',
          style: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
        };
      default:
        return {
          label: '91% Strong ROI',
          style: 'bg-blue-50 text-blue-700 border-blue-200',
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600">
              <Flame className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Top Performing Campaigns
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-rose-100 text-rose-700">
              High ROAS Flights
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by return on ad spend and conversion velocity.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topList.map((camp, idx) => {
          const perf = getPerformanceBadge(idx);
          const convRate = ((camp.conversions / camp.clicks) * 100).toFixed(2);

          return (
            <div
              key={camp.id}
              className="relative overflow-hidden rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              {/* Campaign Image Banner */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                {camp.image ? (
                  <img
                    src={camp.image}
                    alt={camp.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-purple-800 to-indigo-900 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white/40" />
                  </div>
                )}
                {/* Contrast overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/30 to-transparent" />

                {/* Badges on image */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 backdrop-blur-xs text-slate-900 shadow-sm">
                    {camp.platform}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border backdrop-blur-xs ${perf.style}`}
                  >
                    {perf.label}
                  </span>
                </div>

                {/* Campaign Name over bottom of image */}
                <div className="absolute bottom-2.5 left-3 right-3">
                  <h3 className="text-sm font-bold text-white tracking-tight truncate">
                    {camp.name}
                  </h3>
                  <span className="text-[11px] text-purple-200/90 truncate block">
                    {camp.targetAudience}
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                      Spend
                    </span>
                    <span className="font-extrabold text-slate-900 tabular-nums">
                      ₹{camp.spend.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                      CTR
                    </span>
                    <span className="font-extrabold text-slate-900 tabular-nums">
                      {camp.ctr}%
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                      Conv. Rate
                    </span>
                    <span className="font-extrabold text-purple-700 tabular-nums">
                      {convRate}%
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                    <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider block">
                      ROAS
                    </span>
                    <span className="font-black text-emerald-700 text-sm tabular-nums">
                      {camp.roas}x
                    </span>
                  </div>
                </div>

                {/* View Campaign Button */}
                <button
                  onClick={() => onViewCampaign(camp)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-fuchsia-600 hover:text-white rounded-xl transition-all duration-200 shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Campaign</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
