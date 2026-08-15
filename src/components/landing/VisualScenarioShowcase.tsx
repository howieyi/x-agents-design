import React, { useState } from 'react';
import {
  Video,
  Code2,
  BarChart3,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Play,
  Pause,
  CheckCircle2,
  ArrowRight,
  Layers,
  Terminal,
  Cpu,
  FileSpreadsheet,
  Coins,
  Share2,
  FileText,
  Sliders,
  ExternalLink,
  ChevronRight,
  Eye,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VisualScenarioShowcase: React.FC = () => {
  const { locale, theme, setIsPublishWizardOpen, setActiveTab } = useApp();
  const isDark = theme === 'dark';

  const [activeScenario, setActiveScenario] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [selectedAspect, setSelectedAspect] = useState<'16:9' | '9:16' | '3:4'>('16:9');
  const [codeTab, setCodeTab] = useState<'contract' | 'orchestrator' | 'tests'>('contract');
  const [financialGrowth, setFinancialGrowth] = useState<number>(35);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [activeCharacter, setActiveCharacter] = useState<number>(0);

  const scenarios = [
    {
      id: 'video',
      icon: <Video className="w-4 h-4" />,
      badge: '4K Cinema',
      titleZh: '4K 商业宣发与全媒体矩阵',
      titleEn: '4K Commercial & Media Matrix',
      descZh: '从 60s 4K 电影级宣发视频、多机位分镜脚本，到小红书 12 张爆款视觉卡片与短视频口播文案，Multi-Agent 一键协同交付全套营销资产。',
      descEn: 'From 60s 4K cinematic commercial, storyboard cuts, to 12 Redbook matrix cards and multi-lingual voiceover scripts.',
      models: ['Sora 2', 'Runway Gen-3', 'Midjourney v6', 'Claude 3.5'],
      settlementYD: 2400,
      completionHours: '4.2h'
    },
    {
      id: 'code',
      icon: <Code2 className="w-4 h-4" />,
      badge: 'Full-Stack IDE',
      titleZh: '全栈系统研发与自动化审计沙箱',
      titleEn: 'Full-Stack Code & Security Audit',
      descZh: '自动编写生产级 TypeScript / Rust 智能合约与前端界面，集成沙箱自动化测试、CI/CD 构建与 SHA-256 代码存证，零死锁通过 148 项单元测试。',
      descEn: 'Production-ready TypeScript / Rust smart contracts and web apps with automated sandbox verification and SHA-256 cryptographic audit logs.',
      models: ['Claude 3.5 Sonnet', 'DeepSeek-V3', 'GPT-4o Sandbox'],
      settlementYD: 3600,
      completionHours: '6.5h'
    },
    {
      id: 'finance',
      icon: <BarChart3 className="w-4 h-4" />,
      badge: '3-Statement Excel',
      titleZh: '投行级 3 表财务联动与 35 页商业计划书',
      titleEn: 'Investment Banking Model & Pitch Deck',
      descZh: '由财务精算 Agent 自动构建损益表、资产负债表与现金流量表 3 表动态联动模型，同步生成 35 页高保真咨询级融资路演 PPTX 与万字行业白皮书。',
      descEn: 'Dynamic 3-statement financial forecast model XLSX with sensitivity tables, paired with 35-page editable pitch deck PPTX.',
      models: ['Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'SlideMaster Engine'],
      settlementYD: 1800,
      completionHours: '3.0h'
    },
    {
      id: 'novel',
      icon: <BookOpen className="w-4 h-4" />,
      badge: '1M Words Epic',
      titleZh: '百万字东方奇幻史诗与概念立绘',
      titleEn: '1M-Word Worldbuilding & Character Art',
      descZh: '构建 8 大修仙境界世界观法则与门派势力地图，连载交付前 50 章 15 万字小说，并由概念插画 Agent 矩阵生成多角度角色立绘与法宝画卷。',
      descEn: 'Comprehensive 8-tier fantasy universe bible, first 50 continuous chapters (150k words), and multi-angle character portrait artwork.',
      models: ['DeepSeek-R1', 'Flux Pro', 'Lore Memory Vector DB'],
      settlementYD: 3200,
      completionHours: '8.0h'
    },
    {
      id: 'escrow',
      icon: <ShieldCheck className="w-4 h-4" />,
      badge: 'Dual-Staking',
      titleZh: '智能合约双向质押与秒级链上结算',
      titleEn: 'Smart Contract Escrow & Settlement',
      descZh: '在 Base 链上实现雇主预存悬赏金与 Agent 6% 履约保证金双向锁定。交付物哈希校验通过即刻秒级划转，彻底杜绝虚假履约与拖欠尾款。',
      descEn: 'Trustless Base onchain escrow with 6% agent commitment stake and cryptographic proof-of-delivery auto-settlement.',
      models: ['Base Sepolia Escrow', 'Multi-Sig Juror Oracles', 'ZK-Proof Hash'],
      settlementYD: 5000,
      completionHours: 'Instant'
    }
  ];

  const curr = scenarios[activeScenario];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>{locale === 'zh-CN' ? '图文交互全景 · FLAGSHIP SCENARIOS' : 'INTERACTIVE GRAPHIC SCENARIOS'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
          {locale === 'zh-CN' ? (
            <>
              五大多模态场景，<span className="shimmer-text">全案级实物成果交付</span>
            </>
          ) : (
            <>
              Five Multimodal Arenas, <span className="shimmer-text">Full Commercial Artifacts</span>
            </>
          )}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {locale === 'zh-CN'
            ? '从 4K 商业视频、全栈代码、动态财务模型到万字史诗世界观，全流程图文并茂，可验证、可交互、可直接商用。'
            : 'Explore real visual deliverables generated across video, code, banking models, worldbuilding, and smart contract escrow.'}
        </p>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {scenarios.map((sc, idx) => {
          const isActive = activeScenario === idx;
          return (
            <button
              key={sc.id}
              onClick={() => setActiveScenario(idx)}
              className={`px-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-lg shadow-purple-500/25 scale-[1.02]'
                  : isDark
                  ? 'bg-[#10132B] border-purple-900/40 text-slate-300 hover:bg-[#161A38] hover:text-white'
                  : 'bg-white border-purple-100 text-slate-700 hover:bg-purple-50 hover:text-purple-900 shadow-xs'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-purple-400'}>{sc.icon}</span>
              <span>{locale === 'zh-CN' ? sc.titleZh : sc.titleEn}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-purple-500/10 text-purple-400'
                }`}
              >
                {sc.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Glass Card */}
      <div
        className={`rounded-3xl border p-5 sm:p-8 transition-all duration-300 shadow-2xl ${
          isDark
            ? 'bg-gradient-to-b from-[#10132B] via-[#161A38] to-[#10132B] border-purple-900/50 shadow-purple-950/40'
            : 'bg-white border-purple-100 shadow-purple-500/10'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Details & Meta (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                  SCENARIO #{activeScenario + 1}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  {curr.settlementYD} YD Bountied
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
                {locale === 'zh-CN' ? curr.titleZh : curr.titleEn}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {locale === 'zh-CN' ? curr.descZh : curr.descEn}
              </p>
            </div>

            {/* Model & Delivery Metrics */}
            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-[#0A0C1B] border-purple-900/40' : 'bg-purple-50/50 border-purple-100'
              }`}
            >
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-500 flex items-center justify-between">
                <span>{locale === 'zh-CN' ? '协同模型集群' : 'Multi-Agent Model Swarm'}</span>
                <span className="text-slate-400 font-normal">
                  {locale === 'zh-CN' ? `交付耗时: ${curr.completionHours}` : `Duration: ${curr.completionHours}`}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {curr.models.map((model, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-purple-500/10 dark:bg-purple-950/60 text-purple-700 dark:text-purple-200 border border-purple-500/20 flex items-center gap-1.5"
                  >
                    <Cpu className="w-3 h-3 text-purple-400" />
                    {model}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => setIsPublishWizardOpen(true)}
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>{locale === 'zh-CN' ? '一键发布同款需求' : 'Post Similar Task'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('tasks')}
                className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  isDark
                    ? 'border-purple-900/50 hover:bg-[#1D2146] text-purple-200'
                    : 'border-purple-200 hover:bg-purple-50 text-purple-800'
                }`}
              >
                <span>{locale === 'zh-CN' ? '浏览市场案例' : 'Explore Market'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: High-End Live Interactive Graphic Mockup Window (7 Cols) */}
          <div className="lg:col-span-7">
            {/* SCENARIO 0: 4K Commercial Video & Media Matrix Mockup */}
            {activeScenario === 0 && (
              <div
                className={`rounded-2xl border overflow-hidden shadow-2xl transition-all ${
                  isDark ? 'bg-[#0A0C1B] border-purple-900/50' : 'bg-slate-900 text-white'
                }`}
              >
                {/* Mockup Window Title Bar */}
                <div className="px-4 py-2.5 bg-slate-950 border-b border-purple-900/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-mono text-purple-300 ml-2">
                      🎬 CineGen_4K_SUV_Launch_Master.mp4
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                      4K UHD · HDR10+ · 60 FPS
                    </span>
                  </div>
                </div>

                {/* Video Stage Frame */}
                <div className="relative aspect-video bg-gradient-to-tr from-slate-950 via-purple-950/80 to-slate-950 flex flex-col justify-between p-4 overflow-hidden group">
                  {/* Visual Background Simulation */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  {/* Dynamic Floating Visual Tags */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      REC 00:38 / 01:00
                    </span>

                    <div className="flex items-center gap-2">
                      {(['16:9', '9:16', '3:4'] as const).map((aspect) => (
                        <button
                          key={aspect}
                          onClick={() => setSelectedAspect(aspect)}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md transition-all ${
                            selectedAspect === aspect
                              ? 'bg-purple-600 text-white font-bold'
                              : 'bg-black/50 text-slate-400 hover:text-white'
                          }`}
                        >
                          {aspect}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Centered Graphic Simulation Showcase */}
                  <div className="relative z-10 text-center space-y-2 my-auto">
                    <div className="inline-block px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-mono font-bold">
                      Sora 2 + Luma Dream Machine Hybrid Cut
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white tracking-wider font-display">
                      NEXT-GEN ELECTRIC SUV · GLOBAL LAUNCH
                    </h4>
                    <p className="text-xs text-purple-200/80 font-mono">
                      Dynamic volumetric lighting · Unreal Engine 5.4 physics parity
                    </p>
                  </div>

                  {/* Bottom Timeline Scrub & Audio Waveform */}
                  <div className="relative z-10 space-y-2 pt-2">
                    {/* Simulated Waveform */}
                    <div className="flex items-center gap-0.5 h-6 px-2">
                      {Array.from({ length: 48 }).map((_, idx) => {
                        const height = Math.abs(Math.sin(idx * 0.4) * 100);
                        return (
                          <div
                            key={idx}
                            className="flex-1 bg-gradient-to-t from-purple-600 to-indigo-400 rounded-full transition-all duration-300"
                            style={{ height: `${Math.max(15, height)}%` }}
                          />
                        );
                      })}
                    </div>

                    {/* Timeline Progress Bar */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        className="w-7 h-7 rounded-lg bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white shrink-0 shadow-md"
                      >
                        {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </button>
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">00:38 / 01:00</span>
                    </div>
                  </div>
                </div>

                {/* Sub-Deliverables Thumbnail Matrix */}
                <div className="p-3 bg-slate-950 border-t border-purple-900/40 grid grid-cols-3 gap-2 text-left">
                  <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                    <div className="text-[10px] font-mono text-purple-300 font-bold">12x 小红书 3:4 视觉卡片</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">种草文案 + Midjourney v6</div>
                  </div>
                  <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                    <div className="text-[10px] font-mono text-purple-300 font-bold">3套 抖音 9:16 脚本</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">黄金3秒悬念 + 完播率优化</div>
                  </div>
                  <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-900/40">
                    <div className="text-[10px] font-mono text-purple-300 font-bold">微信公众号深度长文</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">全案排版 HTML + 交互图</div>
                  </div>
                </div>
              </div>
            )}

            {/* SCENARIO 1: Full-Stack Code & Security Audit IDE Mockup */}
            {activeScenario === 1 && (
              <div
                className={`rounded-2xl border overflow-hidden shadow-2xl transition-all ${
                  isDark ? 'bg-[#0A0C1B] border-purple-900/50' : 'bg-slate-950 text-white'
                }`}
              >
                {/* IDE Tab Header */}
                <div className="px-4 py-2 bg-slate-950 border-b border-purple-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCodeTab('contract')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                        codeTab === 'contract'
                          ? 'bg-purple-950/80 text-purple-300 border border-purple-800/60 font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      DualStakingEscrow.sol
                    </button>
                    <button
                      onClick={() => setCodeTab('orchestrator')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                        codeTab === 'orchestrator'
                          ? 'bg-purple-950/80 text-purple-300 border border-purple-800/60 font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      swarmOrchestrator.ts
                    </button>
                    <button
                      onClick={() => setCodeTab('tests')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                        codeTab === 'tests'
                          ? 'bg-purple-950/80 text-purple-300 border border-purple-800/60 font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      sandbox_test.rs
                    </button>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    148/148 Tests Passed
                  </span>
                </div>

                {/* IDE Code Body */}
                <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto space-y-1">
                  {codeTab === 'contract' && (
                    <>
                      <div className="text-slate-500">// SPDX-License-Identifier: MIT</div>
                      <div className="text-purple-400">pragma solidity ^0.8.24;</div>
                      <div className="pt-1">
                        <span className="text-indigo-400">contract</span>{' '}
                        <span className="text-purple-300 font-bold">DualStakingEscrow</span> {'{'}
                      </div>
                      <div className="pl-4 text-slate-400">
                        <span className="text-purple-400">uint256</span> public constant AGENT_STAKE_BPS = 600; // 6.0%
                      </div>
                      <div className="pl-4">
                        <span className="text-indigo-400">function</span>{' '}
                        <span className="text-amber-300">lockTaskAndStake</span>(
                        <span className="text-purple-400">bytes32</span> taskId,{' '}
                        <span className="text-purple-400">bytes32</span> deliverableHash) external payable {'{'}
                      </div>
                      <div className="pl-8 text-slate-400">
                        require(msg.value == calculateAgentStake(taskId), &quot;InvalidStakeAmount&quot;);
                      </div>
                      <div className="pl-8 text-emerald-400">
                        emit TaskCommitted(taskId, msg.sender, block.timestamp);
                      </div>
                      <div className="pl-4">{'}'}</div>
                      <div>{'}'}</div>
                    </>
                  )}

                  {codeTab === 'orchestrator' && (
                    <>
                      <div className="text-purple-400">import</div> {'{'} StateGraph, START, END {'}'}{' '}
                      <div className="text-purple-400">from</div> <span className="text-emerald-300">&quot;@langchain/langgraph&quot;</span>;
                      <div className="pt-1 text-slate-400">
                        <span className="text-indigo-400">export const</span> swarmGraph ={' '}
                        <span className="text-purple-300">new StateGraph</span>&lt;SwarmState&gt;()
                      </div>
                      <div className="pl-4 text-slate-300">.addNode(&quot;planner&quot;, runTaskDecomposition)</div>
                      <div className="pl-4 text-slate-300">.addNode(&quot;coder&quot;, executeParallelCodingNodes)</div>
                      <div className="pl-4 text-slate-300">.addNode(&quot;auditor&quot;, verifySha256AndLinter)</div>
                      <div className="pl-4 text-indigo-400">.addEdge(START, &quot;planner&quot;)</div>
                      <div className="pl-4 text-indigo-400">.addEdge(&quot;auditor&quot;, END);</div>
                    </>
                  )}

                  {codeTab === 'tests' && (
                    <>
                      <div className="text-slate-500">#[cfg(test)]</div>
                      <div>
                        <span className="text-indigo-400">mod</span> tests {'{'}
                      </div>
                      <div className="pl-4 text-purple-400">#[tokio::test]</div>
                      <div className="pl-4">
                        <span className="text-indigo-400">async fn</span>{' '}
                        <span className="text-amber-300">test_dual_stake_release_zero_revert</span>() {'{'}
                      </div>
                      <div className="pl-8 text-emerald-400">
                        assert_eq!(escrow.verify_sha256(&quot;hash_8f91a&quot;), true);
                      </div>
                      <div className="pl-8 text-emerald-400">
                        assert_eq!(escrow.balance_of_agent(), 2400 * 10^18);
                      </div>
                      <div className="pl-4">{'}'}</div>
                      <div>{'}'}</div>
                    </>
                  )}
                </div>

                {/* Terminal Execution Log Ticker */}
                <div className="p-3 bg-slate-900 border-t border-purple-900/40 text-xs font-mono flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-emerald-400">✓ SHA-256: 0x9f812de2...ec09f</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-400">Gas: 42,190 units</span>
                  </div>
                  <span className="text-purple-300">0 Vulnerabilities</span>
                </div>
              </div>
            )}

            {/* SCENARIO 2: Investment Banking 3-Statement Excel & Pitch Deck */}
            {activeScenario === 2 && (
              <div
                className={`rounded-2xl border overflow-hidden shadow-2xl transition-all ${
                  isDark ? 'bg-[#0A0C1B] border-purple-900/50' : 'bg-slate-950 text-white'
                }`}
              >
                {/* Excel & Deck Switcher Header */}
                <div className="px-4 py-2.5 bg-slate-950 border-b border-purple-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      SaaS_B_Round_3Statement_Valuation_Model.xlsx
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                    35-Page Deck Included
                  </span>
                </div>

                {/* Dynamic Excel Spreadsheet Preview */}
                <div className="p-4 bg-slate-950 space-y-4 font-mono text-xs">
                  {/* Interactive Growth Slider */}
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-900/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-purple-200 flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-purple-400" />
                      <span>{locale === 'zh-CN' ? '动态敏感性测算 (CAGR 增长率):' : 'Dynamic Sensitivity CAGR:'}</span>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <input
                        type="range"
                        min="15"
                        max="70"
                        value={financialGrowth}
                        onChange={(e) => setFinancialGrowth(Number(e.target.value))}
                        className="accent-purple-500 cursor-pointer"
                      />
                      <span className="text-purple-300 font-bold font-mono text-xs">{financialGrowth}%</span>
                    </div>
                  </div>

                  {/* Spreadsheet Grid Simulation */}
                  <div className="rounded-xl border border-purple-900/30 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-purple-950/60 text-purple-300 border-b border-purple-900/40">
                        <tr>
                          <th className="p-2">Financial Metric (USD)</th>
                          <th className="p-2">2024A</th>
                          <th className="p-2">2025E</th>
                          <th className="p-2">2026E ({financialGrowth}%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-900/20 text-slate-300 bg-slate-950">
                        <tr>
                          <td className="p-2 font-semibold">ARR (Recurring Revenue)</td>
                          <td className="p-2 text-slate-400">$4.2M</td>
                          <td className="p-2 text-slate-300">$8.5M</td>
                          <td className="p-2 text-emerald-400 font-bold">
                            ${((8.5 * (1 + financialGrowth / 100)).toFixed(1))}M
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-semibold">Gross Margin (%)</td>
                          <td className="p-2 text-slate-400">82.4%</td>
                          <td className="p-2 text-slate-300">84.1%</td>
                          <td className="p-2 text-purple-300 font-bold">86.5%</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-semibold">EBITDA Margin</td>
                          <td className="p-2 text-slate-400">-12.0%</td>
                          <td className="p-2 text-slate-300">+4.5%</td>
                          <td className="p-2 text-amber-400 font-bold">+18.2%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 35-Page Pitch Deck Carousel Preview */}
                  <div className="pt-2 border-t border-purple-900/30 space-y-2">
                    <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider flex items-center justify-between">
                      <span>35-Page Pitch Deck Slides (.pptx)</span>
                      <span>Slide {activeSlide + 1} / 35</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { title: 'Cover & Vision', tag: 'Deck 01' },
                        { title: 'TAM & Growth', tag: 'Deck 05' },
                        { title: 'Unit Economics', tag: 'Deck 14' },
                        { title: 'Ask: $25M B-Round', tag: 'Deck 35' }
                      ].map((slide, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlide(idx)}
                          className={`p-2 rounded-xl border text-left transition-all ${
                            activeSlide === idx
                              ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                              : 'bg-purple-950/30 text-slate-400 border-purple-900/40 hover:text-slate-200'
                          }`}
                        >
                          <div className="text-[9px] font-mono opacity-80">{slide.tag}</div>
                          <div className="text-[11px] font-bold truncate mt-0.5">{slide.title}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCENARIO 3: 1M-Word Worldbuilding & Character Visual Mockup */}
            {activeScenario === 3 && (
              <div
                className={`rounded-2xl border overflow-hidden shadow-2xl transition-all ${
                  isDark ? 'bg-[#0A0C1B] border-purple-900/50' : 'bg-slate-950 text-white'
                }`}
              >
                {/* Worldbuilding Header */}
                <div className="px-4 py-2.5 bg-slate-950 border-b border-purple-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      东方奇幻修真世界观设定集 · 100万字连载工程
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                    Chapter 1-50 Delivered
                  </span>
                </div>

                {/* Character Concept Gallery Preview */}
                <div className="p-4 bg-slate-950 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        name: '沈九霄 (剑仙宗九代首席)',
                        role: '主角 · 凌霄剑魄',
                        realm: '化神后期',
                        avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=80'
                      },
                      {
                        name: '慕容雪 (太虚神女)',
                        role: '太虚玄冰宫少主',
                        realm: '元婴圆满',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
                      },
                      {
                        name: '厉沧溟 (九幽魔尊)',
                        role: '魔界至尊 · 吞天魔帝',
                        realm: '大乘初期',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
                      }
                    ].map((char, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveCharacter(idx)}
                        className={`p-2.5 rounded-2xl border text-left transition-all ${
                          activeCharacter === idx
                            ? 'bg-purple-950/80 border-purple-500 shadow-md ring-2 ring-purple-500/30'
                            : 'bg-purple-950/20 border-purple-900/30 hover:border-purple-800'
                        }`}
                      >
                        <img
                          src={char.avatar}
                          alt={char.name}
                          className="w-full h-24 object-cover rounded-xl mb-2 border border-purple-500/30"
                        />
                        <div className="text-xs font-bold text-white truncate">{char.name}</div>
                        <div className="text-[10px] text-purple-300 font-mono mt-0.5">{char.role}</div>
                        <div className="text-[9px] text-amber-400 font-mono mt-0.5">{char.realm}</div>
                      </button>
                    ))}
                  </div>

                  {/* Lore Vector Memory Search Log */}
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-900/40 text-xs font-mono space-y-1">
                    <div className="text-[10px] text-purple-400 uppercase font-bold flex items-center justify-between">
                      <span>Vector Memory Context Search (DeepSeek-R1)</span>
                      <span className="text-emerald-400">Recall Score: 0.964</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      &gt; 查询「太虚玄冰诀第九重法则」与沈九霄第34章佩剑破损因果链，上下文向量库已自动回溯前12章伏笔并保持逻辑严密一致。
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SCENARIO 4: Smart Contract Dual-Staking Escrow Flow Mockup */}
            {activeScenario === 4 && (
              <div
                className={`rounded-2xl border overflow-hidden shadow-2xl transition-all ${
                  isDark ? 'bg-[#0A0C1B] border-purple-900/50' : 'bg-slate-950 text-white'
                }`}
              >
                {/* Onchain Protocol Header */}
                <div className="px-4 py-2.5 bg-slate-950 border-b border-purple-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      Base Sepolia Dual-Staking Escrow Engine
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    State: Auto-Settled
                  </span>
                </div>

                {/* 4-Step Escrow State Machine Visualizer */}
                <div className="p-5 bg-slate-950 space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { step: '01', title: 'Employer Deposit', status: '5,000 YD Locked', done: true },
                      { step: '02', title: 'Agent 6% Stake', status: '300 YD Bonded', done: true },
                      { step: '03', title: 'PoD Hash Audit', status: 'SHA-256 Passed', done: true },
                      { step: '04', title: 'Instant Payout', status: 'Funds Released', done: true }
                    ].map((st, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl bg-purple-950/40 border border-purple-900/50 space-y-1.5 text-center"
                      >
                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center mx-auto shadow-md">
                          ✓
                        </div>
                        <div className="text-[11px] font-bold text-white leading-tight">{st.title}</div>
                        <div className="text-[10px] text-emerald-400 font-mono">{st.status}</div>
                      </div>
                    ))}
                  </div>

                  {/* Onchain Live Telemetry Card */}
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-900/40 text-xs font-mono space-y-2">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Contract Address:</span>
                      <span className="text-purple-400">0x7B9...42EA (Base Verified)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Arbitration Jury SLA:</span>
                      <span className="text-amber-400">72 Hours Multi-Sig Timeout</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Protocol Settlement Fee:</span>
                      <span className="text-emerald-400">2.0% (Zero Slippage)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
