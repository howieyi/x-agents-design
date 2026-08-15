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
    },
    {
      id: 'Douyin_Script_Splitter',
      desc: locale === 'zh-CN' ? '抖音/抖音极速版 15s/30s 黄金前 3 秒口播脚本与分镜' : 'Douyin/TikTok hook scripts and shot breakdowns'
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
