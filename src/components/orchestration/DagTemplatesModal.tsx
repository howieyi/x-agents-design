import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockOrchestrationTemplates } from '../../data/mockData';
import { TaskOrchestration } from '../../types';
import {
  X,
  Layers,
  Sparkles,
  Download,
  Upload,
  Check,
  Workflow,
  GitFork,
  Bot,
  ShieldCheck,
  Cpu,
  ArrowRight
} from 'lucide-react';

interface DagTemplatesModalProps {
  taskId: string;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const DagTemplatesModal: React.FC<DagTemplatesModalProps> = ({
  taskId,
  isOpen,
  onClose,
  isDark
}) => {
  const { tasks, applyOrchestrationTemplate, updateTaskOrchestration, locale, showToast } = useApp();
  const isZh = locale === 'zh-CN';

  const task = tasks.find((t) => t.id === taskId);
  const [activeTab, setActiveTab] = useState<'presets' | 'export_import'>('presets');
  const [jsonText, setJsonText] = useState('');

  if (!isOpen || !task) return null;

  const handleApply = (templateId: string) => {
    applyOrchestrationTemplate(taskId, templateId);
    onClose();
  };

  const handleExportJson = () => {
    if (!task.orchestration) return;
    const exportData = JSON.stringify(task.orchestration, null, 2);
    setJsonText(exportData);
    navigator.clipboard.writeText(exportData);
    showToast(isZh ? '已复制 DAG 编排 JSON 至剪贴板' : 'Copied DAG JSON to clipboard', 'success');
  };

  const handleImportJson = () => {
    try {
      const parsed: TaskOrchestration = JSON.parse(jsonText);
      if (!parsed.nodes || !Array.isArray(parsed.nodes)) {
        throw new Error('Invalid DAG structure: nodes array is missing');
      }
      updateTaskOrchestration(taskId, parsed);
      showToast(isZh ? '已成功导入并加载 DAG 编排配置' : 'Imported DAG configuration successfully', 'success');
      onClose();
    } catch (err: any) {
      showToast(isZh ? `导入失败: ${err.message}` : `Import failed: ${err.message}`, 'error');
    }
  };

  return (
    <div
      id="dag-templates-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        id="dag-templates-modal-container"
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {isZh ? 'Multi-Agent 协同拓扑模板与 JSON 编排' : 'Multi-Agent Topology Templates & JSON'}
              </h3>
              <p className="text-xs text-slate-400">
                {isZh ? '快速套用业界最佳实践 Dify / n8n 编排拓扑或导入自定义 DAG' : 'Load verified multi-agent DAG architectures or import custom specs'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className={`flex border-b px-5 text-xs font-semibold ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
          <button
            onClick={() => setActiveTab('presets')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'presets'
                ? 'border-cyan-500 text-cyan-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {isZh ? '预设拓扑模板' : 'Swarm Presets'}
          </button>
          <button
            onClick={() => {
              setActiveTab('export_import');
              if (task.orchestration) {
                setJsonText(JSON.stringify(task.orchestration, null, 2));
              }
            }}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'export_import'
                ? 'border-cyan-500 text-cyan-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4" />
            {isZh ? '导入 / 导出 JSON' : 'Export / Import JSON'}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {activeTab === 'presets' && (
            <div className="grid gap-3">
              {mockOrchestrationTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 hover:border-cyan-500/60 ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-slate-100">
                          {isZh ? tpl.nameZh || tpl.name : tpl.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono uppercase bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                          {tpl.topology}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {isZh ? tpl.descriptionZh || tpl.description : tpl.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleApply(tpl.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all text-xs shrink-0"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isZh ? '应用此模板' : 'Apply Preset'}</span>
                    </button>
                  </div>

                  {/* Stage nodes pipeline preview */}
                  <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1">
                    {tpl.nodes.map((n, idx) => (
                      <React.Fragment key={n.id}>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 shrink-0">
                          <Bot className="w-3 h-3 text-cyan-400" />
                          <span className="font-medium truncate max-w-[120px]">{n.name}</span>
                        </div>
                        {idx < tpl.nodes.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'export_import' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">
                  {isZh ? 'DAG 拓扑 JSON 结构描述' : 'DAG JSON Specification'}
                </span>
                <button
                  onClick={handleExportJson}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  {isZh ? '复制 JSON' : 'Copy JSON'}
                </button>
              </div>

              <textarea
                rows={12}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder="Paste TaskOrchestration JSON here..."
                className={`w-full p-3 rounded-2xl border font-mono text-[11px] outline-none leading-relaxed transition-colors ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 focus:border-cyan-500 text-cyan-300'
                    : 'bg-slate-50 border-slate-300 focus:border-cyan-600 text-slate-900'
                }`}
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={handleImportJson}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all text-xs"
                >
                  <Upload className="w-4 h-4" />
                  {isZh ? '解析并导入 DAG' : 'Import & Apply DAG'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
