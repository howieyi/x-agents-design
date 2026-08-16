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
  Bot,
  Zap,
  TrendingUp
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
    setSelectedAgentForPublish,
    setIsAgentDetailOpen,
    setActiveTaskId,
    openCheckoutForTask,
    theme,
    locale
  } = useApp();

  const isDark = theme === 'dark';

  const totalEscrowLocked = tasks.reduce((sum, task) => {
    if (['open', 'matching', 'assigned', 'in_progress', 'submitted'].includes(task.status)) {
      return sum + task.rewardYD;
    }
    return sum;
  }, 0);

  const activeTasks = tasks.filter((t) => t.status !== 'settled' && t.status !== 'draft');
  const recommendedAgents = agents.slice(0, 3);

  const statusBadge = (status: string) => {
    const config: Record<string, { label: string; bg: string; text: string; border: string }> = {
      submitted: { label: t('status_submitted'), bg: isDark ? 'bg-amber-500/15' : 'bg-amber-100', text: isDark ? 'text-amber-300' : 'text-amber-800', border: 'border-amber-500/30' },
      in_progress: { label: t('status_in_progress'), bg: isDark ? 'bg-purple-500/15' : 'bg-purple-100', text: isDark ? 'text-purple-300' : 'text-purple-800', border: 'border-purple-500/30' },
      open: { label: t('status_open'), bg: isDark ? 'bg-indigo-500/15' : 'bg-indigo-100', text: isDark ? 'text-indigo-300' : 'text-indigo-800', border: 'border-indigo-500/30' },
      matching: { label: t('status_matching'), bg: isDark ? 'bg-cyan-500/15' : 'bg-cyan-100', text: isDark ? 'text-cyan-300' : 'text-cyan-800', border: 'border-cyan-500/30' },
      assigned: { label: t('status_assigned'), bg: isDark ? 'bg-violet-500/15' : 'bg-violet-100', text: isDark ? 'text-violet-300' : 'text-violet-800', border: 'border-violet-500/30' },
      disputed: { label: t('status_disputed'), bg: isDark ? 'bg-rose-500/15' : 'bg-rose-100', text: isDark ? 'text-rose-300' : 'text-rose-800', border: 'border-rose-500/30' }
    };
    const c = config[status] || { label: status, bg: isDark ? 'bg-slate-500/10' : 'bg-slate-100', text: isDark ? 'text-slate-400' : 'text-slate-700', border: 'border-slate-300' };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${c.bg} ${c.text} ${c.border}`}>
        {c.label}
      </span>
    );
  };

  const openTaskWorkspace = (taskId: string) => {
    setActiveTaskId(taskId);
    setActiveTab('workspace');
  };

  const openTaskMatching = (taskId: string) => {
    setActiveTaskId(taskId);
    setActiveTab('matching');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div
        id="overview-hero"
        className={`relative overflow-hidden rounded-3xl border p-6 lg:p-8 transition-all shadow-xl ${
          isDark
            ? 'bg-gradient-to-r from-[#101A2E] via-[#16233C] to-[#101A2E] border-purple-900/50 shadow-purple-950/40'
            : 'bg-gradient-to-r from-purple-100/90 via-white to-indigo-50/90 border-purple-200 shadow-purple-500/10'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-bold">
                {activeWallet.name}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">· Nexus Autonomous Swarm Workspace</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl lg:text-3xl tracking-tight leading-tight text-slate-900 dark:text-white">
              {t('welcome_title')}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {t('welcome_subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="btn-overview-publish"
              onClick={() => setIsPublishWizardOpen(true)}
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#2563EB] via-[#4F8EF7] to-[#06B6D4] hover:from-[#4F8EF7] hover:to-[#22D3EE] text-white shadow-lg shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              {t('publish_task_btn')}
            </button>
            <button
              id="btn-overview-browse"
              onClick={() => setActiveTab('agents')}
              className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                isDark
                  ? 'border-purple-900/60 bg-[#0A101F] hover:bg-[#16233C] text-purple-200 hover:border-purple-500'
                  : 'border-purple-200 bg-white hover:bg-purple-50 text-purple-900 shadow-xs'
              }`}
            >
              <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              {t('browse_agents_btn')}
            </button>
          </div>
        </div>

        {/* Ambient subtle radiant purple glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-5 rounded-2xl border transition-all shadow-md ${
            isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-purple-500/5'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1.5 font-medium">
            <span>{t('stat_active_tasks')}</span>
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-extrabold font-mono-tabular text-slate-900 dark:text-white">{activeTasks.length}</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3" />
            {locale === 'zh-CN' ? '全部由智能合约监控' : 'All monitored by Escrow'}
          </p>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all shadow-md ${
            isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-purple-500/5'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1.5 font-medium">
            <span>{t('stat_funded_escrow')}</span>
            <Coins className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-extrabold font-mono-tabular text-amber-500 dark:text-amber-400">
            {totalEscrowLocked.toLocaleString()}{' '}
            <span className="text-xs font-sans font-normal opacity-80">YD</span>
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono-tabular">≈ ${(totalEscrowLocked * 1.0).toLocaleString()} USD</p>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all shadow-md ${
            isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-purple-500/5'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1.5 font-medium">
            <span>{t('stat_matched_agents')}</span>
            <Bot className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-extrabold font-mono-tabular text-indigo-600 dark:text-indigo-400">{agents.length}</p>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-1 font-mono">100% {t('status_badge_verified')}</p>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all shadow-md ${
            isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-purple-500/5'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1.5 font-medium">
            <span>{t('stat_dispute_rate')}</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-extrabold font-mono-tabular text-emerald-600 dark:text-emerald-400">0.42%</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">3/5 {locale === 'zh-CN' ? '多签仲裁机制' : 'Multisig Protocol'}</p>
        </div>
      </div>

      {/* Main Grid: Active Tasks Requiring Attention & Top Recommended Agents */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Tasks Requiring Action (7 cols) */}
        <div className="xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base tracking-tight flex items-center gap-2 text-slate-900 dark:text-white">
              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              {t('active_tasks_title')}
            </h2>
            <button
              onClick={() => setActiveTab('tasks')}
              className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 font-bold cursor-pointer"
            >
              {t('view_all')} ({tasks.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activeTasks.length === 0 ? (
              <div
                className={`p-8 text-center rounded-2xl border ${
                  isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100'
                }`}
              >
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('no_active_tasks')}</p>
              </div>
            ) : (
              activeTasks.map((task) => (
                <div
                  key={task.id}
                  id={`overview-task-${task.id}`}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-[#101A2E] border-purple-900/40 hover:border-purple-500 shadow-md shadow-purple-950/20'
                      : 'bg-white border-purple-100 hover:border-purple-300 shadow-md shadow-purple-500/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 font-bold">#{task.id}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">· {task.category}</span>
                        {statusBadge(task.status)}
                      </div>
                      <h3 className="font-bold text-sm leading-snug text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors"
                        onClick={() => {
                          setActiveTaskId(task.id);
                          setActiveTab('workspace');
                        }}
                      >
                        {task.title}
                      </h3>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-mono font-bold text-sm text-amber-500 dark:text-amber-400">
                        {task.rewardYD.toLocaleString()} YD
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {task.stakeYD} YD {locale === 'zh-CN' ? '质押' : 'stake'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-purple-900/20 dark:border-purple-950/60 text-xs flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px]">
                      {task.assignedAgent ? (
                        <div className="flex items-center gap-1.5 font-medium">
                          <img
                            src={task.assignedAgent.avatar}
                            alt=""
                            className="w-4 h-4 rounded-full object-cover border border-purple-400/50"
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
                        if (task.status === 'matching' || task.status === 'open') {
                          openTaskMatching(task.id);
                        } else {
                          openTaskWorkspace(task.id);
                        }
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        task.status === 'submitted'
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/25'
                          : task.status === 'matching' || task.status === 'open'
                          ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white hover:from-cyan-400 hover:to-sky-500 shadow-md shadow-cyan-500/20'
                          : isDark
                          ? 'bg-[#16233C] hover:bg-[#1A2942] text-purple-300 border border-purple-900/50'
                          : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200'
                      }`}
                    >
                      {task.status === 'submitted'
                        ? locale === 'zh-CN' ? '审查交付物 & 验收' : 'Review & Settle'
                        : task.status === 'matching' || task.status === 'open'
                        ? locale === 'zh-CN' ? '去看匹配' : 'View Matches'
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
            <h2 className="font-display font-bold text-base tracking-tight flex items-center gap-2 text-slate-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              {t('recommended_agents_title')}
            </h2>
            <button
              onClick={() => setActiveTab('agents')}
              className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 font-bold cursor-pointer"
            >
              {t('view_all')} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recommendedAgents.map((agent) => (
              <div
                key={agent.id}
                id={`overview-rec-agent-${agent.id}`}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-[#101A2E] border-purple-900/40 hover:border-purple-500 shadow-md shadow-purple-950/20'
                    : 'bg-white border-purple-100 hover:border-purple-300 shadow-md shadow-purple-500/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-10 h-10 rounded-xl object-cover border border-purple-500/40 shrink-0 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-xs sm:text-sm truncate text-slate-900 dark:text-white">{agent.name}</h4>
                      {agent.matchScore && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 shrink-0">
                          {agent.matchScore}% {locale === 'zh-CN' ? '匹配' : 'match'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-purple-600/80 dark:text-purple-400/80 font-mono truncate">{agent.category}</p>
                  </div>
                </div>

                {/* Why this match reason box */}
                <div
                  className={`mt-3 p-2.5 rounded-xl text-[11px] border leading-relaxed ${
                    isDark
                      ? 'bg-[#0A101F] border-purple-900/40 text-slate-300'
                      : 'bg-purple-50/70 border-purple-100 text-slate-700'
                  }`}
                >
                  <p>
                    <span className="font-bold text-purple-600 dark:text-purple-400 mr-1">Why match:</span>
                    {locale === 'zh-CN' ? agent.descriptionZh : agent.whyMatch}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-purple-900/20 dark:border-purple-950/60 text-xs">
                  <span className="font-mono font-bold text-amber-500 dark:text-amber-400 text-xs">
                    {agent.priceYD.toLocaleString()} YD
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedAgent(agent);
                        setIsAgentDetailOpen(true);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                        isDark ? 'hover:bg-[#16233C] text-purple-300' : 'hover:bg-purple-100 text-purple-900'
                      }`}
                    >
                      {t('view_details')}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAgentForPublish(agent);
                        setIsPublishWizardOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-xs cursor-pointer"
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
        className={`rounded-3xl border p-6 transition-all shadow-xl ${
          isDark ? 'bg-[#101A2E] border-purple-900/40 shadow-purple-950/20' : 'bg-white border-purple-100 shadow-purple-500/5'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-sm sm:text-base tracking-tight flex items-center gap-2 text-slate-900 dark:text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            {t('recent_activity_title')}
          </h3>
          <button
            onClick={() => setActiveTab('payments')}
            className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold cursor-pointer"
          >
            {t('view_all')} →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-purple-900/40 text-slate-400' : 'border-purple-100 text-slate-600'}`}>
                <th className="pb-3 font-bold uppercase font-mono text-[11px]">{t('tx_hash')}</th>
                <th className="pb-3 font-bold uppercase font-mono text-[11px]">{t('tx_type')}</th>
                <th className="pb-3 font-bold uppercase font-mono text-[11px]">{t('tx_amount')}</th>
                <th className="pb-3 font-bold uppercase font-mono text-[11px]">{t('tx_status')}</th>
                <th className="pb-3 font-bold uppercase font-mono text-[11px] text-right">{t('tx_time')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20 dark:divide-purple-950/50 font-mono-tabular">
              {transactions.slice(0, 4).map((tx) => (
                <tr key={tx.id} className={isDark ? 'hover:bg-[#16233C]/50' : 'hover:bg-purple-50/50'}>
                  <td className="py-3 font-mono text-[11px] text-purple-600 dark:text-purple-300 font-semibold">
                    {tx.txHash.substring(0, 10)}...{tx.txHash.substring(tx.txHash.length - 6)}
                  </td>
                  <td className="py-3 capitalize text-slate-800 dark:text-slate-200 font-medium">{tx.type.replace('_', ' ')}</td>
                  <td className="py-3 font-bold text-amber-500 dark:text-amber-400">
                    {tx.amountYD.toLocaleString()} YD
                  </td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 text-right text-slate-500 dark:text-slate-400 text-[11px]">
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
