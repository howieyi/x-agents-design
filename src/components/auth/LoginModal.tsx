import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  Bot,
  Package,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Coins
} from 'lucide-react';

/**
 * LoginModal — 消费者登录（mock）
 * 平台仅供给系统 Agent，C 端用户以「内容消费者」身份进入：
 * 浏览服务 → 下单（一句话需求）→ 质押解锁权益 → 托管付款 → 等待交付。
 */
export const LoginModal: React.FC = () => {
  const {
    isLoginOpen,
    setIsLoginOpen,
    login,
    loginIntent,
    setLoginIntent,
    setIsPublishWizardOpen,
    navigateTo,
    theme,
    locale
  } = useApp();

  const [entering, setEntering] = useState(false);

  if (!isLoginOpen) return null;

  const isDark = theme === 'dark';

  const handleLogin = () => {
    setEntering(true);
    // 平台消费者身份（mock 登录）
    login(['buyer']);
    setIsLoginOpen(false);
    setEntering(false);
    const intent = loginIntent;
    setLoginIntent(null);
    if (intent === 'publish') {
      setIsPublishWizardOpen(true);
    } else {
      navigateTo('overview');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div onClick={() => setIsLoginOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className={`relative z-10 w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden ${
          isDark ? 'bg-[#101A2E] border-purple-900/40 text-white' : 'bg-white border-purple-100 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className={`p-6 pb-5 border-b border-purple-500/10 dark:border-purple-900/40 ${isDark ? 'bg-gradient-to-br from-[#16233C] to-[#101A2E]' : 'bg-gradient-to-br from-purple-50/80 to-white'}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">{locale === 'zh-CN' ? '进入 X Agents Space' : 'Enter X Agents Space'}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {locale === 'zh-CN' ? 'AI 内容创作服务平台' : 'AI content creation service platform'}
                </p>
              </div>
            </div>
            <button onClick={() => setIsLoginOpen(false)} className="p-1.5 rounded-xl border border-purple-500/20 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* 价值主张 */}
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${isDark ? 'bg-[#0D1526] border-purple-900/40' : 'bg-purple-50/40 border-purple-100'}`}>
            <p className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {locale === 'zh-CN' ? '一句话，平台帮你做好内容' : 'One sentence, we make it for you'}
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <Package className="w-3.5 h-3.5 text-purple-500 mt-0.5 shrink-0" />
                {locale === 'zh-CN' ? '平台精选 AI 服务：视频 / 图片 / PPT / 社媒 / 小说，浏览即下单' : 'Curated AI services — video, image, PPT, social, novel. Browse & order.'}
              </li>
              <li className="flex items-start gap-2">
                <Coins className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                {locale === 'zh-CN' ? '质押 YD 解锁权益：更低费率、优先执行、专属服务' : 'Stake YD to unlock lower fees, priority execution & exclusive perks'}
              </li>
              <li className="flex items-start gap-2">
                <Bot className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                {locale === 'zh-CN' ? '资金托管，验收通过才放款' : 'Escrowed onchain — paid only after you approve'}
              </li>
            </ul>
          </div>

          <button
            onClick={handleLogin}
            disabled={entering}
            className="btn-shine w-full py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-[#4F8EF7] hover:to-[#22D3EE] text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 cursor-pointer"
          >
            {entering ? (locale === 'zh-CN' ? '进入中…' : 'Entering…') : (
              <>
                {locale === 'zh-CN' ? '一键登录，开始消费' : 'Log in & Start'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-slate-400">
            {locale === 'zh-CN' ? '原型演示：点击即登录，无需注册' : 'Prototype: one-click login, no signup'}
          </p>
        </div>

        {/* Footer trust note */}
        <div className={`px-6 py-3 border-t border-purple-500/10 dark:border-purple-900/40 flex items-center justify-center gap-1.5 text-[11px] text-slate-500`}>
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          {locale === 'zh-CN' ? '服务由平台托管执行，交付有保障' : 'Executed by the platform — delivery guaranteed'}
        </div>
      </div>
    </div>
  );
};
