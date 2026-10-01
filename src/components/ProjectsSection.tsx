import React, { useState } from 'react';
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
import { CreditRiskCaseStudyModal } from '../components/CreditRiskCaseStudyModal';
import { TimeSeriesCaseStudyModal } from '../components/TimeSeriesCaseStudyModal';
import { FinancialPortfolioCaseStudyModal } from '../components/FinancialPortfolioCaseStudyModal';
import { EcommerceDatabaseCaseStudyModal } from '../components/EcommerceDatabaseCaseStudyModal';
import { FinancialRatioCaseStudyModal } from '../components/FinancialRatioCaseStudyModal';

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
   LIVE DEMO LINKS
   Paste the real link for each project below. An empty string
   shows a disabled "Demo coming soon" button instead.
============================================================= */
const LIVE_DEMOS = {
  timeSeries: 'https://sales-forecasting-intelligence.vercel.app/', 
  creditRisk: 'https://credit-risk-app-live-demo.streamlit.app/',
  portfolio: 'https://portfolio-analysis-live-demo2.ai.studio',
  ecommerce: 'https://e-commerce-database-design-109.vercel.app/',
  financialRatio: 'https://financial-analysis-dashboard-109.streamlit.app/',
} as const;

const cardBase =
  'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[var(--color-surface)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-burgundy)] dark:bg-[var(--color-dark-surface)]';

const mutedPanel =
  'rounded-xl border border-[var(--color-border)] bg-[var(--color-background-soft)] dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-background)]';

const checkItem =
  'flex items-start gap-2 text-[11px] leading-relaxed text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]';

const accentText: Record<Accent, string> = {
  burgundy:
    'text-[var(--color-burgundy)] dark:text-[var(--color-burgundy-light)]',
  gold: 'text-[var(--color-gold)]',
};

const accentBorder: Record<Accent, string> = {
  burgundy: 'border-[var(--color-burgundy)]/20',
  gold: 'border-[var(--color-gold)]/30',
};

const accentTag: Record<Accent, string> = {
  burgundy:
    'border-[var(--color-burgundy)]/20 bg-[var(--color-burgundy)]/5 text-[var(--color-burgundy)] dark:text-[var(--color-burgundy-light)]',
  gold: 'border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 text-[var(--color-gold)]',
};

