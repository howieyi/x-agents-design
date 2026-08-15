import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { OrchestrationNode, OrchestrationNodeType } from '../../types';
import {
  X,
  Bot,
  Sliders,
  ShieldCheck,
  Cpu,
  Coins,
  Clock,
  Terminal,
  Save,
  Trash2,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  Sparkles,
  GitFork,
  Scale,
  FolderArchive
} from 'lucide-react';

interface NodeInspectorDrawerProps {
  node: OrchestrationNode | null;
  taskId: string;
  isOpen: boolean;
  onClose: () => void;
  onDeleteNode: (nodeId: string) => void;
  onDuplicateNode: (nodeId: string) => void;
  onExecuteStep: () => void;
  onApproveNode: (nodeId: string) => void;
  isDark: boolean;
}

export const NodeInspectorDrawer: React.FC<NodeInspectorDrawerProps> = ({
  node,
  taskId,
  isOpen,
  onClose,
  onDeleteNode,
  onDuplicateNode,
  onExecuteStep,
  onApproveNode,
  isDark
}) => {
  const { agents, updateNodeData, locale, t, showToast } = useApp();
  const isZh = locale === 'zh-CN';

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [nodeType, setNodeType] = useState<OrchestrationNodeType>('agent_worker');
  const [assignedAgentId, setAssignedAgentId] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [rewardPct, setRewardPct] = useState(25);
  const [requireHumanApproval, setRequireHumanApproval] = useState(false);
  const [inputArtifactsStr, setInputArtifactsStr] = useState('');
  const [outputArtifactsStr, setOutputArtifactsStr] = useState('');
  const [activeTab, setActiveTab] = useState<'config' | 'prompt' | 'ports' | 'logs'>('config');

  useEffect(() => {
    if (node) {
      setName(node.name || '');
      setRole(node.role || '');
      setNodeType(node.nodeType || 'agent_worker');
      setAssignedAgentId(node.assignedAgentId || (agents[0]?.id || ''));
      setSystemPrompt(node.systemPromptSnippet || '');
      setRewardPct(node.rewardAllocationPct || 20);
      setRequireHumanApproval(node.requireHumanApproval || false);
      setInputArtifactsStr((node.inputArtifacts || []).join(', '));
      setOutputArtifactsStr((node.outputArtifacts || []).join(', '));
    }
  }, [node, agents]);

  if (!isOpen || !node) return null;

  const handleSave = () => {
    const selectedAgent = agents.find((a) => a.id === assignedAgentId);
    const parsedInputs = inputArtifactsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const parsedOutputs = outputArtifactsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateNodeData(taskId, node.id, {
      name,
      role,
      nodeType,
      assignedAgentId,
      assignedAgentName: selectedAgent?.name || node.assignedAgentName,
      assignedAgentAvatar: selectedAgent?.avatar || node.assignedAgentAvatar,
      assignedAgentHandle: selectedAgent?.handle || node.assignedAgentHandle,
      systemPromptSnippet: systemPrompt,
      rewardAllocationPct: rewardPct,
      requireHumanApproval,
      inputArtifacts: parsedInputs,
      outputArtifacts: parsedOutputs
    });

    showToast(isZh ? '已保存节点参数配置' : 'Saved node configuration', 'success');
  };

  const getNodeTypeBadge = (type?: OrchestrationNodeType) => {
    switch (type) {
      case 'llm_router':
        return { label: isZh ? 'LLM 路由决策' : 'LLM Router', icon: <GitFork className="w-3.5 h-3.5 text-purple-400" />, color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
      case 'hitl_gate':
        return { label: isZh ? '人机审批门禁' : 'HITL Gate', icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />, color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      case 'tool_sandbox':
        return { label: isZh ? '创作工具执行器' : 'Creative Tools', icon: <Cpu className="w-3.5 h-3.5 text-emerald-400" />, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'consensus_judge':
        return { label: isZh ? '多方共识裁判' : 'Consensus Judge', icon: <Scale className="w-3.5 h-3.5 text-blue-400" />, color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
      case 'aggregator':
        return { label: isZh ? 'Escrow 成果汇总' : 'Escrow Aggregator', icon: <FolderArchive className="w-3.5 h-3.5 text-amber-400" />, color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
      case 'agent_worker':
      default:
        return { label: isZh ? 'Agent 专家节点' : 'Agent Worker', icon: <Bot className="w-3.5 h-3.5 text-cyan-400" />, color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' };
    }
  };

  const badge = getNodeTypeBadge(node.nodeType);

  return (
    <div
      id="node-inspector-drawer"
      className={`fixed inset-y-0 right-0 z-50 w-full max-w-md border-l shadow-2xl flex flex-col transition-all duration-300 backdrop-blur-2xl ${
        isDark
          ? 'bg-slate-900/95 border-slate-800 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-900'
      }`}
    >
      {/* Header */}
      <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm truncate max-w-[200px]">{node.name}</h3>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.color}`}>
                {badge.icon}
                {badge.label}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Node ID: {node.id}</p>
          </div>
        </div>

        <button
          id="btn-close-node-inspector"
          onClick={onClose}
          className={`p-1.5 rounded-lg transition-colors ${
            isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200' : 'hover:bg-slate-100 text-slate-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className={`flex border-b px-4 text-xs font-medium ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
        <button
          onClick={() => setActiveTab('config')}
          className={`py-2.5 px-3 border-b-2 transition-colors ${
            activeTab === 'config'
              ? 'border-cyan-500 text-cyan-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {isZh ? '基础属性' : 'Properties'}
        </button>
        <button
          onClick={() => setActiveTab('prompt')}
          className={`py-2.5 px-3 border-b-2 transition-colors ${
            activeTab === 'prompt'
              ? 'border-cyan-500 text-cyan-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {isZh ? 'Prompt & 专精' : 'Prompt & Role'}
        </button>
        <button
          onClick={() => setActiveTab('ports')}
          className={`py-2.5 px-3 border-b-2 transition-colors ${
            activeTab === 'ports'
              ? 'border-cyan-500 text-cyan-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {isZh ? '输入输出产出' : 'I/O Artifacts'}
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`py-2.5 px-3 border-b-2 transition-colors ${
            activeTab === 'logs'
              ? 'border-cyan-500 text-cyan-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {isZh ? '执行日志' : 'Logs'} ({node.logs?.length || 0})
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {activeTab === 'config' && (
          <div className="space-y-4">
            {/* Status overview */}
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              node.status === 'completed'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : node.status === 'running'
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                : node.status === 'waiting_approval'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-slate-800/40 border-slate-700/60 text-slate-300'
            }`}>
              <div className="flex items-center gap-2">
                {node.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                {node.status === 'running' && <Play className="w-4 h-4 animate-pulse" />}
                {node.status === 'waiting_approval' && <AlertTriangle className="w-4 h-4" />}
                <span className="font-semibold capitalize">Status: {node.status}</span>
              </div>

              {node.requireHumanApproval && !node.approved && (
                <button
                  onClick={() => onApproveNode(node.id)}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1 text-[11px]"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {isZh ? '签名放行' : 'Sign Gate'}
                </button>
              )}
            </div>

            {/* Node Title */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                {isZh ? '节点名称' : 'Node Label / Title'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-slate-800/80 border-slate-700 focus:border-cyan-500 text-slate-100' : 'bg-slate-50 border-slate-300 focus:border-cyan-600'
                }`}
              />
            </div>

            {/* Node Type */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                {isZh ? '节点架构类型' : 'Node Topology Type'}
              </label>
              <select
                value={nodeType}
                onChange={(e) => setNodeType(e.target.value as OrchestrationNodeType)}
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-slate-800/80 border-slate-700 focus:border-cyan-500 text-slate-100' : 'bg-slate-50 border-slate-300 focus:border-cyan-600'
                }`}
              >
                <option value="agent_worker">{isZh ? '内容创作 Agent 执行节点' : 'Content Agent Worker'}</option>
                <option value="llm_router">{isZh ? '内容意图决策路由器' : 'Content Intent Router'}</option>
                <option value="hitl_gate">{isZh ? '人机审批门禁 (HITL)' : 'Human Approval Gate (HITL)'}</option>
                <option value="tool_sandbox">{isZh ? '创作工具执行器 (图像/视频/文档)' : 'Creative Tool Runner (Image/Video/Doc)'}</option>
                <option value="consensus_judge">{isZh ? '内容质量评审/裁决' : 'Quality Judge'}</option>
                <option value="aggregator">{isZh ? '内容成果打包与结算' : 'Asset Aggregator'}</option>
              </select>
            </div>

            {/* Assigned Agent */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                {isZh ? '指派 AI Agent' : 'Assigned Marketplace Agent'}
              </label>
              <select
                value={assignedAgentId}
                onChange={(e) => setAssignedAgentId(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-slate-800/80 border-slate-700 focus:border-cyan-500 text-slate-100' : 'bg-slate-50 border-slate-300 focus:border-cyan-600'
                }`}
              >
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} ({agent.handle}) - {agent.category}
                  </option>
                ))}
              </select>
            </div>

            {/* Escrow Reward Share */}
            <div>
              <div className="flex items-center justify-between text-slate-400 font-semibold mb-1">
                <span>{isZh ? '托管资金分成比例' : 'Escrow Reward Allocation'}</span>
                <span className="text-cyan-400 font-mono font-bold">{rewardPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={rewardPct}
                onChange={(e) => setRewardPct(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Human in the loop checkpoint checkbox */}
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="font-semibold text-slate-200">
                    {isZh ? '启用人工审批门禁' : 'Human-in-the-loop Gate'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isZh ? '此节点执行完后需签署放行' : 'Requires owner sign-off to advance'}
                  </div>
                </div>
              </div>

              <input
                type="checkbox"
                checked={requireHumanApproval}
                onChange={(e) => setRequireHumanApproval(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            {/* Telemetry quick metrics */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-800/30 border-slate-700/40' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isZh ? '执行耗时' : 'Duration'}</span>
                </div>
                <div className="font-mono font-bold text-slate-200">
                  {node.executionTimeMs ? `${node.executionTimeMs} ms` : '-'}
                </div>
              </div>

              <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-800/30 border-slate-700/40' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isZh ? 'Token 消耗' : 'Tokens'}</span>
                </div>
                <div className="font-mono font-bold text-slate-200">
                  {node.tokensUsed ? `${node.tokensUsed.toLocaleString()} t` : '-'}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prompt' && (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                {isZh ? 'Agent 职责定位' : 'Specialized Role Definition'}
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. 小红书爆款图文与封面创作专家"
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-slate-800/80 border-slate-700 focus:border-cyan-500 text-slate-100' : 'bg-slate-50 border-slate-300 focus:border-cyan-600'
                }`}
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1 flex items-center justify-between">
                <span>{isZh ? '系统提示词 (System Prompt)' : 'System Prompt Snippet'}</span>
                <span className="text-[10px] text-cyan-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> LangGraph Context
                </span>
              </label>
              <textarea
                rows={7}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="描述本节点的创作产出要求、风格规范与调用的创作工具（如 Flux 渲染、Runway 分片、PPTX 引擎）..."
                className={`w-full p-3 rounded-xl border font-mono text-[11px] outline-none leading-relaxed transition-colors ${
                  isDark ? 'bg-slate-800/80 border-slate-700 focus:border-cyan-500 text-cyan-300' : 'bg-slate-50 border-slate-300 focus:border-cyan-600 text-slate-800'
                }`}
              />
            </div>
          </div>
        )}

        {activeTab === 'ports' && (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                {isZh ? '输入依赖产出物 (以逗号分隔)' : 'Input Dependencies (Comma-separated)'}
              </label>
              <input
                type="text"
                value={inputArtifactsStr}
                onChange={(e) => setInputArtifactsStr(e.target.value)}
                placeholder="e.g. 核心主题文案.md, 分镜脚本.json"
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-slate-800/80 border-slate-700 focus:border-cyan-500 text-slate-100' : 'bg-slate-50 border-slate-300 focus:border-cyan-600'
                }`}
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                {isZh ? '本阶段生成交付物 (以逗号分隔)' : 'Emitted Output Artifacts (Comma-separated)'}
              </label>
              <input
                type="text"
                value={outputArtifactsStr}
                onChange={(e) => setOutputArtifactsStr(e.target.value)}
                placeholder="e.g. 小红书卡片.zip, 短视频分镜.md, pitch_deck.pptx"
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none transition-colors ${
                  isDark ? 'bg-slate-800/80 border-slate-700 focus:border-cyan-500 text-slate-100' : 'bg-slate-50 border-slate-300 focus:border-cyan-600'
                }`}
              />
            </div>

            <div className={`p-3 rounded-xl border text-[11px] leading-relaxed text-slate-400 ${
              isDark ? 'bg-slate-800/30 border-slate-700/40' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                {isZh ? 'Dify 级数据流转机制' : 'Dify-Style Dynamic Handoff'}
              </div>
              {isZh
                ? '当本节点完成后，所有声明的 Output 产出物将自动写入共享内存池，并沿着连线管道传递给下一阶段输入端口。'
                : 'Outputs emitted by this node are automatically committed to the Shared Context Pool and piped to connected downstream input ports.'}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-2">
            {(!node.logs || node.logs.length === 0) ? (
              <div className="text-center py-8 text-slate-500">
                <Terminal className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>{isZh ? '暂无执行轨迹日志' : 'No execution logs recorded yet'}</p>
              </div>
            ) : (
              node.logs.map((log) => (
                <div
                  key={log.id}
                  className={`p-2.5 rounded-xl border font-mono text-[11px] leading-relaxed ${
                    log.level === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                      : log.level === 'agent_call'
                      ? 'bg-purple-500/10 border-purple-500/20 text-purple-300'
                      : 'bg-slate-800/60 border-slate-700/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-semibold uppercase">{log.level}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <div>{log.message}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer action buttons */}
      <div className={`p-4 border-t flex items-center justify-between gap-2 ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onDuplicateNode(node.id)}
            title={isZh ? '克隆节点' : 'Duplicate Node'}
            className={`p-2 rounded-xl border transition-colors ${
              isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-slate-200' : 'border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              if (window.confirm(isZh ? '确认删除该协同节点？' : 'Delete this orchestration node?')) {
                onDeleteNode(node.id);
                onClose();
              }
            }}
            title={isZh ? '删除节点' : 'Delete Node'}
            className="p-2 rounded-xl border border-red-500/20 hover:bg-red-500/10 text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-save-node-inspector"
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all text-xs"
          >
            <Save className="w-4 h-4" />
            {isZh ? '保存配置' : 'Apply Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
