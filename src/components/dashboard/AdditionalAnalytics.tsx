import React, { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Percent,
  DollarSign,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  BarChart3
} from 'lucide-react';

export const AdditionalAnalytics: React.FC = () => {
  const [cpcHoverIdx, setCpcHoverIdx] = useState<number | null>(null);

  // CPC Analysis data points over recent flights
  const cpcPoints = [1.58, 1.49, 1.42, 1.35, 1.28, 1.19, 1.12, 1.05, 1.01];
  const cpcLabels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9'];

  // Revenue curve
  const revenuePoints = [42, 48, 54, 61, 74, 82, 91, 108];

  // Circular gauge calculations for 6.78% CVR (against target 10%)
  const gaugePercent = 67.8; // 6.78% / 10%
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (gaugePercent / 100) * circumference;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-600">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Additional Analytics
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-violet-100 text-violet-700">
              Deep Intelligence
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Unit economics, conversion velocity, revenue curves, and creative engagement.
          </p>
        </div>
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">
        {/* 1. CPC Analysis Line Chart (3 cols on XL) */}
        <div className="xl:col-span-3 rounded-2xl bg-white border border-purple-100/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                CPC Analysis
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3" />
                -36.1%
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-slate-900 tabular-nums">
                ₹{cpcHoverIdx !== null ? cpcPoints[cpcHoverIdx].toFixed(2) : '1.01'}
              </span>
              <span className="text-xs text-slate-400">avg cost / click</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Optimized ad relevancy lowered CPC from ₹1.58 to ₹1.01.
            </p>
          </div>

          {/* Interactive CPC SVG */}
          <div className="h-28 w-full mt-3 relative">
            <svg
              viewBox="0 0 200 80"
              className="w-full h-full overflow-visible"
              onMouseLeave={() => setCpcHoverIdx(null)}
            >
              <defs>
                <linearGradient id="cpcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Curve points */}
              {(() => {
                const min = 0.9;
                const max = 1.7;
                const coords = cpcPoints.map((val, i) => ({
                  x: 10 + (i / (cpcPoints.length - 1)) * 180,
                  y: 70 - ((val - min) / (max - min)) * 60,
                  val,
                }));
                const d = coords.reduce(
                  (acc, curr, i, arr) =>
                    i === 0
                      ? `M ${curr.x},${curr.y}`
                      : `${acc} S ${(curr.x + arr[i - 1].x) / 2},${(curr.y + arr[i - 1].y) / 2} ${curr.x},${curr.y}`,
                  ''
                );
                const area = `${d} L 190,75 L 10,75 Z`;

                return (
                  <>
                    <path d={area} fill="url(#cpcGrad)" />
                    <path
                      d={d}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {coords.map((c, i) => (
                      <circle
                        key={i}
                        cx={c.x}
                        cy={c.y}
                        r={cpcHoverIdx === i ? '4.5' : '2.5'}
                        fill="#10B981"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setCpcHoverIdx(i)}
                      />
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* 2. Conversion Rate Circular Progress Gauge (3 cols on XL) */}
        <div className="xl:col-span-3 rounded-2xl bg-white border border-purple-100/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Conversion Rate
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                +1.2%
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Aggregated storewide purchase conversion velocity.
            </p>
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg width="112" height="112" className="transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke="#F1F5F9"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke="url(#cvrGradient)"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="cvrGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-black text-slate-900 tabular-nums">
                  6.78%
                </span>
                <span className="text-[9px] font-semibold text-purple-600">CVR</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 text-slate-500">
            <span>Benchmark Target: 5.0%</span>
            <span className="font-bold text-emerald-600">+35% Over Target</span>
          </div>
        </div>

        {/* 3. Cost Per Conversion Comparison (3 cols on XL) */}
        <div className="xl:col-span-3 rounded-2xl bg-white border border-purple-100/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Cost Per Conversion
              </span>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                ₹21.75 CPA
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Benchmark comparison against peer ecommerce brands.
            </p>
          </div>

          {/* Comparative horizontal bars */}
          <div className="space-y-3 py-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">Our Current Flight</span>
                <span className="font-extrabold text-purple-700">₹21.75</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600"
                  style={{ width: '48%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500">Last Quarter Flight</span>
                <span className="font-semibold text-slate-700">₹28.10</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-slate-300" style={{ width: '62%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500">Industry Avg Benchmark</span>
                <span className="font-semibold text-slate-700">₹34.50</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-rose-300" style={{ width: '76%' }} />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>₹12.75 lower than industry average</span>
          </div>
        </div>

        {/* 4. Revenue Generated Area Chart (3 cols on XL) */}
        <div className="xl:col-span-3 rounded-2xl bg-white border border-purple-100/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Revenue Generated
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                4.86x ROAS
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-slate-900 tabular-nums">
                ₹8,98,420
              </span>
              <span className="text-xs text-slate-400">gross sales</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Net margin: ₹7,12,970 (384% Net ROI after ad costs).
            </p>
          </div>

          {/* Mini Revenue SVG Area */}
          <div className="h-20 w-full mt-2">
            <svg viewBox="0 0 160 50" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,45 Q 30,38 50,34 T 90,26 T 130,16 T 160,8 L 160,50 L 0,50 Z"
                fill="url(#revGrad)"
              />
              <path
                d="M 0,45 Q 30,38 50,34 T 90,26 T 130,16 T 160,8"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Direct Orders: 8,526</span>
            <span className="font-bold text-slate-800">AOV: ₹105.37</span>
          </div>
        </div>
      </div>

      {/* 5. Engagement Micro-Metrics Row (Likes, Comments, Shares, Saves) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50/60 via-pink-50/50 to-indigo-50/60 border border-purple-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-xs">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Social Ad Engagement
            </span>
            <span className="text-[11px] text-slate-500">
              Aggregated across Meta, Instagram & YouTube campaigns
            </span>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-pink-100 text-pink-600">
              <Heart className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                Likes
              </span>
              <span className="text-sm font-black text-slate-900 tabular-nums">
                38,420
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-100 text-purple-600">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                Comments
              </span>
              <span className="text-sm font-black text-slate-900 tabular-nums">
                5,240
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
              <Share2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                Shares
              </span>
              <span className="text-sm font-black text-slate-900 tabular-nums">
                9,180
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-600">
              <Bookmark className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                Saves
              </span>
              <span className="text-sm font-black text-slate-900 tabular-nums">
                14,650
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
