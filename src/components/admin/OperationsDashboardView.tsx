import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockDisputeCase } from '../../data/mockData';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  Scale,
  ShieldCheck,
  Radio,
  FileCode,
  ArrowRight,
  ExternalLink,
  Check
} from 'lucide-react';

export const OperationsDashboardView: React.FC = () => {
  const { t, systemStatus, setActiveTab, theme, locale, showToast } = useApp();
  const isDark = theme === 'dark';

  const handleApproveAgent = () => {
    showToast(
      locale === 'zh-CN'
        ? '已成功审批并通过 Hyperion Fullstack Agent 的准入资格！'
        : 'Hyperion Fullstack Agent v1.0.4 approved for marketplace listing!',
      'success'
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-[#6366F1]/20 text-[#6366F1]">
            {locale === 'zh-CN' ? '平台运营监控控制台' : 'Platform Operator Console'}
          </span>
        </div>
        <h1 className="font-display font-bold text-2xl tracking-tight">
          {t('ops_title')}
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          {t('ops_subtitle')}
        </p>
      </div>

      {/* High-Priority Attention Items Banner */}
      <div
        className={`p-5 rounded-2xl border transition-colors ${
          isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <h2 className="font-display font-semibold text-sm tracking-tight mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
          {t('ops_attention_banner')}
        </h2>

        <div className="p-4 rounded-xl border border-[#EF4444]/30 bg-[#EF4444]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#EF4444]">
                {locale === 'zh-CN' ? `争议案件 #${mockDisputeCase.id}` : `DISPUTE #${mockDisputeCase.id}`}
              </span>
              <span className="text-xs text-slate-300">· {mockDisputeCase.taskTitle}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {t('ops_dispute_desc')}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('disputes')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#EF4444] text-white hover:bg-[#EF4444] transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
          >
            {t('ops_btn_review_dispute')}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Infrastructure Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-tabular text-xs">
        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span>{locale === 'zh-CN' ? 'Base 节点同步' : 'Base EVM Sync'}</span>
            <Radio className="w-4 h-4 text-[#0284C7]" />
          </div>
          <p className="font-display text-xl font-bold text-[#10B981]">
            {locale === 'zh-CN' ? `区块 #${systemStatus.blockHeight}` : `Block #${systemStatus.blockHeight}`}
          </p>
          <p className="text-[11px] text-slate-400 mt-1 font-sans">
            {locale === 'zh-CN' ? '0 区块延迟 · RPC 42ms' : '0 Block Lag · RPC 42ms'}
          </p>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span>{locale === 'zh-CN' ? 'Qdrant 向量集群' : 'Qdrant Cluster'}</span>
            <Cpu className="w-4 h-4 text-[#6366F1]" />
          </div>
          <p className="font-display text-xl font-bold text-[#6366F1]">
            {locale === 'zh-CN' ? '4,820 个向量维度' : '4,820 Vectors'}
          </p>
          <p className="text-[11px] text-slate-400 mt-1 font-sans">
            {locale === 'zh-CN' ? 'P95 检索延迟: 34ms' : 'P95 Search: 34ms'}
          </p>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span>{locale === 'zh-CN' ? 'SQS / DLQ 死信队列' : 'SQS / DLQ Health'}</span>
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          </div>
          <p className="font-display text-xl font-bold text-[#10B981]">
            {locale === 'zh-CN' ? '0 条死信积压' : '0 in DLQ'}
          </p>
          <p className="text-[11px] text-slate-400 mt-1 font-sans">
            {locale === 'zh-CN' ? '队列延迟: 0s' : 'Queue Age: 0s'}
          </p>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span>{locale === 'zh-CN' ? '生效配置版本' : 'Active Config Profile'}</span>
            <Layers className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <p className="font-display text-base font-bold text-slate-200 truncate">
            {systemStatus.configVersion}
          </p>
          <p className="text-[11px] text-[#10B981] mt-1 font-sans">
            {locale === 'zh-CN' ? '已全量同步至边缘' : 'Edge Deployed'}
          </p>
        </div>
      </div>

      {/* Pending Agent Reviews Table */}
      <div
        className={`p-5 rounded-2xl border ${
          isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <h3 className="font-display font-semibold text-sm tracking-tight mb-3">
          {t('ops_agent_queue_title')}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                <th className="pb-2.5 font-medium">{t('ops_table_agent')}</th>
                <th className="pb-2.5 font-medium">{t('ops_table_author')}</th>
                <th className="pb-2.5 font-medium">{t('ops_table_tools')}</th>
                <th className="pb-2.5 font-medium">{t('ops_table_status')}</th>
                <th className="pb-2.5 font-medium text-right">{t('ops_table_actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20">
              <tr className={isDark ? 'hover:bg-[#132036]/30' : 'hover:bg-slate-50'}>
                <td className="py-3 font-semibold">Hyperion Fullstack Agent v1.0.4</td>
                <td className="py-3 text-slate-400">NovaWeb3 Studio</td>
                <td className="py-3 font-mono text-[11px] text-[#0284C7]">
                  Nextjs_Build_Runner, Viem_Caller
                </td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-[11px] bg-[#F59E0B]/15 text-[#F59E0B] font-medium">
                    {locale === 'zh-CN' ? '待审核' : 'Pending Review'}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button
                    onClick={handleApproveAgent}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#0284C7] text-[#0A101F] hover:bg-[#0284C7]/90 transition-colors cursor-pointer"
                  >
                    {t('ops_btn_approve')}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
