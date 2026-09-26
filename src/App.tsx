import React, { useState } from 'react';
import {
  LayoutDashboard,
  Megaphone,
  BarChart3,
  Crosshair,
  User,
  Plus
} from 'lucide-react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { KpiCards } from './components/dashboard/KpiCards';
import { CampaignPerformanceChart } from './components/dashboard/CampaignPerformanceChart';
import { CampaignOverviewTable } from './components/dashboard/CampaignOverviewTable';
import { AdvertisingChannels } from './components/dashboard/AdvertisingChannels';
import { ConversionFunnel } from './components/dashboard/ConversionFunnel';
import { AudienceAnalytics } from './components/dashboard/AudienceAnalytics';
import { BudgetSpending } from './components/dashboard/BudgetSpending';
import { TopCampaigns } from './components/dashboard/TopCampaigns';
import { AdditionalAnalytics } from './components/dashboard/AdditionalAnalytics';
import { QuickActions } from './components/dashboard/QuickActions';

// Modals
import { CreateCampaignModal } from './components/modals/CreateCampaignModal';
import { IncreaseBudgetModal } from './components/modals/IncreaseBudgetModal';
import { CampaignDetailModal } from './components/modals/CampaignDetailModal';
import { SearchModal } from './components/modals/SearchModal';
import { ReportExportModal } from './components/modals/ReportExportModal';
import { CreateAdModal } from './components/modals/CreateAdModal';
import { AddAudienceModal } from './components/modals/AddAudienceModal';
import { ConnectChannelModal } from './components/modals/ConnectChannelModal';
import { HelpModal } from './components/modals/HelpModal';

// Dedicated views for subpages
import {
  CampaignsView,
  AdsManagerView,
  ABTestingView,
  ReportsView,
  SettingsView,
} from './components/views/DedicatedViews';

// UI
import { ToastContainer, ToastMessage } from './components/ui/Toast';

// Mock Data
import {
  INITIAL_KPIS,
  INITIAL_CAMPAIGNS,
  INITIAL_CHANNELS,
  INITIAL_NOTIFICATIONS,
  BUDGET_METRICS,
} from './data/mockData';
import { Campaign, TimeRange, ChannelPerformance, NotificationItem } from './types/marketing';

