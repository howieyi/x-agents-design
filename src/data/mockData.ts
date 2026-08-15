import {
  Agent,
  Task,
  UserWallet,
  TransactionRecord,
  AgentRun,
  MatchingCandidate,
  Dispute,
  SystemStatus,
  ConfigItem,
  AuditLog,
  UserProfile
} from '../types';

export const mockUserProfile: UserProfile = {
  id: 'usr_enterprise_882',
  name: 'Alex Rivera',
  handle: '@arivera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  email: 'alex.rivera@nexus-corp.ai',
  org: 'Nexus Autonomous Labs',
  bio: 'Lead Architect & Agent Operator. Deploying multi-agent DAG pipelines, smart contract escrow settlements, and cloud infrastructure.',
  role: 'Enterprise Administrator',
  telegram: '@alex_nexus_ai',
  github: 'alex-rivera-nexus',
  twitter: '@alex_rivera_ai',
  apiKey: 'xag_live_89f72b14c3e8091a_nexus_prod',
  notificationSettings: {
    emailOnTaskSettled: true,
    emailOnDispute: true,
    browserPushOnMilestone: true,
    telegramAlerts: true
  }
};

export const mockSystemStatus: SystemStatus = {
  chainId: 84532,
  chainName: 'Base Sepolia',
  blockHeight: 18942301,
  qdrantStatus: 'healthy',
  qdrantVectorCount: 4820,
  rpcLatencyMs: 42,
  sqsOldestMsgSeconds: 0,
  dlqCount: 0,
  configVersion: 'v2.8.4-appconfig-prod',
  alchemySyncStatus: 'synced'
};

export const mockWallets: UserWallet[] = [
  {
    id: 'w-1',
    address: '0x3F2a895b6c89DE15bc328f4E5F5d9A721C8d45E7',
    name: 'Privy Embedded Smart Wallet',
    provider: 'privy_embedded',
    roles: ['identity', 'payment'],
    verified: true,
    balances: {
      YD: 14850,
      ETH: 1.84,
      USDC: 4200.5,
      USDT: 1500.0,
      WETH: 0.5
    },
    isDefaultPayment: true,
    createdAt: '2026-06-10T10:00:00Z'
  },
  {
    id: 'w-2',
    address: '0x71C812b7aB724a2C6f272a8DEB7c65330e7688B3',
    name: 'MetaMask Treasury',
    provider: 'metamask',
    roles: ['payment', 'payout'],
    verified: true,
    balances: {
      YD: 38200,
      ETH: 8.65,
      USDC: 24500.0,
      USDT: 8000.0,
      WETH: 3.2
    },
    isDefaultPayout: true,
    createdAt: '2026-06-15T14:30:00Z'
  },
  {
    id: 'w-3',
    address: '0x99A410f8D91837C091b61E14B478c8Ea01534E42',
    name: 'Ledger Cold Signing (WalletConnect)',
    provider: 'walletconnect',
    roles: ['identity'],
    verified: true,
    balances: {
      YD: 120000,
      ETH: 45.0,
      USDC: 85000.0,
      USDT: 20000.0,
      WETH: 10.0
    },
    createdAt: '2026-07-01T09:15:00Z'
  }
];

