import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  LayoutDashboard,
  Scale,
  Sliders,
  FileText,
  Settings,
  ArrowLeft,
  Lock,
  Radio,
  Server,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import { OperationsDashboardView } from './OperationsDashboardView';
import { DisputeCenterView } from './DisputeCenterView';
import { ConfigAuditView } from './ConfigAuditView';
import { DocsView } from '../common/DocsView';
import { SettingsView } from '../common/SettingsView';

export const AdminLayout: React.FC = () => {
  const {
    t,
    theme,
    locale,
    activeTab,
    setActiveTab,
    setSurface,
    tasks,
    activeWallet
  } = useApp();

  const isDark = theme === 'dark';

  const disputedCount = tasks.filter((t) => t.status === 'disputed').length + 1;

  const adminNavItems = [
    {
      id: 'ops',
      label: locale === 'zh-CN' ? '运营态势大盘' : 'Operations Telemetry',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: 'Live'
    },
    {
      id: 'disputes',
      label: locale === 'zh-CN' ? '争议仲裁与质押裁决' : 'Dispute Arbitration',
      icon: <Scale className="w-4 h-4" />,
      badge: disputedCount > 0 ? `${disputedCount}` : undefined,
      badgeColor: 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
    },
    {
      id: 'config',
      label: locale === 'zh-CN' ? '系统风控与配置审计' : 'Risk & Config Audit',
      icon: <Sliders className="w-4 h-4" />
    },
    {
      id: 'docs',
      label: locale === 'zh-CN' ? '开发文档与协议规范' : 'Developer Specs',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 'settings',
      label: locale === 'zh-CN' ? '系统偏好设置' : 'System Preferences',
      icon: <Settings className="w-4 h-4" />
    }
  ];

  const renderAdminView = () => {
    switch (activeTab) {
      case 'ops':
      case 'operations':
        return <OperationsDashboardView />;
      case 'disputes':
        return <DisputeCenterView />;
      case 'config':
        return <ConfigAuditView />;
      case 'docs':
        return <DocsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OperationsDashboardView />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDark ? 'bg-[#0D1320] text-[#F8FAFC]' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* Top Admin Telemetry Banner */}
      <div className="bg-[#0F1829] border-b border-indigo-900/50 text-xs px-4 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-300">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono font-bold text-[11px]">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>ADMIN MODE · OPERATOR CONSOLE</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 text-xs font-mono hidden md:inline">
            Operator: {activeWallet.address.slice(0, 8)}...{activeWallet.address.slice(-6)} (Multi-Sig 3/5)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Escrow Guard: ENFORCED</span>
          </div>

          <button
            onClick={() => {
              setSurface('marketplace');
              setActiveTab('home');
            }}
            className="px-3 py-1 rounded-lg bg-[#0284C7] text-[#0A101F] text-xs font-bold hover:bg-[#0284C7]/90 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{locale === 'zh-CN' ? '返回 C 端官网主页' : 'Exit to Consumer App'}</span>
          </button>
        </div>
      </div>

      {/* Admin Layout Body */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto">
        {/* Admin Left Sidebar */}
        <aside className={`w-64 shrink-0 border-r p-4 hidden lg:flex flex-col justify-between ${
          isDark ? 'bg-[#0B1220] border-[#202B3B]' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-3 px-3">
                {locale === 'zh-CN' ? '控制台管理模块' : 'Console Modules'}
              </div>
              <div className="space-y-1">
                {adminNavItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-[#6366F1]/20 text-indigo-300 border border-[#6366F1]/40 shadow-xs'
                          : isDark
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-indigo-400' : 'text-slate-500'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                            item.badgeColor || 'bg-indigo-500/20 text-indigo-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Admin Stats Widget */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
              <div className="text-[11px] font-mono text-slate-400 font-bold">
                {locale === 'zh-CN' ? '网络风控状态' : 'Risk Engine State'}
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Slashing Ratio:</span>
                <span className="font-mono font-bold text-rose-400">6.00%</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Auto-Dispute Window:</span>
                <span className="font-mono font-bold text-slate-200">72 Hours</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Contract Guard:</span>
                <span className="font-mono font-bold text-emerald-400">Active</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/60">
            <button
              onClick={() => {
                setSurface('marketplace');
                setActiveTab('home');
              }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{locale === 'zh-CN' ? '返回 C 端应用' : 'Back to Client App'}</span>
            </button>
          </div>
        </aside>

        {/* Admin Main View Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {/* Mobile Admin Nav Tabs */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-4 border-b border-slate-800">
            {adminNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {renderAdminView()}
        </main>
      </div>
    </div>
  );
};
