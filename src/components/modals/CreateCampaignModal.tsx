import React, { useState } from 'react';
import { X, Sparkles, Megaphone, Calendar, IndianRupee, Target } from 'lucide-react';
import { AdPlatform, Campaign } from '../../types/marketing';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (campaign: Partial<Campaign>) => void;
}

export const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState<AdPlatform>('Meta');
  const [budget, setBudget] = useState(50000);
  const [targetAudience, setTargetAudience] = useState('High-Intent Fashion Shoppers (20-35)');
  const [objective, setObjective] = useState('Catalog Sales & Direct Purchases');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreate({
      name,
      platform,
      budget: Number(budget),
      spend: 0,
      impressions: 0,
      clicks: 0,
      ctr: 4.8,
      conversions: 0,
      roas: 5.2,
      cpc: 1.05,
      status: 'Active',
      startDate: new Date().toISOString().split('T')[0],
      targetAudience,
      objective,
    });
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#180E34] to-[#2A134D] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 text-white">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Create New Campaign</h3>
              <p className="text-xs text-purple-200">
                Deploy cross-platform ad flights with AI budget optimization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-purple-300 hover:text-white rounded-lg hover:bg-purple-900/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Campaign Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Diwali Mega Fest / Monsoons Promo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Ad Network Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as AdPlatform)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:border-purple-500"
              >
                <option value="Meta">Meta Ads (FB / IG)</option>
                <option value="Google">Google Search & Shopping</option>
                <option value="Instagram">Instagram Reels Dedicated</option>
                <option value="YouTube">YouTube Shorts / In-Feed</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Budget (₹ INR) *
              </label>
              <input
                type="number"
                min="1000"
                step="1000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Campaign Objective
            </label>
            <input
              type="text"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:border-purple-500"
            />
          </div>

          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200/60 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="text-[11px] text-purple-900">
              NexusPulse auto-allocates spend using smart bidding with 4.8x ROAS guardrails.
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold rounded-xl hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold text-white rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-indigo-600 hover:opacity-95 shadow-md shadow-fuchsia-500/25"
            >
              Launch Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
