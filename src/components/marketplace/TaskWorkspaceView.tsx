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
      <div className="p-12 text-center text-slate-400">
        <Layers className="w-12 h-12 mx-auto mb-3 opacity-40 text-[#36E4DA]" />
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
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-mono text-xs text-slate-400">#{activeTask.id}</span>
            <span className="text-xs text-slate-400">· {activeTask.category}</span>
            {activeTask.status === 'disputed' ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FF647C]/15 text-[#FF647C]">
                {t('status_disputed')}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#35D07F]/15 text-[#35D07F]">
                {activeTask.status.replace('_', ' ').toUpperCase()}
              </span>
            )}
          </div>
          <h1 className="font-display font-bold text-xl lg:text-2xl tracking-tight">
            {activeTask.title}
          </h1>
        </div>

        {/* Task switcher pill */}
        <div className="flex items-center gap-2">
          <select
            value={activeTask.id}
            onChange={(e) => setActiveTaskId(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs font-medium cursor-pointer ${
              isDark ? 'bg-[#0C1728] border-[#243550] text-slate-200' : 'bg-white border-slate-200 text-slate-800'
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
        className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
          isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
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
                        ? 'bg-[#35D07F] text-[#07111F]'
                        : isCurrent
                        ? 'bg-[#36E4DA] text-[#07111F] ring-4 ring-[#36E4DA]/20'
                        : isDark
                        ? 'bg-[#111F34] text-slate-500'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-xs whitespace-nowrap font-medium ${
                      isCurrent
                        ? isDark
                          ? 'text-[#36E4DA] font-bold'
                          : 'text-sky-700 font-bold'
                        : isCompleted
                        ? isDark
                          ? 'text-slate-200'
                          : 'text-slate-800'
                        : 'text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-6 sm:w-12 h-0.5 mx-1 ${
                      idx < effectiveIndex
                        ? 'bg-[#35D07F]'
                        : isDark
                        ? 'bg-slate-700'
                        : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Workspace Sub-Tabs & Actions Header */}
      <div className="flex items-center justify-between border-b border-slate-700/20 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTabSub('orchestration')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTabSub === 'orchestration'
                ? isDark
                  ? 'bg-[#111F34] text-[#36E4DA] font-bold ring-1 ring-[#36E4DA]/40'
                  : 'bg-sky-100 text-sky-800 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Workflow className="w-3.5 h-3.5 text-[#36E4DA]" />
            {t('tab_agent_orchestration')}
            {activeTask.orchestration?.nodes && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#36E4DA]/20 text-[#36E4DA]">
                {activeTask.orchestration.nodes.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTabSub('timeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTabSub === 'timeline'
                ? isDark
                  ? 'bg-[#111F34] text-[#36E4DA] font-semibold'
                  : 'bg-sky-100 text-sky-800 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('execution_timeline_title')}
          </button>
          <button
            onClick={() => setActiveTabSub('deliverables')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTabSub === 'deliverables'
                ? isDark
                  ? 'bg-[#111F34] text-[#36E4DA] font-semibold'
                  : 'bg-sky-100 text-sky-800 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('deliverables_audit_title')} ({activeTask.deliverables.length})
          </button>
          <button
            onClick={() => setActiveTabSub('escrow')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTabSub === 'escrow'
                ? isDark
                  ? 'bg-[#111F34] text-[#36E4DA] font-semibold'
                  : 'bg-sky-100 text-sky-800 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
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
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-colors cursor-pointer"
              >
                {t('btn_raise_dispute')}
              </button>
              <button
                onClick={() => acceptTaskDeliverables(activeTask.id)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#35D07F] text-[#07111F] hover:bg-[#35D07F]/90 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                {t('btn_accept_deliverables')}
              </button>
            </>
          )}
          {activeTask.status === 'settled' && (
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#35D07F]/15 text-[#35D07F] border border-[#35D07F]/30">
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
              className={`p-5 rounded-2xl border ${
                isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#36E4DA]" />
                  <h3 className="font-semibold text-xs text-slate-300">
                    {activeTask.assignedAgent?.name || 'Agent'} Execution Trace
                  </h3>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Total Cost: <span className="text-[#FFC857]">{timeline.totalCostYD} YD</span> ·{' '}
                  {timeline.tokensUsed.toLocaleString()} tokens
                </div>
              </div>

              {/* Vertical timeline stepper */}
              <div className="relative pl-6 space-y-6 border-l-2 border-slate-700/40 ml-2">
                {timeline.events.map((evt) => (
                  <div key={evt.id} className="relative group">
                    {/* Circle Node */}
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#36E4DA] ring-4 ring-[#0C1728]" />

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                        <span className="font-semibold text-slate-200">
                          Step {evt.stepNumber}: {evt.name}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                          {evt.tool && (
                            <span className="px-1.5 py-0.2 rounded bg-[#7568FF]/15 text-[#7568FF]">
                              {evt.tool}
                            </span>
                          )}
                          <span>{evt.durationMs}ms</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 font-mono">
                        {evt.inputSummary}
                      </p>

                      {evt.outputSummary && (
                        <div
                          className={`mt-2 p-2.5 rounded-xl text-[11px] font-mono border ${
                            isDark
                              ? 'bg-[#07111F] border-[#243550] text-[#35D07F]'
                              : 'bg-slate-50 border-slate-200 text-emerald-800'
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
                  className={`p-4 rounded-2xl border transition-all ${
                    isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-[#36E4DA]" />
                        <h4 className="font-semibold text-xs">{del.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{del.description}</p>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#35D07F]/15 text-[#35D07F]">
                      Submitted
                    </span>
                  </div>

                  {del.deliverableHash && (
                    <div className="mt-3 p-2.5 rounded-xl bg-[#07111F] border border-[#243550] text-[11px] font-mono text-slate-400 flex items-center justify-between gap-2 overflow-hidden">
                      <span className="truncate">{del.deliverableHash}</span>
                      <span className="text-[10px] text-[#36E4DA] shrink-0 font-sans">
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
              className={`p-5 rounded-2xl border space-y-4 text-xs ${
                isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
              }`}
            >
              <h3 className="font-semibold text-sm">Escrow Smart Contract State</h3>
              <div className="grid grid-cols-2 gap-3 font-mono-tabular">
                <div>
                  <span className="text-slate-400 block">Contract Address:</span>
                  <span className="font-mono text-[11px] text-[#36E4DA]">
                    {activeTask.escrowContract}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Settlement Asset:</span>
                  <span className="font-semibold text-[#FFC857]">YD ERC-20 (Base Sepolia)</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Locked Reward:</span>
                  <span className="font-semibold">{activeTask.rewardYD} YD</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Agent Performance Stake:</span>
                  <span className="font-semibold text-[#35D07F]">{activeTask.stakeYD} YD</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Participant Wallets & Acceptance Criteria (4 cols) */}
        <div className="xl:col-span-4 space-y-4">
          {/* Participants Card */}
          <div
            className={`p-4 rounded-2xl border text-xs space-y-3 ${
              isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="font-semibold uppercase text-[10px] tracking-wider text-slate-400 font-mono">
              Task Participants & Wallets
            </h3>

            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-inherit border border-slate-700/20">
                <p className="text-[10px] text-slate-400">Task Owner (Funder)</p>
                <p className="font-semibold text-xs mt-0.5">{activeTask.owner.name}</p>
                <p className="font-mono text-[10px] text-slate-400 truncate">
                  {activeTask.owner.walletAddress}
                </p>
              </div>

              {activeTask.assignedAgent && (
                <div className="p-2.5 rounded-xl bg-inherit border border-slate-700/20">
                  <p className="text-[10px] text-slate-400">Assigned Agent Operator</p>
                  <p className="font-semibold text-xs mt-0.5">{activeTask.assignedAgent.name}</p>
                  <p className="font-mono text-[10px] text-slate-400 truncate">
                    {activeTask.assignedAgent.author.payoutWallet}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Acceptance Criteria Checklist */}
          <div
            className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
              isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
            }`}
          >
            <h3 className="font-semibold uppercase text-[10px] tracking-wider text-slate-400 font-mono">
              Acceptance Criteria
            </h3>
            <ul className="space-y-2">
              {activeTask.acceptanceCriteria.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#35D07F] shrink-0 mt-0.5" />
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
            className={`relative z-10 w-full max-w-md rounded-2xl border p-6 space-y-4 ${
              isDark ? 'bg-[#0A1424] border-[#243550] text-[#F4F7FB]' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <Scale className="w-5 h-5" />
              <span>{t('btn_raise_dispute')}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Raising a dispute freezes Escrow funds. A decentralized 3/5 multisig arbitration committee will review deliverables against acceptance criteria.
            </p>
            <textarea
              rows={3}
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder="State the exact acceptance criteria failure or defect..."
              className={`w-full p-3 rounded-xl border text-xs focus:outline-none ${
                isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
              }`}
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsDisputeModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400"
              >
                {t('cancel_btn')}
              </button>
              <button
                onClick={() => {
                  raiseTaskDispute(activeTask.id, disputeReason);
                  setIsDisputeModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF647C] text-white hover:bg-[#E05067]"
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
