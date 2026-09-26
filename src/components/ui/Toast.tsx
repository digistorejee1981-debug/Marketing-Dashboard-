import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className="pointer-events-auto flex items-start gap-3 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-purple-100 shadow-xl animate-in slide-in-from-bottom-2 fade-in duration-200">
      <div className="mt-0.5 shrink-0">
        {toast.type === 'warning' ? (
          <AlertCircle className="w-5 h-5 text-amber-500" />
        ) : toast.type === 'info' ? (
          <Info className="w-5 h-5 text-blue-500" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        )}
      </div>

      <div className="flex-1 text-xs min-w-0">
        <span className="font-bold text-slate-900 block leading-tight">{toast.title}</span>
        {toast.message && (
          <span className="text-slate-500 text-[11px] block mt-0.5 leading-snug">
            {toast.message}
          </span>
        )}
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
