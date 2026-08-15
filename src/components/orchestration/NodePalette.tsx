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
      title: 'Content Agent Worker',
      titleZh: '内容创作 Agent 执行节点',
      description: 'Dispatches content creation to a specialized marketplace Agent (image, video, PPT, doc).',
      descriptionZh: '指派内容生成任务给市场上已验证的专业 Agent，产出图片、视频、PPT、文档等素材。',
      icon: <Bot className="w-4 h-4 text-cyan-400" />,
      color: 'border-cyan-500/40 hover:border-cyan-500 text-cyan-300',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
    },
    {
      type: 'llm_router',
      title: 'Content Intent Router',
      titleZh: '内容意图决策路由',
      description: 'Classifies the brief (image/video/doc/social) and routes to the matching pipeline.',
      descriptionZh: '智能判定素材类型（图片/视频/文档/社媒），动态分发至对应创作分支流水线。',
      icon: <GitFork className="w-4 h-4 text-purple-400" />,
      color: 'border-purple-500/40 hover:border-purple-500 text-purple-300',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
      type: 'hitl_gate',
      title: 'Human Gate (HITL)',
      titleZh: '人机协同审批门禁',
      description: 'Halts workflow until the owner or auditor signs off on the content draft.',
      descriptionZh: '阻断流程执行，等待人工对成稿/样片审核签名后方可继续。',
      icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-500/40 hover:border-amber-500 text-amber-300',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    },
    {
      type: 'tool_sandbox',
      title: 'Creative Tool Runner',
      titleZh: '创作工具执行器',
      description: 'Runs generative engines: image renderers, video chunk generators, voice & doc exporters.',
      descriptionZh: '自动调用 Flux/Midjourney 图像渲染、Runway 视频分片、ElevenLabs 配音与 PPT/Word/Excel 导出引擎。',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500/40 hover:border-emerald-500 text-emerald-300',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      type: 'consensus_judge',
      title: 'Quality Judge',
      titleZh: '内容质量评审节点',
      description: 'Scores drafts against creative acceptance criteria (style, tone, platform fit) with multi-model review.',
      descriptionZh: '根据风格一致性、文案质量与平台规范等验收标准多模型交叉评审，达标后才放行。',
      icon: <Scale className="w-4 h-4 text-blue-400" />,
      color: 'border-blue-500/40 hover:border-blue-500 text-blue-300',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
      type: 'aggregator',
      title: 'Asset Aggregator',
      titleZh: '成果打包与结算',
      description: 'Bundles all content deliverables (video, cards, docs) and triggers Escrow settlement.',
      descriptionZh: '汇聚视频成片、图文卡片、文档报表等全部内容成果并打包交付，触发资金结算。',
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
            <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
              {isZh ? item.descriptionZh : item.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
