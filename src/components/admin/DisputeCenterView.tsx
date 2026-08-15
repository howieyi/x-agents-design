import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockDisputeCase } from '../../data/mockData';
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Coins,
  ArrowRight,
  User,
  Bot,
  Layers,
  Key,
  Sparkles
} from 'lucide-react';

export const DisputeCenterView: React.FC = () => {
  const { t, showToast, theme, locale } = useApp();
  const isDark = theme === 'dark';

  const dispute = mockDisputeCase;
  const [selectedRuling, setSelectedRuling] = useState<'refund_owner' | 'split_60_40' | 'release_agent'>('split_60_40');
  const [hasSigned, setHasSigned] = useState(false);

  const handleSignMultisig = () => {
    setHasSigned(true);
    showToast(
      locale === 'zh-CN'
        ? '已成功提交仲裁多签签名 (3/5 达成法定共识)！'
        : 'Arbitration multisig signature submitted (3/5 quorum achieved)!',
      'success'
    );
  };

  const funderEvidence = dispute.evidence.filter((e) => e.submittedBy === 'owner');
  const agentEvidence = dispute.evidence.filter((e) => e.submittedBy === 'agent');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#FF647C]/20 text-[#FF647C]">
            {locale === 'zh-CN' ? '去中心化链上仲裁' : 'Decentralized Arbitration'}
          </span>
        </div>
        <h1 className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
          <Scale className="w-6 h-6 text-[#FF647C]" />
          {t('disputes_title')}
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          {t('disputes_subtitle')}
        </p>
      </div>

      {/* Active Case Banner */}
      <div
        className={`p-6 rounded-2xl border ${
          isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-700/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-[#FF647C]">
                {locale === 'zh-CN' ? `案件编号 #${dispute.id}` : `Case #${dispute.id}`}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#F6A63B]/15 text-[#F6A63B]">
                {locale === 'zh-CN' ? '仲裁审理中' : dispute.status.toUpperCase()}
              </span>
            </div>
            <h2 className="font-display font-bold text-lg mt-1">{dispute.taskTitle}</h2>
          </div>

          {/* Locked Funds */}
          <div className="flex items-center gap-4 text-xs font-mono-tabular">
            <div className="p-3 rounded-xl bg-[#07111F] border border-[#243550] text-center">
              <span className="text-[10px] text-slate-400 uppercase block">
                {locale === 'zh-CN' ? '锁定托管报酬' : 'Locked Escrow'}
              </span>
              <span className="font-bold text-[#FFC857] text-sm">{dispute.escrowAmountYD} YD</span>
            </div>
            <div className="p-3 rounded-xl bg-[#07111F] border border-[#243550] text-center">
              <span className="text-[10px] text-slate-400 uppercase block">
                {locale === 'zh-CN' ? 'Agent 质押金' : 'Agent Stake'}
              </span>
              <span className="font-bold text-[#35D07F] text-sm">{dispute.agentStakeYD} YD</span>
            </div>
          </div>
        </div>

        {/* AI Advisory Summary */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#7568FF]/10 border border-[#7568FF]/30 text-xs">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#7568FF] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#7568FF] mr-1">
                {locale === 'zh-CN' ? 'AI 独立审计评估与建议:' : 'AI Independent Audit Assessment:'}
              </span>
              <span className="text-slate-300 leading-relaxed">
                {locale === 'zh-CN' ? dispute.aiSummary.zh : dispute.aiSummary.en}
              </span>
            </div>
          </div>
        </div>

        {/* Parties summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs">
          <div className="p-3 rounded-xl bg-inherit border border-slate-700/20 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 text-[#36E4DA]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase">
                {locale === 'zh-CN' ? '任务发布方 (申诉人)' : 'Funder (Disputant)'}
              </p>
              <p className="font-semibold">Vortex Capital Quant Lab</p>
              <p className="font-mono text-[10px] text-slate-400">0x3F2a895b6c89DE15bc328f4E5F5d9A721C8d45E7</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-inherit border border-slate-700/20 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-[#7568FF]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase">
                {locale === 'zh-CN' ? 'Agent 执行方 (被申诉人)' : 'Agent Operator'}
              </p>
              <p className="font-semibold">{dispute.agentName}</p>
              <p className="font-mono text-[10px] text-slate-400">0x71C812b7aB724a2C6f272a8DEB7c65330e7688B3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Funder Claim */}
        <div
          className={`p-5 rounded-2xl border space-y-3 ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-rose-400 font-semibold">
            <AlertTriangle className="w-4 h-4" />
            <span>{locale === 'zh-CN' ? '发布方主张与拒绝验收理由' : "Funder's Claim & Rejection Reason"}</span>
          </div>
          <p className="text-slate-300 leading-relaxed bg-[#07111F] p-3 rounded-xl border border-[#243550] font-mono text-[11px]">
            &ldquo;{dispute.reason}&rdquo;
          </p>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              {locale === 'zh-CN' ? '已提交证据链' : 'Submitted Evidence'}
            </span>
            <ul className="space-y-2 text-slate-300">
              {funderEvidence.map((e) => (
                <li key={e.id} className="p-2.5 rounded-lg bg-[#07111F] border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                    <FileCode className="w-3.5 h-3.5 text-[#36E4DA]" />
                    <span>{e.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{e.notes}</p>
                  <p className="text-[10px] font-mono text-slate-500 truncate">{e.fileHash}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Agent Defense */}
        <div
          className={`p-5 rounded-2xl border space-y-3 ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-[#36E4DA] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>{locale === 'zh-CN' ? 'Agent 执行日志与技术答辩' : 'Agent Defense & Execution Logs'}</span>
          </div>
          <p className="text-slate-300 leading-relaxed bg-[#07111F] p-3 rounded-xl border border-[#243550] font-mono text-[11px]">
            {locale === 'zh-CN'
              ? '“交付成果完全遵照初始技术要求执行，Jito Bundle 适配器已更新并通过集成模拟测试。”'
              : '“Deliverable executed in accordance with baseline specification. Updated Jito Bundle adapter submitted with simulated passing tests.”'}
          </p>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              {locale === 'zh-CN' ? '加密可验证审计轨迹' : 'Cryptographic Audit Trail'}
            </span>
            <ul className="space-y-2 text-slate-300">
              {agentEvidence.map((e) => (
                <li key={e.id} className="p-2.5 rounded-lg bg-[#07111F] border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                    <FileCode className="w-3.5 h-3.5 text-[#7568FF]" />
                    <span>{e.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{e.notes}</p>
                  <p className="text-[10px] font-mono text-slate-500 truncate">{e.fileHash}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Multisig Arbitration Ruling Panel */}
      <div
        className={`p-6 rounded-2xl border space-y-5 ${
          isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display font-bold text-base">
              {locale === 'zh-CN' ? '多签仲裁裁决共识' : 'Multisig Ruling Consensus'}
            </h3>
            <p className="text-xs text-slate-400">
              {locale === 'zh-CN'
                ? `共识门槛: 已收集 ${hasSigned ? 3 : dispute.multisigApprovals.length} / ${dispute.multisigThreshold} 个有效签名`
                : `Threshold: ${hasSigned ? 3 : dispute.multisigApprovals.length} / ${dispute.multisigThreshold} signatures collected`}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              hasSigned ? 'bg-[#35D07F]/20 text-[#35D07F]' : 'bg-[#FFC857]/20 text-[#FFC857]'
            }`}
          >
            {hasSigned
              ? (locale === 'zh-CN' ? '已达成法定共识' : 'QUORUM ACHIEVED')
              : (locale === 'zh-CN' ? '等待仲裁员签名' : 'AWAITING OPERATOR SIGNATURE')}
          </span>
        </div>

        {/* Ruling Option Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <button
            onClick={() => setSelectedRuling('refund_owner')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedRuling === 'refund_owner'
                ? 'bg-[#FF647C]/15 border-[#FF647C] text-slate-200 font-semibold'
                : isDark
                ? 'bg-[#07111F] border-[#243550] text-slate-400'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <p className="font-bold">
              {locale === 'zh-CN' ? '100% 全额退款至发布方' : '100% Refund to Funder'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {locale === 'zh-CN' ? '罚没 Agent 6% 履约质押金 (72 YD)' : 'Forfeit Agent 6% Stake (72 YD)'}
            </p>
          </button>

          <button
            onClick={() => setSelectedRuling('split_60_40')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedRuling === 'split_60_40'
                ? 'bg-[#36E4DA]/15 border-[#36E4DA] text-slate-200 font-semibold'
                : isDark
                ? 'bg-[#07111F] border-[#243550] text-slate-400'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <p className="font-bold">
              {locale === 'zh-CN' ? '70% 退款 / 30% 支付 (AI 推荐)' : '70% Funder / 30% Agent (AI Recommended)'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {locale === 'zh-CN' ? '部分释放报酬，全额退还质押金' : 'Partial release, return stake'}
            </p>
          </button>

          <button
            onClick={() => setSelectedRuling('release_agent')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedRuling === 'release_agent'
                ? 'bg-[#35D07F]/15 border-[#35D07F] text-slate-200 font-semibold'
                : isDark
                ? 'bg-[#07111F] border-[#243550] text-slate-400'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <p className="font-bold">
              {locale === 'zh-CN' ? '100% 全额释放至 Agent' : '100% Release to Agent'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {locale === 'zh-CN' ? '全额发放报酬并退还 72 YD 质押' : 'Full reward + return 72 YD stake'}
            </p>
          </button>
        </div>

        {/* Sign Button */}
        <div className="pt-3 border-t border-slate-700/20 flex items-center justify-end">
          <button
            onClick={handleSignMultisig}
            disabled={hasSigned}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md ${
              !hasSigned
                ? 'bg-[#7568FF] text-white hover:bg-[#6355E0] cursor-pointer'
                : 'bg-[#35D07F]/20 text-[#35D07F] cursor-default'
            }`}
          >
            <Key className="w-4 h-4" />
            {hasSigned
              ? (locale === 'zh-CN' ? '多签裁决已上链签署 (3/5 达标)' : 'Multisig Transaction Signed (3/5)')
              : (locale === 'zh-CN' ? '使用仲裁密钥签名多签裁决交易' : 'Sign Multisig Ruling Transaction')}
          </button>
        </div>
      </div>
    </div>
  );
};
