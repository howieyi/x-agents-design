import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';

export const PublishTaskWizardModal: React.FC = () => {
  const {
    t,
    isPublishWizardOpen,
    setIsPublishWizardOpen,
    publishNewTask,
    ydBalance,
    setIsCheckoutOpen,
    theme,
    locale
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cloud & Infrastructure');
  const [description, setDescription] = useState('');
  const [deliverables, setDeliverables] = useState<Array<{ id: string; title: string; description: string; status: 'pending' }>>([
    { id: 'del-1', title: 'Source Code Repository & Architecture Document', description: 'Clean TypeScript/Go implementation with full unit tests and deployment instructions.', status: 'pending' }
  ]);
  const [criteria, setCriteria] = useState<string[]>([
    'Demonstrate 0 compilation/lint warnings and pass all integration test cases',
    'Deploy and verify endpoints on staging testnet with live status checks'
  ]);
  const [tags, setTags] = useState<string>('Go, AWS SAM, SQS, PostgreSQL');
  const [rewardYD, setRewardYD] = useState<number>(1000);
  const [deadlineDays, setDeadlineDays] = useState<number>(7);

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
      title: title || 'Decentralized Microservice Orchestrator',
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
        className={`relative z-10 w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isDark
            ? 'bg-[#0A1424] border-[#243550] text-[#F4F7FB]'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="p-5 border-b flex items-center justify-between border-slate-700/20">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#36E4DA]">
              {t('wizard_title')}
            </span>
            <div className="flex items-center gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all ${
                    s === step
                      ? 'w-8 bg-[#36E4DA]'
                      : s < step
                      ? 'w-4 bg-[#35D07F]'
                      : 'w-4 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsPublishWizardOpen(false)}
            className="p-1.5 rounded-lg border border-slate-700/30 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Step Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* STEP 1: Basics */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block font-semibold mb-1.5 text-slate-300">
                  {t('task_title_label')} *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('task_title_placeholder')}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-[#07111F] border-[#243550] focus:border-[#36E4DA]'
                      : 'bg-slate-50 border-slate-200 focus:border-sky-500'
                  }`}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1.5 text-slate-300">
                  {t('task_category_label')}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs cursor-pointer focus:outline-none ${
                    isDark
                      ? 'bg-[#07111F] border-[#243550] text-slate-200'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                  <option value="Security & Audit">Security & Smart Contract Audit</option>
                  <option value="AI & Data Engineering">AI & Vector Indexing</option>
                  <option value="Zero Knowledge & L2">Zero Knowledge & L2</option>
                  <option value="Web3 Fullstack">Web3 Fullstack & Viem</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1.5 text-slate-300">
                  {t('task_description_label')} *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('task_description_placeholder')}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-[#07111F] border-[#243550] focus:border-[#36E4DA]'
                      : 'bg-slate-50 border-slate-200 focus:border-sky-500'
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
                  <label className="font-semibold text-slate-300">
                    {t('task_deliverables_label')}
                  </label>
                  <button
                    onClick={addDeliverable}
                    className="text-xs text-[#36E4DA] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {t('add_deliverable_btn')}
                  </button>
                </div>

                <div className="space-y-2.5">
                  {deliverables.map((del, i) => (
                    <div
                      key={del.id}
                      className={`p-3 rounded-xl border flex gap-2 items-start ${
                        isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span className="font-mono text-slate-500 font-bold mt-1">#{i + 1}</span>
                      <div className="flex-1 space-y-1.5">
                        <input
                          type="text"
                          value={del.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDeliverables((prev) =>
                              prev.map((d, idx) => (idx === i ? { ...d, title: val } : d))
                            );
                          }}
                          placeholder="Deliverable Title (e.g. AWS SAM template.yaml)"
                          className={`w-full p-2 rounded-lg border text-xs focus:outline-none ${
                            isDark ? 'bg-[#0A1424] border-[#243550]' : 'bg-white border-slate-200'
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
                          className={`w-full p-2 rounded-lg border text-xs focus:outline-none ${
                            isDark ? 'bg-[#0A1424] border-[#243550]' : 'bg-white border-slate-200'
                          }`}
                        />
                      </div>
                      {deliverables.length > 1 && (
                        <button
                          onClick={() => removeDeliverable(i)}
                          className="text-slate-500 hover:text-rose-400 p-1"
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
                  <label className="font-semibold text-slate-300">
                    {t('acceptance_criteria_label')}
                  </label>
                  <button
                    onClick={addCriterion}
                    className="text-xs text-[#36E4DA] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {t('add_criterion_btn')}
                  </button>
                </div>

                <div className="space-y-2">
                  {criteria.map((crit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="font-mono text-slate-500 text-xs">C{i + 1}.</span>
                      <input
                        type="text"
                        value={crit}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCriteria((prev) => prev.map((c, idx) => (idx === i ? val : c)));
                        }}
                        placeholder="Testable acceptance rule..."
                        className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                          isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                      {criteria.length > 1 && (
                        <button
                          onClick={() => removeCriterion(i)}
                          className="text-slate-500 hover:text-rose-400 p-1"
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
                <label className="block font-semibold mb-1.5 text-slate-300">
                  Required Skill & Tool Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. Go, AWS SAM, SQS, PostgreSQL, Docker"
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none ${
                    isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1.5 text-slate-300">
                  {t('deadline_label')} (Days from now)
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={deadlineDays}
                  onChange={(e) => setDeadlineDays(Number(e.target.value))}
                  className={`w-full p-3 rounded-xl border text-xs focus:outline-none ${
                    isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div
                className={`p-4 rounded-xl border text-xs space-y-2 ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="font-semibold text-[#7568FF] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Qdrant Semantic Recall Note
                </span>
                <p className="text-slate-400 leading-relaxed">
                  Upon publishing, this task will be embedded and indexed in Qdrant. Agents with matching toolsets and verified past executions will receive prioritized match scores.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Budget & Stake */}
          {step === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block font-semibold mb-1.5 text-slate-300">
                  {t('reward_yd_label')} *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={100}
                    step={50}
                    value={rewardYD}
                    onChange={(e) => setRewardYD(Number(e.target.value))}
                    className={`w-full p-3 rounded-xl border text-base font-mono font-bold text-[#FFC857] focus:outline-none ${
                      isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                  <span className="absolute right-4 top-3.5 text-xs text-slate-400 font-sans">
                    YD Token
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">{t('agent_stake_preview')}</span>
                  <span className="font-mono font-semibold text-[#35D07F]">{agentStakeYD} YD</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">{t('platform_fee_label')}</span>
                  <span className="font-mono font-semibold text-slate-300">{platformFeeYD} YD</span>
                </div>
                <div className="pt-2 border-t border-slate-700/30 flex justify-between items-center text-sm font-semibold">
                  <span>{t('total_escrow_deposit')}</span>
                  <span className="font-mono font-bold text-base text-[#FFC857]">
                    {totalDepositYD.toLocaleString()} YD
                  </span>
                </div>
              </div>

              {/* Wallet check alert */}
              <div
                className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                  hasSufficientYD
                    ? 'bg-[#35D07F]/10 border-[#35D07F]/30 text-[#35D07F]'
                    : 'bg-[#FF647C]/10 border-[#FF647C]/30 text-[#FF647C]'
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
                    className="underline font-semibold ml-2 cursor-pointer"
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
                className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-[#07111F] border-[#243550]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Title</span>
                  <h4 className="font-semibold text-sm mt-0.5">{title || 'Untitled Technical Task'}</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400">Category:</span>{' '}
                    <span className="font-medium">{category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Deadline:</span>{' '}
                    <span className="font-medium font-mono">{deadlineDays} Days</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Deliverables</span>
                  <p className="text-xs text-slate-300 mt-0.5">{deliverables.length} tangible item(s)</p>
                </div>
                <div className="pt-2 border-t border-slate-700/30 flex justify-between items-center text-sm font-semibold">
                  <span>Escrow Deposit:</span>
                  <span className="font-mono text-[#FFC857] font-bold">
                    {totalDepositYD.toLocaleString()} YD
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#36E4DA]/10 border border-[#36E4DA]/30 text-xs text-[#36E4DA]">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <p className="leading-tight">
                  Funds will be deposited into the Escrow smart contract on Base Sepolia. Funds are released only upon your explicit milestone approval.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-700/20 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                isDark ? 'border-[#243550] hover:bg-[#111F34] text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t('back_step')}
            </button>
          ) : (
            <button
              onClick={() => setIsPublishWizardOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200"
            >
              {t('cancel_btn')}
            </button>
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#36E4DA] text-[#07111F] hover:bg-[#36E4DA]/90 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {t('next_step')}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!hasSufficientYD}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
                hasSufficientYD
                  ? 'bg-[#35D07F] text-[#07111F] hover:bg-[#35D07F]/90 cursor-pointer'
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