export const mockAgents: Agent[] = [
  {
    id: 'agent-cineflow-video',
    name: 'CineFlow 视频创作与分片串联导演',
    handle: '@cineflow_video',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    summary: '全流程 AI 视频创作导演 Agent，精通剧本分镜拆解、多片段并行视频分片生成、角色一致性控制、拟真配音对齐及音视频无缝串联剪辑。',
    category: '视频创作与分片串联',
    tags: ['Sora / Runway Gen-3', '分镜拆解', '视频分片生成', '画面串联拼接', 'AI 拟真人声', 'BGM 音效对齐'],
    version: 'v3.2.0',
    verified: true,
    status: 'active',
    priceYD: 1200,
    pricingModel: 'per_task',
    author: {
      id: 'auth-01',
      name: 'OmniCine Studio',
      payoutWallet: '0x71C812b7aB724a2C6f272a8DEB7c65330e7688B3',
      reputation: 99.6
    },
    metrics: {
      completedTasks: 186,
      onTimeRate: 98.4,
      qualityRating: 4.97,
      communicationRating: 4.92,
      disputeRate: 0.2,
      lastActive: '3m ago',
      totalEarnedYD: 215000
    },
    capabilities: [
      '剧本自动拆解为精准镜头语言与时序分片提示词',
      '多场景 4K 动态视频分片并行生成与光影一致性',
      '拟真人声配音（ElevenLabs / CosyVoice）与音画毫秒级对齐',
      'FFmpeg 云端无缝多镜头串联拼接与智能转场渲染'
    ],
    supportedTools: [
      'Runway_Gen3_Chunk_Gen',
      'Video_Timeline_Stitcher',
      'ElevenLabs_Voice_Synth',
      'FFmpeg_Cloud_Renderer',
      'Auto_Subtitles_Whisper'
    ],
    runtimeConstraints: {
      maxSteps: 60,
      maxTokens: 180000,
      maxCostYD: 80,
      timeoutSeconds: 400,
      allowedTools: ['Runway_Gen3_Chunk_Gen', 'Video_Timeline_Stitcher', 'ElevenLabs_Voice_Synth']
    },
    matchScore: 98,
    whyMatch: '98% 语义匹配。在剧本分镜拆解、视频分片渲染与长视频串联剪辑领域具备 186 笔成功交付，按时交付率 98.4%。',
    descriptionZh: '专精于剧本分镜拆解、AI 视频分片生成、人声配音与多镜头音画串联剪辑的全流程影视级 Agent。',
    descriptionEn: 'Autonomous director agent for screenplay sharding, video chunk generation, voiceover alignment, and timeline stitching.'
  },
  {
    id: 'agent-lumina-image',
    name: 'Lumina 4K 视觉插画与海报渲染大师',
    handle: '@lumina_visual',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    summary: '顶级视觉艺术与插画生成 Agent，精通 Flux.1 Pro、Midjourney v6 与 Stable Diffusion 3，专精于 4K 商业海报、电商渲染、IP 人物一致性与高保真插画。',
    category: '视觉与图片生成',
    tags: ['Flux.1 Pro', 'Midjourney v6', '4K 商业海报', '电商 3D 渲染', '角色一致性', '矢量插画'],
    version: 'v2.8.0',
    verified: true,
    status: 'active',
    priceYD: 900,
    pricingModel: 'per_task',
    author: {
      id: 'auth-02',
      name: 'PixelArtisan Core',
      payoutWallet: '0x8892A418E298dF19f72bBf573D4D1525b425bB29',
      reputation: 99.8
    },
    metrics: {
      completedTasks: 245,
      onTimeRate: 99.2,
      qualityRating: 4.99,
      communicationRating: 4.95,
      disputeRate: 0.0,
      lastActive: '5m ago',
      totalEarnedYD: 238000
    },
    capabilities: [
      '4K 电影级画质商业海报渲染与电商产品场景光影生成',
      '跨多姿态、多角度的人物角色面部与服装一致性保持',
      'ControlNet 结构线稿着色与深度图材质迁移',
      '企业品牌 VI 视觉规范、矢量 Logo 与多尺寸素材自适应'
    ],
    supportedTools: [
      'Flux_Pro_Renderer',
      'Midjourney_API_Bridge',
      'ControlNet_Depth_Pose',
      'Upscale_4K_Enhancer',
      'Vector_SVG_Tracer'
    ],
    runtimeConstraints: {
      maxSteps: 40,
      maxTokens: 120000,
      maxCostYD: 50,
      timeoutSeconds: 300,
      allowedTools: ['Flux_Pro_Renderer', 'ControlNet_Depth_Pose', 'Upscale_4K_Enhancer']
    },
    matchScore: 95,
    whyMatch: '95% 语义匹配。在 4K 商业海报、插画渲染与角色一致性方面具备 245 笔满分交付记录，0 争议率。',
    descriptionZh: '专精于 4K 商业海报、产品 3D 渲染与多姿态角色一致性插画生成的视觉艺术 Agent。',
    descriptionEn: 'Specialized visual arts agent for 4K commercial posters, 3D product renders, and consistent character illustration.'
  },
  {
    id: 'agent-slidemaster-ppt',
    name: 'SlideMaster 商业 PPT 与演示文稿专家',
    handle: '@slidemaster_ppt',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    summary: '咨询级商业 PPT 与 Keynote 演示文稿生成 Agent，精通麦肯锡式金字塔结构排版、商业计划书 BP、数据图表可视化及原生 .pptx 导出。',
    category: 'PPT / 演示文稿生成',
    tags: ['商业计划书 PPT', '16:9 高保真母版', '咨询级排版', '数据可视化图表', 'Keynote / PPTX 导出'],
    version: 'v2.1.0',
    verified: true,
    status: 'active',
    priceYD: 850,
    pricingModel: 'per_task',
    author: {
      id: 'auth-03',
      name: 'StrategyDeck Labs',
      payoutWallet: '0x55B32194a28E298dF19f72bBf573D4D1525b425B2',
      reputation: 98.6
    },
    metrics: {
      completedTasks: 162,
      onTimeRate: 98.8,
      qualityRating: 4.94,
      communicationRating: 4.9,
      disputeRate: 0.3,
      lastActive: '18m ago',
      totalEarnedYD: 142000
    },
    capabilities: [
      '根据文案大纲自动构建符合麦肯锡金字塔原理的商业 PPT 逻辑',
      '咨询级 16:9 高保真母版配色、多栏对比、流程时间轴与卡片排版',
      '动态数据图表渲染（柱状图、漏斗图、瀑布图、矩阵图）',
      '支持原生 Microsoft PowerPoint (.pptx) 可编辑格式导出'
    ],
    supportedTools: [
      'PPTX_Generator_Engine',
      'Visual_Infographic_Synth',
      'Chart_Data_Visualizer',
      'Color_Palette_Matcher'
    ],
    runtimeConstraints: {
      maxSteps: 35,
      maxTokens: 100000,
      maxCostYD: 40,
      timeoutSeconds: 200,
      allowedTools: ['PPTX_Generator_Engine', 'Chart_Data_Visualizer']
    },
    matchScore: 93,
    whyMatch: '93% 语义匹配。商业计划书与咨询级 PPT 设计专家，支持可编辑 PPTX 导出。',
    descriptionZh: '专注于咨询级商业 PPT、融资计划书及数据可视化演示文稿生成的专业设计 Agent。',
    descriptionEn: 'Expert presentation agent specializing in consulting-grade deck design, business plans, and native PPTX generation.'
  },
  {
    id: 'agent-socialmatrix-media',
    name: 'SocialMatrix 全渠道社媒内容矩阵工厂',
    handle: '@socialmatrix_media',
    avatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
    summary: '全网主流社媒内容矩阵创作专家，专精于小红书爆款图文+封面、抖音短视频脚本+分镜、Instagram 视觉轮播、微信公众号深度排版及全平台热点标签矩阵。',
    category: '全平台社媒素材矩阵',
    tags: ['小红书爆款图文', '抖音短视频脚本', 'Instagram 轮播图', '微信公众号长文', '热点标签矩阵'],
    version: 'v3.5.0',
    verified: true,
    status: 'active',
    priceYD: 1100,
    pricingModel: 'per_task',
    author: {
      id: 'auth-04',
      name: 'ViralGrowth Media',
      payoutWallet: '0x12A998b6c89DE15bc328f4E5F5d9A721C8d45E7',
      reputation: 99.2
    },
    metrics: {
      completedTasks: 320,
      onTimeRate: 99.4,
      qualityRating: 4.98,
      communicationRating: 4.96,
      disputeRate: 0.1,
      lastActive: '1m ago',
      totalEarnedYD: 345000
    },
    capabilities: [
      '小红书 3:4 视觉卡片套图生成、爆款标题公式与情绪共鸣种草文案',
      '抖音 / TikTok 15s/30s 黄金前 3 秒钩子脚本、镜头分镜与配乐提示',
      'Instagram Feed 九宫格与 Carousel 多页轮播视觉排版',
      '微信公众号万字深度长文、精美富文本排版、引言卡片与金句图生成'
    ],
    supportedTools: [
      'Xiaohongshu_Card_Formatter',
      'Douyin_Script_Splitter',
      'Instagram_Grid_Composer',
      'WeChat_RichText_Styler',
      'Hashtag_Trend_Analyzer'
    ],
    runtimeConstraints: {
      maxSteps: 50,
      maxTokens: 160000,
      maxCostYD: 60,
      timeoutSeconds: 240,
      allowedTools: ['Xiaohongshu_Card_Formatter', 'Douyin_Script_Splitter', 'WeChat_RichText_Styler']
    },
    matchScore: 97,
    whyMatch: '97% 语义匹配。全平台社媒素材创作领域标杆 Agent，一键将核心主题裂变为小红书、抖音、Ins、微信全套素材包。',
    descriptionZh: '一键将核心主题裂变为小红书、抖音、Instagram、微信公众号全渠道爆款素材矩阵的营销 Agent。',
    descriptionEn: 'Full-spectrum social media marketing agent for Xiaohongshu cards, Douyin scripts, Instagram carousels, and WeChat articles.'
  },
  {
    id: 'agent-sheetmind-bi',
    name: 'SheetMind Excel 财务建模与报表分析师',
    handle: '@sheetmind_bi',
    avatar: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=150&auto=format&fit=crop&q=80',
    summary: '企业级 Excel 自动化与商业数据报表分析 Agent，精通财务预测模型、动态数据透视表、KPI 监控仪表盘、条件格式高亮及原生 .xlsx 自动化导出。',
    category: 'Excel / 财务与报表分析',
    tags: ['Excel 自动化', '财务预测模型', '动态数据透视表', '商业 BI 报表', 'KPI 仪表盘', 'openpyxl'],
    version: 'v2.0.1',
    verified: true,
    status: 'active',
    priceYD: 750,
    pricingModel: 'per_task',
    author: {
      id: 'auth-05',
      name: 'FinData Analytics',
      payoutWallet: '0x438812b7aB724a2C6f272a8DEB7c65330e768811',
      reputation: 98.0
    },
    metrics: {
      completedTasks: 114,
      onTimeRate: 97.5,
      qualityRating: 4.91,
      communicationRating: 4.88,
      disputeRate: 0.4,
      lastActive: '10m ago',
      totalEarnedYD: 89000
    },
    capabilities: [
      '企业 3 表联动财务预测模型与估值测算（DCF / 敏感性分析）',
      '多维度数据透视表、切片器联动与交互式报表自动生成',
      'KPI 经营分析总结与管理层决策建议生成',
      '原生 Microsoft Excel (.xlsx) 公式、样式与保护规则完整输出'
    ],
    supportedTools: [
      'OpenPyXL_Sheet_Engine',
      'Financial_Model_Builder',
      'Pivot_Table_Generator',
      'BI_Dashboard_Renderer'
    ],
    runtimeConstraints: {
      maxSteps: 30,
      maxTokens: 90000,
      maxCostYD: 35,
      timeoutSeconds: 180,
      allowedTools: ['OpenPyXL_Sheet_Engine', 'Financial_Model_Builder', 'Pivot_Table_Generator']
    },
    matchScore: 91,
    whyMatch: '91% 语义匹配。企业财务 3 表预测模型与 Excel 数据透视表自动化构建专家。',
    descriptionZh: '专注于财务预测模型构建、Excel 数据透视表与企业 BI 经营报表分析生成的专业 Agent。',
    descriptionEn: 'Enterprise financial modeling and Excel BI analytics agent with automated pivot table and formula generation.'
  },
  {
    id: 'agent-docupro-word',
    name: 'DocuPro 深度研究与 Word 文档架构师',
    handle: '@docupro_word',
    avatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
    summary: '长文档写作与深度报告架构 Agent，精通行业白皮书、产品需求文档 (PRD)、学术与商业调研报告、标准化 Word 排版与多级目录构建。',
    category: 'Word / 文档与 PRD 撰写',
    tags: ['行业白皮书', '产品需求文档 (PRD)', 'Word 结构化排版', '学术与调研报告', 'Markdown / Docx'],
    version: 'v1.6.0',
    verified: true,
    status: 'active',
    priceYD: 800,
    pricingModel: 'per_task',
    author: {
      id: 'auth-06',
      name: 'EnterpriseDoc AI',
      payoutWallet: '0x99A410f8D91837C091b61E14B478c8Ea01534E42',
      reputation: 98.9
    },
    metrics: {
      completedTasks: 198,
      onTimeRate: 99.0,
      qualityRating: 4.95,
      communicationRating: 4.94,
      disputeRate: 0.0,
      lastActive: '4m ago',
      totalEarnedYD: 165000
    },
    capabilities: [
      '万字级行业深度调研报告与竞品分析白皮书结构化撰写',
      '标准软件产品需求文档 (PRD) 生成，包含用例流与功能规格说明',
      '规范 Word 格式母版排版（多级大纲标题、图表索引、专业页眉页脚）',
      '支持 Markdown、Microsoft Word (.docx) 及 PDF 双向转换与导出'
    ],
    supportedTools: [
      'Docx_Template_Formatter',
      'Research_Web_Grounding',
      'Table_Of_Contents_Indexer',
      'PDF_Doc_Exporter'
    ],
    runtimeConstraints: {
      maxSteps: 40,
      maxTokens: 140000,
      maxCostYD: 40,
      timeoutSeconds: 220,
      allowedTools: ['Docx_Template_Formatter', 'Research_Web_Grounding', 'PDF_Doc_Exporter']
    },
    matchScore: 92,
    whyMatch: '92% 语义匹配。万字行业白皮书与规范 PRD 文档撰写专家，输出排版优雅的 Word/PDF 成果。',
    descriptionZh: '专精于深度行业白皮书、产品需求文档 (PRD) 及规范 Word 长文档撰写与排版的架构 Agent。',
    descriptionEn: 'Professional document architect for enterprise whitepapers, PRD specifications, and structured Word documents.'
  },
  {
    id: 'agent-novelcrafter-ai',
    name: 'NovelCrafter 百万字长篇小说创作导师',
    handle: '@novelcrafter_ai',
    avatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=80',
    summary: '长篇文学创作与网文连载 Agent，专精于宏大世界观设定、力量体系拆解、百万字分卷大纲、人物性格与记忆一致性把控及沉浸式正文连载生成。',
    category: '长篇故事与网文小说',
    tags: ['世界观架构', '分卷大纲拆解', '人物性格一致性', '多视角剧情推进', '长篇连载生成', '伏笔设计'],
    version: 'v4.1.0',
    verified: true,
    status: 'active',
    priceYD: 1300,
    pricingModel: 'per_task',
    author: {
      id: 'auth-07',
      name: 'StoryForge Labs',
      payoutWallet: '0x3F2a895b6c89DE15bc328f4E5F5d9A721C8d45E7',
      reputation: 99.7
    },
    metrics: {
      completedTasks: 140,
      onTimeRate: 98.6,
      qualityRating: 4.97,
      communicationRating: 4.96,
      disputeRate: 0.0,
      lastActive: '2m ago',
      totalEarnedYD: 196000
    },
    capabilities: [
      '宏大世界观设定集构建（地理地貌、历史编年史、门派势力、力量体系）',
      '百万字多卷大纲分解、每卷核心矛盾与高潮节奏 (Pacing) 精密把控',
      '角色人设卡与多轮对话记忆库维护，避免人物崩坏与情节自相矛盾',
      '沉浸式场景描写、动作打斗张力与多感官修辞正文持续连载生成'
    ],
    supportedTools: [
      'Worldbuilding_Lore_Keeper',
      'Novel_Chapter_Generator',
      'Character_Consistency_Inspector',
      'Plot_Conflict_Optimizer'
    ],
    runtimeConstraints: {
      maxSteps: 70,
      maxTokens: 250000,
      maxCostYD: 90,
      timeoutSeconds: 500,
      allowedTools: ['Worldbuilding_Lore_Keeper', 'Novel_Chapter_Generator', 'Character_Consistency_Inspector']
    },
    matchScore: 96,
    whyMatch: '96% 语义匹配。百万字网文连载与世界观架构专家，具备长程上下文记忆与角色一致性把控力。',
    descriptionZh: '专注于世界观架构、分卷剧情大纲、人物一致性把控与百万字长篇小说连载生成的创作 Agent。',
    descriptionEn: 'Master storytelling agent for long-form fiction, worldbuilding lore, chapter plotting, and character consistency.'
  }
];

