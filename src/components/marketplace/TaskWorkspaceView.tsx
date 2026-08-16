import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AgentOrchestratorStudio } from './AgentOrchestratorStudio';
import {
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Coins,
  AlertTriangle,
  FileCode,
  ChevronRight,
  Sparkles,
  Scale,
  Play,
  Workflow,
  Bot,
  Check
} from 'lucide-react';

export const TaskWorkspaceView: React.FC = () => {
  const {
    t,
    activeTask,
    tasks,
    setActiveTaskId,
    acceptTaskDeliverables,
    raiseTaskDispute,
    theme,
    locale
  } = useApp();

  const isDark = theme === 'dark';
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  // C 端默认落在「任务进度」，编排画布作为高级能力
  const [activeTabSub, setActiveTabSub] = useState<'progress' | 'orchestration'>('progress');

  if (!activeTask) {
    return (
      <div className="p-12 text-center text-slate-500 dark:text-slate-400">
        <Layers className="w-12 h-12 mx-auto mb-3 opacity-40 text-purple-500" />
        <p className="text-sm">No task selected. Select a task from the Tasks menu.</p>
      </div>
    );
  }

  const steps = [
    { key: 'draft', label: t('status_draft') },
    { key: 'open', label: t('status_open') },
    { key: 'matching', label: t('status_matching') },
    { key: 'assigned', label: t('status_assigned') },
    { key: 'in_progress', label: t('status_in_progress') },
    { key: 'submitted', label: t('status_submitted') },
    { key: 'settled', label: t('status_settled') }
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === activeTask.status);
  const effectiveIndex = currentStepIndex >= 0 ? currentStepIndex : 4;

  const nodes = activeTask.orchestration?.nodes || [];
  const completedNodes = nodes.filter((n) => n.status === 'completed').length;
  const progressPct = nodes.length > 0 ? Math.round((completedNodes / nodes.length) * 100) : 0;

  const nodeStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return { label: locale === 'zh-CN' ? '已完成' : 'Done', cls: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30', icon: <Check className="w-3 h-3" /> };
      case 'running':
        return { label: locale === 'zh-CN' ? '执行中' : 'Running', cls: 'bg-purple-500/15 text-purple-500 border-purple-500/30', icon: <Play className="w-3 h-3 animate-pulse" /> };
      case 'waiting_approval':
        return { label: locale === 'zh-CN' ? '待审批' : 'Review', cls: 'bg-amber-500/15 text-amber-500 border-amber-500/30', icon: <AlertTriangle className="w-3 h-3" /> };
      case 'failed':
        return { label: locale === 'zh-CN' ? '失败' : 'Failed', cls: 'bg-rose-500/15 text-rose-500 border-rose-500/30', icon: <AlertTriangle className="w-3 h-3" /> };
      default:
        return { label: locale === 'zh-CN' ? '等待中' : 'Queued', cls: 'bg-slate-500/15 text-slate-400 border-slate-500/30', icon: <Clock className="w-3 h-3" /> };
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Task Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">#{activeTask.id}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">· {activeTask.category}</span>
            {activeTask.status === 'disputed' ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/15 text-rose-500 border border-rose-500/30">
                {t('status_disputed')}
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                {activeTask.status.replace('_', ' ').toUpperCase()}
              </span>
            )}
          </div>
          <h1 className="font-display font-bold text-xl lg:text-2xl text-slate-900 dark:text-white tracking-tight">
            {activeTask.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={activeTask.id}
            onChange={(e) => setActiveTaskId(e.target.value)}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-medium cursor-pointer transition-colors ${
              isDark ? 'bg-[#101A2E] border-purple-900/40 text-slate-200 focus:border-purple-500' : 'bg-white border-purple-100 text-slate-800 focus:border-purple-400 shadow-sm'
            }`}
          >
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                #{task.id} - {task.title.substring(0, 30)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Task Status Stepper */}
      <div className={`p-4 sm:p-5 rounded-3xl border transition-colors ${isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'}`}>
        <div className="flex items-center justify-between overflow-x-auto pb-2 sm:pb-0 gap-2">
          {steps.map((s, idx) => {
            const isCompleted = idx < effectiveIndex || activeTask.status === 'settled';
            const isCurrent = idx === effectiveIndex && activeTask.status !== 'settled';
            return (
              <div key={s.key} className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white ring-4 ring-purple-500/20'
                        : isDark
                        ? 'bg-[#0D1526] text-slate-500 border border-purple-900/40'
                        : 'bg-purple-50 text-slate-400 border border-purple-100'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-xs whitespace-nowrap font-medium ${
                      isCurrent ? 'text-purple-600 dark:text-purple-300 font-bold' : isCompleted ? 'text-slate-900 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-6 sm:w-12 h-0.5 mx-1 ${idx < effectiveIndex ? 'bg-emerald-500' : isDark ? 'bg-purple-950/60' : 'bg-purple-100'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Workspace Sub-Tabs & Actions */}
      <div className="flex items-center justify-between border-b border-purple-500/10 dark:border-purple-900/40 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTabSub('progress')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTabSub === 'progress'
                ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-bold shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-purple-950/30'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {locale === 'zh-CN' ? '任务进度' : 'Progress'}
            {nodes.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTabSub === 'progress' ? 'bg-white/20 text-white' : 'bg-purple-500/15 text-purple-500 dark:text-purple-300'}`}>
                {progressPct}%
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTabSub('orchestration')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTabSub === 'orchestration'
                ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-bold shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-purple-950/30'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            {locale === 'zh-CN' ? '编排画布（高级）' : 'Orchestration (Advanced)'}
            {nodes.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTabSub === 'orchestration' ? 'bg-white/20 text-white' : 'bg-purple-500/15 text-purple-500 dark:text-purple-300'}`}>
                {nodes.length}
              </span>
            )}
          </button>
        </div>

        {/* Primary Action Bar */}
        <div className="flex items-center gap-2">
          {activeTask.status === 'submitted' && (
            <>
              <button
                onClick={() => setIsDisputeModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 border border-rose-500/30 transition-colors cursor-pointer"
              >
                {t('btn_raise_dispute')}
              </button>
              <button
                onClick={() => acceptTaskDeliverables(activeTask.id)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                {t('btn_accept_deliverables')}
              </button>
            </>
          )}
          {activeTask.status === 'settled' && (
            <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
              ✓ {locale === 'zh-CN' ? '已结算' : 'Settled'}
            </span>
          )}
        </div>
      </div>

      {/* ============ 视图内容 ============ */}
      {activeTabSub === 'orchestration' ? (
        <AgentOrchestratorStudio taskId={activeTask.id} />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column: Progress + Deliverables */}
          <div className="xl:col-span-8 space-y-4">
            {/* 执行进度 */}
            <div className={`p-5 rounded-3xl border ${isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-500/10 dark:border-purple-900/40">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <h3 className="font-semibold text-xs text-slate-900 dark:text-slate-200">
                    {locale === 'zh-CN' ? '执行进度' : 'Execution Progress'}
                  </h3>
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {completedNodes}/{nodes.length} · <span className="text-purple-500 font-bold">{progressPct}%</span>
                </div>
              </div>

              {nodes.length === 0 ? (
                <div className="py-8 text-center">
                  <Bot className="w-10 h-10 mx-auto mb-2 text-slate-500 opacity-40" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeTask.status === 'matching' || activeTask.status === 'open'
                      ? locale === 'zh-CN' ? '正在为你匹配 Agent…' : 'Matching agents…'
                      : locale === 'zh-CN' ? '任务尚未编排，请到「编排画布」创建流水线' : 'No pipeline yet — open the orchestration canvas'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {nodes.map((node) => {
                    const badge = nodeStatusBadge(node.status);
                    return (
                      <div key={node.id} className={`p-3 rounded-2xl border flex items-center gap-3 ${isDark ? 'bg-[#0D1526] border-purple-900/40' : 'bg-purple-50/40 border-purple-100'}`}>
                        <img
                          src={node.assignedAgentAvatar}
                          alt={node.assignedAgentName}
                          className="w-9 h-9 rounded-xl object-cover border border-purple-500/30 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-xs text-slate-900 dark:text-white truncate">{node.name}</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold border flex items-center gap-1 ${badge.cls}`}>
                              {badge.icon}{badge.label}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {node.assignedAgentName} · {node.role}
                          </p>
                          {node.logs && node.logs.length > 0 && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-mono">
                              {node.logs[node.logs.length - 1].message}
                            </p>
                          )}
                        </div>
                        {node.rewardAllocationYD ? (
                          <span className="text-[11px] font-mono font-bold text-amber-500 shrink-0">
                            {node.rewardAllocationYD} YD
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 交付物 */}
            <div className={`p-5 rounded-3xl border ${isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-purple-500/10 dark:border-purple-900/40">
                <h3 className="font-semibold text-xs text-slate-900 dark:text-slate-200 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-purple-500" />
                  {locale === 'zh-CN' ? '交付物' : 'Deliverables'} ({activeTask.deliverables.length})
                </h3>
              </div>
              <div className="space-y-3">
                {activeTask.deliverables.map((del) => (
                  <div key={del.id} className={`p-3.5 rounded-2xl border ${isDark ? 'bg-[#0D1526] border-purple-900/40' : 'bg-purple-50/40 border-purple-100'}`}>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div>
                        <h4 className="font-semibold text-xs text-slate-900 dark:text-white">{del.title}</h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{del.description}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border shrink-0 ${
                        del.status === 'approved'
                          ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                          : del.status === 'submitted'
                          ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                          : 'bg-slate-500/15 text-slate-400 border-slate-500/30'
                      }`}>
                        {del.status === 'approved' ? (locale === 'zh-CN' ? '已验收' : 'Approved') : del.status === 'submitted' ? (locale === 'zh-CN' ? '已提交' : 'Submitted') : (locale === 'zh-CN' ? '待交付' : 'Pending')}
                      </span>
                    </div>
                    {del.deliverableHash && (
                      <p className="mt-2 text-[10px] font-mono text-slate-500 dark:text-slate-500 truncate">
                        {del.deliverableHash}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 验收标准 + 托管摘要 */}
          <div className="xl:col-span-4 space-y-4">
            <div className={`p-4 rounded-3xl border text-xs space-y-2.5 ${isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'}`}>
              <h3 className="font-bold uppercase text-[11px] tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                {locale === 'zh-CN' ? '验收标准' : 'Acceptance Criteria'}
              </h3>
              <ul className="space-y-2">
                {activeTask.acceptanceCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded-3xl border text-xs space-y-3 ${isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'}`}>
              <h3 className="font-bold uppercase text-[11px] tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                {locale === 'zh-CN' ? '托管与结算' : 'Escrow & Settlement'}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-2xl bg-purple-50/50 dark:bg-[#0D1526] border border-purple-100 dark:border-purple-900/40">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] mb-0.5">{locale === 'zh-CN' ? '锁定奖励' : 'Reward'}</span>
                  <span className="font-bold text-amber-500">{activeTask.rewardYD} YD</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-purple-50/50 dark:bg-[#0D1526] border border-purple-100 dark:border-purple-900/40">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] mb-0.5">{locale === 'zh-CN' ? 'Agent 质押' : 'Stake'}</span>
                  <span className="font-bold text-emerald-500">{activeTask.stakeYD} YD</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-purple-50/50 dark:bg-[#0D1526] border border-purple-100 dark:border-purple-900/40 col-span-2">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] mb-0.5">{locale === 'zh-CN' ? '需求方' : 'Owner'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{activeTask.owner.name}</span>
                </div>
                {activeTask.assignedAgent && (
                  <div className="p-2.5 rounded-2xl bg-purple-50/50 dark:bg-[#0D1526] border border-purple-100 dark:border-purple-900/40 col-span-2">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px] mb-0.5">{locale === 'zh-CN' ? '执行 Agent' : 'Agent'}</span>
                    <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <img src={activeTask.assignedAgent.avatar} alt="" className="w-4 h-4 rounded-full object-cover" referrerPolicy="no-referrer" />
                      {activeTask.assignedAgent.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                {locale === 'zh-CN' ? '资金由智能合约托管，验收通过才释放' : 'Funds escrowed onchain, released on approval'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Raise Dispute Modal */}
      {isDisputeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsDisputeModalOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-xs" />
          <div className={`relative z-10 w-full max-w-md rounded-3xl border p-6 space-y-4 shadow-2xl ${isDark ? 'bg-[#101A2E] border-purple-900/40 text-white' : 'bg-white border-purple-100 text-slate-900'}`}>
            <div className="flex items-center gap-2 text-rose-500 font-bold text-base">
              <Scale className="w-5 h-5" />
              <span>{t('btn_raise_dispute')}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {locale === 'zh-CN'
                ? '发起争议将冻结托管资金，由多方仲裁委员会依据验收标准进行裁决。'
                : 'Raising a dispute freezes Escrow funds. A 3/5 multisig committee reviews against acceptance criteria.'}
            </p>
            <textarea
              rows={3}
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder={locale === 'zh-CN' ? '说明验收未通过的具体原因…' : 'State the exact acceptance criteria failure…'}
              className={`w-full p-3 rounded-2xl border text-xs focus:outline-none ${isDark ? 'bg-[#0D1526] border-purple-900/50 focus:border-purple-500 text-white' : 'bg-purple-50/50 border-purple-100 focus:border-purple-400 text-slate-900'}`}
            />
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setIsDisputeModalOpen(false)} className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">
                {t('cancel_btn')}
              </button>
              <button
                onClick={() => {
                  raiseTaskDispute(activeTask.id, disputeReason);
                  setIsDisputeModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 shadow-sm"
              >
                {locale === 'zh-CN' ? '确认发起争议' : 'Confirm Dispute'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
