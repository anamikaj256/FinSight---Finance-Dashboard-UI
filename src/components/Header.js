// import React from 'react';
// import { Moon, Sun, User, Download } from '@phosphor-icons/react';
// import { useApp } from '../context/AppContext';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
// } from './ui/dropdown-menu';
// import { Button } from './ui/button';
// import { exportToCSV, exportToJSON } from '../utils/export';

// const Header = () => {
//   const { role, setRole, theme, toggleTheme, transactions, filters } = useApp();

//   const getFilteredTransactions = () => {
//     return transactions.filter((t) => {
//       const matchesSearch =
//         !filters.search ||
//         t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
//         t.category.toLowerCase().includes(filters.search.toLowerCase());
//       const matchesCategory = filters.category === 'all' || t.category === filters.category;
//       const matchesType = filters.type === 'all' || t.type === filters.type;
//       return matchesSearch && matchesCategory && matchesType;
//     });
//   };

//   const handleExportCSV = () => {
//     console.log('Export CSV clicked');
//     exportToCSV(getFilteredTransactions());
//   };

//   const handleExportJSON = () => {
//     console.log('Export JSON clicked');
//     exportToJSON(getFilteredTransactions());
//   };

//   return (
//     <header className={`glass-panel ${
//       theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
//     } sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8 mt-4`}>
//       <div className="px-6 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
//             theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-600/20'
//           }`}>
//             <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//             </svg>
//           </div>
//           <h1 className="text-xl font-light tracking-tight">FinSight</h1>
//         </div>

//         <div className="flex items-center gap-3">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className={`gap-2 rounded-full hover:scale-105 transition-all duration-300 ${
//                   theme === 'dark'
//                     ? 'hover:bg-white/10'
//                     : 'hover:bg-slate-900/5'
//                 }`}
//                 data-testid="export-dropdown-trigger"
//               >
//                 <Download size={18} weight="regular" />
//                 Export
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className={`glass-panel ${
//               theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
//             }`}>
//               <DropdownMenuItem 
//                 onClick={handleExportCSV} 
//                 data-testid="export-csv-button"
//                 className="hover:scale-105 transition-transform duration-200"
//               >
//                 Export as CSV
//               </DropdownMenuItem>
//               <DropdownMenuItem 
//                 onClick={handleExportJSON} 
//                 data-testid="export-json-button"
//                 className="hover:scale-105 transition-transform duration-200"
//               >
//                 Export as JSON
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={toggleTheme}
//             aria-label="Toggle theme"
//             className={`rounded-full hover:scale-110 hover:rotate-12 transition-all duration-300 ${
//               theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-900/5'
//             }`}
//             data-testid="theme-toggle-button"
//           >
//             {theme === 'light' ? (
//               <Moon size={20} weight="regular" />
//             ) : (
//               <Sun size={20} weight="regular" />
//             )}
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="rounded-full"
//                 data-testid="role-dropdown-trigger"
//               >
//                 <img
//                   src="https://static.prod-images.emergentagent.com/jobs/a937b17a-b0f5-4b26-a87c-6a083399ccc0/images/d1e339433764f5b1eff661e11443a31b67596a40e5db6b2efdc7d18f22fe77c3.png"
//                   alt="User"
//                   className="w-8 h-8 rounded-full object-cover"
//                 />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className={`glass-panel w-48 ${
//               theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
//             }`}>
//               <div className="px-2 py-2 text-sm font-medium">
//                 Role: <span className="text-indigo-400">{role}</span>
//               </div>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 onClick={() => setRole('admin')}
//                 data-testid="role-admin-option"
//                 className={role === 'admin' ? 'bg-indigo-500/20' : ''}
//               >
//                 <User size={16} weight="regular" className="mr-2" />
//                 Admin
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => setRole('viewer')}
//                 data-testid="role-viewer-option"
//                 className={role === 'viewer' ? 'bg-indigo-500/20' : ''}
//               >
//                 <User size={16} weight="regular" className="mr-2" />
//                 Viewer
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;





import React, { useState } from 'react';
import { Moon, Sun, User, Download, Bell } from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { exportToCSV, exportToJSON } from '../utils/export';
import SpendingAlertsSettings from './SpendingAlertsSettings';
import { checkSpendingAlert } from '../utils/alerts';

const Header = () => {
  const { role, setRole, theme, toggleTheme, transactions, filters, spendingAlert } = useApp();
  const [showAlertsSettings, setShowAlertsSettings] = useState(false);

  const getFilteredTransactions = () => {
    return transactions.filter((t) => {
      const matchesSearch =
        !filters.search ||
        t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || t.category === filters.category;
      const matchesType = filters.type === 'all' || t.type === filters.type;
      return matchesSearch && matchesCategory && matchesType;
    });
  };

  const handleExportCSV = () => {
    console.log('Export CSV clicked');
    exportToCSV(getFilteredTransactions());
  };

  const handleExportJSON = () => {
    console.log('Export JSON clicked');
    exportToJSON(getFilteredTransactions());
  };

  const alertStatus = checkSpendingAlert(transactions, spendingAlert);
  const hasAlert = spendingAlert.enabled && (alertStatus.exceeded || alertStatus.percentUsed >= 80);

  return (
    <header className={`glass-panel ${
      theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
    } sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8 mt-4`}>
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
            theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-600/20'
          }`}>
            <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-xl font-light tracking-tight">FinSight</h1>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 rounded-full hover:scale-105 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'hover:bg-white/10'
                    : 'hover:bg-slate-900/5'
                }`}
                data-testid="export-dropdown-trigger"
              >
                <Download size={18} weight="regular" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`glass-panel ${
              theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
            }`}>
              <DropdownMenuItem 
                onClick={handleExportCSV} 
                data-testid="export-csv-button"
                className="hover:scale-105 transition-transform duration-200"
              >
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleExportJSON} 
                data-testid="export-json-button"
                className="hover:scale-105 transition-transform duration-200"
              >
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`rounded-full hover:scale-110 hover:rotate-12 transition-all duration-300 ${
              theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-900/5'
            }`}
            data-testid="theme-toggle-button"
          >
            {theme === 'light' ? (
              <Moon size={20} weight="regular" />
            ) : (
              <Sun size={20} weight="regular" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowAlertsSettings(true)}
            className={`rounded-full hover:scale-110 transition-all duration-300 relative ${
              theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-900/5'
            }`}
            data-testid="alerts-button"
          >
            <Bell size={20} weight={hasAlert ? 'fill' : 'regular'} />
            {hasAlert && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                data-testid="role-dropdown-trigger"
              >
                <img
                  src="https://static.prod-images.emergentagent.com/jobs/a937b17a-b0f5-4b26-a87c-6a083399ccc0/images/d1e339433764f5b1eff661e11443a31b67596a40e5db6b2efdc7d18f22fe77c3.png"
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`glass-panel w-48 ${
              theme === 'dark' ? 'glass-panel-dark' : 'glass-panel-light'
            }`}>
              <div className="px-2 py-2 text-sm font-medium">
                Role: <span className="text-indigo-400">{role}</span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setRole('admin')}
                data-testid="role-admin-option"
                className={role === 'admin' ? 'bg-indigo-500/20' : ''}
              >
                <User size={16} weight="regular" className="mr-2" />
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setRole('viewer')}
                data-testid="role-viewer-option"
                className={role === 'viewer' ? 'bg-indigo-500/20' : ''}
              >
                <User size={16} weight="regular" className="mr-2" />
                Viewer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <SpendingAlertsSettings
        open={showAlertsSettings}
        onOpenChange={setShowAlertsSettings}
      />
    </header>
  );
};

export default Header;