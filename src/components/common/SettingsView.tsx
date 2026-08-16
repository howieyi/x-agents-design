import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Shield,
  Zap,
  Globe,
  Bell,
  Save,
  RotateCcw,
  CheckCircle2,
  Lock,
  Key,
  Radio,
  Sliders,
  Moon,
  Sun
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { t, theme, toggleTheme, locale, toggleLocale, showToast } = useApp();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'network' | 'trading' | 'security' | 'alerts'>('network');

  // Network preferences
  const [rpcUrl, setRpcUrl] = useState('https://sepolia.base.org');
  const [alchemyKey, setAlchemyKey] = useState('alch_prod_sepolia_78291a84f');
  const [chainId, setChainId] = useState('84532');

  // Gas & Slippage
  const [gasStrategy, setGasStrategy] = useState<'normal' | 'fast' | 'instant'>('fast');
  const [slippageTolerance, setSlippageTolerance] = useState('0.5');
  const [autoWrapEth, setAutoWrapEth] = useState(true);

  // Security
  const [permit2Lifetime, setPermit2Lifetime] = useState('30');
  const [preflightSimulation, setPreflightSimulation] = useState(true);

  // Webhooks
  const [webhookUrl, setWebhookUrl] = useState('https://api.nexus-corp.internal/webhooks/agents-settlement');
  const [notifyOnMatch, setNotifyOnMatch] = useState(true);
  const [notifyOnDeliverable, setNotifyOnDeliverable] = useState(true);
  const [notifyOnDispute, setNotifyOnDispute] = useState(true);

  const handleSaveSettings = () => {
    showToast(
      locale === 'zh-CN'
        ? '系统偏好设置已成功保存并立即生效！'
        : 'System preferences saved and applied immediately!',
      'success'
    );
  };

  const handleResetDefaults = () => {
    setRpcUrl('https://sepolia.base.org');
    setAlchemyKey('alch_prod_sepolia_78291a84f');
    setGasStrategy('fast');
    setSlippageTolerance('0.5');
    showToast(
      locale === 'zh-CN' ? '已恢复系统默认设置参数' : 'Reset to default configurations',
      'info'
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#36E4DA]" />
            {t('settings_title')}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            {t('settings_subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleResetDefaults}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              isDark
                ? 'border-[#243550] bg-[#111F34] text-slate-300 hover:bg-[#152742]'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t('settings_reset_btn')}
          </button>
          <button
            onClick={handleSaveSettings}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#36E4DA] text-[#07111F] hover:bg-[#36E4DA]/90 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            {t('settings_save_btn')}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-700/20 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('network')}
          className={`px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'network'
              ? isDark
                ? 'bg-[#111F34] text-[#36E4DA] font-semibold border border-[#36E4DA]/30'
                : 'bg-sky-100 text-sky-800 font-semibold border border-sky-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          {t('settings_network_tab')}
        </button>
        <button
          onClick={() => setActiveTab('trading')}
          className={`px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'trading'
              ? isDark
                ? 'bg-[#111F34] text-[#36E4DA] font-semibold border border-[#36E4DA]/30'
                : 'bg-sky-100 text-sky-800 font-semibold border border-sky-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          {t('settings_trading_tab')}
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'security'
              ? isDark
                ? 'bg-[#111F34] text-[#36E4DA] font-semibold border border-[#36E4DA]/30'
                : 'bg-sky-100 text-sky-800 font-semibold border border-sky-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          {t('settings_security_tab')}
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`px-3.5 py-2 rounded-xl font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'alerts'
              ? isDark
                ? 'bg-[#111F34] text-[#36E4DA] font-semibold border border-[#36E4DA]/30'
                : 'bg-sky-100 text-sky-800 font-semibold border border-sky-200'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          {t('settings_notifications_tab')}
        </button>
      </div>

      {/* Panels */}
      {activeTab === 'network' && (
        <div
          className={`p-6 rounded-2xl border space-y-5 text-xs ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">
                {locale === 'zh-CN' ? 'Base Sepolia RPC 节点端点' : 'Base Sepolia RPC Endpoint'}
              </label>
              <input
                type="text"
                value={rpcUrl}
                onChange={(e) => setRpcUrl(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">
                {locale === 'zh-CN' ? 'Alchemy API Key (预执行模拟)' : 'Alchemy API Key (Simulation)'}
              </label>
              <input
                type="text"
                value={alchemyKey}
                onChange={(e) => setAlchemyKey(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">
                {locale === 'zh-CN' ? 'EVM 链 ID (Chain ID)' : 'EVM Chain ID'}
              </label>
              <input
                type="text"
                value={chainId}
                readOnly
                className={`w-full p-2.5 rounded-xl border text-xs font-mono text-slate-400 ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-100 border-slate-200'
                }`}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">
                {locale === 'zh-CN' ? '智能路由协议' : 'Routing Protocol'}
              </label>
              <input
                type="text"
                value="0x Protocol API v2 + Permit2"
                readOnly
                className={`w-full p-2.5 rounded-xl border text-xs font-mono text-[#36E4DA] ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-100 border-slate-200'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trading' && (
        <div
          className={`p-6 rounded-2xl border space-y-5 text-xs ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div>
            <label className="block font-semibold mb-2 text-slate-300">
              {locale === 'zh-CN' ? 'Gas 优先费加速策略' : 'Gas Priority Strategy'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['normal', 'fast', 'instant'] as const).map((strategy) => (
                <button
                  key={strategy}
                  type="button"
                  onClick={() => setGasStrategy(strategy)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    gasStrategy === strategy
                      ? 'bg-[#36E4DA]/15 border-[#36E4DA] text-slate-200 font-semibold'
                      : isDark
                      ? 'bg-[#07111F] border-[#243550] text-slate-400'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <p className="font-bold capitalize">{strategy}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {strategy === 'normal'
                      ? '1.2 Gwei · ~3s'
                      : strategy === 'fast'
                      ? '2.0 Gwei · ~1s'
                      : '3.5 Gwei · <500ms'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-300">
              {locale === 'zh-CN' ? '0x 兑换滑点容忍度 (%)' : '0x Swap Slippage Tolerance (%)'}
            </label>
            <div className="flex items-center gap-2">
              {['0.1', '0.5', '1.0'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSlippageTolerance(val)}
                  className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                    slippageTolerance === val
                      ? 'bg-[#36E4DA] text-[#07111F]'
                      : isDark
                      ? 'bg-[#07111F] border-[#243550] text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div
          className={`p-6 rounded-2xl border space-y-4 text-xs ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#07111F] border border-[#243550]">
              <div>
                <p className="font-semibold text-slate-200">
                  {locale === 'zh-CN' ? '强制交易预执行模拟 (Alchemy Simulation)' : 'Enforce Pre-flight Simulation'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {locale === 'zh-CN' ? '在广播到 Base 链之前检测任何可能的 Revert 失败风险' : 'Detect potential reverts before broadcasting to mempool'}
                </p>
              </div>
              <input
                type="checkbox"
                checked={preflightSimulation}
                onChange={(e) => setPreflightSimulation(e.target.checked)}
                className="w-4 h-4 accent-[#36E4DA]"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#07111F] border border-[#243550]">
              <div>
                <p className="font-semibold text-slate-200">
                  {locale === 'zh-CN' ? 'Permit2 签名有效期限制 (天)' : 'Permit2 Signature Validity (Days)'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {locale === 'zh-CN' ? '自动撤销过期的代币转账授权以增强冷钱包安全性' : 'Auto-expire token allowances for maximum safety'}
                </p>
              </div>
              <input
                type="number"
                value={permit2Lifetime}
                onChange={(e) => setPermit2Lifetime(e.target.value)}
                className="w-20 p-2 rounded-lg bg-[#0C1728] border border-[#243550] font-mono text-center"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div
          className={`p-6 rounded-2xl border space-y-4 text-xs ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div>
            <label className="block font-semibold mb-1 text-slate-300">
              {locale === 'zh-CN' ? 'Webhook 结算告警 URL' : 'Webhook Settlement Alert URL'}
            </label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className={`w-full p-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyOnMatch}
                onChange={(e) => setNotifyOnMatch(e.target.checked)}
                className="w-4 h-4 accent-[#36E4DA]"
              />
              <span className="text-slate-300">
                {locale === 'zh-CN' ? '当匹配到新的推荐 Agent 时发送通知' : 'Notify when a new top-tier Agent candidate matches'}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyOnDeliverable}
                onChange={(e) => setNotifyOnDeliverable(e.target.checked)}
                className="w-4 h-4 accent-[#36E4DA]"
              />
              <span className="text-slate-300">
                {locale === 'zh-CN' ? '当 Agent 提交最终交付成果时发送通知' : 'Notify when Agent submits milestone deliverables'}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyOnDispute}
                onChange={(e) => setNotifyOnDispute(e.target.checked)}
                className="w-4 h-4 accent-[#36E4DA]"
              />
              <span className="text-slate-300">
                {locale === 'zh-CN' ? '当有任务进入多签仲裁争议时触发高优先级告警' : 'High-priority alert when dispute enters multisig arbitration'}
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
