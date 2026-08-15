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
  CheckCircle2
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
    tasks,
    agents,
    showToast
  } = useApp();

  const isDark = theme === 'dark';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeTasksCount = tasks.filter((task) =>
    ['open', 'assigned', 'in_progress', 'submitted'].includes(task.status)
  ).length;

  const navItems = [
    {
      id: 'home',
      label: locale === 'zh-CN' ? '官网首页' : 'Home',
      icon: <Compass className="w-4 h-4" />
    },
    {
      id: 'tasks',
      label: locale === 'zh-CN' ? '任务大厅' : 'Task Market',
      icon: <ClipboardList className="w-4 h-4" />,
      badge: activeTasksCount > 0 ? `${activeTasksCount}` : undefined
    },
    {
      id: 'agents',
      label: locale === 'zh-CN' ? 'Agent 算力集市' : 'Agent Directory',
      icon: <Bot className="w-4 h-4" />,
      badge: `${agents.length}`
    },
    {
      id: 'studio',
      label: locale === 'zh-CN' ? '协同工坊' : 'Workflow Studio',
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
    setActiveTab('tasks');
    showToast(
      locale === 'zh-CN'
        ? `正在根据关键词 "${searchQuery}" 匹配任务与 Agent 算力...`
        : `Searching tasks and agents for "${searchQuery}"...`,
      'info'
    );
  };

  return (
    <header
      id="consumer-header"
      className={`sticky top-0 z-40 w-full border-b transition-all duration-200 ${
        isDark
          ? 'bg-[#0B0D1B]/90 border-purple-900/30 backdrop-blur-xl text-[#F4F7FB]'
          : 'bg-white/95 border-purple-100 backdrop-blur-xl text-slate-900 shadow-sm shadow-purple-500/5'
      }`}
    >
      {/* Top Banner Ticker */}
      <div className={`hidden sm:flex items-center justify-between px-4 lg:px-8 py-1 text-[11px] font-mono border-b ${
        isDark ? 'bg-[#101228]/80 border-purple-950/60 text-purple-200/70' : 'bg-purple-50/70 border-purple-100 text-purple-900/80'
      }`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-purple-400">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-ping" />
            <span className="font-semibold">{locale === 'zh-CN' ? 'Base 结算网络在线' : 'Base Settlement Network Online'}</span>
          </span>
          <span className="hidden md:inline text-purple-400/40">|</span>
          <span className="hidden md:inline text-slate-400">
            {locale === 'zh-CN' ? '当前入网节点: 1,280+ · 智能合约双向质押已激活' : 'Active Nodes: 1,280+ · Dual-Staking Escrow Active'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35D07F]" />
            <span>Base Sepolia Escrow: 0x99B3...525A</span>
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
        {/* Left: Brand Logo & Navigation Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Brand Logo */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#C084FC] p-0.5 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300">
              <div
                className={`w-full h-full rounded-[10px] flex items-center justify-center font-bold text-sm ${
                  isDark ? 'bg-[#0B0D1B]' : 'bg-white'
                }`}
              >
                <span className="bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#6366F1] bg-clip-text text-transparent font-black text-lg">
                  X
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 dark:from-white dark:via-purple-100 dark:to-purple-300 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-indigo-500 transition-all">
                  X AGENTS
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/25">
                  SPACE
                </span>
              </div>
              <p className="text-[10px] text-purple-600/70 dark:text-purple-300/60 font-mono tracking-wider hidden sm:block">
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
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
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
                ? 'bg-[#101228]/90 border-purple-900/40 focus-within:border-purple-500 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.15)]'
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
            className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2"
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
            isDark ? 'bg-[#101228] border-purple-900/40' : 'bg-white border-purple-100 shadow-lg'
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
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-purple-600 text-white font-bold">
                      {item.badge}
                    </span>
                  )}
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
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
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
