import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockAgentRunTimeline } from '../../data/mockData';
import { AgentOrchestratorStudio } from './AgentOrchestratorStudio';
import {
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Coins,
  AlertTriangle,
  FileCode,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Terminal,
  Scale,
  Play,
  RotateCcw,
  Check,
  Workflow
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
  const [activeTabSub, setActiveTabSub] = useState<'orchestration' | 'timeline' | 'deliverables' | 'escrow'>('orchestration');

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
    { key: 'assigned', label: t('status_assigned') },
    { key: 'in_progress', label: t('status_in_progress') },
    { key: 'submitted', label: t('status_submitted') },
    { key: 'settled', label: t('status_settled') }
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === activeTask.status);
  const effectiveIndex = currentStepIndex >= 0 ? currentStepIndex : 4; // default to submitted for mock

  const timeline = mockAgentRunTimeline;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Task Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">#{activeTask.id}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">· {activeTask.category}</span>
            {activeTask.status === 'disputed' ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                {t('status_disputed')}
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                {activeTask.status.replace('_', ' ').toUpperCase()}
              </span>
            )}
          </div>
          <h1 className="font-display font-bold text-xl lg:text-2xl text-slate-900 dark:text-white tracking-tight">
            {activeTask.title}
          </h1>
        </div>

        {/* Task switcher pill */}
        <div className="flex items-center gap-2">
          <select
            value={activeTask.id}
            onChange={(e) => setActiveTaskId(e.target.value)}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-medium cursor-pointer transition-colors ${
              isDark
                ? 'bg-[#10132B] border-purple-900/40 text-slate-200 focus:border-purple-500'
                : 'bg-white border-purple-100 text-slate-800 focus:border-purple-400 shadow-sm'
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
      <div
        className={`p-4 sm:p-5 rounded-3xl border transition-colors ${
          isDark ? 'bg-[#10132B] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
        }`}
      >
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
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white ring-4 ring-purple-500/20'
                        : isDark
                        ? 'bg-[#0D0F24] text-slate-500 border border-purple-900/40'
                        : 'bg-purple-50 text-slate-400 border border-purple-100'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-xs whitespace-nowrap font-medium ${
                      isCurrent
                        ? 'text-purple-600 dark:text-purple-300 font-bold'
                        : isCompleted
                        ? 'text-slate-900 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-6 sm:w-12 h-0.5 mx-1 ${
                      idx < effectiveIndex
                        ? 'bg-emerald-500'
                        : isDark
                        ? 'bg-purple-950/60'
                        : 'bg-purple-100'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Workspace Sub-Tabs & Actions Header */}
      <div className="flex items-center justify-between border-b border-purple-500/10 dark:border-purple-900/40 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTabSub('orchestration')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTabSub === 'orchestration'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-purple-950/30'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            {t('tab_agent_orchestration')}
            {activeTask.orchestration?.nodes && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTabSub === 'orchestration' ? 'bg-white/20 text-white' : 'bg-purple-500/15 text-purple-600 dark:text-purple-300'}`}>
                {activeTask.orchestration.nodes.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTabSub('timeline')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTabSub === 'timeline'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-purple-950/30'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            {t('execution_timeline_title')}
          </button>
          <button
            onClick={() => setActiveTabSub('deliverables')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTabSub === 'deliverables'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-purple-950/30'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            {t('deliverables_audit_title')} ({activeTask.deliverables.length})
          </button>
          <button
            onClick={() => setActiveTabSub('escrow')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTabSub === 'escrow'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-xs'
                : isDark
                ? 'text-slate-400 hover:text-white hover:bg-purple-950/30'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
            }`}
          >
            Escrow & Contracts
          </button>
        </div>

        {/* Primary Action Button Bar */}
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
            <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              ✓ Settled on Base Sepolia
            </span>
          )}
        </div>
      </div>

      {/* Orchestration Studio View or Classic Views */}
      {activeTabSub === 'orchestration' ? (
        <AgentOrchestratorStudio taskId={activeTask.id} />
      ) : (
        /* Main Workspace Layout (2 columns) */
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column: Timeline or Deliverables (8 cols) */}
          <div className="xl:col-span-8 space-y-4">
            {activeTabSub === 'timeline' && (
              <div
                className={`p-5 rounded-3xl border ${
                  isDark ? 'bg-[#10132B] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-500/10 dark:border-purple-900/40">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-purple-500" />
                    <h3 className="font-semibold text-xs text-slate-900 dark:text-slate-200">
                      {activeTask.assignedAgent?.name || 'Agent'} Execution Trace
                    </h3>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Total Cost: <span className="text-amber-600 dark:text-amber-400 font-bold">{timeline.totalCostYD} YD</span> ·{' '}
                    {timeline.tokensUsed.toLocaleString()} tokens
                  </div>
                </div>

                {/* Vertical timeline stepper */}
                <div className="relative pl-6 space-y-6 border-l-2 border-purple-500/20 ml-2">
                  {timeline.events.map((evt) => (
                    <div key={evt.id} className="relative group">
                      {/* Circle Node */}
                      <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-500/20" />

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                          <span className="font-semibold text-slate-900 dark:text-slate-200">
                            Step {evt.stepNumber}: {evt.name}
                          </span>
                          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            {evt.tool && (
                              <span className="px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-600 dark:text-purple-300 font-semibold">
                                {evt.tool}
                              </span>
                            )}
                            <span>{evt.durationMs}ms</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                          {evt.inputSummary}
                        </p>

                        {evt.outputSummary && (
                          <div
                            className={`mt-2 p-2.5 rounded-xl text-[11px] font-mono border ${
                              isDark
                                ? 'bg-[#0D0F24] border-purple-900/40 text-emerald-400'
                                : 'bg-purple-50/50 border-purple-100 text-emerald-800'
                            }`}
                          >
                            → {evt.outputSummary}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTabSub === 'deliverables' && (
              <div className="space-y-3">
                {activeTask.deliverables.map((del) => (
                  <div
                    key={del.id}
                    className={`p-4 rounded-3xl border transition-all ${
                      isDark ? 'bg-[#10132B] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <FileCode className="w-4 h-4 text-purple-500" />
                          <h4 className="font-semibold text-xs text-slate-900 dark:text-white">{del.title}</h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{del.description}</p>
                      </div>

                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        Submitted
                      </span>
                    </div>

                    {del.deliverableHash && (
                      <div className={`mt-3 p-2.5 rounded-xl border text-[11px] font-mono flex items-center justify-between gap-2 overflow-hidden ${
                        isDark ? 'bg-[#0D0F24] border-purple-900/40 text-slate-400' : 'bg-purple-50/50 border-purple-100 text-slate-600'
                      }`}>
                        <span className="truncate">{del.deliverableHash}</span>
                        <span className="text-[10px] text-purple-600 dark:text-purple-400 shrink-0 font-sans font-semibold">
                          SHA-256 Verified
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTabSub === 'escrow' && (
              <div
                className={`p-5 rounded-3xl border space-y-4 text-xs ${
                  isDark ? 'bg-[#10132B] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
                }`}
              >
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Escrow Smart Contract State</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-[#0D0F24] border border-purple-100 dark:border-purple-900/40">
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px] mb-1">Contract Address:</span>
                    <span className="font-mono text-[11px] text-purple-600 dark:text-purple-400 font-bold">
                      {activeTask.escrowContract}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-[#0D0F24] border border-purple-100 dark:border-purple-900/40">
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px] mb-1">Settlement Asset:</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">YD ERC-20 (Base Sepolia)</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-[#0D0F24] border border-purple-100 dark:border-purple-900/40">
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px] mb-1">Locked Reward:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{activeTask.rewardYD} YD</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-[#0D0F24] border border-purple-100 dark:border-purple-900/40">
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px] mb-1">Agent Performance Stake:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeTask.stakeYD} YD</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Participant Wallets & Acceptance Criteria (4 cols) */}
          <div className="xl:col-span-4 space-y-4">
            {/* Participants Card */}
            <div
              className={`p-4 rounded-3xl border text-xs space-y-3 ${
                isDark ? 'bg-[#10132B] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
              }`}
            >
              <h3 className="font-bold uppercase text-[10px] tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                Task Participants & Wallets
              </h3>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-[#0D0F24] border border-purple-100 dark:border-purple-900/40">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Task Owner (Funder)</p>
                  <p className="font-semibold text-xs text-slate-900 dark:text-white mt-0.5">{activeTask.owner.name}</p>
                  <p className="font-mono text-[10px] text-purple-600 dark:text-purple-400 truncate mt-0.5">
                    {activeTask.owner.walletAddress}
                  </p>
                </div>

                {activeTask.assignedAgent && (
                  <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-[#0D0F24] border border-purple-100 dark:border-purple-900/40">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Assigned Agent Operator</p>
                    <p className="font-semibold text-xs text-slate-900 dark:text-white mt-0.5">{activeTask.assignedAgent.name}</p>
                    <p className="font-mono text-[10px] text-purple-600 dark:text-purple-400 truncate mt-0.5">
                      {activeTask.assignedAgent.author.payoutWallet}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Acceptance Criteria Checklist */}
            <div
              className={`p-4 rounded-3xl border text-xs space-y-2.5 ${
                isDark ? 'bg-[#10132B] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
              }`}
            >
              <h3 className="font-bold uppercase text-[10px] tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                Acceptance Criteria
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
          </div>
        </div>
      )}

      {/* Raise Dispute Modal */}
      {isDisputeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsDisputeModalOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />
          <div
            className={`relative z-10 w-full max-w-md rounded-3xl border p-6 space-y-4 shadow-2xl ${
              isDark ? 'bg-[#10132B] border-purple-900/40 text-white' : 'bg-white border-purple-100 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2 text-rose-500 font-bold text-base">
              <Scale className="w-5 h-5" />
              <span>{t('btn_raise_dispute')}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Raising a dispute freezes Escrow funds. A decentralized 3/5 multisig arbitration committee will review deliverables against acceptance criteria.
            </p>
            <textarea
              rows={3}
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder="State the exact acceptance criteria failure or defect..."
              className={`w-full p-3 rounded-2xl border text-xs focus:outline-none ${
                isDark ? 'bg-[#0D0F24] border-purple-900/50 focus:border-purple-500 text-white' : 'bg-purple-50/50 border-purple-100 focus:border-purple-400 text-slate-900'
              }`}
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsDisputeModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
              >
                {t('cancel_btn')}
              </button>
              <button
                onClick={() => {
                  raiseTaskDispute(activeTask.id, disputeReason);
                  setIsDisputeModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 shadow-sm"
              >
                Confirm Dispute Initiation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
