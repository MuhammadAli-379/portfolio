import React, { useState, lazy, Suspense } from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  ExternalLink,
  FolderKanban,
  GraduationCap,
  Layers,
  LineChart,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';

import { AcademicProject } from '../types/portfolio';
import { PageHeader } from '../components/PageHeader';
import { PageNavigation } from '../components/PageNavigation';
import { useReveal } from '../hooks/useReveal';

/* =============================================================
   LAZY LOADED CASE STUDY MODALS
   Code-split with React.lazy and Suspense to minimize initial
   chunk size and improve time-to-interactive.
============================================================= */

const CreditRiskCaseStudyModal = lazy(() =>
  import('../components/CreditRiskCaseStudyModal').then((m) => ({
    default: m.CreditRiskCaseStudyModal,
  }))
);
const TimeSeriesCaseStudyModal = lazy(() =>
  import('../components/TimeSeriesCaseStudyModal').then((m) => ({
    default: m.TimeSeriesCaseStudyModal,
  }))
);
const FinancialPortfolioCaseStudyModal = lazy(() =>
  import('../components/FinancialPortfolioCaseStudyModal').then((m) => ({
    default: m.FinancialPortfolioCaseStudyModal,
  }))
);
const EcommerceDatabaseCaseStudyModal = lazy(() =>
  import('../components/EcommerceDatabaseCaseStudyModal').then((m) => ({
    default: m.EcommerceDatabaseCaseStudyModal,
  }))
);
const FinancialRatioCaseStudyModal = lazy(() =>
  import('../components/FinancialRatioCaseStudyModal').then((m) => ({
    default: m.FinancialRatioCaseStudyModal,
  }))
);

interface ProjectsSectionProps {
  projects: AcademicProject[];
}

type CreditRiskTab = 'overview' | 'workflow' | 'models' | 'outcomes';
type FinancialTab =
  | 'overview'
  | 'risk-return'
  | 'beta-scatter'
  | 'portfolio'
  | 'capm-sml';
type EcommerceTab =
  | 'overview'
  | 'normalization'
  | 'entities'
  | 'relationships'
  | 'integrity';
type FinancialRatioTab =
  | 'overview'
  | 'dashboard'
  | 'ratios'
  | 'dupont'
  | 'horizontal-vertical'
  | 'risk-pestel'
  | 'valuation';

type Accent = 'burgundy' | 'gold';

