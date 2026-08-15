import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wrench,
  Cpu,
  Layers,
  ShieldCheck,
  Play,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Save,
  Sparkles,
  Coins
} from 'lucide-react';

export const AgentStudioView: React.FC = () => {
  const { t, showToast, theme, locale, activeWallet } = useApp();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'metadata' | 'tools' | 'safeguards' | 'sandbox'>('metadata');
  const [agentName, setAgentName] = useState('Atlas Cloud Engineer v2.5');
  const [handle, setHandle] = useState('@atlas_cloud');
  const [category, setCategory] = useState('Cloud & Infrastructure');
  const [priceYD, setPriceYD] = useState(1000);
  const [maxSteps, setMaxSteps] = useState(50);
  const [maxTokens, setMaxTokens] = useState(128000);
  const [maxCostYD, setMaxCostYD] = useState(60);
  const [timeoutSec, setTimeoutSec] = useState(300);

  // Tools selector
  const [enabledTools, setEnabledTools] = useState<string[]>([
    'AWS_SAM_Deploy',
    'PostgreSQL_Schema_Migrate',
    'Go_Fmt_Test_Runner',
    'Alchemy_Simulation'
  ]);

  const availableTools = [
    {
      id: 'AWS_SAM_Deploy',
      desc: locale === 'zh-CN' ? '部署并核验 AWS SAM 无服务器基础设施模板' : 'Deploy and validate AWS SAM serverless templates'
    },
    {
      id: 'PostgreSQL_Schema_Migrate',
      desc: locale === 'zh-CN' ? '执行幂等的 PostgreSQL 数据库 Schema DDL 迁移' : 'Execute idempotent database schema DDL migrations'
    },
    {
      id: 'Go_Fmt_Test_Runner',
      desc: locale === 'zh-CN' ? '运行 Go 单元测试与基准性能剖析' : 'Run Go unit tests and benchmark profiles'
    },
    {
      id: 'Alchemy_Simulation',
      desc: locale === 'zh-CN' ? '在 Base 链上预执行模拟 EVM 智能合约交易' : 'Pre-flight simulate EVM transactions on Base'
    },
    {
      id: 'Qdrant_Vector_Index',
      desc: locale === 'zh-CN' ? '向量集合的高性能 Upsert 写入与语义检索' : 'Upsert and query semantic vector collections'
    },
    {
      id: 'Foundry_Fuzz_Runner',
      desc: locale === 'zh-CN' ? '在 Solidity 智能合约上运行基于属性的模糊测试' : 'Run property-based fuzz tests in Solidity'
    }
  ];

  // Sandbox test run state
  const [testPrompt, setTestPrompt] = useState(
    locale === 'zh-CN'
      ? '生成具有死信队列 (DLQ) 和 5 分钟可见性超时的 AWS SQS 队列配置模板。'
      : 'Generate an AWS SQS queue with DLQ and 5-minute visibility timeout.'
  );
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testLogs, setTestLogs] = useState<string[]>([]);

  const toggleTool = (toolId: string) => {
    setEnabledTools((prev) =>
      prev.includes(toolId) ? prev.filter((t) => t !== toolId) : [...prev, toolId]
    );
  };

  const handleStartTestRun = () => {
    setIsRunningTest(true);
    setTestLogs([
      locale === 'zh-CN'
        ? '[00:00.012] [AgentRuntime] 初始化 LangGraph 状态机，挂载 4 个工具能力...'
        : '[00:00.012] [AgentRuntime] Initializing LangGraph state machine with 4 tools...',
      locale === 'zh-CN'
        ? '[00:00.320] [Plan] 步骤 1: 根据 AWS CloudFormation 标准校验输入约束...'
        : '[00:00.320] [Plan] Step 1: Validating input criteria against AWS CloudFormation schema...',
      locale === 'zh-CN'
        ? '[00:01.100] [Tool:AWS_SAM_Deploy] 已生成 template.yaml，配置 SQS FIFO 死信队列目标...'
        : '[00:01.100] [Tool:AWS_SAM_Deploy] Generated template.yaml with SQS FIFO Dead-Letter Target...',
      locale === 'zh-CN'
        ? '[00:01.890] [Verify] 在隔离沙箱中执行 `sam validate --lint` 静态分析...'
        : '[00:01.890] [Verify] Executing `sam validate --lint` in isolated sandbox...',
      locale === 'zh-CN'
        ? '[00:02.450] [Success] 0 错误。执行完成耗时 2.45s (消耗: 0.8 YD, Token: 1,420)。'
        : '[00:02.450] [Success] 0 errors. Execution completed in 2.45s (Cost: 0.8 YD, Tokens: 1,420).'
    ]);

    setTimeout(() => {
      setIsRunningTest(false);
      showToast(
        locale === 'zh-CN'
          ? '沙箱测试执行完毕，0 错误，完全符合规范！'
          : 'Sandbox test execution completed with 0 errors!',
        'success'
      );
    }, 2000);
  };

  const handlePublishVersion = () => {
    showToast(
      locale === 'zh-CN'
        ? '已成功发布不可变 Agent 版本快照 v2.5.0 并写入链上注册表！'
        : 'Successfully published immutable Agent snapshot v2.5.0!',
      'success'
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-purple-500" />
            {t('studio_title')}
          </h1>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1">
            {t('studio_subtitle')}
          </p>
        </div>

        <button
          onClick={handlePublishVersion}
          className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all flex items-center gap-2 shadow-md shadow-purple-500/20 self-start md:self-auto cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {t('btn_publish_version')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-purple-500/10 dark:border-purple-900/40 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('metadata')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'metadata'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-purple-950/30'
              : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
          }`}
        >
          {t('studio_tab_metadata')}
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'tools'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-purple-950/30'
              : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
          }`}
        >
          {t('studio_tab_tools')} ({enabledTools.length})
        </button>
        <button
          onClick={() => setActiveTab('safeguards')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'safeguards'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-purple-950/30'
              : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
          }`}
        >
          {t('studio_tab_safeguards')}
        </button>
        <button
          onClick={() => setActiveTab('sandbox')}
          className={`px-4 py-2 rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'sandbox'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-purple-950/30'
              : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
          }`}
        >
          {t('studio_tab_sandbox')}
        </button>
      </div>

      {/* TAB 1: METADATA & REWARD */}
      {activeTab === 'metadata' && (
        <div
          className={`p-6 rounded-3xl border space-y-5 ${
            isDark ? 'bg-[#10132B] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Agent Display Name
              </label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-xs focus:outline-none ${
                  isDark ? 'bg-[#0D0F24] border-purple-900/50 text-white focus:border-purple-500' : 'bg-purple-50/50 border-purple-100 text-slate-900 focus:border-purple-400'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Registry Handle Identifier
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-xs font-mono ${
                  isDark ? 'bg-[#0D0F24] border-purple-900/50 text-purple-400 focus:border-purple-500' : 'bg-purple-50/50 border-purple-100 text-purple-700 focus:border-purple-400'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Primary Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full p-3 rounded-2xl border text-xs cursor-pointer ${
                  isDark ? 'bg-[#0D0F24] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'
                }`}
              >
                <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                <option value="Security & Audit">Security & Smart Contract Audit</option>
                <option value="AI & Data Engineering">AI & Vector Indexing</option>
                <option value="Zero Knowledge & L2">Zero Knowledge & L2</option>
                <option value="Web3 Fullstack">Web3 Fullstack & Viem</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Base Execution Price (YD)
              </label>
              <input
                type="number"
                value={priceYD}
                onChange={(e) => setPriceYD(Number(e.target.value))}
                className={`w-full p-3 rounded-2xl border text-xs font-mono font-bold text-amber-600 dark:text-amber-400 ${
                  isDark ? 'bg-[#0D0F24] border-purple-900/50' : 'bg-purple-50/50 border-purple-100'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TOOLS & CAPABILITIES */}
      {activeTab === 'tools' && (
        <div
          className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-[#10132B] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              Deterministic Tool & Runtime Capabilities
            </h3>
            <span className="text-xs font-mono font-bold bg-purple-500/15 text-purple-600 dark:text-purple-300 px-2.5 py-1 rounded-full border border-purple-500/30">
              {enabledTools.length} Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {availableTools.map((tool) => {
              const isEnabled = enabledTools.includes(tool.id);
              return (
                <div
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isEnabled
                      ? isDark
                        ? 'bg-purple-950/30 border-purple-500 shadow-sm'
                        : 'bg-purple-50/80 border-purple-300 shadow-xs'
                      : isDark
                      ? 'bg-[#0D0F24] border-purple-900/40 opacity-70 hover:opacity-100'
                      : 'bg-white border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">{tool.id}</span>
                      {isEnabled && (
                        <span className="px-2 py-0.2 rounded text-[9px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">{tool.desc}</p>
                  </div>

                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 mt-1 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SAFEGUARDS & LIMITS */}
      {activeTab === 'safeguards' && (
        <div
          className={`p-6 rounded-3xl border space-y-5 ${
            isDark ? 'bg-[#10132B] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              Autonomous Budget & Execution Safeguards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Max ReAct Step Loop Count
              </label>
              <input
                type="number"
                value={maxSteps}
                onChange={(e) => setMaxSteps(Number(e.target.value))}
                className={`w-full p-3 rounded-2xl border text-xs font-mono ${
                  isDark ? 'bg-[#0D0F24] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Max Tokens Ceiling
              </label>
              <input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number(e.target.value))}
                className={`w-full p-3 rounded-2xl border text-xs font-mono ${
                  isDark ? 'bg-[#0D0F24] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Cost Cap (YD)
              </label>
              <input
                type="number"
                value={maxCostYD}
                onChange={(e) => setMaxCostYD(Number(e.target.value))}
                className={`w-full p-3 rounded-2xl border text-xs font-mono font-bold text-amber-600 dark:text-amber-400 ${
                  isDark ? 'bg-[#0D0F24] border-purple-900/50' : 'bg-purple-50/50 border-purple-100'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Sandbox Timeout (Seconds)
              </label>
              <input
                type="number"
                value={timeoutSec}
                onChange={(e) => setTimeoutSec(Number(e.target.value))}
                className={`w-full p-3 rounded-2xl border text-xs font-mono ${
                  isDark ? 'bg-[#0D0F24] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SANDBOX RUN */}
      {activeTab === 'sandbox' && (
        <div
          className={`p-6 rounded-3xl border space-y-4 ${
            isDark ? 'bg-[#10132B] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-500" />
              Isolated Testing Sandbox
            </h3>

            <button
              onClick={handleStartTestRun}
              disabled={isRunningTest}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-md ${
                isRunningTest
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white cursor-pointer shadow-purple-500/20'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              {isRunningTest ? 'Running Simulation...' : 'Run Test Benchmark'}
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Simulated Task Prompt
            </label>
            <textarea
              rows={2}
              value={testPrompt}
              onChange={(e) => setTestPrompt(e.target.value)}
              className={`w-full p-3 rounded-2xl border text-xs focus:outline-none ${
                isDark ? 'bg-[#0D0F24] border-purple-900/50 text-white focus:border-purple-500' : 'bg-purple-50/50 border-purple-100 text-slate-900 focus:border-purple-400'
              }`}
            />
          </div>

          {/* Sandbox Live Execution Logs Output */}
          <div
            className={`p-4 rounded-2xl border font-mono text-xs space-y-2 min-h-[160px] ${
              isDark ? 'bg-[#070914] border-purple-900/50 text-purple-300' : 'bg-slate-900 border-slate-800 text-purple-300'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-slate-400 pb-2 border-b border-purple-900/40 font-sans">
              <span>Terminal stdout / ReAct Tracer</span>
              <span>Firecracker v1.4 Sandbox</span>
            </div>

            {testLogs.length === 0 ? (
              <p className="text-slate-500 text-[11px] pt-4 text-center">
                Click "Run Test Benchmark" to trigger simulated multi-tool execution.
              </p>
            ) : (
              testLogs.map((log, i) => (
                <div key={i} className="text-[11px] leading-relaxed">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
