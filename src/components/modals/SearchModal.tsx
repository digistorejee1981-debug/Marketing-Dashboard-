import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Megaphone,
  Share2,
  Users,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Campaign } from '../../types/marketing';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: Campaign[];
  onSelectCampaign: (campaign: Campaign) => void;
  onNavigateTab: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  campaigns,
  onSelectCampaign,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCampaigns = campaigns.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.platform.toLowerCase().includes(query.toLowerCase()) ||
      c.targetAudience.toLowerCase().includes(query.toLowerCase())
  );

  const quickNav = [
    { label: 'Ads Manager', tab: 'ads-manager', icon: Megaphone },
    { label: 'Conversion Funnel', tab: 'conversions', icon: TrendingUp },
    { label: 'Audience Insights', tab: 'audiences', icon: Users },
    { label: 'Channel Feeds', tab: 'channels', icon: Share2 },
    { label: 'Executive Reports', tab: 'reports', icon: FileSpreadsheet },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden">
        {/* Search Input bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <Search className="w-5 h-5 text-purple-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search campaigns, audiences, channels, or jump to view..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none focus:outline-hidden text-slate-900 placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] font-mono bg-slate-100 text-slate-400 px-2 py-1 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Matching Campaigns */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
              Campaigns ({filteredCampaigns.length})
            </span>
            <div className="space-y-1">
              {filteredCampaigns.map((camp) => (
                <button
                  key={camp.id}
                  onClick={() => {
                    onSelectCampaign(camp);
                    onClose();
                  }}
                  className="flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-purple-50 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                      {camp.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 group-hover:text-purple-700 block">
                        {camp.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {camp.platform} · ₹{camp.spend.toLocaleString('en-IN')} spend · {camp.roas}x ROAS
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Jump Navigation */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
              Quick Navigation
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {quickNav.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.tab}
                    onClick={() => {
                      onNavigateTab(item.tab);
                      onClose();
                    }}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 border border-slate-100 text-slate-700 hover:text-purple-700 text-left transition-colors"
                  >
                    <Icon className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-[11px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
