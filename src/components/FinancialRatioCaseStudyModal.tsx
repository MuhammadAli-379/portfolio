import React, { useState, useEffect } from 'react';
import { 
  X, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  LineChart, 
  ShieldAlert, 
  Building2, 
  Calendar, 
  Scale, 
  Percent, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  ChevronRight,
  Info,
  Layers,
  ArrowRight,
  SlidersHorizontal,
  Flame,
  Globe2,
  AlertTriangle,
  Calculator,
  Compass,
  FileSpreadsheet,
  ExternalLink
} from 'lucide-react';
import { AcademicProject } from '../types/portfolio';
import { CaseStudyModalShell, TabItem } from './CaseStudyModalShell';

interface FinancialRatioCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: AcademicProject;
  initialTab?: 'overview' | 'dashboard' | 'ratios' | 'dupont' | 'horizontal-vertical' | 'risk-pestel' | 'valuation';
}

export const FinancialRatioCaseStudyModal: React.FC<FinancialRatioCaseStudyModalProps> = ({
  isOpen,
  onClose,
  project,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'dashboard' | 'ratios' | 'dupont' | 'horizontal-vertical' | 'risk-pestel' | 'valuation'>(initialTab);
  const [selectedCompany, setSelectedCompany] = useState<'OGDC' | 'PPL' | 'MARI'>('OGDC');
  const [selectedRatioCategory, setSelectedRatioCategory] = useState<'liquidity' | 'solvency' | 'efficiency' | 'market' | 'profitability'>('profitability');
  const [dupontCompany, setDupontCompany] = useState<'OGDC' | 'PPL' | 'MARI'>('OGDC');
  const [dupontYear, setDupontYear] = useState<number>(2025);
  const [expandedPestel, setExpandedPestel] = useState<string | null>('political');
  const [expandedRisk, setExpandedRisk] = useState<string | null>('financial');
  const [valuationTab, setValuationTab] = useState<'relative' | 'dcf'>('relative');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{ label: string; value: string; year: number; company: string } | null>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Company Brand Colors
  // OGDC: Blue (#3b82f6 / #2563eb)
  // PPL: Green (#10b981 / #059669)
  // MARI: Gold/Amber (#f59e0b / #d97706)

  // FY2025 Snapshot Data
  const fy2025Dashboard = [
    { metric: 'Revenue', ogdc: 'PKR 401,178m', ppl: 'PKR 244,977m', mari: 'PKR 141,486m', ogdcVal: 401178, pplVal: 244977, mariVal: 141486, unit: 'scale', desc: 'Top-line gross sales from hydrocarbon extraction' },
    { metric: 'Net Income', ogdc: 'PKR 169,903m', ppl: 'PKR 89,949m', mari: 'PKR 65,369m', ogdcVal: 169903, pplVal: 89949, mariVal: 65369, unit: 'scale', desc: 'Absolute bottom-line profit after tax and royalties' },
    { metric: 'Current Ratio', ogdc: '8.97x', ppl: '4.78x', mari: '2.97x', ogdcVal: 8.97, pplVal: 4.78, mariVal: 2.97, unit: 'ratio', desc: 'Current Assets / Current Liabilities (Short-term buffer)' },
    { metric: 'Quick Ratio', ogdc: '8.72x', ppl: '4.72x', mari: '2.78x', ogdcVal: 8.72, pplVal: 4.72, mariVal: 2.78, unit: 'ratio', desc: '(Current Assets - Inventory) / Current Liabilities' },
    { metric: 'Interest Coverage', ogdc: '3.54x', ppl: '6.55x', mari: '7.86x', ogdcVal: 3.54, pplVal: 6.55, mariVal: 7.86, unit: 'ratio', desc: 'EBIT / Finance Cost (Debt servicing safety margin)' },
    { metric: 'Asset Turnover', ogdc: '0.24x', ppl: '0.26x', mari: '0.33x', ogdcVal: 0.24, pplVal: 0.26, mariVal: 0.33, unit: 'ratio', desc: 'Revenue / Total Assets (Capital efficiency)' },
    { metric: 'Return on Assets (ROA)', ogdc: '10.27%', ppl: '9.68%', mari: '15.36%', ogdcVal: 10.27, pplVal: 9.68, mariVal: 15.36, unit: 'pct', desc: 'Net Income / Total Assets' },
    { metric: 'Return on Equity (ROE)', ogdc: '12.60%', ppl: '12.76%', mari: '23.87%', ogdcVal: 12.60, pplVal: 12.76, mariVal: 23.87, unit: 'pct', desc: 'Net Income / Shareholders Equity' },
    { metric: 'Earnings Per Share (EPS)', ogdc: 'PKR 39.50', ppl: 'PKR 33.06', mari: 'PKR 54.45', ogdcVal: 39.50, pplVal: 33.06, mariVal: 54.45, unit: 'currency', desc: 'Net profit divided by diluted ordinary shares' },
    { metric: 'Price-to-Earnings (P/E)', ogdc: '4.56x', ppl: '4.54x', mari: '9.18x', ogdcVal: 4.56, pplVal: 4.54, mariVal: 9.18, unit: 'ratio', desc: 'Market Price / EPS (Valuation multiple)' },
    { metric: 'Dividend Yield', ogdc: '2.81%', ppl: '3.33%', mari: '4.34%', ogdcVal: 2.81, pplVal: 3.33, mariVal: 4.34, unit: 'pct', desc: 'Annual dividend per share / Current market price' }
  ];

  // Five-Year Historical Ratio Series
  const historicalData: Record<'OGDC' | 'PPL' | 'MARI', Record<string, number[]>> = {
    OGDC: {
      currentRatio: [6.40, 5.60, 5.96, 5.86, 8.97],
      quickRatio: [6.21, 5.45, 5.81, 5.73, 8.72],
      interestCoverage: [5.92, 9.75, 6.17, 3.74, 3.54],
      inventoryTurnover: [5.08, 5.78, 6.15, 7.38, 5.53],
      receivablesTurnover: [0.63, 0.69, 0.67, 0.68, 0.61],
      assetTurnover: [0.25, 0.30, 0.29, 0.29, 0.24],
      eps: [21.28, 31.11, 52.23, 48.59, 39.50],
      peRatio: [9.40, 7.07, 4.79, 4.73, 4.56],
      dividendYield: [3.45, 3.30, 3.42, 4.40, 2.81],
      grossMargin: [58.45, 64.66, 65.22, 61.10, 57.73],
      netMargin: [38.28, 39.88, 54.31, 45.07, 42.35],
      roa: [9.57, 11.84, 15.77, 13.03, 10.27],
      roe: [11.89, 15.28, 20.74, 16.71, 12.60],
      debtToEquity: [0.038, 0.035, 0.032, 0.030, 0.028],
      equityMultiplier: [1.242, 1.291, 1.315, 1.282, 1.227]
    },
    PPL: {
      currentRatio: [4.37, 3.52, 3.32, 3.55, 4.78],
      quickRatio: [4.31, 3.48, 3.28, 3.52, 4.72],
      interestCoverage: [17.25, 13.42, 12.89, 8.85, 6.55],
      inventoryTurnover: [13.79, 12.99, 16.23, 14.78, 10.49],
      receivablesTurnover: [0.53, 0.56, 0.56, 0.50, 0.41],
      assetTurnover: [0.28, 0.32, 0.36, 0.32, 0.26],
      eps: [19.21, 19.98, 35.73, 42.44, 33.06],
      peRatio: [6.25, 6.51, 4.48, 4.24, 4.54],
      dividendYield: [2.92, 1.92, 3.75, 4.17, 3.33],
      grossMargin: [57.81, 64.98, 66.60, 65.19, 62.28],
      netMargin: [35.02, 26.67, 33.75, 39.65, 36.72],
      roa: [9.73, 8.65, 12.24, 12.65, 9.68],
      roe: [13.44, 12.50, 17.98, 18.02, 12.76],
      debtToEquity: [0.045, 0.042, 0.038, 0.035, 0.031],
      equityMultiplier: [1.381, 1.445, 1.469, 1.424, 1.318]
    },
    MARI: {
      currentRatio: [3.61, 2.26, 1.98, 2.79, 2.97],
      quickRatio: [3.49, 2.17, 1.86, 2.66, 2.78],
      interestCoverage: [10.27, 19.77, 17.21, 10.50, 7.86],
      inventoryTurnover: [5.12, 4.93, 3.76, 4.04, 3.17],
      receivablesTurnover: [2.27, 2.57, 2.08, 1.97, 1.63],
      assetTurnover: [0.42, 0.45, 0.50, 0.46, 0.33],
      eps: [26.19, 27.54, 46.75, 64.37, 54.45],
      peRatio: [13.36, 13.80, 9.63, 8.54, 9.18],
      dividendYield: [4.48, 3.63, 3.63, 4.69, 4.34],
      grossMargin: [76.95, 79.69, 79.49, 78.19, 71.63],
      netMargin: [49.36, 39.77, 43.77, 48.39, 46.20],
      roa: [20.91, 17.86, 22.05, 22.30, 15.36],
      roe: [27.22, 25.27, 33.33, 34.36, 23.87],
      debtToEquity: [0.082, 0.075, 0.068, 0.060, 0.055],
      equityMultiplier: [1.302, 1.415, 1.511, 1.541, 1.554]
    }
  };

  const years = [2021, 2022, 2023, 2024, 2025];

  // Revenue Historical Data
  const revenueHistory = [
    { year: 2021, ogdc: 239774, ppl: 149279, mari: 63703 },
    { year: 2022, ogdc: 279816, ppl: 203811, mari: 83135 },
    { year: 2023, ogdc: 324282, ppl: 288053, mari: 128221 },
    { year: 2024, ogdc: 378423, ppl: 291241, mari: 159731 },
    { year: 2025, ogdc: 401178, ppl: 244977, mari: 141486 }
  ];

  // Horizontal Analysis Growth Rates (5-Year Compound / Base-Year Growth)
  const horizontalAnalysis = [
    { metric: 'Revenue', ogdc: '+67.8%', ppl: '+64.1%', mari: '+122.1%', ogdcNum: 67.8, pplNum: 64.1, mariNum: 122.1, note: 'MARI achieved highest top-line expansion due to new gas field commercialization.' },
    { metric: 'Net Profit', ogdc: '+85.6%', ppl: '+72.0%', mari: '+107.9%', ogdcNum: 85.6, pplNum: 72.0, mariNum: 107.9, note: 'All three E&P majors grew net earnings faster than baseline revenue over the cycle.' },
    { metric: 'Total Assets', ogdc: '+73.1%', ppl: '+73.0%', mari: '+182.9%', ogdcNum: 73.1, pplNum: 73.0, mariNum: 182.9, note: 'MARI balance sheet expanded significantly through capex and exploration assets.' },
    { metric: 'Total Liabilities', ogdc: '+122.5%', ppl: '+51.0%', mari: '+335%', ogdcNum: 122.5, pplNum: 51.0, mariNum: 335.0, note: 'Reflects decommissioning provisions, royalty payables, and working capital needs.' },
    { metric: 'Total Equity', ogdc: '+61.1%', ppl: '+81.3%', mari: '+137%', ogdcNum: 61.1, pplNum: 81.3, mariNum: 137.0, note: 'Strong retained earnings generation fortified balance sheet solvency.' }
  ];

  // Vertical (Common-Size) Analysis Data
  const commonSizeIncome = [
    { metric: 'Cost of Revenue', ogdc: '42.28%', ppl: '37.72%', mari: '28.37%', ogdcVal: 42.28, pplVal: 37.72, mariVal: 28.37, desc: 'Production operating expenses + royalties / Revenue' },
    { metric: 'Gross Profit', ogdc: '57.72%', ppl: '62.28%', mari: '71.63%', ogdcVal: 57.72, pplVal: 62.28, mariVal: 71.63, desc: 'Gross margin remaining after direct extraction costs' },
    { metric: 'Operating Income', ogdc: '46.40%', ppl: '46.40%', mari: '55.03%', ogdcVal: 46.40, pplVal: 46.40, mariVal: 55.03, desc: 'EBIT margin reflecting core field profitability' },
    { metric: 'Net Income', ogdc: '42.35%', ppl: '36.72%', mari: '46.20%', ogdcVal: 42.35, pplVal: 36.72, mariVal: 46.20, desc: 'Final net profit margin retention rate' }
  ];

  const commonSizeBalanceSheet = [
    { metric: 'Current Assets', ogdc: '42.47%', ppl: '75.53%', mari: '47.90%', ogdcVal: 42.47, pplVal: 75.53, mariVal: 47.90, desc: 'Working capital, cash, and receivables share of total assets' },
    { metric: 'Net PPE', ogdc: '57.53%', ppl: '15.54%', mari: '47.33%', ogdcVal: 57.53, pplVal: 15.54, mariVal: 47.33, desc: 'Fixed drilling rigs, exploration assets, and plant' },
    { metric: 'Total Liabilities', ogdc: '25.06%', ppl: '24.14%', mari: '35.62%', ogdcVal: 25.06, pplVal: 24.14, mariVal: 35.62, desc: 'Total debt, provisions, and trade obligations' },
    { metric: 'Total Equity', ogdc: '74.94%', ppl: '75.86%', mari: '64.38%', ogdcVal: 74.94, pplVal: 75.86, mariVal: 64.38, desc: 'Shareholder equity financing cushion' }
  ];

  // DuPont Calculation Helper
  const getDupontValues = (comp: 'OGDC' | 'PPL' | 'MARI', yr: number) => {
    const idx = years.indexOf(yr);
    const netM = historicalData[comp].netMargin[idx];
    const assetT = historicalData[comp].assetTurnover[idx];
    const eqMult = historicalData[comp].equityMultiplier[idx];
    const roe = historicalData[comp].roe[idx];
    const roa = historicalData[comp].roa[idx];
    return { netM, assetT, eqMult, roe, roa };
  };

  const currentDupont = getDupontValues(dupontCompany, dupontYear);

  const TABS: TabItem[] = [
    { id: 'overview', label: <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /><span>Overview & Scale</span></span> },
    { id: 'dashboard', label: <span className="flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5" /><span>FY2025 Dashboard</span></span> },
    { id: 'ratios', label: <span className="flex items-center gap-1.5"><LineChart className="w-3.5 h-3.5" /><span>5-Year Ratio Trends</span></span> },
    { id: 'horizontal-vertical', label: <span className="flex items-center gap-1.5"><FileSpreadsheet className="w-3.5 h-3.5" /><span>Horizontal & Common-Size</span></span> },
    { id: 'dupont', label: <span className="flex items-center gap-1.5"><Calculator className="w-3.5 h-3.5" /><span>DuPont Analysis</span></span> },
    { id: 'valuation', label: <span className="flex items-center gap-1.5"><Scale className="w-3.5 h-3.5" /><span>Valuation & Benchmarking</span></span> },
    { id: 'risk-pestel', label: <span className="flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5" /><span>Risk & PESTEL Analysis</span></span> },
  ];

  const subHeader = (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--theme-text-muted)]">
        <span>Five-Year Comparative Financial Analysis · DuPont Decomposition · Horizontal & Vertical Analysis (FY2021–FY2025)</span>
      </div>
      <div className="flex items-center gap-3 px-3 py-1 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[11px] font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-[var(--theme-text)] font-semibold">OGDC</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[var(--theme-text)] font-semibold">PPL</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-[var(--theme-text)] font-semibold">MARI</span>
        </span>
      </div>
    </div>
  );

  return (
    <CaseStudyModalShell
      isOpen={isOpen}
      onClose={onClose}
      project={project}
      projectNumber="05"
      category="Corporate Finance"
      title={project?.title || "Financial Ratio Analysis — OGDC, PPL & MARI"}
      subtitle="Business Finance • FY 2021–2025"
      metadataText="Five-Year Comparative Financial Analysis · DuPont Decomposition · Horizontal & Vertical Analysis (FY2021–FY2025)"
      liveDemoUrl="https://financial-analysis-dashboard-109.streamlit.app/"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as any)}
      subHeader={subHeader}
    >
      <div className="space-y-8 select-text">
          
          {/* ================= TAB 1: EXECUTIVE OVERVIEW & SCALE ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Educational Disclaimer Banner */}
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white font-mono uppercase text-[11px] block">
                    Academic Finance Project Notice
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    This project was completed for the Business Finance curriculum at COMSATS University Islamabad. It conducts five-year comparative financial analysis of Pakistan's major Exploration & Production (E&P) companies. In accordance with professional financial standards, company scale is strictly distinguished from ratio-based efficiency; no single firm is portrayed as universally superior.
                  </p>
                </div>
              </div>

              {/* Three Companies Scale Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* OGDC Card */}
                <div className="p-5 rounded-xl border border-blue-500/30 bg-blue-500/5 dark:bg-blue-950/20 space-y-3 relative overflow-hidden shadow-none">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500 text-white">
                      OGDC · Scale Leader
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">PSX: OGDC</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Oil & Gas Development Company Limited
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      National flag-carrier and largest exploration enterprise in Pakistan.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-blue-500/20 space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">FY2025 Revenue:</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">PKR 401,178m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">FY2025 Net Income:</span>
                      <span className="font-bold text-slate-900 dark:text-white">PKR 169,903m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Distinct Strengths:</span>
                      <span className="text-slate-700 dark:text-slate-300">Highest Liquidity (CR 8.97x)</span>
                    </div>
                  </div>
                </div>

                {/* PPL Card */}
                <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-3 relative overflow-hidden shadow-none">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-white">
                      PPL · Major Producer
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">PSX: PPL</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Pakistan Petroleum Limited
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Pioneer of natural gas in Pakistan operating the giant Sui gas field.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-emerald-500/20 space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">FY2025 Revenue:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">PKR 244,977m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">FY2025 Net Income:</span>
                      <span className="font-bold text-slate-900 dark:text-white">PKR 89,949m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Distinct Strengths:</span>
                      <span className="text-slate-700 dark:text-slate-300">High Current Assets (75.5%)</span>
                    </div>
                  </div>
                </div>

                {/* MARI Card */}
                <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 space-y-3 relative overflow-hidden shadow-none">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-white">
                      MARI · Efficiency Leader
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">PSX: MARI</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Mari Petroleum Company Limited
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      High-efficiency producer operating the cost-effective Mari gas field.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-amber-500/20 space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">FY2025 Revenue:</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">PKR 141,486m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">FY2025 Net Income:</span>
                      <span className="font-bold text-slate-900 dark:text-white">PKR 65,369m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Distinct Strengths:</span>
                      <span className="text-slate-700 dark:text-slate-300">Highest ROE (23.87%) & ROA</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Analytical Scope Overview */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3 shadow-none">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-blue-500" />
                  Comparative Analytical Framework (FY2021–FY2025)
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  The study investigates how macroeconomic shifts, rupee depreciation, circular debt accumulations in the power sector, and international crude price movements impacted three distinct operational scales:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white block">Scale vs Efficiency</span>
                    <span className="text-slate-500 text-[11px] block mt-1">OGDC possesses massive asset scale (PKR 401B revenue), whereas MARI generates superior asset turnover (0.33x) and ROE (23.87%).</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white block">Liquidity Buffers</span>
                    <span className="text-slate-500 text-[11px] block mt-1">OGDC maintains an exceptional 8.97x current ratio, insulating it from sovereign receivables settlement delays.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white block">Capital Structure</span>
                    <span className="text-slate-500 text-[11px] block mt-1">All three firms operate with low formal financial leverage (Debt/Equity &lt; 0.10x), driven by high equity retention.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white block">Valuation Dispersion</span>
                    <span className="text-slate-500 text-[11px] block mt-1">P/E multiples range from 4.54x (PPL) to 9.18x (MARI), reflecting market premiums for return efficiency and field longevity.</span>
                  </div>
                </div>
              </div>

              {/* Data Inconsistency & Methodology Transparency Section (Req #19) */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 shadow-none">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Methodology Safeguards & Data Notes
                  </h4>
                </div>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>
                    • <strong>Primary Dataset Standard:</strong> All financial ratio trend series and FY2025 snapshots strictly utilize the authoritative ratio tables reported in the project coursework.
                  </p>
                  <p>
                    • <strong>Revenue Reporting Nuance:</strong> In the academic report, OGDC's FY2021 revenue is cited as 239,774m in the revenue growth table and 239,104m in horizontal analysis footnotes. In this dashboard, 239,774m is maintained for consistency with the 5-year trend series.
                  </p>
                  <p>
                    • <strong>Standardized Identifier:</strong> Standardized to <strong>MARI</strong> throughout all interactive components (resolving the occasional MARE typographical notation in raw source files).
                  </p>
                  <p>
                    • <strong>Valuation Framework Integrity:</strong> The project documents a full Discounted Cash Flow (DCF) framework. Because finalized terminal cash flows and WACC discount rate assumptions were left open in the academic report, no speculative target prices are fabricated; the framework and relative valuations are presented transparently.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 2: FY2025 DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    FY2025 Comparative Performance Benchmark
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    Exact reported figures across scale, liquidity, coverage, efficiency, profitability, and valuation
                  </span>
                </div>
              </div>

              {/* Cross-Company FY2025 Comparison Table */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-none">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300 uppercase border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Financial Metric</th>
                        <th className="py-3 px-4 text-blue-600 dark:text-blue-400 font-bold">OGDC</th>
                        <th className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">PPL</th>
                        <th className="py-3 px-4 text-amber-600 dark:text-amber-400 font-bold">MARI</th>
                        <th className="py-3 px-4 text-slate-500">Analytical Interpretation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                      {fy2025Dashboard.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900 dark:text-white block">{row.metric}</span>
                            <span className="text-[10px] text-slate-400 font-sans block">{row.desc}</span>
                          </td>
                          <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">
                            {row.ogdc}
                          </td>
                          <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                            {row.ppl}
                          </td>
                          <td className="py-3 px-4 font-bold text-amber-600 dark:text-amber-400">
                            {row.mari}
                          </td>
                          <td className="py-3 px-4 text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                            {row.metric === 'Revenue' && 'OGDC operates with 2.8x the revenue volume of MARI and 1.6x of PPL.'}
                            {row.metric === 'Net Income' && 'OGDC produces the highest dollar profit, whereas MARI retains the highest margin.'}
                            {row.metric === 'Current Ratio' && 'OGDC maintains superior short-term liquidity buffer against delayed circular debt receipts.'}
                            {row.metric === 'Quick Ratio' && 'Minimal spread from Current Ratio confirms low inventory holding drag across all three.'}
                            {row.metric === 'Interest Coverage' && 'MARI exhibits the highest safety cushion for servicing periodic debt obligations.'}
                            {row.metric === 'Asset Turnover' && 'MARI extracts 33 cents of revenue per PKR asset, leading capital utilization.'}
                            {row.metric === 'Return on Assets (ROA)' && 'MARI achieves 15.36% ROA, outperforming peers by ~500 bps.'}
                            {row.metric === 'Return on Equity (ROE)' && 'MARI nearly doubles peer ROE through operating margin and asset velocity.'}
                            {row.metric === 'Earnings Per Share (EPS)' && 'MARI records highest per-share earnings power at PKR 54.45.'}
                            {row.metric === 'Price-to-Earnings (P/E)' && 'Market prices MARI at ~9.2x versus ~4.5x for OGDC and PPL (high-efficiency premium).'}
                            {row.metric === 'Dividend Yield' && 'All three maintain attractive cash yields, led by MARI (4.34%) and PPL (3.33%).'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Metric Highlights Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-1 text-xs">
                  <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase">Scale Benchmark</span>
                  <p className="font-semibold text-slate-900 dark:text-white">OGDC: PKR 401.18B Revenue</p>
                  <p className="text-slate-500 text-[11px]">Dominates national hydrocarbon extraction volumes, producing PKR 169.90B in net profit.</p>
                </div>
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1 text-xs">
                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">Liquidity Profile</span>
                  <p className="font-semibold text-slate-900 dark:text-white">PPL: 75.53% Current Assets</p>
                  <p className="text-slate-500 text-[11px]">High working capital proportion, quick ratio of 4.72x, and balanced 12.76% ROE.</p>
                </div>
                <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1 text-xs">
                  <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase">Return Efficiency</span>
                  <p className="font-semibold text-slate-900 dark:text-white">MARI: 23.87% ROE / 15.36% ROA</p>
                  <p className="text-slate-500 text-[11px]">Superior capital velocity and 71.63% gross margin deliver sector-leading equity returns.</p>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 3: 5-YEAR RATIO TRENDS ================= */}
          {activeTab === 'ratios' && (
            <div className="space-y-6">
              
              {/* Controls: Company and Category Selectors */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                
                {/* Company Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
                  {(['OGDC', 'PPL', 'MARI'] as const).map((comp) => (
                    <button
                      key={comp}
                      onClick={() => setSelectedCompany(comp)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        selectedCompany === comp
                          ? comp === 'OGDC'
                            ? 'bg-blue-600 text-white shadow'
                            : comp === 'PPL'
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-amber-600 text-white shadow'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {comp}
                    </button>
                  ))}
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-1">
                  {[
                    { id: 'profitability', label: 'Profitability' },
                    { id: 'liquidity', label: 'Liquidity' },
                    { id: 'solvency', label: 'Solvency & Coverage' },
                    { id: 'efficiency', label: 'Efficiency' },
                    { id: 'market', label: 'Market Valuation' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedRatioCategory(cat.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        selectedRatioCategory === cat.id
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

              </div>

              {/* Dynamic Chart Container */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-4 shadow-none">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400">
                      {selectedCompany} · {selectedRatioCategory.toUpperCase()} METRICS (2021–2025)
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      5-Year Multi-Year Evolution
                    </h4>
                  </div>
                  {hoveredDataPoint && (
                    <div className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs">
                      <span className="text-slate-400">{hoveredDataPoint.label} ({hoveredDataPoint.year}): </span>
                      <span className="font-bold text-slate-900 dark:text-white">{hoveredDataPoint.value}</span>
                    </div>
                  )}
                </div>

                {/* SVG Visual Multi-Line Trend */}
                <div className="space-y-4">
                  
                  {/* Category-Specific Charts */}
                  {selectedRatioCategory === 'profitability' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Margins Chart (Gross Margin vs Net Margin) */}
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-2">
                        <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 block">
                          Gross Margin vs Net Profit Margin (%)
                        </span>
                        <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-200 dark:border-slate-800">
                          {years.map((yr, i) => {
                            const gm = historicalData[selectedCompany].grossMargin[i];
                            const nm = historicalData[selectedCompany].netMargin[i];
                            return (
                              <div 
                                key={yr} 
                                className="flex-1 flex flex-col items-center gap-1 h-full justify-end cursor-pointer group"
                                onMouseEnter={() => setHoveredDataPoint({ label: 'Gross / Net Margin', value: `${gm}% / ${nm}%`, year: yr, company: selectedCompany })}
                                onMouseLeave={() => setHoveredDataPoint(null)}
                              >
                                <div className="w-full flex items-end justify-center gap-1 h-full">
                                  {/* Gross Margin Bar */}
                                  <div 
                                    className="w-1/2 rounded-t bg-blue-500/80 group-hover:bg-blue-500 transition-all relative"
                                    style={{ height: `${(gm / 85) * 100}%` }}
                                    title={`Gross Margin: ${gm}%`}
                                  />
                                  {/* Net Margin Bar */}
                                  <div 
                                    className="w-1/2 rounded-t bg-emerald-500/80 group-hover:bg-emerald-500 transition-all relative"
                                    style={{ height: `${(nm / 85) * 100}%` }}
                                    title={`Net Margin: ${nm}%`}
                                  />
                                </div>
                                <span className="font-mono text-[10px] text-slate-500">{yr}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-1">
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-blue-500" /> Gross Margin</span>
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-emerald-500" /> Net Margin</span>
                          <span>Max 85%</span>
                        </div>
                      </div>

                      {/* Returns Chart (ROA vs ROE) */}
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-2">
                        <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 block">
                          Return on Assets (ROA) vs Return on Equity (ROE) (%)
                        </span>
                        <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-200 dark:border-slate-800">
                          {years.map((yr, i) => {
                            const roa = historicalData[selectedCompany].roa[i];
                            const roe = historicalData[selectedCompany].roe[i];
                            return (
                              <div 
                                key={yr} 
                                className="flex-1 flex flex-col items-center gap-1 h-full justify-end cursor-pointer group"
                                onMouseEnter={() => setHoveredDataPoint({ label: 'ROA / ROE', value: `${roa}% / ${roe}%`, year: yr, company: selectedCompany })}
                                onMouseLeave={() => setHoveredDataPoint(null)}
                              >
                                <div className="w-full flex items-end justify-center gap-1 h-full">
                                  {/* ROA Bar */}
                                  <div 
                                    className="w-1/2 rounded-t bg-cyan-500/80 group-hover:bg-cyan-500 transition-all"
                                    style={{ height: `${(roa / 40) * 100}%` }}
                                    title={`ROA: ${roa}%`}
                                  />
                                  {/* ROE Bar */}
                                  <div 
                                    className="w-1/2 rounded-t bg-amber-500/80 group-hover:bg-amber-500 transition-all"
                                    style={{ height: `${(roe / 40) * 100}%` }}
                                    title={`ROE: ${roe}%`}
                                  />
                                </div>
                                <span className="font-mono text-[10px] text-slate-500">{yr}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-1">
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-cyan-500" /> ROA</span>
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-amber-500" /> ROE</span>
                          <span>Max 40%</span>
                        </div>
                      </div>

                    </div>
                  )}

                  {selectedRatioCategory === 'liquidity' && (
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-2">
                      <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        Current Ratio vs Quick Ratio (x)
                      </span>
                      <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 px-4 border-b border-slate-200 dark:border-slate-800">
                        {years.map((yr, i) => {
                          const cr = historicalData[selectedCompany].currentRatio[i];
                          const qr = historicalData[selectedCompany].quickRatio[i];
                          return (
                            <div 
                              key={yr} 
                              className="flex-1 flex flex-col items-center gap-1 h-full justify-end cursor-pointer group"
                              onMouseEnter={() => setHoveredDataPoint({ label: 'Current / Quick', value: `${cr}x / ${qr}x`, year: yr, company: selectedCompany })}
                              onMouseLeave={() => setHoveredDataPoint(null)}
                            >
                              <div className="w-full flex items-end justify-center gap-1.5 h-full">
                                <div 
                                  className="w-1/2 rounded-t bg-blue-500 group-hover:brightness-110 transition-all"
                                  style={{ height: `${(cr / 10) * 100}%` }}
                                  title={`Current Ratio: ${cr}x`}
                                />
                                <div 
                                  className="w-1/2 rounded-t bg-indigo-400 group-hover:brightness-110 transition-all"
                                  style={{ height: `${(qr / 10) * 100}%` }}
                                  title={`Quick Ratio: ${qr}x`}
                                />
                              </div>
                              <span className="font-mono text-[10px] text-slate-500">{yr}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-1">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-blue-500" /> Current Ratio</span>
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-indigo-400" /> Quick Ratio</span>
                        <span>Scale: 0x - 10x</span>
                      </div>
                    </div>
                  )}

                  {selectedRatioCategory === 'solvency' && (
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-2">
                      <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        Interest Coverage Ratio (x)
                      </span>
                      <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 px-4 border-b border-slate-200 dark:border-slate-800">
                        {years.map((yr, i) => {
                          const ic = historicalData[selectedCompany].interestCoverage[i];
                          return (
                            <div 
                              key={yr} 
                              className="flex-1 flex flex-col items-center gap-1 h-full justify-end cursor-pointer group"
                              onMouseEnter={() => setHoveredDataPoint({ label: 'Interest Coverage', value: `${ic}x`, year: yr, company: selectedCompany })}
                              onMouseLeave={() => setHoveredDataPoint(null)}
                            >
                              <div 
                                className="w-2/3 rounded-t bg-emerald-500 group-hover:bg-emerald-400 transition-all"
                                style={{ height: `${(ic / 22) * 100}%` }}
                                title={`Interest Coverage: ${ic}x`}
                              />
                              <span className="font-mono text-[10px] text-slate-500">{yr}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-1">
                        <span>EBIT / Finance Cost Ratio</span>
                        <span>High buffer above standard 2.5x threshold</span>
                        <span>Max 22x</span>
                      </div>
                    </div>
                  )}

                  {selectedRatioCategory === 'efficiency' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      
                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-slate-500">Asset Turnover</span>
                        <div className="space-y-1 pt-1 font-mono text-xs">
                          {years.map((yr, i) => (
                            <div key={yr} className="flex justify-between py-0.5 border-b border-slate-200/60 dark:border-slate-800/60">
                              <span className="text-slate-400">{yr}:</span>
                              <span className="font-bold text-slate-900 dark:text-white">{historicalData[selectedCompany].assetTurnover[i]}x</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-slate-500">Inventory Turnover</span>
                        <div className="space-y-1 pt-1 font-mono text-xs">
                          {years.map((yr, i) => (
                            <div key={yr} className="flex justify-between py-0.5 border-b border-slate-200/60 dark:border-slate-800/60">
                              <span className="text-slate-400">{yr}:</span>
                              <span className="font-bold text-slate-900 dark:text-white">{historicalData[selectedCompany].inventoryTurnover[i]}x</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-slate-500">Receivables Turnover</span>
                        <div className="space-y-1 pt-1 font-mono text-xs">
                          {years.map((yr, i) => (
                            <div key={yr} className="flex justify-between py-0.5 border-b border-slate-200/60 dark:border-slate-800/60">
                              <span className="text-slate-400">{yr}:</span>
                              <span className="font-bold text-slate-900 dark:text-white">{historicalData[selectedCompany].receivablesTurnover[i]}x</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {selectedRatioCategory === 'market' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      
                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-slate-500">EPS (PKR)</span>
                        <div className="space-y-1 pt-1 font-mono text-xs">
                          {years.map((yr, i) => (
                            <div key={yr} className="flex justify-between py-0.5 border-b border-slate-200/60 dark:border-slate-800/60">
                              <span className="text-slate-400">{yr}:</span>
                              <span className="font-bold text-slate-900 dark:text-white">PKR {historicalData[selectedCompany].eps[i]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-slate-500">P/E Ratio</span>
                        <div className="space-y-1 pt-1 font-mono text-xs">
                          {years.map((yr, i) => (
                            <div key={yr} className="flex justify-between py-0.5 border-b border-slate-200/60 dark:border-slate-800/60">
                              <span className="text-slate-400">{yr}:</span>
                              <span className="font-bold text-slate-900 dark:text-white">{historicalData[selectedCompany].peRatio[i]}x</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-slate-500">Dividend Yield</span>
                        <div className="space-y-1 pt-1 font-mono text-xs">
                          {years.map((yr, i) => (
                            <div key={yr} className="flex justify-between py-0.5 border-b border-slate-200/60 dark:border-slate-800/60">
                              <span className="text-slate-400">{yr}:</span>
                              <span className="font-bold text-slate-900 dark:text-white">{historicalData[selectedCompany].dividendYield[i]}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>

              </div>

              {/* Five-Year Detailed Historical Table */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-none">
                <div className="p-3 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    {selectedCompany} Complete 5-Year Ratio Matrix (FY2021–FY2025)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Values as reported in coursework</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100/60 dark:bg-slate-800/50 text-slate-500 text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Metric</th>
                        {years.map(y => <th key={y} className="py-2.5 px-3">{y}</th>)}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">Current Ratio</td>
                        {historicalData[selectedCompany].currentRatio.map((v, idx) => <td key={idx} className="py-2 px-3">{v}x</td>)}
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">Quick Ratio</td>
                        {historicalData[selectedCompany].quickRatio.map((v, idx) => <td key={idx} className="py-2 px-3">{v}x</td>)}
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">Interest Coverage</td>
                        {historicalData[selectedCompany].interestCoverage.map((v, idx) => <td key={idx} className="py-2 px-3">{v}x</td>)}
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">Gross Profit Margin</td>
                        {historicalData[selectedCompany].grossMargin.map((v, idx) => <td key={idx} className="py-2 px-3">{v}%</td>)}
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">Net Profit Margin</td>
                        {historicalData[selectedCompany].netMargin.map((v, idx) => <td key={idx} className="py-2 px-3">{v}%</td>)}
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">ROA</td>
                        {historicalData[selectedCompany].roa.map((v, idx) => <td key={idx} className="py-2 px-3">{v}%</td>)}
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">ROE</td>
                        {historicalData[selectedCompany].roe.map((v, idx) => <td key={idx} className="py-2 px-3">{v}%</td>)}
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">EPS</td>
                        {historicalData[selectedCompany].eps.map((v, idx) => <td key={idx} className="py-2 px-3">PKR {v}</td>)}
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">P/E Ratio</td>
                        {historicalData[selectedCompany].peRatio.map((v, idx) => <td key={idx} className="py-2 px-3">{v}x</td>)}
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-700 dark:text-slate-300">Dividend Yield</td>
                        {historicalData[selectedCompany].dividendYield.map((v, idx) => <td key={idx} className="py-2 px-3">{v}%</td>)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 4: HORIZONTAL & COMMON-SIZE ANALYSIS ================= */}
          {activeTab === 'horizontal-vertical' && (
            <div className="space-y-6">
              
              {/* Revenue Historical Trajectory (Section 5) */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-4 shadow-none">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold">
                      Section 5 · Revenue Trajectory (PKR Millions)
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      5-Year Top-Line Revenue Growth Comparison
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">2021 Base Year → 2025</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Company</th>
                        <th className="py-2.5 px-3">2021</th>
                        <th className="py-2.5 px-3">2022</th>
                        <th className="py-2.5 px-3">2023</th>
                        <th className="py-2.5 px-3">2024</th>
                        <th className="py-2.5 px-3">2025</th>
                        <th className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">Cumulative Growth</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-blue-600 dark:text-blue-400">OGDC</td>
                        <td className="py-2.5 px-3">PKR 239,774m</td>
                        <td className="py-2.5 px-3">PKR 279,816m</td>
                        <td className="py-2.5 px-3">PKR 324,282m</td>
                        <td className="py-2.5 px-3">PKR 378,423m</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">PKR 401,178m</td>
                        <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">+67.3%</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">PPL</td>
                        <td className="py-2.5 px-3">PKR 149,279m</td>
                        <td className="py-2.5 px-3">PKR 203,811m</td>
                        <td className="py-2.5 px-3">PKR 288,053m</td>
                        <td className="py-2.5 px-3">PKR 291,241m</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">PKR 244,977m</td>
                        <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">+64.1%</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-amber-600 dark:text-amber-400">MARI</td>
                        <td className="py-2.5 px-3">PKR 63,703m</td>
                        <td className="py-2.5 px-3">PKR 83,135m</td>
                        <td className="py-2.5 px-3">PKR 128,221m</td>
                        <td className="py-2.5 px-3">PKR 159,731m</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">PKR 141,486m</td>
                        <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">+122.1%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Horizontal Analysis (Section 6) */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-4 shadow-none">
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 uppercase font-bold">
                    Section 6 · Horizontal Growth Analysis (2021–2025)
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Percentage Growth Across Key Financial Aggregates
                  </h4>
                  <p className="text-xs text-slate-500">
                    Neutral academic presentation comparing balance sheet and income statement expansion rates.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Metric</th>
                        <th className="py-2.5 px-3 text-blue-600 dark:text-blue-400">OGDC Growth</th>
                        <th className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">PPL Growth</th>
                        <th className="py-2.5 px-3 text-amber-600 dark:text-amber-400">MARI Growth</th>
                        <th className="py-2.5 px-3 text-slate-400">Interpretation Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {horizontalAnalysis.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{item.metric}</td>
                          <td className="py-2.5 px-3 font-semibold text-blue-600 dark:text-blue-400">{item.ogdc}</td>
                          <td className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">{item.ppl}</td>
                          <td className="py-2.5 px-3 font-semibold text-amber-600 dark:text-amber-400">{item.mari}</td>
                          <td className="py-2.5 px-3 text-[11px] text-slate-500 font-sans">{item.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Vertical (Common-Size) Analysis (Section 7) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Income Statement Common Size */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase block">
                    Income Statement Common-Size (FY2025 % of Revenue)
                  </span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 text-[10px]">
                        <tr>
                          <th className="py-2 px-2.5">Line Item</th>
                          <th className="py-2 px-2.5 text-blue-500">OGDC</th>
                          <th className="py-2 px-2.5 text-emerald-500">PPL</th>
                          <th className="py-2 px-2.5 text-amber-500">MARI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                        {commonSizeIncome.map((row, i) => (
                          <tr key={i}>
                            <td className="py-2 px-2.5 text-slate-800 dark:text-slate-200">{row.metric}</td>
                            <td className="py-2 px-2.5 font-bold text-blue-600 dark:text-blue-400">{row.ogdc}</td>
                            <td className="py-2 px-2.5 font-bold text-emerald-600 dark:text-emerald-400">{row.ppl}</td>
                            <td className="py-2 px-2.5 font-bold text-amber-600 dark:text-amber-400">{row.mari}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                    MARI operates with the lowest Cost of Revenue (28.37%), yielding the sector's highest Gross (71.63%) and Net (46.20%) profit conversion.
                  </p>
                </div>

                {/* Balance Sheet Common Size */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase block">
                    Balance Sheet Common-Size (FY2025 % of Assets)
                  </span>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 text-[10px]">
                        <tr>
                          <th className="py-2 px-2.5">Balance Sheet Segment</th>
                          <th className="py-2 px-2.5 text-blue-500">OGDC</th>
                          <th className="py-2 px-2.5 text-emerald-500">PPL</th>
                          <th className="py-2 px-2.5 text-amber-500">MARI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                        {commonSizeBalanceSheet.map((row, i) => (
                          <tr key={i}>
                            <td className="py-2 px-2.5 text-slate-800 dark:text-slate-200">{row.metric}</td>
                            <td className="py-2 px-2.5 font-bold text-blue-600 dark:text-blue-400">{row.ogdc}</td>
                            <td className="py-2 px-2.5 font-bold text-emerald-600 dark:text-emerald-400">{row.ppl}</td>
                            <td className="py-2 px-2.5 font-bold text-amber-600 dark:text-amber-400">{row.mari}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                    PPL concentrates 75.53% in Current Assets, whereas OGDC maintains the largest fixed capital investment in Net PPE (57.53%).
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 5: DUPONT ANALYSIS ================= */}
          {activeTab === 'dupont' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1.5">
                <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 uppercase font-semibold flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  Three-Step DuPont Decomposition
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  DuPont analysis separates Return on Equity (ROE) into three distinct operating and financial drivers: Operating Profitability (Net Margin), Asset Efficiency (Asset Turnover), and Financial Leverage (Equity Multiplier).
                </p>
              </div>

              {/* Interactive Company and Year Slicers */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">Select Company:</span>
                  <div className="flex items-center gap-1">
                    {(['OGDC', 'PPL', 'MARI'] as const).map(c => (
                      <button
                        key={c}
                        onClick={() => setDupontCompany(c)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          dupontCompany === c
                            ? c === 'OGDC' ? 'bg-blue-600 text-white' : c === 'PPL' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">Select Fiscal Year:</span>
                  <div className="flex items-center gap-1">
                    {years.map(y => (
                      <button
                        key={y}
                        onClick={() => setDupontYear(y)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          dupontYear === y
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* DuPont Visual Equation Component */}
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 space-y-4 shadow-none">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-mono uppercase">
                    {dupontCompany} — FY{dupontYear} DuPont Equation Breakdown
                  </h4>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                    ROE = Net Margin × Asset Turnover × Equity Multiplier
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                  
                  {/* Step 1: Net Margin */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">1. Profitability</span>
                    <span className="text-xl font-black text-blue-600 dark:text-blue-400 block">
                      {currentDupont.netM}%
                    </span>
                    <span className="text-[10px] text-slate-500 block">Net Profit Margin</span>
                    <span className="text-[9px] font-mono text-slate-400">(Net Income / Revenue)</span>
                  </div>

                  {/* Multiply */}
                  <div className="hidden sm:flex items-center justify-center text-xl font-mono text-slate-400">
                    ×
                  </div>

                  {/* Step 2: Asset Turnover */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">2. Asset Efficiency</span>
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 block">
                      {currentDupont.assetT}x
                    </span>
                    <span className="text-[10px] text-slate-500 block">Asset Turnover</span>
                    <span className="text-[9px] font-mono text-slate-400">(Revenue / Total Assets)</span>
                  </div>

                  {/* Step 3: Equity Multiplier */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">3. Financial Leverage</span>
                    <span className="text-xl font-black text-amber-600 dark:text-amber-400 block">
                      {currentDupont.eqMult}x
                    </span>
                    <span className="text-[10px] text-slate-500 block">Equity Multiplier</span>
                    <span className="text-[9px] font-mono text-slate-400">(Total Assets / Total Equity)</span>
                  </div>

                </div>

                {/* Resulting ROE Banner */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Reported ROE Result:</span>
                    <span className="ml-2 text-lg font-black text-slate-900 dark:text-white">{currentDupont.roe}%</span>
                    <span className="ml-3 text-[11px] text-slate-400">(ROA: {currentDupont.roa}%)</span>
                  </div>
                  <div className="text-[11px] text-slate-500 text-right">
                    {dupontCompany === 'MARI' && 'MARI balances superior net margins (~46%) with rapid asset rotation (0.33x) to lead sector ROE.'}
                    {dupontCompany === 'OGDC' && 'OGDC relies on massive asset volume and high net margins (42.35%) with low financial gearing.'}
                    {dupontCompany === 'PPL' && 'PPL demonstrates steady margins (~36.7%) and conservative leverage (~1.32x equity multiplier).'}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 6: VALUATION & BENCHMARKING ================= */}
          {activeTab === 'valuation' && (
            <div className="space-y-6">
              
              <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pb-2">
                <button
                  onClick={() => setValuationTab('relative')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                    valuationTab === 'relative'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Relative Valuation (Multiples)
                </button>
                <button
                  onClick={() => setValuationTab('dcf')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                    valuationTab === 'dcf'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  DCF Valuation Framework
                </button>
              </div>

              {valuationTab === 'relative' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase">
                      Relative Valuation Multiples (FY2025 Reported)
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Cross-company comparison of market pricing relative to per-share earnings and cash distribution yield.
                    </p>

                    <div className="overflow-x-auto pt-2">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 text-[10px]">
                          <tr>
                            <th className="py-2.5 px-3">Multiple / Metric</th>
                            <th className="py-2.5 px-3 text-blue-600 dark:text-blue-400">OGDC</th>
                            <th className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">PPL</th>
                            <th className="py-2.5 px-3 text-amber-600 dark:text-amber-400">MARI</th>
                            <th className="py-2.5 px-3 text-slate-500">Multiple Meaning</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          <tr>
                            <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">Earnings Per Share (EPS)</td>
                            <td className="py-2.5 px-3 font-bold text-blue-600 dark:text-blue-400">PKR 39.50</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">PKR 33.06</td>
                            <td className="py-2.5 px-3 font-bold text-amber-600 dark:text-amber-400">PKR 54.45</td>
                            <td className="py-2.5 px-3 text-[11px] text-slate-500 font-sans">Per-share diluted profit generation.</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">Price-to-Earnings (P/E)</td>
                            <td className="py-2.5 px-3 font-bold text-blue-600 dark:text-blue-400">4.56x</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">4.54x</td>
                            <td className="py-2.5 px-3 font-bold text-amber-600 dark:text-amber-400">9.18x</td>
                            <td className="py-2.5 px-3 text-[11px] text-slate-500 font-sans">Market multiple paid per rupee of annual earnings.</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">Dividend Yield</td>
                            <td className="py-2.5 px-3 font-bold text-blue-600 dark:text-blue-400">2.81%</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">3.33%</td>
                            <td className="py-2.5 px-3 font-bold text-amber-600 dark:text-amber-400">4.34%</td>
                            <td className="py-2.5 px-3 text-[11px] text-slate-500 font-sans">Annual cash dividend return on equity market price.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs space-y-1.5">
                    <span className="font-mono text-[10px] font-bold uppercase text-slate-400">Valuation Context</span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      MARI commands a premium valuation multiple (9.18x P/E) relative to peers (~4.5x), reflecting its superior ROE (23.87%), higher dividend yield (4.34%), and lower sovereign circular debt exposure. OGDC and PPL trade at deep discounts reflecting higher exposure to sovereign receivables from power-sector off-takers.
                    </p>
                  </div>
                </div>
              )}

              {valuationTab === 'dcf' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                    <span className="font-mono text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase block flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      DCF Valuation Methodology Framework
                    </span>
                    <p className="leading-relaxed">
                      "DCF valuation framework — final valuation requires projected FCFs, WACC, and terminal growth assumptions."
                    </p>
                    <p className="text-[11px] text-slate-500">
                      The original academic project established the theoretical discounted cash flow sequencing below without fabricating speculative cash flow forecasts.
                    </p>
                  </div>

                  {/* DCF Flow Map */}
                  <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-4 shadow-none">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase block">
                      Seven-Step DCF Analytical Flow
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] text-blue-500 font-bold block">01 · Historical FCF</span>
                        <p className="text-slate-700 dark:text-slate-300 text-[11px]">Analyze CFO minus Capex over FY21–25</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] text-blue-500 font-bold block">02 · Forecast FCF</span>
                        <p className="text-slate-700 dark:text-slate-300 text-[11px]">Project future cash flows based on reserves</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] text-blue-500 font-bold block">03 · WACC Estimation</span>
                        <p className="text-slate-700 dark:text-slate-300 text-[11px]">Cost of Equity (CAPM) + After-tax Cost of Debt</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] text-blue-500 font-bold block">04 · Terminal Growth</span>
                        <p className="text-slate-700 dark:text-slate-300 text-[11px]">Perpetual growth assumption (inflation-aligned)</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] text-emerald-500 font-bold block">05 · Terminal Value</span>
                        <p className="text-slate-700 dark:text-slate-300 text-[11px]">Gordon Growth: FCF_n+1 / (WACC - g)</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] text-emerald-500 font-bold block">06 · Present Value</span>
                        <p className="text-slate-700 dark:text-slate-300 text-[11px]">Discount interim FCFs & TV to present</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] text-emerald-500 font-bold block">07 · Enterprise / Equity</span>
                        <p className="text-slate-700 dark:text-slate-300 text-[11px]">EV + Cash - Debt = Implied Equity Value</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= TAB 7: RISK & PESTEL ANALYSIS ================= */}
          {activeTab === 'risk-pestel' && (
            <div className="space-y-6">
              
              {/* Risk Assessment Matrix (Section 9) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    Four-Category Financial & Industry Risk Assessment
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">Risk → Potential Impact → Possible Mitigation</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  
                  {/* Financial Risk */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        Financial Risk: Circular Debt & Liquidity
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400">High Impact</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      <strong>Impact:</strong> Massive accumulation of trade debts from sovereign off-takers (SNGPL, SSGC) creates receivables lock-up and working capital friction.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      <strong>Mitigation:</strong> High cash ratio buffers (e.g. OGDC CR 8.97x), government settlement bonds, and diversification into international E&P assets.
                    </p>
                  </div>

                  {/* Operational Risk */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        Operational Risk: Depletion & Exploration Dry Holes
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">Medium Impact</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      <strong>Impact:</strong> Natural depletion of mature fields (such as Sui) demands continuous exploratory drilling and 3D seismic capital expenditure.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      <strong>Mitigation:</strong> Modern directional drilling technologies, offshore exploration ventures, and joint development consortia.
                    </p>
                  </div>

                  {/* Market Risk */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        Market Risk: Oil Price Volatility & Currency Fluctuations
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">Moderate Impact</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      <strong>Impact:</strong> Brent crude benchmarks dictate domestic wellhead pricing formulas. Rupee devaluation expands nominal top-line revenue but inflates imported drilling capex.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      <strong>Mitigation:</strong> Natural currency hedges since domestic wellhead prices are pegged to USD benchmarks.
                    </p>
                  </div>

                  {/* Strategic / Industry Risk */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        Strategic Risk: Energy Transition & Environmental Regulations
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">Long-term</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      <strong>Impact:</strong> Global ESG standards, stricter methane venting controls, and eventual long-term substitution toward renewable energy sources.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      <strong>Mitigation:</strong> Investing in carbon capture, flaring reduction technologies, and venturing into green hydrogen and mineral extraction.
                    </p>
                  </div>

                </div>
              </div>

              {/* PESTEL Industry Analysis (Section 10) */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-cyan-500" />
                  PESTEL Industry Analysis of Pakistan's E&P Sector
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                    <span className="font-bold font-mono text-blue-600 dark:text-blue-400 block">P · Political & Regulatory</span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      State ownership in OGDC and PPL creates policy alignment but also exposes firms to delayed gas tariff revisions and state circular debt absorption.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                    <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 block">E · Economic Factors</span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Elevated domestic inflation and interest rates over FY21–25 highlighted the benefit of zero debt gearing. USD-pegged gas prices protected earnings.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                    <span className="font-bold font-mono text-amber-600 dark:text-amber-400 block">S · Social Dynamics</span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Community engagement in exploration regions (Balochistan, Sindh, KPK) requires structured CSR, local employment quotas, and development initiatives.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                    <span className="font-bold font-mono text-cyan-600 dark:text-cyan-400 block">T · Technological Advancements</span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Deployment of 3D seismic imaging, enhanced oil recovery (EOR), and reservoir simulation tools helps sustain production from mature wells.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                    <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400 block">E · Environmental Factors</span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Rigorous EPA compliance for drilling waste disposal, water treatment, flaring emissions reductions, and ecological habitat conservation.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                    <span className="font-bold font-mono text-purple-600 dark:text-purple-400 block">L · Legal & Geopolitical</span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Petroleum policy compliance, concession agreements, royalties dispute resolution, and security management in remote exploratory blocks.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}

      </div>
    </CaseStudyModalShell>
  );
};
