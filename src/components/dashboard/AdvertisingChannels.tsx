import React from 'react';
import {
  Share2,
  TrendingUp,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Video,
  Camera,
  Search,
  Globe
} from 'lucide-react';
import { ChannelPerformance } from '../../types/marketing';

interface AdvertisingChannelsProps {
  channels: ChannelPerformance[];
  onManageChannel: (channel: ChannelPerformance) => void;
  onSyncChannel: (id: string) => void;
}

export const AdvertisingChannels: React.FC<AdvertisingChannelsProps> = ({
  channels,
  onManageChannel,
  onSyncChannel,
}) => {
  const getBrandIcon = (id: string) => {
    switch (id) {
      case 'meta':
        return Globe;
      case 'google':
        return Search;
      case 'instagram':
        return Camera;
      case 'youtube':
        return Video;
      default:
        return Share2;
    }
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-600">
              <Share2 className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Advertising Channels
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-pink-100 text-pink-700">
              4 Active Feeds
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-network multi-touch attribution & live channel telemetry.
          </p>
        </div>

        <button
          onClick={() => onSyncChannel('all')}
          className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl border border-purple-200/70 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sync All APIs</span>
        </button>
      </div>

      {/* Grid of 4 Channel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {channels.map((channel) => {
          const Icon = getBrandIcon(channel.id);

          return (
            <div
              key={channel.id}
              className="relative overflow-hidden rounded-2xl bg-white border border-purple-100/80 p-5 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              {/* Top ambient color glow */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${channel.colorGradient} opacity-10 blur-2xl group-hover:opacity-20 transition-all duration-500`}
              />

              <div>
                {/* Header: Brand Icon, Name & Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr ${channel.colorGradient} text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{channel.name}</h3>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Connected</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    {channel.trend}
                  </span>
                </div>

                {/* Primary Highlights Grid */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100 mb-3.5">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                      {channel.metrics.primaryLabel}
                    </span>
                    <span className="text-base font-extrabold text-slate-900 tabular-nums">
                      {channel.metrics.primaryValue}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                      {channel.metrics.secondaryLabel}
                    </span>
                    <span className="text-base font-extrabold text-slate-900 tabular-nums">
                      {channel.metrics.secondaryValue}
                    </span>
                  </div>
                </div>

                {/* Granular Sub-Metrics list as specified in prompt */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-500">Click-Through Rate (CTR)</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {channel.metrics.ctr}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-500">Conversions</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {channel.metrics.conversions}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-100">
                    <span className="font-semibold text-purple-800">
                      {channel.metrics.roasOrCpcLabel}
                    </span>
                    <span className="font-black text-xs text-purple-700 tabular-nums bg-purple-50 px-2 py-0.5 rounded-md">
                      {channel.metrics.roasOrCpc}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="pt-3.5 mt-4 border-t border-slate-100">
                <button
                  onClick={() => onManageChannel(channel)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-purple-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 bg-purple-50 rounded-xl transition-all duration-200"
                >
                  <span>Manage Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