export const mockOrchestrationTemplates = [
  {
    id: 'tpl-video-concatenation',
    name: 'Video Creation & Scene Stitching Swarm',
    nameZh: '影视级短视频分片生成与音画串联协同流水线',
    topology: 'pipeline' as const,
    description: 'Autonomous 4-stage pipeline: Screenplay scene sharding -> 4K keyframe generation -> video chunk rendering -> audio alignment & timeline concatenation.',
    descriptionZh: '四阶段自动化流水线：剧本分镜时序分片 -> 4K 角色一致性关键帧生成 -> 动态视频分片生成 -> 拟真配音对齐与无缝时间线串联剪辑。',
    nodes: [
      {
        id: 'node-story',
        name: '剧本创作与分镜时序分片',
        stageIndex: 1,
        role: 'Screenplay & Storyboard Sharder',
        assignedAgentId: 'agent-cineflow-video',
        assignedAgentName: 'CineFlow 视频创作与分片串联导演',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@cineflow_video',
        inputArtifacts: ['核心主题需求', '时长目标 (60s)', '受众风格定位'],
        outputArtifacts: ['storyboard_spec.json', 'scene_prompts.yaml', 'timeline_manifest.json'],
        status: 'completed' as const,
        rewardAllocationPct: 20,
        rewardAllocationYD: 240,
        executionTimeMs: 1420,
        tokensUsed: 18500,
        dependencies: [],
        requireHumanApproval: false,
        approved: true,
        systemPromptSnippet: '将剧本拆解为 6 段独立的精准时序分镜镜头，并生成光影、运镜与动作提示词。',
        logs: [
          { id: 'l-1', timestamp: '10:00:12', level: 'info' as const, message: '解析剧本情节，拆解为 6 个时序分镜镜头。' },
          { id: 'l-2', timestamp: '10:00:45', level: 'success' as const, message: '生成 storyboard_spec.json 与 timeline_manifest.json (SHA: 0x9a8f...)' }
        ]
      },
      {
        id: 'node-art',
        name: '4K 关键帧与人物角色一致性渲染',
        stageIndex: 2,
        role: 'Keyframe Visual Artist',
        assignedAgentId: 'agent-lumina-image',
        assignedAgentName: 'Lumina 4K 视觉插画与海报渲染大师',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@lumina_visual',
        inputArtifacts: ['scene_prompts.yaml', 'storyboard_spec.json'],
        outputArtifacts: ['keyframes_4k.zip', 'character_lora_ref.json'],
        status: 'completed' as const,
        rewardAllocationPct: 25,
        rewardAllocationYD: 300,
        executionTimeMs: 3890,
        tokensUsed: 36200,
        dependencies: ['node-story'],
        requireHumanApproval: false,
        approved: true,
        systemPromptSnippet: '利用 Flux.1 Pro 和 ControlNet 生成 6 组人物与环境光影高度一致的 4K 关键帧底图。',
        logs: [
          { id: 'l-3', timestamp: '10:01:20', level: 'info' as const, message: '渲染 6 组 4K 高保真关键帧，核验人物面部与服装一致性。' },
          { id: 'l-4', timestamp: '10:02:15', level: 'success' as const, message: '所有关键帧通过色彩与光影一致性校验。' }
        ]
      },
      {
        id: 'node-video-chunks',
        name: '视频分片生成与拟真配音对齐',
        stageIndex: 3,
        role: 'Video Chunk Renderer & Voiceover',
        assignedAgentId: 'agent-cineflow-video',
        assignedAgentName: 'CineFlow 视频创作与分片串联导演',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@cineflow_video',
        inputArtifacts: ['keyframes_4k.zip', 'storyboard_spec.json'],
        outputArtifacts: ['video_chunks_raw.zip', 'voiceover_24bit.wav', 'bgm_aligned.wav'],
        status: 'completed' as const,
        rewardAllocationPct: 35,
        rewardAllocationYD: 420,
        executionTimeMs: 6120,
        tokensUsed: 52000,
        dependencies: ['node-art'],
        requireHumanApproval: false,
        approved: true,
        systemPromptSnippet: '并行驱动视频生成引擎输出 6 段 10 秒动态分片视频，并合成 24-bit 广播级人声旁白与 BGM。',
        logs: [
          { id: 'l-5', timestamp: '10:03:00', level: 'info' as const, message: '并行渲染 6 个 1080p@60fps 动态视频分片。' },
          { id: 'l-6', timestamp: '10:03:40', level: 'success' as const, message: '音频音轨与分镜毫秒级对齐完成。' }
        ]
      },
      {
        id: 'node-stitch',
        name: '时间线串联拼接、转场与最终成片渲染',
        stageIndex: 4,
        role: 'Timeline Splicer & Final Quality Gate',
        assignedAgentId: 'agent-cineflow-video',
        assignedAgentName: 'CineFlow 视频创作与分片串联导演',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@cineflow_video',
        inputArtifacts: ['video_chunks_raw.zip', 'voiceover_24bit.wav', 'timeline_manifest.json'],
        outputArtifacts: ['master_video_4k.mp4', 'subtitles_timed.srt', 'deliverable_proof.json'],
        status: 'completed' as const,
        rewardAllocationPct: 20,
        rewardAllocationYD: 240,
        executionTimeMs: 3840,
        tokensUsed: 21800,
        dependencies: ['node-video-chunks'],
        requireHumanApproval: true,
        approved: true,
        systemPromptSnippet: '使用 FFmpeg 无损串联各视频分片，应用平滑镜头转场与 Whisper 自动字幕，导出 4K 交付母带。',
        logs: [
          { id: 'l-7', timestamp: '10:04:10', level: 'info' as const, message: '拼接 6 段分片视频，合成双语硬字幕与淡入淡出转场。' },
          { id: 'l-8', timestamp: '10:04:45', level: 'success' as const, message: '完成 master_video_4k.mp4 渲染并生成交付 SHA-256 签名。' }
        ]
      }
    ]
  },
  {
    id: 'tpl-social-omnichannel',
    name: 'Multi-Platform Social Media Factory',
    nameZh: '全网主流社媒内容矩阵生成流 (小红书 + 抖音 + Instagram + 微信公众号)',
    topology: 'parallel_swarm' as const,
    description: 'Parallel swarm transforming single core brief into platform-tailored assets: Xiaohongshu 3:4 cards, Douyin video hooks, Instagram carousels, and WeChat long-form articles.',
    descriptionZh: '并行协同群组：将核心传播主题一键裂变为小红书 3:4 爆款图文卡片、抖音黄金前 3 秒口播分镜脚本、Instagram 视觉轮播矩阵与微信公众号深度长文排版。',
    nodes: [
      {
        id: 'node-brief',
        name: '核心主题与爆款痛点提炼',
        stageIndex: 1,
        role: 'Chief Marketing Strategist',
        assignedAgentId: 'agent-socialmatrix-media',
        assignedAgentName: 'SocialMatrix 全渠道社媒内容矩阵工厂',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@socialmatrix_media',
        inputArtifacts: ['产品核心卖点', '目标用户画像', '竞品热点趋势'],
        outputArtifacts: ['creative_angles.json', 'core_copy_framework.md'],
        status: 'completed' as const,
        rewardAllocationPct: 20,
        rewardAllocationYD: 220,
        executionTimeMs: 1800,
        tokensUsed: 19000,
        dependencies: [],
        requireHumanApproval: false,
        approved: true,
        logs: []
      },
      {
        id: 'node-redbook',
        name: '小红书 3:4 视觉卡片与种草文案',
        stageIndex: 2,
        role: 'Xiaohongshu Specialist',
        assignedAgentId: 'agent-socialmatrix-media',
        assignedAgentName: 'SocialMatrix 全渠道社媒内容矩阵工厂',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@socialmatrix_media',
        inputArtifacts: ['creative_angles.json'],
        outputArtifacts: ['redbook_carousel_cards.zip', 'redbook_post_copy.md'],
        status: 'running' as const,
        rewardAllocationPct: 25,
        rewardAllocationYD: 275,
        executionTimeMs: 2400,
        tokensUsed: 26000,
        dependencies: ['node-brief'],
        requireHumanApproval: false,
        approved: false,
        logs: []
      },
      {
        id: 'node-douyin',
        name: '抖音黄金前 3 秒短视频分镜脚本',
        stageIndex: 2,
        role: 'Short-Video Hook Scriptwriter',
        assignedAgentId: 'agent-socialmatrix-media',
        assignedAgentName: 'SocialMatrix 全渠道社媒内容矩阵工厂',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@socialmatrix_media',
        inputArtifacts: ['creative_angles.json'],
        outputArtifacts: ['douyin_hook_script_30s.md', 'visual_storyboard_prompts.json'],
        status: 'running' as const,
        rewardAllocationPct: 20,
        rewardAllocationYD: 220,
        executionTimeMs: 2100,
        tokensUsed: 22000,
        dependencies: ['node-brief'],
        requireHumanApproval: false,
        approved: false,
        logs: []
      },
      {
        id: 'node-wechat',
        name: '微信公众号深度长文与富文本排版',
        stageIndex: 2,
        role: 'WeChat Editorial Architect',
        assignedAgentId: 'agent-docupro-word',
        assignedAgentName: 'DocuPro 深度研究与 Word 文档架构师',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@docupro_word',
        inputArtifacts: ['creative_angles.json', 'core_copy_framework.md'],
        outputArtifacts: ['wechat_rich_article.html', 'article_quote_cards.zip'],
        status: 'running' as const,
        rewardAllocationPct: 20,
        rewardAllocationYD: 220,
        executionTimeMs: 2800,
        tokensUsed: 31000,
        dependencies: ['node-brief'],
        requireHumanApproval: false,
        approved: false,
        logs: []
      },
      {
        id: 'node-social-package',
        name: '合规性审查与全媒体素材包交付',
        stageIndex: 3,
        role: 'Compliance & Asset Aggregator',
        assignedAgentId: 'agent-socialmatrix-media',
        assignedAgentName: 'SocialMatrix 全渠道社媒内容矩阵工厂',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@socialmatrix_media',
        inputArtifacts: ['redbook_post_copy.md', 'douyin_hook_script_30s.md', 'wechat_rich_article.html'],
        outputArtifacts: ['omnichannel_media_bundle.zip', 'compliance_audit_report.json'],
        status: 'pending' as const,
        rewardAllocationPct: 15,
        rewardAllocationYD: 165,
        dependencies: ['node-redbook', 'node-douyin', 'node-wechat'],
        requireHumanApproval: true,
        approved: false,
        logs: []
      }
    ]
  },
  {
    id: 'tpl-business-office-suite',
    name: 'Enterprise PPT + Word + Excel BI Suite',
    nameZh: '咨询级商业套件生成流：PPT 演示文稿 + Word 白皮书 + Excel 财务分析',
    topology: 'hierarchical' as const,
    description: 'Hierarchical generation pipeline: Executive research -> Excel 3-statement financial model -> Word whitepaper -> 16:9 consulting-grade PPT master deck.',
    descriptionZh: '层级架构：宏观行业研究与大纲解构 -> Excel 3 表联动财务测算与动态数据透视表 -> Word 行业深度白皮书 -> 咨询级 16:9 PPT 演示文稿排版与母版渲染。',
    nodes: [
      {
        id: 'node-biz-research',
        name: '宏观商业研究与大纲解构',
        stageIndex: 1,
        role: 'Lead Business Analyst',
        assignedAgentId: 'agent-docupro-word',
        assignedAgentName: 'DocuPro 深度研究与 Word 文档架构师',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@docupro_word',
        inputArtifacts: ['项目立项报告', '行业调研数据', '财务经营底表'],
        outputArtifacts: ['executive_summary.md', 'strategic_outline.json'],
        status: 'completed' as const,
        rewardAllocationPct: 20,
        rewardAllocationYD: 170,
        executionTimeMs: 2100,
        tokensUsed: 24000,
        dependencies: [],
        requireHumanApproval: false,
        approved: true,
        logs: []
      },
      {
        id: 'node-biz-excel',
        name: 'Excel 3 表联动财务预测与数据透视',
        stageIndex: 2,
        role: 'Financial BI Modeler',
        assignedAgentId: 'agent-sheetmind-bi',
        assignedAgentName: 'SheetMind Excel 财务建模与报表分析师',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@sheetmind_bi',
        inputArtifacts: ['strategic_outline.json', '财务经营底表'],
        outputArtifacts: ['financial_model_3statements.xlsx', 'kpi_pivot_charts.json'],
        status: 'running' as const,
        rewardAllocationPct: 30,
        rewardAllocationYD: 255,
        executionTimeMs: 3100,
        tokensUsed: 38000,
        dependencies: ['node-biz-research'],
        requireHumanApproval: false,
        approved: false,
        logs: []
      },
      {
        id: 'node-biz-word',
        name: 'Word 行业白皮书与深度分析报告',
        stageIndex: 2,
        role: 'Whitepaper Writer',
        assignedAgentId: 'agent-docupro-word',
        assignedAgentName: 'DocuPro 深度研究与 Word 文档架构师',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@docupro_word',
        inputArtifacts: ['executive_summary.md', 'financial_model_3statements.xlsx'],
        outputArtifacts: ['industry_whitepaper_final.docx', 'executive_brief.pdf'],
        status: 'running' as const,
        rewardAllocationPct: 25,
        rewardAllocationYD: 212,
        dependencies: ['node-biz-research'],
        requireHumanApproval: false,
        approved: false,
        logs: []
      },
      {
        id: 'node-biz-ppt',
        name: 'PPT 16:9 咨询级演示文稿与母版渲染',
        stageIndex: 3,
        role: 'Presentation Deck Master',
        assignedAgentId: 'agent-slidemaster-ppt',
        assignedAgentName: 'SlideMaster 商业 PPT 与演示文稿专家',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@slidemaster_ppt',
        inputArtifacts: ['strategic_outline.json', 'kpi_pivot_charts.json', 'industry_whitepaper_final.docx'],
        outputArtifacts: ['commercial_pitch_deck.pptx', 'keynote_master_preview.pdf'],
        status: 'pending' as const,
        rewardAllocationPct: 25,
        rewardAllocationYD: 213,
        dependencies: ['node-biz-excel', 'node-biz-word'],
        requireHumanApproval: true,
        approved: false,
        logs: []
      }
    ]
  },
  {
    id: 'tpl-novel-worldbuilding',
    name: 'Novel Worldbuilding & Multi-Chapter Generator',
    nameZh: '百万字长篇网文小说构建与分卷连载流',
    topology: 'consensus_loop' as const,
    description: 'Consensus loop workflow: Worldbuilding & magic system -> Arc pacing & plot outlines -> Chapter prose generation -> Character consistency audit -> Cover & illustration art.',
    descriptionZh: '闭环协同：宏大世界观与力量体系设定 -> 分卷大纲与高潮伏笔设计 -> 章节沉浸式正文连载 -> 人物性格与记忆一致性审查 -> 角色立绘与小说封面插画生成。',
    nodes: [
      {
        id: 'node-lore',
        name: '世界观设定集与人物小传构建',
        stageIndex: 1,
        role: 'Worldbuilding Lore Keeper',
        assignedAgentId: 'agent-novelcrafter-ai',
        assignedAgentName: 'NovelCrafter 百万字长篇小说创作导师',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@novelcrafter_ai',
        inputArtifacts: ['小说题材题材 (东方玄幻)', '核心金手指设定', '字数规划 (100万字)'],
        outputArtifacts: ['world_lore_codex.json', 'character_profiles.json', 'magic_tier_system.md'],
        status: 'completed' as const,
        rewardAllocationPct: 20,
        rewardAllocationYD: 260,
        executionTimeMs: 3200,
        tokensUsed: 42000,
        dependencies: [],
        requireHumanApproval: false,
        approved: true,
        logs: []
      },
      {
        id: 'node-cover',
        name: '角色立绘与小说精美封面生成',
        stageIndex: 2,
        role: 'Visual Novel Illustrator',
        assignedAgentId: 'agent-lumina-image',
        assignedAgentName: 'Lumina 4K 视觉插画与海报渲染大师',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@lumina_visual',
        inputArtifacts: ['character_profiles.json', 'world_lore_codex.json'],
        outputArtifacts: ['novel_cover_4k.png', 'main_character_sprites.zip'],
        status: 'running' as const,
        rewardAllocationPct: 20,
        rewardAllocationYD: 260,
        executionTimeMs: 2900,
        tokensUsed: 28000,
        dependencies: ['node-lore'],
        requireHumanApproval: false,
        approved: false,
        logs: []
      },
      {
        id: 'node-chapters',
        name: '分卷大纲与 50 章沉浸式正文连载',
        stageIndex: 2,
        role: 'Chapter Prose Novelist',
        assignedAgentId: 'agent-novelcrafter-ai',
        assignedAgentName: 'NovelCrafter 百万字长篇小说创作导师',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@novelcrafter_ai',
        inputArtifacts: ['world_lore_codex.json', 'character_profiles.json'],
        outputArtifacts: ['volume_1_chapters_1_50.txt', 'plot_foreshadowing_tracker.json'],
        status: 'running' as const,
        rewardAllocationPct: 40,
        rewardAllocationYD: 520,
        executionTimeMs: 8400,
        tokensUsed: 96000,
        dependencies: ['node-lore'],
        requireHumanApproval: false,
        approved: false,
        logs: []
      },
      {
        id: 'node-consistency',
        name: '人物一致性与情节自洽逻辑审查',
        stageIndex: 3,
        role: 'Story Continuity Inspector',
        assignedAgentId: 'agent-novelcrafter-ai',
        assignedAgentName: 'NovelCrafter 百万字长篇小说创作导师',
        assignedAgentAvatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=80',
        assignedAgentHandle: '@novelcrafter_ai',
        inputArtifacts: ['volume_1_chapters_1_50.txt', 'character_profiles.json'],
        outputArtifacts: ['consistency_audit_report.json', 'published_volume_1.epub'],
        status: 'pending' as const,
        rewardAllocationPct: 20,
        rewardAllocationYD: 260,
        dependencies: ['node-cover', 'node-chapters'],
        requireHumanApproval: true,
        approved: false,
        logs: []
      }
    ]
  }
];

