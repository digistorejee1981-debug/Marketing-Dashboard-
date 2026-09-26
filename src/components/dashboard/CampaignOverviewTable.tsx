import React, { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  ArrowUpDown,
  Eye,
  Edit2,
  Copy,
  Trash2,
  Plus,
  Play,
  Pause,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { Campaign, CampaignStatus, AdPlatform } from '../../types/marketing';

interface CampaignOverviewTableProps {
  campaigns: Campaign[];
  onToggleStatus: (id: string) => void;
  onViewDetails: (campaign: Campaign) => void;
  onEditCampaign: (campaign: Campaign) => void;
  onDuplicateCampaign: (campaign: Campaign) => void;
  onDeleteCampaign: (id: string) => void;
  onOpenCreateModal: () => void;
}

export const CampaignOverviewTable: React.FC<CampaignOverviewTableProps> = ({
  campaigns,
  onToggleStatus,
  onViewDetails,
  onEditCampaign,
  onDuplicateCampaign,
  onDeleteCampaign,
  onOpenCreateModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | CampaignStatus>('All');
  const [sortField, setSortField] = useState<keyof Campaign>('roas');
  const [sortAsc, setSortAsc] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Status Filter options
  const filterTabs: ('All' | CampaignStatus)[] = ['All', 'Active', 'Paused', 'Completed', 'Draft'];

  const handleSort = (field: keyof Campaign) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Filter & Sort
  const filteredCampaigns = campaigns
    .filter((camp) => {
      const matchesSearch =
        camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || camp.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const valA = a[sortField] ?? 0;
      const valB = b[sortField] ?? 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  const getPlatformBadge = (platform: AdPlatform) => {
    switch (platform) {
      case 'Meta':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Meta Ads
          </span>
        );
      case 'Google':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Google Ads
          </span>
        );
      case 'Instagram':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-600" />
            Instagram
          </span>
        );
      case 'YouTube':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-700 border border-red-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            YouTube
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/60">
            {platform}
          </span>
        );
    }
  };

  const getStatusBadge = (status: CampaignStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case 'Paused':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Pause className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
            Paused
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <CheckCircle2 className="w-3 h-3 text-slate-500" />
            Completed
          </span>
        );
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Clock className="w-3 h-3 text-purple-500" />
            Draft
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-purple-100/80 shadow-xs overflow-hidden">
      {/* Table Header & Search Controls */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Campaign Overview
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-purple-100 text-purple-700">
              {filteredCampaigns.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time live flight status, spend pacing, and omni-channel ROAS telemetry.
          </p>
        </div>

        {/* Filter tabs and search */}
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-2.5">
          {/* Status Segmented Filter */}
          <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 shadow-inner">
            {filterTabs.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === status
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-purple-500 focus:ring-2 focus:ring-purple-200 w-36 sm:w-44 transition-all"
            />
          </div>

          {/* Create Button */}
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-indigo-600 hover:opacity-95 shadow-md shadow-fuchsia-500/25 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* Table Body (Desktop & Tablet) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
              <th
                onClick={() => handleSort('name')}
                className="py-3 px-5 cursor-pointer hover:text-purple-700"
              >
                <div className="flex items-center gap-1.5">
                  Campaign
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4">Platform</th>
              <th
                onClick={() => handleSort('budget')}
                className="py-3 px-4 text-right cursor-pointer hover:text-purple-700"
              >
                <div className="flex items-center justify-end gap-1.5">
                  Budget
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('spend')}
                className="py-3 px-4 text-right cursor-pointer hover:text-purple-700"
              >
                <div className="flex items-center justify-end gap-1.5">
                  Spend
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('ctr')}
                className="py-3 px-4 text-right cursor-pointer hover:text-purple-700"
              >
                <div className="flex items-center justify-end gap-1.5">
                  CTR
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('conversions')}
                className="py-3 px-4 text-right cursor-pointer hover:text-purple-700"
              >
                <div className="flex items-center justify-end gap-1.5">
                  Conversions
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('roas')}
                className="py-3 px-4 text-right cursor-pointer hover:text-purple-700"
              >
                <div className="flex items-center justify-end gap-1.5">
                  ROAS
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
            {filteredCampaigns.map((camp) => {
              const spendPct = Math.min(100, Math.round((camp.spend / camp.budget) * 100));
              const isMenuActive = activeMenuId === camp.id;

              return (
                <tr
                  key={camp.id}
                  className="hover:bg-purple-50/30 transition-colors group"
                >
                  {/* Campaign Name & Thumbnail */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      {camp.image ? (
                        <img
                          src={camp.image}
                          alt={camp.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-purple-100 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                          {camp.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors truncate">
                          {camp.name}
                        </span>
                        <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          {camp.targetAudience}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Platform */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getPlatformBadge(camp.platform)}
                  </td>

                  {/* Budget */}
                  <td className="py-3.5 px-4 text-right font-semibold text-slate-800 tabular-nums whitespace-nowrap">
                    ₹{camp.budget.toLocaleString('en-IN')}
                  </td>

                  {/* Spend + Progress bar */}
                  <td className="py-3.5 px-4 text-right tabular-nums whitespace-nowrap">
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-purple-900">
                        ₹{camp.spend.toLocaleString('en-IN')}
                      </span>
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            spendPct > 90
                              ? 'bg-rose-500'
                              : spendPct > 70
                              ? 'bg-gradient-to-r from-purple-600 to-pink-500'
                              : 'bg-indigo-500'
                          }`}
                          style={{ width: `${spendPct}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* CTR */}
                  <td className="py-3.5 px-4 text-right font-bold text-slate-800 tabular-nums whitespace-nowrap">
                    {camp.ctr.toFixed(1)}%
                  </td>

                  {/* Conversions */}
                  <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 tabular-nums whitespace-nowrap">
                    {camp.conversions.toLocaleString()}
                  </td>

                  {/* ROAS */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className="inline-block px-2.5 py-1 rounded-lg font-black text-xs tabular-nums bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                      {camp.roas.toFixed(1)}x
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    {getStatusBadge(camp.status)}
                  </td>

                  {/* Actions Column */}
                  <td className="py-3.5 px-5 text-right whitespace-nowrap relative">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onViewDetails(camp)}
                        title="View Performance Analytics"
                        className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-100/60 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditCampaign(camp)}
                        title="Edit Campaign Settings"
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-100/60 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleStatus(camp.id)}
                        title={camp.status === 'Active' ? 'Pause Campaign' : 'Activate Campaign'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          camp.status === 'Active'
                            ? 'text-amber-500 hover:bg-amber-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        {camp.status === 'Active' ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>

                      {/* More Menu Toggle */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveMenuId(isMenuActive ? null : camp.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {isMenuActive && (
                          <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-purple-100 p-1.5 z-30 text-left animate-in fade-in duration-100">
                            <button
                              onClick={() => {
                                onDuplicateCampaign(camp);
                                setActiveMenuId(null);
                              }}
                              className="flex items-center gap-2 w-full px-2.5 py-1.5 text-xs text-slate-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg font-medium"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              Duplicate Flight
                            </button>
                            <button
                              onClick={() => {
                                onDeleteCampaign(camp.id);
                                setActiveMenuId(null);
                              }}
                              className="flex items-center gap-2 w-full px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove Campaign
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filteredCampaigns.length === 0 && (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Filter className="w-6 h-6 text-purple-300" />
                    <p className="text-sm font-semibold text-slate-700">No campaigns found</p>
                    <p className="text-xs text-slate-400">
                      Try adjusting your search query or status filter.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
