import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Compass, Sparkles, MonitorPlay } from 'lucide-react';

export interface StageSection {
  id: string;
  num: string;
  titleZh: string;
  titleEn: string;
  badge: string;
}

interface ScreenScrollNavigatorProps {
  stages: StageSection[];
  activeStageIndex: number;
  onSelectStage: (index: number) => void;
  locale: string;
  isDark: boolean;
}

export const ScreenScrollNavigator: React.FC<ScreenScrollNavigatorProps> = ({
  stages,
  activeStageIndex,
  onSelectStage,
  locale,
  isDark
}) => {
  const currentStage = stages[activeStageIndex] || stages[0];

  const handleNext = () => {
    if (activeStageIndex < stages.length - 1) {
      onSelectStage(activeStageIndex + 1);
    } else {
      onSelectStage(0);
    }
  };

  const handlePrev = () => {
    if (activeStageIndex > 0) {
      onSelectStage(activeStageIndex - 1);
    } else {
      onSelectStage(stages.length - 1);
    }
  };

  return (
    <>
      {/* Right-Side Desktop Stage Navigation Rail */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 select-none">
        <div
          className={`p-2 rounded-2xl border backdrop-blur-xl flex flex-col items-center gap-2 shadow-2xl transition-all duration-300 ${
            isDark
              ? 'bg-[#10132B]/85 border-purple-900/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : 'bg-white/90 border-purple-100 shadow-[0_10px_30px_rgba(124,58,237,0.12)]'
          }`}
        >
          {/* Scroll Up button */}
          <button
            onClick={handlePrev}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-purple-950/60 text-purple-300'
                : 'hover:bg-purple-50 text-purple-700'
            }`}
            title={locale === 'zh-CN' ? '上一屏' : 'Previous Screen'}
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          {/* Dots List */}
          <div className="flex flex-col items-center gap-2.5 py-1">
            {stages.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => onSelectStage(idx)}
                  className="group relative flex items-center justify-center p-1 cursor-pointer"
                  title={locale === 'zh-CN' ? `${stage.num} ${stage.titleZh}` : `${stage.num} ${stage.titleEn}`}
                >
                  {/* Floating tooltip */}
                  <div
                    className={`absolute right-7 px-2.5 py-1 rounded-lg text-xs font-mono font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 border shadow-lg ${
                      isDark
                        ? 'bg-[#161A38] text-purple-200 border-purple-800/60 shadow-black/60'
                        : 'bg-white text-purple-950 border-purple-200 shadow-purple-500/10'
                    }`}
                  >
                    <span className="text-purple-400 font-bold mr-1.5">{stage.num}</span>
                    <span>{locale === 'zh-CN' ? stage.titleZh : stage.titleEn}</span>
                  </div>

                  {/* Active Indicator dot */}
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-3 h-7 bg-gradient-to-b from-purple-500 to-indigo-500 shadow-md shadow-purple-500/50 rounded-full'
                        : 'w-2.5 h-2.5 bg-purple-900/40 dark:bg-purple-950/80 hover:bg-purple-500/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Scroll Down button */}
          <button
            onClick={handleNext}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-purple-950/60 text-purple-300'
                : 'hover:bg-purple-50 text-purple-700'
            }`}
            title={locale === 'zh-CN' ? '下一屏' : 'Next Screen'}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Screen Index Counter Badge */}
        <div
          className={`px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold backdrop-blur-md shadow-md ${
            isDark
              ? 'bg-[#10132B]/85 border-purple-900/50 text-purple-300'
              : 'bg-white/90 border-purple-200 text-purple-900'
          }`}
        >
          {stages[activeStageIndex]?.num || '01'} / {stages.length.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Floating Bottom Quick HUD (Mobile & Tablet & Quick Trigger) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-8 z-40 lg:hidden flex items-center gap-2">
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-2xl backdrop-blur-xl ${
            isDark
              ? 'bg-[#10132B]/90 border-purple-900/50 text-white'
              : 'bg-white/95 border-purple-200 text-slate-900'
          }`}
        >
          <span className="text-[11px] font-mono font-bold text-purple-400">
            {currentStage.num}
          </span>
          <span className="text-xs font-medium truncate max-w-[120px]">
            {locale === 'zh-CN' ? currentStage.titleZh : currentStage.titleEn}
          </span>

          <div className="flex items-center gap-1 pl-1 border-l border-purple-900/30 dark:border-purple-950/60">
            <button
              onClick={handlePrev}
              className="p-1 rounded-md hover:bg-purple-500/20 text-purple-400"
              aria-label="Previous Section"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded-md hover:bg-purple-500/20 text-purple-400"
              aria-label="Next Section"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
