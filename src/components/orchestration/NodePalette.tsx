import React from 'react';
import { useApp } from '../../context/AppContext';
import { OrchestrationNodeType } from '../../types';
import {
  Bot,
  GitFork,
  ShieldCheck,
  Cpu,
  Scale,
  FolderArchive,
  Plus,
  Sparkles,
  Info
} from 'lucide-react';

interface NodePaletteProps {
  onAddNode: (type: OrchestrationNodeType) => void;
  isDark: boolean;
}

export const NodePalette: React.FC<NodePaletteProps> = ({ onAddNode, isDark }) => {
  const { locale } = useApp();
  const isZh = locale === 'zh-CN';

  const nodeTypes: Array<{
    type: OrchestrationNodeType;
    title: string;
    titleZh: string;
    description: string;
    descriptionZh: string;
    icon: React.ReactNode;
    color: string;
    badgeBg: string;
  }> = [
    {
      type: 'agent_worker',
      title: 'Agent Worker',
      titleZh: 'AI Agent 执行节点',
      description: 'Dispatches tasks to specialized marketplace AI Agent with defined prompt & tools.',
      descriptionZh: '指派任务给市场上已验证的专业 Agent，执行核心代码或分析。',
      icon: <Bot className="w-4 h-4 text-cyan-400" />,
      color: 'border-cyan-500/40 hover:border-cyan-500 text-cyan-300',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
    },
    {
      type: 'llm_router',
      title: 'LLM Intent Router',
      titleZh: 'LLM 意图决策路由',
      description: 'Branches workflow dynamically based on input classification or AST output.',
      descriptionZh: '根据前置产出物智能判定分类，动态分发至不同分支流水线。',
      icon: <GitFork className="w-4 h-4 text-purple-400" />,
      color: 'border-purple-500/40 hover:border-purple-500 text-purple-300',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
      type: 'hitl_gate',
      title: 'Human Gate (HITL)',
      titleZh: '人机协同审批门禁',
      description: 'Halts workflow until owner or auditor cryptographically signs approval.',
      descriptionZh: '阻断流程执行，等待人工所有者或审计员数字签名后方可继续。',
      icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-500/40 hover:border-amber-500 text-amber-300',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    },
    {
      type: 'tool_sandbox',
      title: 'Tool & Sandbox Runner',
      titleZh: '工具/沙箱测试器',
      description: 'Executes Foundry fuzzing, Slither AST scanning, or LocalStack emulation.',
      descriptionZh: '自动调用 Slither 静态扫描、Foundry 模糊测试或 Docker 测试。',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500/40 hover:border-emerald-500 text-emerald-300',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      type: 'consensus_judge',
      title: 'Consensus Judge',
      titleZh: '多方共识裁判节点',
      description: 'Evaluates deliverables against acceptance criteria using multi-model scoring.',
      descriptionZh: '根据验收标准多模型交叉打分评判，质量达标后才允许放行。',
      icon: <Scale className="w-4 h-4 text-blue-400" />,
      color: 'border-blue-500/40 hover:border-blue-500 text-blue-300',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
      type: 'aggregator',
      title: 'Escrow Aggregator',
      titleZh: '成果汇总与结算',
      description: 'Aggregates all signed deliverable hashes and triggers Escrow settlement.',
      descriptionZh: '汇聚所有阶段产出物哈希证明，触发智能合约资金阶段释放。',
      icon: <FolderArchive className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-500/40 hover:border-amber-500 text-amber-300',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    }
  ];

  return (
    <div
      id="node-palette-bar"
      className={`p-3 rounded-2xl border backdrop-blur-xl shadow-xl transition-all ${
        isDark
          ? 'bg-slate-900/90 border-slate-800/80 shadow-black/40'
          : 'bg-white/95 border-slate-200 shadow-slate-200/50'
      }`}
    >
      <div className="flex items-center justify-between gap-4 mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {isZh ? 'Dify / n8n 节点库 (点击添加至画布)' : 'Node Palette (Click to Add to Canvas)'}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5" />
          <span>{isZh ? '支持自由拖拽节点及连线' : 'Drag nodes & connect output to input ports'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {nodeTypes.map((item) => (
          <button
            key={item.type}
            id={`btn-add-node-${item.type}`}
            onClick={() => onAddNode(item.type)}
            className={`group relative flex flex-col p-2.5 rounded-xl border text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
              isDark
                ? 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/60'
                : 'bg-slate-50 hover:bg-white border-slate-200 hover:shadow-md'
            } ${item.color}`}
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <div className={`p-1.5 rounded-lg border ${item.badgeBg}`}>
                {item.icon}
              </div>
              <Plus className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="text-xs font-semibold truncate w-full text-slate-200">
              {isZh ? item.titleZh : item.title}
            </div>
            <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
              {isZh ? item.descriptionZh : item.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
