export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  email: string;
  org: string;
  bio: string;
  role: string;
  telegram?: string;
  github?: string;
  twitter?: string;
  apiKey: string;
  notificationSettings: {
    emailOnTaskSettled: boolean;
    emailOnDispute: boolean;
    browserPushOnMilestone: boolean;
    telegramAlerts: boolean;
  };
}

export type ThemeMode = 'dark' | 'light';
export type Locale = 'zh-CN' | 'en-US';
export type SurfaceType = 'marketplace' | 'admin';

export type TaskStatus =
  | 'draft'
  | 'awaiting_funding'
  | 'open'
  | 'assigned'
  | 'awaiting_stake'
  | 'in_progress'
  | 'submitted'
  | 'completed'
  | 'settled'
  | 'cancelled'
  | 'disputed'
  | 'refunded';

export type AgentStatus = 'draft' | 'pending' | 'active' | 'paused' | 'suspended';

export type WalletRole = 'identity' | 'payment' | 'payout' | 'execution';

export interface WalletBalance {
  YD: number;
  ETH: number;
  USDC: number;
  USDT: number;
  WETH: number;
}

export interface UserWallet {
  id: string;
  address: string;
  name: string;
  provider: 'privy_embedded' | 'metamask' | 'walletconnect' | 'coinbase';
  roles: WalletRole[];
  verified: boolean;
  balances: WalletBalance;
  isDefaultPayment?: boolean;
  isDefaultPayout?: boolean;
  createdAt: string;
}

export interface AgentTrustMetrics {
  completedTasks: number;
  onTimeRate: number; // e.g. 98.4
  qualityRating: number; // e.g. 4.95
  communicationRating: number;
  disputeRate: number; // e.g. 0.4
  lastActive: string;
  totalEarnedYD: number;
}

export interface AgentRuntimeConstraints {
  maxSteps: number;
  maxTokens: number;
  maxCostYD: number;
  timeoutSeconds: number;
  allowedTools: string[];
}

export interface Agent {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  summary: string;
  category: string;
  tags: string[];
  version: string;
  verified: boolean;
  status: AgentStatus;
  priceYD: number;
  pricingModel: 'per_task' | 'milestone' | 'hourly';
  author: {
    id: string;
    name: string;
    avatar?: string;
    payoutWallet: string;
    reputation: number;
  };
  metrics: AgentTrustMetrics;
  capabilities: string[];
  supportedTools: string[];
  runtimeConstraints: AgentRuntimeConstraints;
  matchScore?: number;
  whyMatch?: string;
  isExploreCandidate?: boolean;
  descriptionZh?: string;
  descriptionEn?: string;
}

export type OrchestrationTopology = 'pipeline' | 'hierarchical' | 'parallel_swarm' | 'consensus_loop' | 'custom_dag';
export type OrchestrationStageStatus = 'pending' | 'running' | 'completed' | 'failed' | 'waiting_approval' | 'skipped';
export type OrchestrationNodeType = 'agent_worker' | 'llm_router' | 'hitl_gate' | 'tool_sandbox' | 'consensus_judge' | 'aggregator';

export interface OrchestrationNodePort {
  id: string;
  name: string;
  type: 'string' | 'object' | 'artifact' | 'signal' | 'any';
  description?: string;
}

export interface OrchestrationEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
  animated?: boolean;
  condition?: string;
  status?: 'active' | 'completed' | 'idle';
}

export interface OrchestrationNodeLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'success' | 'agent_call';
  message: string;
  dataPayload?: any;
}

export interface OrchestrationNode {
  id: string;
  name: string;
  stageIndex: number;
  nodeType?: OrchestrationNodeType;
  position?: { x: number; y: number };
  role: string;
  assignedAgentId: string;
  assignedAgentName: string;
  assignedAgentAvatar: string;
  assignedAgentHandle: string;
  inputArtifacts: string[];
  outputArtifacts: string[];
  inputPorts?: OrchestrationNodePort[];
  outputPorts?: OrchestrationNodePort[];
  status: OrchestrationStageStatus;
  rewardAllocationPct: number; // e.g. 30 (%)
  rewardAllocationYD: number;  // e.g. 300 (YD)
  executionTimeMs?: number;
  tokensUsed?: number;
  dependencies: string[]; // parent node ids
  requireHumanApproval: boolean;
  approved?: boolean;
  systemPromptSnippet?: string;
  customConfig?: Record<string, any>;
  logs: OrchestrationNodeLog[];
}

