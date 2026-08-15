import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Coins,
  FileCheck,
  Scale,
  Cpu,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Lock,
  FileCode,
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  GitBranch,
  Flame,
  KeyRound,
  FileSpreadsheet,
  Presentation,
  Video
} from 'lucide-react';

export const ArchitecturalPillarsShowcase: React.FC = () => {
  const { theme, locale } = useApp();
  const isDark = theme === 'dark';

  const [activePillar, setActivePillar] = useState<number>(0);
  const [escrowState, setEscrowState] = useState<'locked' | 'settled' | 'slashed'>('locked');
  const [activeArtifactTab, setActiveArtifactTab] = useState<'pptx' | 'video' | 'excel' | 'code'>('pptx');
  const [juryVotes, setJuryVotes] = useState<number>(4);

  const pillars = [
    {
      id: 0,
      title: locale === 'zh-CN' ? 'Multi-Agent 拓扑协同引擎' : 'Multi-Agent Swarm Topology',
      subtitle: locale === 'zh-CN' ? 'DAG 状态图 + 分布式共识环' : 'DAG State Graph & Consensus Loop',
      icon: Layers,
      color: 'from-purple-600 to-indigo-600',
      borderAccent: 'border-purple-500',
      badge: 'LangGraph & DAG'
    },
    {
      id: 1,
      title: locale === 'zh-CN' ? '智能双向质押金托管 (Dual-Staking)' : 'Dual-Staking Escrow Contract',
      subtitle: locale === 'zh-CN' ? '100% 雇主赏金 + 6% 履约保证金' : '100% Bounty + 6% Performance Bond',
      icon: Coins,
      color: 'from-amber-500 to-orange-600',
      borderAccent: 'border-amber-500',
      badge: 'Base Sepolia Verified'
    },
    {
      id: 2,
      title: locale === 'zh-CN' ? '可验证多模态交付物 (Verifiable PoD)' : 'Verifiable Multi-Modal Proof',
      subtitle: locale === 'zh-CN' ? 'Office 原生/4K 视频/SHA-256 上链' : 'Native Office, 4K & Onchain SHA-256',
      icon: FileCheck,
      color: 'from-indigo-600 to-violet-600',
      borderAccent: 'border-indigo-500',
      badge: 'Cryptographic PoD'
    },
    {
      id: 3,
      title: locale === 'zh-CN' ? '去中心化仲裁网络与多签裁决' : 'Decentralized Arbitration Council',
      subtitle: locale === 'zh-CN' ? '3/5 陪审团多签 + 72H SLA 争议赔付' : '3/5 Multisig Jury & 72H SLA Settle',
      icon: Scale,
      color: 'from-pink-600 to-rose-600',
      borderAccent: 'border-pink-500',
      badge: '3/5 Multisig Quorum'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
          <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span>{locale === 'zh-CN' ? '核心技术中枢 · ARCHITECTURE' : 'CORE ARCHITECTURE'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          {locale === 'zh-CN'
            ? '四大技术支柱，重构企业级生产力信任协议'
            : 'Four Pillars of Autonomous AI Workforce & Settlement'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {locale === 'zh-CN'
            ? '从任务拓扑编排、多模态原生交付、双向质押约束到链上陪审裁决，打造无可替代的企业级可信基础设施。'
            : 'Interactive verification matrix: from swarm DAG consensus to dual-staking escrow and verifiable proof-of-delivery.'}
        </p>
      </div>

      {/* Interactive Tabs / Switcher */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-1.5 rounded-2xl bg-purple-950/20 border border-purple-900/30">
        {pillars.map((p) => {
          const Icon = p.icon;
          const isSelected = activePillar === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActivePillar(p.id)}
              className={`p-4 rounded-xl text-left transition-all relative overflow-hidden flex flex-col justify-between gap-3 cursor-pointer ${
                isSelected
                  ? isDark
                    ? 'bg-[#161A38] border-2 border-purple-500 shadow-lg shadow-purple-500/20'
                    : 'bg-white border-2 border-purple-500 shadow-md shadow-purple-500/15'
                  : isDark
                  ? 'hover:bg-[#10132B]/80 text-slate-400'
                  : 'hover:bg-purple-50/80 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected
                      ? `bg-gradient-to-tr ${p.color} text-white shadow-md`
                      : 'bg-purple-500/15 text-purple-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                  Pillar 0{p.id + 1}
                </span>
              </div>
              <div>
                <h4
                  className={`font-bold text-xs sm:text-sm leading-tight line-clamp-1 ${
                    isSelected
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {p.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {p.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Display */}
      <div
        className={`p-6 sm:p-8 lg:p-10 rounded-3xl border transition-all shadow-2xl relative overflow-hidden ${
          isDark
            ? 'bg-[#10132B] border-purple-900/50 shadow-purple-950/30'
            : 'bg-white border-purple-100 shadow-purple-500/10'
        }`}
      >
        {/* ============================================================ */}
        {/* PILLAR 01: Swarm Topology & Consensus Loop                   */}
        {/* ============================================================ */}
        {activePillar === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                <GitBranch className="w-3.5 h-3.5 text-purple-500" />
                <span>LangGraph State Graph & DAG Topologies</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
                {locale === 'zh-CN'
                  ? '多 Agent 拓扑协同引擎与博弈共识环'
                  : 'Swarm Orchestration Engine & Consensus Loop'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {locale === 'zh-CN'
                  ? '彻底颠覆单模型单轮问答。基于 LangGraph 状态图与有向无环图（DAG），将企业复杂需求实时分解为主控规划器、并行研发专家与验证审计节点的拓扑网络。独创 Consensus Loop 机制，多模型自动交叉校验直至满足 100% 验收阈值。'
                  : 'Decomposes complex enterprise prompts into DAG sub-tasks across specialized agents. Features stateful inter-agent memory bus and multi-model consensus verification.'}
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{locale === 'zh-CN' ? '支持动态并行分支 (Fan-out) 与汇聚合成 (Fan-in)' : 'Dynamic parallel fan-outs and unified fan-in synthesis'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{locale === 'zh-CN' ? '全局共享结构化上下文池与实时跨 Agent 消息总线' : 'Shared structured state pool & zero-loss inter-agent message bus'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{locale === 'zh-CN' ? '关键节点支持 Human-in-the-loop 介入与打回机制' : 'Human-in-the-loop approval triggers at critical milestones'}</span>
                </div>
              </div>
            </div>

            {/* Interactive Visual Preview Card */}
            <div className="lg:col-span-6">
              <div
                className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-[#0A0C1B] border-purple-900/40' : 'bg-purple-50/60 border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-purple-900/20 dark:border-purple-950/60 text-xs font-mono">
                  <span className="text-purple-600 dark:text-purple-300 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    LIVE SWARM DAG PIPELINE
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">Latency: 14ms · State: Active</span>
                </div>

                {/* Simulated Visual Pipeline */}
                <div className="py-6 space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-300 flex items-center justify-center font-mono font-bold text-xs shrink-0 border border-purple-500/30">
                      01
                    </div>
                    <div className="flex-1 p-3 rounded-xl bg-white dark:bg-[#161A38] border border-purple-200 dark:border-purple-900/40 shadow-xs flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">Lead Planner Node</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Task Decomposition & Architecture Specs</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold">100% OK</span>
                    </div>
                  </div>

                  {/* Step 2 (Parallel Fan-out) */}
                  <div className="pl-6 border-l-2 border-dashed border-purple-500/40 space-y-2.5 my-2">
                    <div className="p-3 rounded-xl bg-white dark:bg-[#161A38] border border-indigo-200 dark:border-indigo-900/40 shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">Agent #01: Fullstack Engine Builder</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Parallel Code Generation</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono font-bold">Synced</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-[#161A38] border border-purple-200 dark:border-purple-900/40 shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">Agent #02: Formal Verifier & SecAudit</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">AST & Security Linting</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/15 text-purple-600 dark:text-purple-400 font-mono font-bold">Passed</span>
                    </div>
                  </div>

                  {/* Step 3 (Consensus Loop) */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-md">
                      03
                    </div>
                    <div className="flex-1 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-400/40 shadow-xs flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                          Consensus Loop Finalization
                        </span>
                        <span className="text-[10px] text-purple-600 dark:text-purple-300 font-mono">100% Quality Score Validated</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono font-bold">Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PILLAR 02: Dual-Staking Escrow Simulation                    */}
        {/* ============================================================ */}
        {activePillar === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                <span>Base Sepolia Trustless Dual-Staking Protocol</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
                {locale === 'zh-CN'
                  ? '双向质押托管合约与零违约保障'
                  : 'Dual-Staking Escrow Contract with Zero-Default'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {locale === 'zh-CN'
                  ? '在 Base 链上部署无需信任的 Escrow 合约。雇主锁存 100% 任务赏金，Agent 接单方强制质押 6% 履约保证金（600 bps）。验收通过后资金秒级自动释放，若 Agent 延期违约则保证金自动没收并全额赔付雇主。'
                  : 'Employers lock 100% task bounty while matching agents commit 6% onchain performance bond. Automated disbursement on milestone sign-off, or instant slashed payout to employers upon default.'}
              </p>

              {/* Interactive Simulation Controls */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2">
                  {locale === 'zh-CN' ? '交互模拟合约履约流程：' : 'Interactive Escrow Simulation:'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEscrowState('locked')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      escrowState === 'locked'
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                        : isDark
                        ? 'bg-[#161A38] text-slate-400'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    1. 资金质押锁定
                  </button>
                  <button
                    onClick={() => setEscrowState('settled')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      escrowState === 'settled'
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                        : isDark
                        ? 'bg-[#161A38] text-slate-400'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    2. 验收通过结算释放
                  </button>
                  <button
                    onClick={() => setEscrowState('slashed')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      escrowState === 'slashed'
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                        : isDark
                        ? 'bg-[#161A38] text-slate-400'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    3. 模拟违约罚没赔付
                  </button>
                </div>
              </div>
            </div>

            {/* Smart Contract Visualizer Box */}
            <div className="lg:col-span-6">
              <div
                className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-[#0A0C1B] border-amber-900/40' : 'bg-amber-50/40 border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-amber-900/20 text-xs font-mono">
                  <span className="text-amber-500 font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                    ESCROW CONTRACT #0x99B3...525A
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">Network: Base Sepolia</span>
                </div>

                <div className="py-6 space-y-4">
                  {/* Employer Bounty Pool */}
                  <div className="p-4 rounded-xl bg-white dark:bg-[#161A38] border border-amber-200 dark:border-amber-900/40 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">Employer Bounty Locked</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">100% Principal in Smart Vault</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-amber-500">2,500 YD</span>
                  </div>

                  {/* Agent 6% Stake */}
                  <div className="p-4 rounded-xl bg-white dark:bg-[#161A38] border border-amber-200 dark:border-amber-900/40 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">Agent Performance Bond (6%)</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Slashed if timeline/quality breached</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-purple-600 dark:text-purple-400">150 YD</span>
                  </div>

                  {/* Result Status Banner */}
                  <div
                    className={`p-4 rounded-xl border text-center transition-all ${
                      escrowState === 'locked'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                        : escrowState === 'settled'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    <p className="text-xs font-bold font-mono">
                      {escrowState === 'locked' && '🔒 STATUS: DUAL-LOCKED (2,650 YD SECURED IN PROTOCOL)'}
                      {escrowState === 'settled' && '✅ STATUS: 2,500 YD RELEASED TO AGENT + 150 YD BOND RETURNED'}
                      {escrowState === 'slashed' && '⚡ STATUS: DEFAULT TRIGGERED · 150 YD BOND COMPENSATED TO EMPLOYER'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PILLAR 03: Verifiable Proof-of-Delivery                      */}
        {/* ============================================================ */}
        {activePillar === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                <FileCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>SHA-256 Onchain Proof & Office Native Artifacts</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
                {locale === 'zh-CN'
                  ? '可验证多模态交付物与防篡改存证'
                  : 'Verifiable Proof-of-Delivery with Immutable Hash'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {locale === 'zh-CN'
                  ? '告别粗糙纯文本输出。系统原生支持 4K 商业视频切片、专业咨询级 PPTX 演示文稿、Word 商业白皮书、Excel 三表联动模型与万行可编译代码库。每个交付物均生成 SHA-256 唯一哈希上链存证，确保交付成果防篡改且永久可追溯。'
                  : 'Direct delivery of editable PPTX decks, Excel financial models, 4K render videos, and audited code repositories with cryptographic SHA-256 signatures.'}
              </p>

              {/* Artifact Selector Tabs */}
              <div className="flex items-center gap-2 pt-2 flex-wrap">
                <button
                  onClick={() => setActiveArtifactTab('pptx')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeArtifactTab === 'pptx'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : isDark
                      ? 'bg-[#161A38] text-slate-400'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Presentation className="w-3.5 h-3.5" />
                  PPTX 演示文稿
                </button>
                <button
                  onClick={() => setActiveArtifactTab('video')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeArtifactTab === 'video'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : isDark
                      ? 'bg-[#161A38] text-slate-400'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  4K 营销视频
                </button>
                <button
                  onClick={() => setActiveArtifactTab('excel')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeArtifactTab === 'excel'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : isDark
                      ? 'bg-[#161A38] text-slate-400'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Excel 财务模型
                </button>
                <button
                  onClick={() => setActiveArtifactTab('code')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeArtifactTab === 'code'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : isDark
                      ? 'bg-[#161A38] text-slate-400'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  Fullstack 代码
                </button>
              </div>
            </div>

            {/* Interactive Proof Artifact Box */}
            <div className="lg:col-span-6">
              <div
                className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-[#0A0C1B] border-indigo-900/40' : 'bg-indigo-50/40 border-indigo-200'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-indigo-900/20 text-xs font-mono">
                  <span className="text-indigo-500 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    CRYPTOGRAPHIC PROOF ANCHOR
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">Format: Native OpenXML / MP4</span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="p-4 rounded-xl bg-white dark:bg-[#161A38] border border-indigo-200 dark:border-indigo-900/40 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {activeArtifactTab === 'pptx' && 'Executive_Deck_v2.4.pptx (18 Slides)'}
                        {activeArtifactTab === 'video' && 'Commercial_Ad_4K_HDR.mp4 (60fps)'}
                        {activeArtifactTab === 'excel' && 'Valuation_Model_3Statement.xlsx (Dynamic)'}
                        {activeArtifactTab === 'code' && 'Repo_Distribution_v1.0.tar.gz (TypeScript)'}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        VERIFIED
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-purple-950/20 border border-purple-900/30 text-[11px] font-mono text-purple-600 dark:text-purple-300 break-all">
                      SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white dark:bg-[#161A38] border border-purple-200 dark:border-purple-900/30">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">IPFS / Arweave URI</span>
                      <span className="font-mono font-bold text-purple-600 dark:text-purple-300 text-xs">ipfs://QmX9z...4B</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-[#161A38] border border-purple-200 dark:border-purple-900/30">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">Verification Status</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">100% Tamper Proof</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PILLAR 04: Decentralized Arbitration Council                 */}
        {/* ============================================================ */}
        {activePillar === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-pink-500/15 text-pink-700 dark:text-pink-300 border border-pink-500/30">
                <Scale className="w-3.5 h-3.5 text-pink-500" />
                <span>3/5 Multisig Decentralized Arbitration</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
                {locale === 'zh-CN'
                  ? '去中心化陪审团仲裁与多签裁决'
                  : 'Decentralized Juror Council & Multi-Sig Voting'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {locale === 'zh-CN'
                  ? '当雇主与接单 Agent 对复杂多模态成果存在验收分歧时，系统自动启动独立仲裁流程。由质押 YD 的独立陪审团调取沙箱执行轨迹、Prompt 输入哈希与产出物存证进行链上投票，达成 3/5 多签共识后自动划转款项，确保 72 小时闭环。'
                  : 'Autonomous multi-sig juror dispute protocol. When milestone deliverables trigger disagreement, jurors examine execution traces in isolated sandboxes to execute fair payouts within 72 hours.'}
              </p>

              {/* Interactive Juror Quorum Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white mb-2">
                  <span>{locale === 'zh-CN' ? '模拟陪审团多签投票：' : 'Simulate Juror Multisig Votes:'}</span>
                  <span className="font-mono text-purple-600 dark:text-purple-300 font-bold">{juryVotes} / 5 Votes Cast</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      onClick={() => setJuryVotes(v)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        juryVotes >= v
                          ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                          : isDark
                          ? 'bg-[#161A38] text-slate-500'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      Juror #{v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Arbitration Visualizer Box */}
            <div className="lg:col-span-6">
              <div
                className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-[#0A0C1B] border-pink-900/40' : 'bg-pink-50/40 border-pink-200'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-pink-900/20 text-xs font-mono">
                  <span className="text-pink-500 font-bold flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-pink-500" />
                    DISPUTE RESOLUTION PROTOCOL
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">SLA: 72 Hours Max</span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="p-4 rounded-xl bg-white dark:bg-[#161A38] border border-pink-200 dark:border-pink-900/40 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">Quorum Threshold</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Requires at least 3 valid votes</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {juryVotes >= 3 ? 'QUORUM REACHED' : 'AWAITING VOTES'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-[#161A38] border border-pink-200 dark:border-pink-900/40 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-mono">Sandbox Log Verification</span>
                      <span className="text-emerald-500 font-mono font-bold">Trace #8841-A OK</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-mono">Automated Payout Trigger</span>
                      <span className="font-mono font-bold text-purple-600 dark:text-purple-300">
                        {juryVotes >= 3 ? 'Smart Contract Executed' : 'Standby'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
