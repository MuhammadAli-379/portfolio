import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  PieChart as PieIcon,
  Table as TableIcon,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  Percent,
  Activity,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

type BusinessSegment = 'all' | 'enterprise' | 'retail' | 'saas' | 'ecommerce';
type Timeframe = 'full' | 'q1' | 'q2' | 'q3' | 'q4';

interface MetricSnapshot {
  revenue: number;
  revenueChange: number;
  margin: number;
  marginChange: number;
  retention: number;
  retentionChange: number;
  avgOrderValue: number;
  aovChange: number;
}

const DEMO_METRICS: Record<BusinessSegment, Record<Timeframe, MetricSnapshot>> = {
  all: {
    full: { revenue: 1420500, revenueChange: 14.8, margin: 38.4, marginChange: 2.1, retention: 87.2, retentionChange: 3.5, avgOrderValue: 420, aovChange: 6.2 },
    q1: { revenue: 310200, revenueChange: 9.4, margin: 36.8, marginChange: 1.2, retention: 84.1, retentionChange: 1.8, avgOrderValue: 395, aovChange: 3.1 },
    q2: { revenue: 345000, revenueChange: 12.1, margin: 37.9, marginChange: 1.8, retention: 85.9, retentionChange: 2.2, avgOrderValue: 410, aovChange: 4.5 },
    q3: { revenue: 368400, revenueChange: 15.3, margin: 39.1, marginChange: 2.5, retention: 88.0, retentionChange: 4.1, avgOrderValue: 428, aovChange: 7.0 },
    q4: { revenue: 396900, revenueChange: 18.2, margin: 39.8, marginChange: 2.8, retention: 89.4, retentionChange: 4.7, avgOrderValue: 445, aovChange: 8.8 },
  },
  enterprise: {
    full: { revenue: 680000, revenueChange: 19.5, margin: 52.1, marginChange: 4.3, retention: 94.2, retentionChange: 2.8, avgOrderValue: 3200, aovChange: 11.2 },
    q1: { revenue: 150000, revenueChange: 14.2, margin: 49.8, marginChange: 2.6, retention: 92.5, retentionChange: 1.5, avgOrderValue: 3050, aovChange: 8.4 },
    q2: { revenue: 165000, revenueChange: 18.0, margin: 51.5, marginChange: 3.9, retention: 93.8, retentionChange: 2.1, avgOrderValue: 3150, aovChange: 9.8 },
    q3: { revenue: 175000, revenueChange: 21.4, margin: 53.0, marginChange: 4.8, retention: 95.0, retentionChange: 3.4, avgOrderValue: 3280, aovChange: 12.0 },
    q4: { revenue: 190000, revenueChange: 23.8, margin: 54.2, marginChange: 5.4, retention: 95.8, retentionChange: 4.0, avgOrderValue: 3380, aovChange: 13.9 },
  },
  retail: {
    full: { revenue: 290500, revenueChange: 8.1, margin: 24.3, marginChange: -1.2, retention: 76.5, retentionChange: 1.2, avgOrderValue: 145, aovChange: -0.8 },
    q1: { revenue: 68000, revenueChange: 5.4, margin: 23.8, marginChange: -1.8, retention: 74.0, retentionChange: 0.5, avgOrderValue: 140, aovChange: -1.5 },
    q2: { revenue: 71500, revenueChange: 7.2, margin: 24.1, marginChange: -1.4, retention: 75.8, retentionChange: 1.0, avgOrderValue: 144, aovChange: -0.9 },
    q3: { revenue: 73000, revenueChange: 8.9, margin: 24.5, marginChange: -0.9, retention: 77.2, retentionChange: 1.4, avgOrderValue: 147, aovChange: -0.2 },
    q4: { revenue: 78000, revenueChange: 10.4, margin: 24.9, marginChange: -0.4, retention: 78.5, retentionChange: 2.0, avgOrderValue: 151, aovChange: 0.8 },
  },
  saas: {
    full: { revenue: 310000, revenueChange: 24.6, margin: 68.4, marginChange: 5.1, retention: 91.8, retentionChange: 6.2, avgOrderValue: 240, aovChange: 14.5 },
    q1: { revenue: 64000, revenueChange: 18.2, margin: 65.2, marginChange: 3.5, retention: 89.0, retentionChange: 4.0, avgOrderValue: 215, aovChange: 10.2 },
    q2: { revenue: 73500, revenueChange: 22.8, margin: 67.5, marginChange: 4.7, retention: 91.2, retentionChange: 5.5, avgOrderValue: 235, aovChange: 13.4 },
    q3: { revenue: 81000, revenueChange: 26.5, margin: 69.8, marginChange: 5.8, retention: 92.9, retentionChange: 6.9, avgOrderValue: 250, aovChange: 15.8 },
    q4: { revenue: 91500, revenueChange: 29.8, margin: 71.0, marginChange: 6.4, retention: 93.8, retentionChange: 7.8, avgOrderValue: 265, aovChange: 18.2 },
  },
  ecommerce: {
    full: { revenue: 140000, revenueChange: 11.2, margin: 29.8, marginChange: 1.4, retention: 69.4, retentionChange: 2.1, avgOrderValue: 92, aovChange: 3.8 },
    q1: { revenue: 28200, revenueChange: 7.9, margin: 28.5, marginChange: 0.8, retention: 67.2, retentionChange: 1.1, avgOrderValue: 88, aovChange: 2.0 },
    q2: { revenue: 35000, revenueChange: 10.4, margin: 29.4, marginChange: 1.2, retention: 68.9, retentionChange: 1.8, avgOrderValue: 91, aovChange: 3.2 },
    q3: { revenue: 39400, revenueChange: 12.8, margin: 30.2, marginChange: 1.7, retention: 70.4, retentionChange: 2.5, avgOrderValue: 94, aovChange: 4.5 },
    q4: { revenue: 37400, revenueChange: 13.5, margin: 31.0, marginChange: 2.0, retention: 71.2, retentionChange: 2.9, avgOrderValue: 96, aovChange: 5.1 },
  },
};

