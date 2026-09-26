import React, { useState } from 'react';
import {
  CreditCard,
  Eye,
  MousePointerClick,
  Percent,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { KpiMetric } from '../../types/marketing';

interface KpiCardsProps {
  metrics: KpiMetric[];
}

export const KpiCards: React.FC<KpiCardsProps> = ({ metrics }) => {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard':
        return CreditCard;
      case 'Eye':
        return Eye;
      case 'MousePointerClick':
        return MousePointerClick;
      case 'Percent':
        return Percent;
      case 'ShoppingBag':
        return ShoppingBag;
      case 'TrendingUp':
      default:
        return TrendingUp;
    }
  };

  // Generate SVG path for sparkline
  const generateSparklinePath = (points: number[], width = 120, height = 40) => {
    if (!points || points.length < 2) return { linePath: '', areaPath: '' };
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    const coords = points.map((val, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 8) - 4;
      return { x, y };
    });

    // Generate smooth bezier curve path
    let linePath = `M ${coords[0].x},${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const current = coords[i];
      const next = coords[i + 1];
      const cpX = (current.x + next.x) / 2;
      linePath += ` C ${cpX},${current.y} ${cpX},${next.y} ${next.x},${next.y}`;
    }

    const areaPath = `${linePath} L ${coords[coords.length - 1].x},${height} L 0,${height} Z`;

    return { linePath, areaPath };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((item) => {
        const Icon = getIcon(item.iconName);
        const { linePath, areaPath } = generateSparklinePath(item.sparkline);
        const isHovered = hoveredMetric === item.id;

        return (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredMetric(item.id)}
            onMouseLeave={() => setHoveredMetric(null)}
            className={`group relative overflow-hidden rounded-2xl p-4.5 bg-white border border-purple-100/70 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
          >
            {/* Ambient Background Gradient Accent */}
            <div
              className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${item.gradient} opacity-15 blur-2xl group-hover:opacity-30 group-hover:scale-125 transition-all duration-500`}
            />

            {/* Top row: Label + Icon */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-slate-500 tracking-wide truncate">
                {item.label}
              </span>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr ${item.gradient} text-white shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300 shrink-0`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Middle row: Large Metric Value */}
            <div className="mb-2">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 tabular-nums">
                {item.value}
              </span>
            </div>

            {/* Bottom row: Percentage change + Sparkline Chart */}
            <div className="flex items-end justify-between gap-2 pt-1">
              <div className="flex items-center gap-1">
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                    item.isPositive ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {item.isPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  {item.change}
                </span>
                <span className="text-[10px] text-slate-400 font-medium hidden xs:inline">
                  vs prev
                </span>
              </div>

              {/* Sparkline Graphic */}
              <div className="w-20 h-9 shrink-0 relative">
                <svg
                  viewBox="0 0 120 40"
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={`spark-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9333EA" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#9333EA" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Shaded Area */}
                  <path d={areaPath} fill={`url(#spark-${item.id})`} />
                  {/* Glowing Stroke */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke={isHovered ? '#EC4899' : '#9333EA'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-colors duration-200"
                  />
                  {/* Sparkline end dot */}
                  {item.sparkline.length > 0 && (
                    <circle
                      cx="120"
                      cy="8"
                      r={isHovered ? '3.5' : '2.5'}
                      fill={isHovered ? '#EC4899' : '#9333EA'}
                      className="transition-all duration-200"
                    />
                  )}
                </svg>
              </div>
            </div>

            {/* Subtle bottom border accent line */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
          </div>
        );
      })}
    </div>
  );
};
