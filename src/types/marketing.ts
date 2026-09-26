export type TimeRange = 'today' | '7d' | '30d' | '3m' | '1y';

export type CampaignStatus = 'Active' | 'Paused' | 'Completed' | 'Draft';

export type AdPlatform = 'Meta' | 'Google' | 'Instagram' | 'YouTube' | 'TikTok';

export interface Campaign {
  id: string;
  name: string;
  platform: AdPlatform;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  roas: number;
  cpc: number;
  status: CampaignStatus;
  startDate: string;
  endDate?: string;
  image?: string;
  targetAudience: string;
  objective: string;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  change: string;
  isPositive: boolean;
  sparkline: number[];
  gradient: string;
  borderGlow: string;
  iconName: string;
  unit?: string;
}

export interface ChannelPerformance {
  id: string;
  name: string;
  platform: AdPlatform;
  spend: number;
  metrics: {
    primaryLabel: string;
    primaryValue: string;
    secondaryLabel: string;
    secondaryValue: string;
    ctr: string;
    conversions: string;
    roasOrCpc: string;
    roasOrCpcLabel: string;
  };
  colorGradient: string;
  trend: string;
  status: 'Connected' | 'Syncing' | 'Action Needed';
}

export interface FunnelStage {
  id: string;
  name: string;
  count: number;
  formattedCount: string;
  rateFromPrevious: number; // e.g. 100% or 4.41%
  percentageOfTop: number;
  dropOffRate?: number;
  color: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'alert' | 'success' | 'info' | 'warning';
  read: boolean;
}

export interface AudienceSegment {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ABTest {
  id: string;
  name: string;
  campaign: string;
  variantA: {
    name: string;
    conversions: number;
    ctr: number;
    roas: number;
  };
  variantB: {
    name: string;
    conversions: number;
    ctr: number;
    roas: number;
  };
  winner?: 'A' | 'B' | 'Inconclusive';
  confidence: number;
  status: 'Running' | 'Completed';
  daysLeft: number;
}
