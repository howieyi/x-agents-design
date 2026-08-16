import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  UserCog,
  Wallet,
  Coins,
  CreditCard,
  Settings,
  FileCode,
  LifeBuoy,
  Globe,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  Check,
  Copy,
  ExternalLink,
  Shield,
  Sparkles,
  LogOut,
  Sliders,
  Layers,
  Wrench,
  Bot,
  Flame,
  ArrowUpRight,
  Radar
} from 'lucide-react';

export const UserProfileDropdown: React.FC = () => {
  const {
    t,
    theme,
    toggleTheme,
    locale,
    toggleLocale,
    userProfile,
    setIsProfileModalOpen,
    ydBalance,
    wallets,
    activeWallet,
    setActiveWalletId,
    setIsCheckoutOpen,
    setActiveTab,
    setSurface,
    tasks,
    logout,
    showToast
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [hasCopiedAddress, setHasCopiedAddress] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const activeTasksCount = tasks.filter((task) =>
    ['open', 'matching', 'assigned', 'in_progress', 'submitted'].includes(task.status)
  ).length;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const shortenAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(activeWallet.address);
    setHasCopiedAddress(true);
    showToast(t('copy_success'), 'success');
    setTimeout(() => setHasCopiedAddress(false), 2000);
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
    setIsOpen(false);
  };

  const handleOpenAdminConsole = () => {
    setSurface('admin');
    setActiveTab('ops');
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button in Header */}
      <button
        id="btn-user-center-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl border transition-all ${
          isOpen
            ? isDark
              ? 'bg-[#16233C] border-[#0EA5E9] ring-2 ring-purple-500/25 shadow-sm'
              : 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/25 shadow-sm'
            : isDark
            ? 'bg-[#101A2E] border-purple-900/40 hover:bg-[#16233C] hover:border-purple-500/50'
            : 'bg-white border-purple-100 hover:bg-purple-50/50 hover:border-purple-300 shadow-xs'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User Account Menu"
      >
        <div className="relative">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-7 h-7 rounded-lg object-cover border border-purple-500/50 shrink-0 shadow-xs"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-[#0A101F]" />
        </div>

        <div className="text-left hidden sm:block">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{userProfile.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
              PRO
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-0.5 block leading-none">
            {shortenAddress(activeWallet.address)}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-purple-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-purple-500' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Card */}
      {isOpen && (
        <div
          id="user-center-dropdown-menu"
          className={`absolute right-0 mt-2 w-84 sm:w-92 rounded-2xl border shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-fadeIn ${
            isDark
              ? 'bg-[#101A2E]/98 border-purple-900/50 text-[#F8FAFC] shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
              : 'bg-white/98 border-purple-100 text-slate-900 shadow-[0_20px_50px_rgba(124,58,237,0.15)]'
          }`}
        >
          {/* Header Profile Identity */}
          <div
            className={`p-4 border-b ${
              isDark
                ? 'bg-gradient-to-br from-[#16233C] to-[#101A2E] border-purple-900/40'
                : 'bg-gradient-to-br from-purple-50/80 via-white to-purple-50/40 border-purple-100'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-purple-500 shadow-md shadow-purple-500/20 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm leading-tight text-slate-900 dark:text-white">{userProfile.name}</h3>
                    <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 font-bold font-mono border border-purple-500/30">
                      Pro Node
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-600/70 dark:text-purple-300/70 font-mono mt-0.5">{userProfile.handle}</p>
                  <p className="text-[11px] text-slate-400 truncate max-w-[180px] mt-0.5">{userProfile.org}</p>
                </div>
              </div>

              <button
                id="btn-open-profile-maintenance"
                onClick={handleOpenProfileModal}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-[#0A101F] border-purple-900/50 hover:border-purple-400 text-purple-300 hover:bg-[#16233C]'
                    : 'bg-white border-purple-200 hover:border-purple-400 text-purple-700 hover:bg-purple-50 shadow-xs'
                }`}
                title={locale === 'zh-CN' ? '编辑个人资料与通知偏好' : 'Edit Profile'}
              >
                <UserCog className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-700/20 max-h-[calc(85vh-140px)] overflow-y-auto">
            {/* ========================================================= */}
            {/* SECTION 1: 资产与质押中心 (My Wallets & Escrow Balance) */}
            {/* ========================================================= */}
            <div className="p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 font-mono flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-purple-400" />
                  {locale === 'zh-CN' ? '我的资产与质押' : 'My Assets & Escrow'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-purple-500/15 text-purple-400 font-semibold border border-purple-500/20">
                  Base Sepolia
                </span>
              </div>

              {/* Active Wallet Box */}
              <div
                className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-[#0A101F] border-purple-900/40' : 'bg-purple-50/50 border-purple-100'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-slate-900 dark:text-white">{activeWallet.name}</span>
                    {activeWallet.provider === 'privy_embedded' && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
                        Embedded
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] font-mono text-purple-400/80 dark:text-purple-300/60">
                      {shortenAddress(activeWallet.address)}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="p-0.5 rounded hover:bg-purple-500/20 text-purple-400 hover:text-purple-200 transition-colors"
                      title={hasCopiedAddress ? 'Copied' : 'Copy address'}
                    >
                      {hasCopiedAddress ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-right font-mono-tabular">
                  <span className="text-xs font-bold text-amber-500 dark:text-amber-400 block">
                    {ydBalance.toLocaleString()} YD
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {activeWallet.balances.ETH} ETH · ${activeWallet.balances.USDC}
                  </span>
                </div>
              </div>

              {/* Quick Actions: Acquire YD & View Wallets */}
              <div className="flex items-center gap-2">
                <button
                  id="btn-acquire-yd-dropdown"
                  onClick={() => {
                    setIsCheckoutOpen(true);
                    setIsOpen(false);
                  }}
                  className="flex-1 py-2 px-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-purple-500 hover:to-indigo-500 text-white transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-purple-500/20"
                >
                  <Coins className="w-3.5 h-3.5 text-amber-300" />
                  <span>{locale === 'zh-CN' ? '充值 YD 质押金' : 'Acquire YD'}</span>
                </button>

                <button
                  onClick={() => handleNavigate('wallets')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isDark
                      ? 'border-purple-900/40 hover:bg-[#16233C] text-purple-200'
                      : 'border-purple-200 hover:bg-purple-50 text-purple-800'
                  }`}
                  title={locale === 'zh-CN' ? '查看钱包详情与链上账单' : 'View Wallets & Ledger'}
                >
                  <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                  <span>{locale === 'zh-CN' ? '资产明细' : 'Assets'}</span>
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SECTION 2: 我的订单 (My Orders) */}
            {/* ========================================================= */}
            <div className="p-3.5 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 font-mono flex items-center gap-1.5 mb-2">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                {locale === 'zh-CN' ? '我的订单与资产' : 'My Orders & Assets'}
              </span>

              
            </div>

            {/* ========================================================= */}
            {/* SECTION 3: 管理权限控制台 (Admin Management Console) */}
            {/* ========================================================= */}
            <div className="p-3.5 bg-gradient-to-r from-purple-950/30 to-indigo-950/30">
              <button
                id="btn-nav-admin-console-dropdown"
                onClick={handleOpenAdminConsole}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                  isDark
                    ? 'bg-[#16233C]/90 border-purple-500/40 text-purple-200 hover:border-purple-400 hover:bg-[#1A2942]'
                    : 'bg-purple-50/90 border-purple-200 text-purple-900 hover:bg-purple-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white shadow-xs">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold">{locale === 'zh-CN' ? '管理控制台' : 'Admin Console'}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-amber-500 text-slate-950">
                        ADMIN
                      </span>
                    </div>
                    <span className="text-[11px] text-purple-300/70 dark:text-purple-300/60 block mt-0.5">
                      {locale === 'zh-CN' ? '运营监控 · 争议仲裁 · 风控审计' : 'Ops, Disputes & Risk Auditing'}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-purple-400" />
              </button>
            </div>

            {/* ========================================================= */}
            {/* SECTION 4: 开发者生态与支持 (Developer & Support) */}
            {/* ========================================================= */}
            <div className="p-3.5 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 font-mono flex items-center gap-1.5 mb-1.5">
                <FileCode className="w-3.5 h-3.5 text-purple-400" />
                {locale === 'zh-CN' ? '生态与支持' : 'Developer & Support'}
              </span>

              <button
                id="btn-nav-docs-dropdown"
                onClick={() => handleNavigate('docs')}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                  isDark
                    ? 'hover:bg-[#16233C] text-slate-300 hover:text-white'
                    : 'hover:bg-purple-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-purple-400" />
                  <span>{locale === 'zh-CN' ? '开发者接入文档' : 'Developer Docs'}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                id="btn-nav-support-dropdown"
                onClick={() => handleNavigate('support')}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                  isDark
                    ? 'hover:bg-[#16233C] text-slate-300 hover:text-white'
                    : 'hover:bg-purple-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <LifeBuoy className="w-4 h-4 text-amber-400" />
                  <span>{locale === 'zh-CN' ? '在线技术支持' : 'Technical Support'}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                id="btn-nav-settings-dropdown"
                onClick={() => handleNavigate('settings')}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                  isDark
                    ? 'hover:bg-[#16233C] text-slate-300 hover:text-white'
                    : 'hover:bg-purple-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-400" />
                  <span>{locale === 'zh-CN' ? '系统偏好设置' : 'Preferences'}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            {/* ========================================================= */}
            {/* SECTION 5: 偏好设置 (Theme & Language) */}
            {/* ========================================================= */}
            <div className="p-3.5 space-y-2.5 bg-blue-50/50 dark:bg-blue-950/30">
              <div className="flex items-center justify-between gap-2">
                {/* Dark / Light Toggle */}
                <div
                  className={`p-0.5 rounded-xl border flex items-center gap-1 flex-1 ${
                    isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <button
                    id="btn-toggle-dark-mode"
                    onClick={() => !isDark && toggleTheme()}
                    className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isDark
                        ? 'bg-[#16233C] text-sky-300 shadow-xs border border-[#1F2D4A] font-bold'
                        : 'text-slate-500 hover:text-blue-700'
                    }`}
                  >
                    <Moon className="w-3 h-3" />
                    <span>{locale === 'zh-CN' ? '深色' : 'Dark'}</span>
                  </button>

                  <button
                    id="btn-toggle-light-mode"
                    onClick={() => isDark && toggleTheme()}
                    className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      !isDark
                        ? 'bg-white text-blue-700 shadow-xs border border-blue-200 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sun className="w-3 h-3 text-amber-500" />
                    <span>{locale === 'zh-CN' ? '浅色' : 'Light'}</span>
                  </button>
                </div>

                {/* Language Toggle */}
                <button
                  id="btn-toggle-locale-dropdown"
                  onClick={toggleLocale}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-mono transition-colors flex items-center gap-1.5 ${
                    isDark
                      ? 'border-[#1F2D4A] bg-[#0A101F] text-sky-300 hover:border-sky-500'
                      : 'border-blue-200 bg-white text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{locale === 'zh-CN' ? '中' : 'EN'}</span>
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SECTION 6: 安全与退出 (Security & Session) */}
            {/* ========================================================= */}
            <div className="p-3 bg-purple-950/20 space-y-1">
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className={`w-full py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors ${
                  isDark
                    ? 'text-rose-300/80 hover:text-rose-300 hover:bg-rose-500/10'
                    : 'text-rose-600 hover:text-rose-700 hover:bg-rose-50'
                }`}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{locale === 'zh-CN' ? '退出登录' : 'Sign Out'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
