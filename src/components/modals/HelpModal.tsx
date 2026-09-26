import React from 'react';
import { X, HelpCircle, BookOpen, Sparkles, TrendingUp, Percent, DollarSign } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const glossary = [
    {
      term: 'ROAS (Return on Ad Spend)',
      formula: 'Revenue Generated ÷ Total Ad Spend',
      desc: 'For example, 4.86x means every ₹1 spent in ads generated ₹4.86 in direct ecommerce customer orders.',
    },
    {
      term: 'CTR (Click-Through Rate)',
      formula: '(Total Clicks ÷ Impressions) × 100%',
      desc: 'Measures how compelling your creative hook and copy are. Industry benchmark is ~2.5% - 3.5%; NexusPulse currently tracks at 4.42%.',
    },
    {
      term: 'CPC (Cost Per Click)',
      formula: 'Ad Spend ÷ Number of Clicks',
      desc: 'The real-time clearing price in Meta and Google ad auctions. Decreases as your ad quality score climbs.',
    },
    {
      term: 'Conversion Funnel Pacing',
      formula: 'Checkout rate ÷ Add to Cart rate',
      desc: 'Monitors friction in checkout payment gates to prevent cart abandonment.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#180E34] to-[#2A134D] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 text-white">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Marketing Help & Knowledge</h3>
              <p className="text-xs text-purple-200">
                Ecommerce performance glossary & strategy benchmarks
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

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <div className="space-y-3">
            {glossary.map((item) => (
              <div
                key={item.term}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">{item.term}</span>
                  <span className="font-mono text-[10px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                    {item.formula}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200/70 flex items-center gap-2.5 text-purple-900">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="text-[11px]">
              Need live agency consultation or custom API integration support? Contact <strong>support@brandpulse.io</strong>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 font-bold text-white rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 shadow-md shadow-purple-500/20 text-xs"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
