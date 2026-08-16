import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Coins,
  Wrench,
  Cpu,
  Layers,
  Wallet,
  ExternalLink,
  PlusCircle,
  FileCode
} from 'lucide-react';

export const AgentDetailDrawer: React.FC = () => {
  const {
    t,
    selectedAgent,
    isAgentDetailOpen,
    setIsAgentDetailOpen,
    setIsPublishWizardOpen,
    activeTask,
    assignAgentToTask,
    theme,
    locale
  } = useApp();

  if (!isAgentDetailOpen || !selectedAgent) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsAgentDetailOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Container */}
      <div
        id="agent-detail-drawer"
        className={`relative z-10 w-full max-w-2xl h-full overflow-y-auto border-l shadow-2xl transition-all flex flex-col justify-between ${
          isDark
            ? 'bg-[#0A1424] border-[#243550] text-[#F4F7FB]'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 border-b p-5 flex items-center justify-between backdrop-blur-md bg-inherit">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#36E4DA]">
              {t('agent_profile')}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#7568FF]/20 text-[#7568FF]">
              {selectedAgent.version}
            </span>
          </div>

          <button
            onClick={() => setIsAgentDetailOpen(false)}
            className="p-1.5 rounded-lg border border-slate-700/30 text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Identity Hero */}
          <div className="flex items-start gap-4">
            <img
              src={selectedAgent.avatar}
              alt={selectedAgent.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-700/50"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-xl">{selectedAgent.name}</h2>
                {selectedAgent.verified && (
                  <ShieldCheck className="w-5 h-5 text-[#35D07F]" title="Verified Agent" />
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono">{selectedAgent.handle} · {selectedAgent.category}</p>
              <div className="flex items-center gap-2 pt-1 font-mono-tabular">
                <span className="font-bold text-base text-[#FFC857]">
                  {selectedAgent.priceYD.toLocaleString()} YD
                </span>
                <span className="text-xs text-slate-400">
                  {selectedAgent.pricingModel === 'per_task' ? t('pricing_model_task') : t('pricing_model_hourly')}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-xs text-slate-300 leading-relaxed">
              {locale === 'zh-CN' && selectedAgent.descriptionZh
                ? selectedAgent.descriptionZh
                : selectedAgent.summary}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {selectedAgent.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[11px] px-2.5 py-1 rounded-md font-mono ${
                    isDark ? 'bg-[#111F34] text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Institutional Trust Panel */}
          <div
            className={`p-4 rounded-2xl border ${
              isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#35D07F]" />
              {t('trust_panel_title')}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2.5 rounded-xl border border-slate-700/20 bg-inherit">
                <p className="text-[10px] text-slate-400">{t('metric_completed')}</p>
                <p className="font-mono text-base font-bold mt-1">
                  {selectedAgent.metrics.completedTasks}
                </p>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-700/20 bg-inherit">
                <p className="text-[10px] text-slate-400">{t('metric_ontime')}</p>
                <p className="font-mono text-base font-bold text-[#35D07F] mt-1">
                  {selectedAgent.metrics.onTimeRate}%
                </p>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-700/20 bg-inherit">
                <p className="text-[10px] text-slate-400">{t('metric_rating')}</p>
                <p className="font-mono text-base font-bold text-[#FFC857] mt-1 flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#FFC857]" />
                  {selectedAgent.metrics.qualityRating}
                </p>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-700/20 bg-inherit">
                <p className="text-[10px] text-slate-400">{t('metric_dispute')}</p>
                <p className="font-mono text-base font-bold text-slate-300 mt-1">
                  {selectedAgent.metrics.disputeRate}%
                </p>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xs text-slate-300 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#7568FF]" />
              {t('capabilities_title')}
            </h3>
            <ul className="space-y-2 text-xs">
              {selectedAgent.capabilities.map((cap, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#36E4DA] shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Supported Tools */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xs text-slate-300 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#FFC857]" />
              {t('supported_tools_title')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedAgent.supportedTools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#111F34] border border-[#243550] text-[#36E4DA]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Runtime Constraints */}
          <div
            className={`p-4 rounded-2xl border text-xs space-y-2 ${
              isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <h3 className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider mb-2 font-mono">
              {t('runtime_constraints_title')}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono-tabular">
              <div>
                <span className="text-slate-400">{t('max_steps')}:</span>{' '}
                <span className="font-semibold">{selectedAgent.runtimeConstraints.maxSteps}</span>
              </div>
              <div>
                <span className="text-slate-400">{t('max_tokens')}:</span>{' '}
                <span className="font-semibold">{selectedAgent.runtimeConstraints.maxTokens.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400">{t('max_cost')}:</span>{' '}
                <span className="font-semibold text-[#FFC857]">{selectedAgent.runtimeConstraints.maxCostYD} YD</span>
              </div>
              <div>
                <span className="text-slate-400">{t('timeout_sec')}:</span>{' '}
                <span className="font-semibold">{selectedAgent.runtimeConstraints.timeoutSeconds}s</span>
              </div>
            </div>
          </div>

          {/* Author & Payout Wallet */}
          <div className="pt-2 border-t border-slate-700/20 flex items-center justify-between text-xs">
            <div>
              <p className="text-[10px] text-slate-400">{t('author_info_title')}</p>
              <p className="font-medium mt-0.5">{selectedAgent.author.name}</p>
            </div>
            <div className="text-right font-mono">
              <span className="text-[11px] text-slate-400">
                {selectedAgent.author.payoutWallet.substring(0, 8)}...
                {selectedAgent.author.payoutWallet.substring(selectedAgent.author.payoutWallet.length - 6)}
              </span>
            </div>
          </div>
        </div>

        {/* Sticky Footer Action */}
        <div className="sticky bottom-0 z-20 border-t p-4 flex items-center justify-between gap-3 backdrop-blur-md bg-inherit">
          <div>
            <span className="text-xs text-slate-400 block">{t('reward_yd_label')}</span>
            <span className="font-mono font-bold text-base text-[#FFC857]">
              {selectedAgent.priceYD.toLocaleString()} YD
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsAgentDetailOpen(false);
                setIsPublishWizardOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#7568FF] text-white hover:bg-[#6355E0] transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              {t('invite_agent')}
            </button>

            {activeTask && activeTask.status === 'open' && (
              <button
                onClick={() => {
                  assignAgentToTask(activeTask.id, selectedAgent);
                  setIsAgentDetailOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#36E4DA] text-[#07111F] hover:bg-[#36E4DA]/90 transition-colors"
              >
                {t('select_agent')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
