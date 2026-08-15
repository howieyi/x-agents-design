import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Task } from '../../types';
import {
  Layers,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Coins,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Bot,
  User,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export const TaskKanbanView: React.FC = () => {
  const {
    t,
    tasks,
    setActiveTaskId,
    setActiveTab,
    setIsPublishWizardOpen,
    openCheckoutForTask,
    acceptTaskDeliverables,
    raiseTaskDispute,
    theme,
    locale,
    showToast
  } = useApp();

  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', '视频创作与分片串联', '视觉与图片生成', 'PPT / 演示文稿生成', '全平台社媒素材矩阵', 'Excel / 财务与报表分析', 'Word / 文档与 PRD 撰写', '长篇故事与网文小说'];

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesCat = selectedCategory === 'All' || task.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q) ||
        task.category.toLowerCase().includes(q) ||
        task.deliverables.some((d) => d.title.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [tasks, selectedCategory, searchQuery]);

  // Group columns
  const columns: Array<{
    id: string;
    title: string;
    statuses: Array<Task['status']>;
    color: string;
    bgColor: string;
    borderColor: string;
  }> = [
    {
      id: 'open',
      title: t('kanban_col_open'),
      statuses: ['open', 'draft', 'assigned'],
      color: '#36E4DA',
      bgColor: isDark ? 'bg-[#36E4DA]/5' : 'bg-sky-50',
      borderColor: isDark ? 'border-[#36E4DA]/30' : 'border-sky-200'
    },
    {
      id: 'in_progress',
      title: t('kanban_col_progress'),
      statuses: ['in_progress'],
      color: '#7568FF',
      bgColor: isDark ? 'bg-[#7568FF]/5' : 'bg-purple-50',
      borderColor: isDark ? 'border-[#7568FF]/30' : 'border-purple-200'
    },
    {
      id: 'submitted',
      title: t('kanban_col_review'),
      statuses: ['submitted'],
      color: '#F6A63B',
      bgColor: isDark ? 'bg-[#F6A63B]/5' : 'bg-amber-50',
      borderColor: isDark ? 'border-[#F6A63B]/30' : 'border-amber-200'
    },
    {
      id: 'settled',
      title: t('kanban_col_settled'),
      statuses: ['settled'],
      color: '#35D07F',
      bgColor: isDark ? 'bg-[#35D07F]/5' : 'bg-emerald-50',
      borderColor: isDark ? 'border-[#35D07F]/30' : 'border-emerald-200'
    },
    {
      id: 'disputed',
      title: t('kanban_col_disputed'),
      statuses: ['disputed'],
      color: '#FF647C',
      bgColor: isDark ? 'bg-[#FF647C]/5' : 'bg-rose-50',
      borderColor: isDark ? 'border-[#FF647C]/30' : 'border-rose-200'
    }
  ];

  const handleOpenWorkspace = (task: Task) => {
    setActiveTaskId(task.id);
    setActiveTab('workspace');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#36E4DA]" />
            {t('kanban_title')}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            {t('kanban_subtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsPublishWizardOpen(true)}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#36E4DA] text-[#07111F] hover:bg-[#36E4DA]/90 transition-all flex items-center gap-2 shadow-md self-start md:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          {t('publish_task_btn')}
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-4 rounded-2xl border transition-colors space-y-3 ${
          isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div
            className={`flex-1 flex items-center rounded-xl border px-3 py-2 text-xs transition-all ${
              isDark
                ? 'bg-[#07111F] border-[#243550] focus-within:border-[#36E4DA]'
                : 'bg-slate-50 border-slate-200 focus-within:border-sky-500'
            }`}
          >
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('kanban_search_placeholder')}
              className="w-full bg-transparent focus:outline-none placeholder:text-slate-500 text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-200 ml-2"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#36E4DA] text-[#07111F] font-semibold shadow-xs'
                    : isDark
                    ? 'bg-[#07111F] text-slate-400 hover:text-slate-200 border border-[#243550]'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat === 'All' ? t('kanban_filter_all') : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Kanban Board Columns Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((task) => col.statuses.includes(task.status));

          return (
            <div
              key={col.id}
              className={`rounded-2xl border flex flex-col min-h-[460px] p-3.5 transition-all ${
                isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: col.color }}
                  />
                  <h2 className="font-semibold text-xs text-slate-200 tracking-tight">
                    {col.title}
                  </h2>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold"
                  style={{
                    backgroundColor: `${col.color}20`,
                    color: col.color
                  }}
                >
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards Stack */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
                {colTasks.length === 0 ? (
                  <div className="p-6 text-center rounded-xl border border-dashed border-slate-700/30">
                    <p className="text-[11px] text-slate-500">{t('kanban_no_tasks')}</p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleOpenWorkspace(task)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                        isDark
                          ? 'bg-[#07111F] border-[#243550] hover:border-[#36E4DA]/60 hover:shadow-md'
                          : 'bg-white border-slate-200 hover:border-sky-300 hover:shadow-sm'
                      }`}
                    >
                      {/* Top row */}
                      <div className="flex items-center justify-between gap-1 text-[10px] text-slate-400 mb-1.5">
                        <span className="font-mono font-semibold text-[#36E4DA]">#{task.id}</span>
                        <span className="truncate max-w-[120px]">{task.category}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-xs text-slate-200 group-hover:text-[#36E4DA] transition-colors line-clamp-2 mb-2.5">
                        {task.title}
                      </h3>

                      {/* Deliverables summary */}
                      <div className="text-[11px] text-slate-400 space-y-1 mb-3 bg-slate-900/40 p-2 rounded-lg border border-slate-800/40">
                        <div className="flex items-center justify-between text-[10px]">
                          <span>{locale === 'zh-CN' ? '交付成果清单' : 'Deliverables'}</span>
                          <span className="font-mono text-slate-300 font-bold">{task.deliverables.length} 项</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">
                          {task.deliverables[0]?.title || (locale === 'zh-CN' ? '标准交付包' : 'Standard deliverables')}
                        </p>
                      </div>

                      {/* Assigned Agent badge */}
                      {task.assignedAgent && (
                        <div className="flex items-center gap-2 mb-2.5 p-1.5 rounded-lg bg-[#7568FF]/10 border border-[#7568FF]/20 text-[11px]">
                          <img
                            src={task.assignedAgent.avatar}
                            alt=""
                            className="w-4 h-4 rounded-full object-cover shrink-0"
                          />
                          <span className="font-medium text-[#7568FF] truncate text-[11px]">
                            {task.assignedAgent.name}
                          </span>
                        </div>
                      )}

                      {/* Footer: Reward & Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/20 text-xs">
                        <div>
                          <span className="font-mono font-bold text-xs text-[#FFC857]">
                            {task.rewardYD.toLocaleString()} YD
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenWorkspace(task);
                            }}
                            className="p-1 rounded text-slate-400 hover:text-[#36E4DA] transition-colors"
                            title={t('kanban_btn_view_workspace')}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
