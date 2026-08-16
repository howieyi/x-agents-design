import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TaskOrchestration,
  OrchestrationNode,
  OrchestrationTopology,
  OrchestrationNodeType
} from '../../types';
import { NodePalette } from '../orchestration/NodePalette';
import { NodeGraphCanvas } from '../orchestration/NodeGraphCanvas';
import { NodeInspectorDrawer } from '../orchestration/NodeInspectorDrawer';
import { DagTemplatesModal } from '../orchestration/DagTemplatesModal';
import {
  Workflow,
  Layers,
  Bot,
  Play,
  Pause,
  RotateCcw,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Coins,
  Cpu,
  ArrowRight,
  GitFork,
  MessageSquareCode,
  Database,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Lock,
  Unlock,
  AlertCircle,
  FileCheck,
  Zap,
  Sliders,
  Trash2,
  Edit3,
  Terminal,
  Grid,
  FileJson,
  Check
} from 'lucide-react';

interface AgentOrchestratorStudioProps {
  taskId: string;
}

export const AgentOrchestratorStudio: React.FC<AgentOrchestratorStudioProps> = ({ taskId }) => {
  const {
    tasks,
    agents,
    theme,
    locale,
    t,
    updateTaskOrchestration,
    executeOrchestrationStep,
    approveOrchestrationNode,
    addOrchestrationNode,
    removeOrchestrationNode,
    duplicateNode,
    resetTaskOrchestration,
    showToast
  } = useApp();

  const isDark = theme === 'dark';
  const isZh = locale === 'zh-CN';
  const task = tasks.find((t) => t.id === taskId);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'canvas' | 'messages' | 'context' | 'splits'>('canvas');

  if (!task) return null;

  const orchestration = task.orchestration || {
    enabled: true,
    topology: 'pipeline' as OrchestrationTopology,
    nodes: [],
    edges: [],
    interAgentMessages: [],
    sharedContextPool: [],
    executionProgressPct: 0,
    totalExecutionCostYD: 0
  };

  const nodes = orchestration.nodes || [];
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  // Auto-run stepper simulation
  const handleAutoRun = () => {
    if (isAutoRunning) {
      setIsAutoRunning(false);
      return;
    }

    setIsAutoRunning(true);
    showToast(isZh ? '已启动多 Agent 协同流水线自动执行' : 'Started Multi-Agent swarm auto-execution', 'info');

    const stepInterval = setInterval(() => {
      executeOrchestrationStep(task.id);
    }, 2200);

    // Stop when completed or after reasonable steps
    setTimeout(() => {
      clearInterval(stepInterval);
      setIsAutoRunning(false);
    }, 12000);
  };

  // Add Node from NodePalette
  const handleAddNodeFromPalette = (type: OrchestrationNodeType) => {
    const assignedAgent = agents[nodes.length % agents.length] || agents[0];
    const newStageIndex = nodes.length + 1;
    
    // Position staggered based on node count
    const col = (newStageIndex - 1) % 3;
    const row = Math.floor((newStageIndex - 1) / 3);
    const x = 80 + col * 360;
    const y = 80 + row * 260;

    let nodeName = `Stage ${newStageIndex}`;
    let role = assignedAgent.category;
    let rewardPct = 20;
    let isHitl = false;

    if (type === 'llm_router') {
      nodeName = `LLM Router #${newStageIndex}`;
      role = 'Intent Classifier & Dispatcher';
      rewardPct = 10;
    } else if (type === 'hitl_gate') {
      nodeName = `Approval Gate #${newStageIndex}`;
      role = 'Human Signoff Gate';
      isHitl = true;
      rewardPct = 5;
    } else if (type === 'tool_sandbox') {
      nodeName = `Sandbox Runner #${newStageIndex}`;
      role = 'Automated Fuzzing & AST Scanner';
      rewardPct = 25;
    } else if (type === 'consensus_judge') {
      nodeName = `Consensus Judge #${newStageIndex}`;
      role = 'Multi-Agent QA & Benchmark Arbiter';
      rewardPct = 20;
    } else if (type === 'aggregator') {
      nodeName = `Escrow Settlement #${newStageIndex}`;
      role = 'Deliverable Proof Aggregator';
      rewardPct = 15;
    }

    addOrchestrationNode(task.id, {
      name: nodeName,
      nodeType: type,
      stageIndex: newStageIndex,
      role,
      assignedAgentId: assignedAgent.id,
      assignedAgentName: assignedAgent.name,
      assignedAgentAvatar: assignedAgent.avatar,
      assignedAgentHandle: assignedAgent.handle,
      rewardAllocationPct: rewardPct,
      rewardAllocationYD: Math.round((task.rewardYD * rewardPct) / 100),
      requireHumanApproval: isHitl,
      position: { x, y },
      inputArtifacts: ['Preceding Deliverables'],
      outputArtifacts: [`${nodeName.toLowerCase().replace(/\s+/g, '_')}_output.json`]
    });

    showToast(isZh ? `已添加节点：${nodeName}` : `Added node: ${nodeName}`, 'success');
  };

  const handleOpenInspector = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setIsInspectorOpen(true);
  };

  const handleTopologyChange = (top: OrchestrationTopology) => {
    updateTaskOrchestration(task.id, {
      ...orchestration,
      topology: top
    });
  };

  const getTopologyLabel = (top: OrchestrationTopology) => {
    switch (top) {
      case 'pipeline':
        return t('topology_pipeline_label');
      case 'parallel_swarm':
        return t('topology_parallel_label');
      case 'hierarchical':
        return t('topology_hierarchical_label');
      case 'consensus_loop':
        return t('topology_consensus_label');
      case 'custom_dag':
        return isZh ? '自定义 DAG 拓扑 (Custom DAG)' : 'Custom DAG Topology';
      default:
        return top;
    }
  };

  const completedNodesCount = nodes.filter((n) => n.status === 'completed').length;
  const progressPct = nodes.length > 0 ? Math.round((completedNodesCount / nodes.length) * 100) : 0;
  const totalTokens = nodes.reduce((acc, curr) => acc + (curr.tokensUsed || 0), 0);

  return (
    <div id="agent-orchestrator-studio" className="space-y-4">
      {/* Top Banner & Orchestrator Header */}
      <div
        id="orchestration-header-card"
        className={`p-5 rounded-3xl border backdrop-blur-xl relative overflow-hidden transition-all ${
          isDark
            ? 'bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-950/90 border-slate-800 shadow-2xl'
            : 'bg-gradient-to-r from-white via-slate-50 to-slate-100/80 border-slate-200 shadow-lg'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Workflow className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                {isZh ? 'Multi-Agent 协同编排与图形化工作流 (Dify/n8n DAG Engine)' : 'Multi-Agent Graphical Orchestrator (Dify/n8n DAG Studio)'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                {getTopologyLabel(orchestration.topology)}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
              {t('orchestration_banner_desc')}
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className={`px-3 py-2 rounded-2xl border flex items-center gap-2 ${
              isDark ? 'bg-slate-800/50 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <Clock className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-[10px] text-slate-400">{t('workflow_progress')}</div>
                <div className="text-xs font-mono font-bold text-slate-200">{progressPct}%</div>
              </div>
            </div>

            <div className={`px-3 py-2 rounded-2xl border flex items-center gap-2 ${
              isDark ? 'bg-slate-800/50 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <Coins className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[10px] text-slate-400">{t('tokens_consumed')}</div>
                <div className="text-xs font-mono font-bold text-slate-200">{totalTokens.toLocaleString()} t</div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Topology & Execution Controls Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-wrap">
          {/* Topology Selector Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/60 border border-slate-800/80 overflow-x-auto">
            {(['pipeline', 'parallel_swarm', 'hierarchical', 'consensus_loop'] as OrchestrationTopology[]).map((top) => (
              <button
                key={top}
                id={`btn-topology-${top}`}
                onClick={() => handleTopologyChange(top)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  orchestration.topology === top
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {top === 'pipeline' && 'Pipeline'}
                {top === 'parallel_swarm' && 'Parallel Swarm'}
                {top === 'hierarchical' && 'Supervisor'}
                {top === 'consensus_loop' && 'Consensus'}
              </button>
            ))}
          </div>

          {/* Stepper & Execution Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="btn-run-orchestration-step"
              onClick={() => executeOrchestrationStep(task.id)}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{t('btn_run_next_stage')}</span>
            </button>

            <button
              id="btn-auto-orchestrate"
              onClick={handleAutoRun}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                isAutoRunning
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 animate-pulse'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              {isAutoRunning ? <Pause className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
              <span>{isAutoRunning ? t('btn_pause_orchestration') : t('btn_auto_orchestrate')}</span>
            </button>

            <button
              id="btn-reset-orchestration"
              onClick={() => resetTaskOrchestration(task.id)}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-slate-200 transition-colors"
              title={t('btn_reset_workflow')}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              id="btn-open-dag-templates"
              onClick={() => setIsTemplatesModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isZh ? '预设模板 / JSON' : 'Presets / JSON'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className={`flex border-b px-2 text-xs font-semibold ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <button
          id="tab-sub-canvas"
          onClick={() => setActiveSubTab('canvas')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'canvas'
              ? 'border-cyan-500 text-cyan-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Workflow className="w-4 h-4" />
          <span>{isZh ? '图形化编排画布 (Visual Canvas)' : 'Visual Node Graph Canvas'}</span>
        </button>

        <button
          id="tab-sub-messages"
          onClick={() => setActiveSubTab('messages')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'messages'
              ? 'border-cyan-500 text-cyan-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquareCode className="w-4 h-4" />
          <span>{t('tab_inter_agent_bus')}</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-400">
            {orchestration.interAgentMessages?.length || 0}
          </span>
        </button>

        <button
          id="tab-sub-context"
          onClick={() => setActiveSubTab('context')}
          className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'context'
              ? 'border-cyan-500 text-cyan-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>{t('tab_shared_memory')}</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-400">
            {orchestration.sharedContextPool?.length || 0}
          </span>
        </button>
      </div>

      {/* SUB TAB 1: Visual Drag-and-Drop Node Graph Canvas Studio */}
      {activeSubTab === 'canvas' && (
        <div className="space-y-3">
          {/* Dify/n8n Node Palette Bar */}
          <NodePalette
            onAddNode={handleAddNodeFromPalette}
            isDark={isDark}
          />

          {/* Interactive 2D Graph Canvas */}
          <NodeGraphCanvas
            taskId={task.id}
            orchestration={orchestration}
            selectedNodeId={selectedNodeId}
            onSelectNode={(nodeId) => setSelectedNodeId(nodeId)}
            onOpenInspector={handleOpenInspector}
            onExecuteStep={() => executeOrchestrationStep(task.id)}
            onApproveNode={(nodeId) => approveOrchestrationNode(task.id, nodeId)}
            isDark={isDark}
          />
        </div>
      )}

      {/* SUB TAB 2: Inter-Agent Protocol Bus Message Log */}
      {activeSubTab === 'messages' && (
        <div
          id="inter-agent-bus-panel"
          className={`p-5 rounded-3xl border backdrop-blur-xl ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquareCode className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-sm text-slate-100">
                {isZh ? 'Inter-Agent 协议消息传输总线' : 'Inter-Agent Protocol Bus Messages'}
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              {orchestration.interAgentMessages?.length || 0} {isZh ? '条协议握手记录' : 'protocol handoffs'}
            </span>
          </div>

          {(!orchestration.interAgentMessages || orchestration.interAgentMessages.length === 0) ? (
            <div className="text-center py-12 text-slate-500">
              <MessageSquareCode className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-xs">{isZh ? '暂无阶段间通信消息' : 'No inter-agent messages recorded yet'}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orchestration.interAgentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-cyan-400 text-xs">{msg.fromAgentName}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-semibold text-purple-400 text-xs">{msg.toAgentName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700">
                        {msg.messageType}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{msg.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    {msg.payloadSummary}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB TAB 3: Shared Memory Pool */}
      {activeSubTab === 'context' && (
        <div
          id="shared-memory-pool-panel"
          className={`p-5 rounded-3xl border backdrop-blur-xl ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-sm text-slate-100">
                {isZh ? '全局共享上下文状态池 (Shared Memory Pool)' : 'Global Shared Context State Pool'}
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              {orchestration.sharedContextPool?.length || 0} {isZh ? '个持久化键值' : 'persisted keys'}
            </span>
          </div>

          {(!orchestration.sharedContextPool || orchestration.sharedContextPool.length === 0) ? (
            <div className="text-center py-12 text-slate-500">
              <Database className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-xs">{isZh ? '上下文状态池为空' : 'Context pool is empty'}</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {orchestration.sharedContextPool.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border font-mono text-xs ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 text-[11px] text-slate-400">
                    <span className="font-bold text-cyan-400 font-sans truncate max-w-[180px]">
                      {item.key}
                    </span>
                    <span>{item.timestamp}</span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950/80 text-emerald-400 break-all border border-slate-800 text-[11px]">
                    {item.value}
                  </div>

                  <div className="mt-2 text-[10px] text-slate-500 text-right">
                    Updated by: <span className="text-slate-300 font-sans">{item.updatedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Node Inspector Drawer */}
      <NodeInspectorDrawer
        node={selectedNode}
        taskId={task.id}
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        onDeleteNode={(nodeId) => removeOrchestrationNode(task.id, nodeId)}
        onDuplicateNode={(nodeId) => duplicateNode(task.id, nodeId)}
        onExecuteStep={() => executeOrchestrationStep(task.id)}
        onApproveNode={(nodeId) => approveOrchestrationNode(task.id, nodeId)}
        isDark={isDark}
      />

      {/* DAG Presets & Export/Import Modal */}
      <DagTemplatesModal
        taskId={task.id}
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        isDark={isDark}
      />
    </div>
  );
};