const tagsBase =
  'inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-medium tracking-wide transition-colors';

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
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="relative border-t border-[var(--color-border-light)] bg-[var(--color-background-soft)] py-20 dark:border-[var(--color-dark-border-light)] dark:bg-[var(--color-dark-background-soft)] sm:py-24"
      >
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-[var(--color-burgundy)]/5 blur-3xl dark:bg-[var(--color-burgundy)]/10" />
          <div className="absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-[var(--color-gold)]/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <header className="mb-12 max-w-4xl">
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-burgundy)] dark:text-[var(--color-burgundy-light)]">
              <FolderKanban className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Academic Work &amp; Coursework</span>
            </div>

            <h2
              id="projects-heading"
              className="text-3xl font-bold tracking-tight text-[var(--color-text)] dark:text-[var(--color-dark-text)] sm:text-4xl"
            >
              Academic Projects
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] sm:text-base">
              Applied coursework spanning business finance, database systems,
              business data analysis, machine learning, and financial
              management. Each project demonstrates a structured approach to
              data preparation, analytical modeling, financial interpretation,
              and technical documentation.
            </p>
          </header>

          {/* COURSEWORK OVERVIEW */}
          <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)] dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]">
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-gold)]">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    Coursework Portfolio
                  </div>

                  <h3 className="text-sm font-bold text-[var(--color-text)] dark:text-[var(--color-dark-text)] sm:text-base">
                    Five analytical pillars across finance, data, modeling,
                    databases, and business intelligence.
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
                    Academic projects completed as part of university
                    coursework, presented with supporting case-study views.
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

          {/* PROJECT GRID */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {/* 01 — TIME SERIES */}
            <ProjectCard
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
            >
              <div className={mutedPanel + ' p-3'}>
                <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wide text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <LineChart
                      className="h-3.5 w-3.5 text-[var(--color-burgundy)]"
                      aria-hidden="true"
                    />
                    Temporal Features
                  </span>
                  <span>Rolling Windows</span>
                </div>

                <div className="flex h-10 items-end gap-1" aria-hidden="true">
                  {[32, 45, 28, 60, 52, 74, 68, 85, 78, 92, 88, 100].map(
                    (value, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t bg-[var(--color-burgundy)]/25 transition-all duration-300 group-hover:bg-[var(--color-burgundy)]/40"
                        style={{ height: `${(value / 100) * 32}px` }}
                      />
                    ),
                  )}
                </div>
              </div>

              <CheckList
                accent="burgundy"
                items={[
                  'Resampled daily sales into monthly observations and calculated moving averages.',
                  'Engineered lag features for subsequent forecasting models.',
                ]}
              />
            </ProjectCard>

            {/* 02 — CREDIT RISK */}
            <ProjectCard
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
            >
              <div className="grid grid-cols-2 gap-2">
                <MetricBox label="Dataset" value="cs-training.csv" />
                <MetricBox label="Course Instructor" value="Sir Ali Usama" />
              </div>

              <CheckList
                accent="burgundy"
                items={[
                  'Applied logistic regression to the SeriousDlqin2yrs target.',
                  'Standardized features before PCA with variance-retention analysis.',
                ]}
              />
            </ProjectCard>

            {/* 03 — FINANCIAL PORTFOLIO */}
            <ProjectCard
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
            >
              <div className={mutedPanel + ' p-3'}>
                <span className="mb-2 block font-mono text-[9px] uppercase tracking-wide text-[var(--color-text-muted)]">
                  Equities &amp; Benchmark
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
                      className="rounded-md bg-[var(--color-surface)] px-2 py-1 text-[9px] font-medium text-[var(--color-text-secondary)] shadow-sm dark:bg-[var(--color-dark-surface)] dark:text-[var(--color-dark-text-secondary)]"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <MetricBox label="Portfolio Beta" value="β = 0.9585" tone="gold" />
                <MetricBox
                  label="CAPM Required Return"
                  value="24.3373%"
                  tone="gold"
                />
              </div>
            </ProjectCard>

            {/* 04 — DATABASE */}
            <ProjectCard
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
            >
              <div className="grid grid-cols-2 gap-2">
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

              <CheckList
                accent="burgundy"
                items={[
                  'Resolved repeating groups, partial dependencies, and transitive dependencies.',
                  'Structured lookup entities for payment methods, statuses, carriers, and service levels.',
                ]}
              />
            </ProjectCard>

            {/* 05 — FINANCIAL RATIOS */}
            <ProjectCard
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
            >
              <div className={mutedPanel + ' p-3'}>
                <span className="mb-2 block font-mono text-[9px] uppercase tracking-wide text-[var(--color-text-muted)]">
                  Companies Analyzed
                </span>

                <div className="flex flex-wrap gap-3 font-mono text-[10px] font-semibold">
                  <CompanyDot color="blue" label="OGDC" />
                  <CompanyDot color="green" label="PPL" />
                  <CompanyDot color="gold" label="MARI" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <MetricBox label="OGDC Snapshot" value="PKR 401B / CR 8.97x" />
                <MetricBox
                  label="MARI Snapshot"
                  value="23.87% ROE / 15.4% ROA"
                  tone="gold"
                />
              </div>
            </ProjectCard>
          </div>

          {/* INTEGRITY NOTE */}
          <div className="mt-10 flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-xs shadow-sm dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]">
            <Layers
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]"
              aria-hidden="true"
            />

            <p className="leading-5 text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
              <strong className="font-semibold text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
                Academic scope:
              </strong>{' '}
              Project descriptions represent coursework and academic
              exercises. Results and metrics shown in the case studies should
              be interpreted within the assumptions, datasets, and methodology
              used for each assignment.
            </p>
          </div>
        </div>
      </section>

      {/* MODALS */}
      {creditRiskProject && (
        <CreditRiskCaseStudyModal
          isOpen={isCreditRiskModalOpen}
          onClose={() => setIsCreditRiskModalOpen(false)}
          project={creditRiskProject}
          initialTab={selectedCreditRiskTab}
        />
      )}

      {timeSeriesProject && (
        <TimeSeriesCaseStudyModal
          isOpen={isTimeSeriesModalOpen}
          onClose={() => setIsTimeSeriesModalOpen(false)}
          project={timeSeriesProject}
        />
      )}

      {financialProject && (
        <FinancialPortfolioCaseStudyModal
          isOpen={isFinancialModalOpen}
          onClose={() => setIsFinancialModalOpen(false)}
          project={financialProject}
          initialTab={selectedFinancialTab}
        />
      )}

      {ecommerceProject && (
        <EcommerceDatabaseCaseStudyModal
          isOpen={isEcommerceModalOpen}
          onClose={() => setIsEcommerceModalOpen(false)}
          project={ecommerceProject}
          initialTab={selectedEcommerceTab}
        />
      )}

      {financialRatioProject && (
        <FinancialRatioCaseStudyModal
          isOpen={isFinancialRatioModalOpen}
          onClose={() => setIsFinancialRatioModalOpen(false)}
          project={financialRatioProject}
          initialTab={selectedFinancialRatioTab}
        />
      )}
    </>
  );
};

/* =============================================================
   REUSABLE COMPONENTS
============================================================= */

interface ProjectCardProps {
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

  /** Empty / undefined renders a disabled "Demo coming soon" button. */
  liveDemoUrl?: string;

  accent?: Accent;
  featured?: boolean;