export const mockTasks: Task[] = [
  {
    id: 'task-8492',
    title: '新能源汽车全球发布会：4K 宣传短视频分片生成、音画串联与全渠道社媒素材矩阵',
    category: '视频创作与分片串联',
    tags: ['Sora / Runway', '短视频分片', '音画串联', '小红书/抖音/微信', '多Agent协同'],
    description: '为高端纯电 SUV 全球发布会定制全套多模态数字内容资产。需要完成：6 段 4K 动态视频分片生成并无缝拼接为 60s 宣传大片、小红书 3:4 视觉卡片与种草文案、抖音 30s 黄金前 3 秒口播分镜脚本、微信公众号深度长文排版。',
    deliverables: [
      {
        id: 'del-1',
        title: '4K 宣传大片与时间线工程 (master_video_4k.mp4)',
        description: '60 秒 4K@60fps 电影级概念视频，包含 6 段分片无缝串联、拟真旁白配音与情绪配乐对齐。',
        status: 'submitted',
        deliverableHash: '0x8f2d9c41b8a5e7392c10b7f6429d3e8174567290bcda12489e1a823904fa6e12',
        fileUrl: 'https://cdn.xagents.space/releases/suv_launch_video_4k.mp4'
      },
      {
        id: 'del-2',
        title: '小红书 3:4 视觉卡片套图与爆款种草文案包',
        description: '8 张 3:4 比例高保真视觉卡片、封面排版与 5 套情绪共鸣型种草文案及热门标签。',
        status: 'submitted',
        deliverableHash: '0x992384a102938471920394819203948192039481920394819203948192039481'
      },
      {
        id: 'del-3',
        title: '抖音 / TikTok 30s 黄金前 3 秒口播视频脚本与分镜',
        description: '3 套包含高转化黄金钩子、分镜头动作指引及 BGM 卡点节奏提示的短视频脚本。',
        status: 'submitted',
        deliverableHash: '0x4428192039481920394819203948192039481920394819203948192039481920'
      },
      {
        id: 'del-4',
        title: '微信公众号深度长文排版图文与 Instagram 轮播图',
        description: '万字行业技术深度解析长文（富文本 HTML）与 Instagram 10 页 Carousel 视觉排版。',
        status: 'submitted',
        deliverableHash: '0x17b98d234190fa8b293847192038102938471920394819203948192039481920'
      }
    ],
    acceptanceCriteria: [
      '视频 6 个分片画面过渡平滑，人物与车辆光影色彩保持 4K 统一调色',
      '人声配音与画面毫秒级对齐，背景音乐与字幕同步率达到 100%',
      '小红书卡片与图文符合 3:4 比例规范且无平台违禁词',
      '交付物必须包含原生 mp4、zip、html 及不可变 SHA-256 存证哈希'
    ],
    rewardYD: 1200,
    stakeYD: 72, // 6% (600 bps)
    platformFeeYD: 24, // 2%
    deadline: '2026-08-20T18:00:00Z',
    status: 'submitted',
    owner: {
      id: 'usr-org-01',
      name: 'Aether Mobility Global',
      walletAddress: '0x3F2a895b6c89DE15bc328f4E5F5d9A721C8d45E7',
      org: 'Aether Motors'
    },
    assignedAgent: mockAgents[0],
    assignedAgentVersion: 'v3.2.0',
    orchestration: {
      enabled: true,
      topology: 'pipeline',
      supervisorAgentId: 'agent-cineflow-video',
      supervisorAgentName: 'CineFlow 视频创作与分片串联导演',
      supervisorAgentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      executionProgressPct: 100,
      totalExecutionCostYD: 18.5,
      nodes: [
        {
          id: 'n-1',
          name: '核心剧本拆解与分镜时序分片',
          stageIndex: 1,
          nodeType: 'agent_worker' as const,
          position: { x: 60, y: 120 },
          role: 'Screenplay & Storyboard Sharder',
          assignedAgentId: 'agent-cineflow-video',
          assignedAgentName: 'CineFlow 视频创作与分片串联导演',
          assignedAgentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          assignedAgentHandle: '@cineflow_video',
          inputArtifacts: ['发布会主题', 'SUV 卖点', '时长约束 (60s)'],
          outputArtifacts: ['storyboard_spec.json', 'timeline_manifest.json'],
          status: 'completed',
          rewardAllocationPct: 20,
          rewardAllocationYD: 240,
          executionTimeMs: 1240,
          tokensUsed: 15400,
          dependencies: [],
          requireHumanApproval: false,
          approved: true,
          logs: [
            { id: 'lg-1', timestamp: '10:00:15', level: 'info', message: '解析发布会主题，拆解为 6 个高燃镜头时序分片。' },
            { id: 'lg-2', timestamp: '10:00:30', level: 'success', message: '完成 storyboard_spec.json 与 timeline_manifest.json 生成。' }
          ]
        },
        {
          id: 'n-2',
          name: '4K 关键帧与车辆光影一致性渲染',
          stageIndex: 2,
          nodeType: 'agent_worker' as const,
          position: { x: 420, y: 120 },
          role: 'Keyframe Visual Artist',
          assignedAgentId: 'agent-lumina-image',
          assignedAgentName: 'Lumina 4K 视觉插画与海报渲染大师',
          assignedAgentAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          assignedAgentHandle: '@lumina_visual',
          inputArtifacts: ['storyboard_spec.json'],
          outputArtifacts: ['keyframes_4k.zip', 'car_model_lora.json'],
          status: 'completed',
          rewardAllocationPct: 30,
          rewardAllocationYD: 360,
          executionTimeMs: 4620,
          tokensUsed: 42800,
          dependencies: ['n-1'],
          requireHumanApproval: false,
          approved: true,
          logs: [
            { id: 'lg-3', timestamp: '10:14:10', level: 'agent_call', message: '调用 Flux_Pro_Renderer 输出 6 组 4K 电影质感关键帧底图。' },
            { id: 'lg-4', timestamp: '10:28:30', level: 'success', message: '车辆流光与车漆质感一致性达到 99.8%。' }
          ]
        },
        {
          id: 'n-3',
          name: '动态分片生成、拟真配音与无缝拼接串联',
          stageIndex: 3,
          nodeType: 'hitl_gate' as const,
          position: { x: 780, y: 120 },
          role: 'Video Splicer & Voiceover Producer',
          assignedAgentId: 'agent-cineflow-video',
          assignedAgentName: 'CineFlow 视频创作与分片串联导演',
          assignedAgentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          assignedAgentHandle: '@cineflow_video',
          inputArtifacts: ['keyframes_4k.zip', 'timeline_manifest.json'],
          outputArtifacts: ['master_video_4k.mp4', 'timed_subtitles.srt'],
          status: 'completed',
          rewardAllocationPct: 30,
          rewardAllocationYD: 360,
          executionTimeMs: 5150,
          tokensUsed: 38200,
          dependencies: ['n-2'],
          requireHumanApproval: true,
          approved: true,
          logs: [
            { id: 'lg-5', timestamp: '10:35:10', level: 'info', message: '并行渲染 6 个视频分片并进行 FFmpeg 无损时间线拼接。' },
            { id: 'lg-6', timestamp: '10:37:00', level: 'success', message: '广播级人声旁白与 BGM 情绪音轨毫秒级对齐完成。' }
          ]
        },
        {
          id: 'n-4',
          name: '全渠道社媒裂变 (小红书/抖音/微信) 与最终交付',
          stageIndex: 4,
          nodeType: 'aggregator' as const,
          position: { x: 1140, y: 120 },
          role: 'Omnichannel Social Media Publisher',
          assignedAgentId: 'agent-socialmatrix-media',
          assignedAgentName: 'SocialMatrix 全渠道社媒内容矩阵工厂',
          assignedAgentAvatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
          assignedAgentHandle: '@socialmatrix_media',
          inputArtifacts: ['master_video_4k.mp4', 'storyboard_spec.json'],
          outputArtifacts: ['redbook_pack.zip', 'douyin_script.md', 'wechat_article.html', 'sha256_proof.json'],
          status: 'completed',
          rewardAllocationPct: 20,
          rewardAllocationYD: 240,
          executionTimeMs: 3100,
          tokensUsed: 21000,
          dependencies: ['n-3'],
          requireHumanApproval: false,
          approved: true,
          logs: [
            { id: 'lg-7', timestamp: '10:41:00', level: 'info', message: '生成小红书 3:4 封面卡片、抖音分镜脚本及微信万字排版长文。' },
            { id: 'lg-8', timestamp: '10:46:00', level: 'success', message: '全套数字资产包打包完毕，生成不可变 SHA-256 存证哈希。' }
          ]
        }
      ],
      edges: [
        { id: 'e-1-2', sourceNodeId: 'n-1', targetNodeId: 'n-2', status: 'completed' },
        { id: 'e-2-3', sourceNodeId: 'n-2', targetNodeId: 'n-3', status: 'completed' },
        { id: 'e-3-4', sourceNodeId: 'n-3', targetNodeId: 'n-4', status: 'completed' }
      ],
      interAgentMessages: [
        {
          id: 'msg-1',
          fromNodeId: 'n-1',
          fromAgentName: 'CineFlow 视频创作与分片串联导演',
          toNodeId: 'n-2',
          toAgentName: 'Lumina 4K 视觉插画与海报渲染大师',
          messageType: 'spec_handoff',
          timestamp: '10:00:35',
          payloadSummary: '交付 storyboard_spec.json 与 6 个时序分镜的视觉光影风格提示词。',
          status: 'processed'
        },
        {
          id: 'msg-2',
          fromNodeId: 'n-2',
          fromAgentName: 'Lumina 4K 视觉插画与海报渲染大师',
          toNodeId: 'n-3',
          toAgentName: 'CineFlow 视频创作与分片串联导演',
          messageType: 'code_review',
          timestamp: '10:28:40',
          payloadSummary: '交付 6 组 4K 高保真关键帧与一致性车身材质参数供动态分片渲染。',
          status: 'processed'
        },
        {
          id: 'msg-3',
          fromNodeId: 'n-3',
          fromAgentName: 'CineFlow 视频创作与分片串联导演',
          toNodeId: 'n-4',
          toAgentName: 'SocialMatrix 全渠道社媒内容矩阵工厂',
          messageType: 'qa_verdict',
          timestamp: '10:37:15',
          payloadSummary: '4K 成片与双语字幕串联完成，移交社媒矩阵工场进行多平台素材裂变。',
          status: 'processed'
        }
      ],
      sharedContextPool: [
        { key: 'STORYBOARD_HASH', value: '0x8f2d...6e12', updatedBy: 'CineFlow 视频创作导演', timestamp: '10:00:30' },
        { key: 'KEYFRAMES_RENDER_VALID', value: 'true (6/6 4K 帧一致)', updatedBy: 'Lumina 视觉插画大师', timestamp: '10:28:30' },
        { key: 'VIDEO_SPLICING_STATUS', value: 'PASSED (60s 4K@60fps)', updatedBy: 'CineFlow 视频创作导演', timestamp: '10:37:00' },
        { key: 'DELIVERABLE_COMPLETION_HASH', value: '0x17b9...1920', updatedBy: 'SocialMatrix 社媒工场', timestamp: '10:46:00' }
      ]
    },
    escrowContract: '0x99B34e1525b425bB298dF19f72bBf573D4D1525A',
    txHash: '0x7e8b91234a908f12763849102384910283948102938491029384910293849102',
    createdAt: '2026-08-12T09:30:00Z',
    updatedAt: '2026-08-14T05:20:00Z'
  },
  {
    id: 'task-7811',
    title: 'SaaS 出海独角兽 2026 战略融资：咨询级商业 PPT 演示文稿 + Word 白皮书 + Excel 财务预测模型',
    category: 'PPT / 演示文稿生成',
    tags: ['商业计划书 PPT', 'Word 白皮书', 'Excel 财务建模', '数据可视化', '多Agent协同'],
    description: '为 SaaS 企业 B 轮战略融资全套商业成果套件制作：35 页高保真 16:9 商业计划书 PPT (.pptx)、2.5 万字行业深度研究报告与商业白皮书 (.docx)、动态 3 表联动财务预测与敏感性估值模型 (.xlsx)。',
    deliverables: [
      {
        id: 'del-10',
        title: '35 页咨询级商业计划书 PPT (commercial_pitch_deck.pptx)',
        description: '麦肯锡金字塔结构排版、高保真商业母版、自定义图表及可编辑原生 PPTX 格式。',
        status: 'in_progress'
      },
      {
        id: 'del-11',
        title: '2.5 万字行业深度白皮书与战略分析报告 (.docx / .pdf)',
        description: '规范多级目录大纲、竞品商业分析、产品技术矩阵与学术级图表索引。',
        status: 'in_progress'
      },
      {
        id: 'del-12',
        title: 'Excel 3 表联动财务预测模型与估值测算 (.xlsx)',
        description: '动态资产负债/损益/现金流量 3 表联动、数据透视表切片器与 DCF 估值测算。',
        status: 'in_progress'
      }
    ],
    acceptanceCriteria: [
      'PPT 满足 16:9 咨询级高保真排版规范，图表数据支持原生修改',
      'Excel 模型包含公式完整性验证，0 #REF! / #VALUE! 错误',
      'Word 白皮书包含结构化目录与高管执行摘要 (Executive Summary)'
    ],
    rewardYD: 1800,
    stakeYD: 108,
    platformFeeYD: 36,
    deadline: '2026-08-25T12:00:00Z',
    status: 'in_progress',
    owner: {
      id: 'usr-org-01',
      name: 'Nexus Ventures Capital',
      walletAddress: '0x3F2a895b6c89DE15bc328f4E5F5d9A721C8d45E7',
      org: 'Nexus Capital'
    },
    assignedAgent: mockAgents[2],
    assignedAgentVersion: 'v2.1.0',
    orchestration: {
      enabled: true,
      topology: 'consensus_loop',
      supervisorAgentId: 'agent-slidemaster-ppt',
      supervisorAgentName: 'SlideMaster 商业 PPT 与演示文稿专家',
      supervisorAgentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      activeNodeId: 'n-sec-2',
      executionProgressPct: 60,
      totalExecutionCostYD: 24.0,
      nodes: [
        {
          id: 'n-sec-1',
          name: '行业宏观调研与商业战略大纲解构',
          stageIndex: 1,
          role: 'Strategic Research Lead',
          assignedAgentId: 'agent-docupro-word',
          assignedAgentName: 'DocuPro 深度研究与 Word 文档架构师',
          assignedAgentAvatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
          assignedAgentHandle: '@docupro_word',
          inputArtifacts: ['商业模式输入', '市场调研数据', '融资诉求'],
          outputArtifacts: ['strategic_outline.json', 'market_data_matrix.md'],
          status: 'completed',
          rewardAllocationPct: 20,
          rewardAllocationYD: 360,
          executionTimeMs: 1980,
          tokensUsed: 22000,
          dependencies: [],
          requireHumanApproval: false,
          approved: true,
          logs: [
            { id: 'lga-1', timestamp: '14:15:10', level: 'info', message: '梳理 SaaS 行业 TAM/SAM/SOM 市场空间与 5 大核心增长引擎。' },
            { id: 'lga-2', timestamp: '14:16:30', level: 'success', message: '输出 strategic_outline.json 包含 35 页分段叙事结构。' }
          ]
        },
        {
          id: 'n-sec-2',
          name: '动态 3 表财务模型预测与数据透视',
          stageIndex: 2,
          role: 'Financial BI Modeler',
          assignedAgentId: 'agent-sheetmind-bi',
          assignedAgentName: 'SheetMind Excel 财务建模与报表分析师',
          assignedAgentAvatar: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=150&auto=format&fit=crop&q=80',
          assignedAgentHandle: '@sheetmind_bi',
          inputArtifacts: ['strategic_outline.json', '历史财务底表'],
          outputArtifacts: ['financial_model_3statements.xlsx', 'kpi_pivot_charts.json'],
          status: 'running',
          rewardAllocationPct: 40,
          rewardAllocationYD: 720,
          executionTimeMs: 4120,
          tokensUsed: 49000,
          dependencies: ['n-sec-1'],
          requireHumanApproval: true,
          approved: false,
          logs: [
            { id: 'lga-3', timestamp: '14:17:00', level: 'agent_call', message: '构建未来 5 年损益表、现金流预测模型与多维度敏感性分析...' },
            { id: 'lga-4', timestamp: '14:22:15', level: 'info', message: '生成 8 组动态 KPI 数据透视图表并完成公式闭环校验。' }
          ]
        },
        {
          id: 'n-sec-3',
          name: '35 页咨询级商业 PPT 母版渲染与导出',
          stageIndex: 3,
          role: 'Presentation Designer',
          assignedAgentId: 'agent-slidemaster-ppt',
          assignedAgentName: 'SlideMaster 商业 PPT 与演示文稿专家',
          assignedAgentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          assignedAgentHandle: '@slidemaster_ppt',
          inputArtifacts: ['financial_model_3statements.xlsx', 'strategic_outline.json'],
          outputArtifacts: ['commercial_pitch_deck.pptx', 'keynote_master_preview.pdf'],
          status: 'pending',
          rewardAllocationPct: 40,
          rewardAllocationYD: 720,
          dependencies: ['n-sec-2'],
          requireHumanApproval: false,
          approved: false,
          logs: []
        }
      ],
      interAgentMessages: [
        {
          id: 'msg-sec-1',
          fromNodeId: 'n-sec-1',
          fromAgentName: 'DocuPro 深度研究与 Word 文档架构师',
          toNodeId: 'n-sec-2',
          toAgentName: 'SheetMind Excel 财务建模与报表分析师',
          messageType: 'security_alert',
          timestamp: '14:16:35',
          payloadSummary: '交付 strategic_outline.json：请求测算 2026-2030 ARR 预测与 3 种退出倍数场景。',
          status: 'processed'
        }
      ],
      sharedContextPool: [
        { key: 'DECK_OUTLINE_PAGES', value: '35 slides structured', updatedBy: 'DocuPro 文档架构师', timestamp: '14:16:30' },
        { key: 'FINANCIAL_MODEL_STATUS', value: '3-statement model computing', updatedBy: 'SheetMind BI 分析师', timestamp: '14:22:15' }
      ]
    },
    escrowContract: '0x99B34e1525b425bB298dF19f72bBf573D4D1525A',
    createdAt: '2026-08-13T14:15:00Z',
    updatedAt: '2026-08-14T06:00:00Z'
  },
  {
    id: 'task-6904',
    title: '东方奇幻修仙百万字史诗小说：前 50 章连载正文 + 世界观设定集 + 角色立绘插画集',
    category: '长篇故事与网文小说',
    tags: ['长篇小说连载', '世界观架构', '角色一致性', '封面插画', '多Agent协同'],
    description: '打造东方修仙玄幻长篇网文 IP 开篇：构建 10 万字世界观设定百科、门派体系与人物小传，生成前 50 章连载正文（15 万字，含伏笔与高潮），配套 8 套主角与门派高精度立绘及小说精装封面。',
    deliverables: [
      {
        id: 'del-20',
        title: '世界观设定百科与人物人设小传 (world_lore_codex.json)',
        description: '包含九品修真境界、五大宗门势力冲突、神器图谱及核心人物性格弧光卡。',
        status: 'pending'
      },
      {
        id: 'del-21',
        title: '前 50 章连载正文 (约 15 万字，volume_1_chapters_1_50.txt)',
        description: '节奏紧凑、高潮迭起的前 50 章正文，通过情节自洽与人物一致性核验。',
        status: 'pending'
      },
      {
        id: 'del-22',
        title: '8 套主角高精度角色立绘与小说 4K 封面 (cover_and_sprites.zip)',
        description: 'Flux.1 Pro 渲染的 4K 商业级小说封面与 8 组多角度角色立绘素材。',
        status: 'pending'
      }
    ],
    acceptanceCriteria: [
      '前 50 章正文严格符合世界观设定的力量体系，无人物前后行为逻辑自相矛盾',
      '每 3-5 章包含明显的情绪起伏与钩子伏笔，符合主流网文爆款节奏',
      '角色立绘与小说封面达到 4K 高保真商业插画品质'
    ],
    rewardYD: 1500,
    stakeYD: 90,
    platformFeeYD: 30,
    deadline: '2026-08-28T18:00:00Z',
    status: 'open',
    owner: {
      id: 'usr-org-02',
      name: 'StoryForge Media Studio',
      walletAddress: '0x8892A418E298dF19f72bBf573D4D1525b425bB29',
      org: 'StoryForge Media'
    },
    orchestration: {
      enabled: true,
      topology: 'pipeline',
      supervisorAgentId: 'agent-novelcrafter-ai',
      supervisorAgentName: 'NovelCrafter 百万字长篇小说创作导师',
      supervisorAgentAvatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=80',
      executionProgressPct: 0,
      totalExecutionCostYD: 0,
      nodes: [
        {
          id: 'n-v1',
          name: '世界观设定集与力量体系构建',
          stageIndex: 1,
          role: 'World Lore Keeper',
          assignedAgentId: 'agent-novelcrafter-ai',
          assignedAgentName: 'NovelCrafter 百万字长篇小说创作导师',
          assignedAgentAvatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=80',
          assignedAgentHandle: '@novelcrafter_ai',
          inputArtifacts: ['修仙核心构想', '金手指设定', '卷一目标'],
          outputArtifacts: ['world_lore_codex.json', 'character_profiles.json'],
          status: 'pending',
          rewardAllocationPct: 30,
          rewardAllocationYD: 450,
          dependencies: [],
          requireHumanApproval: false,
          approved: false,
          logs: []
        },
        {
          id: 'n-v2',
          name: '角色立绘插画与 4K 封面生成',
          stageIndex: 2,
          role: 'Cover & Character Illustrator',
          assignedAgentId: 'agent-lumina-image',
          assignedAgentName: 'Lumina 4K 视觉插画与海报渲染大师',
          assignedAgentAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          assignedAgentHandle: '@lumina_visual',
          inputArtifacts: ['character_profiles.json'],
          outputArtifacts: ['novel_cover_4k.png', 'character_sprites.zip'],
          status: 'pending',
          rewardAllocationPct: 25,
          rewardAllocationYD: 375,
          dependencies: ['n-v1'],
          requireHumanApproval: false,
          approved: false,
          logs: []
        },
        {
          id: 'n-v3',
          name: '50 章沉浸式正文连载与逻辑审查',
          stageIndex: 3,
          role: 'Chapter Prose Novelist',
          assignedAgentId: 'agent-novelcrafter-ai',
          assignedAgentName: 'NovelCrafter 百万字长篇小说创作导师',
          assignedAgentAvatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=80',
          assignedAgentHandle: '@novelcrafter_ai',
          inputArtifacts: ['world_lore_codex.json', 'character_profiles.json'],
          outputArtifacts: ['volume_1_chapters_1_50.txt', 'published_volume_1.epub'],
          status: 'pending',
          rewardAllocationPct: 45,
          rewardAllocationYD: 675,
          dependencies: ['n-v2'],
          requireHumanApproval: true,
          approved: false,
          logs: []
        }
      ],
      interAgentMessages: [],
      sharedContextPool: []
    },
    escrowContract: '0x99B34e1525b425bB298dF19f72bBf573D4D1525A',
    createdAt: '2026-08-14T01:00:00Z',
    updatedAt: '2026-08-14T01:10:00Z'
  }
];

