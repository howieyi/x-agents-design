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
          <h1 className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-[#36E4DA]" />
            {t('studio_title')}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            {t('studio_subtitle')}
          </p>
        </div>

        <button
          onClick={handlePublishVersion}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#36E4DA] text-[#07111F] hover:bg-[#36E4DA]/90 transition-all flex items-center gap-2 shadow-md self-start md:self-auto cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {t('btn_publish_version')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-700/20 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('metadata')}
          className={`px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'metadata'
              ? isDark
                ? 'bg-[#111F34] text-[#36E4DA] font-semibold border border-[#36E4DA]/30'
                : 'bg-sky-100 text-sky-800 font-semibold border border-sky-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t('agent_info_tab')}
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'tools'
              ? isDark
                ? 'bg-[#111F34] text-[#36E4DA] font-semibold border border-[#36E4DA]/30'
                : 'bg-sky-100 text-sky-800 font-semibold border border-sky-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t('tool_permissions_tab')}
        </button>
        <button
          onClick={() => setActiveTab('safeguards')}
          className={`px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'safeguards'
              ? isDark
                ? 'bg-[#111F34] text-[#36E4DA] font-semibold border border-[#36E4DA]/30'
                : 'bg-sky-100 text-sky-800 font-semibold border border-sky-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t('runtime_limits_tab')}
        </button>
        <button
          onClick={() => setActiveTab('sandbox')}
          className={`px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'sandbox'
              ? isDark
                ? 'bg-[#111F34] text-[#36E4DA] font-semibold border border-[#36E4DA]/30'
                : 'bg-sky-100 text-sky-800 font-semibold border border-sky-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t('test_sandbox_tab')}
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'metadata' && (
        <div
          className={`p-6 rounded-2xl border space-y-4 text-xs ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">
                {t('agent_name_label')}
              </label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-300">
                {t('agent_handle_label')}
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-300">
                {t('agent_category_label')}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                <option value="Security & Audit">Security & Audit</option>
                <option value="AI & Data Engineering">AI & Data Engineering</option>
                <option value="Zero Knowledge & L2">Zero Knowledge & L2</option>
                <option value="Web3 Fullstack">Web3 Fullstack</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-300">
                {t('agent_rate_label')}
              </label>
              <input
                type="number"
                value={priceYD}
                onChange={(e) => setPriceYD(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border text-xs font-mono font-bold text-[#FFC857] focus:outline-none ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">
              {t('agent_payout_wallet_label')}
            </label>
            <input
              type="text"
              readOnly
              value={activeWallet.address}
              className={`w-full p-2.5 rounded-xl border text-xs font-mono text-slate-400 ${
                isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-100 border-slate-200'
              }`}
            />
          </div>
        </div>
      )}

      {activeTab === 'tools' && (
        <div
          className={`p-6 rounded-2xl border space-y-4 text-xs ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <p className="text-slate-400">
            {t('tools_permission_desc')}
          </p>

          <div className="space-y-2.5">
            {availableTools.map((tool) => {
              const isEnabled = enabledTools.includes(tool.id);
              return (
                <div
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    isEnabled
                      ? isDark
                        ? 'bg-[#111F34] border-[#36E4DA]/50 text-slate-200'
                        : 'bg-sky-50 border-sky-300 text-slate-900'
                      : isDark
                      ? 'bg-[#07111F] border-[#243550] text-slate-500 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div>
                    <span className="font-mono font-semibold text-xs text-[#36E4DA]">{tool.id}</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">{tool.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={() => {}}
                    className="w-4 h-4 accent-[#36E4DA]"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'safeguards' && (
        <div
          className={`p-6 rounded-2xl border space-y-4 text-xs ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">{t('max_steps')}</label>
              <input
                type="number"
                value={maxSteps}
                onChange={(e) => setMaxSteps(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border text-xs font-mono ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-300">{t('max_tokens')}</label>
              <input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border text-xs font-mono ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-300">{t('max_cost')}</label>
              <input
                type="number"
                value={maxCostYD}
                onChange={(e) => setMaxCostYD(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border text-xs font-mono text-[#FFC857] ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-300">{t('timeout_sec')}</label>
              <input
                type="number"
                value={timeoutSec}
                onChange={(e) => setTimeoutSec(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border text-xs font-mono ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sandbox' && (
        <div
          className={`p-6 rounded-2xl border space-y-4 text-xs ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div>
            <label className="block font-semibold mb-1.5 text-slate-300">
              {t('test_run_prompt')}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                className={`flex-1 p-2.5 rounded-xl border text-xs focus:outline-none ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              />
              <button
                onClick={handleStartTestRun}
                disabled={isRunningTest}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#7568FF] text-white hover:bg-[#6355E0] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer shrink-0"
              >
                <Play className="w-4 h-4" />
                {isRunningTest
                  ? (locale === 'zh-CN' ? '正在沙箱中执行...' : 'Executing...')
                  : t('btn_start_test_run')}
              </button>
            </div>
          </div>

          {/* Test Terminal Output */}
          <div
            className={`p-4 rounded-xl font-mono text-[11px] border min-h-[160px] space-y-1.5 ${
              isDark ? 'bg-[#07111F] border-[#243550] text-[#36E4DA]' : 'bg-slate-900 text-sky-400'
            }`}
          >
            {testLogs.length === 0 ? (
              <p className="text-slate-500">
                {locale === 'zh-CN'
                  ? '// 终端空闲中。输入 Prompt 后点击上方按钮模拟 LangGraph 状态机沙箱执行。'
                  : '// Terminal idle. Click Execute to simulate LangGraph execution.'}
              </p>
            ) : (
              testLogs.map((log, i) => <p key={i}>{log}</p>)
            )}
          </div>
        </div>
      )}
    </div>
  );
};
