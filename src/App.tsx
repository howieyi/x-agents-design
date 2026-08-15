import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SystemStatusStrip } from './components/common/SystemStatusStrip';
import { ToastContainer } from './components/common/ToastContainer';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';

// Marketplace Views
import { OverviewView } from './components/marketplace/OverviewView';
import { AgentMarketplaceView } from './components/marketplace/AgentMarketplaceView';
import { TaskKanbanView } from './components/marketplace/TaskKanbanView';
import { MatchingResultsView } from './components/marketplace/MatchingResultsView';
import { TaskWorkspaceView } from './components/marketplace/TaskWorkspaceView';
import { WalletsPaymentsView } from './components/marketplace/WalletsPaymentsView';
import { AgentStudioView } from './components/marketplace/AgentStudioView';

// Common / Utility Views
import { SettingsView } from './components/common/SettingsView';
import { SupportView } from './components/common/SupportView';
import { DocsView } from './components/common/DocsView';

// Modals & Drawers
import { AgentDetailDrawer } from './components/marketplace/AgentDetailDrawer';
import { PublishTaskWizardModal } from './components/marketplace/PublishTaskWizardModal';
import { MultiTokenCheckoutModal } from './components/marketplace/MultiTokenCheckoutModal';
import { CompareAgentsDrawer } from './components/marketplace/CompareAgentsDrawer';
import { UserProfileModal } from './components/profile/UserProfileModal';

// Admin Views
import { OperationsDashboardView } from './components/admin/OperationsDashboardView';
import { DisputeCenterView } from './components/admin/DisputeCenterView';
import { ConfigAuditView } from './components/admin/ConfigAuditView';

const MainContent: React.FC = () => {
  const { surface, activeTab, theme } = useApp();
  const isDark = theme === 'dark';
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const renderView = () => {
    // Global shared pages regardless of surface
    if (activeTab === 'settings') return <SettingsView />;
    if (activeTab === 'support') return <SupportView />;
    if (activeTab === 'docs') return <DocsView />;

    if (surface === 'admin') {
      switch (activeTab) {
        case 'ops':
        case 'operations':
          return <OperationsDashboardView />;
        case 'disputes':
          return <DisputeCenterView />;
        case 'config':
          return <ConfigAuditView />;
        default:
          return <OperationsDashboardView />;
      }
    }

    // Marketplace Surface
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'agents':
      case 'marketplace':
        return <AgentMarketplaceView />;
      case 'tasks':
        return <TaskKanbanView />;
      case 'matches':
      case 'matching':
        return <MatchingResultsView />;
      case 'workspace':
        return <TaskWorkspaceView />;
      case 'payments':
      case 'wallets':
        return <WalletsPaymentsView />;
      case 'studio':
        return <AgentStudioView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'bg-[#07111F] text-[#F4F7FB]' : 'bg-[#F4F7FB] text-slate-900'
      }`}
    >
      {/* Real-time Telemetry Strip */}
      <SystemStatusStrip />

      {/* Persistent Navigation Header */}
      <Header
        onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main App Layout */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto pb-20 lg:pb-8">
        {/* Desktop Sidebar Rail */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Main Workspace Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto max-w-7xl">
          {renderView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav />

      {/* Interactive Overlays & Drawers */}
      <AgentDetailDrawer />
      <PublishTaskWizardModal />
      <MultiTokenCheckoutModal />
      <CompareAgentsDrawer />
      <UserProfileModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
