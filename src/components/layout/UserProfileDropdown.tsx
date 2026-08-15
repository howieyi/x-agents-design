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
  Moon,
  Sun,
  Globe,
  ChevronDown,
  ChevronRight,
  Check,
  Copy,
  ExternalLink,
  Shield,
  Sparkles,
  LogOut,
  Sliders,
  Flame
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
    showToast
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [hasCopiedAddress, setHasCopiedAddress] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

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
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button in Header */}
      <button
        id="btn-user-center-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-xl border transition-all ${
          isOpen
            ? isDark
              ? 'bg-[#111F34] border-[#36E4DA] ring-2 ring-[#36E4DA]/20'
              : 'bg-slate-100 border-sky-500 ring-2 ring-sky-500/20'
            : isDark
            ? 'bg-[#0C1728] border-[#243550] hover:bg-[#111F34] hover:border-[#36E4DA]/50'
            : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-xs'
        }`}
        aria-label={t('user_center')}
      >
        {/* Avatar with dynamic ring */}
        <div className="relative">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-8 h-8 rounded-lg object-cover border border-[#36E4DA]/50"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#35D07F] border-2 border-[#0C1728]" />
        </div>

        {/* User Quick Info */}
        <div className="hidden sm:block text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-xs leading-none">
              {userProfile.name}
            </span>
            <span className="text-[10px] px-1 py-0.2 rounded font-mono font-medium bg-[#7568FF]/20 text-[#7568FF]">
              {locale === 'zh-CN' ? '管理员' : 'Admin'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono leading-none block mt-1">
            {shortenAddress(activeWallet.address)}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#36E4DA]' : ''
          }`}
        />
      </button>

      {/* Partitioned Dropdown Menu */}
      {isOpen && (
        <div
          id="user-center-dropdown-menu"
          className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl z-50 overflow-hidden animate-fadeIn ${
            isDark ? 'bg-[#0C1728] border-[#243550] text-[#F4F7FB]' : 'bg-white border-slate-200 text-slate-900 shadow-xl'
          }`}
        >
          {/* ========================================================= */}
          {/* SECTION 1: 个人身份与概览 (User Identity & Overview) */}
          {/* ========================================================= */}
          <div className={`p-4 ${isDark ? 'bg-[#111F34]/70' : 'bg-slate-50'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-[#36E4DA] shadow-md shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm leading-tight">{userProfile.name}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#36E4DA]/20 text-[#36E4DA] font-semibold">
                      Pro
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{userProfile.handle}</p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[180px] mt-0.5">{userProfile.org}</p>
                </div>
              </div>
            </div>

            {/* Profile Maintenance Trigger Button */}
            <div className="mt-3">
              <button
                id="btn-open-profile-maintenance"
                onClick={handleOpenProfileModal}
                className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  isDark
                    ? 'bg-[#07111F] border-[#243550] hover:border-[#36E4DA] text-[#36E4DA] hover:bg-[#162740]'
                    : 'bg-white border-slate-200 hover:border-sky-400 text-sky-600 hover:bg-sky-50 shadow-xs'
                }`}
              >
                <UserCog className="w-4 h-4" />
                <span>{t('user_profile_edit')}</span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-700/20 max-h-[calc(85vh-160px)] overflow-y-auto">
            {/* ========================================================= */}
            {/* SECTION 2: 钱包与支付中心 (Wallets & Payments Hub) */}
            {/* ========================================================= */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-[#36E4DA]" />
                  {t('section_wallet_payments')}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md font-mono bg-[#35D07F]/10 text-[#35D07F] font-semibold">
                  Base Sepolia
                </span>
              </div>

              {/* Active Wallet Box */}
              <div
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs">{activeWallet.name}</span>
                    {activeWallet.provider === 'privy_embedded' && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-[#7568FF]/20 text-[#7568FF]">
                        Embedded
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[11px] font-mono text-slate-400">
                      {shortenAddress(activeWallet.address)}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="p-1 rounded hover:bg-slate-700/30 text-slate-400 hover:text-slate-200 transition-colors"
                      title={hasCopiedAddress ? 'Copied' : 'Copy address'}
                    >
                      {hasCopiedAddress ? (
                        <Check className="w-3 h-3 text-[#35D07F]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-right font-mono-tabular">
                  <span className="text-xs font-bold text-[#FFC857] block">
                    {ydBalance.toLocaleString()} YD
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {activeWallet.balances.ETH} ETH · ${activeWallet.balances.USDC}
                  </span>
                </div>
              </div>

              {/* Quick Acquire YD & Multi-Wallet Switch */}
              <div className="flex items-center gap-2">
                <button
                  id="btn-acquire-yd-dropdown"
                  onClick={() => {
                    setIsCheckoutOpen(true);
                    setIsOpen(false);
                  }}
                  className="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold bg-[#FFC857] text-[#07111F] hover:bg-[#ffcf6e] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Coins className="w-3.5 h-3.5" />
                  {t('acquire_yd')}
                </button>

                <button
                  onClick={() => handleNavigate('payments')}
                  className={`py-1.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isDark
                      ? 'border-[#243550] hover:bg-[#111F34] text-slate-300'
                      : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t('view_all_payments')}</span>
                </button>
              </div>

              {/* Linked Wallets Quick Selector */}
              {wallets.length > 1 && (
                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 font-medium block mb-1.5">
                    {t('switch_wallet')}:
                  </span>
                  <div className="space-y-1">
                    {wallets.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => setActiveWalletId(w.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          w.id === activeWallet.id
                            ? isDark
                              ? 'bg-[#111F34] text-[#36E4DA] font-semibold'
                              : 'bg-sky-50 text-sky-700 font-semibold'
                            : isDark
                            ? 'hover:bg-[#111F34]/50 text-slate-400 hover:text-slate-200'
                            : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="truncate max-w-[180px]">{w.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-400">
                            {shortenAddress(w.address)}
                          </span>
                          {w.id === activeWallet.id && <Check className="w-3.5 h-3.5 text-[#36E4DA]" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ========================================================= */}
            {/* SECTION 3: 主题与显示偏好 (Theme & Appearance Mode) */}
            {/* ========================================================= */}
            <div className="p-4 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-[#FFC857]" />
                {t('section_appearance')}
              </span>

              {/* Dark / Light Mode Segmented Toggle */}
              <div
                className={`p-1 rounded-xl border flex items-center gap-1 ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  id="btn-toggle-dark-mode"
                  onClick={() => !isDark && toggleTheme()}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    isDark
                      ? 'bg-[#111F34] text-[#FFC857] shadow-sm border border-[#243550]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{t('theme_dark_label')}</span>
                </button>

                <button
                  id="btn-toggle-light-mode"
                  onClick={() => isDark && toggleTheme()}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    !isDark
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t('theme_light_label')}</span>
                </button>
              </div>

              {/* Language Toggle */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#36E4DA]" />
                  <span className="text-xs text-slate-300 font-medium">{t('lang_toggle')}</span>
                </div>
                <button
                  id="btn-toggle-locale-dropdown"
                  onClick={toggleLocale}
                  className={`px-3 py-1 rounded-lg border text-xs font-bold font-mono transition-colors ${
                    isDark
                      ? 'border-[#243550] bg-[#07111F] text-slate-200 hover:border-[#36E4DA]'
                      : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {locale === 'zh-CN' ? '中文 (简体)' : 'English (US)'}
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SECTION 4: 系统设置与开发文档 (System Config & Dev Docs) */}
            {/* ========================================================= */}
            <div className="p-4 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-[#7568FF]" />
                {t('section_system_dev')}
              </span>

              <div className="space-y-1 pt-1">
                <button
                  id="btn-nav-settings-dropdown"
                  onClick={() => handleNavigate('settings')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                    isDark
                      ? 'hover:bg-[#111F34] text-slate-300 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sliders className="w-4 h-4 text-slate-400" />
                    <span>{t('quick_settings')}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  id="btn-nav-docs-dropdown"
                  onClick={() => handleNavigate('docs')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                    isDark
                      ? 'hover:bg-[#111F34] text-slate-300 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileCode className="w-4 h-4 text-[#36E4DA]" />
                    <span>{t('dev_documentation')}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>

                <button
                  id="btn-nav-support-dropdown"
                  onClick={() => handleNavigate('support')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                    isDark
                      ? 'hover:bg-[#111F34] text-slate-300 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LifeBuoy className="w-4 h-4 text-amber-400" />
                    <span>{t('online_support')}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* SECTION 5: 安全与重置 (Security & Session) */}
            {/* ========================================================= */}
            <div className="p-3 bg-slate-900/30">
              <button
                type="button"
                onClick={() => {
                  showToast(
                    locale === 'zh-CN'
                      ? '已重置本地会话与缓存，重新载入环境配置！'
                      : 'Local session and mock cache successfully reset!',
                    'info'
                  );
                  setIsOpen(false);
                }}
                className={`w-full py-1.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors ${
                  isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-[#111F34]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500" />
                <span>{t('disconnect_session')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