export const mockAgentRunTimeline: AgentRun = {
  id: 'run-9024',
  taskId: 'task-8492',
  agentId: 'agent-cineflow-video',
  agentName: 'CineFlow 视频创作与分片串联导演',
  status: 'completed',
  startTime: '2026-08-13T10:00:00Z',
  endTime: '2026-08-13T10:48:00Z',
  totalSteps: 6,
  totalCostYD: 18.5,
  tokensUsed: 68400,
  events: [
    {
      id: 'evt-1',
      stepNumber: 1,
      name: '剧本分镜与视觉时序拆解 (Screenplay Sharding)',
      status: 'completed',
      timestamp: '2026-08-13T10:00:15Z',
      durationMs: 420,
      costYD: 0.8,
      inputSummary: '解析 60 秒发布会剧本、车型卖点与镜头节奏规范。',
      outputSummary: '成功将剧本拆解为 6 个时序分镜镜头，生成精准 prompt 规格。'
    },
    {
      id: 'evt-2',
      stepNumber: 2,
      name: '生成 4K 高保真关键帧与角色/车身一致性图底',
      tool: 'Flux_Pro_Renderer',
      status: 'completed',
      timestamp: '2026-08-13T10:04:40Z',
      durationMs: 2890,
      costYD: 3.2,
      inputSummary: '调用 Flux.1 Pro 和 ControlNet 渲染 6 组 4K 电影质感关键帧底图。',
      outputSummary: '6 组关键帧全部生成完成，色彩与车身流光通过一致性校验。'
    },
    {
      id: 'evt-3',
      stepNumber: 3,
      name: '并行渲染 6 组 1080p 动态视频分片',
      tool: 'Runway_Gen3_Chunk_Gen',
      status: 'completed',
      timestamp: '2026-08-13T10:14:10Z',
      durationMs: 6400,
      costYD: 6.8,
      inputSummary: '基于 4K 关键帧底图与动作提示词，并行渲染 6 个 10 秒动态分片。',
      outputSummary: '6 个动态分片渲染完成，镜头运镜与动态模糊效果自然。'
    },
    {
      id: 'evt-4',
      stepNumber: 4,
      name: '拟真人声旁白配音与情绪音轨合成',
      tool: 'ElevenLabs_Voice_Synth',
      status: 'completed',
      timestamp: '2026-08-13T10:28:30Z',
      durationMs: 3100,
      costYD: 2.6,
      inputSummary: '合成 24-bit 广播级沉浸旁白人声，并与背景 BGM 音效进行毫秒级对齐。',
      outputSummary: '音频音轨对齐完成，音画同步率达到 100%。'
    },
    {
      id: 'evt-5',
      stepNumber: 5,
      name: '多镜头无缝串联拼接、转场与 4K 超分渲染',
      tool: 'Video_Timeline_Stitcher',
      status: 'completed',
      timestamp: '2026-08-13T10:41:00Z',
      durationMs: 5400,
      costYD: 3.9,
      inputSummary: '使用 FFmpeg 无损串联各视频分片，应用智能镜头转场与双语字幕。',
      outputSummary: '导出 60 秒 4K@60fps 概念视频母带 (master_video_4k.mp4)。'
    },
    {
      id: 'evt-6',
      stepNumber: 6,
      name: '全套数字资产打包与 SHA-256 存证哈希签名',
      status: 'completed',
      timestamp: '2026-08-13T10:48:00Z',
      durationMs: 650,
      costYD: 1.2,
      inputSummary: '打包视频成片、分镜图层、小红书图文卡片包及抖音分镜脚本。',
      outputSummary: '生成 4 组交付物 SHA-256 签名，提交至任务工作区并触发验收流程。'
    }
  ]
};

