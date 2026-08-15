import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  OrchestrationNode,
  OrchestrationEdge,
  OrchestrationNodeType,
  TaskOrchestration
} from '../../types';
import {
  Bot,
  GitFork,
  ShieldCheck,
  Cpu,
  Scale,
  FolderArchive,
  Play,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Sparkles,
  Sliders,
  Copy,
  Trash2,
  X,
  Link2,
  Move,
  Lock,
  Unlock,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';

interface NodeGraphCanvasProps {
  taskId: string;
  orchestration: TaskOrchestration;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string | null) => void;
  onOpenInspector: (nodeId: string) => void;
  onExecuteStep: () => void;
  onApproveNode: (nodeId: string) => void;
  isDark: boolean;
}

export const NodeGraphCanvas: React.FC<NodeGraphCanvasProps> = ({
  taskId,
  orchestration,
  selectedNodeId,
  onSelectNode,
  onOpenInspector,
  onExecuteStep,
  onApproveNode,
  isDark
}) => {
  const {
    updateNodePosition,
    addOrchestrationEdge,
    removeOrchestrationEdge,
    autoLayoutNodes,
    duplicateNode,
    removeOrchestrationNode,
    locale,
    t,
    showToast
  } = useApp();

  const isZh = locale === 'zh-CN';
  const containerRef = useRef<HTMLDivElement>(null);

  // Canvas pan and zoom transform
  const [pan, setPan] = useState({ x: 40, y: 30 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Dragging node state
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Dragging wire connection state
  const [connectingSourceNodeId, setConnectingSourceNodeId] = useState<string | null>(null);
  const [wireMousePos, setWireMousePos] = useState<{ x: number; y: number } | null>(null);

  const nodes = orchestration.nodes || [];

  // Derive edges from dependencies if orchestration.edges is empty
  const edges: OrchestrationEdge[] = React.useMemo(() => {
    if (orchestration.edges && orchestration.edges.length > 0) {
      return orchestration.edges;
    }
    const derived: OrchestrationEdge[] = [];
    nodes.forEach((node) => {
      (node.dependencies || []).forEach((depId) => {
        derived.push({
          id: `edge-${depId}-${node.id}`,
          sourceNodeId: depId,
          targetNodeId: node.id,
          status: node.status === 'completed' ? 'completed' : node.status === 'running' ? 'active' : 'idle',
          animated: node.status === 'running'
        });
      });
    });
    return derived;
  }, [orchestration.edges, nodes]);

  // Handle Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(1.6, prev + 0.15));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.4, prev - 0.15));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 40, y: 30 });
  };

  const handleFitView = () => {
    if (!nodes.length) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    nodes.forEach((n, idx) => {
      const x = n.position?.x ?? (60 + (idx % 3) * 360);
      const y = n.position?.y ?? (80 + Math.floor(idx / 3) * 260);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + 300);
      maxY = Math.max(maxY, y + 200);
    });
    setPan({ x: Math.max(20, 60 - minX), y: Math.max(20, 60 - minY) });
    setZoom(0.9);
  };

  // Node position helper (defaults fallback if no position)
  const getNodePos = (node: OrchestrationNode, index: number) => {
    if (node.position && typeof node.position.x === 'number') {
      return node.position;
    }
    const col = index % 3;
    const row = Math.floor(index / 3);
    return {
      x: 60 + col * 360,
      y: 80 + row * 260 + (col % 2 === 1 ? 30 : 0)
    };
  };

  // Canvas Mouse Down (Panning)
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // Only pan if clicking direct canvas background
    if ((e.target as HTMLElement).closest('.dag-node-card') || (e.target as HTMLElement).closest('.port-handle')) {
      return;
    }
    setIsPanning(true);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  // Mouse Move (Handles node dragging, canvas panning, and cable pulling)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
      return;
    }

    if (draggingNodeId) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const canvasX = (e.clientX - rect.left - pan.x) / zoom;
      const canvasY = (e.clientY - rect.top - pan.y) / zoom;

      updateNodePosition(taskId, draggingNodeId, {
        x: Math.round(canvasX - dragOffset.x),
        y: Math.round(canvasY - dragOffset.y)
      });
      return;
    }

    if (connectingSourceNodeId) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const canvasX = (e.clientX - rect.left - pan.x) / zoom;
      const canvasY = (e.clientY - rect.top - pan.y) / zoom;
      setWireMousePos({ x: canvasX, y: canvasY });
    }
  };

  // Mouse Up
  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
    setConnectingSourceNodeId(null);
    setWireMousePos(null);
  };

  // Start Node Dragging
  const handleNodeMouseDown = (e: React.MouseEvent, node: OrchestrationNode, index: number) => {
    e.stopPropagation();
    onSelectNode(node.id);

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentPos = getNodePos(node, index);
    const canvasMouseX = (e.clientX - rect.left - pan.x) / zoom;
    const canvasMouseY = (e.clientY - rect.top - pan.y) / zoom;

    setDragOffset({
      x: canvasMouseX - currentPos.x,
      y: canvasMouseY - currentPos.y
    });
    setDraggingNodeId(node.id);
  };

  // Start Connection Wire Dragging from Output Port
  const handleOutputPortMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setConnectingSourceNodeId(nodeId);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const canvasX = (e.clientX - rect.left - pan.x) / zoom;
    const canvasY = (e.clientY - rect.top - pan.y) / zoom;
    setWireMousePos({ x: canvasX, y: canvasY });
  };

  // Release Wire on Input Port to Complete Edge
  const handleInputPortMouseUp = (e: React.MouseEvent, targetNodeId: string) => {
    e.stopPropagation();
    if (connectingSourceNodeId && connectingSourceNodeId !== targetNodeId) {
      addOrchestrationEdge(taskId, {
        id: `edge-${connectingSourceNodeId}-${targetNodeId}`,
        sourceNodeId: connectingSourceNodeId,
        targetNodeId: targetNodeId,
        status: 'idle',
        animated: false
      });
    }
    setConnectingSourceNodeId(null);
    setWireMousePos(null);
  };

  // Get Node Icon & Color Badge
  const getNodeTypeMeta = (type?: OrchestrationNodeType) => {
    switch (type) {
      case 'llm_router':
        return {
          label: isZh ? '内容意图路由' : 'Content Router',
          icon: <GitFork className="w-3.5 h-3.5 text-purple-400" />,
          accent: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
          gradient: 'from-purple-500/20 to-indigo-500/10'
        };
      case 'hitl_gate':
        return {
          label: isZh ? '人机审批门禁' : 'HITL Gate',
          icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />,
          accent: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
          gradient: 'from-amber-500/20 to-orange-500/10'
        };
      case 'tool_sandbox':
        return {
          label: isZh ? '创作工具执行器' : 'Creative Tools',
          icon: <Cpu className="w-3.5 h-3.5 text-emerald-400" />,
          accent: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
          gradient: 'from-emerald-500/20 to-teal-500/10'
        };
      case 'consensus_judge':
        return {
          label: isZh ? '内容质量评审' : 'Quality Judge',
          icon: <Scale className="w-3.5 h-3.5 text-blue-400" />,
          accent: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
          gradient: 'from-blue-500/20 to-cyan-500/10'
        };
      case 'aggregator':
        return {
          label: isZh ? '成果打包结算' : 'Asset Bundler',
          icon: <FolderArchive className="w-3.5 h-3.5 text-amber-400" />,
          accent: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
          gradient: 'from-amber-500/20 to-yellow-500/10'
        };
      case 'agent_worker':
      default:
        return {
          label: isZh ? '内容创作 Agent' : 'Content Agent',
          icon: <Bot className="w-3.5 h-3.5 text-cyan-400" />,
          accent: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
          gradient: 'from-cyan-500/20 to-blue-500/10'
        };
    }
  };

  const CARD_WIDTH = 310;
  const CARD_HEIGHT = 190;

  return (
    <div
      id="dify-node-graph-canvas-container"
      ref={containerRef}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative w-full h-[620px] rounded-2xl border overflow-hidden select-none cursor-grab active:cursor-grabbing transition-colors ${
        isDark
          ? 'bg-[#0b101b] border-slate-800 shadow-2xl'
          : 'bg-[#f8fafc] border-slate-200 shadow-inner'
      }`}
      style={{
        backgroundImage: isDark
          ? 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 1px, transparent 1px)'
          : 'radial-gradient(circle, rgba(148, 163, 184, 0.25) 1px, transparent 1px)',
        backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
        backgroundPosition: `${pan.x}px ${pan.y}px`
      }}
    >
      {/* Floating Canvas Toolbar Controls */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1.5 rounded-xl border backdrop-blur-md shadow-lg bg-slate-900/80 border-slate-800 text-slate-200">
        <button
          id="btn-canvas-zoom-in"
          onClick={handleZoomIn}
          title={t('canvas_zoom_in')}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          id="btn-canvas-zoom-out"
          onClick={handleZoomOut}
          title={t('canvas_zoom_out')}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-[11px] font-mono font-semibold px-1 text-slate-400">
          {Math.round(zoom * 100)}%
        </span>
        <div className="w-px h-4 bg-slate-700 mx-0.5" />
        <button
          id="btn-canvas-reset-view"
          onClick={handleResetView}
          title={t('canvas_reset_view')}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          id="btn-canvas-fit-view"
          onClick={handleFitView}
          title={t('canvas_fit_view')}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-slate-700 mx-0.5" />
        <button
          id="btn-canvas-auto-layout"
          onClick={() => autoLayoutNodes(taskId)}
          className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold flex items-center gap-1 transition-colors"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isZh ? '自动排版' : 'Auto-Layout'}</span>
        </button>
      </div>

      {/* Floating Instructions Banner */}
      <div className="hidden md:flex absolute top-4 right-4 z-20 items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md bg-slate-900/80 border-slate-800 text-slate-400 text-xs shadow-md">
        <Info className="w-3.5 h-3.5 text-cyan-400" />
        <span>{isZh ? '拖拽右侧端口连线 · 点击节点配置参数' : 'Drag output port to connect · Click node to inspect'}</span>
      </div>

      {/* Zoomable & Pannable World Space */}
      <div
        id="canvas-world-space"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          width: '3200px',
          height: '2400px',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        {/* SVG Bezier Wire Connections Layer */}
        <svg
          className="absolute inset-0 pointer-events-none w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="grad-running" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="grad-completed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Render Existing Wires */}
          {edges.map((edge) => {
            const sourceNode = nodes.find((n) => n.id === edge.sourceNodeId);
            const targetNode = nodes.find((n) => n.id === edge.targetNodeId);
            if (!sourceNode || !targetNode) return null;

            const sIndex = nodes.indexOf(sourceNode);
            const tIndex = nodes.indexOf(targetNode);
            const sPos = getNodePos(sourceNode, sIndex);
            const tPos = getNodePos(targetNode, tIndex);

            // Right output handle coordinates of source
            const x1 = sPos.x + CARD_WIDTH;
            const y1 = sPos.y + 90;

            // Left input handle coordinates of target
            const x2 = tPos.x;
            const y2 = tPos.y + 90;

            const dx = Math.max(60, Math.abs(x2 - x1) * 0.5);
            const pathData = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

            const isEdgeActive = targetNode.status === 'running';
            const isEdgeCompleted = targetNode.status === 'completed';

            return (
              <g key={edge.id} className="group pointer-events-auto">
                {/* Background thicker hit target */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={16}
                  className="cursor-pointer"
                  onClick={() => removeOrchestrationEdge(taskId, edge.id)}
                />

                {/* Base wire line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={
                    isEdgeCompleted
                      ? 'url(#grad-completed)'
                      : isEdgeActive
                      ? 'url(#grad-running)'
                      : isDark
                      ? '#334155'
                      : '#cbd5e1'
                  }
                  strokeWidth={isEdgeActive ? 3.5 : 2.5}
                  strokeDasharray={isEdgeActive ? '6,6' : undefined}
                  filter={isEdgeActive ? 'url(#glow-cyan)' : undefined}
                  className={`transition-all duration-300 ${isEdgeActive ? 'animate-pulse' : ''}`}
                />

                {/* Active Flow Particles Animation for Running Nodes */}
                {isEdgeActive && (
                  <circle r="4.5" fill="#38bdf8" filter="url(#glow-cyan)">
                    <animateMotion
                      path={pathData}
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Midpoint Delete Connection Button on Wire */}
                <g
                  transform={`translate(${(x1 + x2) / 2}, ${(y1 + y2) / 2})`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOrchestrationEdge(taskId, edge.id);
                  }}
                >
                  <circle r="11" fill="#ef4444" className="shadow-lg" />
                  <line x1="-4" y1="-4" x2="4" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="4" y1="-4" x2="-4" y2="4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </g>
              </g>
            );
          })}

          {/* Rubber-band Wire when dragging output handle */}
          {connectingSourceNodeId && wireMousePos && (() => {
            const sourceNode = nodes.find((n) => n.id === connectingSourceNodeId);
            if (!sourceNode) return null;
            const sIndex = nodes.indexOf(sourceNode);
            const sPos = getNodePos(sourceNode, sIndex);
            const x1 = sPos.x + CARD_WIDTH;
            const y1 = sPos.y + 90;
            const x2 = wireMousePos.x;
            const y2 = wireMousePos.y;
            const dx = Math.max(50, Math.abs(x2 - x1) * 0.5);
            const pathData = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

            return (
              <path
                d={pathData}
                fill="none"
                stroke="#38bdf8"
                strokeWidth={3}
                strokeDasharray="4,4"
                className="animate-pulse"
              />
            );
          })()}
        </svg>

        {/* Draggable Node Cards on 2D Plane */}
        {nodes.map((node, index) => {
          const pos = getNodePos(node, index);
          const meta = getNodeTypeMeta(node.nodeType);
          const isSelected = selectedNodeId === node.id;
          const isRunning = node.status === 'running';
          const isCompleted = node.status === 'completed';
          const isWaiting = node.status === 'waiting_approval' || (node.requireHumanApproval && !node.approved);

          return (
            <div
              key={node.id}
              id={`dag-node-${node.id}`}
              className={`dag-node-card absolute rounded-2xl border transition-shadow duration-200 backdrop-blur-xl ${
                isSelected
                  ? 'ring-2 ring-cyan-400 shadow-2xl shadow-cyan-500/20 z-30'
                  : 'hover:shadow-xl z-10'
              } ${
                isRunning
                  ? 'border-cyan-500 bg-slate-900/95 ring-1 ring-cyan-400/50'
                  : isCompleted
                  ? 'border-emerald-500/60 bg-slate-900/90'
                  : isWaiting
                  ? 'border-amber-500/60 bg-slate-900/90'
                  : isDark
                  ? 'border-slate-800 bg-slate-900/85 hover:border-slate-700'
                  : 'border-slate-200 bg-white/95 hover:border-slate-300'
              }`}
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                width: `${CARD_WIDTH}px`,
                minHeight: `${CARD_HEIGHT}px`
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(node.id);
              }}
            >
              {/* Left Input Port Handle (Receiver) */}
              <div
                id={`port-in-${node.id}`}
                onMouseUp={(e) => handleInputPortMouseUp(e, node.id)}
                title={isZh ? '输入连接端口 (释放连线)' : 'Input Port (Drop Cable)'}
                className="port-handle absolute -left-3 top-[80px] w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center cursor-crosshair hover:scale-125 transition-transform z-30 shadow-md"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* Right Output Port Handle (Source) */}
              <div
                id={`port-out-${node.id}`}
                onMouseDown={(e) => handleOutputPortMouseDown(e, node.id)}
                title={isZh ? '输出连接端口 (按住拖拽连线)' : 'Output Port (Drag Cable)'}
                className="port-handle absolute -right-3 top-[80px] w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center cursor-crosshair hover:scale-125 transition-transform z-30 shadow-md group"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping" />
              </div>

              {/* Card Header & Drag Handle */}
              <div
                onMouseDown={(e) => handleNodeMouseDown(e, node, index)}
                className={`p-3 rounded-t-2xl border-b flex items-center justify-between cursor-move bg-gradient-to-r ${meta.gradient} ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div className={`p-1.5 rounded-lg border ${meta.accent}`}>
                    {meta.icon}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-100 truncate max-w-[170px]">
                      {node.name}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span>#{node.stageIndex}</span>
                      <span>·</span>
                      <span className="truncate">{node.role}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {isCompleted && (
                    <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400" title="Completed">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {isRunning && (
                    <span className="p-1 rounded-full bg-cyan-500/20 text-cyan-400 animate-pulse" title="Running">
                      <Play className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {isWaiting && (
                    <span className="p-1 rounded-full bg-amber-500/20 text-amber-400" title="Approval Required">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 space-y-2.5 text-xs">
                {/* Assigned Agent Profile Card */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <img
                    src={node.assignedAgentAvatar}
                    alt={node.assignedAgentName}
                    className="w-7 h-7 rounded-lg object-cover border border-slate-700"
                  />
                  <div className="truncate flex-1">
                    <div className="text-[11px] font-semibold text-slate-200 truncate">
                      {node.assignedAgentName}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono">
                      {node.assignedAgentHandle}
                    </div>
                  </div>
                </div>

                {/* Input & Output Artifacts Overview */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-slate-300">{node.inputArtifacts?.length || 0}</span>
                    <span>In</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-slate-300">{node.outputArtifacts?.length || 0}</span>
                    <span>Out</span>
                  </div>
                  <div className="w-px h-3 bg-slate-700 mx-1" />
                  <div className="text-cyan-400 font-mono font-bold">
                    {node.rewardAllocationPct}% YD
                  </div>
                </div>

                {/* Human Approval Signoff Gate Button if pending */}
                {node.requireHumanApproval && !node.approved && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onApproveNode(node.id);
                    }}
                    className="w-full py-1 px-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-[10px] flex items-center justify-center gap-1 transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isZh ? '签署放行此门禁' : 'Sign Human Checkpoint'}</span>
                  </button>
                )}
              </div>

              {/* Quick Action Toolbar on Node Bottom */}
              <div className="px-3 pb-2.5 pt-1 flex items-center justify-between border-t border-slate-800/60 text-slate-400 text-[11px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenInspector(node.id);
                  }}
                  className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{isZh ? '参数配置' : 'Config'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateNode(taskId, node.id);
                    }}
                    title={isZh ? '克隆' : 'Clone'}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(isZh ? '确认删除节点？' : 'Delete node?')) {
                        removeOrchestrationNode(taskId, node.id);
                      }
                    }}
                    title={isZh ? '删除' : 'Delete'}
                    className="p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