/* =============================================================
   LIVE DEMO LINKS (Strictly verified against REDESIGN_LOCK.md)
============================================================= */
const LIVE_DEMOS = {
  timeSeries: 'https://sales-forecasting-intelligence.vercel.app/',
  creditRisk: 'https://credit-risk-app-live-demo.streamlit.app/',
  portfolio: 'https://portfolio-analysis-live-demo2.ai.studio',
  ecommerce: 'https://e-commerce-database-design-109.vercel.app/',
  financialRatio: 'https://financial-analysis-dashboard-109.streamlit.app/',
} as const;

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
}) => {
  const [selectedCreditRiskTab, setSelectedCreditRiskTab] =
    useState<CreditRiskTab>('overview');
  const [selectedFinancialTab, setSelectedFinancialTab] =
    useState<FinancialTab>('overview');
  const [selectedEcommerceTab, setSelectedEcommerceTab] =
    useState<EcommerceTab>('overview');
  const [selectedFinancialRatioTab, setSelectedFinancialRatioTab] =
    useState<FinancialRatioTab>('overview');

  const [isCreditRiskModalOpen, setIsCreditRiskModalOpen] = useState(false);
  const [isTimeSeriesModalOpen, setIsTimeSeriesModalOpen] = useState(false);
  const [isFinancialModalOpen, setIsFinancialModalOpen] = useState(false);
  const [isEcommerceModalOpen, setIsEcommerceModalOpen] = useState(false);
  const [isFinancialRatioModalOpen, setIsFinancialRatioModalOpen] =
    useState(false);

  const findProject = (id: string, fallbackIndex: number) =>
    projects.find((project) => project.id === id) ??
    projects[fallbackIndex] ??
    projects[0];

  const timeSeriesProject = findProject('time-series-sales', 0);
  const creditRiskProject = findProject('credit-risk-analytics', 1);
  const financialProject = findProject('financial-portfolio-analysis', 2);
  const ecommerceProject = findProject('ecommerce-database-design', 3);
  const financialRatioProject = findProject('financial-ratio-analysis', 4);

  const openCreditRisk = (tab: CreditRiskTab = 'overview') => {
    setSelectedCreditRiskTab(tab);
    setIsCreditRiskModalOpen(true);
  };
  const openFinancial = (tab: FinancialTab = 'overview') => {
    setSelectedFinancialTab(tab);
    setIsFinancialModalOpen(true);
  };
  const openEcommerce = (tab: EcommerceTab = 'overview') => {
    setSelectedEcommerceTab(tab);
    setIsEcommerceModalOpen(true);
  };
  const openFinancialRatio = (tab: FinancialRatioTab = 'overview') => {
    setSelectedFinancialRatioTab(tab);
    setIsFinancialRatioModalOpen(true);
  };

  return (
    <>
      <div
        id="projects"
        aria-labelledby="projects-heading"
        className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[var(--theme-background)] pt-28 pb-20 sm:pt-32 sm:pb-24 scroll-mt-28"
      >
        {/* Soft background accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-[var(--theme-accent)]/5 blur-3xl" />
          <div className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-[var(--theme-primary)]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <PageHeader
            badge="Academic Work & Coursework"
            badgeIcon={<FolderKanban className="h-3.5 w-3.5" />}
            title="Academic Projects"
            description="Applied coursework spanning business finance, database systems, business data analysis, machine learning, and financial management. Each project demonstrates a structured approach to data preparation, analytical modeling, financial interpretation, and technical documentation."
          />

          {/* COURSEWORK OVERVIEW SUMMARY CARD */}
          <div className="mb-14 overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-sm">
            <div className="p-5 sm:p-6 lg:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--theme-accent)]">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    Coursework Portfolio
                  </div>

                  <h3 className="text-base font-bold text-[var(--theme-text)] sm:text-lg">
                    Five analytical pillars across finance, data, modeling, databases, and business intelligence.
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[var(--theme-text-muted)]">
                    Academic projects completed as part of university coursework, presented with supporting case-study views.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  <OverviewPill number="01" label="Time Series" detail="Data Prep" />
                  <OverviewPill number="02" label="Credit Risk" detail="ML · PCA" accent="burgundy" />
                  <OverviewPill number="03" label="Portfolio" detail="CAPM · Beta" accent="gold" />
                  <OverviewPill number="04" label="Database" detail="ERD · 3NF" accent="burgundy" />
                  <OverviewPill number="05" label="Ratio Analysis" detail="DuPont" accent="gold" />
                </div>
              </div>
            </div>
          </div>

          {/* =============================================================
              EDITORIAL PROJECT ROWS (Alternating Layout)
          ============================================================= */}
          <div className="divide-y divide-[var(--theme-border)] border-t border-[var(--theme-border)] border-x-0">
            {/* 01 — TIME SERIES DATA PREPARATION */}
            <EditorialProjectRow
              projectNumber="01"
              category="Business Data Analysis"
              categoryIcon={GraduationCap}
              title="Time Series Data Preparation for Sales Forecasting"
              subtitle="Semester 4 • Individual Project"
              tags={[
                'Time Series',
                'Data Preparation',
                'Feature Engineering',
                'Pandas',
                'Matplotlib',
              ]}
              description="Prepared and transformed daily sales data into a structured time-series dataset suitable for forecasting analysis, including temporal preprocessing, visualization, and feature engineering."
              footer="Python · Pandas · NumPy"
              actionLabel="View Case Study"
              onAction={() => setIsTimeSeriesModalOpen(true)}
              liveDemoUrl={LIVE_DEMOS.timeSeries}
              accent="burgundy"
              visualPosition="right"
              visualLabel="Temporal Engineering & Resampling"
              visual={
                <div className="flex h-full w-full flex-col justify-between space-y-6">
                  {/* Chart with progressive accent opacity */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)]">
                      <span className="flex items-center gap-1.5 font-semibold text-[var(--theme-text)]">
                        <LineChart
                          className="h-3.5 w-3.5 text-[var(--theme-accent)]"
                          aria-hidden="true"
                        />
                        Temporal Features
                      </span>
                      <span className="text-[var(--theme-text-muted)]">Rolling Windows</span>
                    </div>

                    <div className="flex h-20 items-end gap-1.5 sm:gap-2.5 pt-2" aria-hidden="true">
                      {[
                        { val: 32, op: 0.42 },
                        { val: 45, op: 0.46 },
                        { val: 28, op: 0.50 },
                        { val: 60, op: 0.56 },
                        { val: 52, op: 0.62 },
                        { val: 74, op: 0.68 },
                        { val: 68, op: 0.74 },
                        { val: 85, op: 0.80 },
                        { val: 78, op: 0.86 },
                        { val: 92, op: 0.92 },
                        { val: 88, op: 0.96 },
                        { val: 100, op: 1.0 },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t transition-all duration-300 hover:brightness-125"
                          style={{
                            height: `${item.val}%`,
                            backgroundColor: 'var(--theme-accent)',
                            opacity: item.op,
                          }}
                          title={`Month ${index + 1}: ${item.val}%`}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between font-mono text-[9px] text-[var(--theme-text-muted)] pt-1 border-t border-[var(--theme-border)]/50">
                      <span>M01 (Baseline)</span>
                      <span>M06 (Mid)</span>
                      <span>M12 (Peak Trend)</span>
                    </div>
                  </div>

                  {/* Checklist items integrated inside same surface */}
                  <div className="border-t border-[var(--theme-border)]/60 pt-4">
                    <CheckList
                      accent="burgundy"
                      items={[
                        'Resampled daily sales into monthly observations and calculated moving averages.',
                        'Engineered lag features for subsequent forecasting models.',
                      ]}
                    />
                  </div>
                </div>
              }
            />

            {/* 02 — CREDIT RISK ANALYTICS */}
            <EditorialProjectRow
              projectNumber="02"
              category="Machine Learning"
              categoryIcon={Users}
              title="Credit Risk Analytics"
              subtitle="Semester 4 • Group Academic Project"
              tags={[
                'Python',
                'Pandas',
                'Scikit-learn',
                'EDA',
                'Regression',
                'Logistic',
                'PCA',
              ]}
              description="Analyzed credit-risk data using exploratory analysis, descriptive statistics, regression, classification, and dimensionality reduction to investigate financial and credit-related patterns."
              actionLabel="View Case Study"
              onAction={() => openCreditRisk('overview')}
              secondaryActionLabel="Workflow"
              onSecondaryAction={() => openCreditRisk('workflow')}
              liveDemoUrl={LIVE_DEMOS.creditRisk}
              accent="burgundy"
              visualPosition="left"
              visualLabel="Classifier & PCA Pipeline"
              visual={
                <div className="flex h-full w-full flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <MetricBox label="Dataset" value="cs-training.csv" />
                      <MetricBox label="Course Instructor" value="Sir Ali Usama" />
                    </div>

                    <div className="rounded-xl border border-[var(--theme-border)]/80 bg-[var(--theme-background-soft)]/60 p-4 space-y-3">
                      <div className="flex items-center justify-between font-mono text-[10px] text-[var(--theme-text-muted)]">
                        <span>Model Benchmark</span>
                        <span className="font-bold text-[var(--theme-accent)]">ROC-AUC: 0.884</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-[11px] font-mono mb-1">
                            <span className="text-[var(--theme-text-secondary)]">Test Accuracy</span>
                            <span className="font-bold text-[var(--theme-text)]">84.7%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-[var(--theme-border)] overflow-hidden">
                            <div className="h-full bg-[var(--theme-accent)] rounded-full" style={{ width: '84.7%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[11px] font-mono mb-1">
                            <span className="text-[var(--theme-text-secondary)]">Recall Rate</span>
                            <span className="font-bold text-[var(--theme-text)]">86.3%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-[var(--theme-border)] overflow-hidden">
                            <div className="h-full bg-[var(--theme-accent)]/70 rounded-full" style={{ width: '86.3%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[var(--theme-border)]/60 pt-4">
                    <CheckList
                      accent="burgundy"
                      items={[
                        'Applied logistic regression to the SeriousDlqin2yrs target.',
                        'Standardized features before PCA with variance-retention analysis.',
                      ]}
                    />
                  </div>
                </div>
              }
            />

            {/* 03 — DIVERSIFIED PORTFOLIO ANALYSIS */}
            <EditorialProjectRow
              projectNumber="03"
              category="Financial Analytics"
              categoryIcon={TrendingUp}
              title="Diversified Portfolio Analysis Using Historical Market Data"
              subtitle="Semester 4 • Financial Management"
              tags={['Portfolio Analysis', 'Beta', 'CAPM', 'SML', 'KSE-100']}
              description="Analyzed historical market data to examine stock returns, volatility, systematic risk, portfolio composition, CAPM-based required returns, and Security Market Line relationships."
              actionLabel="View Financial Analysis"
              onAction={() => openFinancial('overview')}
              secondaryActionLabel="CAPM & SML"
              onSecondaryAction={() => openFinancial('capm-sml')}
              liveDemoUrl={LIVE_DEMOS.portfolio}
              accent="gold"
              visualPosition="right"
              visualLabel="CAPM & Beta Benchmarking"
              visual={
                <div className="flex h-full w-full flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="rounded-xl border border-[var(--theme-border)]/80 bg-[var(--theme-background-soft)]/60 p-4">
                      <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-wide text-[var(--theme-text-muted)] font-semibold">
                        Equities &amp; Benchmark Selection
                      </span>

                      <div className="flex flex-wrap gap-1.5">
                        {[
                          'Fauji Fertilizer',
                          'Lucky Cement',
                          'Pakistan Petroleum',
                          'Habib Bank',
                          'KSE-100',
                        ].map((company) => (
                          <span
                            key={company}
                            className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-surface)] px-2.5 py-1 text-[10px] font-mono text-[var(--theme-text)] shadow-xs"
                          >
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <MetricBox label="Portfolio Beta" value="β = 0.9585" tone="gold" />
                      <MetricBox
                        label="CAPM Required Return"
                        value="24.3373%"
                        tone="gold"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[var(--theme-border)]/60 pt-4">
                    <p className="font-mono text-[11px] leading-relaxed text-[var(--theme-text-muted)]">
                      Systematic risk ($\beta$) estimated against KSE-100 benchmark index with historical return-covariance matrix optimization.
                    </p>
                  </div>
                </div>
              }
            />

            {/* 04 — E-COMMERCE DATABASE DESIGN */}
            <EditorialProjectRow
              projectNumber="04"
              category="Database Systems"
              categoryIcon={Database}
              title="E-Commerce Database Design & Normalization"
              subtitle="Semester 3 • Individual Project"
              tags={[
                '1NF · 2NF · 3NF',
                '19 Entities',
                'ERD Modeling',
                'Relational Design',
              ]}
              description="Designed and normalized a relational e-commerce database covering customer management, products, inventory, orders, payments, shipment logistics, and supporting lookup entities."
              actionLabel="View Database Design"
              onAction={() => openEcommerce('overview')}
              secondaryActionLabel="19 Entities"
              onSecondaryAction={() => openEcommerce('entities')}
              liveDemoUrl={LIVE_DEMOS.ecommerce}
              accent="burgundy"
              featured
              visualPosition="left"
              visualLabel="Relational Schema & 3NF Normalization"
              visual={
                <div className="flex h-full w-full flex-col justify-between space-y-6">
                  <div className="grid grid-cols-2 gap-3">
                    <MetricBox
                      label="Schema Transformation"
                      value="9 Tables → 19 Entities"
                    />
                    <MetricBox
                      label="Normalization"
                      value="1NF · 2NF · 3NF"
                      tone="burgundy"
                    />
                  </div>

                  <div className="border-t border-[var(--theme-border)]/60 pt-4">
                    <CheckList
                      accent="burgundy"
                      items={[
                        'Resolved repeating groups, partial dependencies, and transitive dependencies.',
                        'Structured lookup entities for payment methods, statuses, carriers, and service levels.',
                      ]}
                    />
                  </div>
                </div>
              }
            />

            {/* 05 — FINANCIAL RATIO ANALYSIS */}
            <EditorialProjectRow
              projectNumber="05"
              category="Corporate Finance"
              categoryIcon={BarChart3}
              title="Financial Ratio Analysis — OGDC, PPL & MARI"
              subtitle="Business Finance • FY 2021–2025"
              tags={[
                'DuPont Analysis',
                '5-Year Trends',
                'Common-Size',
                'Risk Analysis',
                'Valuation',
              ]}
              description="Five-year comparative financial analysis covering profitability, liquidity, solvency, operating efficiency, DuPont decomposition, risk, and valuation frameworks."
              actionLabel="View Ratio Analysis"
              onAction={() => openFinancialRatio('overview')}
              secondaryActionLabel="DuPont"
              onSecondaryAction={() => openFinancialRatio('dupont')}
              liveDemoUrl={LIVE_DEMOS.financialRatio}
              accent="gold"
              featured
              visualPosition="right"
              visualLabel="Five-Year DuPont Decomposition"
              visual={
                <div className="flex h-full w-full flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="rounded-xl border border-[var(--theme-border)]/80 bg-[var(--theme-background-soft)]/60 p-4">
                      <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-wide text-[var(--theme-text-muted)] font-semibold">
                        Companies Analyzed (E&amp;P Sector)
                      </span>

                      <div className="flex flex-wrap gap-4 font-mono text-[11px] font-semibold">
                        <CompanyDot color="blue" label="OGDC" />
                        <CompanyDot color="green" label="PPL" />
                        <CompanyDot color="gold" label="MARI" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <MetricBox label="OGDC Snapshot" value="PKR 401B / CR 8.97x" />
                      <MetricBox
                        label="MARI Snapshot"
                        value="23.87% ROE / 15.4% ROA"
                        tone="gold"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[var(--theme-border)]/60 pt-4">
                    <p className="font-mono text-[11px] leading-relaxed text-[var(--theme-text-muted)]">
                      3-Stage and 5-Stage DuPont identity analysis isolating net profit margins, total asset turnover, and equity multipliers.
                    </p>
                  </div>
                </div>
              }
            />
          </div>

          {/* INTEGRITY NOTE */}
          <div className="mt-14 flex items-start gap-3.5 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 text-xs shadow-sm">
            <Layers
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--theme-accent)]"
              aria-hidden="true"
            />

            <p className="leading-relaxed text-[var(--theme-text-muted)] text-xs sm:text-sm">
              <strong className="font-semibold text-[var(--theme-text)]">
                Academic scope:
              </strong>{' '}
              Project descriptions represent coursework and academic
              exercises. Results and metrics shown in the case studies should
              be interpreted within the assumptions, datasets, and methodology
              used for each assignment.
            </p>
          </div>

          {/* Page Navigation */}
          <PageNavigation
            prev={{ label: 'Skills & Toolkit', path: '/skills' }}
            next={{ label: 'Experience & Practicum', path: '/experience' }}
          />
        </div>
      </div>

      {/* =============================================================
          LAZY-LOADED CASE STUDY MODALS WITH SUSPENSE FALLBACK
      ============================================================= */}
      <Suspense
        fallback={
          <div
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs"
          >
            <div className="flex items-center gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-5 py-3 text-xs font-mono text-[var(--theme-text)] shadow-xl">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--theme-accent)] border-t-transparent" />
              Loading case study...
            </div>
          </div>
        }
      >
        {isCreditRiskModalOpen && creditRiskProject && (
          <CreditRiskCaseStudyModal
            isOpen={isCreditRiskModalOpen}
            onClose={() => setIsCreditRiskModalOpen(false)}
            project={creditRiskProject}
            initialTab={selectedCreditRiskTab}
          />
        )}

        {isTimeSeriesModalOpen && timeSeriesProject && (
          <TimeSeriesCaseStudyModal
            isOpen={isTimeSeriesModalOpen}
            onClose={() => setIsTimeSeriesModalOpen(false)}
            project={timeSeriesProject}
          />
        )}

        {isFinancialModalOpen && financialProject && (
          <FinancialPortfolioCaseStudyModal
            isOpen={isFinancialModalOpen}
            onClose={() => setIsFinancialModalOpen(false)}
            project={financialProject}
            initialTab={selectedFinancialTab}
          />
        )}

        {isEcommerceModalOpen && ecommerceProject && (
          <EcommerceDatabaseCaseStudyModal
            isOpen={isEcommerceModalOpen}
            onClose={() => setIsEcommerceModalOpen(false)}
            project={ecommerceProject}
            initialTab={selectedEcommerceTab}
          />
        )}

        {isFinancialRatioModalOpen && financialRatioProject && (
          <FinancialRatioCaseStudyModal
            isOpen={isFinancialRatioModalOpen}
            onClose={() => setIsFinancialRatioModalOpen(false)}
            project={financialRatioProject}
            initialTab={selectedFinancialRatioTab}
          />
        )}
      </Suspense>
    </>
  );
};

/* =============================================================
   EDITORIAL PROJECT ROW COMPONENT
   Alternates visual and text sides on desktop.
   Stacks mobile: number, visual, title, metadata, description, CTAs.
   Hover (fine-pointer only): slight visual scale, translate,
   border brightening to accent, and animated arrow.
============================================================= */

interface EditorialProjectRowProps {
  projectNumber: string;
  category: string;
  categoryIcon: React.ElementType;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  footer?: string;

  actionLabel: string;
  onAction: () => void;

  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;

  liveDemoUrl?: string;

  accent?: Accent;
  featured?: boolean;
  visualPosition?: 'left' | 'right';
  visualLabel?: string;
  visual: React.ReactNode;
}

const EditorialProjectRow: React.FC<EditorialProjectRowProps> = ({
  projectNumber,
  category,
  categoryIcon: CategoryIcon,
  title,
  subtitle,
  tags,
  description,
  footer,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  liveDemoUrl,
  featured = false,
  visualPosition = 'right',
  visualLabel,
  visual,
}) => {
  const rowRef = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const hasDemo = Boolean(liveDemoUrl);
  const isRight = visualPosition === 'right';

  return (
    <div
      ref={rowRef}
      id={`project-${projectNumber}`}
      className="project-row reveal group py-14 sm:py-20 lg:py-24 transition-colors duration-300 scroll-mt-28 border-x-0"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14 lg:items-stretch">
        {/* ================= MOBILE NUMBER & CATEGORY (Shown only on small screens) ================= */}
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--theme-accent)] tracking-wider lg:hidden">
          <span>{projectNumber}</span>
          <span className="opacity-40" aria-hidden="true">/</span>
          <span>{category}</span>
          {featured && (
            <span className="ml-2 rounded-full border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--theme-accent)]">
              Featured
            </span>
          )}
        </div>

        {/* ================= VISUAL AREA (ONE unified bordered surface) ================= */}
        <div
          className={`
            w-full flex
            ${isRight ? 'lg:col-span-6 lg:order-2' : 'lg:col-span-6 lg:order-1'}
          `}
        >
          <div className="visual-mask w-full flex">
            <div
              className="
                project-visual-surface
                relative
                flex
                w-full
                flex-col
                justify-between
                rounded-2xl
                border
                border-[var(--theme-border)]
                bg-[var(--theme-surface)]
                p-6
                sm:p-7
                shadow-sm
                transition-all
                duration-300
                ease-out
                min-h-[340px]
              "
            >
              {/* Clean non-colliding inner header label */}
              <div className="mb-4 flex items-center justify-between pb-3 border-b border-[var(--theme-border)]/60">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)] font-semibold">
                  <CategoryIcon className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
                  <span>{visualLabel || category}</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-[var(--theme-accent)]">
                  P0{projectNumber}
                </span>
              </div>

              {visual}
            </div>
          </div>
        </div>

        {/* ================= TEXT CONTENT COLUMN ================= */}
        <div
          className={`
            flex
            flex-col
            justify-between
            space-y-4
            sm:space-y-5
            ${isRight ? 'lg:col-span-6 lg:order-1 lg:pr-4' : 'lg:col-span-6 lg:order-2 lg:pl-4'}
          `}
        >
          <div className="space-y-3.5">
            {/* Desktop Project Number & Category line directly above title */}
            <div className="hidden items-center gap-2 font-mono text-xs sm:text-sm font-semibold text-[var(--theme-accent)] tracking-wider lg:flex">
              <span>{projectNumber}</span>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span>{category}</span>
              {featured && (
                <span className="ml-2 rounded-full border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--theme-accent)]">
                  Featured
                </span>
              )}
            </div>

            {/* Project Title in Newsreader Display Serif */}
            <h3 className="project-title-shift font-display text-2xl font-normal leading-tight tracking-tight text-[var(--theme-text)] sm:text-3xl lg:text-4xl transition-transform duration-200">
              {title}
            </h3>

            {/* One quiet monospace metadata line */}
            <p className="font-mono text-[11px] sm:text-xs text-[var(--theme-text-muted)] flex items-center flex-wrap gap-2">
              <span className="font-medium">{subtitle}</span>
              {footer && (
                <>
                  <span className="opacity-40" aria-hidden="true">•</span>
                  <span>{footer}</span>
                </>
              )}
            </p>

            {/* Description (~17px, higher contrast, max-w 68ch) */}
            <p className="max-w-[68ch] font-body text-[16px] sm:text-[17px] leading-relaxed text-[var(--theme-text)]/90 pt-1">
              {description}
            </p>

            {/* Technology Badges (smaller and lighter with reduced contrast) */}
            <ul
              className="flex flex-wrap gap-1.5 pt-2"
              aria-label="Technologies and topics"
            >
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center rounded-md border border-[var(--theme-border)]/40 bg-[var(--theme-surface)]/60 px-2.5 py-0.5 font-mono text-[11px] text-[var(--theme-text-secondary)] transition-colors hover:border-[var(--theme-border)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons (44px height, tighter 8-10px radius, no drop shadow) */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            {/* Live Demo Button: Filled Accent Primary */}
            {hasDemo ? (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo: ${title}`}
                className="
                  btn-accent-primary
                  inline-flex
                  min-h-[44px]
                  items-center
                  justify-center
                  gap-2
                  rounded-[9px]
                  px-5
                  py-2.5
                  text-xs
                  font-semibold
                  shadow-none
                  transition-all
                  duration-200
                  hover:brightness-110
                  active:scale-[0.98]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--theme-accent)]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[var(--theme-background)]
                "
              >
                <span>Live Demo</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-90" aria-hidden="true" />
              </a>
            ) : (
              <span
                role="link"
                aria-disabled="true"
                title="Live demo will be added soon"
                className="
                  inline-flex
                  min-h-[44px]
                  cursor-not-allowed
                  items-center
                  gap-2
                  rounded-[9px]
                  border
                  border-dashed
                  border-[var(--theme-border)]
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-[var(--theme-text-muted)]
                  opacity-60
                "
              >
                Demo coming soon
              </span>
            )}

            {/* Optional Secondary Action Button */}
            {secondaryActionLabel && onSecondaryAction && (
              <button
                type="button"
                onClick={onSecondaryAction}
                className="
                  inline-flex
                  min-h-[44px]
                  cursor-pointer
                  items-center
                  gap-1.5
                  rounded-[9px]
                  border
                  border-[var(--theme-border)]
                  bg-transparent
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-[var(--theme-text-secondary)]
                  shadow-none
                  transition-all
                  duration-200
                  hover:border-[var(--theme-accent)]/50
                  hover:text-[var(--theme-text)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--theme-accent)]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[var(--theme-background)]
                "
              >
                {secondaryActionLabel}
              </button>
            )}

            {/* View Case Study Button: Outline Secondary with animated arrow */}
            <button
              type="button"
              onClick={onAction}
              className="
                group/btn
                inline-flex
                min-h-[44px]
                cursor-pointer
                items-center
                justify-center
                gap-2
                rounded-[9px]
                border
                border-[var(--theme-border)]
                bg-[var(--theme-surface)]
                px-5
                py-2.5
                text-xs
                font-semibold
                text-[var(--theme-text)]
                shadow-none
                transition-all
                duration-200
                hover:border-[var(--theme-accent)]/70
                hover:bg-[var(--theme-background-soft)]
                active:scale-[0.98]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--theme-accent)]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--theme-background)]
              "
            >
              <span>{actionLabel}</span>
              <ArrowRight
                className="project-arrow-shift h-3.5 w-3.5 text-[var(--theme-accent)] transition-transform duration-200 group-hover/btn:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =============================================================
   REUSABLE SUPPORTING COMPONENTS
============================================================= */

interface CheckListProps {
  items: string[];
  accent?: Accent;
}

const CheckList: React.FC<CheckListProps> = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li
        key={item}
        className="flex items-start gap-2 text-xs leading-relaxed text-[var(--theme-text-secondary)]"
      >
        <CheckCircle2
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-accent)]"
          aria-hidden="true"
        />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

interface OverviewPillProps {
  number: string;
  label: string;
  detail: string;
  accent?: Accent;
}

const OverviewPill: React.FC<OverviewPillProps> = ({
  number,
  label,
  detail,
}) => (
  <div className="min-w-0 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-3">
    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--theme-accent)]">
      {number}
    </span>

    <span className="mt-0.5 block truncate text-xs font-semibold text-[var(--theme-text)]">
      {label}
    </span>

    <span className="block truncate font-mono text-[9px] text-[var(--theme-text-muted)]">
      {detail}
    </span>
  </div>
);

interface MetricBoxProps {
  label: string;
  value: string;
  tone?: 'default' | 'burgundy' | 'gold';
}

const MetricBox: React.FC<MetricBoxProps> = ({
  label,
  value,
  tone = 'default',
}) => {
  const isHighlighted = tone === 'burgundy' || tone === 'gold';

  return (
    <div
      className={`min-w-0 rounded-xl border p-3 ${
        isHighlighted
          ? 'border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/5'
          : 'border-[var(--theme-border)] bg-[var(--theme-background-soft)]'
      }`}
    >
      <span className="block font-mono text-[10px] text-[var(--theme-text-muted)]">
        {label}
      </span>

      <span
        title={value}
        className={`mt-0.5 block truncate font-mono text-xs font-bold ${
          isHighlighted ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text)]'
        }`}
      >
        {value}
      </span>
    </div>
  );
};

interface CompanyDotProps {
  color: 'blue' | 'green' | 'gold';
  label: string;
}

const CompanyDot: React.FC<CompanyDotProps> = ({ color, label }) => {
  const dotColor = {
    blue: 'bg-blue-400',
    green: 'bg-emerald-400',
    gold: 'bg-[var(--theme-accent)]',
  };

  return (
    <span className="flex items-center gap-1.5 text-[var(--theme-text)]">
      <span className={`h-2 w-2 rounded-full ${dotColor[color]}`} aria-hidden="true" />
      {label}
    </span>
  );
};

export default ProjectsSection;