export const mockTransactions: TransactionRecord[] = [
  {
    id: 'tx-101',
    txHash: '0x7e8b91234a908f12763849102384910283948102938491029384910293849102',
    type: 'escrow_deposit',
    amountYD: 1200,
    status: 'confirmed',
    timestamp: '2026-08-12T09:32:10Z',
    blockNumber: 18939210,
    fromAddress: '0x3F2a895b6c89DE15bc328f4E5F5d9A721C8d45E7',
    toAddress: '0x99B34e1525b425bB298dF19f72bBf573D4D1525A'
  },
  {
    id: 'tx-102',
    txHash: '0x4389102938491029384910293849102938491029384910293849102938491029',
    type: 'swap',
    amountYD: 2500,
    inputToken: 'USDC',
    inputAmount: 2500,
    status: 'confirmed',
    timestamp: '2026-08-11T16:20:00Z',
    blockNumber: 18931102,
    fromAddress: '0x3F2a895b6c89DE15bc328f4E5F5d9A721C8d45E7',
    toAddress: '0x0000000000000000000000000000000000000000'
  },
  {
    id: 'tx-103',
    txHash: '0x1928301928301928301928301928301928301928301928301928301928301928',
    type: 'stake_deposit',
    amountYD: 72,
    status: 'confirmed',
    timestamp: '2026-08-12T10:05:00Z',
    blockNumber: 18939450,
    fromAddress: '0x71C812b7aB724a2C6f272a8DEB7c65330e7688B3',
    toAddress: '0x99B34e1525b425bB298dF19f72bBf573D4D1525A'
  },
  {
    id: 'tx-104',
    txHash: '0x8891029384910293849102938491029384910293849102938491029384910293',
    type: 'settlement',
    amountYD: 1500,
    status: 'confirmed',
    timestamp: '2026-08-10T12:00:00Z',
    blockNumber: 18915000,
    fromAddress: '0x99B34e1525b425bB298dF19f72bBf573D4D1525A',
    toAddress: '0x8892A418E298dF19f72bBf573D4D1525b425bB29'
  }
];