  children: React.ReactNode;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
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
  accent = 'burgundy',
  featured = false,
  children,
}) => {
  const isGold = accent === 'gold';
  const hasDemo = Boolean(liveDemoUrl);

  const outlineButton = `rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
    isGold
      ? 'border-[var(--color-gold)]/40 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 focus-visible:outline-[var(--color-gold)]'
      : 'border-[var(--color-burgundy)]/25 text-[var(--color-burgundy)] hover:bg-[var(--color-burgundy)]/5 focus-visible:outline-[var(--color-burgundy)] dark:text-[var(--color-burgundy-light)]'
  }`;

  return (
    <article className={`${cardBase} ${accentBorder[accent]}`}>
      {/* Accent bar */}
      <div
        aria-hidden="true"
        className={`h-1 w-full ${
          isGold ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-burgundy)]'
        }`}
      />

      {/* Header */}
      <div className="border-b border-[var(--color-border-light)] p-5 dark:border-[var(--color-dark-border-light)]">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div
            className={`flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${accentText[accent]}`}
          >
            <CategoryIcon className="h-4 w-4" aria-hidden="true" />
            <span>{category}</span>
          </div>

          <div className="flex items-center gap-2">
            {featured && (
              <span
                className={`rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide ${accentTag[accent]}`}
              >
                Featured
              </span>
            )}
            <span className="font-mono text-[11px] font-bold text-[var(--color-text-muted)]">
              {projectNumber}
            </span>
          </div>
        </div>

        <h3 className="text-base font-bold leading-snug text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
          {title}
        </h3>

        <p className="mt-1 text-[11px] text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
          {subtitle}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies and topics">
          {tags.map((tag) => (
            <li key={tag} className={`${tagsBase} ${accentTag[accent]}`}>
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-4">
          <p className="text-xs leading-6 text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]">
            {description}
          </p>

          {children}
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-[var(--color-border-light)] pt-4 dark:border-[var(--color-dark-border-light)]">
          {footer && (
            <p className="mb-3 font-mono text-[9px] text-[var(--color-text-muted)]">
              {footer}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {/* Live demo: always present, disabled when no URL */}
            {hasDemo ? (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${title} (opens in a new tab)`}
                className={`inline-flex items-center gap-1.5 ${outlineButton}`}
              >
                Live Demo
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : (
              <span
                role="link"
                aria-disabled="true"
                title="Live demo will be added soon"
                className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-dashed border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-muted)] opacity-70 dark:border-[var(--color-dark-border)]"
              >
                Demo coming soon
              </span>
            )}

            {secondaryActionLabel && onSecondaryAction && (
              <button
                type="button"
                onClick={onSecondaryAction}
                className={outlineButton}
              >
                {secondaryActionLabel}
              </button>
            )}

            <button
              type="button"
              onClick={onAction}
              className={`ml-auto inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                isGold
                  ? 'bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] focus-visible:outline-[var(--color-gold)]'
                  : 'bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-dark)] focus-visible:outline-[var(--color-burgundy)]'
              }`}
            >
              {actionLabel}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

interface CheckListProps {
  items: string[];
  accent?: Accent;
}

const CheckList: React.FC<CheckListProps> = ({ items, accent = 'burgundy' }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className={checkItem}>
        <CheckCircle2
          className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
            accent === 'gold'
              ? 'text-[var(--color-gold)]'
              : 'text-[var(--color-burgundy)]'
          }`}
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
  accent = 'burgundy',
}) => (
  <div className="min-w-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-soft)] p-2.5 dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-background)]">
    <span
      className={`block font-mono text-[9px] font-bold uppercase tracking-wide ${accentText[accent]}`}
    >
      {number}
    </span>

    <span className="mt-0.5 block truncate text-[10px] font-semibold text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
      {label}
    </span>

    <span className="block truncate text-[9px] text-[var(--color-text-muted)]">
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
  const toneClasses = {
    default:
      'border-[var(--color-border)] bg-[var(--color-background-soft)] dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-background)]',
    burgundy: 'border-[var(--color-burgundy)]/20 bg-[var(--color-burgundy)]/5',
    gold: 'border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5',
  };

  const valueClasses = {
    default: 'text-[var(--color-text)] dark:text-[var(--color-dark-text)]',
    burgundy:
      'text-[var(--color-burgundy)] dark:text-[var(--color-burgundy-light)]',
    gold: 'text-[var(--color-gold)]',
  };

  return (
    <div className={`min-w-0 rounded-xl border p-2.5 ${toneClasses[tone]}`}>
      <span className="block font-mono text-[9px] text-[var(--color-text-muted)]">
        {label}
      </span>

      <span
        title={value}
        className={`mt-0.5 block truncate font-mono text-[10px] font-bold ${valueClasses[tone]}`}
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
  const dot = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    gold: 'bg-[var(--color-gold)]',
  };
  const text = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-emerald-600 dark:text-emerald-400',
    gold: 'text-[var(--color-gold)]',
  };

  return (
    <span className={`flex items-center gap-1.5 ${text[color]}`}>
      <span className={`h-2 w-2 rounded-full ${dot[color]}`} aria-hidden="true" />
      {label}
    </span>
  );
};