export interface InterAgentMessage {
  id: string;
  fromNodeId: string;
  fromAgentName: string;
  toNodeId: string;
  toAgentName: string;
  messageType: 'spec_handoff' | 'code_review' | 'security_alert' | 'qa_verdict' | 'approval_request' | 'data_payload';
  timestamp: string;
  payloadSummary: string;
  fullDataPayload?: string;
  status: 'delivered' | 'processed' | 'waiting_review';
}

export interface SharedContextItem {
  key: string;
  value: string;
  updatedBy: string;
  timestamp: string;
}

export interface TaskOrchestration {
  enabled: boolean;
  topology: OrchestrationTopology;
  supervisorAgentId?: string;
  supervisorAgentName?: string;
  supervisorAgentAvatar?: string;
  nodes: OrchestrationNode[];
  edges?: OrchestrationEdge[];
  interAgentMessages: InterAgentMessage[];
  sharedContextPool: SharedContextItem[];
  activeNodeId?: string;
  executionProgressPct: number;
  totalExecutionCostYD: number;
  isSimulationRunning?: boolean;
  canvasTransform?: { x: number; y: number; zoom: number };
}

export interface TaskDeliverable {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'approved';
  fileUrl?: string;
  deliverableHash?: string;
}

export interface Task {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  deliverables: TaskDeliverable[];
  acceptanceCriteria: string[];
  rewardYD: number;
  stakeYD: number; // typically 6% (600 bps)
  platformFeeYD: number;
  deadline: string;
  status: TaskStatus;
  owner: {
    id: string;
    name: string;
    walletAddress: string;
    org: string;
  };
  assignedAgent?: Agent;
  assignedAgentVersion?: string;
  orchestration?: TaskOrchestration;
  escrowContract: string;
  txHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  stepNumber: number;
  name: string;
  tool?: string;
  status: 'completed' | 'in_progress' | 'waiting_approval' | 'failed';
  timestamp: string;
  durationMs: number;
  costYD: number;
  requiresApproval?: boolean;
  approvedBy?: string;
  inputSummary: string;
  outputSummary?: string;
  error?: string;
}

export interface AgentRun {
  id: string;
  taskId: string;
  agentId: string;
  agentName: string;
  status: 'running' | 'paused_for_approval' | 'completed' | 'failed';
  startTime: string;
  endTime?: string;
  totalSteps: number;
  totalCostYD: number;
  tokensUsed: number;
  events: TimelineEvent[];
}

export interface MatchingCandidate {
  agent: Agent;
  overallScore: number;
  scoreBreakdown: {
    semanticMatch: number;
    categoryTagMatch: number;
    completionRate: number;
    qualityRating: number;
    onTimeRate: number;
    experienceScore: number;
  };
  whyMatch: {
    en: string;
    zh: string;
  };
  isExploreCandidate: boolean;
  algorithmVersion: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  submittedBy: 'owner' | 'agent' | 'system';
  fileHash: string;
  timestamp: string;
  notes: string;
}

export interface Dispute {
  id: string;
  taskId: string;
  taskTitle: string;
  raisedBy: 'owner' | 'agent';
  agentId: string;
  agentName: string;
  reason: string;
  status: 'evidence_collection' | 'reviewing' | 'resolved';
  deadline: string;
  escrowAmountYD: number;
  agentStakeYD: number;
  proposedSplit: {
    authorPct: number;
    ownerPct: number;
  };
  aiSummary: {
    en: string;
    zh: string;
  };
  multisigApprovals: string[]; // addresses that signed
  multisigThreshold: number; // e.g. 3 of 5
  evidence: EvidenceItem[];
  createdAt: string;
}

export interface TransactionRecord {
  id: string;
  txHash: string;
  type: 'swap' | 'escrow_deposit' | 'stake_deposit' | 'settlement' | 'refund' | 'dispute_payout';
  amountYD: number;
  inputToken?: string;
  inputAmount?: number;
  status: 'confirmed' | 'pending' | 'failed';
  timestamp: string;
  blockNumber: number;
  fromAddress: string;
  toAddress: string;
}

export interface SystemStatus {
  chainId: number;
  chainName: string;
  blockHeight: number;
  qdrantStatus: 'healthy' | 'degraded' | 'syncing';
  qdrantVectorCount: number;
  rpcLatencyMs: number;
  sqsOldestMsgSeconds: number;
  dlqCount: number;
  configVersion: string;
  alchemySyncStatus: 'synced' | 'catching_up';
}

export interface ConfigItem {
  id: string;
  key: string;
  environment: 'production' | 'staging' | 'dev';
  currentVal: string;
  proposedVal: string;
  lastUpdated: string;
  updatedBy: string;
  isSecret: boolean;
  status: 'active' | 'pending_approval' | 'deployed';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  status: 'SUCCESS' | 'DENIED' | 'PENDING';
  details: string;
}
