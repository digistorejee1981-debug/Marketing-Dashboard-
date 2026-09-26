import React, { useState } from 'react';
import {
  Users,
  Smartphone,
  Laptop,
  Tablet,
  MapPin,
  TrendingUp,
  Percent,
  Compass
} from 'lucide-react';
import { AUDIENCE_DATA } from '../../data/mockData';

export const AudienceAnalytics: React.FC = () => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const segments = AUDIENCE_DATA.segments;
  const totalAudience = segments.reduce((sum, s) => sum + s.count, 0);

  // SVG Donut calculation
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;
  const slices = segments.map((seg) => {
    const strokeDasharray = `${(seg.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += seg.percentage;
    return {
      ...seg,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="rounded-2xl bg-white border border-purple-100/80 p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600">
              <Users className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Audience Analytics
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-purple-100 text-purple-700">
              {totalAudience.toLocaleString()} Reach
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Demographic, behavioral cohort, and hardware segmentation.
          </p>
        </div>
      </div>

      {/* Main Grid: Donut + Segments on left, Age/Device/Location on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Interactive SVG Donut (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="transform -rotate-90"
            >
              {slices.map((slice) => {
                const isHovered = hoveredSegment === slice.name;
                return (
                  <circle
                    key={slice.name}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={slice.strokeDasharray}
                    strokeDashoffset={slice.strokeDashoffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredSegment(slice.name)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                );
              })}
            </svg>

            {/* Donut Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-xs font-semibold text-slate-400">Total Audience</span>
              <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                125.6K
              </span>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full mt-0.5">
                Active Pool
              </span>
            </div>
          </div>

          {/* Segment Breakdown Legend */}
          <div className="grid grid-cols-2 gap-2.5 w-full mt-4 text-xs">
            {segments.map((seg) => {
              const isHovered = hoveredSegment === seg.name;
              return (
                <div
                  key={seg.name}
                  onMouseEnter={() => setHoveredSegment(seg.name)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  className={`p-2 rounded-xl transition-all cursor-pointer border ${
                    isHovered
                      ? 'bg-purple-100/60 border-purple-300'
                      : 'bg-white border-slate-200/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="font-semibold text-slate-800 text-[11px] truncate">
                      {seg.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{seg.percentage}%</span>
                    <span className="font-bold text-slate-900">{seg.count.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Age Groups, Device, Location (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Age Group Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Age Groups Breakdown
              </span>
              <span className="text-[11px] text-purple-600 font-medium">
                Top Demographic: 25–34 (44%)
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {AUDIENCE_DATA.ageGroups.map((group) => (
                <div
                  key={group.range}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    group.active
                      ? 'bg-gradient-to-b from-purple-50 to-pink-50 border-purple-300 ring-2 ring-purple-400/20 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block mb-0.5">
                    {group.range}
                  </span>
                  <span className="text-base font-extrabold text-purple-700 block">
                    {group.share}
                  </span>
                  <div className="mt-1 pt-1 border-t border-slate-200/50 flex flex-col text-[10px] text-slate-500">
                    <span className="font-medium text-slate-700">{group.spend}</span>
                    <span className="font-bold text-emerald-600">{group.roas} ROAS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device & Location Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Devices Card */}
            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
                Device Distribution
              </span>
              <div className="space-y-2">
                {AUDIENCE_DATA.devices.map((device) => {
                  const DeviceIcon =
                    device.type === 'Mobile'
                      ? Smartphone
                      : device.type === 'Desktop'
                      ? Laptop
                      : Tablet;

                  return (
                    <div key={device.type} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <DeviceIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>{device.type}</span>
                        </div>
                        <span className="font-bold text-slate-900 tabular-nums">
                          {device.share}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${device.share}%`,
                            backgroundColor: device.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location Card */}
            <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
                Geo Concentration (India)
              </span>
              <div className="space-y-1.5 text-xs">
                {AUDIENCE_DATA.locations.map((loc) => (
                  <div key={loc.region} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <MapPin className="w-3 h-3 text-pink-500" />
                      <span className="text-[11px] font-semibold">{loc.region}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-slate-500 font-mono">{loc.share}%</span>
                      <span className="font-bold text-slate-900">{loc.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
