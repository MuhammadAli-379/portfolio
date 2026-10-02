import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  ShieldAlert,
  Calendar,
  Scale,
  Percent,
  Sparkles,
  Layers,
  Info,
} from 'lucide-react';
import { AcademicProject } from '../types/portfolio';
import { CaseStudyModalShell } from './CaseStudyModalShell';

interface FinancialPortfolioCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: AcademicProject;
  initialTab?: 'overview' | 'risk-return' | 'beta-scatter' | 'portfolio' | 'capm-sml';
}

const LIVE_DEMO_URL = 'https://portfolio-analysis-live-demo2.ai.studio';

export const FinancialPortfolioCaseStudyModal: React.FC<FinancialPortfolioCaseStudyModalProps> = ({
  isOpen,
  onClose,
  project,
  initialTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'risk-return' | 'beta-scatter' | 'portfolio' | 'capm-sml'>(initialTab);
  const [selectedStock, setSelectedStock] = useState<'ffc' | 'lucky' | 'ppl' | 'hbl'>('ffc');
  const [returnPeriod, setReturnPeriod] = useState<'annual' | 'daily'>('annual');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

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
      beta: 1.0,
      alpha: '0.0000%',
      r2: '1.0000',
      slope: 'Benchmark',
      pattern: 'Reference Market',
      isBenchmark: true,
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
      beta: 0.701,
      alpha: '0.0521%',
      r2: '0.2726',
      slope: 'Positive',
      pattern: 'Moderate cluster around regression line',
      isBenchmark: false,
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
      isBenchmark: false,
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
      beta: 1.421,
      alpha: '-0.0716%',
      r2: '0.4843',
      slope: 'Positive',
      pattern: 'Moderate scatter',
      isBenchmark: false,
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
      annualCV: '1.674',
      beta: 1.0529,
      alpha: '-0.0241%',
      r2: '0.3773',
      slope: 'Positive',
      pattern: 'Moderate scatter',
      isBenchmark: false,
    },
  ];

  // SML comparison reported data
  const smlComparison = [
    {
      asset: 'Fauji Fertilizer',
      beta: 0.701,
      smlRequired: '20.3674%',
      actualReturn: '29.9152%',
      difference: '+9.5478%',
      isAbove: true,
      interpretation: 'Above SML — reported actual return exceeds calculated required return',
    },
    {
      asset: 'Lucky Cement',
      beta: 1.1957,
      smlRequired: '26.2723%',
      actualReturn: '17.3086%',
      difference: '-8.9637%',
      isAbove: false,
      interpretation: 'Below SML — reported actual return is below calculated required return',
    },
    {
      asset: 'Pakistan Petroleum',
      beta: 1.421,
      smlRequired: '28.9614%',
      actualReturn: '15.9762%',
      difference: '-12.9852%',
      isAbove: false,
      interpretation: 'Below SML — reported actual return is below calculated required return',
    },
    {
      asset: 'Habib Bank',
      beta: 1.0529,
      smlRequired: '24.5680%',
      actualReturn: '19.1334%',
      difference: '-5.4346%',
      isAbove: false,
      interpretation: 'Below SML — reported actual return is below calculated required return',
    },
    {
      asset: 'Task-5 Portfolio (Equities + Cash)',
      beta: 0.9585,
      smlRequired: '23.4410%',
      actualReturn: '19.2757%',
      difference: '-4.1653%',
      isAbove: false,
      interpretation: 'Below SML — reported actual return is below calculated required return',
    },
  ];

  const selectedStockDetails = companiesData.find((c) => c.id === selectedStock) || companiesData[1];

  const tabs = [
    { id: 'overview', label: 'Overview & Scope' },
    { id: 'risk-return', label: 'Task 1 & 2: Risk & Return' },
    { id: 'beta-scatter', label: 'Task 3 & 4: Scatter & Beta' },
    { id: 'portfolio', label: 'Task 5 & 6: Portfolio' },
    { id: 'capm-sml', label: 'Task 7 & 8: CAPM & SML' },
  ];

  return (
    <CaseStudyModalShell
      isOpen={isOpen}
      onClose={onClose}
      projectNumber="03"
      category="Financial Management"
      title={project.title}
      subtitle={project.semesterTag || 'Semester 4 • Financial Management'}
      metadataText="Coursework Assignment #3 • Market Benchmark: KSE-100 • 4 Equities + Cash"
      liveDemoUrl={LIVE_DEMO_URL}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as any)}
    >
      {/* ================= TAB 1: OVERVIEW & SCOPE ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Academic Notice Banner */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-4 flex items-center justify-between text-xs font-mono text-[var(--theme-text-muted)]">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-[var(--theme-accent)] shrink-0" aria-hidden="true" />
              <span>
                <strong className="text-[var(--theme-text)]">Academic Project — Historical Financial Analysis:</strong> Data and calculations are presented for educational purposes. This portfolio does not provide investment advice or recommendations.
              </span>
            </div>
            <span className="hidden md:inline uppercase text-[10px] text-[var(--theme-accent)] font-semibold shrink-0">
              Educational Coursework Only
            </span>
          </div>

          {/* Project Executive Summary */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-3">
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--theme-accent)]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Project Executive Summary
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-normal text-[var(--theme-text)]">
              Multi-Asset Return, Risk, Beta &amp; CAPM Modeling
            </h3>
            <p className="max-w-[70ch] font-body text-[16px] sm:text-[17px] leading-relaxed text-[var(--theme-text)]/90">
              This project analyzed the historical return and risk characteristics of four companies listed in Pakistan's equity market — Fauji Fertilizer, Lucky Cement, Pakistan Petroleum, and Habib Bank — using the KSE-100 as the market benchmark. The analysis covered daily returns, annualized return and risk measures, coefficient of variation, beta estimation, regression analysis, portfolio construction, CAPM-based required return calculations, combined portfolio beta, and Security Market Line analysis.
            </p>
            <div className="pt-2 font-mono text-xs text-[var(--theme-text-muted)] flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 shrink-0 text-[var(--theme-accent)]" aria-hidden="true" />
              <span>Academic financial analysis using historical market data. Does not constitute investment advice.</span>
            </div>
          </div>

          {/* Data Period Timeline */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                  <Calendar className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
                  <span>Timeline &amp; Sources</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)]">
                  Data Period &amp; Source Verification
                </h3>
              </div>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-md border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] font-semibold">
                7-Year Historical Analysis
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 py-3 text-center">
              <div className="p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/60">
                <span className="font-mono text-xs font-bold text-[var(--theme-text)] block">01 JAN 2019</span>
                <span className="text-[10px] text-[var(--theme-text-muted)] font-mono">Series Start</span>
              </div>
              <span className="text-[var(--theme-text-muted)] font-mono text-sm" aria-hidden="true">→</span>
              <div className="px-3 py-1.5 rounded-lg border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] font-mono text-xs font-medium">
                Historical Daily Market Prices
              </div>
              <span className="text-[var(--theme-text-muted)] font-mono text-sm" aria-hidden="true">→</span>
              <div className="p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/60">
                <span className="font-mono text-xs font-bold text-[var(--theme-text)] block">31 DEC 2025</span>
                <span className="text-[10px] text-[var(--theme-text-muted)] font-mono">Series End</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--theme-border)]/60 font-mono text-[11px] text-[var(--theme-text-muted)]">
              <span>Data Sources: Investing.com / PSX</span>
              <span>Market Benchmark: KSE-100 Index</span>
              <span>Note: Does not represent current or live market prices</span>
            </div>
          </div>

          {/* Companies Analyzed 4-Grid */}
          <div className="space-y-3">
            <span className="block font-mono text-xs uppercase tracking-wider text-[var(--theme-text-muted)] font-semibold">
              Companies Analyzed (Pakistan Equity Market)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { name: 'Fauji Fertilizer', ticker: 'FFC', beta: '0.7010', desc: 'Fertilizer & Chemicals', betaStatus: 'Defensive (β < 1)' },
                { name: 'Lucky Cement', ticker: 'LUCK', beta: '1.1957', desc: 'Cement & Construction', betaStatus: 'Aggressive (β > 1)' },
                { name: 'Pakistan Petroleum', ticker: 'PPL', beta: '1.4210', desc: 'Oil & Gas Exploration', betaStatus: 'Aggressive (β > 1)' },
                { name: 'Habib Bank', ticker: 'HBL', beta: '1.0529', desc: 'Commercial Banking', betaStatus: 'Market-Aligned (β ≈ 1)' },
              ].map((c) => (
                <div key={c.ticker} className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[var(--theme-accent)]">{c.ticker}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-secondary)]">
                      β = {c.beta}
                    </span>
                  </div>
                  <h5 className="font-display text-sm font-normal text-[var(--theme-text)]">{c.name}</h5>
                  <span className="font-mono text-[10px] text-[var(--theme-text-muted)] block">{c.betaStatus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What This Project Demonstrates */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-2">
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              What This Project Demonstrates
            </span>
            <p className="max-w-[70ch] font-body text-xs sm:text-sm leading-relaxed text-[var(--theme-text)]/90">
              Through this academic assignment, I applied quantitative techniques to examine historical stock returns, market sensitivity, portfolio composition, and CAPM-based required returns.
            </p>
            <p className="max-w-[70ch] font-body text-xs leading-relaxed text-[var(--theme-text-secondary)]">
              The project strengthened my understanding of how financial data can be transformed into quantitative measures that support structured portfolio analysis.
            </p>
          </div>
        </div>
      )}

      {/* ================= TAB 2: RISK & RETURN ================= */}
      {activeTab === 'risk-return' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--theme-border)] pb-3">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                <BarChart3 className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
                <span>Risk &amp; Return Metrics</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)]">
                Historical Return &amp; Risk Dashboard
              </h3>
              <span className="font-mono text-xs text-[var(--theme-text-muted)]">
                Reported project calculations from 7 years of daily market records
              </span>
            </div>

            {/* Period Toggle */}
            <div className="inline-flex rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-0.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => setReturnPeriod('annual')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  returnPeriod === 'annual'
                    ? 'btn-accent-primary font-semibold'
                    : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)]'
                }`}
              >
                Annualized Statistics
              </button>
              <button
                type="button"
                onClick={() => setReturnPeriod('daily')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  returnPeriod === 'daily'
                    ? 'btn-accent-primary font-semibold'
                    : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)]'
                }`}
              >
                Daily Return Statistics
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] overflow-hidden">
            <div className="p-3 bg-[var(--theme-background-soft)]/50 border-b border-[var(--theme-border)] flex items-center justify-between">
              <span className="font-mono text-[11px] font-semibold text-[var(--theme-text)]">
                {returnPeriod === 'annual' ? 'ANNUALIZED MEASURES' : 'DAILY RETURN MEASURES'} (Reported Project Calculations)
              </span>
              <span className="font-mono text-[10px] text-[var(--theme-accent)] border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/10 px-2 py-0.5 rounded">
                Reproduced from academic report
              </span>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left font-mono text-xs">
                <thead className="border-b border-[var(--theme-border)] bg-[var(--theme-background-soft)]/40 text-[11px] uppercase tracking-wider text-[var(--theme-text-muted)]">
                  <tr>
                    <th className="py-3 px-4">Asset</th>
                    <th className="py-3 px-4">Average Return</th>
                    <th className="py-3 px-4">Standard Deviation (Risk)</th>
                    <th className="py-3 px-4">Coefficient of Variation (CV)</th>
                    <th className="py-3 px-4">Reported Beta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--theme-border)]/60 tabular-nums">
                  {companiesData.map((row) => (
                    <tr
                      key={row.id}
                      className={`hover:bg-[var(--theme-background-soft)]/40 transition-colors ${
                        row.isBenchmark ? 'bg-[var(--theme-accent)]/5 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span className="font-semibold text-[var(--theme-text)]">{row.name}</span>
                        <span className="block font-mono text-[10px] text-[var(--theme-text-muted)] font-normal">({row.ticker})</span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-[var(--theme-text)]">
                        {returnPeriod === 'annual' ? row.annualReturn : row.dailyReturn}
                      </td>
                      <td className="py-3 px-4 text-[var(--theme-text-secondary)]">
                        {returnPeriod === 'annual' ? row.annualStd : row.dailyStd}
                      </td>
                      <td className="py-3 px-4 text-[var(--theme-text-secondary)]">
                        {returnPeriod === 'annual' ? row.annualCV : row.dailyCV}
                      </td>
                      <td className="py-3 px-4">
                        <span className="rounded border border-[var(--theme-border)] bg-[var(--theme-background-soft)] px-2 py-0.5 font-bold text-[var(--theme-accent)]">
                          {row.beta.toFixed(4)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk-Return Interpretation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-4 space-y-2">
              <span className="block font-mono text-xs font-semibold uppercase text-[var(--theme-accent)]">
                Coefficient of Variation (CV) Interpretation
              </span>
              <p className="max-w-[68ch] font-body text-xs sm:text-sm leading-relaxed text-[var(--theme-text)]/90">
                Coefficient of Variation (Standard Deviation ÷ Average Return) measures risk per unit of return. Fauji Fertilizer recorded the lowest annual CV (0.8387) among single equities, while Lucky Cement (2.5932) and Pakistan Petroleum (2.3883) demonstrated higher return volatility per unit of yield.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-4 space-y-2">
              <span className="block font-mono text-xs font-semibold uppercase text-[var(--theme-accent)]">
                Annualized Performance Summary
              </span>
              <p className="max-w-[68ch] font-body text-xs sm:text-sm leading-relaxed text-[var(--theme-text)]/90">
                Fauji Fertilizer achieved the highest average annual return (29.9152%) with moderate volatility (25.0899%). The benchmark KSE-100 recorded an average annual return of 23.9366% with standard deviation of 18.6865%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: SCATTER & BETA ================= */}
      {activeTab === 'beta-scatter' && (
        <div className="space-y-6">
          <div className="border-b border-[var(--theme-border)] pb-3">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
              <LineChart className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
              <span>Regression Analysis</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)]">
              Stock Returns vs. KSE-100 Returns &amp; Beta Estimation
            </h3>
            <p className="font-mono text-xs text-[var(--theme-text-muted)]">
              The scatter diagrams examine the relationship between each company's daily returns and KSE-100 daily returns.
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
                type="button"
                onClick={() => setSelectedStock(s.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                  selectedStock === s.id
                    ? 'btn-accent-primary font-bold'
                    : 'border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Selected Stock Regression Details */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--theme-border)] pb-3">
              <div>
                <span className="font-mono text-[10px] text-[var(--theme-accent)] uppercase font-semibold">
                  Regression Parameters: {selectedStockDetails.name}
                </span>
                <h4 className="font-display text-base font-normal text-[var(--theme-text)]">
                  Company Return = α + β × Market Return
                </h4>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded border border-[var(--theme-border)] bg-[var(--theme-background-soft)] text-[var(--theme-text-muted)]">
                Calculated via Excel SLOPE, INTERCEPT, RSQ
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs tabular-nums">
              <div className="p-3.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <span className="text-[10px] text-[var(--theme-text-muted)] uppercase block">Beta (Slope)</span>
                <span className="text-base font-bold text-[var(--theme-accent)] block mt-1">
                  {selectedStockDetails.beta.toFixed(4)}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <span className="text-[10px] text-[var(--theme-text-muted)] uppercase block">Alpha (Intercept)</span>
                <span className="text-base font-bold text-[var(--theme-text)] block mt-1">
                  {selectedStockDetails.alpha}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <span className="text-[10px] text-[var(--theme-text-muted)] uppercase block">R² Value (RSQ)</span>
                <span className="text-base font-bold text-[var(--theme-text)] block mt-1">
                  {selectedStockDetails.r2}
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <span className="text-[10px] text-[var(--theme-text-muted)] uppercase block">Scatter Pattern</span>
                <span className="text-xs font-semibold text-[var(--theme-text)] block mt-1">
                  {selectedStockDetails.pattern}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/40 font-mono text-xs">
              <span className="font-semibold text-[var(--theme-accent)] block mb-1">
                Fitted Characteristic Line:
              </span>
              <code className="text-[var(--theme-text)] block font-mono text-xs">
                R_{selectedStockDetails.ticker} = {selectedStockDetails.alpha} + ({selectedStockDetails.beta.toFixed(4)} × R_KSE100)
              </code>
            </div>
          </div>

          {/* Visual Beta Scale */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
              <div>
                <h4 className="flex items-center gap-2 font-display text-base font-normal text-[var(--theme-text)]">
                  <Scale className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
                  Visual Market Sensitivity Scale (Beta)
                </h4>
                <p className="font-mono text-xs text-[var(--theme-text-muted)]">
                  Comparing systematic risk relative to the KSE-100 benchmark (β = 1.0000)
                </p>
              </div>
              <span className="font-mono text-[10px] text-[var(--theme-text-muted)]">Neutral academic classification</span>
            </div>

            <div className="space-y-6 pt-4">
              <div className="relative h-3 bg-[var(--theme-border)] rounded-full">
                {/* Market Benchmark Marker at center */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-7 bg-[var(--theme-text)] z-10"
                  style={{ left: '50%' }}
                >
                  <span className="absolute -top-5 -translate-x-1/2 font-mono text-[10px] font-bold text-[var(--theme-text)] whitespace-nowrap">
                    β = 1.0 (Market)
                  </span>
                </div>

                {/* Stock Markers */}
                {[
                  { name: 'FFC', beta: 0.701, pos: '20.1%' },
                  { name: 'HBL', beta: 1.0529, pos: '55.3%' },
                  { name: 'LUCK', beta: 1.1957, pos: '69.6%' },
                  { name: 'PPL', beta: 1.421, pos: '92.1%' },
                ].map((m) => (
                  <div
                    key={m.name}
                    className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                    style={{ left: m.pos }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-[var(--theme-accent)] border-2 border-[var(--theme-surface)]" />
                    <span className="mt-2 font-mono text-[10px] font-bold text-[var(--theme-accent)] whitespace-nowrap">
                      {m.name} ({m.beta.toFixed(2)})
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-mono text-[11px] pt-2 text-[var(--theme-text-muted)]">
                <span>← LOWER MARKET SENSITIVITY (β &lt; 1)</span>
                <span>HIGHER MARKET SENSITIVITY (β &gt; 1) →</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-[var(--theme-border)]/60 bg-[var(--theme-background-soft)]/50 font-mono text-xs text-[var(--theme-text-muted)]">
              Notice: Beta reflects systematic historical co-movement with the KSE-100 benchmark and does not constitute an investment endorsement.
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: PORTFOLIO CONSTRUCTION ================= */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          {/* Task 5: Assignment Portfolio Allocation */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--theme-border)] pb-3">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                  <PieChart className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
                  <span>Task 5 Allocation</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)] mt-0.5">
                  Academic Portfolio Allocation
                </h3>
              </div>
              <span className="font-mono text-[11px] px-2.5 py-0.5 rounded border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] font-semibold">
                Assignment allocation
              </span>
            </div>

            <p className="max-w-[70ch] font-body text-xs sm:text-sm text-[var(--theme-text)]/90 leading-relaxed">
              The assignment allocated 90% across the four equities, with the remaining 10% designated as cash / risk-free asset:
            </p>

            {/* Weight Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center font-mono">
              <div className="p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <span className="text-[10px] text-[var(--theme-text-muted)] block">Fauji Fertilizer</span>
                <span className="text-base font-bold text-[var(--theme-text)] mt-1 block">30%</span>
                <span className="text-[10px] text-[var(--theme-accent)]">β = 0.7010</span>
              </div>

              <div className="p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <span className="text-[10px] text-[var(--theme-text-muted)] block">Lucky Cement</span>
                <span className="text-base font-bold text-[var(--theme-text)] mt-1 block">30%</span>
                <span className="text-[10px] text-[var(--theme-accent)]">β = 1.1957</span>
              </div>

              <div className="p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <span className="text-[10px] text-[var(--theme-text-muted)] block">Pakistan Petroleum</span>
                <span className="text-base font-bold text-[var(--theme-text)] mt-1 block">20%</span>
                <span className="text-[10px] text-[var(--theme-accent)]">β = 1.4210</span>
              </div>

              <div className="p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <span className="text-[10px] text-[var(--theme-text-muted)] block">Habib Bank</span>
                <span className="text-base font-bold text-[var(--theme-text)] mt-1 block">10%</span>
                <span className="text-[10px] text-[var(--theme-accent)]">β = 1.0529</span>
              </div>

              <div className="p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50">
                <span className="text-[10px] text-[var(--theme-text-muted)] block">Cash / Risk-Free</span>
                <span className="text-base font-bold text-[var(--theme-text)] mt-1 block">10%</span>
                <span className="text-[10px] text-[var(--theme-text-muted)]">β = 0.0000</span>
              </div>
            </div>

            {/* Reported Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono">
              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/40 space-y-1">
                <span className="text-[10px] text-[var(--theme-text-muted)] uppercase">Reported Weighted Beta</span>
                <span className="text-xl font-bold text-[var(--theme-accent)] block tabular-nums">
                  β_portfolio = 0.9585
                </span>
                <span className="text-[11px] text-[var(--theme-text-secondary)] block">Systematic risk is slightly below overall market benchmark</span>
              </div>

              <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/40 space-y-1">
                <span className="text-[10px] text-[var(--theme-text-muted)] uppercase">Reported Weighted Return</span>
                <span className="text-xl font-bold text-[var(--theme-text)] block tabular-nums">
                  19.2757%
                </span>
                <span className="text-[11px] text-[var(--theme-text-secondary)] block">Weighted annual return of the assigned portfolio allocation</span>
              </div>
            </div>
          </div>

          {/* Task 6: Combined Portfolio Beta */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--theme-border)] pb-3">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                  <Layers className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
                  <span>Task 6 Beta Synthesis</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)] mt-0.5">
                  Combined Portfolio Beta
                </h3>
              </div>
              <span className="font-mono text-[11px] px-2.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-background-soft)] text-[var(--theme-text-secondary)] font-semibold">
                Hypothetical assets
              </span>
            </div>

            <div className="overflow-x-auto no-scrollbar rounded-xl border border-[var(--theme-border)]">
              <table className="w-full text-left font-mono text-xs tabular-nums">
                <thead className="bg-[var(--theme-background-soft)]/40 text-[11px] text-[var(--theme-text-muted)] uppercase border-b border-[var(--theme-border)]">
                  <tr>
                    <th className="py-2.5 px-4">Component</th>
                    <th className="py-2.5 px-4">Portfolio Weight</th>
                    <th className="py-2.5 px-4">Beta</th>
                    <th className="py-2.5 px-4">Weighted Beta Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--theme-border)]/60">
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-[var(--theme-text)]">Task-5 Portfolio</td>
                    <td className="py-2.5 px-4">25.00%</td>
                    <td className="py-2.5 px-4">0.9585</td>
                    <td className="py-2.5 px-4">0.2396</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-[var(--theme-text-secondary)]">Stock A (Hypothetical Asset)</td>
                    <td className="py-2.5 px-4">15.00%</td>
                    <td className="py-2.5 px-4">0.7690</td>
                    <td className="py-2.5 px-4">0.1154</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-[var(--theme-text-secondary)]">Stock B (Hypothetical Asset)</td>
                    <td className="py-2.5 px-4">40.00%</td>
                    <td className="py-2.5 px-4">0.9850</td>
                    <td className="py-2.5 px-4">0.3940</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 text-[var(--theme-text-secondary)]">Stock C (Hypothetical Asset)</td>
                    <td className="py-2.5 px-4">20.00%</td>
                    <td className="py-2.5 px-4">1.4230</td>
                    <td className="py-2.5 px-4">0.2846</td>
                  </tr>
                  <tr className="bg-[var(--theme-background-soft)] font-bold border-t-2 border-[var(--theme-border)]">
                    <td className="py-3 px-4 text-[var(--theme-text)]">Reported Combined Beta</td>
                    <td className="py-3 px-4">100.00%</td>
                    <td className="py-3 px-4 text-[var(--theme-text-muted)]">—</td>
                    <td className="py-3 px-4 text-[var(--theme-accent)] text-sm">β = 1.0336</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: CAPM & SML ================= */}
      {activeTab === 'capm-sml' && (
        <div className="space-y-6">
          {/* Task 7: CAPM Explainer */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--theme-border)] pb-3">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                  <Percent className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
                  <span>Task 7 Valuation</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)] mt-0.5">
                  Capital Asset Pricing Model (CAPM)
                </h3>
              </div>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-[var(--theme-border)] bg-[var(--theme-background-soft)] text-[var(--theme-text-muted)] font-semibold">
                Academic assignment values
              </span>
            </div>

            {/* Formula Visual Box */}
            <div className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 text-center font-mono">
              <span className="text-[10px] text-[var(--theme-text-muted)] uppercase tracking-widest block mb-2 font-semibold">
                Standard CAPM Specification
              </span>
              <div className="font-display text-lg sm:text-xl font-normal text-[var(--theme-text)]">
                Required Return = R_f + β_p × (R_m − R_f)
              </div>
              <div className="text-xs sm:text-sm text-[var(--theme-accent)] mt-2 font-semibold font-mono tabular-nums">
                24.3373% = 12.0000% + 1.0336 × (23.9366% − 12.0000%)
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs tabular-nums">
              <div className="p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/40">
                <span className="text-[10px] text-[var(--theme-text-muted)] uppercase block">Risk-Free Rate (Rf)</span>
                <span className="font-bold text-[var(--theme-text)] block mt-1">12.0000%</span>
              </div>

              <div className="p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/40">
                <span className="text-[10px] text-[var(--theme-text-muted)] uppercase block">Market Return (Rm)</span>
                <span className="font-bold text-[var(--theme-text)] block mt-1">23.9366%</span>
              </div>

              <div className="p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/40">
                <span className="text-[10px] text-[var(--theme-text-muted)] uppercase block">Market Risk Premium</span>
                <span className="font-bold text-[var(--theme-text)] block mt-1">11.9366%</span>
              </div>

              <div className="p-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/40">
                <span className="text-[10px] text-[var(--theme-accent)] uppercase block font-semibold">Reported Required Return</span>
                <span className="font-bold text-[var(--theme-accent)] block mt-1 text-sm">24.3373%</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-[var(--theme-border)]/60 bg-[var(--theme-background-soft)]/50 font-mono text-xs text-[var(--theme-text-muted)]">
              Note: CAPM figures are reproduced from the academic assignment and reflect assignment-specific parameters.
            </div>
          </div>

          {/* Task 8: Security Market Line (SML) */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--theme-border)] pb-3">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                  <TrendingUp className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
                  <span>Task 8 Equilibrium</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)] mt-0.5">
                  Security Market Line (SML) Analysis
                </h3>
              </div>
              <span className="font-mono text-xs text-[var(--theme-text-muted)]">
                Neutral academic evaluation · No investment recommendations
              </span>
            </div>

            <p className="max-w-[70ch] font-body text-xs sm:text-sm text-[var(--theme-text)]/90 leading-relaxed">
              The Security Market Line compares a security's required return under CAPM with its reported actual return.
            </p>

            {/* SML Table */}
            <div className="overflow-x-auto no-scrollbar rounded-xl border border-[var(--theme-border)]">
              <table className="w-full text-left font-mono text-xs tabular-nums">
                <thead className="bg-[var(--theme-background-soft)]/40 text-[11px] text-[var(--theme-text-muted)] uppercase border-b border-[var(--theme-border)]">
                  <tr>
                    <th className="py-2.5 px-4">Asset</th>
                    <th className="py-2.5 px-4">Beta</th>
                    <th className="py-2.5 px-4">SML Required Return</th>
                    <th className="py-2.5 px-4">Reported Actual Return</th>
                    <th className="py-2.5 px-4">Difference</th>
                    <th className="py-2.5 px-4">Academic Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--theme-border)]/60">
                  {smlComparison.map((item) => (
                    <tr key={item.asset} className="hover:bg-[var(--theme-background-soft)]/40">
                      <td className="py-3 px-4 font-bold text-[var(--theme-text)]">{item.asset}</td>
                      <td className="py-3 px-4">{item.beta.toFixed(4)}</td>
                      <td className="py-3 px-4 text-[var(--theme-text-secondary)]">{item.smlRequired}</td>
                      <td className="py-3 px-4 font-semibold text-[var(--theme-text)]">{item.actualReturn}</td>
                      <td className={`py-3 px-4 font-bold ${item.isAbove ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text-muted)]'}`}>
                        {item.difference}
                      </td>
                      <td className="py-3 px-4 text-[11px]">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono ${
                            item.isAbove
                              ? 'border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] font-semibold'
                              : 'border border-[var(--theme-border)] bg-[var(--theme-background-soft)] text-[var(--theme-text-secondary)]'
                          }`}
                        >
                          {item.interpretation}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 space-y-1 font-mono text-xs text-[var(--theme-text-muted)]">
              <span className="font-semibold text-[var(--theme-text)] block text-[11px]">
                Academic Integrity Note on SML Labels:
              </span>
              <p className="text-[11px] leading-relaxed">
                In compliance with academic standards, this portfolio uses strictly neutral descriptive labels ("Above SML" / "Below SML") rather than commercial trading advice ("BUY" / "SELL" / "AVOID").
              </p>
            </div>
          </div>
        </div>
      )}
    </CaseStudyModalShell>
  );
};

export default FinancialPortfolioCaseStudyModal;
