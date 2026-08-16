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
  Sparkles,
  Bot
} from 'lucide-react';

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
    '所有图文符合小红书 3:4 比例规范且无平台违禁词',
    '文案包含爆款标题公式、情绪共鸣点与 5 组热点标签'
  ]);
  const [tags, setTags] = useState<string>('小红书图文, 爆款文案, 视觉卡片, 抖音分镜, 微信公众号');
  const [rewardYD, setRewardYD] = useState<number>(1000);
  const [deadlineDays, setDeadlineDays] = useState<number>(7);

  // Prefill category & skills when launched from an Agent card ("用 TA 发单")
  useEffect(() => {
    if (selectedAgentForPublish) {
      setCategory(selectedAgentForPublish.category);
      if (selectedAgentForPublish.tags?.length) {
        setTags(selectedAgentForPublish.tags.join(', '));
      }
      setStep(1);
    }
  }, [selectedAgentForPublish]);

  if (!isPublishWizardOpen) return null;

  const isDark = theme === 'dark';
  const agentStakeYD = Math.round(rewardYD * 0.06); // 6% (600 bps)
  const platformFeeYD = Math.round(rewardYD * 0.02); // 2%
  const totalDepositYD = rewardYD + platformFeeYD;
  const hasSufficientYD = ydBalance >= totalDepositYD;

  const addDeliverable = () => {
    setDeliverables((prev) => [
      ...prev,
      {
        id: `del-${Date.now()}`,
        title: '',
        description: '',
        status: 'pending'
      }
    ]);
  };

  const removeDeliverable = (index: number) => {
    setDeliverables((prev) => prev.filter((_, i) => i !== index));
  };

  const addCriterion = () => {
    setCriteria((prev) => [...prev, '']);
  };

  const removeCriterion = (index: number) => {
    setCriteria((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinish = () => {
    const deadline = new Date(Date.now() + deadlineDays * 86400000).toISOString();
    const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean);

    publishNewTask({
      title: title || '多平台社媒内容素材矩阵生成',
      category,
      description,
      deliverables,
      acceptanceCriteria: criteria.filter(Boolean),
      tags: tagList,
      rewardYD,
      stakeYD: agentStakeYD,
      platformFeeYD,
      deadline
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsPublishWizardOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div
        id="publish-task-modal"
        className={`relative z-10 w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isDark
            ? 'bg-[#101A2E] border-purple-900/40 text-white shadow-purple-950/50'
            : 'bg-white border-purple-100 text-slate-900 shadow-xl'
        }`}
      >
        {/* Modal Header */}
        <div className="p-5 border-b flex items-center justify-between border-purple-500/10 dark:border-purple-900/40">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              {t('wizard_title')}
            </span>
            <div className="flex items-center gap-2 mt-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
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

        {/* Modal Step Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Selected Agent Context Banner */}
          {selectedAgentForPublish && (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl border bg-purple-500/10 dark:bg-purple-950/40 border-purple-500/40">
              <div className="relative shrink-0">
                <img
                  src={selectedAgentForPublish.avatar}
                  alt={selectedAgentForPublish.name}
                  className="w-10 h-10 rounded-xl object-cover border border-purple-500/50"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <Bot className="w-2.5 h-2.5" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{selectedAgentForPublish.name}</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  {locale === 'zh-CN'
                    ? '已预选此 Agent —— 发布后将在匹配结果中优先推荐，可直接指派或加入多 Agent 编排。'
                    : 'Agent preselected — it will be prioritized in matching results, ready to assign or join orchestration.'}
                </p>
              </div>
              <button
                onClick={() => clearSelectedAgentForPublish()}
                className="text-[11px] font-bold text-purple-600 dark:text-purple-300 hover:underline shrink-0 cursor-pointer"
              >
                {locale === 'zh-CN' ? '取消预选' : 'Clear'}
              </button>
            </div>
          )}

          {/* STEP 1: Basics */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  {t('task_title_label')} *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('task_title_placeholder')}
                  className={`w-full p-3 rounded-2xl border text-xs focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-[#0D1526] border-purple-900/50 text-white focus:border-purple-500'
                      : 'bg-purple-50/50 border-purple-100 text-slate-900 focus:border-purple-400'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  {t('task_category_label')}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full p-3 rounded-2xl border text-xs cursor-pointer focus:outline-none ${
                    isDark
                      ? 'bg-[#0D1526] border-purple-900/50 text-white'
                      : 'bg-purple-50/50 border-purple-100 text-slate-900'
                  }`}
                >
                  <option value="视频创作与分片串联">视频创作与分片串联</option>
                  <option value="视觉与图片生成">视觉与图片生成</option>
                  <option value="PPT / 演示文稿生成">PPT / 演示文稿生成</option>
                  <option value="全平台社媒素材矩阵">全平台社媒素材矩阵</option>
                  <option value="Excel / 财务与报表分析">Excel / 财务与报表分析</option>
                  <option value="Word / 文档与 PRD 撰写">Word / 文档与 PRD 撰写</option>
                  <option value="长篇故事与网文小说">长篇故事与网文小说</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  {t('task_description_label')} *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('task_description_placeholder')}
                  className={`w-full p-3 rounded-2xl border text-xs focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-[#0D1526] border-purple-900/50 text-white focus:border-purple-500'
                      : 'bg-purple-50/50 border-purple-100 text-slate-900 focus:border-purple-400'
                  }`}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Deliverables & Acceptance Criteria */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    {t('task_deliverables_label')}
                  </label>
                  <button
                    onClick={addDeliverable}
                    className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {t('add_deliverable_btn')}
                  </button>
                </div>

                <div className="space-y-2.5">
                  {deliverables.map((del, i) => (
                    <div
                      key={del.id}
                      className={`p-3.5 rounded-2xl border flex gap-2 items-start ${
                        isDark ? 'bg-[#0D1526] border-purple-900/40' : 'bg-purple-50/50 border-purple-100'
                      }`}
                    >
                      <span className="font-mono text-purple-500 font-bold mt-2">#{i + 1}</span>
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={del.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDeliverables((prev) =>
                              prev.map((d, idx) => (idx === i ? { ...d, title: val } : d))
                            );
                          }}
                          placeholder={locale === 'zh-CN' ? '交付物标题 (如：小红书 3:4 视觉卡片.zip)' : 'Deliverable Title (e.g. redbook_carousel_cards.zip)'}
                          className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                            isDark ? 'bg-[#101A2E] border-purple-900/50 text-white' : 'bg-white border-purple-100 text-slate-900'
                          }`}
                        />
                        <input
                          type="text"
                          value={del.description}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDeliverables((prev) =>
                              prev.map((d, idx) => (idx === i ? { ...d, description: val } : d))
                            );
                          }}
                          placeholder="Deliverable scope details"
                          className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                            isDark ? 'bg-[#101A2E] border-purple-900/50 text-white' : 'bg-white border-purple-100 text-slate-900'
                          }`}
                        />
                      </div>
                      {deliverables.length > 1 && (
                        <button
                          onClick={() => removeDeliverable(i)}
                          className="text-slate-400 hover:text-rose-500 p-1 mt-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    {t('acceptance_criteria_label')}
                  </label>
                  <button
                    onClick={addCriterion}
                    className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {t('add_criterion_btn')}
                  </button>
                </div>

                <div className="space-y-2">
                  {criteria.map((crit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="font-mono text-purple-500 text-xs font-bold">C{i + 1}.</span>
                      <input
                        type="text"
                        value={crit}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCriteria((prev) => prev.map((c, idx) => (idx === i ? val : c)));
                        }}
                        placeholder="Testable acceptance rule..."
                        className={`w-full p-2.5 rounded-2xl border text-xs focus:outline-none ${
                          isDark ? 'bg-[#0D1526] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'
                        }`}
                      />
                      {criteria.length > 1 && (
                        <button
                          onClick={() => removeCriterion(i)}
                          className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Expertise & Skills */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  {locale === 'zh-CN' ? '所需创作技能与工具标签 (逗号分隔)' : 'Required Skill & Tool Tags (Comma-separated)'}
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder={locale === 'zh-CN' ? '如：小红书图文, 抖音分镜, 微信公众号, 爆款文案' : 'e.g. Xiaohongshu cards, Douyin scripts, WeChat articles, viral copy'}
                  className={`w-full p-3 rounded-2xl border text-xs focus:outline-none ${
                    isDark ? 'bg-[#0D1526] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  {t('deadline_label')} (Days from now)
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={deadlineDays}
                  onChange={(e) => setDeadlineDays(Number(e.target.value))}
                  className={`w-full p-3 rounded-2xl border text-xs focus:outline-none ${
                    isDark ? 'bg-[#0D1526] border-purple-900/50 text-white' : 'bg-purple-50/50 border-purple-100 text-slate-900'
                  }`}
                />
              </div>

              <div
                className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  isDark ? 'bg-[#0D1526] border-purple-900/50' : 'bg-purple-50/50 border-purple-100'
                }`}
              >
                <span className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Qdrant Semantic Recall Note
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Upon publishing, this task will be embedded and indexed in Qdrant. Agents with matching toolsets and verified past executions will receive prioritized match scores.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Budget & Stake */}
          {step === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  {t('reward_yd_label')} *
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
                  <span className="absolute right-4 top-3.5 text-xs text-slate-500 font-sans font-bold">
                    YD Token
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-3xl border space-y-3 ${
                  isDark ? 'bg-[#0D1526] border-purple-900/50' : 'bg-purple-50/50 border-purple-100'
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">{t('agent_stake_preview')}</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{agentStakeYD} YD</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">{t('platform_fee_label')}</span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{platformFeeYD} YD</span>
                </div>
                <div className="pt-2 border-t border-purple-500/15 dark:border-purple-900/40 flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-900 dark:text-white">{t('total_escrow_deposit')}</span>
                  <span className="font-mono font-bold text-base text-amber-600 dark:text-amber-400">
                    {totalDepositYD.toLocaleString()} YD
                  </span>
                </div>
              </div>

              {/* Wallet check alert */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                  hasSufficientYD
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  {hasSufficientYD ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  <span>
                    Current YD Balance: <strong>{ydBalance.toLocaleString()} YD</strong>
                  </span>
                </div>
                {!hasSufficientYD && (
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="underline font-bold ml-2 cursor-pointer"
                  >
                    {t('acquire_yd')}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: Review & Fund Escrow */}
          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div
                className={`p-4 rounded-3xl border space-y-3 ${
                  isDark ? 'bg-[#0D1526] border-purple-900/50' : 'bg-purple-50/50 border-purple-100'
                }`}
              >
                <div>
                  <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 uppercase font-bold">Title</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">{title || (locale === 'zh-CN' ? '未命名内容创作任务' : 'Untitled Content Creation Task')}</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Category:</span>{' '}
                    <span className="font-semibold text-slate-900 dark:text-white">{category}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Deadline:</span>{' '}
                    <span className="font-bold font-mono text-slate-900 dark:text-white">{deadlineDays} Days</span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 uppercase font-bold">Deliverables</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 font-medium">{deliverables.length} tangible item(s)</p>
                </div>
                <div className="pt-2 border-t border-purple-500/15 dark:border-purple-900/40 flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-900 dark:text-white">Escrow Deposit:</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">
                    {totalDepositYD.toLocaleString()} YD
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-700 dark:text-purple-300">
                <ShieldCheck className="w-5 h-5 shrink-0 text-purple-500" />
                <p className="leading-tight">
                  Funds will be deposited into the Escrow smart contract on Base Sepolia. Funds are released only upon your explicit milestone approval.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-purple-500/10 dark:border-purple-900/40 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDark ? 'border-purple-900/50 hover:bg-purple-950/40 text-slate-300' : 'border-purple-100 hover:bg-purple-50 text-slate-700'
              }`}
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

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:from-purple-500 hover:to-indigo-500 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-500/20"
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
