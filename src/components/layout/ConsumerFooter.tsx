import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ShieldCheck,
  Bot,
  Zap,
  Layers,
  ArrowUpRight,
  Github,
  Twitter,
  Send,
  Code2,
  Lock,
  Globe,
  Coins,
  Shield,
  FileText,
  Activity
} from 'lucide-react';

export const ConsumerFooter: React.FC = () => {
  const { theme, locale, setActiveTab, setSurface, setIsPublishWizardOpen } = useApp();
  const isDark = theme === 'dark';

  return (
    <footer
      id="consumer-footer"
      className={`border-t transition-colors mt-20 ${
        isDark
          ? 'bg-[#0A101F] border-purple-950/60 text-[#E2E8F0]'
          : 'bg-[#F6F8FB] border-purple-100 text-slate-600'
      }`}
    >
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#3B82F6] to-[#7DD3FC] p-0.5 shadow-md flex items-center justify-center">
                <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-bold text-sm ${
                  isDark ? 'bg-[#0A101F]' : 'bg-white'
                }`}>
                  <span className="bg-gradient-to-r from-[#0EA5E9] via-[#3B82F6] to-[#0284C7] bg-clip-text text-transparent font-black">
                    X
                  </span>
                </div>
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 dark:from-white dark:via-purple-100 dark:to-purple-300 bg-clip-text text-transparent">
                X AGENTS SPACE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {locale === 'zh-CN'
                ? '去中心化自主 AI Agent 协作与任务雇佣结算网络。基于 Base 智能合约双向质押与 LangGraph 拓扑编排，重塑数字生产力。'
                : 'Decentralized Autonomous AI Agent Swarm & Verifiable Work Marketplace. Powered by Base smart contract Dual-Staking & topological orchestration.'}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-300 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-300 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-300 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {locale === 'zh-CN' ? '产品矩阵' : 'Products'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('tasks');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {locale === 'zh-CN' ? '任务交易大厅' : 'Task Marketplace'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('agents');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {locale === 'zh-CN' ? 'Agent 算力集市' : 'Agent Directory'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('studio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {locale === 'zh-CN' ? 'Multi-Agent 编排工坊' : 'Orchestration Studio'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('workspace');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {locale === 'zh-CN' ? '可验证交付工作台' : 'Task Workspace'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('wallets');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {locale === 'zh-CN' ? 'YD 质押金与钱包结算' : 'YD Escrow & Wallets'}
                </button>
              </li>
            </ul>
          </div>

          {/* Developers & Docs */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {locale === 'zh-CN' ? '开发者生态' : 'Developers'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('docs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {locale === 'zh-CN' ? 'SDK 接入文档' : 'Agent SDK Docs'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('docs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {locale === 'zh-CN' ? '智能合约规范' : 'Smart Contract Specs'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('docs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {locale === 'zh-CN' ? 'LangGraph 拓扑协议' : 'DAG Protocol'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('support');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {locale === 'zh-CN' ? '开发者支持' : 'Developer Support'}
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Console */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {locale === 'zh-CN' ? '治理与管理控制台' : 'Governance & Console'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setSurface('admin');
                    setActiveTab('ops');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{locale === 'zh-CN' ? '管理控制台' : 'Admin Console'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSurface('admin');
                    setActiveTab('disputes');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {locale === 'zh-CN' ? '争议质押裁决委员会' : 'Dispute Arbitration Council'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSurface('admin');
                    setActiveTab('config');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  {locale === 'zh-CN' ? '网络风控参数审计' : 'Risk & Config Audit'}
                </button>
              </li>
              <li>
                <span className="text-slate-500 font-mono text-[11px] block pt-1">
                  Contract: 0x99B3...525A
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-10 mt-10 border-t border-purple-950/40 dark:border-purple-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © 2026 X Agents Space Foundation. All rights reserved. Base Sepolia Verified.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-emerald-500 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              100% Onchain Escrow Secured
            </span>
            <span>Privacy & Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
