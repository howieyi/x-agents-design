import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  Star,
  CheckCircle2,
  Trash2,
  Cpu,
  Wrench,
  Coins,
  ArrowRight
} from 'lucide-react';

export const CompareAgentsDrawer: React.FC = () => {
  const {
    t,
    compareAgents,
    removeFromCompare,
    clearCompare,
    isCompareOpen,
    setIsCompareOpen,
    activeTask,
    assignAgentToTask,
    theme,
    locale
  } = useApp();

  if (!isCompareOpen || compareAgents.length === 0) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsCompareOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div
        id="compare-agents-modal"
        className={`relative z-10 w-full max-w-5xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isDark
            ? 'bg-[#0E1628] border-[#1F2D4A] text-[#F8FAFC]'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between border-slate-700/20">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#6366F1]">
              {t('compare_drawer_title')}
            </span>
            <h3 className="font-display font-bold text-base mt-0.5">
              {compareAgents.length} Candidates Selected
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs text-rose-400 hover:underline mr-2"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-1.5 rounded-lg border border-slate-700/30 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Matrix Comparison Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {compareAgents.map((agent) => (
              <div
                key={agent.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                  isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={agent.avatar}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="font-semibold text-xs">{agent.name}</h4>
                          {agent.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">{agent.version}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCompare(agent.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Pricing */}
                  <div className="p-3 rounded-xl bg-inherit border border-slate-700/30 text-center mb-3">
                    <span className="text-[11px] text-slate-400 uppercase font-mono">Price Rate</span>
                    <p className="font-mono font-bold text-lg text-[#F59E0B] mt-0.5">
                      {agent.priceYD.toLocaleString()} YD
                    </p>
                  </div>

                  {/* Trust Metrics Table */}
                  <div className="space-y-2 text-xs font-mono-tabular">
                    <div className="flex justify-between py-1 border-b border-slate-700/20">
                      <span className="text-slate-400">{t('metric_completed')}</span>
                      <span className="font-semibold">{agent.metrics.completedTasks}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-700/20">
                      <span className="text-slate-400">{t('metric_ontime')}</span>
                      <span className="font-semibold text-[#10B981]">{agent.metrics.onTimeRate}%</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-700/20">
                      <span className="text-slate-400">{t('metric_rating')}</span>
                      <span className="font-semibold text-[#F59E0B] flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#F59E0B]" /> {agent.metrics.qualityRating}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-700/20">
                      <span className="text-slate-400">{t('metric_dispute')}</span>
                      <span className="font-semibold text-slate-300">{agent.metrics.disputeRate}%</span>
                    </div>
                  </div>

                  {/* Key Tools */}
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[11px] font-mono uppercase text-slate-400">Supported Tools</span>
                    <div className="flex flex-wrap gap-1">
                      {agent.supportedTools.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-1.5 py-0.5 rounded font-mono bg-[#132036] text-[#0284C7]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Assign Button */}
                <button
                  onClick={() => {
                    if (activeTask) {
                      assignAgentToTask(activeTask.id, agent);
                      setIsCompareOpen(false);
                    }
                  }}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-[#0284C7] text-[#0A101F] hover:bg-[#0284C7]/90 transition-colors shadow-sm"
                >
                  {t('btn_assign_agent')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
