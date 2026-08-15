import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockMatchingCandidates } from '../../data/mockData';
import {
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
  Info,
  SlidersHorizontal,
  Bot
} from 'lucide-react';

export const MatchingResultsView: React.FC = () => {
  const {
    t,
    activeTask,
    assignAgentToTask,
    setSelectedAgent,
    setIsAgentDetailOpen,
    addToCompare,
    setIsCompareOpen,
    compareAgents,
    theme,
    locale
  } = useApp();

  const isDark = theme === 'dark';
  const candidates = mockMatchingCandidates;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#7568FF]" />
            {t('matching_title')}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            {t('matching_subtitle')}
          </p>
        </div>

        {compareAgents.length > 0 && (
          <button
            onClick={() => setIsCompareOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#7568FF] text-white hover:bg-[#6355E0] transition-colors flex items-center gap-2 shadow-md self-start md:self-auto cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {locale === 'zh-CN'
              ? `多 Agent 矩阵对比 (${compareAgents.length}/3)`
              : `Compare Candidates (${compareAgents.length}/3)`}
          </button>
        )}
      </div>

      {/* Target Task Pinned Card */}
      {activeTask && (
        <div
          className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDark
              ? 'bg-[#0C1728] border-[#243550]'
              : 'bg-gradient-to-r from-sky-50 to-white border-sky-200'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#36E4DA]/15 text-[#36E4DA]">
                {t('matching_task_pinned')}
              </span>
              <span className="font-mono text-xs text-slate-400">#{activeTask.id}</span>
            </div>
            <h3 className="font-semibold text-sm">{activeTask.title}</h3>
            <p className="text-xs text-slate-400 font-mono-tabular">
              {activeTask.category} · Budget: {activeTask.rewardYD.toLocaleString()} YD · Stake:{' '}
              {activeTask.stakeYD} YD
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-mono">
              Qdrant Top-3 Recalled
            </span>
          </div>
        </div>
      )}

      {/* Ranked Candidate List */}
      <div className="space-y-5">
        {candidates.map((cand, idx) => {
          const agent = cand.agent;
          const isCompared = compareAgents.some((a) => a.id === agent.id);

          return (
            <div
              key={agent.id}
              id={`matching-candidate-${agent.id}`}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-[#0C1728] border-[#243550] hover:border-[#7568FF]/60'
                  : 'bg-white border-slate-200 hover:border-indigo-300 shadow-xs'
              }`}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3.5">
                  <div className="relative">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-700/50"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#7568FF] text-white text-xs font-bold flex items-center justify-center font-mono">
                      #{idx + 1}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className="font-display font-bold text-base hover:text-[#36E4DA] cursor-pointer"
                        onClick={() => {
                          setSelectedAgent(agent);
                          setIsAgentDetailOpen(true);
                        }}
                      >
                        {agent.name}
                      </h3>
                      {agent.verified && (
                        <ShieldCheck className="w-4 h-4 text-[#35D07F]" title="Verified" />
                      )}
                      {cand.isExploreCandidate ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFC857]/15 text-[#FFC857] border border-[#FFC857]/30">
                          {t('explore_candidate_badge')}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#36E4DA]/15 text-[#36E4DA] border border-[#36E4DA]/30">
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
                    <span className="text-xs text-slate-400 font-medium">{t('overall_match_score')}:</span>
                    <span className="font-mono font-bold text-lg text-[#7568FF]">
                      {cand.overallScore}%
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-xs text-[#FFC857]">
                    {agent.priceYD.toLocaleString()} YD
                  </span>
                </div>
              </div>

              {/* "Why this match" explanation box */}
              <div
                className={`p-3 rounded-xl border text-xs mb-4 ${
                  isDark
                    ? 'bg-[#07111F] border-[#243550]/80 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#7568FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#7568FF] mr-1">
                      {t('why_this_match')}:
                    </span>
                    <span className="leading-relaxed">
                      {locale === 'zh-CN' ? cand.whyMatch.zh : cand.whyMatch.en}
                    </span>
                  </div>
                </div>
              </div>

              {/* Match Factors Breakdown Bars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4 font-mono-tabular">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>{t('score_semantic')}</span>
                    <span className="font-semibold text-slate-200">{cand.scoreBreakdown.semanticMatch}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-[#7568FF]"
                      style={{ width: `${cand.scoreBreakdown.semanticMatch}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>{t('score_skills')}</span>
                    <span className="font-semibold text-slate-200">{cand.scoreBreakdown.categoryTagMatch}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-[#36E4DA]"
                      style={{ width: `${cand.scoreBreakdown.categoryTagMatch}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>{t('score_ontime')}</span>
                    <span className="font-semibold text-[#35D07F]">{cand.scoreBreakdown.onTimeRate}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-[#35D07F]"
                      style={{ width: `${cand.scoreBreakdown.onTimeRate}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>{t('score_reputation')}</span>
                    <span className="font-semibold text-[#FFC857]">{cand.scoreBreakdown.qualityRating}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-[#FFC857]"
                      style={{ width: `${cand.scoreBreakdown.qualityRating}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-700/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {agent.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                        isDark ? 'bg-[#111F34] text-slate-300' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToCompare(agent)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                      isCompared
                        ? 'bg-[#7568FF]/20 border-[#7568FF] text-[#7568FF]'
                        : isDark
                        ? 'border-[#243550] hover:bg-[#111F34] text-slate-300'
                        : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {isCompared ? '✓ Added to Compare' : '+ Compare'}
                  </button>

                  <button
                    onClick={() => {
                      if (activeTask) {
                        assignAgentToTask(activeTask.id, agent);
                      }
                    }}
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#36E4DA] text-[#07111F] hover:bg-[#36E4DA]/90 transition-colors shadow-sm"
                  >
                    {t('btn_assign_agent')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Low-emphasis audit version */}
      <div className="text-center text-[11px] text-slate-500 font-mono">
        Matching Algorithm: {candidates[0]?.algorithmVersion || 'v1.4.0-qdrant-rule-blend'} · Feature Snapshot #snapshot_8492
      </div>
    </div>
  );
};
