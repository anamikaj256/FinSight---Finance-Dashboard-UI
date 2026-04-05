# FinSight - Finance Dashboard UI

A beautiful, feature-rich finance dashboard built with React, featuring glassmorphism design, real-time data visualization, comprehensive transaction management, and smart spending alerts.

✨ Features

 📊 Dashboard Overview
-Summary Cards: Real-time display of Total Balance, Income, and Expenses with gradient icons
-Balance Trend Chart: Interactive area chart showing balance progression over 30 days
-Spending Breakdown: Colorful doughnut chart visualizing expense categories
-Insights Panel: Smart insights including highest spending category and monthly comparisons
-Spending Alerts Banner: Visual notifications when spending exceeds configured limits

 💳 Transaction Management
- 120+ Mock Transactions: Auto-generated rich dataset with realistic data
- Serial Numbers : Unique identifiers (#1000+) for each transaction
- Full CRUD Operations: Add, Edit, and Delete transactions (Admin only)
- Enhanced Tooltips: Hover over amounts to see detailed transaction information with premium card design
- Transaction Notes: Add comments and notes to transactions
- Receipt Attachments: Upload and attach receipts/documents (images & PDFs)
- Advanced Filtering: 
  - Search by description, category, or serial number
  - Filter by category and type (income/expense)
  - Custom date range picker
  - Smart sorting (date/amount, ascending/descending)
  - Clear all filters with one click

📤 Bulk Operations
- CSV Import: Upload multiple transactions from CSV files
- Bank Statement Import: Smart parser for bank statement format (Date, Description, Debit, Credit)
- Auto-Categorization: Intelligent category assignment based on transaction description
- Validation: Real-time error and warning detection before import
- Preview: See first 5 transactions before importing
- Download Template: Get a sample CSV template for easy formatting

🔔 Spending Alerts
- Smart Notifications: Three-level alert system (On Track, Warning, Exceeded)
- Configurable Thresholds: Set custom spending limits
- Flexible Periods: Daily, Weekly, or Monthly tracking
- Visual Progress Bars: See spending percentage with color coding
- Quick Presets: $500 daily, $2K weekly, $5K monthly
- Real-time Tracking: Instant updates as you add transactions
- Bell Notification: Header icon with pulsing dot when threshold met

🎨 Design & UX
- Glassmorphism UI: Frosted glass panels with backdrop blur effects
- Dual Theme Support: Beautiful light and dark modes with mesh gradient backgrounds
- Entrance Animations: Staggered fade-in and slide-up animations for all panels
- Hover Effects: Scale, rotate, and color transitions on interactive elements
- Fully Responsive: Optimized for mobile, tablet, and desktop viewports
- Premium Tooltips: Enhanced transaction details with gradient headers and icons

 🔐 Role-Based Access Control
- Admin Role: Full access to add, edit, delete transactions, and bulk upload
- Viewer Role: Read-only access to view and export data
- Easy Role Switching: Toggle between roles via dropdown in header

 💾 Data Management
- LocalStorage Persistence: All transactions, theme, role, and alert settings saved locally
- Export Functionality: Download transactions as CSV or JSON files (filtered data)
- Import from CSV: Bulk upload with validation and preview
- Mock Data Generator: Auto-generates 120 realistic transactions on first load

 🚀 Tech Stack

### Frontend
- React 19.0.0 - UI library
- React Router DOM 7.5.1 - Client-side routing
- Tailwind CSS 3.4.17 - Utility-first CSS framework
- Shadcn UI - Accessible component library
- Chart.js 4.5.1 - Data visualization
- react-chartjs-2 5.3.1 - React wrapper for Chart.js
- Phosphor Icons - Modern icon library
- date-fns 4.1.0 - Date manipulation


📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js) or **Yarn** (recommended)
- Git - [Download here](https://git-scm.com/)
- VS Code (recommended) - [Download here](https://code.visualstudio.com/)

### Check if installed:
```bash
node --version    # Should show v16.x.x or higher
npm --version     # Should show 8.x.x or higher
yarn --version    # Should show 1.22.x or higher (if using yarn)
git --version     # Should show git version 2.x.x or higher
```

## 🛠️ Installation & Setup

### Option 1: Clone This Project

```bash
# Clone the repository
git clone <repository-url>
cd finsight-dashboard

# Install dependencies
cd frontend
yarn install
# or
npm install

# Start the development server
yarn start
# or
npm start
```

The app will open at `http://localhost:3000`

### Option 2: Create From Scratch

#### Step 1: Install Node.js and Yarn
```bash
# Install Yarn globally (if not already installed)
npm install -g yarn
```

#### Step 2: Create React App
```bash
# Create a new React app
npx create-react-app finsight-dashboard
cd finsight-dashboard

# Install required dependencies
yarn add react-router-dom@7.5.1
yarn add @phosphor-icons/react
yarn add react-chartjs-2 chart.js
yarn add date-fns
yarn add clsx tailwind-merge
yarn add class-variance-authority

# Install Tailwind CSS
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Step 3: Install Shadcn UI Components
```bash
# Install Radix UI dependencies
yarn add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip

# Additional UI dependencies
yarn add sonner

# Install Tailwind animate plugin
yarn add -D tailwindcss-animate
```

 📁 Project Structure

```
finsight-dashboard/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                      # Shadcn UI components
│   │   │   ├── Header.js                # App header with navigation
│   │   │   ├── SummaryCards.js          # Financial summary cards
│   │   │   ├── BalanceTrendChart.js     # Line chart
│   │   │   ├── SpendingBreakdown.js     # Doughnut chart
│   │   │   ├── TransactionsTable.js     # Data table with filters
│   │   │   ├── TransactionModal.js      # Add/Edit modal
│   │   │   ├── BulkUploadModal.js       # CSV import modal
│   │   │   ├── InsightsPanel.js         # Insights sidebar
│   │   │   ├── SpendingAlertsBanner.js  # Alert notification banner
│   │   │   └── SpendingAlertsSettings.js # Alert configuration modal
│   │   ├── context/
│   │   │   └── AppContext.js            # Global state management
│   │   ├── utils/
│   │   │   ├── mockData.js              # Mock transaction generator
│   │   │   ├── calculations.js          # Financial calculations
│   │   │   ├── export.js                # CSV/JSON export
│   │   │   ├── import.js                # CSV parsing & validation
│   │   │   └── alerts.js                # Spending alert calculations
│   │   ├── App.js                       # Main app component
│   │   ├── App.css                      # App styles
│   │   └── index.css                    # Global styles & Tailwind
│   ├── package.json
│   └── tailwind.config.js
├── README.md

```
🎮 Available Scripts

### Development
```bash
yarn start          # Start development server (http://localhost:3000)
yarn build          # Build for production
yarn test           # Run tests
```

### Using npm
```bash
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
```

 🎯 Usage Guide

### First Time Setup
1. Open the app → 120 mock transactions are automatically generated
2. Data is saved to browser's localStorage
3. Start exploring!

### Switch Roles
1. Click user avatar in top right
2. Select "Admin" or "Viewer"
3. Admin: Full access | Viewer: Read-only

### Add Transaction (Admin only)
1. Click "Add Transaction" button
2. Fill in the form:
   - Date, Type (Income/Expense)
   - Category, Description, Amount
   - Optional: Notes, Receipt attachment
3. Click "Add Transaction"

### Bulk Upload (Admin only)
1. Click "Bulk Upload" button
2. Choose format: Standard CSV or Bank Statement
3. Upload CSV file (or download template first)
4. Preview transactions
5. Click "Import Transactions"

CSV Format:
```csv
Date,Description,Category,Type,Amount,Notes
2024-01-01,Grocery Shopping,Food & Dining,expense,125.50,Weekly groceries
2024-01-02,Monthly Salary,Salary,income,5000.00,Paycheck
```

Bank Statement Format:
```csv
Date,Description,Debit,Credit,Balance
01/15/2024,Grocery Store,125.50,,5874.50
01/16/2024,Salary Deposit,,5000.00,10874.50
```

### Configure Spending Alerts
1. Click bell icon in header
2. Enable alerts toggle
3. Set spending limit (e.g., $1000)
4. Choose period (Daily/Weekly/Monthly)
5. Click "Save Settings"
6. Alert banner appears when threshold is met

### Filter Transactions
- Search: Type in search box (searches description, category, serial #)
- Category: Select from dropdown
- Type: Choose Income or Expense
- Date Range: Pick start and end dates
- Sort: By date or amount
- Clear All: Click "Clear Filters" button

### View Transaction Details
- Hover over any amount in the table
- See enhanced tooltip with:
  - Serial number & transaction name
  - Full date & category
  - Amount (large display)
  - Notes (if added)
  - Receipt status (if attached)

### Export Data
1. Click "Export" in header
2. Choose "Export as CSV" or "Export as JSON"
3. File downloads automatically (includes filtered data)

### Toggle Theme
Click sun/moon icon in header to switch between light and dark modes

🔧 Data Storage Explained

### Current Setup: STATIC (Client-Side)
- Storage: Browser's localStorage
- Location: `localStorage.getItem('transactions')`
- Pros: 
  - ✅ No server needed
  - ✅ Works offline
  - ✅ Instant performance
- Cons: 
  - ❌ Data only on your device
  - ❌ Lost if browser cache cleared
  - ❌ No sync across devices

### Mock Data Generation
How it works:
1. First visit: No data in localStorage
2. `generateMockTransactions(120)` runs
3. Creates 120 fake transactions with:
   - Random dates (last 180 days)
   - Random categories & descriptions
   - Random amounts ($10-$510 for expenses, $500-$4500 for income)
   - Serial numbers (#1000+)
4. Saves to localStorage
5. Next visit: Loads from localStorage

Want fresh data?
```javascript
// In browser console (F12)
localStorage.clear()
location.reload()
```

### To Make DYNAMIC (Real Database)
Would need:
- Backend API (FastAPI  in `/app/backend/`)
- MongoDB/PostgreSQL database
- API endpoints: `POST /api/transactions`, `GET /api/transactions`
- Data would sync across devices

🎨 Customization

### Change Color Scheme
Edit `/frontend/src/index.css`:

```css
:root {
    --background: 248 250 252;
    --primary: 79 70 229;
    /* Add your custom colors */
}

.dark {
    --background: 2 6 23;
    --primary: 99 102 241;
}
```

### Modify Mock Data
Edit `/frontend/src/utils/mockData.js`:
- Change transaction count: `generateMockTransactions(200)`
- Add categories: Modify `categories` array
- Change amount ranges: Adjust random calculation
- Customize descriptions: Edit `descriptions` object

### Change Spending Alert Defaults
Edit `/frontend/src/context/AppContext.js`:
```javascript
const [spendingAlert, setSpendingAlert] = useState({
    enabled: true,
    threshold: 2000,  // Change default threshold
    period: 'weekly', // Change default period
});
```

🔑 Key Components

### AppContext (`context/AppContext.js`)
Global state management for:
- Transactions (CRUD operations)
- User role (Admin/Viewer)
- Theme (Light/Dark)
- Filters (Search, Category, Type, Sort, Date Range)
- Spending Alerts configuration

### TransactionsTable (`components/TransactionsTable.js`)
Main table display featuring:
- Serial number column (#1000+)
- Search, filters, date range picker
- Clear filters button
- Bulk upload button
- Enhanced tooltips on amount hover
- Edit/Delete actions (Admin only)

### Transaction Modals
- TransactionModal: Add/Edit with notes & receipt upload
- BulkUploadModal: CSV import with validation & preview

### Spending Alerts
- SpendingAlertsBanner: Visual notification banner
- SpendingAlertsSettings: Configuration modal
- alerts.js: Calculation logic for period-based spending

### Charts
- BalanceTrendChart: Line chart showing balance over time
- SpendingBreakdown: Doughnut chart for expense categories

🐛 Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 yarn start
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json yarn.lock
yarn install
```

### Mock data not generating
```bash
# Clear localStorage and refresh
# Open browser console (F12)
localStorage.clear()
location.reload()
```

### Tooltips not showing
- Make sure you're hovering over the *amount* column
- Wait 200ms for tooltip delay
- Check that Tooltip component is imported

### Bulk upload validation errors
- Ensure CSV has correct headers
- Check date format (YYYY-MM-DD or MM/DD/YYYY)
- Verify amount is a number
- Category must match existing categories

📱 Browser Support

- Chrome (latest) ✅
- Firefox (latest) ✅
- Safari (latest) ✅
- Edge (latest) ✅

🎯 Feature Checklist

- [x] Dashboard with summary cards
- [x] Balance trend chart
- [x] Spending breakdown chart
- [x] Transaction table with CRUD
- [x] Advanced filtering & search
- [x] Date range picker
- [x] Clear all filters
- [x] Role-based access (Admin/Viewer)
- [x] Dark/Light theme toggle
- [x] CSV/JSON export
- [x] Bulk CSV import
- [x] Bank statement import
- [x] Transaction serial numbers
- [x] Enhanced tooltips with details
- [x] Transaction notes
- [x] Receipt attachments
- [x] Spending alerts system
- [x] LocalStorage persistence
- [x] Responsive design
- [x] Glassmorphism UI
- [x] Entrance animations
- [x] Hover effects

 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

👨‍💻 Author

Built with ❤️ using React and Glassmorphism design principles

🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for beautiful components
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Phosphor Icons](https://phosphoricons.com/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [date-fns](https://date-fns.org/) for date manipulation


 Enjoy using FinSight! 💰✨
