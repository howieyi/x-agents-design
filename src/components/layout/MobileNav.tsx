import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Bot, ClipboardList, Sparkles, Layers, Sliders, Scale } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { t, surface, activeTab, setActiveTab, theme } = useApp();
  const isDark = theme === 'dark';

  const marketplaceItems = [
    { id: 'overview', label: t('nav_overview'), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'agents', label: t('nav_agents'), icon: <Bot className="w-5 h-5" /> },
    { id: 'tasks', label: t('nav_tasks'), icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'matches', label: t('nav_matches'), icon: <Sparkles className="w-5 h-5" /> },
    { id: 'workspace', label: t('nav_workspace'), icon: <Layers className="w-5 h-5" /> }
  ];

  const adminItems = [
    { id: 'ops', label: t('nav_ops'), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'disputes', label: t('nav_disputes'), icon: <Scale className="w-5 h-5" /> },
    { id: 'config', label: t('nav_config'), icon: <Sliders className="w-5 h-5" /> }
  ];

  const items = surface === 'marketplace' ? marketplaceItems : adminItems;

  return (
    <nav
      id="mobile-bottom-nav"
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t flex items-center justify-around py-2 px-2 transition-colors ${
        isDark
          ? 'bg-[#0C1728]/95 border-[#243550] backdrop-blur-md text-[#9CAEC5]'
          : 'bg-white/95 border-slate-200 backdrop-blur-md text-slate-600 shadow-lg'
      }`}
    >
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            id={`mobile-nav-${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-all ${
              isActive
                ? isDark
                  ? 'text-[#36E4DA]'
                  : 'text-sky-600 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.icon}
            <span className="mt-1 leading-none">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
