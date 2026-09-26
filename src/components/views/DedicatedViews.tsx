import React, { useState } from 'react';
import {
  Megaphone,
  BarChart3,
  Crosshair,
  Users,
  GitCompareArrows,
  Wallet,
  Share2,
  FlaskConical,
  FileSpreadsheet,
  Settings,
  Plus,
  Play,
  Pause,
  TrendingUp,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Shield,
  Layers,
  Sliders,
  DollarSign
} from 'lucide-react';
import { Campaign, ChannelPerformance, ABTest } from '../../types/marketing';
import { AB_TESTS } from '../../data/mockData';

// 1. CAMPAIGNS VIEW
export const CampaignsView: React.FC<{
  campaigns: Campaign[];
  onOpenCreate: () => void;
  onViewCampaign: (c: Campaign) => void;
  onToggleStatus: (id: string) => void;
}> = ({ campaigns, onOpenCreate, onViewCampaign, onToggleStatus }) => {
  const [platformFilter, setPlatformFilter] = useState<string>('All');

  const filtered = campaigns.filter(
    (c) => platformFilter === 'All' || c.platform === platformFilter
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-purple-100 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Campaigns Manager</h2>
          <p className="text-xs text-slate-500">
            Control flight delivery, target audiences, and omni-channel budgets.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs">
            {['All', 'Meta', 'Google', 'Instagram', 'YouTube'].map((p) => (
              <button
                key={p}
                onClick={() => setPlatformFilter(p)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  platformFilter === p
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={onOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 shadow-md shadow-fuchsia-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Flight</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((camp) => (
          <div
            key={camp.id}
            className="rounded-2xl bg-white border border-purple-100/80 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-700">
                  {camp.platform} Ads
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    camp.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {camp.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">{camp.name}</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                {camp.targetAudience}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                    Spend / Budget
                  </span>
                  <span className="font-extrabold text-slate-900 tabular-nums">
                    ₹{camp.spend.toLocaleString('en-IN')} / ₹{camp.budget.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="text-[10px] text-emerald-700 block font-semibold uppercase">
                    ROAS / Conv
                  </span>
                  <span className="font-extrabold text-emerald-800 tabular-nums">
                    {camp.roas}x ({camp.conversions})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => onViewCampaign(camp)}
                className="flex-1 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
              >
                Inspect Flight
              </button>
              <button
                onClick={() => onToggleStatus(camp.id)}
                className={`p-2 rounded-xl border transition-colors ${
                  camp.status === 'Active'
                    ? 'border-amber-200 text-amber-600 hover:bg-amber-50'
                    : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {camp.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. ADS MANAGER VIEW
export const AdsManagerView: React.FC<{
  campaigns: Campaign[];
  onOpenCreateAd: () => void;
}> = ({ campaigns, onOpenCreateAd }) => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-purple-100 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Ads Creative Manager</h2>
          <p className="text-xs text-slate-500">
            Ad creatives, video hooks, copy variations, and real-time impression fatigue scores.
          </p>
        </div>
        <button
          onClick={onOpenCreateAd}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 shadow-md shadow-fuchsia-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Creative</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {campaigns.slice(0, 3).map((camp) => (
          <div
            key={camp.id}
            className="rounded-2xl bg-white border border-purple-100 overflow-hidden shadow-xs hover:shadow-lg transition-all"
          >
            <div className="relative h-44 bg-slate-900">
              {camp.image && (
                <img
                  src={camp.image}
                  alt={camp.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-600/90 backdrop-blur-xs">
                  {camp.platform}
                </span>
                <h4 className="text-sm font-bold mt-1">{camp.name} Hero Set</h4>
              </div>
            </div>

            <div className="p-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Fatigue Rating:</span>
                <span className="font-bold text-emerald-600">Low (1.4 freq)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Engagement Rate:</span>
                <span className="font-bold text-slate-900">7.8%</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Quality Score:</span>
                <span className="font-bold text-purple-700">9.2 / 10</span>
              </div>
              <button className="w-full mt-2 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
                Edit Creative & Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. A/B TESTING VIEW
export const ABTestingView: React.FC = () => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-purple-100 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">A/B Testing Studio</h2>
          <p className="text-xs text-slate-500">
            Bayesian multivariate experiments on headlines, landing pages, and CTAs.
          </p>
        </div>
        <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
          2 Active Experiments
        </span>
      </div>

      <div className="space-y-4">
        {AB_TESTS.map((test) => (
          <div
            key={test.id}
            className="rounded-2xl bg-white border border-purple-100 p-5 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                  Campaign: {test.campaign}
                </span>
                <h3 className="text-base font-bold text-slate-900">{test.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  {test.confidence}% Confidence
                </span>
                <span className="px-2.5 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
                  {test.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div
                className={`p-4 rounded-xl border ${
                  test.winner === 'A'
                    ? 'bg-emerald-50/50 border-emerald-300 ring-2 ring-emerald-400/20'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-900">Variant A: {test.variantA.name}</span>
                  {test.winner === 'A' && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Winner
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Conversions</span>
                    <span className="font-extrabold text-slate-900">{test.variantA.conversions}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">CTR</span>
                    <span className="font-extrabold text-slate-900">{test.variantA.ctr}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">ROAS</span>
                    <span className="font-extrabold text-emerald-600">{test.variantA.roas}x</span>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  test.winner === 'B'
                    ? 'bg-emerald-50/50 border-emerald-300 ring-2 ring-emerald-400/20'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-900">Variant B: {test.variantB.name}</span>
                  {test.winner === 'B' && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Winner (Statistically Significant)
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Conversions</span>
                    <span className="font-extrabold text-slate-900">{test.variantB.conversions}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">CTR</span>
                    <span className="font-extrabold text-slate-900">{test.variantB.ctr}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">ROAS</span>
                    <span className="font-extrabold text-emerald-600">{test.variantB.roas}x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. REPORTS VIEW
export const ReportsView: React.FC<{ onOpenExport: () => void }> = ({ onOpenExport }) => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-purple-100 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Executive Reports Archive</h2>
          <p className="text-xs text-slate-500">
            Automated PDF summaries, CSV data feeds, and weekly investor reports.
          </p>
        </div>
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 shadow-md shadow-fuchsia-500/20"
        >
          <Download className="w-4 h-4" />
          <span>New Export</span>
        </button>
      </div>

      <div className="rounded-2xl bg-white border border-purple-100 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 text-xs font-bold text-slate-700">
          Generated Performance Digests
        </div>
        <div className="divide-y divide-slate-100 text-xs">
          {[
            { name: 'Weekly Executive Briefing - Week 24', date: '2026-06-18', format: 'PDF', size: '2.4 MB' },
            { name: 'Omni-Channel ROAS Attribution Raw Data', date: '2026-06-15', format: 'CSV', size: '14.8 MB' },
            { name: 'Google Ads Enhanced Conversions Audit', date: '2026-06-10', format: 'PDF', size: '1.8 MB' },
            { name: 'Monthly Financial Reconciliation - May 2026', date: '2026-06-01', format: 'XLSX', size: '4.2 MB' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-purple-50/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700 font-bold">
                  {item.format}
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{item.name}</span>
                  <span className="text-[11px] text-slate-400">
                    Generated on {item.date} · {item.size}
                  </span>
                </div>
              </div>
              <button
                onClick={onOpenExport}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-purple-700 hover:border-purple-300 font-medium text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 5. SETTINGS VIEW
export const SettingsView: React.FC<{
  currency: string;
  onCurrencyChange: (c: string) => void;
}> = ({ currency, onCurrencyChange }) => {
  return (
    <div className="space-y-5 animate-in fade-in duration-200 max-w-4xl">
      <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900">Workspace Settings</h2>
        <p className="text-xs text-slate-500">
          Configure financial currencies, ad account tokens, team permissions, and alert triggers.
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-purple-100 p-6 space-y-6 text-xs shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-2">Display Currency</h3>
          <div className="flex items-center gap-3">
            {[
              { id: '₹', label: 'Indian Rupee (₹ INR)' },
              { id: '$', label: 'US Dollar ($ USD)' },
              { id: '€', label: 'Euro (€ EUR)' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => onCurrencyChange(c.id)}
                className={`px-4 py-2 rounded-xl border font-bold transition-all ${
                  currency === c.id
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Autonomous Budget Guardrails</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm text-purple-600" />
            <span className="font-medium text-slate-700">
              Automatically pause ad sets when 24h ROAS drops below 2.8x threshold
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm text-purple-600" />
            <span className="font-medium text-slate-700">
              Notify growth manager via Slack when flight exhausts 85% of monthly budget
            </span>
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 mb-2">Pixel & Tracking Integrations</h3>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 font-mono text-[11px] text-slate-600 flex justify-between items-center">
            <span>Pixel ID: META-PIXEL-94829104-ECOM</span>
            <span className="text-emerald-600 font-bold">Connected (Health: 100%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
