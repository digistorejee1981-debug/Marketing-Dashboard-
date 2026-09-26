import React, { useState } from 'react';
import {
  GitCompareArrows,
  ArrowRight,
  TrendingUp,
  Percent,
  ChevronDown,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { FUNNEL_STAGES } from '../../data/mockData';
import { FunnelStage } from '../../types/marketing';

export const ConversionFunnel: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<FunnelStage>(FUNNEL_STAGES[0]);

  // Stage optimization insights
  const getStageRecommendation = (stageId: string) => {
    switch (stageId) {
      case 'impressions':
        return 'Broaden lookalike thresholds to 3% to scale top-of-funnel reach while capping ad frequency at 3.2 per week.';
      case 'clicks':
        return 'CTR at 4.41% is top decile in Ecommerce. Test video hooks in the first 3 seconds to lower effective CPC by another 8%.';
      case 'visits':
        return '89.5% click-to-landing rate indicates fast server response (<1.2s TTFB). Keep CDN edge caching active.';
      case 'cart':
        return 'Add to Cart conversion is 23.9%. Introducing a sticky floating "Add to Bag" on mobile product pages increased cart volume by 14%.';
      case 'checkout':
        return '50.8% cart abandonment observed. One-click UPI and Apple Pay express checkout options can recover ~32% of dropped buyers.';
      case 'purchase':
        return '64.4% final step conversion. Post-purchase upsell offers (accessories + ₹200 off) currently convert at 12.8%.';
      default:
        return 'Maintain automated budget rules to throttle underperforming ad sets.';
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-purple-100/80 p-5 sm:p-6 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600">
              <GitCompareArrows className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Conversion Funnel
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-indigo-100 text-indigo-700">
              End-to-End Attribution
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Stage-by-stage drop-off tracking from impression to final transaction.
          </p>
        </div>

        {/* Global Summary Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          <span className="text-[11px] font-semibold text-emerald-800">
            Visit-to-Purchase CVR:
          </span>
          <span className="text-xs font-black text-emerald-700 tabular-nums">
            7.58%
          </span>
        </div>
      </div>

      {/* Stepped Visual Funnel Flow */}
      <div className="pt-6 pb-2 space-y-3">
        {FUNNEL_STAGES.map((stage, index) => {
          const isSelected = selectedStage.id === stage.id;
          // Calculate proportional bar width with minimum 18% width for readability
          const widthPercentage = Math.max(16, 100 - index * 16.5);

          return (
            <div
              key={stage.id}
              onClick={() => setSelectedStage(stage)}
              className={`group cursor-pointer rounded-xl p-3 border transition-all duration-200 ${
                isSelected
                  ? 'bg-purple-50/70 border-purple-300 shadow-md ring-2 ring-purple-400/20'
                  : 'bg-slate-50/60 border-slate-200/70 hover:bg-purple-50/30 hover:border-purple-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {stage.name}
                  </span>
                  <span className="text-[11px] text-slate-400 hidden md:inline">
                    · {stage.description}
                  </span>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
                  <span className="font-extrabold text-slate-900 tabular-nums">
                    {stage.formattedCount}
                  </span>
                  <span className="px-2 py-0.5 rounded-md font-bold text-[11px] bg-white border border-slate-200 text-purple-700 shadow-2xs">
                    {index === 0 ? '100% Base' : `${stage.rateFromPrevious}% conv.`}
                  </span>
                  {stage.dropOffRate !== undefined && (
                    <span className="text-[10px] font-semibold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md">
                      -{stage.dropOffRate.toFixed(1)}% drop
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar with vibrant gradient */}
              <div className="w-full h-3 bg-slate-200/70 rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${stage.color} transition-all duration-700 relative`}
                  style={{ width: `${widthPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse-subtle" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Stage Detail Insight Box */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-200/80 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-purple-600 text-white shadow-xs shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="flex-1 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-slate-900">
              Stage Insight: {selectedStage.name}
            </span>
            <span className="text-[10px] text-purple-700 font-semibold bg-white px-2 py-0.5 rounded-full border border-purple-200">
              {selectedStage.formattedCount} volume
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            {getStageRecommendation(selectedStage.id)}
          </p>
        </div>
      </div>
    </div>
  );
};
