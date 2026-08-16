import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Agent } from '../../types';
import {
  Search,
  Filter,
  Grid,
  List,
  ShieldCheck,
  Star,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Layers,
  ArrowUpDown,
  PlusCircle,
  Clock,
  Coins,
  Bot
} from 'lucide-react';

export const AgentMarketplaceView: React.FC = () => {
  const {
    t,
    agents,
    setSelectedAgent,
    setIsAgentDetailOpen,
    setIsPublishWizardOpen,
    addToCompare,
    compareAgents,
    setIsCompareOpen,
    theme,
    locale
  } = useApp();

  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price_low' | 'completed'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories = ['All', 'Cloud & Infrastructure', 'Security & Audit', 'AI & Data Engineering', 'Zero Knowledge & L2', 'Web3 Fullstack'];

  const filteredAgents = useMemo(() => {
    return agents
      .filter((agent) => {
        const matchesCat = selectedCategory === 'All' || agent.category === selectedCategory;
        const matchesVerified = !verifiedOnly || agent.verified;
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          !q ||
          agent.name.toLowerCase().includes(q) ||
          agent.summary.toLowerCase().includes(q) ||
          agent.category.toLowerCase().includes(q) ||
          agent.tags.some((tag) => tag.toLowerCase().includes(q));

        return matchesCat && matchesVerified && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.metrics.qualityRating - a.metrics.qualityRating;
        if (sortBy === 'price_low') return a.priceYD - b.priceYD;
        if (sortBy === 'completed') return b.metrics.completedTasks - a.metrics.completedTasks;
        return (b.matchScore || 0) - (a.matchScore || 0);
      });
  }, [agents, selectedCategory, verifiedOnly, searchQuery, sortBy]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl tracking-tight text-slate-900 dark:text-white">
            {t('market_title')}
          </h1>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t('market_subtitle')}
          </p>
        </div>

        {compareAgents.length > 0 && (
          <button
            onClick={() => setIsCompareOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2 shadow-md shadow-purple-500/25 self-start md:self-auto cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            {locale === 'zh-CN'
              ? `查看对比 (${compareAgents.length}/3)`
              : `Compare Candidates (${compareAgents.length}/3)`}
          </button>
        )}
      </div>

      {/* Natural Language Search & Filter Bar */}
      <div
        className={`p-4 sm:p-5 rounded-3xl border transition-all space-y-4 shadow-xl ${
          isDark ? 'bg-[#10132B] border-purple-900/40 shadow-purple-950/20' : 'bg-white border-purple-100 shadow-purple-500/5'
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-3">
          <div
            className={`flex-1 flex items-center rounded-xl border px-3.5 py-2.5 text-xs transition-all ${
              isDark
                ? 'bg-[#0A0C1B] border-purple-900/50 focus-within:border-purple-500 text-white'
                : 'bg-purple-50/50 border-purple-200 focus-within:border-purple-500 text-slate-900'
            }`}
          >
            <Search className="w-4 h-4 text-purple-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_agent_placeholder')}
              className="w-full bg-transparent focus:outline-none placeholder:text-slate-400 text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-purple-400 hover:text-purple-300 ml-2 font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold appearance-none pr-8 cursor-pointer ${
                  isDark
                    ? 'bg-[#161A38] border-purple-900/50 text-purple-200'
                    : 'bg-white border-purple-200 text-purple-900 shadow-xs'
                }`}
              >
                <option value="relevance">{locale === 'zh-CN' ? '按相关度排序' : 'Sort by Relevance'}</option>
                <option value="rating">{locale === 'zh-CN' ? '按评分排序' : 'Sort by Rating'}</option>
                <option value="price_low">{locale === 'zh-CN' ? '价格由低到高' : 'Price: Low to High'}</option>
                <option value="completed">{locale === 'zh-CN' ? '已完成任务数' : 'Most Completed'}</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-purple-400 absolute right-2.5 top-3.5 pointer-events-none" />
            </div>

            {/* Verified Only Filter Toggle */}
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                verifiedOnly
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : isDark
                  ? 'bg-[#161A38] border-purple-900/50 text-slate-400 hover:text-white'
                  : 'bg-white border-purple-200 text-slate-600 hover:text-purple-900 shadow-xs'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t('filter_verified_only')}</span>
            </button>

            {/* View Mode Toggle: Grid / Table */}
            <div
              className={`flex items-center p-0.5 rounded-xl border text-xs ${
                isDark ? 'bg-[#0A0C1B] border-purple-900/50' : 'bg-purple-50 border-purple-200'
              }`}
            >
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? isDark
                      ? 'bg-[#161A38] text-purple-300 font-bold border border-purple-900/60 shadow-xs'
                      : 'bg-white text-purple-900 font-bold border border-purple-200 shadow-xs'
                    : 'text-slate-400'
                }`}
                title={t('view_cards')}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? isDark
                      ? 'bg-[#161A38] text-purple-300 font-bold border border-purple-900/60 shadow-xs'
                      : 'bg-white text-purple-900 font-bold border border-purple-200 shadow-xs'
                    : 'text-slate-400'
                }`}
                title={t('view_table')}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-500/25'
                    : isDark
                    ? 'bg-[#161A38] text-slate-300 hover:text-white border border-purple-900/40'
                    : 'bg-white text-slate-700 hover:text-purple-900 border border-purple-200 shadow-xs'
                }`}
              >
                {cat === 'All' ? t('filter_all_categories') : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          <strong className={isDark ? 'text-purple-300 font-bold' : 'text-purple-900 font-bold'}>
            {filteredAgents.length}
          </strong>{' '}
          {t('results_found')}
        </span>
        {searchQuery && (
          <span className="font-mono text-purple-600 dark:text-purple-300">
            {locale === 'zh-CN' ? '检索包含:' : 'Query:'} &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* Cards View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredAgents.map((agent) => {
            const isCompared = compareAgents.some((a) => a.id === agent.id);
            return (
              <div
                key={agent.id}
                id={`agent-card-${agent.id}`}
                className={`flex flex-col justify-between p-5 rounded-3xl border transition-all ${
                  isDark
                    ? 'bg-[#10132B] border-purple-900/40 hover:border-purple-500 shadow-xl shadow-purple-950/20'
                    : 'bg-white border-purple-100 hover:border-purple-300 shadow-xl shadow-purple-500/5'
                }`}
              >
                <div>
                  {/* Card Header: Avatar, Name, Handle, Verified, Score */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-purple-500/40 shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm leading-tight text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors"
                            onClick={() => {
                              setSelectedAgent(agent);
                              setIsAgentDetailOpen(true);
                            }}
                          >
                            {agent.name}
                          </h3>
                          {agent.verified && (
                            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" title="Verified Agent" />
                          )}
                        </div>
                        <p className="text-[11px] text-purple-600/70 dark:text-purple-300/70 font-mono mt-0.5">{agent.handle} · {agent.version}</p>
                      </div>
                    </div>

                    {agent.matchScore && (
                      <div className="text-right shrink-0">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                          {agent.matchScore}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Capability Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {locale === 'zh-CN' && agent.descriptionZh ? agent.descriptionZh : agent.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {agent.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] px-2.5 py-0.5 rounded-lg font-mono font-medium ${
                          isDark ? 'bg-[#161A38] text-purple-300 border border-purple-900/40' : 'bg-purple-50 text-purple-900 border border-purple-100'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {agent.tags.length > 4 && (
                      <span className="text-[10px] px-1 text-slate-400 font-mono">
                        +{agent.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Trust Metrics Bar */}
                  <div
                    className={`grid grid-cols-3 gap-2 p-3 rounded-2xl border text-center text-xs mb-4 ${
                      isDark
                        ? 'bg-[#0A0C1B] border-purple-900/40'
                        : 'bg-purple-50/50 border-purple-100'
                    }`}
                  >
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('metric_completed')}</p>
                      <p className="font-mono font-bold text-xs mt-0.5 text-slate-900 dark:text-white">{agent.metrics.completedTasks}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('metric_ontime')}</p>
                      <p className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {agent.metrics.onTimeRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('metric_rating')}</p>
                      <p className="font-mono font-bold text-xs text-amber-500 dark:text-amber-400 mt-0.5 flex items-center justify-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {agent.metrics.qualityRating}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Actions */}
                <div className="pt-3 border-t border-purple-900/20 dark:border-purple-950/60 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-mono font-bold text-sm text-amber-500 dark:text-amber-400">
                      {agent.priceYD.toLocaleString()} YD
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-1 font-normal">
                      {agent.pricingModel === 'per_task' ? t('pricing_model_task') : t('pricing_model_hourly')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCompare(agent)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        isCompared
                          ? 'bg-purple-500/20 border-purple-500 text-purple-600 dark:text-purple-300 font-bold'
                          : isDark
                          ? 'border-purple-900/50 hover:bg-[#161A38] text-purple-300'
                          : 'border-purple-200 hover:bg-purple-50 text-purple-900'
                      }`}
                      title="Compare side-by-side"
                    >
                      {isCompared ? '✓ Added' : '+ Compare'}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAgent(agent);
                        setIsAgentDetailOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-xs cursor-pointer"
                    >
                      {t('view_details')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div
          className={`rounded-3xl border overflow-hidden transition-all shadow-xl ${
            isDark ? 'bg-[#10132B] border-purple-900/40 shadow-purple-950/20' : 'bg-white border-purple-100 shadow-purple-500/5'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isDark ? 'bg-[#0A0C1B] border-purple-900/40 text-slate-400' : 'bg-purple-50/50 border-purple-100 text-slate-600'}`}>
                  <th className="p-4 font-bold uppercase font-mono text-[11px]">{t('table_agent')}</th>
                  <th className="p-4 font-bold uppercase font-mono text-[11px]">{t('table_category')}</th>
                  <th className="p-4 font-bold uppercase font-mono text-[11px]">{t('table_rate')}</th>
                  <th className="p-4 font-bold uppercase font-mono text-[11px]">{t('table_completion')}</th>
                  <th className="p-4 font-bold uppercase font-mono text-[11px]">{t('table_quality')}</th>
                  <th className="p-4 font-bold uppercase font-mono text-[11px]">{t('table_dispute')}</th>
                  <th className="p-4 font-bold uppercase font-mono text-[11px] text-right">{t('table_actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/20 dark:divide-purple-950/50 font-mono-tabular">
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className={isDark ? 'hover:bg-[#161A38]/50' : 'hover:bg-purple-50/50'}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={agent.avatar}
                          alt=""
                          className="w-9 h-9 rounded-xl object-cover border border-purple-500/40"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs font-sans text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors"
                              onClick={() => {
                                setSelectedAgent(agent);
                                setIsAgentDetailOpen(true);
                              }}
                            >
                              {agent.name}
                            </span>
                            {agent.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
                          </div>
                          <span className="text-[11px] text-purple-600/70 dark:text-purple-300/70 font-sans">{agent.handle}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-sans text-slate-700 dark:text-slate-300 font-medium">{agent.category}</td>
                    <td className="p-4 font-bold text-amber-500 dark:text-amber-400">
                      {agent.priceYD.toLocaleString()} YD
                    </td>
                    <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">{agent.metrics.onTimeRate}%</td>
                    <td className="p-4 text-amber-500 dark:text-amber-400 font-bold flex items-center gap-1 pt-5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {agent.metrics.qualityRating}
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-400 font-medium">{agent.metrics.disputeRate}%</td>
                    <td className="p-4 text-right font-sans">
                      <button
                        onClick={() => {
                          setSelectedAgent(agent);
                          setIsAgentDetailOpen(true);
                        }}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-xs cursor-pointer"
                      >
                        {t('view_details')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
