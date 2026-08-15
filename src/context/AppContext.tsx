import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ThemeMode,
  Locale,
  SurfaceType,
  UserWallet,
  Agent,
  Task,
  TransactionRecord,
  SystemStatus,
  TaskOrchestration,
  OrchestrationNode,
  OrchestrationEdge,
  UserProfile
} from '../types';
import { translations } from '../i18n/translations';
import {
  mockAgents,
  mockTasks,
  mockWallets,
  mockTransactions,
  mockSystemStatus,
  mockOrchestrationTemplates,
  mockUserProfile
} from '../data/mockData';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Theme & Locale
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: keyof typeof translations['en-US']) => string;

  // Surface & Navigation
  surface: SurfaceType;
  setSurface: (surface: SurfaceType) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;

  // Wallets & Balance
  wallets: UserWallet[];
  activeWallet: UserWallet;
  setActiveWalletId: (id: string) => void;
  ydBalance: number;
  acquireYD: (token: string, inputAmount: number, outputYD: number) => void;
  switchWalletRole: (walletId: string, role: string) => void;

  // Data & State
  agents: Agent[];
  tasks: Task[];
  activeTaskId: string;
  setActiveTaskId: (id: string) => void;
  activeTask: Task | undefined;
  transactions: TransactionRecord[];
  systemStatus: SystemStatus;

  // Selected entities for modals
  selectedAgent: Agent | null;
  setSelectedAgent: (agent: Agent | null) => void;
  compareAgents: Agent[];
  addToCompare: (agent: Agent) => void;
  removeFromCompare: (agentId: string) => void;
  clearCompare: () => void;

  // Global Modals
  isPublishWizardOpen: boolean;
  setIsPublishWizardOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutTargetTask: Task | null;
  openCheckoutForTask: (task: Task) => void;
  isAgentDetailOpen: boolean;
  setIsAgentDetailOpen: (open: boolean) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;

  // Actions
  publishNewTask: (taskData: Partial<Task>) => void;
  acceptTaskDeliverables: (taskId: string) => void;
  raiseTaskDispute: (taskId: string, reason: string) => void;
  assignAgentToTask: (taskId: string, agent: Agent) => void;

  // Multi-Agent Orchestration Actions
  updateTaskOrchestration: (taskId: string, orchestration: TaskOrchestration) => void;
  executeOrchestrationStep: (taskId: string) => void;
  approveOrchestrationNode: (taskId: string, nodeId: string) => void;
  applyOrchestrationTemplate: (taskId: string, templateId: string) => void;
  addOrchestrationNode: (taskId: string, node: Partial<OrchestrationNode>) => void;
  removeOrchestrationNode: (taskId: string, nodeId: string) => void;
  updateNodePosition: (taskId: string, nodeId: string, pos: { x: number; y: number }) => void;
  updateNodeData: (taskId: string, nodeId: string, updates: Partial<OrchestrationNode>) => void;
  addOrchestrationEdge: (taskId: string, edge: OrchestrationEdge) => void;
  removeOrchestrationEdge: (taskId: string, edgeId: string) => void;
  autoLayoutNodes: (taskId: string) => void;
  duplicateNode: (taskId: string, nodeId: string) => void;
  resetTaskOrchestration: (taskId: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: dark default as specified in design brief
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('x_agents_theme');
    return (saved as ThemeMode) || 'dark';
  });

  // Locale state: Chinese default or detected
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('x_agents_locale');
    return (saved as Locale) || 'zh-CN';
  });

  // Surface: Marketplace vs Operations Console
  const [surface, setSurface] = useState<SurfaceType>('marketplace');
  const [activeTab, setActiveTab] = useState<string>('overview');

  // User Profile
  const [userProfile, setUserProfileState] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('x_agents_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return mockUserProfile;
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfileState((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem('x_agents_user_profile', JSON.stringify(next));
      return next;
    });
    showToast(
      locale === 'zh-CN' ? '个人信息维护成功，已同步全局配置！' : 'User profile successfully updated and synchronized!',
      'success'
    );
  };

  // Wallets & Transactions
  const [wallets, setWallets] = useState<UserWallet[]>(mockWallets);
  const [activeWalletId, setActiveWalletIdState] = useState<string>(mockWallets[0].id);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [activeTaskId, setActiveTaskId] = useState<string>(mockTasks[0].id);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(mockTransactions);
  const [systemStatus] = useState<SystemStatus>(mockSystemStatus);

  // Modals & Selection
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [compareAgents, setCompareAgents] = useState<Agent[]>([]);
  const [isPublishWizardOpen, setIsPublishWizardOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutTargetTask, setCheckoutTargetTask] = useState<Task | null>(null);
  const [isAgentDetailOpen, setIsAgentDetailOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('x_agents_theme', newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('x_agents_locale', newLocale);
  };

  const toggleLocale = () => {
    const next = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
    setLocale(next);
  };

  const t = (key: keyof typeof translations['en-US']): string => {
    const dict = translations[locale] || translations['en-US'];
    return dict[key] || translations['en-US'][key] || String(key);
  };

  // Sync document class with theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('theme-dark', 'dark');
      root.classList.remove('theme-light');
      document.body.style.backgroundColor = '#07111F';
      document.body.style.color = '#F4F7FB';
    } else {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark', 'dark');
      document.body.style.backgroundColor = '#F6F8FB';
      document.body.style.color = '#0F172A';
    }
  }, [theme]);

  const activeWallet = wallets.find((w) => w.id === activeWalletId) || wallets[0];
  const ydBalance = activeWallet?.balances?.YD || 0;
  const activeTask = tasks.find((t) => t.id === activeTaskId) || tasks[0];

  const setActiveWalletId = (id: string) => {
    setActiveWalletIdState(id);
    const target = wallets.find((w) => w.id === id);
    if (target) {
      showToast(`${t('switch_wallet')}: ${target.name}`, 'info');
    }
  };

  const switchWalletRole = (walletId: string, role: string) => {
    setWallets((prev) =>
      prev.map((w) => {
        if (w.id === walletId) {
          const hasRole = w.roles.includes(role as any);
          const newRoles = hasRole
            ? w.roles.filter((r) => r !== role)
            : [...w.roles, role as any];
          return { ...w, roles: newRoles };
        }
        return w;
      })
    );
    showToast(`Wallet role updated successfully`, 'success');
  };

  const acquireYD = (token: string, inputAmount: number, outputYD: number) => {
    setWallets((prev) =>
      prev.map((w) => {
        if (w.id === activeWallet.id) {
          const currentYD = w.balances.YD;
          const currentToken = (w.balances as any)[token] || 0;
          return {
            ...w,
            balances: {
              ...w.balances,
              YD: currentYD + outputYD,
              [token]: Math.max(0, currentToken - inputAmount)
            }
          };
        }
        return w;
      })
    );

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      txHash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
      type: 'swap',
      amountYD: outputYD,
      inputToken: token,
      inputAmount: inputAmount,
      status: 'confirmed',
      timestamp: new Date().toISOString(),
      blockNumber: systemStatus.blockHeight + 1,
      fromAddress: activeWallet.address,
      toAddress: '0x0000000000000000000000000000000000000000'
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Swapped ${inputAmount} ${token} for ${outputYD.toLocaleString()} YD (Confirmed onchain)`, 'success');
  };

  const openCheckoutForTask = (task: Task) => {
    setCheckoutTargetTask(task);
    setIsCheckoutOpen(true);
  };

  const addToCompare = (agent: Agent) => {
    if (compareAgents.some((a) => a.id === agent.id)) return;
    if (compareAgents.length >= 3) {
      showToast(locale === 'zh-CN' ? '最多同时横向对比 3 个 Agent' : 'You can compare up to 3 agents simultaneously', 'warning');
      return;
    }
    setCompareAgents((prev) => [...prev, agent]);
    showToast(locale === 'zh-CN' ? `已加入对比: ${agent.name}` : `Added to comparison: ${agent.name}`, 'info');
  };

  const removeFromCompare = (agentId: string) => {
    setCompareAgents((prev) => prev.filter((a) => a.id !== agentId));
  };

  const clearCompare = () => {
    setCompareAgents([]);
  };

  const publishNewTask = (taskData: Partial<Task>) => {
    const taskId = `task-${Math.floor(1000 + Math.random() * 9000)}`;
    const reward = taskData.rewardYD || 1000;
    const stake = Math.round(reward * 0.06);
    const fee = Math.round(reward * 0.02);

    const newTask: Task = {
      id: taskId,
      title: taskData.title || 'Untitled Technical Task',
      category: taskData.category || 'Cloud & Infrastructure',
      tags: taskData.tags || ['Go', 'AWS'],
      description: taskData.description || '',
      deliverables: taskData.deliverables || [
        {
          id: 'del-new-1',
          title: 'Initial Module Deliverable',
          description: 'Core source code repository and deployment documentation.',
          status: 'pending'
        }
      ],
      acceptanceCriteria: taskData.acceptanceCriteria || [
        'Automated CI/CD build passes with 0 lint warnings',
        'Demonstrate end-to-end functionality in staging environment'
      ],
      rewardYD: reward,
      stakeYD: stake,
      platformFeeYD: fee,
      deadline: taskData.deadline || new Date(Date.now() + 7 * 86400000).toISOString(),
      status: 'open',
      owner: {
        id: 'usr-org-01',
        name: 'Nexus Liquidity Corp',
        walletAddress: activeWallet.address,
        org: 'Nexus Trading'
      },
      escrowContract: '0x99B34e1525b425bB298dF19f72bBf573D4D1525A',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Deduct YD from active wallet
    setWallets((prev) =>
      prev.map((w) => {
        if (w.id === activeWallet.id) {
          return {
            ...w,
            balances: {
              ...w.balances,
              YD: Math.max(0, w.balances.YD - (reward + fee))
            }
          };
        }
        return w;
      })
    );

    const newTx: TransactionRecord = {
      id: `tx-${Date.now()}`,
      txHash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
      type: 'escrow_deposit',
      amountYD: reward + fee,
      status: 'confirmed',
      timestamp: new Date().toISOString(),
      blockNumber: systemStatus.blockHeight + 2,
      fromAddress: activeWallet.address,
      toAddress: '0x99B34e1525b425bB298dF19f72bBf573D4D1525A'
    };

    setTransactions((prev) => [newTx, ...prev]);
    setTasks((prev) => [newTask, ...prev]);
    setActiveTaskId(taskId);
    setIsPublishWizardOpen(false);
    showToast(t('toast_task_published'), 'success');
  };

  const acceptTaskDeliverables = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return { ...t, status: 'settled' };
        }
        return t;
      })
    );
    showToast(t('toast_funds_settled'), 'success');
  };

  const raiseTaskDispute = (taskId: string, reason: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return { ...t, status: 'disputed' };
        }
        return t;
      })
    );
    showToast(t('toast_dispute_opened'), 'warning');
  };

  const assignAgentToTask = (taskId: string, agent: Agent) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            assignedAgent: agent,
            assignedAgentVersion: agent.version,
            status: 'assigned'
          };
        }
        return t;
      })
    );
    setActiveTaskId(taskId);
    setActiveTab('workspace');
    showToast(locale === 'zh-CN' ? `已指派 ${agent.name} 处理任务` : `Assigned ${agent.name} to task`, 'success');
  };

  const updateTaskOrchestration = (taskId: string, orchestration: TaskOrchestration) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, orchestration } : t))
    );
    showToast(locale === 'zh-CN' ? '已更新 Multi-Agent 编排配置' : 'Updated Multi-Agent orchestration topology', 'info');
  };

  const executeOrchestrationStep = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || !t.orchestration || !t.orchestration.nodes.length) return t;
        const nodes = [...t.orchestration.nodes];
        // Find next non-completed node
        const nextNodeIndex = nodes.findIndex((n) => n.status === 'pending' || n.status === 'running');
        if (nextNodeIndex === -1) {
          showToast(locale === 'zh-CN' ? '所有编排节点均已执行完毕' : 'All orchestration stages already completed', 'info');
          return t;
        }

        const currentNode = nodes[nextNodeIndex];

        // Check if previous node required approval and wasn't approved
        if (currentNode.requireHumanApproval && !currentNode.approved && currentNode.status === 'running') {
          showToast(locale === 'zh-CN' ? '需人工签署放行当前门禁后方可继续执行' : 'Human-in-the-loop approval required before advancing', 'warning');
          return t;
        }

        // Advance this node to completed
        const nowStr = new Date().toLocaleTimeString();
        nodes[nextNodeIndex] = {
          ...currentNode,
          status: 'completed',
          approved: true,
          executionTimeMs: currentNode.executionTimeMs || Math.floor(Math.random() * 2000 + 1500),
          tokensUsed: currentNode.tokensUsed || Math.floor(Math.random() * 15000 + 12000),
          logs: [
            ...(currentNode.logs || []),
            {
              id: `log-${Date.now()}`,
              timestamp: nowStr,
              level: 'success',
              message: `Stage '${currentNode.name}' executed successfully by ${currentNode.assignedAgentName || 'Agent'}. Artifacts emitted.`
            }
          ]
        };

        // Determine if next node should be set to running
        if (nextNodeIndex + 1 < nodes.length) {
          nodes[nextNodeIndex + 1] = {
            ...nodes[nextNodeIndex + 1],
            status: 'running',
            logs: [
              ...(nodes[nextNodeIndex + 1].logs || []),
              {
                id: `log-${Date.now() + 1}`,
                timestamp: nowStr,
                level: 'info',
                message: `Stage '${nodes[nextNodeIndex + 1].name}' received input handoff from ${currentNode.name}. Execution initialized.`
              }
            ]
          };
        }

        const completedCount = nodes.filter((n) => n.status === 'completed').length;
        const progressPct = Math.round((completedCount / nodes.length) * 100);

        // Add inter-agent message if advancing
        const newMessages = [...(t.orchestration.interAgentMessages || [])];
        if (nextNodeIndex + 1 < nodes.length) {
          const nextNode = nodes[nextNodeIndex + 1];
          newMessages.push({
            id: `msg-${Date.now()}`,
            fromNodeId: currentNode.id,
            fromAgentName: currentNode.assignedAgentName || 'Agent',
            toNodeId: nextNode.id,
            toAgentName: nextNode.assignedAgentName || 'Next Agent',
            messageType: 'spec_handoff',
            timestamp: nowStr,
            payloadSummary: `Transmitted ${(currentNode.outputArtifacts || ['artifacts']).join(', ')} to ${nextNode.name}.`,
            status: 'processed'
          });
        }

        const updatedOrch: TaskOrchestration = {
          ...t.orchestration,
          nodes,
          activeNodeId: nextNodeIndex + 1 < nodes.length ? nodes[nextNodeIndex + 1].id : undefined,
          executionProgressPct: progressPct,
          totalExecutionCostYD: (t.orchestration.totalExecutionCostYD || 0) + (currentNode.rewardAllocationYD || 10),
          interAgentMessages: newMessages
        };

        return {
          ...t,
          orchestration: updatedOrch,
          status: progressPct === 100 ? 'submitted' : 'in_progress'
        };
      })
    );
    showToast(locale === 'zh-CN' ? '阶段执行成功，已完成状态流转' : 'Stage executed successfully, state transitioned', 'success');
  };

  const approveOrchestrationNode = (taskId: string, nodeId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || !t.orchestration) return t;
        const nodes = t.orchestration.nodes.map((n) =>
          n.id === nodeId ? { ...n, approved: true } : n
        );
        return {
          ...t,
          orchestration: { ...t.orchestration, nodes }
        };
      })
    );
    showToast(locale === 'zh-CN' ? '人工门禁已签署放行' : 'Human checkpoint gate approved', 'success');
  };

  const applyOrchestrationTemplate = (taskId: string, templateId: string) => {
    const template = mockOrchestrationTemplates.find((tpl) => tpl.id === templateId);
    if (!template) return;
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const newNodes: OrchestrationNode[] = template.nodes.map((n, i) => ({
          ...n,
          id: `node-${Date.now()}-${i}`,
          status: i === 0 ? 'running' : 'pending',
          approved: false,
          logs: [
            {
              id: `log-init-${i}`,
              timestamp: new Date().toLocaleTimeString(),
              level: 'info',
              message: `Initialized node for ${n.name}`
            }
          ]
        }));
        const newOrch: TaskOrchestration = {
          enabled: true,
          topology: template.topology,
          supervisorAgentId: newNodes[0].assignedAgentId,
          supervisorAgentName: newNodes[0].assignedAgentName,
          supervisorAgentAvatar: newNodes[0].assignedAgentAvatar,
          activeNodeId: newNodes[0].id,
          executionProgressPct: 0,
          totalExecutionCostYD: 0,
          nodes: newNodes,
          interAgentMessages: [],
          sharedContextPool: [
            { key: 'TASK_SPEC_INITIALIZED', value: t.title, updatedBy: newNodes[0].assignedAgentName || 'Supervisor', timestamp: new Date().toLocaleTimeString() }
          ]
        };
        return {
          ...t,
          orchestration: newOrch,
          status: 'in_progress'
        };
      })
    );
    showToast(locale === 'zh-CN' ? `已应用编排模板：${template.nameZh || template.name}` : `Applied template: ${template.name}`, 'success');
  };

  const addOrchestrationNode = (taskId: string, nodePartial: Partial<OrchestrationNode>) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || !t.orchestration) return t;
        const currentNodes = t.orchestration.nodes || [];
        const newNode: OrchestrationNode = {
          id: `node-${Date.now()}`,
          name: nodePartial.name || 'New Pipeline Stage',
          stageIndex: currentNodes.length + 1,
          role: nodePartial.role || 'Autonomous Specialist',
          assignedAgentId: nodePartial.assignedAgentId || agents[0].id,
          assignedAgentName: nodePartial.assignedAgentName || agents[0].name,
          assignedAgentAvatar: nodePartial.assignedAgentAvatar || agents[0].avatar,
          assignedAgentHandle: nodePartial.assignedAgentHandle || agents[0].handle,
          inputArtifacts: nodePartial.inputArtifacts || ['Preceding Deliverables'],
          outputArtifacts: nodePartial.outputArtifacts || ['Stage Artifact'],
          status: 'pending',
          rewardAllocationPct: nodePartial.rewardAllocationPct || 20,
          rewardAllocationYD: nodePartial.rewardAllocationYD || 100,
          dependencies: currentNodes.length > 0 ? [currentNodes[currentNodes.length - 1].id] : [],
          requireHumanApproval: nodePartial.requireHumanApproval || false,
          approved: false,
          logs: []
        };
        return {
          ...t,
          orchestration: {
            ...t.orchestration,
            nodes: [...currentNodes, newNode]
          }
        };
      })
    );
    showToast(locale === 'zh-CN' ? '已添加新协同阶段节点' : 'Added new stage node to orchestration', 'success');
  };

  const removeOrchestrationNode = (taskId: string, nodeId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || !t.orchestration) return t;
        const filteredNodes = t.orchestration.nodes.filter((n) => n.id !== nodeId);
        return {
          ...t,
          orchestration: {
            ...t.orchestration,
            nodes: filteredNodes
          }
        };
      })
    );
    showToast(locale === 'zh-CN' ? '已移除该协同阶段节点' : 'Removed stage node', 'info');
  };

  const updateNodePosition = (taskId: string, nodeId: string, pos: { x: number; y: number }) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || !t.orchestration) return t;
        const updatedNodes = t.orchestration.nodes.map((n) =>
          n.id === nodeId ? { ...n, position: pos } : n
        );
        return {
          ...t,
          orchestration: {
            ...t.orchestration,
            nodes: updatedNodes
          }
        };
      })
    );
  };

  const updateNodeData = (taskId: string, nodeId: string, updates: Partial<OrchestrationNode>) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || !t.orchestration) return t;
        const updatedNodes = t.orchestration.nodes.map((n) =>
          n.id === nodeId ? { ...n, ...updates } : n
        );
        return {
          ...t,
          orchestration: {
            ...t.orchestration,
            nodes: updatedNodes
          }
        };
      })
    );
  };

  const addOrchestrationEdge = (taskId: string, edge: OrchestrationEdge) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || !t.orchestration) return t;
        const existingEdges = t.orchestration.edges || [];
        // Check if edge already exists
        const exists = existingEdges.some(
          (e) => e.sourceNodeId === edge.sourceNodeId && e.targetNodeId === edge.targetNodeId
        );
        if (exists) return t;

        // Also add to targetNode dependencies if not present
        const updatedNodes = t.orchestration.nodes.map((n) => {
          if (n.id === edge.targetNodeId) {
            const deps = n.dependencies || [];
            if (!deps.includes(edge.sourceNodeId)) {
              return { ...n, dependencies: [...deps, edge.sourceNodeId] };
            }
          }
          return n;
        });

        return {
          ...t,
          orchestration: {
            ...t.orchestration,
            nodes: updatedNodes,
            edges: [...existingEdges, edge]
          }
        };
      })
    );
    showToast(locale === 'zh-CN' ? '已连接两个节点' : 'Connected nodes', 'info');
  };

  const removeOrchestrationEdge = (taskId: string, edgeId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || !t.orchestration || !t.orchestration.edges) return t;
        const targetEdge = t.orchestration.edges.find((e) => e.id === edgeId);
        const filteredEdges = t.orchestration.edges.filter((e) => e.id !== edgeId);

        let updatedNodes = t.orchestration.nodes;
        if (targetEdge) {
          updatedNodes = updatedNodes.map((n) => {
            if (n.id === targetEdge.targetNodeId) {
              return {
                ...n,
                dependencies: (n.dependencies || []).filter((d) => d !== targetEdge.sourceNodeId)
              };
            }
            return n;
          });
        }

        return {
          ...t,
          orchestration: {
            ...t.orchestration,
            nodes: updatedNodes,
            edges: filteredEdges
          }
        };
      })
    );
    showToast(locale === 'zh-CN' ? '已移除节点连线' : 'Removed connection edge', 'info');
  };

  const autoLayoutNodes = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || !t.orchestration || !t.orchestration.nodes.length) return t;
        const nodes = [...t.orchestration.nodes];
        
        // Arrange sequentially with 340px horizontal spacing and balanced vertical offsets
        const layoutNodes = nodes.map((node, index) => {
          const col = index % 3;
          const row = Math.floor(index / 3);
          const x = 60 + col * 360;
          const y = 80 + row * 260 + (col % 2 === 1 ? 40 : 0);
          return {
            ...node,
            position: { x, y }
          };
        });

        // Rebuild edges according to dependencies
        const newEdges: OrchestrationEdge[] = [];
        layoutNodes.forEach((node) => {
          (node.dependencies || []).forEach((depId) => {
            newEdges.push({
              id: `edge-${depId}-${node.id}`,
              sourceNodeId: depId,
              targetNodeId: node.id,
              status: node.status === 'completed' ? 'completed' : node.status === 'running' ? 'active' : 'idle',
              animated: node.status === 'running'
            });
          });
        });

        return {
          ...t,
          orchestration: {
            ...t.orchestration,
            nodes: layoutNodes,
            edges: newEdges.length > 0 ? newEdges : t.orchestration.edges
          }
        };
      })
    );
    showToast(locale === 'zh-CN' ? '已自动规整排布节点画布' : 'Auto-arranged canvas graph topology', 'success');
  };

  const duplicateNode = (taskId: string, nodeId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || !t.orchestration) return t;
        const sourceNode = t.orchestration.nodes.find((n) => n.id === nodeId);
        if (!sourceNode) return t;

        const currentPos = sourceNode.position || { x: 100, y: 100 };
        const newNode: OrchestrationNode = {
          ...sourceNode,
          id: `node-${Date.now()}`,
          name: `${sourceNode.name} (Copy)`,
          stageIndex: t.orchestration.nodes.length + 1,
          status: 'pending',
          approved: false,
          position: { x: currentPos.x + 40, y: currentPos.y + 40 },
          logs: []
        };

        return {
          ...t,
          orchestration: {
            ...t.orchestration,
            nodes: [...t.orchestration.nodes, newNode]
          }
        };
      })
    );
    showToast(locale === 'zh-CN' ? '已克隆节点' : 'Duplicated node', 'info');
  };

  const resetTaskOrchestration = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || !t.orchestration) return t;
        const resetNodes: OrchestrationNode[] = t.orchestration.nodes.map((n, idx) => ({
          ...n,
          status: idx === 0 ? 'running' : 'pending',
          approved: false,
          logs: [
            {
              id: `log-rst-${idx}`,
              timestamp: new Date().toLocaleTimeString(),
              level: 'info',
              message: `Flow reset. Stage ${n.name} waiting for execution.`
            }
          ]
        }));
        return {
          ...t,
          status: 'in_progress',
          orchestration: {
            ...t.orchestration,
            activeNodeId: resetNodes[0]?.id,
            executionProgressPct: 0,
            totalExecutionCostYD: 0,
            nodes: resetNodes,
            interAgentMessages: []
          }
        };
      })
    );
    showToast(locale === 'zh-CN' ? '已重置编排流程状态' : 'Reset orchestration workflow state', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        locale,
        setLocale,
        toggleLocale,
        t,
        surface,
        setSurface,
        activeTab,
        setActiveTab,
        userProfile,
        updateUserProfile,
        isProfileModalOpen,
        setIsProfileModalOpen,
        wallets,
        activeWallet,
        setActiveWalletId,
        ydBalance,
        acquireYD,
        switchWalletRole,
        agents,
        tasks,
        activeTaskId,
        setActiveTaskId,
        activeTask,
        transactions,
        systemStatus,
        selectedAgent,
        setSelectedAgent,
        compareAgents,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isPublishWizardOpen,
        setIsPublishWizardOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutTargetTask,
        openCheckoutForTask,
        isAgentDetailOpen,
        setIsAgentDetailOpen,
        isCompareOpen,
        setIsCompareOpen,
        publishNewTask,
        acceptTaskDeliverables,
        raiseTaskDispute,
        assignAgentToTask,
        updateTaskOrchestration,
        executeOrchestrationStep,
        approveOrchestrationNode,
        applyOrchestrationTemplate,
        addOrchestrationNode,
        removeOrchestrationNode,
        updateNodePosition,
        updateNodeData,
        addOrchestrationEdge,
        removeOrchestrationEdge,
        autoLayoutNodes,
        duplicateNode,
        resetTaskOrchestration,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
