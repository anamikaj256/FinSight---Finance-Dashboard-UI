import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import BalanceTrendChart from './components/BalanceTrendChart';
import SpendingBreakdown from './components/SpendingBreakdown';
import InsightsPanel from './components/InsightsPanel';
import TransactionsTable from './components/TransactionsTable';
import SpendingAlertsBanner from './components/SpendingAlertsBanner';
import { Toaster } from './components/ui/sonner';

const DashboardContent = () => {
  const { theme } = useApp();
  
  useEffect(() => {
    document.body.style.setProperty('background-color', theme === 'dark' ? 'rgb(2, 6, 23)' : 'rgb(248, 250, 252)', 'important');
  }, [theme]);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      {theme === 'dark' ? (
        <div 
          className="fixed inset-0 z-0" 
          style={{
            backgroundImage: 'url(https://static.prod-images.emergentagent.com/jobs/a937b17a-b0f5-4b26-a87c-6a083399ccc0/images/f4376657cad645b0984081e131c898a8040a4876581d7750c381291ebfb859de.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
      ) : (
        <div 
          className="fixed inset-0 z-0" 
          style={{
            background: 'radial-gradient(circle at top left, #e0e7ff, #f8fafc)'
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-[1600px] mx-auto space-y-6">
            <SpendingAlertsBanner />
            <SummaryCards />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BalanceTrendChart />
              <SpendingBreakdown />
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                <TransactionsTable />
              </div>
              <div className="xl:col-span-1">
                <InsightsPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}

export default App;