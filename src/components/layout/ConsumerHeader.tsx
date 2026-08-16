import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Search,
  PlusCircle,
  Coins,
  Shield,
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  ChevronDown,
  Compass,
  ClipboardList,
  Bot,
  Layers,
  Wrench,
  Wallet,
  ArrowRight,
  Zap,
  CheckCircle2,
  LayoutDashboard,
  Radar,
  FolderKanban
} from 'lucide-react';
import { UserProfileDropdown } from './UserProfileDropdown';

export const ConsumerHeader: React.FC = () => {
  const {
    t,
    theme,
    toggleTheme,
    locale,
    toggleLocale,
    activeTab,
    setActiveTab,
    setSurface,
    ydBalance,
    setIsPublishWizardOpen,
    setIsCheckoutOpen,
    setGlobalSearchQuery,
    showToast
  } = useApp();

  const isDark = theme === 'dark';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    {
      id: 'overview',
      label: locale === 'zh-CN' ? '工作台' : 'Workbench',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'tasks',
      label: locale === 'zh-CN' ? '任务大厅' : 'Task Market',
      icon: <ClipboardList className="w-4 h-4" />
    },
    {
      id: 'agents',
      label: locale === 'zh-CN' ? 'Agent 集市' : 'Agent Directory',
      icon: <Bot className="w-4 h-4" />
    },
    {
      id: 'matching',
      label: locale === 'zh-CN' ? '匹配中心' : 'Matching',
      icon: <Radar className="w-4 h-4" />
    },
    {
      id: 'workspace',
      label: locale === 'zh-CN' ? '我的项目' : 'Projects',
      icon: <FolderKanban className="w-4 h-4" />
    },
    {
      id: 'studio',
      label: locale === 'zh-CN' ? '我的 Agent' : 'My Agents',
      icon: <Wrench className="w-4 h-4" />
    }
  ];

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setGlobalSearchQuery(searchQuery.trim());
    setActiveTab('tasks');
    setIsMobileMenuOpen(false);
    showToast(
      locale === 'zh-CN'
        ? `正在任务大厅中检索 "${searchQuery}"`
        : `Searching tasks for "${searchQuery}"...`,
      'info'
    );
  };

  return (
    <header
      id="consumer-header"
      className={`sticky top-0 z-40 w-full border-b transition-all duration-200 ${
        isDark
          ? 'bg-[#0A101F]/90 border-purple-900/30 backdrop-blur-xl text-[#F8FAFC]'
          : 'bg-white/95 border-purple-100 backdrop-blur-xl text-slate-900 shadow-sm shadow-purple-500/5'
      }`}
    >
      {/* Main Navigation Bar */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
        {/* Left: Brand Logo & Navigation Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Brand Logo */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#3B82F6] to-[#7DD3FC] p-0.5 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300">
              <div
                className={`w-full h-full rounded-[10px] flex items-center justify-center font-bold text-sm ${
                  isDark ? 'bg-[#0A101F]' : 'bg-white'
                }`}
              >
                <span className="bg-gradient-to-r from-[#0EA5E9] via-[#3B82F6] to-[#0284C7] bg-clip-text text-transparent font-black text-lg">
                  X
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 dark:from-white dark:via-purple-100 dark:to-purple-300 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-indigo-500 transition-all">
                  X AGENTS
                </span>
                <span className="text-[11px] px-1.5 py-0.5 rounded font-mono font-bold bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/25">
                  SPACE
                </span>
              </div>
              <p className="text-[11px] text-purple-600/70 dark:text-purple-300/60 font-mono tracking-wider hidden sm:block">
                AUTONOMOUS WORKFORCE
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                    isActive
                      ? isDark
                        ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                        : 'bg-purple-50 text-purple-800 border border-purple-200/80 shadow-sm'
                      : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-purple-950/30'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/60'
                  }`}
                >
                  <span className={isActive ? 'text-purple-500 dark:text-purple-300' : 'text-slate-400 group-hover:text-purple-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center: Quick Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm mx-2"
        >
          <div
            className={`relative w-full flex items-center rounded-xl border px-3 py-2 text-xs transition-all ${
              isDark
                ? 'bg-[#101A30]/90 border-purple-900/40 focus-within:border-purple-500 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                : 'bg-purple-50/50 border-purple-100 focus-within:border-purple-500 focus-within:bg-white focus-within:shadow-sm'
            }`}
          >
            <Search className="w-4 h-4 text-purple-400/80 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'zh-CN' ? '搜索 4K渲染、SaaS计划书、修仙小说...' : 'Search tasks, agents, models...'}
              className="bg-transparent text-xs w-full focus:outline-hidden text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-purple-300/40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-200 text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>

        {/* Right: Actions & User Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Radiant Enterprise Purple Publish Task Button */}
          <button
            id="btn-publish-task-header"
            onClick={() => setIsPublishWizardOpen(true)}
            className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#2563EB] via-[#4F8EF7] to-[#06B6D4] hover:from-[#4F8EF7] hover:to-[#22D3EE] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-200 group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden xs:inline">{locale === 'zh-CN' ? '发布需求' : 'Post Demand'}</span>
            <span className="xs:hidden">{locale === 'zh-CN' ? '发单' : 'Post'}</span>
          </button>

          {/* User Profile Avatar Dropdown (Houses YD Balance, Language, Theme, Admin Console & Workspaces) */}
          <UserProfileDropdown />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`xl:hidden p-2 rounded-xl border transition-colors ${
              isDark
                ? 'border-purple-900/40 hover:bg-purple-950/40 text-slate-300'
                : 'border-purple-200 hover:bg-purple-50 text-slate-700'
            }`}
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className={`xl:hidden border-b px-4 py-4 space-y-3 animate-fadeIn ${
            isDark ? 'bg-[#101A30] border-purple-900/40' : 'bg-white border-purple-100 shadow-lg'
          }`}
        >
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`p-3 rounded-xl text-left text-xs font-semibold transition-all flex items-center justify-between ${
                    isActive
                      ? isDark
                        ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                        : 'bg-purple-50 text-purple-800 border border-purple-200'
                      : isDark
                      ? 'bg-purple-950/30 text-slate-300'
                      : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={isActive ? 'text-purple-400' : 'text-slate-400'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-purple-900/20 dark:border-purple-950/60 flex items-center justify-between">
            <button
              onClick={() => {
                setSurface('admin');
                setActiveTab('ops');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 p-2"
            >
              <Shield className="w-4 h-4 text-purple-500" />
              <span>{locale === 'zh-CN' ? '管理控制台' : 'Admin Console'}</span>
            </button>

            <button
              onClick={() => {
                setIsPublishWizardOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{locale === 'zh-CN' ? '发布需求' : 'Post Demand'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
