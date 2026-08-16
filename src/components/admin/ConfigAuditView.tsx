import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  ShieldCheck,
  Save,
  FileCode,
  CheckCircle2,
  ExternalLink,
  History,
  Coins
} from 'lucide-react';

export const ConfigAuditView: React.FC = () => {
  const { t, showToast, theme, locale } = useApp();
  const isDark = theme === 'dark';

  const [platformFeeBps, setPlatformFeeBps] = useState(200); // 2.0%
  const [stakeBps, setStakeBps] = useState(600); // 6.0%
  const [disputeDays, setDisputeDays] = useState(3);
  const [minTaskYD, setMinTaskYD] = useState(100);

  const auditEvents = [
    {
      id: 'aud-1',
      time: '2026-08-14 06:12:04 UTC',
      actor: '0x8b32...91ab (Admin Multisig)',
      event: locale === 'zh-CN' ? '更新平台最低质押门槛至 600 BPS (6.0%)' : 'Updated Platform Stake Requirement to 600 BPS',
      txHash: '0x39a1...1092'
    },
    {
      id: 'aud-2',
      time: '2026-08-13 22:45:10 UTC',
      actor: '0x3419...2284 (Operator)',
      event: locale === 'zh-CN' ? '已将新工具加入白名单能力池: `Alchemy_Simulation`' : 'Whitelisted new Tool Capability: `Alchemy_Simulation`',
      txHash: '0x71e2...5842'
    },
    {
      id: 'aud-3',
      time: '2026-08-13 14:19:00 UTC',
      actor: locale === 'zh-CN' ? '系统自动化守护进程' : 'System Autonomous',
      event: locale === 'zh-CN' ? 'Qdrant 向量索引完成重新均衡 (4,820 点)' : 'Qdrant collection index rebalanced (4,820 points)',
      txHash: 'Internal Log'
    }
  ];

  const handleSaveConfig = () => {
    showToast(
      locale === 'zh-CN'
        ? '平台核心治理参数已成功更新并广播至智能合约配置表！'
        : 'Platform governance parameters updated and broadcasted!',
      'success'
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#F59E0B]" />
            {t('config_title')}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            {t('config_subtitle')}
          </p>
        </div>

        <button
          onClick={handleSaveConfig}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0284C7] text-[#0A101F] hover:bg-[#0284C7]/90 transition-all flex items-center gap-2 shadow-md self-start md:self-auto cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {t('btn_save_gov_params')}
        </button>
      </div>

      {/* Governance Parameters Form */}
      <div
        className={`p-6 rounded-2xl border space-y-4 text-xs ${
          isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <h3 className="font-display font-semibold text-sm tracking-tight mb-2">
          {locale === 'zh-CN' ? '协议经济安全边界与费率 (BPS)' : 'Protocol Economic Safeguards & BPS'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-slate-300">
              {t('config_param_platform_fee')}
            </label>
            <input
              type="number"
              value={platformFeeBps}
              onChange={(e) => setPlatformFeeBps(Number(e.target.value))}
              className={`w-full p-2.5 rounded-xl border text-xs font-mono font-bold ${
                isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
              }`}
            />
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              {(platformFeeBps / 100).toFixed(2)}% {locale === 'zh-CN' ? '任务报酬手续费' : 'of task reward'}
            </span>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">
              {t('config_param_agent_stake')}
            </label>
            <input
              type="number"
              value={stakeBps}
              onChange={(e) => setStakeBps(Number(e.target.value))}
              className={`w-full p-2.5 rounded-xl border text-xs font-mono font-bold text-[#10B981] ${
                isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
              }`}
            />
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              {(stakeBps / 100).toFixed(2)}% {locale === 'zh-CN' ? '履约安全保证金' : 'performance bond'}
            </span>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">
              {t('config_param_dispute_days')}
            </label>
            <input
              type="number"
              value={disputeDays}
              onChange={(e) => setDisputeDays(Number(e.target.value))}
              className={`w-full p-2.5 rounded-xl border text-xs font-mono ${
                isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
              }`}
            />
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              {locale === 'zh-CN' ? '超时无争议自动结算' : 'Auto-settle if no dispute'}
            </span>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">
              {t('config_param_min_task')}
            </label>
            <input
              type="number"
              value={minTaskYD}
              onChange={(e) => setMinTaskYD(Number(e.target.value))}
              className={`w-full p-2.5 rounded-xl border text-xs font-mono text-[#F59E0B] ${
                isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
              }`}
            />
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              {locale === 'zh-CN' ? '防止粉尘任务攻击' : 'Base floor constraint'}
            </span>
          </div>
        </div>
      </div>

      {/* Contract Registry */}
      <div
        className={`p-6 rounded-2xl border space-y-4 text-xs ${
          isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <h3 className="font-display font-semibold text-sm tracking-tight mb-2">
          {t('config_registry_title')}
        </h3>

        <div className="space-y-2 font-mono text-[11px]">
          <div className="p-3 rounded-xl bg-[#0A101F] border border-[#1F2D4A] flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-sans">
                {locale === 'zh-CN' ? 'YD 治理与结算代币 (ERC-20)' : 'YD Token ERC-20'}
              </span>
              <span className="text-[#0284C7]">0x99B3a87898Ac363E7e399c6A01525A</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] text-[11px] font-sans font-medium">
              {t('status_badge_verified')}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#0A101F] border border-[#1F2D4A] flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-sans">
                {locale === 'zh-CN' ? '任务 Escrow 与质押金托管金库' : 'Task Escrow & Stake Vault'}
              </span>
              <span className="text-[#0284C7]">0x712A9aB349275BbcFe8490E7688B3</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] text-[11px] font-sans font-medium">
              {t('status_badge_verified')}
            </span>
          </div>
        </div>
      </div>

      {/* Immutable Governance Audit Log */}
      <div
        className={`p-5 rounded-2xl border ${
          isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <h3 className="font-display font-semibold text-sm tracking-tight mb-3 flex items-center gap-2">
          <History className="w-4 h-4 text-[#6366F1]" />
          {t('config_audit_history_title')}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                <th className="pb-2.5 font-medium">{locale === 'zh-CN' ? '时间戳' : 'Timestamp'}</th>
                <th className="pb-2.5 font-medium">{locale === 'zh-CN' ? '操作实体' : 'Actor'}</th>
                <th className="pb-2.5 font-medium">{locale === 'zh-CN' ? '事件说明' : 'Event Description'}</th>
                <th className="pb-2.5 font-medium text-right">{locale === 'zh-CN' ? '交易 / 日志哈希' : 'Tx / Log ID'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20 font-mono-tabular">
              {auditEvents.map((evt) => (
                <tr key={evt.id} className={isDark ? 'hover:bg-[#132036]/30' : 'hover:bg-slate-50'}>
                  <td className="py-3 text-slate-400 text-[11px]">{evt.time}</td>
                  <td className="py-3 font-mono text-[11px] text-[#0284C7]">{evt.actor}</td>
                  <td className="py-3 font-sans text-slate-200">{evt.event}</td>
                  <td className="py-3 text-right font-mono text-[11px] text-slate-400">
                    {evt.txHash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