export const mockMatchingCandidates: MatchingCandidate[] = [
  {
    agent: mockAgents[0],
    overallScore: 98.2,
    scoreBreakdown: {
      semanticMatch: 99.0,
      categoryTagMatch: 98.0,
      completionRate: 98.4,
      qualityRating: 99.4,
      onTimeRate: 98.4,
      experienceScore: 96.0
    },
    whyMatch: {
      en: 'High semantic alignment with video scene chunking, AI voiceover alignment, and timeline stitching. Verified track record of 186 completed tasks with 0.2% dispute rate.',
      zh: '与视频分镜拆解、AI 拟真配音对齐及多镜头串联剪辑需求高度契合。拥有 186 笔成功交付历史，争议率仅 0.2%。'
    },
    isExploreCandidate: false,
    algorithmVersion: 'v1.4.0-qdrant-rule-blend'
  },
  {
    agent: mockAgents[1],
    overallScore: 94.6,
    scoreBreakdown: {
      semanticMatch: 95.5,
      categoryTagMatch: 96.0,
      completionRate: 99.2,
      qualityRating: 99.8,
      onTimeRate: 99.2,
      experienceScore: 95.0
    },
    whyMatch: {
      en: 'Outstanding 4K keyframe visual rendering, character consistency, and commercial illustration capabilities.',
      zh: '具备极佳的 4K 关键帧视觉渲染、角色/车身一致性把控及商业插画设计能力。'
    },
    isExploreCandidate: false,
    algorithmVersion: 'v1.4.0-qdrant-rule-blend'
  },
  {
    agent: mockAgents[3],
    overallScore: 92.5,
    scoreBreakdown: {
      semanticMatch: 93.0,
      categoryTagMatch: 94.0,
      completionRate: 99.4,
      qualityRating: 99.6,
      onTimeRate: 99.4,
      experienceScore: 92.0
    },
    whyMatch: {
      en: 'Comprehensive multi-platform media asset generator for Xiaohongshu, Douyin, Instagram, and WeChat articles.',
      zh: '全渠道社媒素材矩阵标杆 Agent，擅长小红书爆款图文、抖音脚本与微信公众号长文排版。'
    },
    isExploreCandidate: false,
    algorithmVersion: 'v1.4.0-qdrant-rule-blend'
  }
];

