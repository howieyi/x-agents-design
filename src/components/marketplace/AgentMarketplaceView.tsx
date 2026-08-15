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
  Coins
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

  const categories = ['All', '视频创作与分片串联', '视觉与图片生成', 'PPT / 演示文稿生成', '全平台社媒素材矩阵', 'Excel / 财务与报表分析', 'Word / 文档与 PRD 撰写', '长篇故事与网文小说'];

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
          <h1 className="font-display font-bold text-2xl tracking-tight">
            {t('market_title')}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            {t('market_subtitle')}
          </p>
        </div>

        {compareAgents.length > 0 && (
          <button
            onClick={() => setIsCompareOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#7568FF] text-white hover:bg-[#6355E0] transition-colors flex items-center gap-2 shadow-md self-start md:self-auto cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            {locale === 'zh-CN'
              ? `查看对比 (${compareAgents.length}/3)`
              : `Compare Candidates (${compareAgents.length}/3)`}
          </button>
        )}
      </div>

      {/* Natural Language Search & Filter Bar */}
      <div
        className={`p-4 rounded-2xl border transition-colors space-y-3 ${
          isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-3">
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
              placeholder={t('search_agent_placeholder')}
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

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`px-3 py-2 rounded-xl border text-xs font-medium appearance-none pr-8 cursor-pointer ${
                  isDark
                    ? 'bg-[#111F34] border-[#243550] text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <option value="relevance">{locale === 'zh-CN' ? '按相关度排序' : 'Sort by Relevance'}</option>
                <option value="rating">{locale === 'zh-CN' ? '按评分排序' : 'Sort by Rating'}</option>
                <option value="price_low">{locale === 'zh-CN' ? '价格由低到高' : 'Price: Low to High'}</option>
                <option value="completed">{locale === 'zh-CN' ? '已完成任务数' : 'Most Completed'}</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* Verified Only Filter Toggle */}
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                verifiedOnly
                  ? 'bg-[#35D07F]/20 border-[#35D07F] text-[#35D07F] font-semibold'
                  : isDark
                  ? 'bg-[#111F34] border-[#243550] text-slate-400 hover:text-slate-200'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('filter_verified_only')}</span>
            </button>

            {/* View Mode Toggle: Grid / Table */}
            <div
              className={`flex items-center p-0.5 rounded-xl border text-xs ${
                isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? isDark
                      ? 'bg-[#111F34] text-[#36E4DA] font-semibold'
                      : 'bg-white text-sky-600 font-semibold shadow-xs'
                    : 'text-slate-400'
                }`}
                title={t('view_cards')}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? isDark
                      ? 'bg-[#111F34] text-[#36E4DA] font-semibold'
                      : 'bg-white text-sky-600 font-semibold shadow-xs'
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
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#36E4DA] text-[#07111F] font-semibold shadow-md'
                    : isDark
                    ? 'bg-[#111F34] text-slate-300 hover:text-white border border-[#243550]'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat === 'All' ? t('filter_all_categories') : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>
            {filteredAgents.length}
          </strong>{' '}
          {t('results_found')}
        </span>
        {searchQuery && (
          <span>
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
                className={`flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-[#0C1728] border-[#243550] hover:border-[#36E4DA]/50'
                    : 'bg-white border-slate-200 hover:border-sky-300 shadow-sm'
                }`}
              >
                <div>
                  {/* Card Header: Avatar, Name, Handle, Verified, Score */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700/40"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-semibold text-sm leading-tight hover:text-[#36E4DA] cursor-pointer"
                            onClick={() => {
                              setSelectedAgent(agent);
                              setIsAgentDetailOpen(true);
                            }}
                          >
                            {agent.name}
                          </h3>
                          {agent.verified && (
                            <ShieldCheck className="w-4 h-4 text-[#35D07F] shrink-0" title="Verified Agent" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">{agent.handle} · {agent.version}</p>
                      </div>
                    </div>

                    {agent.matchScore && (
                      <div className="text-right shrink-0">
                        <span className="px-2 py-0.5 rounded-lg text-xs font-mono font-bold bg-[#36E4DA]/15 text-[#36E4DA]">
                          {agent.matchScore}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Capability Summary */}
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {locale === 'zh-CN' && agent.descriptionZh ? agent.descriptionZh : agent.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {agent.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                          isDark ? 'bg-[#111F34] text-slate-300' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {agent.tags.length > 4 && (
                      <span className="text-[10px] px-1 text-slate-500">
                        +{agent.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Trust Metrics Bar */}
                  <div
                    className={`grid grid-cols-3 gap-2 p-2.5 rounded-xl border text-center text-xs mb-4 ${
                      isDark
                        ? 'bg-[#07111F] border-[#243550]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <p className="text-[10px] text-slate-400">{t('metric_completed')}</p>
                      <p className="font-mono font-semibold text-xs mt-0.5">{agent.metrics.completedTasks}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">{t('metric_ontime')}</p>
                      <p className="font-mono font-semibold text-xs text-[#35D07F] mt-0.5">
                        {agent.metrics.onTimeRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">{t('metric_rating')}</p>
                      <p className="font-mono font-semibold text-xs text-[#FFC857] mt-0.5 flex items-center justify-center gap-0.5">
                        <Star className="w-3 h-3 fill-[#FFC857] text-[#FFC857]" />
                        {agent.metrics.qualityRating}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Actions */}
                <div className="pt-3 border-t border-slate-700/20 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-mono font-bold text-sm text-[#FFC857]">
                      {agent.priceYD.toLocaleString()} YD
                    </span>
                    <span className="text-[11px] text-slate-400 ml-1 font-normal">
                      {agent.pricingModel === 'per_task' ? t('pricing_model_task') : t('pricing_model_hourly')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCompare(agent)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        isCompared
                          ? 'bg-[#36E4DA]/20 border-[#36E4DA] text-[#36E4DA] font-semibold'
                          : isDark
                          ? 'border-[#243550] hover:bg-[#111F34] text-slate-300'
                          : 'border-slate-200 hover:bg-slate-100 text-slate-700'
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
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#36E4DA] text-[#07111F] hover:bg-[#2bc4bb] transition-colors cursor-pointer"
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
          className={`rounded-2xl border overflow-hidden transition-colors ${
            isDark ? 'bg-[#0C1728] border-[#243550]' : 'bg-white border-slate-200'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isDark ? 'bg-[#07111F] border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  <th className="p-3.5 font-medium">{t('table_agent')}</th>
                  <th className="p-3.5 font-medium">{t('table_category')}</th>
                  <th className="p-3.5 font-medium">{t('table_rate')}</th>
                  <th className="p-3.5 font-medium">{t('table_completion')}</th>
                  <th className="p-3.5 font-medium">{t('table_quality')}</th>
                  <th className="p-3.5 font-medium">{t('table_dispute')}</th>
                  <th className="p-3.5 font-medium text-right">{t('table_actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-mono-tabular">
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className={isDark ? 'hover:bg-[#111F34]/50' : 'hover:bg-slate-50'}>
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={agent.avatar}
                          alt=""
                          className="w-8 h-8 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-xs font-sans hover:text-[#36E4DA] cursor-pointer"
                              onClick={() => {
                                setSelectedAgent(agent);
                                setIsAgentDetailOpen(true);
                              }}
                            >
                              {agent.name}
                            </span>
                            {agent.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#35D07F]" />}
                          </div>
                          <span className="text-[11px] text-slate-400 font-sans">{agent.handle}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-sans text-slate-300">{agent.category}</td>
                    <td className="p-3.5 font-bold text-[#FFC857]">
                      {agent.priceYD.toLocaleString()} YD
                    </td>
                    <td className="p-3.5 text-[#35D07F] font-semibold">{agent.metrics.onTimeRate}%</td>
                    <td className="p-3.5 text-[#FFC857] flex items-center gap-1 pt-4">
                      <Star className="w-3 h-3 fill-[#FFC857] text-[#FFC857]" />
                      {agent.metrics.qualityRating}
                    </td>
                    <td className="p-3.5 text-slate-400">{agent.metrics.disputeRate}%</td>
                    <td className="p-3.5 text-right font-sans">
                      <button
                        onClick={() => {
                          setSelectedAgent(agent);
                          setIsAgentDetailOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#36E4DA] text-[#07111F] hover:bg-[#2bc4bb] transition-colors cursor-pointer"
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
