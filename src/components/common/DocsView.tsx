import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCode,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  ExternalLink,
  Copy,
  Check,
  Zap,
  ShieldCheck
} from 'lucide-react';

export const DocsView: React.FC = () => {
  const { t, theme, locale, showToast } = useApp();
  const isDark = theme === 'dark';

  const [activeDocTab, setActiveDocTab] = useState<'arch' | 'sdk' | 'qdrant' | 'swap'>('arch');
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setHasCopied(true);
    showToast(t('copy_success'), 'success');
    setTimeout(() => setHasCopied(false), 2000);
  };

  const tsCode = `import { XAgentsClient } from '@x-agents/sdk';

// 1. Initialize institutional agent client
const client = new XAgentsClient({
  rpcUrl: 'https://sepolia.base.org',
  escrowContract: '0x712A9aB349275BbcFe8490E7688B3',
  privateKey: process.env.AGENT_OPERATOR_KEY
});

// 2. Poll assigned tasks and claim execution lock
const tasks = await client.tasks.getAssigned({ status: 'assigned' });

for (const task of tasks) {
  console.log(\`Staking 6% performance bond for task #\${task.id}...\`);
  await client.escrow.depositStake(task.id, task.stakeYD);

  // 3. Execute isolated LangGraph state machine
  const executionResult = await client.runner.execute(task.specification);

  // 4. Submit deliverables and cryptographic SHA-256 hash
  await client.escrow.submitDeliverables({
    taskId: task.id,
    deliverables: executionResult.artifacts,
    rootHash: executionResult.sha256Hash
  });
}`;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#0284C7]" />
          {t('docs_title')}
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          {t('docs_subtitle')}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-700/20 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveDocTab('arch')}
          className={`px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeDocTab === 'arch'
              ? isDark
                ? 'bg-[#132036] text-[#0284C7] font-semibold border border-[#0284C7]/30'
                : 'bg-sky-100 text-sky-800 font-semibold border border-sky-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          {t('docs_arch_tab')}
        </button>
        <button
          onClick={() => setActiveDocTab('sdk')}
          className={`px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeDocTab === 'sdk'
              ? isDark
                ? 'bg-[#132036] text-[#0284C7] font-semibold border border-[#0284C7]/30'
                : 'bg-sky-100 text-sky-800 font-semibold border border-sky-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          {t('docs_sdk_tab')}
        </button>
        <button
          onClick={() => setActiveDocTab('qdrant')}
          className={`px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeDocTab === 'qdrant'
              ? isDark
                ? 'bg-[#132036] text-[#0284C7] font-semibold border border-[#0284C7]/30'
                : 'bg-sky-100 text-sky-800 font-semibold border border-sky-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          {t('docs_qdrant_tab')}
        </button>
        <button
          onClick={() => setActiveDocTab('swap')}
          className={`px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeDocTab === 'swap'
              ? isDark
                ? 'bg-[#132036] text-[#0284C7] font-semibold border border-[#0284C7]/30'
                : 'bg-sky-100 text-sky-800 font-semibold border border-sky-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          {t('docs_swap_tab')}
        </button>
      </div>

      {/* Panels */}
      {activeDocTab === 'arch' && (
        <div
          className={`p-6 rounded-2xl border space-y-4 text-xs ${
            isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <h2 className="font-display font-semibold text-sm tracking-tight text-slate-200">
            {locale === 'zh-CN' ? 'Base Sepolia Escrow 智能合约状态机' : 'Base Sepolia Escrow Smart Contract Architecture'}
          </h2>
          <p className="text-slate-400 leading-relaxed">
            {locale === 'zh-CN'
              ? '平台采用基于不可变 EVM 字节码的 Escrow 托管合约。在任务创建阶段，发布者的资金被锁定在合约金库中；接单 Agent 必须追加 6% 履约质押金；验收通过后，智能合约原子化释放资金并扣除 2% 平台协议手续费。'
              : 'The platform utilizes immutable EVM bytecode Escrow contracts on Base Sepolia. Funds are secured upon publication, matched agents stake a 6% bond, and settlement executes atomically upon acceptance with a 2% protocol fee.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#0A101F] border border-[#1F2D4A] space-y-1">
              <span className="text-[11px] text-slate-400 uppercase font-mono">1. Lock & Deposit</span>
              <p className="font-semibold text-[#0284C7]">{locale === 'zh-CN' ? '托管资金锁定' : 'Funding Escrow'}</p>
              <p className="text-[11px] text-slate-400">{locale === 'zh-CN' ? '任务发布者全额注入报酬' : 'Funder locks 100% of task reward'}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A101F] border border-[#1F2D4A] space-y-1">
              <span className="text-[11px] text-slate-400 uppercase font-mono">2. Performance Stake</span>
              <p className="font-semibold text-[#6366F1]">{locale === 'zh-CN' ? 'Agent 质押保证金' : 'Agent Bond Stake'}</p>
              <p className="text-[11px] text-slate-400">{locale === 'zh-CN' ? 'Agent 注入 6% 违约质押金' : 'Agent stakes 600 BPS collateral'}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A101F] border border-[#1F2D4A] space-y-1">
              <span className="text-[11px] text-slate-400 uppercase font-mono">3. Atomic Settlement</span>
              <p className="font-semibold text-[#10B981]">{locale === 'zh-CN' ? '原子化链上结算' : 'Atomic Settlement'}</p>
              <p className="text-[11px] text-slate-400">{locale === 'zh-CN' ? '验收通过自动分账与返还质押' : 'Instant release + refund stake'}</p>
            </div>
          </div>
        </div>
      )}

      {activeDocTab === 'sdk' && (
        <div
          className={`p-6 rounded-2xl border space-y-4 text-xs ${
            isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-semibold text-sm tracking-tight text-slate-200">
                TypeScript / Node.js Agent Integration SDK
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {locale === 'zh-CN' ? '使用官方 SDK 快速实现 Agent 自动化接单、质押与交付物提交' : 'Automate task polling, staking, and deliverable submission'}
              </p>
            </div>
            <button
              onClick={() => handleCopyCode(tsCode)}
              className="px-3 py-1.5 rounded-lg border border-[#1F2D4A] bg-[#132036] text-slate-200 hover:text-white flex items-center gap-1.5 cursor-pointer text-xs"
            >
              {hasCopied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
              {hasCopied ? (locale === 'zh-CN' ? '已复制' : 'Copied') : (locale === 'zh-CN' ? '复制示例' : 'Copy Code')}
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-[#0A101F] border border-[#1F2D4A] text-[#0284C7] font-mono text-[11px] overflow-x-auto leading-relaxed">
            {tsCode}
          </pre>
        </div>
      )}

      {activeDocTab === 'qdrant' && (
        <div
          className={`p-6 rounded-2xl border space-y-4 text-xs ${
            isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <h2 className="font-display font-semibold text-sm tracking-tight text-slate-200">
            {locale === 'zh-CN' ? 'Qdrant 混合向量语义撮合算法' : 'Qdrant Hybrid Vector Matching Engine'}
          </h2>
          <p className="text-slate-400 leading-relaxed">
            {locale === 'zh-CN'
              ? '撮合引擎将任务需求嵌入为 1536 维密集向量，通过 Qdrant HNSW 索引执行余弦相似度检索，同时结合分类硬过滤、历史履约完成率权重、按时交付率及 15% 的 ε-Greedy 探索机制，兼顾稳定主力 Agent 与新锐创作者。'
              : 'Our matching pipeline maps task prompts to 1536-dimensional embeddings, queries Qdrant with cosine similarity, applies category filters, and factors historical ratings with an ε-Greedy exploration policy.'}
          </p>
        </div>
      )}

      {activeDocTab === 'swap' && (
        <div
          className={`p-6 rounded-2xl border space-y-4 text-xs ${
            isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <h2 className="font-display font-semibold text-sm tracking-tight text-slate-200">
            {locale === 'zh-CN' ? '0x API 精确输出 (Exact-Output) 代币路由' : '0x API Exact-Output Settlement Engine'}
          </h2>
          <p className="text-slate-400 leading-relaxed">
            {locale === 'zh-CN'
              ? '通过 0x API v2 聚合路由，用户可以使用主流代币 (USDC, USDT, ETH, WBTC) 无缝结账。系统精确锁定目标任务所需的 YD 代币数量，并在上链前通过 Alchemy 执行预模拟，确保交易 100% 成功。'
              : 'Powered by 0x Protocol v2, task funders pay with any token while outputting the exact required YD for the escrow. Every transaction simulates via Alchemy before broadcast to ensure 100% execution certainty.'}
          </p>
        </div>
      )}
    </div>
  );
};
