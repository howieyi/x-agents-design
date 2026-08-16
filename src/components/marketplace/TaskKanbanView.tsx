import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Task } from '../../types';
import {
  Layers,
  PlusCircle,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  ListFilter,
  ArrowUpDown,
  Bot,
  Sparkles,
  Coins,
  Maximize2,
  Minimize2,
  FolderArchive,
  Filter,
  X,
  FileCheck2,
  Zap,
  TrendingUp
} from 'lucide-react';

type ViewMode = 'board' | 'list';
type DensityMode = 'comfortable' | 'compact';
type SortOption = 'reward_desc' | 'reward_asc' | 'deadline' | 'newest' | 'deliverables';

export const TaskKanbanView: React.FC = () => {
  const {
    t,
    tasks,
    setActiveTaskId,
    setActiveTab,
    setIsPublishWizardOpen,
    globalSearchQuery,
    theme,
    locale
  } = useApp();

  const isDark = theme === 'dark';

  // View & Filter States
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const [density, setDensity] = useState<DensityMode>('comfortable');
  const [searchQuery, setSearchQuery] = useState(globalSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [collapsedColumns, setCollapsedColumns] = useState<Record<string, boolean>>({});
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  // Header global search lands here
  useEffect(() => {
    if (globalSearchQuery) setSearchQuery(globalSearchQuery);
  }, [globalSearchQuery]);

  // Derive dynamic categories from tasks
  const dynamicCategories = useMemo(() => {
    const cats = new Set<string>();
    tasks.forEach((t) => {
      if (t.category) cats.add(t.category);
    });
    return ['All', ...Array.from(cats)];
  }, [tasks]);

  // Derive dynamic list of assigned agents
  const dynamicAgents = useMemo(() => {
    const agentMap = new Map<string, { id: string; name: string }>();
    tasks.forEach((t) => {
      if (t.assignedAgent) {
        agentMap.set(t.assignedAgent.id, {
          id: t.assignedAgent.id,
          name: t.assignedAgent.name
        });
      }
    });
    return Array.from(agentMap.values());
  }, [tasks]);

  // Filter and Sort Tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Category filter
        if (selectedCategory !== 'All' && task.category !== selectedCategory) {
          return false;
        }

        // Agent filter
        if (selectedAgent !== 'All') {
          if (selectedAgent === 'unassigned' && task.assignedAgent) return false;
          if (selectedAgent !== 'unassigned' && task.assignedAgent?.id !== selectedAgent) return false;
        }

        // Quick status filter (from metric pills or status selector)
        if (selectedStatusFilter !== 'all') {
          if (selectedStatusFilter === 'open' && !['open', 'matching', 'draft', 'assigned'].includes(task.status)) return false;
          if (selectedStatusFilter === 'in_progress' && task.status !== 'in_progress') return false;
          if (selectedStatusFilter === 'submitted' && task.status !== 'submitted') return false;
          if (selectedStatusFilter === 'settled' && task.status !== 'settled') return false;
          if (selectedStatusFilter === 'disputed' && task.status !== 'disputed') return false;
        }

        // Search filter
        const q = searchQuery.toLowerCase().trim();
        if (q) {
          const matchId = task.id.toLowerCase().includes(q);
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchDesc = task.description.toLowerCase().includes(q);
          const matchCat = task.category.toLowerCase().includes(q);
          const matchTags = task.tags?.some((tg) => tg.toLowerCase().includes(q));
          const matchAgent = task.assignedAgent?.name.toLowerCase().includes(q) || task.assignedAgent?.handle.toLowerCase().includes(q);
          const matchDeliverables = task.deliverables.some((d) => d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));

          return matchId || matchTitle || matchDesc || matchCat || matchTags || matchAgent || matchDeliverables;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'reward_desc') return b.rewardYD - a.rewardYD;
        if (sortBy === 'reward_asc') return a.rewardYD - b.rewardYD;
        if (sortBy === 'deadline') {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        if (sortBy === 'deliverables') {
          return b.deliverables.length - a.deliverables.length;
        }
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
  }, [tasks, selectedCategory, selectedAgent, selectedStatusFilter, searchQuery, sortBy]);

  // Status Metrics Aggregation
  const metrics = useMemo(() => {
    const totalYD = tasks.reduce((sum, t) => sum + t.rewardYD, 0);
    const openTasks = tasks.filter((t) => ['open', 'draft', 'assigned'].includes(t.status));
    const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
    const submittedTasks = tasks.filter((t) => t.status === 'submitted');
    const settledTasks = tasks.filter((t) => t.status === 'settled');
    const disputedTasks = tasks.filter((t) => t.status === 'disputed');

    return {
      totalCount: tasks.length,
      totalYD,
      open: { count: openTasks.length, yd: openTasks.reduce((s, t) => s + t.rewardYD, 0) },
      inProgress: { count: inProgressTasks.length, yd: inProgressTasks.reduce((s, t) => s + t.rewardYD, 0) },
      submitted: { count: submittedTasks.length, yd: submittedTasks.reduce((s, t) => s + t.rewardYD, 0) },
      settled: { count: settledTasks.length, yd: settledTasks.reduce((s, t) => s + t.rewardYD, 0) },
      disputed: { count: disputedTasks.length, yd: disputedTasks.reduce((s, t) => s + t.rewardYD, 0) }
    };
  }, [tasks]);

  // Group columns configuration with Radiant Purple aesthetic
  const columns: Array<{
    id: string;
    title: string;
    description: string;
    statuses: Array<Task['status']>;
    color: string;
    accentClass: string;
    dotClass: string;
    borderCol: string;
  }> = [
    {
      id: 'open',
      title: t('kanban_col_open'),
      description: locale === 'zh-CN' ? '已发布需求，等待智能匹配或指派 Agent' : 'Awaiting matching or agent assignment',
      statuses: ['open', 'matching', 'draft', 'assigned'],
      color: '#38bdf8',
      accentClass: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/30',
      dotClass: 'bg-sky-500',
      borderCol: isDark ? 'border-sky-500/20' : 'border-sky-200'
    },
    {
      id: 'in_progress',
      title: t('kanban_col_progress'),
      description: locale === 'zh-CN' ? '多 Agent 协同编排与任务分片执行中' : 'Active multi-agent execution & DAG pipeline',
      statuses: ['in_progress'],
      color: '#2563EB',
      accentClass: 'text-purple-600 dark:text-purple-300 bg-purple-500/10 border-purple-500/30',
      dotClass: 'bg-purple-500',
      borderCol: isDark ? 'border-purple-500/20' : 'border-purple-200'
    },
    {
      id: 'submitted',
      title: t('kanban_col_review'),
      description: locale === 'zh-CN' ? '交付物已完成提交，等待客户验收与结算' : 'Artifacts uploaded, awaiting review & payout',
      statuses: ['submitted'],
      color: '#F59E0B',
      accentClass: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30',
      dotClass: 'bg-amber-500',
      borderCol: isDark ? 'border-amber-500/20' : 'border-amber-200'
    },
    {
      id: 'settled',
      title: t('kanban_col_settled'),
      description: locale === 'zh-CN' ? '已验收通过，Escrow 资金已转入 Agent 钱包' : 'Accepted and funds paid from Escrow',
      statuses: ['settled'],
      color: '#10B981',
      accentClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      dotClass: 'bg-emerald-500',
      borderCol: isDark ? 'border-emerald-500/20' : 'border-emerald-200'
    },
    {
      id: 'disputed',
      title: t('kanban_col_disputed'),
      description: locale === 'zh-CN' ? '交付存在争议，进入多签仲裁与 AI 判定' : 'Dispute raised, multisig review in progress',
      statuses: ['disputed'],
      color: '#EF4444',
      accentClass: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/30',
      dotClass: 'bg-rose-500',
      borderCol: isDark ? 'border-rose-500/20' : 'border-rose-200'
    }
  ];

  const handleOpenWorkspace = (task: Task) => {
    setActiveTaskId(task.id);
    setActiveTab('workspace');
  };

  const toggleColumnCollapse = (colId: string) => {
    setCollapsedColumns((prev) => ({
      ...prev,
      [colId]: !prev[colId]
    }));
  };

  const getStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'open':
      case 'draft':
      case 'assigned':
        return {
          label: locale === 'zh-CN' ? '开放匹配' : 'Open',
          bg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30'
        };
      case 'in_progress':
        return {
          label: locale === 'zh-CN' ? '执行中' : 'In Progress',
          bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/30'
        };
      case 'submitted':
        return {
          label: locale === 'zh-CN' ? '待验收' : 'Reviewing',
          bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
        };
      case 'settled':
        return {
          label: locale === 'zh-CN' ? '已结算' : 'Settled',
          bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
        };
      case 'disputed':
        return {
          label: locale === 'zh-CN' ? '争议中' : 'Disputed',
          bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
        };
      default:
        return {
          label: status,
          bg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30'
        };
    }
  };

  const formatDeadlineRelative = (deadlineStr: string) => {
    try {
      const deadline = new Date(deadlineStr);
      const now = new Date('2026-08-15T00:00:00Z');
      const diffMs = deadline.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        return locale === 'zh-CN' ? `已截止 ${Math.abs(diffDays)} 天` : `${Math.abs(diffDays)}d overdue`;
      }
      if (diffDays === 0) {
        return locale === 'zh-CN' ? '今日截止' : 'Due today';
      }
      return locale === 'zh-CN' ? `剩余 ${diffDays} 天` : `${diffDays}d left`;
    } catch {
      return deadlineStr.split('T')[0];
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top Title & Primary Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-300">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                {t('kanban_title')}
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                  {filteredTasks.length} {locale === 'zh-CN' ? '个任务' : 'tasks'}
                </span>
              </h1>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                {t('kanban_subtitle')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-auto">
          {/* View Mode Switcher */}
          <div
            className={`flex items-center p-1 rounded-2xl border ${
              isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => setViewMode('board')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'board'
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={t('kanban_view_board')}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t('kanban_view_board')}</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={t('kanban_view_list')}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>{t('kanban_view_list')}</span>
            </button>
          </div>

          {/* Density Toggle (Board Mode only) */}
          {viewMode === 'board' && (
            <div
              className={`hidden sm:flex items-center p-1 rounded-2xl border ${
                isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                onClick={() => setDensity('comfortable')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  density === 'comfortable'
                    ? isDark
                      ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
                      : 'bg-white text-purple-700 font-semibold shadow-xs border border-purple-200'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={t('density_comfortable')}
              >
                {t('density_comfortable')}
              </button>
              <button
                onClick={() => setDensity('compact')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  density === 'compact'
                    ? isDark
                      ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
                      : 'bg-white text-purple-700 font-semibold shadow-xs border border-purple-200'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={t('density_compact')}
              >
                {t('density_compact')}
              </button>
            </div>
          )}

          {/* Publish Task Button */}
          <button
            onClick={() => setIsPublishWizardOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-purple-500 hover:to-indigo-500 text-white transition-all flex items-center gap-2 shadow-md shadow-purple-500/20 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('publish_task_btn')}</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Strip (Clickable for quick filter) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* All Tasks */}
        <button
          onClick={() => setSelectedStatusFilter('all')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatusFilter === 'all'
              ? 'ring-2 ring-purple-500 bg-purple-500/15 border-purple-500'
              : isDark
              ? 'bg-[#101A2E] border-purple-900/40 hover:border-purple-700'
              : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-medium">{t('stat_all_tasks')}</span>
            <Coins className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="font-mono font-bold text-lg text-slate-900 dark:text-white">
            {metrics.totalCount}
          </div>
          <div className="text-[11px] text-purple-600 dark:text-purple-300 font-mono font-medium mt-0.5 truncate">
            {metrics.totalYD.toLocaleString()} YD
          </div>
        </button>

        {/* Open */}
        <button
          onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'open' ? 'all' : 'open')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatusFilter === 'open'
              ? 'ring-2 ring-sky-500 bg-sky-500/15 border-sky-500'
              : isDark
              ? 'bg-[#101A2E] border-purple-900/40 hover:border-purple-700'
              : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-sky-600 dark:text-sky-400 mb-1">
            <span className="font-medium">{t('kanban_col_open')}</span>
            <span className="w-2 h-2 rounded-full bg-sky-500" />
          </div>
          <div className="font-mono font-bold text-lg text-slate-900 dark:text-white">
            {metrics.open.count}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate">
            {metrics.open.yd.toLocaleString()} YD
          </div>
        </button>

        {/* In Progress */}
        <button
          onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'in_progress' ? 'all' : 'in_progress')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatusFilter === 'in_progress'
              ? 'ring-2 ring-purple-500 bg-purple-500/15 border-purple-500'
              : isDark
              ? 'bg-[#101A2E] border-purple-900/40 hover:border-purple-700'
              : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-purple-600 dark:text-purple-300 mb-1">
            <span className="font-medium">{t('kanban_col_progress')}</span>
            <span className="w-2 h-2 rounded-full bg-purple-500" />
          </div>
          <div className="font-mono font-bold text-lg text-slate-900 dark:text-white">
            {metrics.inProgress.count}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate">
            {metrics.inProgress.yd.toLocaleString()} YD
          </div>
        </button>

        {/* Submitted Review */}
        <button
          onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'submitted' ? 'all' : 'submitted')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatusFilter === 'submitted'
              ? 'ring-2 ring-amber-500 bg-amber-500/15 border-amber-500'
              : isDark
              ? 'bg-[#101A2E] border-purple-900/40 hover:border-purple-700'
              : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 mb-1">
            <span className="font-medium">{t('kanban_col_review')}</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <div className="font-mono font-bold text-lg text-slate-900 dark:text-white">
            {metrics.submitted.count}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate">
            {metrics.submitted.yd.toLocaleString()} YD
          </div>
        </button>

        {/* Settled */}
        <button
          onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'settled' ? 'all' : 'settled')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatusFilter === 'settled'
              ? 'ring-2 ring-emerald-500 bg-emerald-500/15 border-emerald-500'
              : isDark
              ? 'bg-[#101A2E] border-purple-900/40 hover:border-purple-700'
              : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 mb-1">
            <span className="font-medium">{t('kanban_col_settled')}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="font-mono font-bold text-lg text-slate-900 dark:text-white">
            {metrics.settled.count}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate">
            {metrics.settled.yd.toLocaleString()} YD
          </div>
        </button>

        {/* Disputed */}
        <button
          onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'disputed' ? 'all' : 'disputed')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            selectedStatusFilter === 'disputed'
              ? 'ring-2 ring-rose-500 bg-rose-500/15 border-rose-500'
              : isDark
              ? 'bg-[#101A2E] border-purple-900/40 hover:border-purple-700'
              : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-rose-600 dark:text-rose-400 mb-1">
            <span className="font-medium">{t('kanban_col_disputed')}</span>
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          </div>
          <div className="font-mono font-bold text-lg text-slate-900 dark:text-white">
            {metrics.disputed.count}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate">
            {metrics.disputed.yd.toLocaleString()} YD
          </div>
        </button>
      </div>

      {/* Control Toolbar: Search + Categories + Filters + Sorting */}
      <div
        className={`p-4 rounded-3xl border transition-colors space-y-3.5 ${
          isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
        }`}
      >
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div
            className={`flex-1 flex items-center rounded-2xl border px-3.5 py-2 text-xs transition-all ${
              isDark
                ? 'bg-[#0D1526] border-purple-900/50 focus-within:border-purple-500'
                : 'bg-purple-50/50 border-purple-100 focus-within:border-purple-400'
            }`}
          >
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('kanban_search_placeholder')}
              className="w-full bg-transparent focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 ml-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Filters: Agent dropdown & Sort by dropdown */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Agent Filter */}
            <div className="relative">
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className={`appearance-none pl-8 pr-8 py-2 rounded-2xl text-xs font-medium border cursor-pointer transition-all ${
                  isDark
                    ? 'bg-[#0D1526] border-purple-900/50 text-slate-200 focus:border-purple-500'
                    : 'bg-purple-50/50 border-purple-100 text-slate-800 focus:border-purple-400'
                }`}
              >
                <option value="All">{t('filter_agent_all')}</option>
                <option value="unassigned">{locale === 'zh-CN' ? '未指派 Agent' : 'Unassigned'}</option>
                {dynamicAgents.map((ag) => (
                  <option key={ag.id} value={ag.id}>
                    {ag.name}
                  </option>
                ))}
              </select>
              <Bot className="w-3.5 h-3.5 text-purple-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className={`appearance-none pl-8 pr-8 py-2 rounded-2xl text-xs font-medium border cursor-pointer transition-all ${
                  isDark
                    ? 'bg-[#0D1526] border-purple-900/50 text-slate-200 focus:border-purple-500'
                    : 'bg-purple-50/50 border-purple-100 text-slate-800 focus:border-purple-400'
                }`}
              >
                <option value="newest">{t('sort_newest')}</option>
                <option value="reward_desc">{t('sort_reward_desc')}</option>
                <option value="reward_asc">{t('sort_reward_asc')}</option>
                <option value="deadline">{t('sort_deadline')}</option>
                <option value="deliverables">{t('sort_deliverables')}</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-purple-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Reset Filters button */}
            {(selectedCategory !== 'All' || selectedAgent !== 'All' || selectedStatusFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedAgent('All');
                  setSelectedStatusFilter('all');
                  setSearchQuery('');
                }}
                className="px-3 py-2 rounded-2xl text-xs text-rose-500 hover:bg-rose-500/10 border border-rose-500/30 transition-all flex items-center gap-1 cursor-pointer font-medium"
              >
                <X className="w-3.5 h-3.5" />
                <span>{locale === 'zh-CN' ? '重置筛选' : 'Reset'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-purple-500/10 dark:border-purple-900/40">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-purple-500" />
            {locale === 'zh-CN' ? '领域分类:' : 'Domain:'}
          </span>
          {dynamicCategories.map((cat) => {
            const count = cat === 'All' ? tasks.length : tasks.filter((t) => t.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-semibold shadow-xs'
                    : isDark
                    ? 'bg-[#0D1526] text-slate-300 hover:text-white border border-purple-900/50'
                    : 'bg-purple-50 text-slate-700 hover:text-purple-900 border border-purple-100'
                }`}
              >
                <span>{cat === 'All' ? t('kanban_filter_all') : cat}</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-purple-500/10 text-purple-600 dark:text-purple-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: KANBAN BOARD VIEW                                                 */}
      {/* ========================================================================= */}
      {viewMode === 'board' ? (
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 items-start pt-1 scroll-smooth">
            {columns.map((col) => {
              const colTasks = filteredTasks.filter((task) => col.statuses.includes(task.status));
              const isCollapsed = !!collapsedColumns[col.id];
              const totalColYD = colTasks.reduce((sum, t) => sum + t.rewardYD, 0);

              // Collapsed Column State
              if (isCollapsed) {
                return (
                  <div
                    key={col.id}
                    onClick={() => toggleColumnCollapse(col.id)}
                    className={`rounded-3xl border transition-all cursor-pointer flex flex-col items-center py-4 px-2.5 shrink-0 min-h-[500px] w-14 hover:border-purple-500 ${
                      isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
                    }`}
                    title={`${col.title} (${colTasks.length}) - ${t('col_expand')}`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mb-3 shrink-0 ${col.dotClass}`}
                    />
                    <div className="flex-1 flex items-center justify-center">
                      <span
                        className="writing-vertical-rl text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-300 transform rotate-180"
                        style={{ writingMode: 'vertical-rl' }}
                      >
                        {col.title}
                      </span>
                    </div>
                    <span
                      className={`mt-3 px-2 py-1 rounded-full text-[11px] font-mono font-bold ${col.accentClass}`}
                    >
                      {colTasks.length}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleColumnCollapse(col.id);
                      }}
                      className="mt-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              }

              // Expanded Column State
              return (
                <div
                  key={col.id}
                  className={`rounded-3xl border flex flex-col min-h-[520px] p-4 transition-all shrink-0 w-[330px] md:w-[350px] shadow-sm ${
                    isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100'
                  }`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-2.5 pb-2.5 border-b border-purple-500/10 dark:border-purple-900/40">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${col.dotClass}`} />
                      <h2 className="font-semibold text-xs text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                        {col.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${col.accentClass}`}
                      >
                        {colTasks.length}
                      </span>
                      <button
                        onClick={() => toggleColumnCollapse(col.id)}
                        className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                        title={t('col_collapse')}
                      >
                        <Minimize2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Sub-header: Column volume summary */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-3 px-1">
                    <span className="truncate max-w-[200px]">{col.description}</span>
                    <span className="font-mono text-purple-600 dark:text-purple-300 font-bold shrink-0">
                      {totalColYD.toLocaleString()} YD
                    </span>
                  </div>

                  {/* Task Cards Stack */}
                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-380px)] pr-1 custom-scrollbar">
                    {colTasks.length === 0 ? (
                      <div className="p-8 text-center rounded-2xl border border-dashed border-purple-300 dark:border-purple-900/50 my-auto">
                        <FolderArchive className="w-6 h-6 text-purple-400 mx-auto mb-2 opacity-50" />
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{t('kanban_no_tasks')}</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {locale === 'zh-CN' ? '无匹配条件任务' : 'No tasks in this lane'}
                        </p>
                      </div>
                    ) : (
                      colTasks.map((task) => {
                        const statusInfo = getStatusBadge(task.status);
                        const deadlineText = formatDeadlineRelative(task.deadline);

                        // COMPACT DENSITY CARD
                        if (density === 'compact') {
                          return (
                            <div
                              key={task.id}
                              onClick={() => handleOpenWorkspace(task)}
                              className={`p-3 rounded-2xl border transition-all cursor-pointer group hover:-translate-y-0.5 ${
                                isDark
                                  ? 'bg-[#0D1526] border-purple-900/40 hover:border-purple-500 shadow-purple-950/20'
                                  : 'bg-purple-50/40 border-purple-100 hover:border-purple-300 hover:bg-white shadow-xs'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1 text-[11px] mb-1.5">
                                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">#{task.id}</span>
                                <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400">
                                  {task.rewardYD.toLocaleString()} YD
                                </span>
                              </div>

                              <h3 className="font-semibold text-xs text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2 mb-2 leading-relaxed">
                                {task.title}
                              </h3>

                              <div className="flex items-center justify-between pt-2 border-t border-purple-100 dark:border-purple-900/40 text-[11px] text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1.5 truncate">
                                  {task.assignedAgent ? (
                                    <>
                                      <img
                                        src={task.assignedAgent.avatar}
                                        alt=""
                                        className="w-4 h-4 rounded-full object-cover shrink-0 ring-1 ring-purple-500/40"
                                      />
                                      <span className="text-slate-700 dark:text-slate-300 truncate text-[11px] font-medium">
                                        {task.assignedAgent.name}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-slate-400 italic">
                                      {locale === 'zh-CN' ? '未指派' : 'Unassigned'}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-slate-500 dark:text-slate-400 font-mono">
                                    {task.deliverables.length} {locale === 'zh-CN' ? '项交付' : 'deliv.'}
                                  </span>
                                  <ChevronRight className="w-3.5 h-3.5 text-purple-500 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                              </div>
                            </div>
                          );
                        }

                        // COMFORTABLE DENSITY CARD
                        return (
                          <div
                            key={task.id}
                            onClick={() => handleOpenWorkspace(task)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer group hover:-translate-y-0.5 shadow-sm ${
                              isDark
                                ? 'bg-[#0D1526] border-purple-900/40 hover:border-purple-500 shadow-purple-950/20'
                                : 'bg-purple-50/40 border-purple-100 hover:border-purple-300 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-semibold text-purple-600 dark:text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded-md">
                                  #{task.id}
                                </span>
                                <span className="truncate max-w-[120px] text-slate-600 dark:text-slate-400 font-medium">
                                  {task.category}
                                </span>
                              </div>

                              <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-purple-400" />
                                {deadlineText}
                              </span>
                            </div>

                            <h3 className="font-semibold text-xs text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2 mb-2.5 leading-relaxed">
                              {task.title}
                            </h3>

                            {/* Deliverables snippet box */}
                            <div className="text-[11px] mb-3 p-2.5 rounded-xl border space-y-1.5 bg-white/70 dark:bg-[#101A2E] border-purple-100 dark:border-purple-900/40">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1">
                                  <FileCheck2 className="w-3 h-3 text-purple-500" />
                                  {locale === 'zh-CN' ? '交付成果清单' : 'Deliverables'}
                                </span>
                                <span className="font-mono font-bold bg-purple-500/15 text-purple-600 dark:text-purple-300 px-1.5 py-0.5 rounded">
                                  {task.deliverables.filter((d) => d.status === 'submitted' || d.status === 'accepted').length} / {task.deliverables.length} 项
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                {task.deliverables[0]?.title || (locale === 'zh-CN' ? '标准交付包' : 'Standard deliverables')}
                              </p>
                            </div>

                            {/* Assigned Agent / Multi-Agent Ribbon */}
                            {task.assignedAgent ? (
                              <div className="flex items-center justify-between gap-2 mb-3 p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[11px]">
                                <div className="flex items-center gap-2 min-w-0">
                                  <img
                                    src={task.assignedAgent.avatar}
                                    alt=""
                                    className="w-4 h-4 rounded-full object-cover shrink-0 ring-1 ring-purple-500/40"
                                  />
                                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate text-[11px]">
                                    {task.assignedAgent.name}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono text-purple-600 dark:text-purple-300 bg-purple-500/20 px-1.5 py-0.5 rounded shrink-0 font-bold">
                                  {task.assignedAgentVersion || 'v1.0'}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between gap-2 mb-3 p-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-[11px] text-sky-600 dark:text-sky-400">
                                <span className="flex items-center gap-1 font-medium">
                                  <Sparkles className="w-3 h-3 text-sky-500" />
                                  {locale === 'zh-CN' ? '智能匹配中，等待指派' : 'Matching available agents'}
                                </span>
                              </div>
                            )}

                            {/* Footer: Escrow Reward & Direct Action */}
                            <div className="flex items-center justify-between pt-2.5 border-t border-purple-100 dark:border-purple-900/40 text-xs">
                              <div>
                                <div className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                  <Coins className="w-3.5 h-3.5" />
                                  {task.rewardYD.toLocaleString()} YD
                                </div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                  ≈ ${(task.rewardYD * 1.0).toLocaleString()} USD
                                </div>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenWorkspace(task);
                                }}
                                className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-purple-500/15 text-purple-600 dark:text-purple-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <span>{t('kanban_btn_view_workspace')}</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* MODE 2: HIGH-DENSITY STRUCTURED TABLE VIEW                                */
        /* ========================================================================= */
        <div
          className={`rounded-3xl border overflow-hidden transition-colors shadow-sm ${
            isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr
                  className={`border-b text-[11px] font-semibold ${
                    isDark
                      ? 'bg-[#0D1526] text-slate-300 border-purple-900/40'
                      : 'bg-purple-50/60 text-slate-700 border-purple-100'
                  }`}
                >
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4 min-w-[280px]">{t('table_th_task')}</th>
                  <th className="py-3 px-4 min-w-[140px]">{t('table_th_category')}</th>
                  <th className="py-3 px-4 min-w-[120px]">{t('table_th_status')}</th>
                  <th className="py-3 px-4 min-w-[160px]">{t('table_th_agent')}</th>
                  <th className="py-3 px-4 min-w-[120px]">{t('table_th_deliverables')}</th>
                  <th className="py-3 px-4 min-w-[120px]">{t('table_th_reward')}</th>
                  <th className="py-3 px-4 min-w-[120px]">{t('table_th_deadline')}</th>
                  <th className="py-3 px-4 text-right min-w-[110px]">{t('table_th_actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100 dark:divide-purple-900/30">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-500 dark:text-slate-400">
                      <FolderArchive className="w-8 h-8 text-purple-400 mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-semibold">{t('kanban_no_tasks')}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {locale === 'zh-CN' ? '请尝试调整搜索词或分类筛选' : 'Try adjusting search or filters'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => {
                    const statusInfo = getStatusBadge(task.status);
                    const deadlineText = formatDeadlineRelative(task.deadline);
                    const isExpanded = expandedRowId === task.id;

                    return (
                      <React.Fragment key={task.id}>
                        <tr
                          onClick={() => setExpandedRowId(isExpanded ? null : task.id)}
                          className={`transition-colors cursor-pointer ${
                            isExpanded
                              ? isDark
                                ? 'bg-purple-950/30'
                                : 'bg-purple-50/80'
                              : isDark
                              ? 'hover:bg-purple-950/20'
                              : 'hover:bg-purple-50/40'
                          }`}
                        >
                          {/* Index & Toggle */}
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedRowId(isExpanded ? null : task.id);
                              }}
                              className="p-1 rounded text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 cursor-pointer"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5 text-purple-500" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </td>

                          {/* Task ID & Title */}
                          <td className="py-3 px-4">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-purple-600 dark:text-purple-400 text-[11px]">
                                  #{task.id}
                                </span>
                                {task.orchestration?.enabled && (
                                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30 font-semibold">
                                    DAG Multi-Agent
                                  </span>
                                )}
                              </div>
                              <h4 className="font-semibold text-xs text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-300 transition-colors line-clamp-1">
                                {task.title}
                              </h4>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-lg text-[11px] bg-purple-500/10 text-purple-700 dark:text-purple-300 font-medium">
                              {task.category}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusInfo.bg}`}
                            >
                              {statusInfo.label}
                            </span>
                          </td>

                          {/* Assigned Agent */}
                          <td className="py-3 px-4">
                            {task.assignedAgent ? (
                              <div className="flex items-center gap-2">
                                <img
                                  src={task.assignedAgent.avatar}
                                  alt=""
                                  className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-purple-500/40"
                                />
                                <div className="truncate max-w-[120px]">
                                  <div className="font-semibold text-slate-900 dark:text-slate-200 text-xs truncate">
                                    {task.assignedAgent.name}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-400 text-[11px] italic">
                                {locale === 'zh-CN' ? '未指派' : 'Unassigned'}
                              </span>
                            )}
                          </td>

                          {/* Deliverables Count */}
                          <td className="py-3 px-4">
                            <span className="font-mono font-medium text-slate-700 dark:text-slate-300 text-xs">
                              {task.deliverables.length} {locale === 'zh-CN' ? '项成果' : 'items'}
                            </span>
                          </td>

                          {/* Reward YD */}
                          <td className="py-3 px-4">
                            <div className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400">
                              {task.rewardYD.toLocaleString()} YD
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                              ≈ ${(task.rewardYD * 1.0).toLocaleString()}
                            </div>
                          </td>

                          {/* Deadline */}
                          <td className="py-3 px-4">
                            <div className="text-xs text-slate-800 dark:text-slate-300 font-medium">
                              {deadlineText}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                              {task.deadline.split('T')[0]}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenWorkspace(task);
                              }}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-purple-500 hover:to-indigo-500 text-white transition-all inline-flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <span>{t('kanban_btn_view_workspace')}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>

                        {/* Expandable Row Preview */}
                        {isExpanded && (
                          <tr className={isDark ? 'bg-[#0D1526]' : 'bg-purple-50/50'}>
                            <td colSpan={9} className="p-4 border-b border-purple-100 dark:border-purple-900/40">
                              <div className="space-y-3 max-w-5xl mx-auto">
                                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/80 dark:bg-[#101A2E] p-3 rounded-2xl border border-purple-100 dark:border-purple-900/40">
                                  <span className="font-bold text-purple-600 dark:text-purple-400 mr-2">
                                    {locale === 'zh-CN' ? '任务需求描述:' : 'Description:'}
                                  </span>
                                  {task.description}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {/* Deliverables List */}
                                  <div className="bg-white/80 dark:bg-[#101A2E] p-3.5 rounded-2xl border border-purple-100 dark:border-purple-900/40">
                                    <div className="font-bold text-xs text-slate-900 dark:text-white mb-2 flex items-center justify-between">
                                      <span>{locale === 'zh-CN' ? '交付物清单' : 'Deliverables'}</span>
                                      <span className="font-mono text-[11px] text-purple-600 dark:text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded font-bold">
                                        {task.deliverables.length} 项
                                      </span>
                                    </div>
                                    <ul className="space-y-1.5">
                                      {task.deliverables.map((del) => (
                                        <li
                                          key={del.id}
                                          className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                                        >
                                          <CheckCircle2
                                            className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                                              del.status === 'submitted' || del.status === 'accepted'
                                                ? 'text-emerald-500'
                                                : 'text-slate-400'
                                            }`}
                                          />
                                          <div>
                                            <span className="font-semibold text-slate-900 dark:text-slate-200">{del.title}</span>
                                            {del.description && (
                                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                                {del.description}
                                              </p>
                                            )}
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Acceptance Criteria */}
                                  <div className="bg-white/80 dark:bg-[#101A2E] p-3.5 rounded-2xl border border-purple-100 dark:border-purple-900/40">
                                    <div className="font-bold text-xs text-slate-900 dark:text-white mb-2">
                                      {locale === 'zh-CN' ? '验收标准' : 'Acceptance Criteria'}
                                    </div>
                                    <ul className="space-y-1.5">
                                      {task.acceptanceCriteria?.map((crit, idx) => (
                                        <li
                                          key={idx}
                                          className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                                        >
                                          <span className="text-purple-600 dark:text-purple-400 font-mono text-[11px] mt-0.5 font-bold">
                                            #{idx + 1}
                                          </span>
                                          <span>{crit}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
