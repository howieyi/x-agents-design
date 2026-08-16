import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MatchingCandidate } from '../../types';
import {
  Sparkles,
  ShieldCheck,
  SlidersHorizontal,
  Bot,
  Radar,
  Workflow,
  Plus,
  Check,
  ArrowRight,
  ChevronDown,
  SearchX
} from 'lucide-react';

export const MatchingResultsView: React.FC = () => {
  const {
    t,
    tasks,
    agents,
    activeTask,
    activeTaskId,
    setActiveTaskId,
    assignAgentToTask,
    generateOrchestrationFromAgents,
    setSelectedAgent,
    setIsAgentDetailOpen,
    addToCompare,
    setIsCompareOpen,
    compareAgents,
    selectedAgentForPublish,
    userProfile,
    navigateTo,
    theme,
    locale
  } = useApp();

  const isDark = theme === 'dark';

  // Agents queued for one-click DAG orchestration (multi-select)
  const [selectedForDag, setSelectedForDag] = useState<string[]>([]);
  // 展开详情（评分拆解/对比/加入编排）的候选
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Candidates are derived live from the marketplace agents, bound to the active task
  const candidates = useMemo<MatchingCandidate[]>(() => {
    if (!activeTask) return [];
    return agents
      .map((agent, idx) => {
        const catMatch = agent.category === activeTask.category ? 14 : 4;
        const preSelectBoost = selectedAgentForPublish?.id === agent.id ? 8 : 0;
        const semantic = Math.min(99, 76 + catMatch + preSelectBoost + Math.round(agent.metrics.qualityRating * 1.2));
        const overall = Math.min(99.5, Math.round((semantic * 0.45 + agent.metrics.qualityRating * 7 + agent.metrics.onTimeRate * 0.28) * 10) / 10);
        return {
          agent,
          overallScore: overall,
          scoreBreakdown: {
            semanticMatch: semantic,
            categoryTagMatch: agent.category === activeTask.category ? 97 : Math.min(94, 72 + idx * 4),
            completionRate: agent.metrics.onTimeRate,
            qualityRating: agent.metrics.qualityRating * 20,
            onTimeRate: agent.metrics.onTimeRate,
            experienceScore: Math.min(98, 62 + idx * 6)
          },
          whyMatch: {
            en: agent.whyMatch || agent.descriptionEn || agent.summary,
            zh: agent.whyMatch || agent.descriptionZh || agent.summary
          },
          isExploreCandidate: idx >= 3,
          algorithmVersion: 'v1.4.0-qdrant-rule-blend'
        };
      })
      .sort((a, b) => b.overallScore - a.overallScore);
  }, [agents, activeTask, selectedAgentForPublish]);

  const toggleForDag = (agentId: string) => {
    setSelectedForDag((prev) =>
      prev.includes(agentId) ? prev.filter((id) => id !== agentId) : [...prev, agentId]
    );
  };

  const selectedDagAgents = agents.filter((a) => selectedForDag.includes(a.id));

  const handleGenerateDag = () => {
    if (!activeTask || selectedDagAgents.length === 0) return;
    generateOrchestrationFromAgents(activeTask.id, selectedDagAgents);
    setSelectedForDag([]);
  };

  const isMatchingState = activeTask && (activeTask.status === 'matching' || activeTask.status === 'open');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
            <Radar className="w-6 h-6 text-purple-500" />
            {locale === 'zh-CN' ? '匹配中心' : 'Matching Center'}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {locale === 'zh-CN'
              ? '基于语义相似度为你当前任务匹配内容创作型 Agent，支持多选后一键生成编排流水线。'
              : 'Semantic matching of content-creation agents for the active task — multi-select and generate an orchestration pipeline in one click.'}
          </p>
        </div>

        {compareAgents.length > 0 && (
          <button
            onClick={() => setIsCompareOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 transition-colors flex items-center gap-2 shadow-md self-start md:self-auto cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {locale === 'zh-CN'
              ? `多 Agent 对比 (${compareAgents.length}/3)`
              : `Compare Candidates (${compareAgents.length}/3)`}
          </button>
        )}
      </div>

      {/* Task Selector & Pinned Card（仅我的需求参与匹配） */}
      {activeTask && activeTask.owner.id === userProfile.id ? (
        <div
          className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-gradient-to-r from-purple-50 to-white border-purple-200'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/15 text-purple-600 dark:text-purple-300">
                {locale === 'zh-CN' ? '我的匹配任务' : 'My task in matching'}
              </span>
              <span className="font-mono text-xs text-slate-400">#{activeTask.id}</span>
              {activeTask.status === 'matching' && (
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">
                  {t('status_matching')}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{activeTask.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono-tabular">
              {activeTask.category} · {locale === 'zh-CN' ? '预算' : 'Budget'}: {activeTask.rewardYD.toLocaleString()} YD · Stake:{' '}
              {activeTask.stakeYD} YD
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={activeTaskId}
              onChange={(e) => setActiveTaskId(e.target.value)}
              className={`px-3 py-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                isDark ? 'bg-[#0D1526] border-purple-900/50 text-white' : 'bg-white border-purple-200 text-slate-800'
              }`}
            >
              {tasks
                .filter((task) => task.owner.id === userProfile.id && (task.status === 'matching' || task.status === 'open'))
                .map((task) => (
                  <option key={task.id} value={task.id}>
                    #{task.id} - {task.title.substring(0, 28)}...
                  </option>
                ))}
            </select>
          </div>
        </div>
      ) : (
        <div className={`p-10 text-center rounded-2xl border ${isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100'}`}>
          <SearchX className="w-10 h-10 mx-auto mb-2 text-slate-500 opacity-50" />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {locale === 'zh-CN' ? '还没有可匹配的任务，先发布一个内容创作需求吧。' : 'No task to match yet — publish a content creation request first.'}
          </p>
          <button
            onClick={() => navigateTo('overview')}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white cursor-pointer"
          >
            {locale === 'zh-CN' ? '去发布需求' : 'Publish a Task'}
          </button>
        </div>
      )}

      {/* Ranked Candidate List */}
      <div className="space-y-5">
        {candidates.map((cand, idx) => {
          const agent = cand.agent;
          const isCompared = compareAgents.some((a) => a.id === agent.id);
          const isInDag = selectedForDag.includes(agent.id);
          const isPreselected = selectedAgentForPublish?.id === agent.id;

          return (
            <div
              key={agent.id}
              id={`matching-candidate-${agent.id}`}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                isPreselected
                  ? isDark
                    ? 'bg-purple-950/40 border-purple-500'
                    : 'bg-purple-50/70 border-purple-300'
                  : isDark
                  ? 'bg-[#101A2E] border-purple-900/40 hover:border-purple-500/60'
                  : 'bg-white border-purple-100 hover:border-purple-300 shadow-xs'
              }`}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3.5">
                  <div className="relative">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-purple-500/40"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                      #{idx + 1}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className="font-display font-bold text-base hover:text-purple-600 cursor-pointer"
                        onClick={() => {
                          setSelectedAgent(agent);
                          setIsAgentDetailOpen(true);
                        }}
                      >
                        {agent.name}
                      </h3>
                      {agent.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-500" title="Verified" />
                      )}
                      {isPreselected && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-600 text-white">
                          {locale === 'zh-CN' ? '已预选' : 'Preselected'}
                        </span>
                      )}
                      {cand.isExploreCandidate ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                          {t('explore_candidate_badge')}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          {t('stable_candidate_badge')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {agent.handle} · {agent.version} · {agent.author.name}
                    </p>
                  </div>
                </div>

                {/* Score badge */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 sm:justify-end">
                    <span className="text-xs text-slate-400 font-medium">{locale === 'zh-CN' ? '综合匹配度' : 'Overall Match'}:</span>
                    <span className="font-mono font-bold text-lg text-purple-600 dark:text-purple-400">
                      {cand.overallScore}%
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-xs text-amber-500 dark:text-amber-400">
                    {agent.priceYD.toLocaleString()} YD
                  </span>
                </div>
              </div>

              {/* 一句话推荐理由（收起态） */}
              {expandedId !== agent.id && (
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3 line-clamp-2">
                  {locale === 'zh-CN' ? cand.whyMatch.zh : cand.whyMatch.en}
                </p>
              )}

              {/* 展开详情：完整理由 + 评分拆解 + 多选操作 */}
              {expandedId === agent.id && (
                <div className="space-y-4 mb-4 animate-fadeIn">
                  <div
                    className={`p-3 rounded-xl border text-xs ${
                      isDark ? 'bg-[#0D1526] border-purple-900/40 text-slate-300' : 'bg-purple-50/60 border-purple-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-purple-600 dark:text-purple-300 mr-1">
                          {locale === 'zh-CN' ? '推荐理由' : 'Why this match'}:
                        </span>
                        <span className="leading-relaxed">
                          {locale === 'zh-CN' ? cand.whyMatch.zh : cand.whyMatch.en}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Factors Breakdown Bars */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-tabular">
                    {[
                      { label: t('score_semantic'), value: cand.scoreBreakdown.semanticMatch, color: 'bg-purple-500' },
                      { label: t('score_skills'), value: cand.scoreBreakdown.categoryTagMatch, color: 'bg-cyan-500' },
                      { label: t('score_ontime'), value: cand.scoreBreakdown.onTimeRate, color: 'bg-emerald-500' },
                      { label: t('score_reputation'), value: cand.scoreBreakdown.qualityRating, color: 'bg-amber-500' }
                    ].map((m) => (
                      <div key={m.label}>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>{m.label}</span>
                          <span className="font-semibold text-slate-200">{Math.round(m.value)}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-700/60 overflow-hidden">
                          <div className={`h-full ${m.color}`} style={{ width: `${Math.min(100, m.value)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {agent.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] px-2 py-0.5 rounded-md font-mono ${
                          isDark ? 'bg-[#0D1526] text-slate-300' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-purple-900/20 dark:border-purple-950/60 flex items-center justify-between gap-3 flex-wrap">
                <button
                  onClick={() => setExpandedId(expandedId === agent.id ? null : agent.id)}
                  className="text-xs font-semibold text-purple-600 dark:text-purple-300 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {expandedId === agent.id ? (
                    <>{locale === 'zh-CN' ? '收起详情' : 'Collapse'}<ChevronDown className="w-3.5 h-3.5 rotate-180" /></>
                  ) : (
                    <>{locale === 'zh-CN' ? '查看详情' : 'Details'}<ChevronDown className="w-3.5 h-3.5" /></>
                  )}
                </button>

                <div className="flex items-center gap-2 flex-wrap">
                  {isMatchingState && expandedId === agent.id && (
                    <>
                      <button
                        onClick={() => toggleForDag(agent.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                          isInDag
                            ? 'bg-purple-600 text-white border-purple-600'
                            : isDark
                            ? 'border-purple-900/50 hover:bg-purple-950/40 text-slate-300'
                            : 'border-purple-200 hover:bg-purple-50 text-slate-700'
                        }`}
                      >
                        {isInDag ? (
                          <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" />{locale === 'zh-CN' ? '已加入编排' : 'In DAG'}</span>
                        ) : (
                          <span className="flex items-center gap-1"><Plus className="w-3.5 h-3.5" />{locale === 'zh-CN' ? '加入编排' : 'Add to DAG'}</span>
                        )}
                      </button>

                      <button
                        onClick={() => addToCompare(agent)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                          isCompared
                            ? 'bg-purple-600/20 border-purple-500 text-purple-600 dark:text-purple-300'
                            : isDark
                            ? 'border-purple-900/50 hover:bg-purple-950/40 text-slate-300'
                            : 'border-purple-200 hover:bg-purple-50 text-slate-700'
                        }`}
                      >
                        {isCompared ? '✓ Compare' : '+ Compare'}
                      </button>
                    </>
                  )}

                  {isMatchingState && (
                    <button
                      onClick={() => {
                        if (activeTask) {
                          assignAgentToTask(activeTask.id, agent);
                        }
                      }}
                      className="btn-shine px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-[#4F8EF7] hover:to-[#22D3EE] text-white transition-colors shadow-sm"
                    >
                      {locale === 'zh-CN' ? '一键下单' : 'Order Now'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {candidates.length === 0 && activeTask && (
          <div className={`p-10 text-center rounded-2xl border ${isDark ? 'bg-[#101A2E] border-purple-900/40' : 'bg-white border-purple-100'}`}>
            <Bot className="w-10 h-10 mx-auto mb-2 text-slate-500 opacity-40" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {locale === 'zh-CN' ? '暂无匹配候选，试试放宽预算或更换任务关键词。' : 'No candidates yet — try relaxing the budget or refining the task brief.'}
            </p>
          </div>
        )}
      </div>

      {/* Sticky Multi-Select Orchestration Bar */}
      {selectedDagAgents.length > 0 && (
        <div className="sticky bottom-4 z-30">
          <div
            className={`p-4 rounded-2xl border shadow-2xl flex items-center justify-between gap-4 ${
              isDark ? 'bg-[#16233C]/95 border-purple-500/50' : 'bg-white/95 border-purple-300 shadow-purple-500/20'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex -space-x-2">
                {selectedDagAgents.slice(0, 4).map((a) => (
                  <img
                    key={a.id}
                    src={a.avatar}
                    alt={a.name}
                    className="w-8 h-8 rounded-full border-2 border-purple-600 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {locale === 'zh-CN' ? `已选 ${selectedDagAgents.length} 个 Agent` : `${selectedDagAgents.length} agents selected`}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {locale === 'zh-CN'
                    ? '将按选中顺序生成多 Agent 串联编排流水线'
                    : 'A chained orchestration DAG will be generated from the selection'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setSelectedForDag([])}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                {locale === 'zh-CN' ? '清空' : 'Clear'}
              </button>
              <button
                onClick={handleGenerateDag}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 shadow-md shadow-cyan-500/25 flex items-center gap-1.5 cursor-pointer"
              >
                <Workflow className="w-4 h-4" />
                {locale === 'zh-CN' ? '一键生成编排 DAG' : 'Generate DAG'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Low-emphasis audit version */}
      <div className="text-center text-[11px] text-slate-500 font-mono">
        Matching Algorithm: {candidates[0]?.algorithmVersion || 'v1.4.0-qdrant-rule-blend'} · {locale === 'zh-CN' ? '实时基于当前任务语义计算' : 'computed live from the active task brief'}
      </div>
    </div>
  );
};
