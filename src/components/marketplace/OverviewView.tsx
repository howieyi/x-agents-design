import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  PlusCircle,
  Sparkles,
  ShieldCheck,
  Coins,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Layers,
  Bot
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const {
    t,
    tasks,
    agents,
    transactions,
    ydBalance,
    activeWallet,
    setActiveTab,
    setIsPublishWizardOpen,
    setSelectedAgent,
    setIsAgentDetailOpen,
    setActiveTaskId,
    openCheckoutForTask,
    theme,
    locale
  } = useApp();

  const isDark = theme === 'dark';

  const totalEscrowLocked = tasks.reduce((sum, task) => {
    if (['open', 'assigned', 'in_progress', 'submitted'].includes(task.status)) {
      return sum + task.rewardYD;
    }
    return sum;
  }, 0);

  const activeTasks = tasks.filter((t) => t.status !== 'settled' && t.status !== 'draft');
  const recommendedAgents = agents.slice(0, 3);

  const statusBadge = (status: string) => {
    const config: Record<string, { label: string; bg: string; text: string }> = {
      submitted: { label: t('status_submitted'), bg: 'bg-[#FFC857]/15', text: 'text-[#FFC857]' },
      in_progress: { label: t('status_in_progress'), bg: 'bg-[#7568FF]/15', text: 'text-[#7568FF]' },
      open: { label: t('status_open'), bg: 'bg-[#36E4DA]/15', text: 'text-[#36E4DA]' },
      assigned: { label: t('status_assigned'), bg: 'bg-indigo-500/15', text: 'text-indigo-400' },
      disputed: { label: t('status_disputed'), bg: 'bg-[#FF647C]/15', text: 'text-[#FF647C]' }
    };
    const c = config[status] || { label: status, bg: 'bg-slate-500/10', text: 'text-slate-400' };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div
        id="overview-hero"
        className={`relative overflow-hidden rounded-2xl border p-6 lg:p-8 transition-colors ${
          isDark
            ? 'bg-gradient-to-r from-[#0C1728] via-[#111F34] to-[#0C1728] border-[#243550]'
            : 'bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-cyan-500/10 border-sky-200'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#36E4DA]/15 text-[#36E4DA] font-semibold">
                {activeWallet.name}
              </span>
              <span className="text-xs text-slate-400">· Nexus Trading Corp</span>
            </div>
            <h1 className="font-display font-bold text-2xl lg:text-3xl tracking-tight leading-tight">
              {t('welcome_title')}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              {t('welcome_subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="btn-overview-publish"
              onClick={() => setIsPublishWizardOpen(true)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#36E4DA] text-[#07111F] hover:bg-[#2bc4bb] transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              {t('publish_task_btn')}
            </button>
            <button
              id="btn-overview-browse"
              onClick={() => setActiveTab('agents')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 cursor-pointer ${
                isDark
                  ? 'border-[#243550] bg-[#111F34] hover:bg-[#152744] text-slate-200'
                  : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Bot className="w-4 h-4 text-[#7568FF]" />
              {t('browse_agents_btn')}
            </button>
          </div>
        </div>

        {/* Ambient subtle cyan glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#36E4DA]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-xl border transition-colors ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>{t('stat_active_tasks')}</span>
            <Layers className="w-4 h-4 text-[#36E4DA]" />
          </div>
          <p className="font-display text-2xl font-bold font-mono-tabular">{activeTasks.length}</p>
          <p className="text-[11px] text-[#35D07F] font-medium mt-1">
            {locale === 'zh-CN' ? '全部由智能合约监控' : 'All monitored by Escrow'}
          </p>
        </div>

        <div
          className={`p-4 rounded-xl border transition-colors ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>{t('stat_funded_escrow')}</span>
            <Coins className="w-4 h-4 text-[#FFC857]" />
          </div>
          <p className="font-display text-2xl font-bold font-mono-tabular text-[#FFC857]">
            {totalEscrowLocked.toLocaleString()}{' '}
            <span className="text-xs font-sans font-normal opacity-80">YD</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono-tabular">≈ ${(totalEscrowLocked * 1.0).toLocaleString()} USD</p>
        </div>

        <div
          className={`p-4 rounded-xl border transition-colors ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>{t('stat_matched_agents')}</span>
            <Bot className="w-4 h-4 text-[#7568FF]" />
          </div>
          <p className="font-display text-2xl font-bold font-mono-tabular">{agents.length}</p>
          <p className="text-[11px] text-[#36E4DA] font-medium mt-1">100% {t('status_badge_verified')}</p>
        </div>

        <div
          className={`p-4 rounded-xl border transition-colors ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>{t('stat_dispute_rate')}</span>
            <ShieldCheck className="w-4 h-4 text-[#35D07F]" />
          </div>
          <p className="font-display text-2xl font-bold font-mono-tabular text-[#35D07F]">0.42%</p>
          <p className="text-[11px] text-slate-400 mt-1">3/5 {locale === 'zh-CN' ? '多签仲裁机制' : 'Multisig Protocol'}</p>
        </div>
      </div>

      {/* Main Grid: Active Tasks Requiring Attention & Top Recommended Agents */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Tasks Requiring Action (7 cols) */}
        <div className="xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-base tracking-tight flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#36E4DA]" />
              {t('active_tasks_title')}
            </h2>
            <button
              onClick={() => setActiveTab('tasks')}
              className="text-xs text-[#36E4DA] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              {t('view_all')} ({tasks.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activeTasks.length === 0 ? (
              <div
                className={`p-8 text-center rounded-2xl border ${
                  isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
                }`}
              >
                <p className="text-xs text-slate-400">{t('no_active_tasks')}</p>
              </div>
            ) : (
              activeTasks.map((task) => (
                <div
                  key={task.id}
                  id={`overview-task-${task.id}`}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-[#0C1728] border-[#243550] hover:border-[#36E4DA]/50'
                      : 'bg-white border-slate-200 hover:border-sky-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-[11px] text-slate-400">#{task.id}</span>
                        <span className="text-xs text-slate-400">· {task.category}</span>
                        {statusBadge(task.status)}
                      </div>
                      <h3 className="font-semibold text-sm leading-snug hover:text-[#36E4DA] cursor-pointer"
                        onClick={() => {
                          setActiveTaskId(task.id);
                          setActiveTab('workspace');
                        }}
                      >
                        {task.title}
                      </h3>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-mono font-bold text-sm text-[#FFC857]">
                        {task.rewardYD.toLocaleString()} YD
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {task.stakeYD} YD {locale === 'zh-CN' ? '质押' : 'stake'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-700/20 text-xs flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      {task.assignedAgent ? (
                        <div className="flex items-center gap-1.5">
                          <img
                            src={task.assignedAgent.avatar}
                            alt=""
                            className="w-4 h-4 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                            {task.assignedAgent.name}
                          </span>
                        </div>
                      ) : (
                        <span>{locale === 'zh-CN' ? '等待 Agent 匹配' : 'Awaiting Match'}</span>
                      )}
                    </div>

                    <button
                      id={`btn-manage-task-${task.id}`}
                      onClick={() => {
                        setActiveTaskId(task.id);
                        setActiveTab('workspace');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                        task.status === 'submitted'
                          ? 'bg-[#35D07F] text-[#07111F] hover:bg-[#2eb970] font-bold'
                          : isDark
                          ? 'bg-[#111F34] hover:bg-[#172b49] text-[#36E4DA]'
                          : 'bg-sky-50 hover:bg-sky-100 text-sky-700'
                      }`}
                    >
                      {task.status === 'submitted'
                        ? locale === 'zh-CN' ? '审查交付物 & 验收' : 'Review & Settle'
                        : locale === 'zh-CN' ? '进入工作台' : 'Open Workspace'}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Recommended Agents with "Why this match" (5 cols) */}
        <div className="xl:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-base tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7568FF]" />
              {t('recommended_agents_title')}
            </h2>
            <button
              onClick={() => setActiveTab('agents')}
              className="text-xs text-[#7568FF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              {t('view_all')} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recommendedAgents.map((agent) => (
              <div
                key={agent.id}
                id={`overview-rec-agent-${agent.id}`}
                className={`p-4 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-[#0C1728] border-[#243550] hover:border-[#7568FF]/50'
                    : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-700/40 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-semibold text-xs truncate">{agent.name}</h4>
                      {agent.matchScore && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#7568FF]/20 text-[#7568FF] shrink-0">
                          {agent.matchScore}% {locale === 'zh-CN' ? '匹配' : 'match'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{agent.category}</p>
                  </div>
                </div>

                {/* Why this match reason box */}
                <div
                  className={`mt-2.5 p-2.5 rounded-xl text-[11px] border ${
                    isDark
                      ? 'bg-[#07111F] border-[#243550] text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <p className="leading-snug">
                    <span className="font-semibold text-[#7568FF] mr-1">Why match:</span>
                    {locale === 'zh-CN' ? agent.descriptionZh : agent.whyMatch}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-700/20 text-xs">
                  <span className="font-mono font-bold text-[#FFC857] text-xs">
                    {agent.priceYD.toLocaleString()} YD
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedAgent(agent);
                        setIsAgentDetailOpen(true);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                        isDark ? 'hover:bg-[#111F34] text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {t('view_details')}
                    </button>
                    <button
                      onClick={() => {
                        setIsPublishWizardOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#7568FF] text-white hover:bg-[#6456f0] transition-colors cursor-pointer"
                    >
                      {t('invite_agent')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Settlements / Activity */}
      <div
        className={`rounded-2xl border p-5 transition-colors ${
          isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-sm tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#35D07F]" />
            {t('recent_activity_title')}
          </h3>
          <button
            onClick={() => setActiveTab('payments')}
            className="text-xs text-[#36E4DA] hover:underline font-semibold cursor-pointer"
          >
            {t('view_all')} →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                <th className="pb-2 font-medium">{t('tx_hash')}</th>
                <th className="pb-2 font-medium">{t('tx_type')}</th>
                <th className="pb-2 font-medium">{t('tx_amount')}</th>
                <th className="pb-2 font-medium">{t('tx_status')}</th>
                <th className="pb-2 font-medium text-right">{t('tx_time')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-mono-tabular">
              {transactions.slice(0, 4).map((tx) => (
                <tr key={tx.id} className={isDark ? 'hover:bg-[#111F34]/50' : 'hover:bg-slate-50'}>
                  <td className="py-2.5 font-mono text-[11px] text-[#36E4DA]">
                    {tx.txHash.substring(0, 10)}...{tx.txHash.substring(tx.txHash.length - 6)}
                  </td>
                  <td className="py-2.5 capitalize">{tx.type.replace('_', ' ')}</td>
                  <td className="py-2.5 font-semibold text-[#FFC857]">
                    {tx.amountYD.toLocaleString()} YD
                  </td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#35D07F]/15 text-[#35D07F]">
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-right text-slate-400 text-[11px]">
                    {new Date(tx.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
