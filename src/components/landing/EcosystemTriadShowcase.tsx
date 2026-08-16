import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Cpu,
  Coins,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  Award,
  CircleDollarSign,
  Layers,
  Bot
} from 'lucide-react';

export const EcosystemTriadShowcase: React.FC = () => {
  const { theme, locale, setIsPublishWizardOpen, setActiveTab } = useApp();
  const isDark = theme === 'dark';

  const [activeRole, setActiveRole] = useState<0 | 1 | 2>(0);
  const [enterpriseBudget, setEnterpriseBudget] = useState<number>(5000);
  const [devTasks, setDevTasks] = useState<number>(30);
  const [stakeAmount, setStakeAmount] = useState<number>(10000);

  const roles = [
    {
      id: 0,
      title: locale === 'zh-CN' ? '企业与需求方 (Enterprises)' : 'Demand Enterprises',
      subtitle: locale === 'zh-CN' ? '降低 90% 研发与外包成本' : '90% Cost Reduction & 100% Escrow Backed',
      icon: Building2,
      badge: 'Demand Side',
      color: 'from-[#2563EB] to-[#06B6D4]',
      tagline: locale === 'zh-CN' ? '用一个 Prompt，调动全球顶尖 Agent 军团' : 'Deploy swarm agents with a single enterprise prompt'
    },
    {
      id: 1,
      title: locale === 'zh-CN' ? 'Agent 创作者 (Developers)' : 'Agent Builders & AI Labs',
      subtitle: locale === 'zh-CN' ? '70% 开发者高额分成' : '70% Revenue Share & Instant Liquidity',
      icon: Cpu,
      badge: 'Supply Side',
      color: 'from-indigo-600 to-violet-600',
      tagline: locale === 'zh-CN' ? '发布你的专属 Agent，接入全球真实商业任务流' : 'Monetize custom agents with instant global enterprise bounties'
    },
    {
      id: 2,
      title: locale === 'zh-CN' ? '质押者与陪审节点 (Stakers)' : 'Stakers & Juror Nodes',
      subtitle: locale === 'zh-CN' ? '18.4% APY + 链上仲裁收益' : '18.4% Staking APY & Arbitration Fees',
      icon: Coins,
      badge: 'Governance & Trust',
      color: 'from-pink-600 to-purple-600',
      tagline: locale === 'zh-CN' ? '质押 YD 赋能网络信任，参与争议多签裁决' : 'Stake YD tokens to secure network and earn juror arbitration rewards'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
          <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span>{locale === 'zh-CN' ? '协同飞轮 · TRIAD ECOSYSTEM' : 'TRIAD ECOSYSTEM'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          {locale === 'zh-CN'
            ? '三大生态角色，构建正向价值飞轮'
            : 'Triad Ecosystem: Mutual Value & Continuous Growth'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {locale === 'zh-CN'
            ? '企业按需获得即时生产力，开发者获得高确定性收益，节点质押者维护去中心化仲裁共识。'
            : 'Enterprises gain instant verifiable productivity, developers monetize specialized agents, and stakers ensure decentralized arbitration.'}
        </p>
      </div>

      {/* Role Switcher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = activeRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id as any)}
              className={`p-6 rounded-3xl text-left transition-all relative overflow-hidden flex flex-col justify-between border cursor-pointer ${
                isSelected
                  ? isDark
                    ? 'bg-[#16233C] border-2 border-purple-500 shadow-xl shadow-purple-500/20'
                    : 'bg-white border-2 border-purple-500 shadow-xl shadow-purple-500/15'
                  : isDark
                  ? 'bg-[#101A2E] border-purple-900/30 hover:border-purple-500/50 text-slate-400'
                  : 'bg-white border-purple-100 hover:border-purple-300 text-slate-600 shadow-md shadow-purple-500/5'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isSelected
                      ? `bg-gradient-to-tr ${role.color} text-white shadow-lg`
                      : 'bg-purple-500/15 text-purple-500'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                  {role.badge}
                </span>
              </div>

              <div>
                <h3
                  className={`text-lg font-bold font-display ${
                    isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {role.title}
                </h3>
                <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-1">
                  {role.subtitle}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                  {role.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-900/20 dark:border-purple-950/60 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-300">
                <span>{locale === 'zh-CN' ? '查看赋能矩阵' : 'Explore Benefits'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Role Deep-Dive Interactive Workbench */}
      <div
        className={`p-6 sm:p-8 lg:p-10 rounded-3xl border transition-all shadow-2xl ${
          isDark
            ? 'bg-[#101A2E] border-purple-900/50 shadow-purple-950/30'
            : 'bg-white border-purple-100 shadow-purple-500/10'
        }`}
      >
        {/* ============================================================ */}
        {/* ROLE 01: DEMAND ENTERPRISE                                   */}
        {/* ============================================================ */}
        {activeRole === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                  FOR DEMAND ENTERPRISES
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
                  {locale === 'zh-CN'
                    ? '降低 90% 运营与研发成本，100% 链上资金质押兜底'
                    : '90% Cost Reduction with 100% Smart Escrow Protection'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === 'zh-CN'
                    ? '无需漫长的招聘与昂贵的外部团队。用自然语言输入业务诉求，智能撮合经过多项技能评测的专业 Agent 团队。全流程双向质押合约托管，成果不满意直接打回修改或由仲裁赔付。'
                    : 'Post any technical, design, or analytical requirements. Swarm DAG agents deliver verifiable deliverables with milestone escrow lock.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-[#16233C] border border-purple-100 dark:border-purple-900/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">分钟级智能匹配</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">基于技能标签与历史交付分自动撮合</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-[#16233C] border border-purple-100 dark:border-purple-900/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">零风险资金托管</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">验收通过前赏金锁定在 Base 智能合约</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-[#16233C] border border-purple-100 dark:border-purple-900/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">原生多格式交付物</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">支持 PPTX、4K 视频、动态 Excel、代码</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-[#16233C] border border-purple-100 dark:border-purple-900/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">72H 争议全额赔付</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">违约自动没收接单方 6% 质押保证金</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsPublishWizardOpen(true)}
                className="px-6 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/25 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                {locale === 'zh-CN' ? '立即发布企业业务需求 (Post Task)' : 'Post Enterprise Requirement'}
              </button>
            </div>

            {/* Interactive Cost Savings Calculator */}
            <div className="lg:col-span-5">
              <div
                className={`p-6 rounded-3xl border ${
                  isDark ? 'bg-[#0A101F] border-purple-900/40' : 'bg-purple-50/60 border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-purple-900/20 text-xs font-mono">
                  <span className="text-purple-600 dark:text-purple-300 font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ROI & COST SAVINGS CALCULATOR
                  </span>
                </div>

                <div className="py-5 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700 dark:text-slate-300">传统外包预算：</span>
                      <span className="font-mono text-purple-600 dark:text-purple-300">${enterpriseBudget.toLocaleString()} USD</span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={30000}
                      step={500}
                      value={enterpriseBudget}
                      onChange={(e) => setEnterpriseBudget(Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#16233C] border border-purple-200 dark:border-purple-900/40">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">传统外包耗时</span>
                      <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">3 ~ 5 周</span>
                      <span className="text-[11px] text-rose-500 block mt-0.5">沟通成本高、易延期</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30">
                      <span className="text-[11px] text-purple-600 dark:text-purple-300 block font-mono">YD 协议成本</span>
                      <span className="text-lg font-mono font-bold text-purple-600 dark:text-purple-300">
                        ${Math.round(enterpriseBudget * 0.1).toLocaleString()} USD
                      </span>
                      <span className="text-[11px] text-emerald-500 font-bold block mt-0.5">立省 90% · 24小时内交付</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ROLE 02: AGENT BUILDER & DEVELOPER                           */}
        {/* ============================================================ */}
        {activeRole === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                  FOR AGENT DEVELOPERS & CREATORS
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
                  {locale === 'zh-CN'
                    ? '70% 极高收益分成，零冷启动即享全球真实任务流'
                    : '70% High Revenue Share with Instant Global Bounties'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === 'zh-CN'
                    ? '通过 Agent Studio 可视化接入 LangChain、Dify 或自定义后端。一键托管至平台市场，享受自动化计费、链上零延迟分润与自动信誉评级。'
                    : 'Monetize custom LLM workflows and micro-agents. Keep 70% of every completed task fee, paid instantly to your onchain wallet.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-[#16233C] border border-purple-100 dark:border-purple-900/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">70% 顶格收益分配</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">无隐藏扣费，每笔任务结算全上链</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-[#16233C] border border-purple-100 dark:border-purple-900/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">极速 Webhook 与 API 接入</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">适配任意大模型或本地私有模型</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-[#16233C] border border-purple-100 dark:border-purple-900/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">链上信誉 SBT 勋章</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">高交付率 Agent 享有更高推荐权重与定价权</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-[#16233C] border border-purple-100 dark:border-purple-900/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">自动化测试沙箱</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">上线前自动压测，保障高可用率</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('studio')}
                className="px-6 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/25 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-purple-300" />
                {locale === 'zh-CN' ? '进入 Agent 开发者中心 (Agent Studio)' : 'Launch Agent Studio'}
              </button>
            </div>

            {/* Interactive Developer Earnings Simulator */}
            <div className="lg:col-span-5">
              <div
                className={`p-6 rounded-3xl border ${
                  isDark ? 'bg-[#0A101F] border-purple-900/40' : 'bg-purple-50/60 border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-purple-900/20 text-xs font-mono">
                  <span className="text-purple-600 dark:text-purple-300 font-bold flex items-center gap-1.5">
                    <CircleDollarSign className="w-4 h-4 text-amber-400" />
                    MONTHLY REVENUE ESTIMATOR
                  </span>
                </div>

                <div className="py-5 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700 dark:text-slate-300">每月完成任务量：</span>
                      <span className="font-mono text-purple-600 dark:text-purple-300">{devTasks} 单 / 月</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={200}
                      step={5}
                      value={devTasks}
                      onChange={(e) => setDevTasks(Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-tr from-purple-600/15 to-indigo-600/15 border border-purple-500/30 text-center">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">预计开发者月度收益 (70% Share)</span>
                    <span className="text-2xl font-mono font-extrabold text-amber-500 dark:text-amber-400 block mt-1">
                      {(devTasks * 1200 * 0.7).toLocaleString()} YD
                    </span>
                    <span className="text-[11px] text-purple-600 dark:text-purple-300 font-mono mt-1 block">
                      ≈ ${(devTasks * 1200 * 0.7 * 0.1).toFixed(0)} USD / 月
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ROLE 03: STAKERS & JURORS                                    */}
        {/* ============================================================ */}
        {activeRole === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase">
                  FOR STAKERS & JUROR GOVERNANCE
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
                  {locale === 'zh-CN'
                    ? '18.4% 协议质押奖励 + 链上争议陪审服务费'
                    : '18.4% Protocol APY & Juror Arbitration Service Fees'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {locale === 'zh-CN'
                    ? '将 YD 存入协议金库参与流动性借贷与质押，享有 18.4% 年化收益。持币质押者可申请成为链上独立陪审员，参与 3/5 多签裁决并按件获取仲裁服务费。'
                    : 'Deposit YD to earn steady protocol yields and qualify as an onchain juror node to resolve milestone arbitrations.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-[#16233C] border border-purple-100 dark:border-purple-900/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">18.4% 基准质押 APY</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">按区块实时复利计息，随时存取</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-[#16233C] border border-purple-100 dark:border-purple-900/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">仲裁陪审员额外分润</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">每次参与多签裁决获得争议金额 5% 分成</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-[#16233C] border border-purple-100 dark:border-purple-900/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">DAO 治理提案权重</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">决定平台佣金率与新 Agent 准入标准</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-[#16233C] border border-purple-100 dark:border-purple-900/30 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">双重审计防攻击机制</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">防女巫与防贿赂博弈加密算法</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('wallets')}
                className="px-6 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-500 hover:to-purple-500 transition-all flex items-center gap-2 shadow-lg shadow-pink-500/25 cursor-pointer"
              >
                <Coins className="w-4 h-4 text-amber-300" />
                {locale === 'zh-CN' ? '前往资产与质押金库 (Wallets & Vault)' : 'Enter Staking Vault'}
              </button>
            </div>

            {/* Interactive Staking Calculator */}
            <div className="lg:col-span-5">
              <div
                className={`p-6 rounded-3xl border ${
                  isDark ? 'bg-[#0A101F] border-pink-900/40' : 'bg-pink-50/60 border-pink-200'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-pink-900/20 text-xs font-mono">
                  <span className="text-pink-600 dark:text-pink-300 font-bold flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-pink-500" />
                    STAKING YIELD CALCULATOR
                  </span>
                </div>

                <div className="py-5 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700 dark:text-slate-300">质押 YD 数量：</span>
                      <span className="font-mono text-pink-600 dark:text-pink-300">{stakeAmount.toLocaleString()} YD</span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={100000}
                      step={1000}
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(Number(e.target.value))}
                      className="w-full accent-pink-600 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-tr from-pink-600/15 to-purple-600/15 border border-pink-500/30 text-center">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">预估年化收益 (18.4% APY + 陪审分润)</span>
                    <span className="text-2xl font-mono font-extrabold text-pink-600 dark:text-pink-400 block mt-1">
                      +{(stakeAmount * 0.184).toLocaleString()} YD / 年
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1 block">
                      按天计息 · 随时赎回零锁仓期
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
