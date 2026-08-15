import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast, theme } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        const isDark = theme === 'dark';
        const bgClass = isDark
          ? 'bg-[#111F34] border-[#243550] text-[#F4F7FB]'
          : 'bg-white border-slate-200 text-slate-900 shadow-xl';

        const iconMap = {
          success: <CheckCircle2 className="w-5 h-5 text-[#35D07F] shrink-0" />,
          info: <Info className="w-5 h-5 text-[#36E4DA] shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-[#F6A63B] shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-[#FF647C] shrink-0" />
        };

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 shadow-2xl ${bgClass}`}
          >
            {iconMap[toast.type]}
            <p className="text-sm font-medium leading-tight flex-1">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 p-0.5 rounded transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
