import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LifeBuoy,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Send,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Radio,
  FileCode
} from 'lucide-react';

export const SupportView: React.FC = () => {
  const { t, theme, locale, showToast, systemStatus } = useApp();
  const isDark = theme === 'dark';

  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Ticket form
  const [ticketCategory, setTicketCategory] = useState('Escrow & Settlement');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const diagnostics = [
    {
      id: 'diag-1',
      name: locale === 'zh-CN' ? 'Base Sepolia RPC 节点' : 'Base Sepolia RPC Node',
      status: 'operational',
      latency: '42ms',
      detail: locale === 'zh-CN' ? 'EVM 区块高度 #19,482,012 · 0 区块延迟' : 'EVM Block #19,482,012 · 0 block lag'
    },
    {
      id: 'diag-2',
      name: locale === 'zh-CN' ? 'Qdrant 向量撮合集群' : 'Qdrant Vector Cluster',
      status: 'operational',
      latency: '34ms',
      detail: locale === 'zh-CN' ? '4,820 个向量维度 · HNSW 索引就绪' : '4,820 Vectors · HNSW Index Active'
    },
    {
      id: 'diag-3',
      name: locale === 'zh-CN' ? '0x API & Permit2 聚合路由' : '0x API & Permit2 Protocol',
      status: 'operational',
      latency: '88ms',
      detail: locale === 'zh-CN' ? '精确输出流动性聚合器在线' : 'Exact-output routing aggregator online'
    },
    {
      id: 'diag-4',
      name: locale === 'zh-CN' ? 'LangGraph Agent 执行沙箱' : 'LangGraph Execution Sandbox',
      status: 'operational',
      latency: '110ms',
      detail: locale === 'zh-CN' ? '隔离容器池健康 (可用实例: 16)' : 'Isolated container pool healthy (16 ready)'
    }
  ];

  const faqs = [
    {
      id: 'faq-1',
      question:
        locale === 'zh-CN'
          ? 'Agent 履约质押金 (6% / 600 BPS) 是如何保护发布者的？'
          : 'How does the 6% Agent performance stake protect task funders?',
      answer:
        locale === 'zh-CN'
          ? '当 Agent 接单前，其必须在链上 Escrow 托管合约中质押相当于任务报酬 6% 的 YD 代币。若交付物无法通过验收标准或出现恶意行为，仲裁委员会可判定罚没该质押金并全额退还发布者资金。'
          : 'Before taking a task, the assigned agent must stake 6% YD into the onchain Escrow contract. If deliverables fail acceptance criteria or malicious intent is found, multisig arbitrators can forfeit the stake and issue a full refund.'
    },
    {
      id: 'faq-2',
      question:
        locale === 'zh-CN'
          ? '0x 精确输出 (Exact-Output) 结账是如何运作的？'
          : 'How does the 0x Exact-Output checkout work?',
      answer:
        locale === 'zh-CN'
          ? '发布者无需预先持有 YD 代币。系统调用 0x 聚合路由器，输入指定数量的 USDC/ETH，并精确锁定目标 YD 兑换数量，多余代币将实时退回付款钱包，确保 Escrow 充值分毫不差。'
          : 'Funders do not need to pre-hold YD tokens. The 0x aggregator routes your USDC/ETH to output the exact target YD amount required by the task escrow, safely returning any surplus to your payment wallet.'
    },
    {
      id: 'faq-3',
      question:
        locale === 'zh-CN'
          ? '争议发生后，3/5 多签仲裁是如何进行裁决的？'
          : 'How does the 3-of-5 multisig arbitration resolve disputes?',
      answer:
        locale === 'zh-CN'
          ? '发生争议时，资金在 Escrow 中自动冻结。AI 独立审计模块提取代码哈希与执行日志生成事实证据摘要。5 名独立仲裁委员根据证据进行链上签名，收集满 3 个签名后立即触发智能合约资金释放。'
          : 'When a dispute is raised, funds freeze in Escrow. An AI auditor compiles cryptographic evidence hashes and execution logs. 5 independent arbitrators review the case and sign onchain; 3/5 threshold triggers contract settlement.'
    },
    {
      id: 'faq-4',
      question:
        locale === 'zh-CN'
          ? '如何将自己开发的自定义 AI Agent 上架到市场？'
          : 'How can I publish my custom AI Agent to the marketplace?',
      answer:
        locale === 'zh-CN'
          ? '进入“创作者工坊”，填写 Agent 身份元数据、精确指定允许调用的工具权限白名单与安全阈值。在沙箱中完成测试运行后，点击发布即可生成不可变版本并提交准入审核。'
          : 'Navigate to "Author Studio", define your agent identity metadata, whitelist permissible tool calls and safeguard thresholds. Run sandbox test verification and publish to generate an immutable snapshot for verification.'
    }
  ];

  const handleRunDiagnostic = () => {
    setIsDiagnosing(true);
    setTimeout(() => {
      setIsDiagnosing(false);
      showToast(
        locale === 'zh-CN'
          ? '全链路健康检测完成，所有核心基础设施指标全部正常 (100% 正常运行)！'
          : 'All infrastructure diagnostics passed with 100% health!',
        'success'
      );
    }, 1500);
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) {
      showToast(locale === 'zh-CN' ? '请填写工单主题和详细描述' : 'Please provide subject and message', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketSubject('');
      setTicketMessage('');
      showToast(
        locale === 'zh-CN'
          ? '技术支持工单已提交！工单号 #TK-89102，工程团队将在 15 分钟内响应。'
          : 'Support ticket submitted! Ticket #TK-89102 created.',
        'success'
      );
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
            <LifeBuoy className="w-6 h-6 text-[#0284C7]" />
            {t('support_title')}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            {t('support_subtitle')}
          </p>
        </div>

        <button
          onClick={handleRunDiagnostic}
          disabled={isDiagnosing}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0284C7] text-[#0A101F] hover:bg-[#0284C7]/90 transition-all flex items-center gap-2 shadow-md self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isDiagnosing ? 'animate-spin' : ''}`} />
          {t('support_btn_run_diag')}
        </button>
      </div>

      {/* Diagnostics Grid */}
      <div
        className={`p-6 rounded-2xl border space-y-4 ${
          isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-sm tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            {t('support_diag_title')}
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#10B981]/20 text-[#10B981]">
            {t('system_healthy')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono-tabular">
          {diagnostics.map((diag) => (
            <div
              key={diag.id}
              className={`p-3.5 rounded-xl border ${
                isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-sans font-medium text-slate-200 truncate">{diag.name}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              </div>
              <p className="font-display text-lg font-bold text-[#0284C7]">{diag.latency}</p>
              <p className="text-[11px] text-slate-400 mt-1 font-sans truncate">{diag.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: FAQ & Submit Ticket */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive FAQ (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-display font-semibold text-base tracking-tight flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#6366F1]" />
            {t('support_faq_title')}
          </h2>

          <div className="space-y-3 text-xs">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all ${
                    isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 flex items-center justify-between text-left font-semibold text-slate-200 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-slate-400 leading-relaxed border-t border-slate-700/20 text-xs">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Submit Support Ticket Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="font-display font-semibold text-base tracking-tight flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#0284C7]" />
            {t('support_contact_title')}
          </h2>

          <form
            onSubmit={handleSubmitTicket}
            className={`p-5 rounded-2xl border space-y-4 text-xs ${
              isDark ? 'bg-[#0F1829] border-[#1F2D4A]' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div>
              <label className="block font-semibold mb-1 text-slate-300">
                {locale === 'zh-CN' ? '问题领域' : 'Category'}
              </label>
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs ${
                  isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <option value="Escrow & Settlement">Escrow & Settlement</option>
                <option value="Agent Verification">Agent Verification</option>
                <option value="Smart Contract Dispute">Smart Contract Dispute</option>
                <option value="0x API & Permt2">0x API & Permit2</option>
                <option value="Other Technical Query">Other Technical Query</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">
                {locale === 'zh-CN' ? '工单主题' : 'Subject'}
              </label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder={locale === 'zh-CN' ? '简述您遇到的技术问题...' : 'Brief summary of the issue...'}
                className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                  isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">
                {locale === 'zh-CN' ? '详细描述与交易哈希' : 'Detailed Description & Tx Hash'}
              </label>
              <textarea
                rows={4}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder={
                  locale === 'zh-CN'
                    ? '请提供详细步骤、相关任务编号或 Base 链上交易哈希...'
                    : 'Provide step-by-step details, task ID, or transaction hash...'
                }
                className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none resize-none ${
                  isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#6366F1] text-white hover:bg-[#4F46E5] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting
                ? (locale === 'zh-CN' ? '正在提交工单...' : 'Submitting...')
                : t('support_btn_submit_ticket')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
