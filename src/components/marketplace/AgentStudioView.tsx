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
  const { t, showToast, theme, locale, activeWallet, publishNewAgent, navigateTo } = useApp();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'metadata' | 'tools' | 'safeguards' | 'sandbox'>('metadata');
  const [agentName, setAgentName] = useState('SocialMatrix 全渠道社媒内容创作大师 v3.5');
  const [handle, setHandle] = useState('@socialmatrix_media');
  const [category, setCategory] = useState('全平台社媒素材矩阵');
  const [priceYD, setPriceYD] = useState(1100);
  const [maxSteps, setMaxSteps] = useState(50);
  const [maxTokens, setMaxTokens] = useState(160000);
  const [maxCostYD, setMaxCostYD] = useState(60);
  const [timeoutSec, setTimeoutSec] = useState(300);

  // Tools selector
  const [enabledTools, setEnabledTools] = useState<string[]>([
    'Flux_Pro_Renderer',
    'Runway_Gen3_Chunk_Gen',
    'Xiaohongshu_Card_Formatter',
    'PPTX_Generator_Engine'
  ]);

  const availableTools = [
    {
      id: 'Flux_Pro_Renderer',
      desc: locale === 'zh-CN' ? '调用 Flux.1 Pro / Midjourney 渲染 4K 商业海报与插画' : 'Render 4K commercial posters & illustrations via Flux.1 Pro / Midjourney'
    },
    {
      id: 'Runway_Gen3_Chunk_Gen',
      desc: locale === 'zh-CN' ? '并行生成短视频分片并保持镜头与角色一致性' : 'Generate short-video chunks in parallel with consistent characters'
    },
    {
      id: 'ElevenLabs_Voice_Synth',
      desc: locale === 'zh-CN' ? '合成拟真人声旁白并与画面毫秒级对齐' : 'Synthesize lifelike voiceover aligned to the timeline'
    },
    {
      id: 'Xiaohongshu_Card_Formatter',
      desc: locale === 'zh-CN' ? '生成小红书 3:4 视觉卡片与爆款种草文案' : 'Generate Xiaohongshu 3:4 cards and viral copy'
    },
    {
      id: 'Douyin_Script_Splitter',
      desc: locale === 'zh-CN' ? '抖音 15s/30s 黄金前 3 秒口播脚本与分镜' : 'Douyin/TikTok hook scripts and shot breakdowns'
    },
    {
      id: 'PPTX_Generator_Engine',
      desc: locale === 'zh-CN' ? '咨询级 16:9 商业 PPT 母版渲染与原生 .pptx 导出' : 'Consulting-grade PPT masters with native .pptx export'
    },
    {
      id: 'Docx_Template_Formatter',
      desc: locale === 'zh-CN' ? '长文档 Word 排版与多级目录、图表索引构建' : 'Word long-doc formatting with TOC and chart indexes'
    },
    {
      id: 'OpenPyXL_Sheet_Engine',
      desc: locale === 'zh-CN' ? 'Excel 财务模型与数据透视表自动生成' : 'Generate Excel financial models and pivot tables'
    }
  ];

  // Sandbox test run state
  const [testPrompt, setTestPrompt] = useState(
    locale === 'zh-CN'
      ? '为一款新中式茶饮品牌生成小红书 3:4 爆款图文封面与 3 套情绪共鸣种草文案。'
      : 'Generate Xiaohongshu 3:4 viral cards and 3 emotional resonance copy sets for a new-style tea brand.'
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
        ? '[00:00.012] [AgentRuntime] 初始化 LangGraph 创作状态机，挂载 4 个内容生成工具...'
        : '[00:00.012] [AgentRuntime] Initializing LangGraph creative state machine with 4 content tools...',
      locale === 'zh-CN'
        ? '[00:00.320] [Plan] 步骤 1: 提炼新中式茶饮卖点与情绪共鸣关键词...'
        : '[00:00.320] [Plan] Step 1: Distilling tea-brand selling points and emotional keywords...',
      locale === 'zh-CN'
        ? '[00:01.100] [Tool:Xiaohongshu_Card_Formatter] 已生成 3 组 3:4 视觉卡片与封面构图...'
        : '[00:01.100] [Tool:Xiaohongshu_Card_Formatter] Generated 3 sets of 3:4 visual cards & covers...',
      locale === 'zh-CN'
        ? '[00:01.890] [Verify] 校验标题公式、平台违禁词与标签矩阵...'
        : '[00:01.890] [Verify] Validating headline formulas, banned words & hashtag matrix...',
      locale === 'zh-CN'
        ? '[00:02.450] [Success] 0 违禁词。执行完成耗时 2.45s (消耗: 0.8 YD, Token: 1,420)。'
        : '[00:02.450] [Success] 0 banned words. Execution completed in 2.45s (Cost: 0.8 YD, Tokens: 1,420).'
    ]);

    setTimeout(() => {
      setIsRunningTest(false);
      showToast(
        locale === 'zh-CN'
          ? '沙箱测试执行完毕，素材生成符合平台规范！'
          : 'Sandbox test completed, assets conform to platform guidelines!',
        'success'
      );
    }, 2000);
  };

  const handlePublishVersion = () => {
    publishNewAgent({
      name: agentName,
      handle,
      category,
      priceYD,
      tags: [],
      tools: enabledTools
    });
    navigateTo('agents');
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
          className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-purple-500 hover:to-indigo-500 text-white transition-all flex items-center gap-2 shadow-md shadow-purple-500/20 self-start md:self-auto cursor-pointer"
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
              ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-xs'
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
              ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-xs'
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
              ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-xs'
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
              ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-xs'
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
            isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
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
                  isDark ? 'bg-[#0D1526] border-purple-900/50 text-white focus:border-purple-500' : 'bg-purple-50/50 border-purple-100 text-slate-900 focus:border-purple-400'
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
                  isDark ? 'bg-[#0D1526] border-purple-900/50 text-purple-400 focus:border-purple-500' : 'bg-purple-50/50 border-purple-100 text-purple-700 focus:border-purple-400'
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
                  isDark ? 'bg-[#0D1526] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'
                }`}
              >
                <option value="视频创作与分片串联">视频创作与分片串联</option>
                <option value="视觉与图片生成">视觉与图片生成</option>
                <option value="PPT / 演示文稿生成">PPT / 演示文稿生成</option>
                <option value="全平台社媒素材矩阵">全平台社媒素材矩阵</option>
                <option value="Excel / 财务与报表分析">Excel / 财务与报表分析</option>
                <option value="Word / 文档与 PRD 撰写">Word / 文档与 PRD 撰写</option>
                <option value="长篇故事与网文小说">长篇故事与网文小说</option>
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
                  isDark ? 'bg-[#0D1526] border-purple-900/50' : 'bg-purple-50/50 border-purple-100'
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
            isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
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
                      ? 'bg-[#0D1526] border-purple-900/40 opacity-70 hover:opacity-100'
                      : 'bg-white border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">{tool.id}</span>
                      {isEnabled && (
                        <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
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
            isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
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
                  isDark ? 'bg-[#0D1526] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'
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
                  isDark ? 'bg-[#0D1526] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'
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
                  isDark ? 'bg-[#0D1526] border-purple-900/50' : 'bg-purple-50/50 border-purple-100'
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
                  isDark ? 'bg-[#0D1526] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'
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
            isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
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
                  : 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-purple-500 hover:to-indigo-500 text-white cursor-pointer shadow-purple-500/20'
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
                isDark ? 'bg-[#0D1526] border-purple-900/50 text-white focus:border-purple-500' : 'bg-purple-50/50 border-purple-100 text-slate-900 focus:border-purple-400'
              }`}
            />
          </div>

          {/* Sandbox Live Execution Logs Output */}
          <div
            className={`p-4 rounded-2xl border font-mono text-xs space-y-2 min-h-[160px] ${
              isDark ? 'bg-[#0F121C] border-purple-900/50 text-purple-300' : 'bg-slate-900 border-slate-800 text-purple-300'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-purple-900/40 font-sans">
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
