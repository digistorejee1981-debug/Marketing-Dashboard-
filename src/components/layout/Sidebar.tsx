import React, { useState } from 'react';
import {
  LayoutDashboard,
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
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenCreateCampaign: () => void;
}

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone, badge: '6' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'ads-manager', label: 'Ads Manager', icon: Crosshair },
  { id: 'audiences', label: 'Audiences', icon: Users },
  { id: 'conversions', label: 'Conversions', icon: GitCompareArrows },
  { id: 'budget', label: 'Budget & Spending', icon: Wallet },
  { id: 'channels', label: 'Channels', icon: Share2, badge: '4' },
  { id: 'ab-testing', label: 'A/B Testing', icon: FlaskConical },
  { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
  onOpenCreateCampaign,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#120B24] border-r border-purple-900/30 text-slate-300 transition-all duration-300 ease-in-out lg:static ${
          isOpenMobile ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}`}
      >
        {/* Top Brand Zone */}
        <div className="flex items-center justify-between h-20 px-5 border-b border-purple-900/40">
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-indigo-600 shadow-lg shadow-fuchsia-500/30 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse-subtle" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  Nexus<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-300">Pulse</span>
                </span>
                <span className="text-[11px] font-medium tracking-wider text-purple-300/70 uppercase">
                  Marketing Studio
                </span>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 text-purple-300 hover:text-white lg:hidden rounded-lg hover:bg-purple-900/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-purple-300/50">
            {!isCollapsed ? 'Platform Suite' : '•••'}
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                title={isCollapsed ? item.label : undefined}
                className={`relative group flex items-center w-full gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-fuchsia-600 via-pink-600 to-indigo-600 text-white shadow-lg shadow-fuchsia-500/25 font-semibold'
                    : 'text-purple-200/80 hover:text-white hover:bg-purple-950/60'
                }`}
              >
                {/* Active Indicator Glow Pip */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-r-full shadow-sm" />
                )}

                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-purple-300 group-hover:text-pink-300'
                  }`}
                />

                {!isCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-purple-900/60 text-purple-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Launch CTA Card (Desktop expanded only) */}
        {!isCollapsed && (
          <div className="p-4 mx-3 mb-3 rounded-2xl bg-gradient-to-br from-purple-950/80 via-[#221345] to-indigo-950/80 border border-purple-500/30 shadow-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-md bg-pink-500/20 text-pink-400">
                <TrendingUp className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-semibold text-white">ROAS Booster Active</span>
            </div>
            <p className="text-[11px] text-purple-200/70 mb-3 leading-relaxed">
              Google & Meta AI bidding generated +₹38,200 incremental revenue.
            </p>
            <button
              onClick={onOpenCreateCampaign}
              className="w-full py-2 px-3 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 shadow-md shadow-pink-500/20 transition-all hover:scale-[1.02]"
            >
              + Create Campaign
            </button>
          </div>
        )}

        {/* Footer Collapse Toggle */}
        <div className="p-3 border-t border-purple-900/40 flex items-center justify-between text-xs text-purple-300/70">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-medium text-slate-300">Live Syncing</span>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="p-2 ml-auto text-purple-300 hover:text-white rounded-lg hover:bg-purple-900/40 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};
