import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Coins,
  Shield,
  Search,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { UserProfileDropdown } from './UserProfileDropdown';

interface HeaderProps {
  onToggleMobileSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  isMobileSidebarOpen = false
}) => {
  const {
    t,
    theme,
    surface,
    setSurface,
    ydBalance,
    setIsCheckoutOpen,
    setActiveTab
  } = useApp();

  const isDark = theme === 'dark';

  return (
    <header
      id="app-header"
      className={`sticky top-0 z-30 w-full border-b transition-colors ${
        isDark
          ? 'bg-[#0C1728]/95 border-[#243550] backdrop-blur-md text-[#F4F7FB]'
          : 'bg-white/95 border-slate-200 backdrop-blur-md text-slate-900 shadow-sm'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Mobile hamburger + App Brand + Surface Switcher */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            id="btn-mobile-menu-toggle"
            onClick={onToggleMobileSidebar}
            className={`lg:hidden p-2 rounded-xl border transition-colors ${
              isDark
                ? 'border-[#243550] hover:bg-[#111F34] text-slate-300'
                : 'border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#36E4DA] via-[#7568FF] to-[#FFC857] p-0.5 shadow-md flex items-center justify-center">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-bold text-sm ${isDark ? 'bg-[#07111F]' : 'bg-white'}`}>
                <span className="bg-gradient-to-r from-[#36E4DA] to-[#7568FF] bg-clip-text text-transparent font-black">
                  X
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base tracking-tight leading-none">
                  X Agents Space
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-[#36E4DA]/15 text-[#36E4DA]">
                  v0.1
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-normal leading-none block mt-0.5">
                {surface === 'marketplace' ? t('surface_marketplace') : t('surface_admin')}
              </span>
            </div>
          </div>

          {/* Surface switcher toggle: Marketplace vs Operations */}
          <div
            id="surface-switcher"
            className={`hidden md:flex p-1 rounded-xl border text-xs font-medium ${
              isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              id="btn-surface-marketplace"
              onClick={() => {
                setSurface('marketplace');
                setActiveTab('overview');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                surface === 'marketplace'
                  ? 'bg-[#36E4DA] text-[#07111F] font-semibold shadow-xs'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t('surface_marketplace')}
            </button>
            <button
              id="btn-surface-admin"
              onClick={() => {
                setSurface('admin');
                setActiveTab('ops');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                surface === 'admin'
                  ? 'bg-[#7568FF] text-white font-semibold shadow-xs'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              {t('surface_admin')}
            </button>
          </div>
        </div>

        {/* Center: Contextual Search Command Input */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <div
            className={`relative w-full flex items-center rounded-xl border px-3 py-1.5 text-xs transition-all ${
              isDark
                ? 'bg-[#07111F] border-[#243550] focus-within:border-[#36E4DA]'
                : 'bg-slate-50 border-slate-200 focus-within:border-sky-500'
            }`}
          >
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              id="global-search-input"
              type="text"
              placeholder={t('search_placeholder')}
              className="w-full bg-transparent focus:outline-none placeholder:text-slate-500 text-xs"
            />
            <span
              className={`hidden xl:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                isDark ? 'bg-[#111F34] border-[#243550] text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'
              }`}
            >
              ⌘K
            </span>
          </div>
        </div>

        {/* Right: YD Token Balance & Unified Personal Center */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* YD Token Balance Pill */}
          <div
            id="yd-balance-pill"
            className={`flex items-center rounded-xl border pl-3 pr-1.5 py-1 text-xs transition-all ${
              isDark
                ? 'bg-[#111F34] border-[#243550] hover:border-[#FFC857]/50'
                : 'bg-amber-50/80 border-amber-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center gap-1.5 mr-2 font-mono-tabular">
              <Coins className="w-4 h-4 text-[#FFC857]" />
              <div>
                <span className="font-semibold text-xs text-[#FFC857]">
                  {ydBalance.toLocaleString()}
                </span>
                <span className="ml-1 text-[10px] text-slate-400 font-sans">YD</span>
              </div>
            </div>
            <button
              id="btn-acquire-yd-header"
              onClick={() => setIsCheckoutOpen(true)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#FFC857] text-[#07111F] hover:bg-[#ffcf6e] transition-colors shrink-0 shadow-xs"
            >
              {t('acquire_yd')}
            </button>
          </div>

          {/* Unified Personal Center (个人中心) */}
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
};
