import React, { useState } from 'react';
import { X, Megaphone, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { AdPlatform } from '../../types/marketing';

interface CreateAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdCreated: (adName: string) => void;
}

export const CreateAdModal: React.FC<CreateAdModalProps> = ({
  isOpen,
  onClose,
  onAdCreated,
}) => {
  const [headline, setHeadline] = useState('');
  const [primaryText, setPrimaryText] = useState('Exclusive Summer Collection | Flat 30% OFF with code SUMMER30');
  const [cta, setCta] = useState('Shop Now');
  const [platform, setPlatform] = useState<AdPlatform>('Instagram');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim()) return;
    onAdCreated(headline);
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
              <h3 className="text-base font-bold">Create Ad Creative</h3>
              <p className="text-xs text-purple-200">
                Generate high-converting creative copy & call-to-actions
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
              Ad Headline *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Elevate Your Summer Wardrobe in 48 Hours"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Primary Ad Copy Text
            </label>
            <textarea
              rows={2}
              value={primaryText}
              onChange={(e) => setPrimaryText(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as AdPlatform)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:border-purple-500"
              >
                <option value="Instagram">Instagram Reels / Feed</option>
                <option value="Meta">Facebook Feeds</option>
                <option value="Google">Google Responsive Display</option>
                <option value="YouTube">YouTube Shorts / In-Stream</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Call to Action Button
              </label>
              <select
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-hidden focus:border-purple-500"
              >
                <option value="Shop Now">Shop Now</option>
                <option value="Order Now">Order Now</option>
                <option value="Claim Offer">Claim Offer</option>
                <option value="Learn More">Learn More</option>
              </select>
            </div>
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
              Save Creative
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
