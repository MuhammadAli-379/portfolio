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
  FileSpreadsheet, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  ChevronRight,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AcademicProject } from '../types/portfolio';

interface FinancialPortfolioCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: AcademicProject;
  initialTab?: 'overview' | 'risk-return' | 'beta-scatter' | 'portfolio' | 'capm-sml';
}

export const FinancialPortfolioCaseStudyModal: React.FC<FinancialPortfolioCaseStudyModalProps> = ({
  isOpen,
  onClose,
  project,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'risk-return' | 'beta-scatter' | 'portfolio' | 'capm-sml'>(initialTab);
  const [selectedStock, setSelectedStock] = useState<'ffc' | 'lucky' | 'ppl' | 'hbl'>('ffc');
  const [returnPeriod, setReturnPeriod] = useState<'annual' | 'daily'>('annual');

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

  // Reported daily and annual statistics
  const companiesData = [
    {
      id: 'kse',
      name: 'KSE-100 Index (Benchmark)',
      ticker: 'KSE-100',
      dailyReturn: '0.0950%',
      dailyStd: '1.1771%',
      dailyCV: '12.3927',
      annualReturn: '23.9366%',
      annualStd: '18.6865%',
      annualCV: '0.7807',
      beta: 1.0000,
      alpha: '0.0000%',
      r2: '1.0000',
      slope: 'Benchmark',
      pattern: 'Reference Market',
      isBenchmark: true
    },
    {
      id: 'ffc',
      name: 'Fauji Fertilizer Company',
      ticker: 'FFC',
      dailyReturn: '0.1187%',
      dailyStd: '1.5805%',
      dailyCV: '13.3139',
      annualReturn: '29.9152%',
      annualStd: '25.0899%',
      annualCV: '0.8387',
      beta: 0.7010,
      alpha: '0.0521%',
      r2: '0.2726',
      slope: 'Positive',
      pattern: 'Moderate cluster around regression line',
      isBenchmark: false
    },
    {
      id: 'lucky',
      name: 'Lucky Cement',
      ticker: 'LUCK',
      dailyReturn: '0.0687%',
      dailyStd: '2.8275%',
      dailyCV: '41.1664',
      annualReturn: '17.3086%',
      annualStd: '44.8854%',
      annualCV: '2.5932',
      beta: 1.1957,
      alpha: '-0.0449%',
      r2: '0.2478',
      slope: 'Positive',
      pattern: 'Moderate scatter',
      isBenchmark: false
    },
    {
      id: 'ppl',
      name: 'Pakistan Petroleum Limited',
      ticker: 'PPL',
      dailyReturn: '0.0634%',
      dailyStd: '2.4036%',
      dailyCV: '37.9123',
      annualReturn: '15.9762%',
      annualStd: '38.1553%',
      annualCV: '2.3883',
      beta: 1.4210,
      alpha: '-0.0716%',
      r2: '0.4843',
      slope: 'Positive',
      pattern: 'Moderate scatter',
      isBenchmark: false
    },
    {
      id: 'hbl',
      name: 'Habib Bank Limited',
      ticker: 'HBL',
      dailyReturn: '0.0759%',
      dailyStd: '2.0177%',
      dailyCV: '26.5743',
      annualReturn: '19.1334%',
      annualStd: '32.0297%',
      annualCV: '1.6740',
      beta: 1.0529,
      alpha: '-0.0241%',
      r2: '0.3773',
      slope: 'Positive',
      pattern: 'Moderate scatter',
      isBenchmark: false
    }
  ];

  // SML comparison reported data
  const smlComparison = [
    {
      asset: 'Fauji Fertilizer',
      beta: 0.7010,
      smlRequired: '20.3674%',
      actualReturn: '29.9152%',
      difference: '+9.5478%',
      isAbove: true,
      interpretation: 'Above SML — reported actual return exceeds calculated required return'
    },
    {
      asset: 'Lucky Cement',
      beta: 1.1957,
      smlRequired: '26.2723%',
      actualReturn: '17.3086%',
      difference: '-8.9637%',
      isAbove: false,
      interpretation: 'Below SML — reported actual return is below calculated required return'
    },
    {
      asset: 'Pakistan Petroleum',
      beta: 1.4210,
      smlRequired: '28.9614%',
      actualReturn: '15.9762%',
      difference: '-12.9852%',
      isAbove: false,
      interpretation: 'Below SML — reported actual return is below calculated required return'
    },
    {
      asset: 'Habib Bank',
      beta: 1.0529,
      smlRequired: '24.5680%',
      actualReturn: '19.1334%',
      difference: '-5.4346%',
      isAbove: false,
      interpretation: 'Below SML — reported actual return is below calculated required return'
    },
    {
      asset: 'Task-5 Portfolio (Equities + Cash)',
      beta: 0.9585,
      smlRequired: '23.4410%',
      actualReturn: '19.2757%',
      difference: '-4.1653%',
      isAbove: false,
      interpretation: 'Below SML — reported actual return is below calculated required return'
    }
  ];

  const selectedStockDetails = companiesData.find(c => c.id === selectedStock) || companiesData[1];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="financial-case-study-title"
    >
      <div 
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Academic Disclaimer Banner */}
        <div className="bg-amber-500/10 dark:bg-amber-950/40 border-b border-amber-500/20 px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] text-amber-800 dark:text-amber-300 font-medium">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              <strong>Academic Project — Historical Financial Analysis:</strong> Data and calculations are presented for educational purposes. This portfolio does not provide investment advice or recommendations.
            </span>
          </div>
          <span className="font-mono text-[10px] hidden md:inline uppercase text-amber-700 dark:text-amber-400">
            Educational Coursework Only
          </span>
        </div>

        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur sticky top-0 z-20 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold uppercase tracking-wider">
                <GraduationCap className="w-3 h-3" />
                Academic Assignment
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-[11px]">
                Semester 4 • Financial Management
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                Assignment #3 · Market Benchmark: KSE-100
              </span>
            </div>

            <h2 id="financial-case-study-title" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {project.title}
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Portfolio Analysis: <span className="text-slate-900 dark:text-slate-200 font-semibold">Fauji Fertilizer, Lucky Cement, Pakistan Petroleum & Habib Bank</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close case study modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-medium bg-slate-50/60 dark:bg-slate-950/40 px-4 sm:px-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Overview & Scope
          </button>
          <button
            onClick={() => setActiveTab('risk-return')}
            className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'risk-return'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Task 1 & 2: Risk & Return Statistics
          </button>
          <button
            onClick={() => setActiveTab('beta-scatter')}
            className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'beta-scatter'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Task 3 & 4: Scatter & Beta Estimation
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'portfolio'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Task 5 & 6: Portfolio Construction
          </button>
          <button
            onClick={() => setActiveTab('capm-sml')}
            className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'capm-sml'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Task 7 & 8: CAPM & Security Market Line
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-5 sm:p-8 overflow-y-auto space-y-8 text-xs text-slate-700 dark:text-slate-300">
          
          {/* TAB 1: OVERVIEW & SCOPE */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Project Executive Summary */}
              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3">
                <span className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 tracking-widest font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Project Executive Summary
                </span>
                <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  "This project analyzed the historical return and risk characteristics of four companies listed in Pakistan's equity market — Fauji Fertilizer, Lucky Cement, Pakistan Petroleum, and Habib Bank — using the KSE-100 as the market benchmark. The analysis covered daily returns, annualized return and risk measures, coefficient of variation, beta estimation, regression analysis, portfolio construction, CAPM-based required return calculations, combined portfolio beta, and Security Market Line analysis."
                </p>
                <div className="pt-2 text-[11px] font-mono text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Academic financial analysis using historical market data. This project is for educational purposes and does not constitute investment advice.</span>
                </div>
              </div>

              {/* Data Period Timeline */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-500" />
                    Data Period & Source Verification
                  </h4>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold">
                    7-Year Historical Analysis
                  </span>
                </div>

                {/* Visual Timeline Flow */}
                <div className="flex items-center justify-center gap-3 py-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">01 JAN 2019</span>
                    <span className="text-[10px] text-slate-500 font-mono">Series Start</span>
                  </div>
                  <span className="text-slate-400 font-mono text-sm">↓</span>
                  <div className="px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-mono text-xs">
                    Historical Daily Market Prices
                  </div>
                  <span className="text-slate-400 font-mono text-sm">↓</span>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">31 DEC 2025</span>
                    <span className="text-[10px] text-slate-500 font-mono">Series End</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500">
                  <span>Data Sources: Investing.com / PSX</span>
                  <span>Market Benchmark: KSE-100 Index</span>
                  <span>Note: Does not represent current or live market prices</span>
                </div>
              </div>

              {/* Companies Analyzed 4-Grid */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
                  Companies Analyzed (Pakistan Equity Market)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { name: 'Fauji Fertilizer', ticker: 'FFC', beta: '0.7010', desc: 'Fertilizer & Chemicals', betaStatus: 'Defensive (β < 1)' },
                    { name: 'Lucky Cement', ticker: 'LUCK', beta: '1.1957', desc: 'Cement & Construction', betaStatus: 'Aggressive (β > 1)' },
                    { name: 'Pakistan Petroleum', ticker: 'PPL', beta: '1.4210', desc: 'Oil & Gas Exploration', betaStatus: 'Aggressive (β > 1)' },
                    { name: 'Habib Bank', ticker: 'HBL', beta: '1.0529', desc: 'Commercial Banking', betaStatus: 'Market-Aligned (β ≈ 1)' },
                  ].map((c) => (
                    <div key={c.ticker} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-cyan-600 dark:text-cyan-400">{c.ticker}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">β = {c.beta}</span>
                      </div>
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm">{c.name}</h5>
                      <span className="text-[11px] font-mono text-slate-500 block">{c.betaStatus}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What This Project Demonstrates */}
              <div className="p-5 rounded-2xl border border-cyan-500/20 bg-cyan-50/30 dark:bg-cyan-950/20 space-y-2">
                <span className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  What This Project Demonstrates
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  "Through this academic assignment, I applied quantitative techniques to examine historical stock returns, market sensitivity, portfolio composition, and CAPM-based required returns."
                </p>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  "The project strengthened my understanding of how financial data can be transformed into quantitative measures that support structured portfolio analysis."
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: TASK 1 & 2: RISK & RETURN STATISTICS */}
          {activeTab === 'risk-return' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-cyan-500" />
                    Historical Return & Risk Dashboard
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    Reported project calculations from 7 years of daily market records
                  </span>
                </div>

                {/* Period Toggle */}
                <div className="inline-flex rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 p-0.5 text-xs font-mono">
                  <button
                    onClick={() => setReturnPeriod('annual')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      returnPeriod === 'annual'
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    Annualized Statistics
                  </button>
                  <button
                    onClick={() => setReturnPeriod('daily')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      returnPeriod === 'daily'
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    Daily Return Statistics
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-sm">
                <div className="p-3 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {returnPeriod === 'annual' ? 'ANNUALIZED MEASURES' : 'DAILY RETURN MEASURES'} (Reported Project Calculations)
                  </span>
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                    Values reproduced from academic report
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100/60 dark:bg-slate-800/40 text-[11px] text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="py-2.5 px-4">Asset</th>
                        <th className="py-2.5 px-4">Average Return</th>
                        <th className="py-2.5 px-4">Standard Deviation (Risk)</th>
                        <th className="py-2.5 px-4">Coefficient of Variation (CV)</th>
                        <th className="py-2.5 px-4">Reported Beta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {companiesData.map((row) => (
                        <tr 
                          key={row.id}
                          className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                            row.isBenchmark ? 'bg-slate-50/70 dark:bg-slate-950/40 font-semibold' : ''
                          }`}
                        >
                          <td className="py-3 px-4">
                            <span className="text-slate-900 dark:text-white font-bold">{row.name}</span>
                            <span className="block text-[10px] text-slate-400 font-normal">({row.ticker})</span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">
                            {returnPeriod === 'annual' ? row.annualReturn : row.dailyReturn}
                          </td>
                          <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                            {returnPeriod === 'annual' ? row.annualStd : row.dailyStd}
                          </td>
                          <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                            {returnPeriod === 'annual' ? row.annualCV : row.dailyCV}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-bold">
                              {row.beta.toFixed(4)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Risk-Return Interpretation Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                    Coefficient of Variation (CV) Interpretation
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Coefficient of Variation (Standard Deviation ÷ Average Return) measures risk per unit of return. Fauji Fertilizer recorded the lowest annual CV (0.8387) among single equities, while Lucky Cement (2.5932) and Pakistan Petroleum (2.3883) demonstrated higher return volatility per unit of yield.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                    Annualized Performance Summary
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Fauji Fertilizer achieved the highest average annual return (29.9152%) with moderate volatility (25.0899%). The benchmark KSE-100 recorded an average annual return of 23.9366% with standard deviation of 18.6865%.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: TASK 3 & 4: SCATTER & BETA ESTIMATION */}
          {activeTab === 'beta-scatter' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-cyan-500" />
                  Stock Returns vs. KSE-100 Returns & Beta Estimation
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  "The scatter diagrams examine the relationship between each company's daily returns and KSE-100 daily returns."
                </p>
              </div>

              {/* Stock Selector segmented buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'ffc', label: 'Fauji Fertilizer (FFC)' },
                  { id: 'lucky', label: 'Lucky Cement (LUCK)' },
                  { id: 'ppl', label: 'Pakistan Petroleum (PPL)' },
                  { id: 'hbl', label: 'Habib Bank (HBL)' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStock(s.id as any)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                      selectedStock === s.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Selected Stock Regression Details */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
                      Regression Parameters: {selectedStockDetails.name}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Company Return = α + β × Market Return
                    </h4>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Calculated via Excel SLOPE, INTERCEPT, RSQ
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Beta (Slope)</span>
                    <span className="text-base font-bold text-cyan-600 dark:text-cyan-400 block mt-1">
                      {selectedStockDetails.beta.toFixed(4)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Alpha (Intercept)</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white block mt-1">
                      {selectedStockDetails.alpha}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">R² Value (RSQ)</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white block mt-1">
                      {selectedStockDetails.r2}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Scatter Pattern</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mt-1">
                      {selectedStockDetails.pattern}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-50/40 dark:bg-cyan-950/20 border border-cyan-500/20 text-xs">
                  <span className="font-semibold text-cyan-700 dark:text-cyan-300 font-mono block mb-1">
                    Fitted Characteristic Line:
                  </span>
                  <code className="text-slate-800 dark:text-slate-200 font-mono text-xs block">
                    R_{selectedStockDetails.ticker} = {selectedStockDetails.alpha} + ({selectedStockDetails.beta.toFixed(4)} × R_KSE100)
                  </code>
                </div>
              </div>

              {/* Visual Beta Scale */}
              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Scale className="w-4 h-4 text-cyan-500" />
                      Visual Market Sensitivity Scale (Beta)
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Comparing systematic risk relative to the KSE-100 benchmark (β = 1.0000)
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Neutral academic classification</span>
                </div>

                {/* Visual Scale Bar */}
                <div className="space-y-6 pt-4">
                  <div className="relative h-4 bg-slate-200 dark:bg-slate-800 rounded-full">
                    {/* Market Benchmark Marker at center */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-0.5 h-8 bg-slate-900 dark:bg-white z-10"
                      style={{ left: '50%' }}
                    >
                      <span className="absolute -top-6 -translate-x-1/2 font-mono text-[10px] font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        β = 1.0 (Market)
                      </span>
                    </div>

                    {/* Stock Markers positioned along scale (0.5 to 1.5) */}
                    {[
                      { name: 'FFC', beta: 0.7010, pos: '20.1%' },
                      { name: 'HBL', beta: 1.0529, pos: '55.3%' },
                      { name: 'LUCK', beta: 1.1957, pos: '69.6%' },
                      { name: 'PPL', beta: 1.4210, pos: '92.1%' }
                    ].map((m) => (
                      <div 
                        key={m.name}
                        className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
                        style={{ left: m.pos }}
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-cyan-500 border-2 border-white dark:border-slate-900 shadow" />
                        <span className="mt-2 font-mono text-[10px] font-bold text-cyan-600 dark:text-cyan-400 whitespace-nowrap">
                          {m.name} ({m.beta.toFixed(2)})
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-[11px] font-mono pt-3 text-slate-500">
                    <span>← LOWER MARKET SENSITIVITY (β &lt; 1)</span>
                    <span>HIGHER MARKET SENSITIVITY (β &gt; 1) →</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                  Notice: Beta reflects systematic historical co-movement with the KSE-100 benchmark and does not constitute an investment endorsement.
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: TASK 5 & 6: PORTFOLIO CONSTRUCTION */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              
              {/* Task 5: Assignment Portfolio Allocation */}
              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider">
                      Task 5
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                      <PieChart className="w-4 h-4 text-cyan-500" />
                      Academic Portfolio Allocation
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold">
                    Academic portfolio allocation used in the assignment
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  The assignment allocated 90% across the four equities, with the remaining 10% designated as cash / risk-free asset:
                </p>

                {/* Weight Breakdown Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center font-mono">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-[10px] text-cyan-700 dark:text-cyan-300 block">Fauji Fertilizer</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white mt-1 block">30%</span>
                    <span className="text-[10px] text-slate-400">β = 0.7010</span>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-[10px] text-cyan-700 dark:text-cyan-300 block">Lucky Cement</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white mt-1 block">30%</span>
                    <span className="text-[10px] text-slate-400">β = 1.1957</span>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-[10px] text-cyan-700 dark:text-cyan-300 block">Pakistan Petroleum</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white mt-1 block">20%</span>
                    <span className="text-[10px] text-slate-400">β = 1.4210</span>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-[10px] text-cyan-700 dark:text-cyan-300 block">Habib Bank</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white mt-1 block">10%</span>
                    <span className="text-[10px] text-slate-400">β = 1.0529</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 block">Cash / Risk-Free</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white mt-1 block">10%</span>
                    <span className="text-[10px] text-slate-400">β = 0.0000</span>
                  </div>
                </div>

                {/* Reported Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase">Reported Weighted Beta</span>
                    <span className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400 block">
                      β_portfolio = 0.9585
                    </span>
                    <span className="text-[11px] text-slate-500">Systematic risk is slightly below overall market benchmark</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase">Reported Weighted Return</span>
                    <span className="text-xl font-bold font-mono text-slate-900 dark:text-white block">
                      19.2757%
                    </span>
                    <span className="text-[11px] text-slate-500">Weighted annual return of the assigned portfolio allocation</span>
                  </div>
                </div>
              </div>

              {/* Task 6: Combined Portfolio Beta */}
              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider">
                      Task 6
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                      <Layers className="w-4 h-4 text-cyan-500" />
                      Combined Portfolio Beta
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold">
                    Assignment-provided hypothetical assets
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100/60 dark:bg-slate-800/40 text-[11px] text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="py-2.5 px-4">Component</th>
                        <th className="py-2.5 px-4">Portfolio Weight</th>
                        <th className="py-2.5 px-4">Beta</th>
                        <th className="py-2.5 px-4">Weighted Beta Contribution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">Task-5 Portfolio</td>
                        <td className="py-2.5 px-4">25.00%</td>
                        <td className="py-2.5 px-4">0.9585</td>
                        <td className="py-2.5 px-4">0.2396</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-slate-700 dark:text-slate-300">Stock A (Hypothetical Asset)</td>
                        <td className="py-2.5 px-4">15.00%</td>
                        <td className="py-2.5 px-4">0.7690</td>
                        <td className="py-2.5 px-4">0.1154</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-slate-700 dark:text-slate-300">Stock B (Hypothetical Asset)</td>
                        <td className="py-2.5 px-4">40.00%</td>
                        <td className="py-2.5 px-4">0.9850</td>
                        <td className="py-2.5 px-4">0.3940</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-slate-700 dark:text-slate-300">Stock C (Hypothetical Asset)</td>
                        <td className="py-2.5 px-4">20.00%</td>
                        <td className="py-2.5 px-4">1.4230</td>
                        <td className="py-2.5 px-4">0.2846</td>
                      </tr>
                      <tr className="bg-slate-50 dark:bg-slate-950 font-bold border-t-2 border-slate-200 dark:border-slate-800">
                        <td className="py-3 px-4 text-slate-900 dark:text-white">Reported Combined Beta</td>
                        <td className="py-3 px-4">100.00%</td>
                        <td className="py-3 px-4 text-slate-400">—</td>
                        <td className="py-3 px-4 text-cyan-600 dark:text-cyan-400 text-sm">β = 1.0336</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: TASK 7 & 8: CAPM & SECURITY MARKET LINE */}
          {activeTab === 'capm-sml' && (
            <div className="space-y-6">
              
              {/* Task 7: CAPM Explainer */}
              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider">
                      Task 7
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                      <Percent className="w-4 h-4 text-cyan-500" />
                      Capital Asset Pricing Model (CAPM)
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold">
                    Values reported in academic assignment
                  </span>
                </div>

                {/* Formula Visual Box */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-center font-mono">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-2">
                    Standard CAPM Specification
                  </span>
                  <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Required Return = R_f + β_p × (R_m − R_f)
                  </div>
                  <div className="text-xs text-cyan-600 dark:text-cyan-400 mt-2 font-medium">
                    24.3373% = 12.0000% + 1.0336 × (23.9366% − 12.0000%)
                  </div>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Risk-Free Rate (Rf)</span>
                    <span className="font-bold text-slate-900 dark:text-white block mt-1">12.0000%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Market Return (Rm)</span>
                    <span className="font-bold text-slate-900 dark:text-white block mt-1">23.9366%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Market Risk Premium</span>
                    <span className="font-bold text-slate-900 dark:text-white block mt-1">11.9366%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-cyan-600 dark:text-cyan-400 uppercase block">Reported Required Return</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400 block mt-1">24.3373%</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 font-mono">
                  Note: CAPM figures are reproduced from the academic assignment and may reflect assignment-specific assumptions.
                </div>
              </div>

              {/* Task 8: Security Market Line (SML) */}
              <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider">
                      Task 8
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                      <TrendingUp className="w-4 h-4 text-cyan-500" />
                      Security Market Line (SML) Analysis
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    Neutral academic evaluation · No investment recommendations
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  "The Security Market Line compares a security's required return under CAPM with its reported actual return."
                </p>

                {/* SML Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100/60 dark:bg-slate-800/40 text-[11px] text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="py-2.5 px-4">Asset</th>
                        <th className="py-2.5 px-4">Beta</th>
                        <th className="py-2.5 px-4">SML Required Return</th>
                        <th className="py-2.5 px-4">Reported Actual Return</th>
                        <th className="py-2.5 px-4">Difference</th>
                        <th className="py-2.5 px-4">Academic Interpretation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {smlComparison.map((item) => (
                        <tr key={item.asset} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{item.asset}</td>
                          <td className="py-3 px-4">{item.beta.toFixed(4)}</td>
                          <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{item.smlRequired}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">{item.actualReturn}</td>
                          <td className={`py-3 px-4 font-bold ${item.isAbove ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500'}`}>
                            {item.difference}
                          </td>
                          <td className="py-3 px-4 text-[11px]">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] ${
                              item.isAbove 
                                ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}>
                              {item.interpretation}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-900 dark:text-white block font-mono text-[11px]">
                    Academic Integrity Note on SML Labels:
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    In compliance with academic standards, this portfolio uses strictly neutral descriptive labels ("Above SML" / "Below SML") rather than commercial trading advice ("BUY" / "SELL" / "AVOID").
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Academic Disclaimer & Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
            <GraduationCap className="w-4 h-4 text-cyan-500 shrink-0" />
            <span>Financial Management Assignment #3 · COMSATS University Islamabad</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold cursor-pointer"
          >
            Close Analysis
          </button>
        </div>

      </div>
    </div>
  );
};
