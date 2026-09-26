import React, { useState } from 'react';
import { X, Wallet, TrendingUp, Sparkles, Check } from 'lucide-react';

interface IncreaseBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBudget: number;
  onSaveBudget: (newBudget: number) => void;
}

export const IncreaseBudgetModal: React.FC<IncreaseBudgetModalProps> = ({
  isOpen,
  onClose,
  currentBudget,
  onSaveBudget,
}) => {
  const [addition, setAddition] = useState<number>(50000);

  if (!isOpen) return null;

  const presetAmounts = [25000, 50000, 100000, 200000];
  const newTotal = currentBudget + addition;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBudget(newTotal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#180E34] to-[#2A134D] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 text-white">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Increase Marketing Budget</h3>
              <p className="text-xs text-purple-200">
                Unlock higher ROAS throughput for active ad sets
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
        <form onSubmit={handleApply} className="p-5 space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-[11px] block">Current Monthly Allocation</span>
              <span className="text-base font-extrabold text-slate-900 tabular-nums">
                ₹{currentBudget.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-right">
              <span className="text-purple-600 text-[11px] font-bold block">New Projected Cap</span>
              <span className="text-base font-extrabold text-purple-900 tabular-nums">
                ₹{newTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-2">
              Select Additional Budget Amount
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presetAmounts.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setAddition(amt)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    addition === amt
                      ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300'
                  }`}
                >
                  +₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Custom Top-Up (₹ INR)
            </label>
            <input
              type="number"
              step="5000"
              value={addition}
              onChange={(e) => setAddition(Math.max(0, Number(e.target.value)))}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:outline-hidden focus:border-purple-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2 text-emerald-800">
            <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-[11px]">
              Estimated revenue impact: <strong>+₹{(addition * 4.86).toLocaleString('en-IN')}</strong> at current 4.86x ROAS.
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
              Confirm & Top-Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
