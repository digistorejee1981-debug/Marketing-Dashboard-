import React, { useState } from 'react';
import { X, FileSpreadsheet, Download, CheckCircle2, Calendar, FileText } from 'lucide-react';

interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportDone: (format: 'pdf' | 'csv' | 'xlsx') => void;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({
  isOpen,
  onClose,
  onExportDone,
}) => {
  const [format, setFormat] = useState<'pdf' | 'csv' | 'xlsx'>('pdf');
  const [range, setRange] = useState('Month to Date (June 2026)');
  const [includeAttribution, setIncludeAttribution] = useState(true);
  const [includeFunnel, setIncludeFunnel] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onExportDone(format);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#180E34] to-[#2A134D] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 text-white">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Generate Marketing Report</h3>
              <p className="text-xs text-purple-200">
                Download verified ROAS and conversion metrics
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
        <div className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-2">
              Export File Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'pdf', label: 'Executive PDF', desc: 'Presentation Ready' },
                { id: 'csv', label: 'Raw CSV', desc: 'Data Pipeline' },
                { id: 'xlsx', label: 'Excel (XLSX)', desc: 'Multi-Sheet' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFormat(item.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    format === item.id
                      ? 'bg-purple-50 border-purple-600 ring-2 ring-purple-400/20'
                      : 'bg-slate-50 border-slate-200 hover:border-purple-200'
                  }`}
                >
                  <span className="font-bold text-slate-900 block text-xs">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Reporting Time Window
            </label>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-hidden focus:border-purple-500"
            >
              <option value="Month to Date (June 2026)">Month to Date (June 2026)</option>
              <option value="Last 30 Days Trailing">Last 30 Days Trailing</option>
              <option value="Q2 Performance Flight">Q2 Performance Flight</option>
              <option value="Full Year 2026">Full Year 2026</option>
            </select>
          </div>

          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAttribution}
                onChange={(e) => setIncludeAttribution(e.target.checked)}
                className="w-4 h-4 rounded-sm text-purple-600 focus:ring-purple-500"
              />
              <span className="font-medium text-slate-700">
                Include Cross-Channel ROAS Attribution
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeFunnel}
                onChange={(e) => setIncludeFunnel(e.target.checked)}
                className="w-4 h-4 rounded-sm text-purple-600 focus:ring-purple-500"
              />
              <span className="font-medium text-slate-700">
                Include Stage-by-Stage Conversion Funnel
              </span>
            </label>
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
              type="button"
              disabled={isExporting}
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 font-bold text-white rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-indigo-600 hover:opacity-95 shadow-md shadow-fuchsia-500/25 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Generating...' : `Export ${format.toUpperCase()}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
