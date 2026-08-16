import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Coins,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Bot
} from 'lucide-react';

/**
 * 发布任务向导 —— C 端精简版（3 步）
 * 1. 描述需求（一句话 + 分类 + 补充说明）
 * 2. 交付与预算（交付物 + 可选验收标准 + 预算/周期 + 费用试算）
 * 3. 确认发布（汇总 + 托管说明）
 * 去掉 C 端不需要的「技能标签」「Qdrant 召回说明」等平台机制，降低发单门槛。
 */
export const PublishTaskWizardModal: React.FC = () => {
  const {
    t,
    isPublishWizardOpen,
    setIsPublishWizardOpen,
    publishNewTask,
    ydBalance,
    setIsCheckoutOpen,
    selectedAgentForPublish,
    clearSelectedAgentForPublish,
    theme,
    locale
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('全平台社媒素材矩阵');
  const [description, setDescription] = useState('');
  const [deliverables, setDeliverables] = useState<Array<{ id: string; title: string; description: string; status: 'pending' }>>([
    { id: 'del-1', title: '小红书 3:4 视觉卡片套图与爆款种草文案', description: '8 张高保真视觉卡片、封面排版与 3 套情绪共鸣种草文案及热门标签矩阵。', status: 'pending' }
  ]);
  const [criteria, setCriteria] = useState<string[]>([
    '所有图文符合小红书 3:4 比例规范且无平台违禁词'
  ]);
  const [showCriteria, setShowCriteria] = useState<boolean>(false);
  const [rewardYD, setRewardYD] = useState<number>(1000);
  const [deadlineDays, setDeadlineDays] = useState<number>(7);

  // 预选 Agent 时带出分类
  useEffect(() => {
    if (selectedAgentForPublish) {
      setCategory(selectedAgentForPublish.category);
      setStep(1);
    }
  }, [selectedAgentForPublish]);

  if (!isPublishWizardOpen) return null;

  const isDark = theme === 'dark';
  const [stakeEnabled, setStakeEnabled] = useState<boolean>(true);
  const agentStakeYD = Math.round(rewardYD * 0.06); // 消费者质押金 6%
  const platformFeeYD = Math.round(rewardYD * 0.02); // 2%（质押后降为 1%）
  const platformFeeEffective = stakeEnabled ? Math.round(rewardYD * 0.01) : platformFeeYD; // 质押权益：费率减半
  const totalDepositYD = rewardYD + platformFeeEffective + (stakeEnabled ? agentStakeYD : 0);
  const hasSufficientYD = ydBalance >= totalDepositYD;

  const addDeliverable = () => {
    setDeliverables((prev) => [...prev, { id: `del-${Date.now()}`, title: '', description: '', status: 'pending' }]);
  };
  const removeDeliverable = (index: number) => {
    setDeliverables((prev) => prev.filter((_, i) => i !== index));
  };
  const addCriterion = () => setCriteria((prev) => [...prev, '']);
  const removeCriterion = (index: number) => setCriteria((prev) => prev.filter((_, i) => i !== index));

  const handleFinish = () => {
    const deadline = new Date(Date.now() + deadlineDays * 86400000).toISOString();
    const tagMap: Record<string, string[]> = {
      '视频创作与分片串联': ['短视频', '视频分片', '配音', '剪辑'],
      '视觉与图片生成': ['4K 海报', '插画', '角色一致性'],
      'PPT / 演示文稿生成': ['商业计划书', '数据可视化', 'PPTX'],
      '全平台社媒素材矩阵': ['小红书图文', '抖音分镜', '微信公众号', '爆款文案'],
      'Excel / 财务与报表分析': ['财务建模', '数据透视', 'BI 报表'],
      'Word / 文档与 PRD 撰写': ['白皮书', 'PRD', '调研报告'],
      '长篇故事与网文小说': ['世界观', '连载', '角色一致性']
    };

    publishNewTask({
      title: title || '多平台社媒内容素材矩阵生成',
      category,
      description,
      deliverables,
      acceptanceCriteria: criteria.filter(Boolean),
      tags: tagMap[category] || ['内容创作'],
      rewardYD,
      stakeYD: stakeEnabled ? agentStakeYD : 0,
      platformFeeYD: platformFeeEffective,
      deadline
    });
  };

  const inputCls = `w-full p-3 rounded-2xl border text-sm focus:outline-none transition-colors ${
    isDark ? 'bg-[#0D1526] border-purple-900/50 text-white focus:border-purple-500 placeholder:text-slate-500' : 'bg-purple-50/50 border-purple-100 text-slate-900 focus:border-purple-400'
  }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={() => setIsPublishWizardOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity" />

      <div
        id="publish-task-modal"
        className={`relative z-10 w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isDark ? 'bg-[#101A2E] border-purple-900/40 text-white shadow-purple-950/50' : 'bg-white border-purple-100 text-slate-900 shadow-xl'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between border-purple-500/10 dark:border-purple-900/40">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              {t('wizard_title')}
            </span>
            <div className="flex items-center gap-2 mt-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all ${
                    s === step
                      ? 'w-8 bg-gradient-to-r from-[#2563EB] to-[#06B6D4]'
                      : s < step
                      ? 'w-4 bg-emerald-500'
                      : isDark
                      ? 'w-4 bg-purple-950/60'
                      : 'w-4 bg-purple-100'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsPublishWizardOpen(false)}
            className="p-1.5 rounded-xl border border-purple-500/20 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Selected Agent Banner */}
          {selectedAgentForPublish && (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl border bg-purple-500/10 dark:bg-purple-950/40 border-purple-500/40">
              <img
                src={selectedAgentForPublish.avatar}
                alt={selectedAgentForPublish.name}
                className="w-10 h-10 rounded-xl object-cover border border-purple-500/50"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{selectedAgentForPublish.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {locale === 'zh-CN' ? '已预选此 Agent，发布后将优先推荐' : 'Agent preselected — prioritized in matching'}
                </p>
              </div>
              <button
                onClick={() => clearSelectedAgentForPublish()}
                className="text-[11px] font-bold text-purple-600 dark:text-purple-300 hover:underline shrink-0 cursor-pointer"
              >
                {locale === 'zh-CN' ? '取消' : 'Clear'}
              </button>
            </div>
          )}

          {/* STEP 1: 描述需求 */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  {locale === 'zh-CN' ? '一句话说清需求' : 'Describe your need'} *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={locale === 'zh-CN' ? '如：为一款新中式茶饮做小红书爆款图文 + 抖音分镜' : 'e.g. Xiaohongshu cards + Douyin script for a new tea brand'}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  {locale === 'zh-CN' ? '内容类型' : 'Content Type'}
                </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputCls} cursor-pointer`}>
                  <option value="视频创作与分片串联">🎬 视频创作与分片串联</option>
                  <option value="视觉与图片生成">🖼️ 视觉与图片生成</option>
                  <option value="PPT / 演示文稿生成">📊 PPT / 演示文稿生成</option>
                  <option value="全平台社媒素材矩阵">📱 全平台社媒素材矩阵</option>
                  <option value="Excel / 财务与报表分析">📈 Excel / 报表分析</option>
                  <option value="Word / 文档与 PRD 撰写">📄 Word / 文档撰写</option>
                  <option value="长篇故事与网文小说">📚 长篇小说创作</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  {locale === 'zh-CN' ? '补充说明（可选）' : 'Extra details (optional)'}
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={locale === 'zh-CN' ? '补充风格偏好、参考、目标受众等，越具体越好…' : 'Style, references, audience — the more specific, the better…'}
                  className={inputCls}
                />
              </div>
            </div>
          )}

          {/* STEP 2: 交付与预算 */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              {/* 预算 */}
              <div>
                <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  {locale === 'zh-CN' ? '预算（YD）' : 'Budget (YD)'} *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={100}
                    step={50}
                    value={rewardYD}
                    onChange={(e) => setRewardYD(Number(e.target.value))}
                    className={`w-full p-3 rounded-2xl border text-base font-mono font-bold text-amber-600 dark:text-amber-400 focus:outline-none ${
                      isDark ? 'bg-[#0D1526] border-purple-900/50' : 'bg-purple-50/50 border-purple-100'
                    }`}
                  />
                  <span className="absolute right-4 top-3.5 text-xs text-slate-500 font-bold">YD</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <label className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{locale === 'zh-CN' ? '交付周期' : 'Deadline'}</label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={deadlineDays}
                    onChange={(e) => setDeadlineDays(Number(e.target.value))}
                    className={`w-24 p-2 rounded-xl border text-xs text-center ${
                      isDark ? 'bg-[#0D1526] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'
                    }`}
                  />
                  <span className="text-xs text-slate-500 dark:text-slate-400">{locale === 'zh-CN' ? '天' : 'days'}</span>
                </div>
              </div>

              {/* 费用与质押权益 */}
              <div className={`p-4 rounded-2xl border text-xs space-y-2 ${isDark ? 'bg-[#0D1526] border-purple-900/50' : 'bg-purple-50/50 border-purple-100'}`}>
                {/* 质押解锁权益 */}
                <div className={`flex items-center justify-between gap-2 p-2.5 rounded-xl border ${stakeEnabled ? 'border-emerald-500/40 bg-emerald-500/5' : isDark ? 'border-purple-900/40' : 'border-purple-100'}`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={stakeEnabled}
                      onChange={(e) => setStakeEnabled(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500 cursor-pointer"
                    />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {locale === 'zh-CN' ? `质押 ${agentStakeYD} YD 解锁权益` : `Stake ${agentStakeYD} YD to unlock perks`}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {locale === 'zh-CN' ? '平台费率减半 (2%→1%) · 优先执行 · 专属客服' : 'Half platform fee (2%→1%) · Priority execution · Dedicated support'}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${stakeEnabled ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' : 'bg-slate-500/10 text-slate-400 border-slate-500/30'}`}>
                    {stakeEnabled ? (locale === 'zh-CN' ? '权益已解锁' : 'Unlocked') : (locale === 'zh-CN' ? '未质押' : 'Not staked')}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>{locale === 'zh-CN' ? `平台服务费 ${stakeEnabled ? '(1%)' : '(2%)'}` : `Platform fee ${stakeEnabled ? '(1%)' : '(2%)'}`}</span>
                  <span className="font-mono font-bold">{platformFeeEffective} YD</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>{locale === 'zh-CN' ? '质押金（结算后返还/累计权益）' : 'Stake (returned / accumulates)'}</span>
                  <span className="font-mono font-bold text-emerald-500">{stakeEnabled ? `${agentStakeYD} YD` : '—'}</span>
                </div>
                <div className="pt-2 border-t border-purple-500/15 dark:border-purple-900/40 flex justify-between font-bold">
                  <span>{locale === 'zh-CN' ? '合计支付' : 'Total payment'}</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">{totalDepositYD.toLocaleString()} YD</span>
                </div>
                <div className={`flex items-center justify-between pt-1 ${hasSufficientYD ? 'text-emerald-500' : 'text-rose-500'}`}>
                  <span className="text-[11px]">
                    {hasSufficientYD ? (
                      <><CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />{locale === 'zh-CN' ? '余额充足' : 'Balance sufficient'}</>
                    ) : (
                      <><AlertTriangle className="w-3.5 h-3.5 inline mr-1" />{locale === 'zh-CN' ? '余额不足' : 'Insufficient balance'}</>
                    )}
                  </span>
                  {!hasSufficientYD && (
                    <button onClick={() => setIsCheckoutOpen(true)} className="underline font-bold cursor-pointer">
                      {t('acquire_yd')}
                    </button>
                  )}
                </div>
              </div>

              {/* 交付物 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    {locale === 'zh-CN' ? '交付物' : 'Deliverables'}
                  </label>
                  <button onClick={addDeliverable} className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-bold cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />{locale === 'zh-CN' ? '添加' : 'Add'}
                  </button>
                </div>
                <div className="space-y-2.5">
                  {deliverables.map((del, i) => (
                    <div key={del.id} className={`p-3 rounded-2xl border ${isDark ? 'bg-[#0D1526] border-purple-900/40' : 'bg-purple-50/50 border-purple-100'}`}>
                      <input
                        type="text"
                        value={del.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDeliverables((prev) => prev.map((d, idx) => (idx === i ? { ...d, title: val } : d)));
                        }}
                        placeholder={locale === 'zh-CN' ? '要交付什么（如：小红书 3:4 卡片.zip）' : 'What to deliver'}
                        className={`w-full p-2.5 rounded-xl border text-sm focus:outline-none ${isDark ? 'bg-[#101A2E] border-purple-900/50 text-white' : 'bg-white border-purple-100 text-slate-900'}`}
                      />
                      <div className="flex items-center justify-between mt-1.5">
                        <input
                          type="text"
                          value={del.description}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDeliverables((prev) => prev.map((d, idx) => (idx === i ? { ...d, description: val } : d)));
                          }}
                          placeholder={locale === 'zh-CN' ? '补充说明（可选）' : 'Details (optional)'}
                          className={`flex-1 p-2 rounded-xl border text-xs focus:outline-none ${isDark ? 'bg-[#101A2E] border-purple-900/50 text-white' : 'bg-white border-purple-100 text-slate-900'}`}
                        />
                        {deliverables.length > 1 && (
                          <button onClick={() => removeDeliverable(i)} className="ml-2 text-slate-400 hover:text-rose-500 p-1 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 验收标准（折叠，可选） */}
              <div className="rounded-2xl border border-purple-500/20 dark:border-purple-900/40 overflow-hidden">
                <button
                  onClick={() => setShowCriteria(!showCriteria)}
                  className="w-full flex items-center justify-between p-3 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  <span>{locale === 'zh-CN' ? '验收标准（可选）' : 'Acceptance criteria (optional)'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showCriteria ? 'rotate-180' : ''}`} />
                </button>
                {showCriteria && (
                  <div className="p-3 space-y-2 border-t border-purple-500/10 dark:border-purple-900/40">
                    {criteria.map((crit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={crit}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCriteria((prev) => prev.map((c, idx) => (idx === i ? val : c)));
                          }}
                          placeholder={locale === 'zh-CN' ? '验收规则…' : 'Acceptance rule…'}
                          className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${isDark ? 'bg-[#0D1526] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'}`}
                        />
                        {criteria.length > 1 && (
                          <button onClick={() => removeCriterion(i)} className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button onClick={addCriterion} className="text-xs text-purple-600 dark:text-purple-400 hover:underline cursor-pointer flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" />{locale === 'zh-CN' ? '添加规则' : 'Add rule'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: 确认发布 */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#0D1526] border-purple-900/50' : 'bg-purple-50/50 border-purple-100'}`}>
                <div>
                  <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 uppercase font-bold">{locale === 'zh-CN' ? '需求' : 'Request'}</span>
                  <h4 className="font-bold text-sm mt-0.5">{title || (locale === 'zh-CN' ? '未命名内容创作任务' : 'Untitled content task')}</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">{locale === 'zh-CN' ? '类型' : 'Type'}：</span>
                    <span className="font-semibold">{category}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">{locale === 'zh-CN' ? '周期' : 'Deadline'}：</span>
                    <span className="font-bold font-mono">{deadlineDays} {locale === 'zh-CN' ? '天' : 'd'}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 uppercase font-bold">{locale === 'zh-CN' ? '交付物' : 'Deliverables'}</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-medium">{deliverables.length} {locale === 'zh-CN' ? '项' : 'item(s)'}</p>
                </div>
                <div className="pt-2 border-t border-purple-500/15 dark:border-purple-900/40 flex justify-between text-sm font-bold">
                  <span>{locale === 'zh-CN' ? '托管金额' : 'Escrow deposit'}</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">{totalDepositYD.toLocaleString()} YD</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-700 dark:text-purple-300">
                <ShieldCheck className="w-5 h-5 shrink-0 text-purple-500" />
                <p className="leading-tight">
                  {locale === 'zh-CN'
                    ? '资金将托管在智能合约中，交付验收通过后才释放给 Agent。'
                    : 'Funds are escrowed onchain and released to the Agent only after you approve delivery.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-500/10 dark:border-purple-900/40 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-2xl text-xs font-bold border flex items-center gap-1.5 transition-colors cursor-pointer border-purple-100 dark:border-purple-900/50 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-slate-700 dark:text-slate-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t('back_step')}
            </button>
          ) : (
            <button
              onClick={() => setIsPublishWizardOpen(false)}
              className="px-4 py-2 rounded-2xl text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              {t('cancel_btn')}
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-[#4F8EF7] hover:to-[#22D3EE] text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-500/20"
            >
              {t('next_step')}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!hasSufficientYD}
              className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
                hasSufficientYD
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white cursor-pointer shadow-emerald-500/20'
                  : 'bg-slate-600 text-slate-400 cursor-not-allowed opacity-60'
              }`}
            >
              <Coins className="w-4 h-4" />
              {t('fund_and_publish')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