export default function App() {
  // Navigation & Layout
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Filters & Global parameters
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [currency, setCurrency] = useState<string>('₹');

  // Core Data States
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [channels, setChannels] = useState<ChannelPerformance[]>(INITIAL_CHANNELS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [totalBudget, setTotalBudget] = useState<number>(BUDGET_METRICS.totalBudget);
  const [currentSpend, setCurrentSpend] = useState<number>(BUDGET_METRICS.amountSpent);

  // Modals visibility
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isIncreaseBudgetOpen, setIsIncreaseBudgetOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReportExportOpen, setIsReportExportOpen] = useState(false);
  const [isCreateAdOpen, setIsCreateAdOpen] = useState(false);
  const [isAddAudienceOpen, setIsAddAudienceOpen] = useState(false);
  const [isConnectChannelOpen, setIsConnectChannelOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [selectedCampaignForDetail, setSelectedCampaignForDetail] = useState<Campaign | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handlers
  const handleToggleStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'Active' ? 'Paused' : 'Active';
          addToast(
            `Campaign ${nextStatus}`,
            `"${c.name}" has been ${nextStatus.toLowerCase()}.`,
            nextStatus === 'Active' ? 'success' : 'warning'
          );
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleCreateCampaign = (newCampData: Partial<Campaign>) => {
    const newCamp: Campaign = {
      id: `camp-${Date.now()}`,
      name: newCampData.name || 'Untitled Campaign',
      platform: newCampData.platform || 'Meta',
      budget: newCampData.budget || 50000,
      spend: 0,
      impressions: 12000,
      clicks: 580,
      ctr: 4.8,
      conversions: 28,
      roas: 5.2,
      cpc: 1.05,
      status: 'Active',
      startDate: newCampData.startDate || new Date().toISOString().split('T')[0],
      targetAudience: newCampData.targetAudience || 'Custom Audience',
      objective: newCampData.objective || 'Catalog Sales',
      image: '/src/assets/images/campaign_summer_sale_1790394472167.jpg',
    };

    setCampaigns((prev) => [newCamp, ...prev]);
    addToast('Campaign Created', `"${newCamp.name}" is now active and delivering.`, 'success');
  };

  const handleDuplicateCampaign = (camp: Campaign) => {
    const duplicate: Campaign = {
      ...camp,
      id: `camp-${Date.now()}`,
      name: `${camp.name} (Copy)`,
      status: 'Draft',
      spend: 0,
      conversions: 0,
      clicks: 0,
      impressions: 0,
    };
    setCampaigns((prev) => [duplicate, ...prev]);
    addToast('Campaign Duplicated', `Created draft copy of "${camp.name}".`, 'info');
  };

  const handleDeleteCampaign = (id: string) => {
    const target = campaigns.find((c) => c.id === id);
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    addToast('Campaign Removed', target ? `"${target.name}" was deleted.` : 'Campaign removed.', 'warning');
  };

  const handleSaveBudget = (newBudget: number) => {
    setTotalBudget(newBudget);
    addToast('Budget Updated', `Monthly cap increased to ₹${newBudget.toLocaleString('en-IN')}.`, 'success');
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Notifications Cleared', 'All alerts marked as read.', 'info');
  };

  const handleSyncChannel = (id: string) => {
    addToast('Channels Synchronized', 'All conversion events matched with 100% accuracy.', 'success');
  };

  return (
    <div className="min-h-screen flex bg-[#F8F9FE] text-slate-800">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenCreateCampaign={() => setIsCreateCampaignOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        {/* Top Header */}
        <Header
          timeRange={timeRange}
          onTimeRangeChange={(range) => {
            setTimeRange(range);
            addToast('Date Filter Applied', `Showing metrics for ${range.toUpperCase()}.`, 'info');
          }}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onClearAllNotifications={handleClearAllNotifications}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenHelp={() => setIsHelpOpen(true)}
        />

        {/* View Content Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
          {activeTab === 'dashboard' && (
            <>
              {/* 1. KPI Gradient Cards */}
              <KpiCards metrics={INITIAL_KPIS} />

              {/* 2. Quick Actions */}
              <QuickActions
                onCreateCampaign={() => setIsCreateCampaignOpen(true)}
                onCreateAd={() => setIsCreateAdOpen(true)}
                onAddAudience={() => setIsAddAudienceOpen(true)}
                onGenerateReport={() => setIsReportExportOpen(true)}
                onConnectChannel={() => setIsConnectChannelOpen(true)}
              />

              {/* 3. Campaign Performance Large Area Chart */}
              <CampaignPerformanceChart
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
                onExportReport={() => setIsReportExportOpen(true)}
              />

              {/* 4. Campaign Overview Table */}
              <CampaignOverviewTable
                campaigns={campaigns}
                onToggleStatus={handleToggleStatus}
                onViewDetails={(c) => setSelectedCampaignForDetail(c)}
                onEditCampaign={(c) => setSelectedCampaignForDetail(c)}
                onDuplicateCampaign={handleDuplicateCampaign}
                onDeleteCampaign={handleDeleteCampaign}
                onOpenCreateModal={() => setIsCreateCampaignOpen(true)}
              />

              {/* 5. Advertising Channels */}
              <AdvertisingChannels
                channels={channels}
                onManageChannel={(ch) => {
                  setActiveTab('channels');
                  addToast(`Inspecting ${ch.name}`, 'Switched to Channels Inspector.', 'info');
                }}
                onSyncChannel={handleSyncChannel}
              />

              {/* 6. Conversion Funnel */}
              <ConversionFunnel />

              {/* 7. Audience Analytics */}
              <AudienceAnalytics />

              {/* 8. Budget & Spending */}
              <BudgetSpending
                currentSpend={currentSpend}
                totalBudget={totalBudget}
                onOpenIncreaseBudget={() => setIsIncreaseBudgetOpen(true)}
                onManageCampaigns={() => setActiveTab('campaigns')}
              />

              {/* 9. Top Performing Campaigns */}
              <TopCampaigns
                campaigns={campaigns}
                onViewCampaign={(c) => setSelectedCampaignForDetail(c)}
              />

              {/* 10. Additional Analytics */}
              <AdditionalAnalytics />
            </>
          )}

          {activeTab === 'campaigns' && (
            <CampaignsView
              campaigns={campaigns}
              onOpenCreate={() => setIsCreateCampaignOpen(true)}
              onViewCampaign={(c) => setSelectedCampaignForDetail(c)}
              onToggleStatus={handleToggleStatus}
            />
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <CampaignPerformanceChart
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
                onExportReport={() => setIsReportExportOpen(true)}
              />
              <AdditionalAnalytics />
            </div>
          )}

          {activeTab === 'ads-manager' && (
            <AdsManagerView
              campaigns={campaigns}
              onOpenCreateAd={() => setIsCreateAdOpen(true)}
            />
          )}

          {activeTab === 'audiences' && <AudienceAnalytics />}

          {activeTab === 'conversions' && <ConversionFunnel />}

          {activeTab === 'budget' && (
            <BudgetSpending
              currentSpend={currentSpend}
              totalBudget={totalBudget}
              onOpenIncreaseBudget={() => setIsIncreaseBudgetOpen(true)}
              onManageCampaigns={() => setActiveTab('campaigns')}
            />
          )}

          {activeTab === 'channels' && (
            <AdvertisingChannels
              channels={channels}
              onManageChannel={() => {}}
              onSyncChannel={handleSyncChannel}
            />
          )}

          {activeTab === 'ab-testing' && <ABTestingView />}

          {activeTab === 'reports' && (
            <ReportsView onOpenExport={() => setIsReportExportOpen(true)} />
          )}

          {activeTab === 'settings' && (
            <SettingsView currency={currency} onCurrencyChange={setCurrency} />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar as requested in prompt */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden flex items-center justify-around py-2.5 px-3 bg-white/95 backdrop-blur-md border-t border-purple-100 shadow-lg">
        {[
          { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
          { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'ads-manager', label: 'Ads', icon: Crosshair },
          { id: 'settings', label: 'Profile', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
                isActive ? 'text-fuchsia-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modals Container */}
      <CreateCampaignModal
        isOpen={isCreateCampaignOpen}
        onClose={() => setIsCreateCampaignOpen(false)}
        onCreate={handleCreateCampaign}
      />

      <IncreaseBudgetModal
        isOpen={isIncreaseBudgetOpen}
        onClose={() => setIsIncreaseBudgetOpen(false)}
        currentBudget={totalBudget}
        onSaveBudget={handleSaveBudget}
      />

      <CampaignDetailModal
        campaign={selectedCampaignForDetail}
        onClose={() => setSelectedCampaignForDetail(null)}
        onToggleStatus={handleToggleStatus}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        campaigns={campaigns}
        onSelectCampaign={(c) => setSelectedCampaignForDetail(c)}
        onNavigateTab={(t) => setActiveTab(t)}
      />

      <ReportExportModal
        isOpen={isReportExportOpen}
        onClose={() => setIsReportExportOpen(false)}
        onExportDone={(fmt) => {
          addToast('Report Export Ready', `Marketing_${fmt.toUpperCase()}_Report_Q2_2026.${fmt} has been created.`, 'success');
        }}
      />

      <CreateAdModal
        isOpen={isCreateAdOpen}
        onClose={() => setIsCreateAdOpen(false)}
        onAdCreated={(title) => {
          addToast('Ad Creative Saved', `"${title}" has been saved to your ad sets.`, 'success');
        }}
      />

      <AddAudienceModal
        isOpen={isAddAudienceOpen}
        onClose={() => setIsAddAudienceOpen(false)}
        onAudienceAdded={(audName) => {
          addToast('Audience Created', `"${audName}" synced with Meta & Google Ads.`, 'success');
        }}
      />

      <ConnectChannelModal
        isOpen={isConnectChannelOpen}
        onClose={() => setIsConnectChannelOpen(false)}
        onChannelConnected={(chName) => {
          addToast('Channel Connected', `${chName} handshake established.`, 'success');
        }}
      />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
