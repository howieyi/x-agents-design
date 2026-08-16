import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  User,
  Building,
  Mail,
  AtSign,
  FileText,
  Shield,
  Key,
  Bell,
  Check,
  Save,
  RotateCcw,
  Sparkles,
  Github,
  Send,
  Globe,
  Copy,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80'
];

export const UserProfileModal: React.FC = () => {
  const {
    t,
    theme,
    locale,
    userProfile,
    updateUserProfile,
    isProfileModalOpen,
    setIsProfileModalOpen,
    showToast
  } = useApp();

  const isDark = theme === 'dark';

  // Active sub-tab inside the profile maintenance modal
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'api'>('profile');

  // Form states
  const [name, setName] = useState(userProfile.name);
  const [handle, setHandle] = useState(userProfile.handle);
  const [email, setEmail] = useState(userProfile.email);
  const [org, setOrg] = useState(userProfile.org);
  const [bio, setBio] = useState(userProfile.bio);
  const [role, setRole] = useState(userProfile.role);
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [telegram, setTelegram] = useState(userProfile.telegram || '');
  const [github, setGithub] = useState(userProfile.github || '');
  const [twitter, setTwitter] = useState(userProfile.twitter || '');
  const [apiKey, setApiKey] = useState(userProfile.apiKey);
  const [showApiKey, setShowApiKey] = useState(false);

  // Notification triggers
  const [notifyTaskSettled, setNotifyTaskSettled] = useState(userProfile.notificationSettings.emailOnTaskSettled);
  const [notifyDispute, setNotifyDispute] = useState(userProfile.notificationSettings.emailOnDispute);
  const [notifyMilestone, setNotifyMilestone] = useState(userProfile.notificationSettings.browserPushOnMilestone);
  const [notifyTelegram, setNotifyTelegram] = useState(userProfile.notificationSettings.telegramAlerts);

  if (!isProfileModalOpen) return null;

  const handleSave = () => {
    updateUserProfile({
      name: name.trim() || userProfile.name,
      handle: handle.trim().startsWith('@') ? handle.trim() : `@${handle.trim()}`,
      email: email.trim() || userProfile.email,
      org: org.trim() || userProfile.org,
      bio: bio.trim() || userProfile.bio,
      role: role.trim() || userProfile.role,
      avatar,
      telegram,
      github,
      twitter,
      apiKey,
      notificationSettings: {
        emailOnTaskSettled: notifyTaskSettled,
        emailOnDispute: notifyDispute,
        browserPushOnMilestone: notifyMilestone,
        telegramAlerts: notifyTelegram
      }
    });
    setIsProfileModalOpen(false);
  };

  const handleRegenerateKey = () => {
    const randomHex = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    const newKey = `xag_live_${randomHex}_enterprise`;
    setApiKey(newKey);
    showToast(
      locale === 'zh-CN'
        ? '已生成新的 API 开发者密钥，请保存生效！'
        : 'Generated new API Secret Key, remember to save changes!',
      'info'
    );
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    showToast(t('copy_success'), 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        id="user-profile-maintenance-modal"
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all ${
          isDark ? 'bg-[#0F1829] border-[#1F2D4A] text-[#F8FAFC]' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark ? 'border-[#1F2D4A] bg-[#132036]/70' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#6366F1] p-0.5 flex items-center justify-center shadow-md">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isDark ? 'bg-[#0A101F]' : 'bg-white'}`}>
                <User className="w-5 h-5 text-[#0284C7]" />
              </div>
            </div>
            <div>
              <h2 className="font-display font-bold text-lg tracking-tight">
                {t('user_profile_title')}
              </h2>
              <p className="text-xs text-slate-400">
                {t('user_profile_subtitle')}
              </p>
            </div>
          </div>

          <button
            id="btn-close-profile-modal"
            onClick={() => setIsProfileModalOpen(false)}
            className={`p-2 rounded-xl border transition-colors ${
              isDark
                ? 'border-[#1F2D4A] hover:bg-[#152238] text-slate-400 hover:text-white'
                : 'border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-tab Navigation */}
        <div
          className={`px-6 pt-3 flex gap-4 border-b text-xs font-medium ${
            isDark ? 'border-[#1F2D4A] bg-[#0F1829]' : 'border-slate-100 bg-white'
          }`}
        >
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-[#0284C7] text-[#0284C7]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            {locale === 'zh-CN' ? '基本信息与组织' : 'General & Organization'}
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'notifications'
                ? 'border-[#0284C7] text-[#0284C7]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            {locale === 'zh-CN' ? '通知与履约提醒' : 'Alerts & Triggers'}
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`pb-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'api'
                ? 'border-[#0284C7] text-[#0284C7]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            {locale === 'zh-CN' ? 'API 密钥与开发者凭据' : 'API Keys & Secrets'}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {activeTab === 'profile' && (
            <div className="space-y-5">
              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  {locale === 'zh-CN' ? '用户头像与预设' : 'Avatar Selection'}
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={avatar}
                    alt={name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0284C7] shadow-md shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-[11px] text-slate-400 mb-2">
                      {locale === 'zh-CN' ? '选择平台推荐的高清技术预设头像：' : 'Pick a verified profile avatar:'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_AVATARS.map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatar(url)}
                          className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all ${
                            avatar === url ? 'border-[#0284C7] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    {locale === 'zh-CN' ? '操作者姓名' : 'Full Name'}
                  </label>
                  <div className={`flex items-center rounded-xl border px-3 py-2 ${isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'}`}>
                    <User className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full bg-transparent focus:outline-none text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    {locale === 'zh-CN' ? '唯一账号标识 (@Handle)' : 'Username Handle'}
                  </label>
                  <div className={`flex items-center rounded-xl border px-3 py-2 ${isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'}`}>
                    <AtSign className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="@arivera"
                      className="w-full bg-transparent focus:outline-none text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    {locale === 'zh-CN' ? '业务联系邮箱' : 'Contact Email'}
                  </label>
                  <div className={`flex items-center rounded-xl border px-3 py-2 ${isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'}`}>
                    <Mail className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.rivera@nexus-corp.ai"
                      className="w-full bg-transparent focus:outline-none text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    {locale === 'zh-CN' ? '所属企业 / 研发组织' : 'Organization / Enterprise'}
                  </label>
                  <div className={`flex items-center rounded-xl border px-3 py-2 ${isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'}`}>
                    <Building className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="Nexus Autonomous Labs"
                      className="w-full bg-transparent focus:outline-none text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Role & Bio */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  {locale === 'zh-CN' ? '系统角色与权限标识' : 'Role & Permission Level'}
                </label>
                <div className={`flex items-center rounded-xl border px-3 py-2 ${isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'}`}>
                  <Shield className="w-4 h-4 text-[#F59E0B] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Enterprise Administrator"
                    className="w-full bg-transparent focus:outline-none text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  {locale === 'zh-CN' ? '个人简介 / 专精技术栈与业务场景' : 'Bio & Technical Focus'}
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="Lead Architect & Agent Operator. Deploying multi-agent DAG pipelines..."
                  className={`w-full rounded-xl border p-3 focus:outline-none text-xs resize-none ${
                    isDark ? 'bg-[#0A101F] border-[#1F2D4A] focus:border-[#0284C7]' : 'bg-slate-50 border-slate-200 focus:border-sky-500'
                  }`}
                />
              </div>

              {/* Social / Dev Links */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  {locale === 'zh-CN' ? '开发者社区与通讯绑定' : 'Developer & Communication Handles'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`flex items-center rounded-xl border px-3 py-2 ${isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'}`}>
                    <Send className="w-3.5 h-3.5 text-[#0284C7] mr-2" />
                    <input
                      type="text"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      placeholder="Telegram: @alex_nexus"
                      className="w-full bg-transparent focus:outline-none text-xs"
                    />
                  </div>
                  <div className={`flex items-center rounded-xl border px-3 py-2 ${isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'}`}>
                    <Github className="w-3.5 h-3.5 text-slate-300 mr-2" />
                    <input
                      type="text"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="GitHub: username"
                      className="w-full bg-transparent focus:outline-none text-xs"
                    />
                  </div>
                  <div className={`flex items-center rounded-xl border px-3 py-2 ${isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'}`}>
                    <Globe className="w-3.5 h-3.5 text-[#6366F1] mr-2" />
                    <input
                      type="text"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      placeholder="X / Twitter: @handle"
                      className="w-full bg-transparent focus:outline-none text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                {locale === 'zh-CN'
                  ? '配置当智能合约触发结算、质押金变动或出现仲裁争议时的实时告警通道。'
                  : 'Configure real-time triggers for escrow settlements, stake changes, and dispute arbitration.'}
              </p>

              <div className="space-y-3">
                <div
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                    isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <span className="font-semibold text-xs block">
                      {locale === 'zh-CN' ? '任务交付与 Escrow 结算邮件提醒' : 'Task Delivery & Escrow Settlement Email'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {locale === 'zh-CN'
                        ? '当分配的 Agent 提交验收成果并在链上释放 YD 时发送详细汇总。'
                        : 'Receive comprehensive settlement receipt when deliverables are finalized.'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyTaskSettled}
                    onChange={(e) => setNotifyTaskSettled(e.target.checked)}
                    className="w-4 h-4 accent-[#0284C7] rounded cursor-pointer"
                  />
                </div>

                <div
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                    isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <span className="font-semibold text-xs block text-[#EF4444]">
                      {locale === 'zh-CN' ? '仲裁争议与 6% 质押扣除紧急通知' : 'Dispute Arbitration & Stake Slash Emergency Alerts'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {locale === 'zh-CN'
                        ? '当任何由您发起的任务进入争议仲裁或多签仲裁流程时立即发送高优先级告警。'
                        : 'Trigger immediate priority dispatch if any contract enters multisig dispute.'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyDispute}
                    onChange={(e) => setNotifyDispute(e.target.checked)}
                    className="w-4 h-4 accent-[#EF4444] rounded cursor-pointer"
                  />
                </div>

                <div
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                    isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <span className="font-semibold text-xs block">
                      {locale === 'zh-CN' ? 'DAG 编排节点执行状态桌面通知' : 'Browser Push for DAG Orchestration Milestones'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {locale === 'zh-CN'
                        ? '在多 Agent 协同执行过程中，各节点流转或需人工审批时推送通知。'
                        : 'Receive browser desktop notifications when human-in-the-loop gate is triggered.'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyMilestone}
                    onChange={(e) => setNotifyMilestone(e.target.checked)}
                    className="w-4 h-4 accent-[#0284C7] rounded cursor-pointer"
                  />
                </div>

                <div
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                    isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <span className="font-semibold text-xs block">
                      {locale === 'zh-CN' ? 'Telegram Bot 专线消息转发' : 'Telegram Bot Real-time Dispatch'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {locale === 'zh-CN'
                        ? '通过 @XAgentsSpaceBot 将重要任务状态直接推送到您的 Telegram 账户。'
                        : 'Forward webhook events directly to your connected Telegram handle.'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyTelegram}
                    onChange={(e) => setNotifyTelegram(e.target.checked)}
                    className="w-4 h-4 accent-[#0284C7] rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-xl border text-xs ${
                  isDark ? 'bg-[#0A101F] border-[#1F2D4A]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Key className="w-4 h-4 text-[#F59E0B]" />
                  <span className="font-semibold text-xs">
                    {locale === 'zh-CN' ? '企业专属 REST & WebSocket API Key' : 'Enterprise REST & WebSocket API Key'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {locale === 'zh-CN'
                    ? '此密钥用于在 CI/CD 流水线、自动化脚本中直接发布任务、获取语义匹配 Agent 以及调用 DAG 编排引擎。'
                    : 'Use this private authorization token to programmatically trigger orchestration DAGs and query matched agents.'}
                </p>

                <div
                  className={`flex items-center justify-between p-2.5 rounded-xl border font-mono text-xs ${
                    isDark ? 'bg-[#132036] border-[#1F2D4A]' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="text-slate-300 truncate mr-2">
                    {showApiKey ? apiKey : `${apiKey.substring(0, 12)}••••••••••••••••••••••••`}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-1.5 rounded-lg hover:bg-slate-700/30 text-slate-400 hover:text-slate-200 transition-colors"
                      title={showApiKey ? 'Hide' : 'Show'}
                    >
                      {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="p-1.5 rounded-lg hover:bg-slate-700/30 text-slate-400 hover:text-slate-200 transition-colors"
                      title="Copy Key"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleRegenerateKey}
                      className="p-1.5 rounded-lg hover:bg-slate-700/30 text-[#0284C7] transition-colors"
                      title="Regenerate Key"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-4 border-t flex items-center justify-between ${
            isDark ? 'border-[#1F2D4A] bg-[#132036]/50' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setName(userProfile.name);
              setHandle(userProfile.handle);
              setEmail(userProfile.email);
              setOrg(userProfile.org);
              setBio(userProfile.bio);
              setRole(userProfile.role);
              setAvatar(userProfile.avatar);
              showToast(locale === 'zh-CN' ? '已重置表单修改' : 'Form fields reset', 'info');
            }}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isDark
                ? 'border-[#1F2D4A] hover:bg-[#152238] text-slate-400 hover:text-slate-200'
                : 'border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {locale === 'zh-CN' ? '放弃修改' : 'Discard'}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {locale === 'zh-CN' ? '取消' : 'Cancel'}
            </button>

            <button
              id="btn-save-profile"
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0284C7] text-[#0A101F] hover:bg-[#22D3EE] transition-all shadow-md flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              {locale === 'zh-CN' ? '保存个人信息' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
