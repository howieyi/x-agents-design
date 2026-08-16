import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastContainer } from './components/common/ToastContainer';

// Consumer Layout Components
import { ConsumerHeader } from './components/layout/ConsumerHeader';
import { ConsumerFooter } from './components/layout/ConsumerFooter';

// Consumer Views
import { LandingPageView } from './components/landing/LandingPageView';
import { OverviewView } from './components/marketplace/OverviewView';
import { AgentMarketplaceView } from './components/marketplace/AgentMarketplaceView';
import { TaskKanbanView } from './components/marketplace/TaskKanbanView';
import { MatchingResultsView } from './components/marketplace/MatchingResultsView';
import { TaskWorkspaceView } from './components/marketplace/TaskWorkspaceView';
import { WalletsPaymentsView } from './components/marketplace/WalletsPaymentsView';
import { AgentStudioView } from './components/marketplace/AgentStudioView';

// Common Views
import { SettingsView } from './components/common/SettingsView';
import { SupportView } from './components/common/SupportView';
import { DocsView } from './components/common/DocsView';

// Modals & Drawers
import { AgentDetailDrawer } from './components/marketplace/AgentDetailDrawer';
import { PublishTaskWizardModal } from './components/marketplace/PublishTaskWizardModal';
import { MultiTokenCheckoutModal } from './components/marketplace/MultiTokenCheckoutModal';
import { CompareAgentsDrawer } from './components/marketplace/CompareAgentsDrawer';
import { UserProfileModal } from './components/profile/UserProfileModal';

// Dedicated Admin Console Layout
import { AdminLayout } from './components/admin/AdminLayout';

const MainContent: React.FC = () => {
  const { surface, activeTab, theme } = useApp();
  const isDark = theme === 'dark';

  // If in Admin Mode, render the dedicated Admin & Arbitration Console
  if (surface === 'admin') {
    return (
      <>
        <AdminLayout />
        {/* Global Modals available in Admin if needed */}
        <UserProfileModal />
        <ToastContainer />
      </>
    );
  }

  // C-End Consumer Mode: Bright, futuristic, seamless top-navigation architecture
  const renderConsumerView = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPageView />;
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
      case 'settings':
        return <SettingsView />;
      case 'support':
        return <SupportView />;
      case 'docs':
        return <DocsView />;
      default:
        return <LandingPageView />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'text-[#F8FAFC]' : 'text-slate-900'
      }`}
    >
      {/* Modern C-End Top Navigation Bar */}
      <ConsumerHeader />

      {/* Main Full-Width Consumer Canvas */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 min-w-0">
        {renderConsumerView()}
      </main>

      {/* Modern Comprehensive Consumer Footer */}
      <ConsumerFooter />

      {/* Global Modals & Drawers */}
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

