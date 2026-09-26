import React, { useState } from 'react';
import { X, Users, Sparkles, MapPin, Smartphone } from 'lucide-react';

interface AddAudienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAudienceAdded: (name: string) => void;
}

export const AddAudienceModal: React.FC<AddAudienceModalProps> = ({
  isOpen,
  onClose,
  onAudienceAdded,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Lookalike 2% Highest LTV');
  const [location, setLocation] = useState('Tier 1 & Tier 2 Metros (India)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAudienceAdded(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#180E34] to-[#2A134D] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 text-white">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Add Custom Audience</h3>
              <p className="text-xs text-purple-200">
                Segment high-intent buyers & lookalikes
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
              Audience Segment Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. VIP Repeat Buyers (3+ Orders)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Cohort Strategy Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:border-purple-500"
            >
              <option value="Lookalike 2% Highest LTV">Lookalike 2% Highest LTV Buyers</option>
              <option value="Cart Abandoners (7-14 Days)">Cart Abandoners (7-14 Days)</option>
              <option value="Past Customers 90 Days Reactivation">Past Customers 90 Days Reactivation</option>
              <option value="High-Frequency Video Viewers (75%+ Watch)">High-Frequency Video Viewers (75%+ Watch)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Geographic Region
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:border-purple-500"
            />
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
              Save Audience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
