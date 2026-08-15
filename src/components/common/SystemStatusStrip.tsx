import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Cpu, Activity, Layers, Radio } from 'lucide-react';

export const SystemStatusStrip: React.FC = () => {
  const { t, systemStatus, theme, locale } = useApp();
  const isDark = theme === 'dark';

  return (
    <div
      id="system-status-strip"
      className={`w-full border-b px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-4 transition-colors ${
        isDark
          ? 'bg-[#0A1424] border-[#243550]/80 text-[#9CAEC5]'
          : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}
    >
      <div className="flex items-center gap-5 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35D07F] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#35D07F]"></span>
          </span>
          <span className={`font-medium ${isDark ? 'text-[#F4F7FB]' : 'text-slate-900'}`}>
            {t('system_healthy')}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono-tabular">
          <Radio className="w-3.5 h-3.5 text-[#36E4DA]" />
          <span>{systemStatus.chainName}</span>
          <span className="opacity-40">|</span>
          <span className="opacity-80">
            {t('block_height')} #{systemStatus.blockHeight.toLocaleString()}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 font-mono-tabular">
          <Cpu className="w-3.5 h-3.5 text-[#7568FF]" />
          <span>{t('qdrant_indexing')}</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded font-medium bg-[#7568FF]/15 text-[#7568FF]">
            {systemStatus.qdrantVectorCount.toLocaleString()} {locale === 'zh-CN' ? '向量' : 'vectors'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap font-mono-tabular">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-[#35D07F]" />
          <span>{t('rpc_latency')}:</span>
          <span className="text-[#35D07F] font-semibold">{systemStatus.rpcLatencyMs}ms</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#FFC857]" />
          <span className="opacity-75">Config:</span>
          <span className="font-mono text-[11px] opacity-90">{systemStatus.configVersion}</span>
        </div>
      </div>
    </div>
  );
};
