import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart2,
  Calendar,
  Layers,
  ArrowUpRight,
  Filter,
  Download
} from 'lucide-react';
import { TimeRange } from '../../types/marketing';
import { PERFORMANCE_CHART_SERIES } from '../../data/mockData';

interface CampaignPerformanceChartProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  onExportReport: () => void;
}

type MetricKey = 'impressions' | 'clicks' | 'conversions' | 'spend' | 'revenue';

export const CampaignPerformanceChart: React.FC<CampaignPerformanceChartProps> = ({
  timeRange,
  onTimeRangeChange,
  onExportReport,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('revenue');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const seriesData = PERFORMANCE_CHART_SERIES[selectedMetric];

  // Month labels or period subdivisions
  const labels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Chart coordinate math
  const width = 800;
  const height = 280;
  const paddingX = 40;
  const paddingY = 30;

  const currentPoints = seriesData.current;
  const previousPoints = seriesData.previous;

  const allVals = [...currentPoints, ...previousPoints];
  const minVal = Math.min(...allVals) * 0.9;
  const maxVal = Math.max(...allVals) * 1.08;
  const valRange = maxVal - minVal || 1;

  const getCoordinates = (points: number[]) => {
    return points.map((val, idx) => {
      const x = paddingX + (idx / (points.length - 1)) * (width - 2 * paddingX);
      const y = height - paddingY - ((val - minVal) / valRange) * (height - 2 * paddingY);
      return { x, y, val };
    });
  };

  const currentCoords = getCoordinates(currentPoints);
  const prevCoords = getCoordinates(previousPoints);

  // Generate smooth SVG curve
  const generateBezierPath = (coords: { x: number; y: number }[]) => {
    if (coords.length < 2) return '';
    let path = `M ${coords[0].x},${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i];
      const p1 = coords[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      path += ` C ${cpX},${p0.y} ${cpX},${p1.y} ${p1.x},${p1.y}`;
    }
    return path;
  };

  const currentLine = generateBezierPath(currentCoords);
  const prevLine = generateBezierPath(prevCoords);

  const areaPath = `${currentLine} L ${currentCoords[currentCoords.length - 1].x},${height - paddingY} L ${currentCoords[0].x},${height - paddingY} Z`;

  const metricTabs: { key: MetricKey; label: string }[] = [
    { key: 'impressions', label: 'Impressions' },
    { key: 'clicks', label: 'Clicks' },
    { key: 'conversions', label: 'Conversions' },
    { key: 'spend', label: 'Ad Spend' },
    { key: 'revenue', label: 'Revenue' },
  ];

  const timeFilters: { id: TimeRange; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '3m', label: '3 Months' },
    { id: '1y', label: '1 Year' },
  ];

  const activePoint = hoverIndex !== null ? currentCoords[hoverIndex] : null;
  const activePrevPoint = hoverIndex !== null ? prevCoords[hoverIndex] : null;

  return (
    <div className="rounded-2xl bg-white border border-purple-100/80 p-5 sm:p-6 shadow-xs relative overflow-hidden">
      {/* Top Section: Title & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-fuchsia-500/10 text-fuchsia-600">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Campaign Performance
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              +28.4% vs Prior
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic growth curve comparing current ad flight against previous baseline.
          </p>
        </div>

        {/* Action Controls & Date range filters */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Time range pills */}
          <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 shadow-inner">
            {timeFilters.map((tf) => (
              <button
                key={tf.id}
                onClick={() => onTimeRangeChange(tf.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  timeRange === tf.id
                    ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>

          <button
            onClick={onExportReport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/70 rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Middle Section: Metric Selector Tabs */}
      <div className="flex items-center flex-wrap gap-2 py-3.5">
        {metricTabs.map((tab) => {
          const isActive = selectedMetric === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSelectedMetric(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-md shadow-fuchsia-500/20'
                  : 'bg-slate-50 text-slate-600 hover:bg-purple-50 hover:text-purple-700 border border-slate-200/70'
              }`}
            >
              {tab.label}
            </button>
          );
        })}

        {/* Legend */}
        <div className="ml-auto hidden sm:flex items-center gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-600" />
            <span>Current Flight</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 border-t-2 border-dashed border-slate-400" />
            <span>Previous Period</span>
          </div>
        </div>
      </div>

      {/* Interactive Chart Canvas */}
      <div className="relative w-full h-[280px] sm:h-[320px] select-none mt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            {/* Area Gradient */}
            <linearGradient id="campaignAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.32" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
            </linearGradient>

            {/* Line Stroke Gradient */}
            <linearGradient id="campaignLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>

            <filter id="chartGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = height - paddingY - pct * (height - 2 * paddingY);
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                  strokeDasharray={idx === 0 ? undefined : '4 4'}
                />
              </g>
            );
          })}

          {/* Shaded Area */}
          <path d={areaPath} fill="url(#campaignAreaGradient)" />

          {/* Dotted Previous Period Line */}
          <path
            d={prevLine}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.65"
          />

          {/* Vibrant Current Line with Glow */}
          <path
            d={currentLine}
            fill="none"
            stroke="url(#campaignLineGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#chartGlow)"
          />

          {/* Interactive invisible hover columns & markers */}
          {currentCoords.map((coord, idx) => {
            const colWidth = (width - 2 * paddingX) / currentCoords.length;
            const isHovered = hoverIndex === idx;

            return (
              <g key={idx} onMouseEnter={() => setHoverIndex(idx)}>
                {/* Invisible hover capture rect */}
                <rect
                  x={coord.x - colWidth / 2}
                  y={0}
                  width={colWidth}
                  height={height}
                  fill="transparent"
                  className="cursor-pointer"
                />

                {/* Vertical cursor guide line when hovered */}
                {isHovered && (
                  <line
                    x1={coord.x}
                    y1={paddingY}
                    x2={coord.x}
                    y2={height - paddingY}
                    stroke="#EC4899"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Dot for Previous line */}
                {isHovered && (
                  <circle
                    cx={prevCoords[idx].x}
                    cy={prevCoords[idx].y}
                    r="4"
                    fill="#94A3B8"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                )}

                {/* Outer Ring & Core for Current Line */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={isHovered ? '6.5' : '3.5'}
                  fill="#EC4899"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  className="transition-all duration-150"
                />

                {/* X-Axis Month Label */}
                <text
                  x={coord.x}
                  y={height - 8}
                  textAnchor="middle"
                  className={`text-[10px] sm:text-[11px] font-semibold tracking-tight transition-colors ${
                    isHovered ? 'fill-fuchsia-600 font-bold' : 'fill-slate-400'
                  }`}
                >
                  {labels[idx]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Glassmorphic Tooltip */}
        {activePoint && hoverIndex !== null && (
          <div
            className="absolute z-20 pointer-events-none p-3 rounded-xl bg-white/95 backdrop-blur-md border border-purple-200 shadow-xl text-xs -translate-x-1/2 transition-all duration-75"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${Math.max(10, (activePoint.y / height) * 100 - 32)}%`,
            }}
          >
            <div className="flex items-center justify-between gap-3 pb-1 border-b border-slate-100">
              <span className="font-bold text-slate-800">{labels[hoverIndex]} 2026</span>
              <span className="text-[10px] font-medium text-purple-600 uppercase tracking-wider">
                {seriesData.label}
              </span>
            </div>
            <div className="mt-1.5 space-y-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500 font-medium">Current:</span>
                <span className="font-extrabold text-slate-900 tabular-nums">
                  {seriesData.format(activePoint.val)}
                </span>
              </div>
              {activePrevPoint && (
                <div className="flex items-center justify-between gap-4 text-slate-400 text-[11px]">
                  <span>Previous:</span>
                  <span className="font-mono tabular-nums">
                    {seriesData.format(activePrevPoint.val)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Summary KPI Footnotes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 mt-3 border-t border-slate-100 text-xs">
        <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100">
          <span className="text-slate-400 text-[11px] block">Peak Performance</span>
          <span className="text-sm font-bold text-purple-900 tabular-nums">
            {seriesData.format(Math.max(...seriesData.current))} (Dec)
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-pink-50/50 border border-pink-100">
          <span className="text-slate-400 text-[11px] block">Monthly Average</span>
          <span className="text-sm font-bold text-pink-900 tabular-nums">
            {seriesData.format(
              Math.round((seriesData.current.reduce((a, b) => a + b, 0) / 12) * 10) / 10
            )}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
          <span className="text-slate-400 text-[11px] block">Lift vs Prior Flight</span>
          <span className="text-sm font-bold text-blue-900 tabular-nums">
            +24.6% YoY
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
          <span className="text-slate-400 text-[11px] block">Efficiency Quality</span>
          <span className="text-sm font-bold text-emerald-900">
            Optimal (98.2%)
          </span>
        </div>
      </div>
    </div>
  );
};
