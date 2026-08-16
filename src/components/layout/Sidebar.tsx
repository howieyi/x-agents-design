import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Bot,
  ClipboardList,
  Sparkles,
  Layers,
  Wrench,
  Scale,
  Sliders,
  Flame,
  X
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, onCloseMobile }) => {
  const { t, surface, activeTab, setActiveTab, theme, tasks, compareAgents } = useApp();
  const isDark = theme === 'dark';

  const activeTasksCount = tasks.filter((t) => ['open', 'assigned', 'in_progress', 'submitted'].includes(t.status)).length;
  const disputedCount = tasks.filter((t) => t.status === 'disputed').length + 1; // including mock dispute

  const marketplaceNavItems = [
    {
      id: 'overview',
      label: t('nav_overview'),
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'agents',
      label: t('nav_agents'),
      icon: <Bot className="w-4 h-4" />,
      badge: '5'
    },
    {
      id: 'tasks',
      label: t('nav_tasks'),
      icon: <ClipboardList className="w-4 h-4" />,
      badge: activeTasksCount > 0 ? `${activeTasksCount}` : undefined
    },
    {
      id: 'matches',
      label: t('nav_matches'),
      icon: <Sparkles className="w-4 h-4" />,
      badge: compareAgents.length > 0 ? `${compareAgents.length}` : undefined,
      badgeColor: 'bg-[#6366F1]/20 text-[#6366F1]'
    },
    {
      id: 'workspace',
      label: t('nav_workspace'),
      icon: <Layers className="w-4 h-4" />
    },
    {
      id: 'studio',
      label: t('nav_studio'),
      icon: <Wrench className="w-4 h-4" />
    }
  ];

  const adminNavItems = [
    {
      id: 'ops',
      label: t('nav_ops'),
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: 'Live'
    },
    {
      id: 'disputes',
      label: t('nav_disputes'),
      icon: <Scale className="w-4 h-4" />,
      badge: disputedCount > 0 ? `${disputedCount}` : undefined,
      badgeColor: 'bg-[#EF4444]/20 text-[#EF4444]'
    },
    {
      id: 'config',
      label: t('nav_config'),
      icon: <Sliders className="w-4 h-4" />
    }
  ];

  const currentNavItems = surface === 'marketplace' ? marketplaceNavItems : adminNavItems;

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    onCloseMobile?.();
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isMobileOpen && (
        <div
          onClick={() => onCloseMobile?.()}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        id="app-sidebar"
        className={`
          fixed inset-y-0 left-0 z-50 w-72 lg:static lg:inset-auto lg:z-0 lg:w-64 lg:shrink-0
          border-r transition-transform duration-200 lg:transition-none
          ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
          ${
            isDark
              ? 'bg-[#0F1829] border-[#1F2D4A] text-[#A9B4C6]'
              : 'bg-white border-slate-200 text-slate-600'
          }
          flex flex-col justify-between p-4 overflow-y-auto lg:sticky lg:top-20 lg:h-[calc(100vh-5.5rem)]
        `}
      >
        {/* Navigation list */}
        <div className="space-y-5">
          {/* Mobile Drawer Header */}
          <div className="flex lg:hidden items-center justify-between pb-3 border-b border-slate-700/30">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0284C7] to-[#6366F1] p-0.5 flex items-center justify-center">
                <div className={`w-full h-full rounded-[5px] flex items-center justify-center font-bold text-xs ${isDark ? 'bg-[#0A101F]' : 'bg-white'}`}>
                  <span className="bg-gradient-to-r from-[#0284C7] to-[#6366F1] bg-clip-text text-transparent font-black">X</span>
                </div>
              </div>
              <span className="font-display font-bold text-sm">X Agents Space</span>
            </div>
            <button
              onClick={() => onCloseMobile?.()}
              className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 font-mono">
              {surface === 'marketplace' ? t('surface_marketplace') : t('surface_admin')}
            </p>
            <nav className="space-y-1">
              {currentNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? isDark
                          ? 'bg-[#132036] text-[#0284C7] font-semibold shadow-sm border border-[#0284C7]/30'
                          : 'bg-sky-50 text-sky-700 font-semibold shadow-xs border border-sky-200'
                        : isDark
                        ? 'hover:bg-[#132036]/60 hover:text-slate-200 text-slate-400'
                        : 'hover:bg-slate-50 hover:text-slate-900 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? (isDark ? 'text-[#0284C7]' : 'text-sky-600') : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                          item.badgeColor ||
                          (isDark
                            ? 'bg-[#0A101F] text-[#0284C7] border border-[#0284C7]/20'
                            : 'bg-sky-100 text-sky-800')
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

          {/* Quick Context Card */}
          <div
            className={`p-3.5 rounded-2xl border text-xs ${
              isDark
                ? 'bg-[#0A101F] border-[#1F2D4A] text-slate-400'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className={`font-semibold text-xs ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Escrow Protocol
              </span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">
              All task settlements and 6% agent performance stakes are locked in immutable Base contracts.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