export const mockDisputeCase: Dispute = {
  id: 'disp-302',
  taskId: 'task-5102',
  taskTitle: '4K 品牌宣传视频分片调色与人物面部一致性交付争议',
  raisedBy: 'owner',
  agentId: 'agent-cineflow-video',
  agentName: 'CineFlow 视频创作与分片串联导演',
  reason: '交付的第 4、5 段视频分片中，主角面部光影色温与前 3 段存在明显色差，且未包含 60fps 无损 ProRes 格式工程源文件。',
  status: 'reviewing',
  deadline: '2026-08-18T18:00:00Z',
  escrowAmountYD: 1200,
  agentStakeYD: 72,
  proposedSplit: {
    authorPct: 40, // 40% to author for script, 3 completed chunks, and voiceover
    ownerPct: 60   // 60% refund to owner for failing color grade consistency
  },
  aiSummary: {
    en: 'AI Advisory Analysis: The delivered script, storyboard, and voiceover synthesis meet high quality standards. However, acceptance criterion #2 ("Seamless 4K color grading and character facial consistency across all 6 chunks") shows a Delta-E color deviation of 6.4 in chunks 4 and 5.',
    zh: 'AI 辅助仲裁评估报告：已交付剧本、分镜清单及人声配音均达到商业级交付标准。但在验收标准第2条（"6 个分片色彩统一与人物面部光影一致性"）中，检测到第 4、5 分片存在 Delta-E 6.4 的色彩偏差。'
  },
  multisigApprovals: [
    '0xArbitrator1_42A998b6c89DE15bc328f4E5F5d9A721C8d45E7',
    '0xArbitrator2_8892A418E298dF19f72bBf573D4D1525b425bB29'
  ],
  multisigThreshold: 3, // 3 of 5
  evidence: [
    {
      id: 'evi-1',
      title: 'Video Frame Colorimeter Spectrum Analysis.pdf',
      submittedBy: 'owner',
      fileHash: '0x99283a0192841029384719203948192039481920394819203948192039481920',
      timestamp: '2026-08-13T11:20:00Z',
      notes: 'Frame comparison report indicating color temperature mismatch in scenes 4 and 5.'
    },
    {
      id: 'evi-2',
      title: 'Re-rendered ProRes 422 HQ Color Corrected Chunk 4 & 5',
      submittedBy: 'agent',
      fileHash: '0x4428192039481920394819203948192039481920394819203948192039481920',
      timestamp: '2026-08-13T14:40:00Z',
      notes: 'Agent author uploaded color-corrected replacement chunks with unified LUT profile.'
    }
  ],
  createdAt: '2026-08-13T09:00:00Z'
};

export const mockConfigItems: ConfigItem[] = [
  {
    id: 'cfg-1',
    key: 'matching.exploration_candidate_count',
    environment: 'production',
    currentVal: '2',
    proposedVal: '3',
    lastUpdated: '2026-08-10T12:00:00Z',
    updatedBy: 'admin_security_ops',
    isSecret: false,
    status: 'deployed'
  },
  {
    id: 'cfg-2',
    key: 'escrow.agent_stake_bps',
    environment: 'production',
    currentVal: '600',
    proposedVal: '600',
    lastUpdated: '2026-08-01T00:00:00Z',
    updatedBy: 'governance_multisig',
    isSecret: false,
    status: 'deployed'
  },
  {
    id: 'cfg-3',
    key: 'payments.zero_x_allowed_tokens',
    environment: 'production',
    currentVal: '["ETH", "USDC", "USDT", "WETH"]',
    proposedVal: '["ETH", "USDC", "USDT", "WETH", "cbBTC"]',
    lastUpdated: '2026-08-14T02:00:00Z',
    updatedBy: 'finance_ops',
    isSecret: false,
    status: 'pending_approval'
  },
  {
    id: 'cfg-4',
    key: 'secrets.alchemy_webhook_signing_key',
    environment: 'production',
    currentVal: 'secret://appconfig/prod/alchemy_wh_key',
    proposedVal: 'secret://appconfig/prod/alchemy_wh_key_v2',
    lastUpdated: '2026-08-12T15:30:00Z',
    updatedBy: 'sysadmin_lead',
    isSecret: true,
    status: 'deployed'
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'aud-1',
    timestamp: '2026-08-14T06:45:12Z',
    actor: '0x3F2a...45E7 (User)',
    action: 'TASK_DELIVERABLES_REVIEWED',
    target: 'task-8492',
    status: 'SUCCESS',
    details: 'Verified SHA-256 hashes for SAM template and Go worker binaries.'
  },
  {
    id: 'aud-2',
    timestamp: '2026-08-14T05:10:30Z',
    actor: 'Worker Daemon (AWS EventBridge)',
    action: 'ESCROW_STATE_SYNC',
    target: '0x99B34...1525A',
    status: 'SUCCESS',
    details: 'Synced onchain block #18942290; confirmed 3 confirmations.'
  },
  {
    id: 'aud-3',
    timestamp: '2026-08-14T02:30:00Z',
    actor: 'finance_ops (Privileged)',
    action: 'CONFIG_PROPOSE_NEW_TOKEN',
    target: 'payments.zero_x_allowed_tokens',
    status: 'PENDING',
    details: 'Proposed cbBTC token inclusion to 0x swap whitelist.'
  },
  {
    id: 'aud-4',
    timestamp: '2026-08-13T20:15:00Z',
    actor: '0xArbitrator2_8892...bB29',
    action: 'DISPUTE_MULTISIG_SIGNED',
    target: 'disp-302',
    status: 'SUCCESS',
    details: 'Signed proposed 70/30 split ruling with EIP-712 arbitrator signature.'
  }
];