const MONTHLY_TREND_SERIES: Record<BusinessSegment, number[]> = {
  all: [88, 94, 98, 104, 112, 118, 122, 128, 134, 142, 150, 162],
  enterprise: [42, 45, 48, 52, 56, 60, 62, 66, 70, 75, 80, 88],
  retail: [22, 23, 23, 24, 25, 26, 26, 27, 28, 29, 30, 31],
  saas: [18, 20, 22, 24, 27, 30, 32, 35, 37, 41, 44, 49],
  ecommerce: [8, 9, 9, 10, 11, 12, 12, 13, 14, 15, 15, 17],
};

const REGIONAL_BREAKDOWN = [
  { region: 'North America', share: 44, val: '$625K' },
  { region: 'Europe & UK', share: 28, val: '$398K' },
  { region: 'Asia Pacific', share: 19, val: '$270K' },
  { region: 'Middle East & Others', share: 9, val: '$127K' },
];

// Cycles through the theme's own palette so regions read as distinct
// without hardcoding colors that would clash with a different theme.
const REGION_COLOR_VARS = [
  'var(--theme-primary)',
  'var(--theme-primary-light)',
  'var(--theme-accent)',
  'var(--theme-accent-light, var(--theme-accent))',
];

function TrendBadge({ value, suffix }: { value: number; suffix: string }) {
  const positive = value >= 0;
  return (
    <div
      className={`mt-2 flex items-center gap-1 text-xs font-mono ${
        positive ? 'text-emerald-500' : 'text-rose-500'
      }`}
    >
      {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
      <span>
        {positive ? '+' : ''}
        {value}
        {suffix}
      </span>
    </div>
  );
}

export const AnalyticsPlayground: React.FC = () => {
  const [segment, setSegment] = useState<BusinessSegment>('all');
  const [timeframe, setTimeframe] = useState<Timeframe>('full');
  const [viewMode, setViewMode] = useState<'visual' | 'table'>('visual');
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);

  const headerRef = useReveal<HTMLDivElement>();
  const filterRef = useReveal<HTMLDivElement>();
  const trendRef = useReveal<HTMLDivElement>();
  const regionalRef = useReveal<HTMLDivElement>();

  const snapshot = DEMO_METRICS[segment][timeframe];
  const monthlyData = MONTHLY_TREND_SERIES[segment];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxVal = Math.max(...monthlyData);

  const kpiCards = [
    {
      label: 'Total Net Revenue',
      icon: DollarSign,
      value: `$${snapshot.revenue.toLocaleString()}`,
      change: snapshot.revenueChange,
      suffix: '% YoY Benchmark',
    },
    {
      label: 'Gross Margin %',
      icon: Percent,
      value: `${snapshot.margin.toFixed(1)}%`,
      change: snapshot.marginChange,
      suffix: '% vs Target',
    },
    {
      label: 'Net Retention (NRR)',
      icon: Users,
      value: `${snapshot.retention.toFixed(1)}%`,
      change: snapshot.retentionChange,
      suffix: '% Cohort Survival',
    },
    {
      label: 'Avg Basket Value',
      icon: TrendingUp,
      value: `$${snapshot.avgOrderValue.toLocaleString()}`,
      change: snapshot.aovChange,
      suffix: '% Rolling Index',
    },
  ];

  return (
    <section id="playground" className="relative border-t border-[var(--theme-border)] bg-[var(--theme-background)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="reveal mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
              <Activity className="h-3.5 w-3.5" />
              <span>Interactive Demonstration</span>
            </div>
            <h2 className="text-gradient text-3xl font-bold tracking-tight sm:text-4xl">
              Analytics Playground
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--theme-text-secondary)] sm:text-base">
              A reactive mock business intelligence console demonstrating metric
              aggregation, dynamic visual encodings, and interactive cross-filtering.
            </p>
          </div>

          <div className="flex items-center gap-1 self-start rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-1 md:self-auto">
            <button
              onClick={() => setViewMode('visual')}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
              style={
                viewMode === 'visual'
                  ? { backgroundColor: 'var(--theme-primary)', color: 'var(--comp-btn-primary-text)' }
                  : { color: 'var(--theme-text-secondary)' }
              }
            >
              <BarChart2 className="h-3.5 w-3.5" />
              <span>Charts</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
              style={
                viewMode === 'table'
                  ? { backgroundColor: 'var(--theme-primary)', color: 'var(--comp-btn-primary-text)' }
                  : { color: 'var(--theme-text-secondary)' }
              }
            >
              <TableIcon className="h-3.5 w-3.5" />
              <span>Tabular</span>
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/5 p-3 text-xs text-[var(--theme-text-secondary)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--theme-accent)]" />
            <span className="font-semibold text-[var(--theme-text)]">
              Illustrative visualization — sample synthetic data only.
            </span>
            <span className="hidden text-[var(--theme-text-muted)] sm:inline">
              Not project output, not actual company data, and not client financials.
            </span>
          </div>
          <span className="font-mono text-[11px] text-[var(--theme-text-muted)]">Reactive State Active</span>
        </div>

        {/* Filter Bar */}
        <div ref={filterRef} className="reveal mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">
              Segment:
            </span>
            {[
              { id: 'all', label: 'All Segments' },
              { id: 'enterprise', label: 'Enterprise B2B' },
              { id: 'saas', label: 'SaaS Platform' },
              { id: 'retail', label: 'Omni Retail' },
              { id: 'ecommerce', label: 'D2C E-Commerce' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSegment(item.id as BusinessSegment)}
                className="rounded-lg px-2.5 py-1 text-xs font-medium transition-colors"
                style={
                  segment === item.id
                    ? { backgroundColor: 'var(--theme-primary)', color: 'var(--comp-btn-primary-text)' }
                    : { backgroundColor: 'var(--theme-background-soft)', color: 'var(--theme-text-secondary)' }
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 self-start md:self-auto">
            <span className="mr-1 text-xs font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">
              Period:
            </span>
            {[
              { id: 'full', label: 'Full Year' },
              { id: 'q1', label: 'Q1' },
              { id: 'q2', label: 'Q2' },
              { id: 'q3', label: 'Q3' },
              { id: 'q4', label: 'Q4' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTimeframe(t.id as Timeframe)}
                className="rounded-lg px-2.5 py-1 text-xs font-medium transition-colors"
                style={
                  timeframe === t.id
                    ? { backgroundColor: 'var(--theme-primary)', color: 'var(--comp-btn-primary-text)' }
                    : { backgroundColor: 'var(--theme-background-soft)', color: 'var(--theme-text-secondary)' }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((kpi) => (
            <div
              key={kpi.label}
              className="card-hover rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[var(--theme-text-muted)]">
                  {kpi.label}
                </span>
                <kpi.icon className="h-4 w-4 text-[var(--theme-accent)]" />
              </div>
              <div className="font-mono text-2xl font-bold tracking-tight tabular-nums text-[var(--theme-text)]">
                {kpi.value}
              </div>
              <TrendBadge value={kpi.change} suffix={kpi.suffix} />
            </div>
          ))}
        </div>

        {viewMode === 'visual' ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Monthly Trend */}
            <div
              ref={trendRef}
              className="reveal card-hover flex flex-col justify-between rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 shadow-sm lg:col-span-8"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--theme-text)]">
                      Monthly Revenue Progression ($ in Thousands)
                    </h3>
                    <p className="font-mono text-xs text-[var(--theme-text-muted)]">
                      Segment: {segment.toUpperCase()} · Hover bars to inspect monthly values
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--theme-accent)]">Live Reactive Chart</span>
                </div>

                <div className="relative flex h-60 w-full items-end pb-2 pt-6">
                  <div className="flex h-48 w-full items-end justify-between gap-2">
                    {monthlyData.map((val, idx) => {
                      const heightPercent = Math.round((val / maxVal) * 100);
                      const isHovered = hoveredMonthIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="group flex h-full flex-1 cursor-pointer flex-col items-center justify-end"
                          onMouseEnter={() => setHoveredMonthIndex(idx)}
                          onMouseLeave={() => setHoveredMonthIndex(null)}
                        >
                          <div
                            className={`mb-1 font-mono text-[10px] text-[var(--theme-text)] transition-opacity ${
                              isHovered ? 'font-bold opacity-100' : 'opacity-0'
                            }`}
                          >
                            ${val}K
                          </div>
                          <div
                            className="w-full rounded-t transition-all duration-300"
                            style={{
                              height: `${heightPercent}%`,
                              backgroundColor: isHovered
                                ? 'var(--theme-accent)'
                                : 'color-mix(in srgb, var(--theme-primary) 40%, transparent)',
                              boxShadow: isHovered ? '0 6px 16px -4px color-mix(in srgb, var(--theme-accent) 50%, transparent)' : 'none',
                            }}
                          />
                          <span className="mt-2 font-mono text-[10px] text-[var(--theme-text-muted)]">
                            {months[idx]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--theme-border)] pt-4 text-xs text-[var(--theme-text-muted)]">
                <span className="font-mono">Metric Source: Synthetic Aggregate</span>
                <span className="font-mono text-[var(--theme-accent)]">Peak Period: Q4 ($162K)</span>
              </div>
            </div>

            {/* Regional Breakdown */}
            <div
              ref={regionalRef}
              className="reveal card-hover flex flex-col justify-between rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 shadow-sm lg:col-span-4"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[var(--theme-text)]">Regional Distribution</h3>
                  <PieIcon className="h-4 w-4 text-[var(--theme-text-muted)]" />
                </div>

                <div className="space-y-4 pt-2">
                  {REGIONAL_BREAKDOWN.map((item, idx) => (
                    <div key={item.region} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-[var(--theme-text)]">{item.region}</span>
                        <span className="font-mono text-[var(--theme-text-muted)]">
                          {item.val} ({item.share}%)
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--theme-background-soft)]">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.share}%`,
                            backgroundColor: REGION_COLOR_VARS[idx % REGION_COLOR_VARS.length],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-[var(--theme-border)] pt-4 text-xs leading-relaxed text-[var(--theme-text-secondary)]">
                <p>
                  <strong className="text-[var(--theme-text)]">Analytics Note:</strong>{' '}
                  High regional concentration in North America suggests an opportunity
                  for channel expansion into APAC.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-hover overflow-x-auto rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 shadow-sm">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[var(--theme-border)] uppercase tracking-wider text-[var(--theme-text-muted)]">
                  <th className="pb-3 font-semibold">Month</th>
                  <th className="pb-3 font-semibold">Revenue ($K)</th>
                  <th className="pb-3 font-semibold">Gross Margin</th>
                  <th className="pb-3 font-semibold">Active Customers</th>
                  <th className="pb-3 text-right font-semibold">Trend Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--theme-border)]">
                {months.map((m, i) => (
                  <tr key={m} className="transition-colors hover:bg-[var(--theme-background-soft)]">
                    <td className="py-2.5 font-medium text-[var(--theme-text)]">{m} 2024</td>
                    <td className="py-2.5 tabular-nums text-[var(--theme-text-secondary)]">
                      ${monthlyData[i]}K
                    </td>
                    <td className="py-2.5 tabular-nums text-[var(--theme-text-secondary)]">
                      {(36 + i * 0.3).toFixed(1)}%
                    </td>
                    <td className="py-2.5 tabular-nums text-[var(--theme-text-secondary)]">
                      {(1200 + i * 45).toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right font-medium tabular-nums text-emerald-500">
                      +{(2.1 + i * 0.4).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};