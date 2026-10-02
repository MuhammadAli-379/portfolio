import React, { useState, useEffect } from 'react';
import {
  Users,
  Database,
  BrainCircuit,
  CheckCircle2,
  Layers,
  Activity,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Binary,
  AlertCircle,
  ShieldCheck,
  BookOpen,
  UserCheck,
  TrendingUp,
  LineChart,
  Grid,
} from 'lucide-react';
import { AcademicProject } from '../types/portfolio';
import { CaseStudyModalShell } from './CaseStudyModalShell';

interface CreditRiskCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: AcademicProject;
  initialTab?: 'overview' | 'workflow' | 'models' | 'outcomes';
}

const LIVE_DEMO_URL = 'https://credit-risk-app-live-demo.streamlit.app/';

export const CreditRiskCaseStudyModal: React.FC<CreditRiskCaseStudyModalProps> = ({
  isOpen,
  onClose,
  project,
  initialTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'models' | 'outcomes'>(initialTab);
  const [expandedStep, setExpandedStep] = useState<number>(1);
  const [activeConfusionQuadrant, setActiveConfusionQuadrant] = useState<'tp' | 'tn' | 'fp' | 'fn'>('tp');

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  const visualJourneySteps = [
    { num: '01', label: 'Dataset', stepIdx: 1 },
    { num: '02', label: 'Cleaning', stepIdx: 2 },
    { num: '03', label: 'Statistics', stepIdx: 3 },
    { num: '04', label: 'Outliers', stepIdx: 4 },
    { num: '05', label: 'Visualization', stepIdx: 5 },
    { num: '06', label: 'Feature Prep', stepIdx: 6 },
    { num: '07', label: 'Regression', stepIdx: 7 },
    { num: '08', label: 'Classification', stepIdx: 8 },
    { num: '09', label: 'PCA', stepIdx: 9 },
    { num: '10', label: 'Evaluation', stepIdx: 10 },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview, Team & Problem' },
    {
      id: 'workflow',
      label: (
        <span className="inline-flex items-center gap-1.5">
          <span>10-Step Technical Workflow</span>
          <span className="rounded bg-[var(--theme-accent)]/15 px-1.5 py-0.5 font-mono text-[10px] text-[var(--theme-accent)] font-semibold">
            10 Steps
          </span>
        </span>
      ),
    },
    { id: 'models', label: 'ML Models, PCA & Confusion Matrix' },
    { id: 'outcomes', label: 'What I Learned & Perspective' },
  ];

  // Pipeline subheader tracker
  const pipelineSubHeader = (
    <div className="no-scrollbar overflow-x-auto px-4 py-2.5 sm:px-6">
      <div className="flex min-w-max items-center gap-1.5 font-mono text-[11px]">
        <span className="mr-2 flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-widest text-[var(--theme-text-muted)] font-semibold">
          <Activity className="h-3 w-3 text-[var(--theme-accent)]" aria-hidden="true" />
          Pipeline:
        </span>
        {visualJourneySteps.map((step, idx) => (
          <React.Fragment key={step.num}>
            <button
              type="button"
              onClick={() => {
                setActiveTab('workflow');
                setExpandedStep(step.stepIdx);
              }}
              className={`
                flex items-center gap-1 rounded-md px-2.5 py-1 transition-colors text-[11px] font-mono cursor-pointer
                ${
                  activeTab === 'workflow' && expandedStep === step.stepIdx
                    ? 'btn-accent-primary font-bold'
                    : 'bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)]/60 hover:text-[var(--theme-text)]'
                }
              `}
            >
              <span className="opacity-70 text-[9px]">{step.num}</span>
              <span>{step.label}</span>
            </button>
            {idx < visualJourneySteps.length - 1 && (
              <span className="text-[var(--theme-border)] font-normal px-0.5" aria-hidden="true">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <CaseStudyModalShell
      isOpen={isOpen}
      onClose={onClose}
      projectNumber="02"
      category="Machine Learning"
      title={project.title}
      subtitle={project.semesterTag || 'Semester 4 • Group Academic Project'}
      metadataText={`Course: ${project.courseName || 'Business Data Analysis'} • Instructor: ${project.instructor || 'Sir Ali Usama'}`}
      liveDemoUrl={LIVE_DEMO_URL}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as any)}
      subHeader={pipelineSubHeader}
    >
      {/* ================= TAB 1: OVERVIEW ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-5 sm:p-6 space-y-3">
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--theme-accent)]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Project Executive Summary
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-normal text-[var(--theme-text)]">
              Credit Risk Diagnostics &amp; Classifier Modeling
            </h3>
            <p className="max-w-[70ch] font-body text-[16px] sm:text-[17px] leading-relaxed text-[var(--theme-text)]/90">
              Credit Risk Analytics is a group academic project completed for the
              Business Data Analysis course at COMSATS University Islamabad. The
              project explored a credit-risk dataset through data loading and
              cleaning, missing-value handling, descriptive statistics, outlier
              analysis, visualization, regression modelling, logistic
              classification, dimensionality reduction using PCA, and
              confusion-matrix evaluation.
            </p>
            <p className="max-w-[70ch] font-body text-xs sm:text-sm leading-relaxed text-[var(--theme-text-secondary)]">
              The project provided practical experience in preparing structured
              financial data for analysis and applying statistical and
              machine-learning techniques to a credit-risk problem.
            </p>
            <div className="flex items-center gap-1.5 pt-2 font-mono text-[11px] text-[var(--theme-accent)]">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                Academic Coursework Notice: Conducted strictly as academic coursework at COMSATS University Islamabad.
              </span>
            </div>
          </div>

          {/* Business Problem */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-3">
            <h3 className="flex items-center gap-2 font-display text-lg font-normal text-[var(--theme-text)]">
              <BookOpen className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
              Business Problem &amp; Risk Context
            </h3>
            <p className="max-w-[70ch] font-body text-[16px] sm:text-[17px] leading-relaxed text-[var(--theme-text)]/90">
              {project.businessProblem}
            </p>
            <p className="font-mono text-xs text-[var(--theme-text-muted)]">
              Analysis context: Purely academic investigation of risk factors using statistical methods and machine learning pipelines.
            </p>
          </div>

          {/* Dataset Specifications */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-display text-lg font-normal text-[var(--theme-text)]">
                <Database className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
                Dataset: {project.dataset?.datasetName || 'GiveMeSomeCredit'}
              </h3>
              <span className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-background-soft)] px-2.5 py-1 font-mono text-xs text-[var(--theme-text)]">
                {project.dataset?.filename || 'cs-training.csv'}
              </span>
            </div>
            <p className="max-w-[70ch] font-body text-xs sm:text-sm leading-relaxed text-[var(--theme-text-secondary)]">
              {project.dataset?.description}
            </p>
            <div className="grid grid-cols-1 gap-3 pt-2 text-xs sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/60 p-3.5 space-y-1">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)]">
                  Target Variable
                </span>
                <span className="block font-mono font-bold text-[var(--theme-text)] text-sm">SeriousDlqin2yrs</span>
                <span className="block text-[11px] text-[var(--theme-text-secondary)] leading-relaxed">
                  Binary classification target (0 = No Delinquency, 1 = Serious Delinquency within 2 years)
                </span>
              </div>
              <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/60 p-3.5 space-y-1">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)]">
                  Academic Integrity Policy
                </span>
                <span className="block font-semibold text-[var(--theme-text)] text-sm">Zero Synthetic Statistics</span>
                <span className="block text-[11px] text-[var(--theme-text-secondary)] leading-relaxed">
                  No invented customer counts, commercial revenues, real-world clients, or artificial accuracy scores are published.
                </span>
              </div>
            </div>
          </div>

          {/* Project Team */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col justify-between gap-2 border-b border-[var(--theme-border)] pb-3 sm:flex-row sm:items-center">
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                  Collaborative Academic Group Project
                </span>
                <h3 className="mt-0.5 flex items-center gap-2 font-display text-lg font-normal text-[var(--theme-text)]">
                  <Users className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
                  Project Team
                </h3>
              </div>
              <span className="font-mono text-xs text-[var(--theme-text-muted)]">
                5 Members · Coursework Team
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {project.groupMembers?.map((member) => {
                const isCurrentUser = member.name === 'Muhammad Abubakar';
                return (
                  <div
                    key={member.name}
                    className={`
                      flex items-center justify-between rounded-xl border p-3
                      ${
                        isCurrentUser
                          ? 'border-[var(--theme-accent)]/40 bg-[var(--theme-accent)]/5'
                          : 'border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50'
                      }
                    `}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div
                        className={`
                          flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-mono font-bold
                          ${
                            isCurrentUser
                              ? 'btn-accent-primary'
                              : 'bg-[var(--theme-border)] text-[var(--theme-text-secondary)]'
                          }
                        `}
                      >
                        {member.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <span className="block truncate text-xs font-semibold text-[var(--theme-text)]">
                          {member.name}
                        </span>
                        {project.showRegNumbers && member.regNo ? (
                          <span className="block font-mono text-[10px] text-[var(--theme-text-muted)]">
                            {member.regNo}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {isCurrentUser && (
                      <span className="shrink-0 rounded bg-[var(--theme-accent)]/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--theme-accent)]">
                        You
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-1.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/40 p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase text-[var(--theme-accent)]">
                  <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  My Contribution (Muhammad Abubakar)
                </span>
                <span className="font-mono text-[10px] text-[var(--theme-text-muted)]">
                  Editable in Customize Drawer
                </span>
              </div>
              <p className="font-body text-xs sm:text-sm italic leading-relaxed text-[var(--theme-text)]">
                {project.myContribution || 'Add my specific contribution here.'}
              </p>
              <p className="font-mono text-[10px] text-[var(--theme-text-muted)] pt-1">
                Transparent Collaboration Statement: Does not imply that Muhammad Abubakar individually completed every task; this is a collaborative academic group project.
              </p>
            </div>
          </div>

          {/* Project Technologies */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 space-y-2">
            <span className="block font-mono text-xs uppercase tracking-wider text-[var(--theme-text-muted)] font-semibold">
              Project Technologies &amp; Analytical Topics:
            </span>
            <ul className="flex flex-wrap gap-1.5" aria-label="Project technologies">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-[var(--theme-border)]/60 bg-[var(--theme-background-soft)]/60 px-2.5 py-1 font-mono text-[11px] text-[var(--theme-text-secondary)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ================= TAB 2: WORKFLOW ================= */}
      {activeTab === 'workflow' && (
        <div className="space-y-6">
          <div className="flex flex-col justify-between gap-2 border-b border-[var(--theme-border)] pb-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="flex items-center gap-2 font-display text-lg font-normal text-[var(--theme-text)]">
                <Layers className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
                10-Step Analytical Workflow
              </h3>
              <p className="font-mono text-xs text-[var(--theme-text-muted)]">
                Click each step to expand technical details, methods, and rationale.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setExpandedStep(expandedStep === 10 ? 1 : expandedStep + 1)}
              className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 font-mono text-xs text-[var(--theme-accent)] transition-colors hover:bg-[var(--theme-background-soft)] cursor-pointer"
            >
              Next Step →
            </button>
          </div>

          <div className="space-y-3">
            {project.workflowSteps?.map((step, idx) => {
              const stepNum = idx + 1;
              const isExpanded = expandedStep === stepNum;

              return (
                <div
                  key={step.stepNumber}
                  className={`
                    overflow-hidden rounded-xl border transition-all duration-200
                    ${
                      isExpanded
                        ? 'border-[var(--theme-accent)]/50 bg-[var(--theme-surface)]'
                        : 'border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50'
                    }
                  `}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedStep(isExpanded ? 0 : stepNum)}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`
                          flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold
                          ${
                            isExpanded
                              ? 'btn-accent-primary'
                              : 'bg-[var(--theme-border)] text-[var(--theme-text-secondary)]'
                          }
                        `}
                      >
                        {step.stepNumber}
                      </span>
                      <div className="min-w-0">
                        <h4 className="truncate font-display text-base font-normal text-[var(--theme-text)]">
                          {step.title}
                        </h4>
                        <p className="mt-0.5 truncate font-mono text-[11px] text-[var(--theme-text-muted)]">
                          {step.shortSummary}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-[var(--theme-accent)]" aria-hidden="true" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-[var(--theme-text-muted)]" aria-hidden="true" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="space-y-4 border-t border-[var(--theme-border)] px-5 pb-5 pt-3">
                      <div className="space-y-2">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)] font-semibold">
                          Actions Conducted
                        </span>
                        <ul className="space-y-2 text-xs">
                          {step.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-accent)]" aria-hidden="true" />
                              <span className="font-body text-xs sm:text-sm leading-relaxed text-[var(--theme-text)]/90">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {step.rationale && (
                        <div className="rounded-lg border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/5 p-3.5 text-xs">
                          <span className="mb-1 block font-mono text-[10px] font-semibold uppercase text-[var(--theme-accent)]">
                            Analytical Rationale
                          </span>
                          <p className="font-body text-xs italic leading-relaxed text-[var(--theme-text)]/90">
                            {step.rationale}
                          </p>
                        </div>
                      )}

                      {step.technicalHighlights && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="mr-1 font-mono text-[10px] text-[var(--theme-text-muted)]">
                            Methods:
                          </span>
                          {step.technicalHighlights.map((hl) => (
                            <span
                              key={hl}
                              className="rounded-md border border-[var(--theme-border)]/60 bg-[var(--theme-background-soft)] px-2 py-0.5 font-mono text-[11px] text-[var(--theme-text-secondary)]"
                            >
                              {hl}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 3: MODELS ================= */}
      {activeTab === 'models' && (
        <div className="space-y-6">
          {/* Linear Regression */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                  Continuous Target Modeling
                </span>
                <h3 className="mt-0.5 flex items-center gap-2 font-display text-lg font-normal text-[var(--theme-text)]">
                  <LineChart className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
                  Linear Regression Analysis
                </h3>
              </div>
              <span className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-background-soft)] px-2.5 py-1 font-mono text-[11px] text-[var(--theme-text-muted)]">
                80/20 Train-Test Split
              </span>
            </div>

            <p className="max-w-[70ch] font-body text-xs sm:text-sm leading-relaxed text-[var(--theme-text)]/90">
              Linear Regression was used to investigate relationships between numerical target variables and other available features. The project evaluated three distinct numerical prediction targets:
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                { label: 'Target A', name: 'MonthlyIncome', desc: 'Predicting income based on credit lines, debt obligations, and age.' },
                { label: 'Target B', name: 'DebtRatio', desc: 'Predicting monthly debt obligations as a ratio of individual income.' },
                { label: 'Target C', name: 'Age', desc: 'Evaluating relationships between borrower age and length of credit profile.' },
              ].map((t) => (
                <div key={t.label} className="space-y-1 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-3.5">
                  <span className="font-mono text-[10px] font-semibold uppercase text-[var(--theme-accent)]">{t.label}</span>
                  <h5 className="font-mono text-xs font-bold text-[var(--theme-text)]">{t.name}</h5>
                  <p className="text-[11px] text-[var(--theme-text-muted)] leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/40 p-3 text-[11px] text-[var(--theme-text-muted)] font-mono">
              <span className="flex items-center gap-1.5 font-medium text-[var(--theme-text)]">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-[var(--theme-accent)]" aria-hidden="true" />
                Evaluation Metrics: R² Score and Mean Squared Error (MSE)
              </span>
              <span className="text-[10px]">Results preserved in submitted coursework.</span>
            </div>
          </div>

          {/* Logistic Regression */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                  Binary Classification
                </span>
                <h3 className="mt-0.5 flex items-center gap-2 font-display text-lg font-normal text-[var(--theme-text)]">
                  <BrainCircuit className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
                  Logistic Regression (Credit Risk Classification)
                </h3>
              </div>
              <span className="rounded-md border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-[var(--theme-accent)]">
                Target: SeriousDlqin2yrs
              </span>
            </div>

            <p className="max-w-[70ch] font-body text-xs sm:text-sm leading-relaxed text-[var(--theme-text)]/90">
              Logistic Regression was used as a binary classification approach to examine whether the target class could be predicted from the available financial and credit-related features.
            </p>

            <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
              <div className="space-y-1 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-3.5">
                <span className="block font-mono text-[10px] uppercase text-[var(--theme-text-muted)] font-semibold">Model Pipeline</span>
                <span className="block font-mono font-bold text-[var(--theme-text)]">
                  Feature-Target Separation → Train/Test Split → Logit Fit
                </span>
                <p className="text-[11px] text-[var(--theme-text-secondary)] leading-relaxed">
                  Calculates class probabilities via the standard logistic sigmoid function.
                </p>
              </div>
              <div className="space-y-1 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-3.5">
                <span className="block font-mono text-[10px] uppercase text-[var(--theme-text-muted)] font-semibold">Academic Context</span>
                <span className="block font-semibold text-[var(--theme-text)]">Academic Machine Learning Exercise</span>
                <p className="text-[11px] text-[var(--theme-text-secondary)] leading-relaxed">
                  No synthetic accuracy percentage is claimed. Suitable for academic exploration, not commercial lending.
                </p>
              </div>
            </div>
          </div>

          {/* PCA */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                  Dimensionality Reduction
                </span>
                <h3 className="mt-0.5 flex items-center gap-2 font-display text-lg font-normal text-[var(--theme-text)]">
                  <Grid className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
                  Principal Component Analysis (PCA)
                </h3>
              </div>
              <span className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-background-soft)] px-2.5 py-1 font-mono text-[11px] font-semibold text-[var(--theme-text)]">
                n_components = 0.95 (95% Target)
              </span>
            </div>

            <p className="max-w-[70ch] font-body text-xs sm:text-sm leading-relaxed text-[var(--theme-text)]/90">
              Principal Component Analysis (PCA) was used as a dimensionality-reduction technique, configured to preserve 95% of cumulative explained variance across orthogonal feature directions.
            </p>

            <div className="space-y-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-4">
              <span className="block font-mono text-[11px] font-semibold uppercase text-[var(--theme-accent)]">
                Why Feature Standardization (StandardScaler) is Critical Before PCA:
              </span>
              <p className="max-w-[70ch] font-body text-xs leading-relaxed text-[var(--theme-text)]/90">
                Standardization is critical before PCA so that features measured in large units (such as MonthlyIncome in thousands) do not artificially dominate principal directions over features measured on small scales (such as ratios or counts). StandardScaler transforms all features to zero mean and unit variance.
              </p>
            </div>

            {/* PCA Variance Distribution Chart */}
            <div className="space-y-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/30 p-4">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-[var(--theme-text-muted)]">Cumulative Explained Variance Representation:</span>
                <span className="font-mono text-[10px] text-[var(--theme-accent)]">Illustrative visualization</span>
              </div>

              <div className="flex h-28 w-full items-end justify-between gap-2 px-2 pt-4">
                {[
                  { pc: 'PC1', v: 38, op: 1.0 },
                  { pc: 'PC2', v: 24, op: 0.85 },
                  { pc: 'PC3', v: 16, op: 0.70 },
                  { pc: 'PC4', v: 10, op: 0.58 },
                  { pc: 'PC5', v: 7, op: 0.48 },
                  { pc: '...', v: 5, op: 0.40 },
                ].map((bar, bIdx) => (
                  <div key={bIdx} className="flex flex-1 flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t transition-all hover:brightness-125"
                      style={{
                        height: `${bar.v * 2.2}px`,
                        backgroundColor: 'var(--theme-accent)',
                        opacity: bar.op,
                      }}
                    />
                    <span className="font-mono text-[10px] text-[var(--theme-text-muted)] tabular-nums">{bar.pc}</span>
                  </div>
                ))}
              </div>
              <p className="pt-1 text-center font-mono text-[10px] text-[var(--theme-text-muted)]">
                PCA was configured to retain 95% of total variance. The portfolio does not claim a specific resulting number of components beyond verified documentation.
              </p>
            </div>
          </div>

          {/* Confusion Matrix Evaluation */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                  Classification Diagnostics
                </span>
                <h3 className="mt-0.5 flex items-center gap-2 font-display text-lg font-normal text-[var(--theme-text)]">
                  <Binary className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
                  Confusion Matrix Evaluation
                </h3>
              </div>
              <span className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-background-soft)] px-2.5 py-1 font-mono text-[10px] text-[var(--theme-text-muted)]">
                Evaluation Framework
              </span>
            </div>

            <p className="max-w-[70ch] font-body text-xs sm:text-sm leading-relaxed text-[var(--theme-text)]/90">
              A confusion matrix provides significantly more detail than raw accuracy alone, particularly when class distributions are imbalanced (as is typical in credit delinquency where defaults are a small minority of borrowers). Click a quadrant below to inspect its credit risk implication:
            </p>

            {/* Quadrants */}
            <div className="mx-auto grid max-w-lg grid-cols-2 gap-3 pt-2">
              {[
                { id: 'tp' as const, label: 'True Positive (TP)', title: 'Default correctly detected', desc: 'Actual Defaulter → Predicted Defaulter' },
                { id: 'fp' as const, label: 'False Positive (FP)', title: 'Type I Error (False Alarm)', desc: 'Good Borrower → Predicted Defaulter' },
                { id: 'fn' as const, label: 'False Negative (FN)', title: 'Type II Error (Missed Default)', desc: 'Actual Defaulter → Predicted Good' },
                { id: 'tn' as const, label: 'True Negative (TN)', title: 'Good borrower approved', desc: 'Good Borrower → Predicted Good' },
              ].map((q) => {
                const isActive = activeConfusionQuadrant === q.id;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setActiveConfusionQuadrant(q.id)}
                    className={`
                      rounded-xl border p-3.5 text-left transition-all cursor-pointer
                      ${
                        isActive
                          ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10'
                          : 'border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 hover:border-[var(--theme-border)]'
                      }
                    `}
                  >
                    <span className="block font-mono text-[10px] font-bold uppercase text-[var(--theme-accent)]">
                      {q.label}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-[var(--theme-text)]">{q.title}</span>
                    <span className="mt-0.5 block font-mono text-[10px] text-[var(--theme-text-muted)]">{q.desc}</span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/60 p-4 text-xs">
              {activeConfusionQuadrant === 'tp' && (
                <p className="max-w-[70ch] leading-relaxed text-[var(--theme-text)] font-body text-xs sm:text-sm">
                  <strong className="font-semibold text-[var(--theme-accent)]">True Positive (TP) Context:</strong> Identifies credit applicants who experienced serious delinquency as predicted. In lending risk management, high sensitivity (recall) on TP protects loan capital from default exposure.
                </p>
              )}
              {activeConfusionQuadrant === 'fp' && (
                <p className="max-w-[70ch] leading-relaxed text-[var(--theme-text)] font-body text-xs sm:text-sm">
                  <strong className="font-semibold text-[var(--theme-accent)]">False Positive (FP) / Type I Error:</strong> Flags a creditworthy borrower as high-risk. This carries the business cost of lost interest income and damaged customer relationship.
                </p>
              )}
              {activeConfusionQuadrant === 'fn' && (
                <p className="max-w-[70ch] leading-relaxed text-[var(--theme-text)] font-body text-xs sm:text-sm">
                  <strong className="font-semibold text-[var(--theme-accent)]">False Negative (FN) / Type II Error:</strong> Approves a borrower who subsequently defaults. In risk modeling, this is commonly the most financially costly classification failure.
                </p>
              )}
              {activeConfusionQuadrant === 'tn' && (
                <p className="max-w-[70ch] leading-relaxed text-[var(--theme-text)] font-body text-xs sm:text-sm">
                  <strong className="font-semibold text-[var(--theme-accent)]">True Negative (TN) Context:</strong> Correctly recognizes responsible borrowers who maintain spotless repayment over the 2-year horizon, safely expanding the loan portfolio.
                </p>
              )}
            </div>

            <div className="rounded-lg bg-[var(--theme-background-soft)]/50 p-3 text-center font-mono text-[11px] text-[var(--theme-text-muted)]">
              Notice: Specific confusion matrix numerical counts and sensitivity percentages are preserved in the original submitted academic report to prevent synthetic reporting.
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: OUTCOMES ================= */}
      {activeTab === 'outcomes' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                Core Competencies Developed
              </span>
              <h3 className="mt-0.5 flex items-center gap-2 font-display text-lg font-normal text-[var(--theme-text)]">
                <CheckCircle2 className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
                What I Learned
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {project.learningOutcomes?.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-3"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--theme-accent)]/15 font-mono text-[10px] font-bold text-[var(--theme-accent)]">
                    {idx + 1}
                  </div>
                  <span className="font-body text-xs sm:text-sm font-medium text-[var(--theme-text)]">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-5 sm:p-6 space-y-3">
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              Business Analytics Perspective
            </span>
            <h4 className="font-display text-base font-normal text-[var(--theme-text)]">
              Connecting Academic Modeling with Commercial Decision Context
            </h4>
            <p className="max-w-[70ch] font-body text-xs sm:text-sm leading-relaxed text-[var(--theme-text)]/90 italic">
              "{project.businessAnalyticsPerspective}"
            </p>
            <div className="border-t border-[var(--theme-border)]/60 pt-2 font-mono text-[11px] text-[var(--theme-text-muted)]">
              Key Takeaway: Rigorous preprocessing and statistical diagnostics are vital before any machine-learning model can offer meaningful risk intelligence to financial stakeholders.
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden="true" />
            <div className="space-y-1">
              <h5 className="font-mono text-xs font-bold text-[var(--theme-text)]">
                Academic Transparency &amp; Truthfulness
              </h5>
              <p className="max-w-[70ch] font-mono text-[11px] leading-relaxed text-[var(--theme-text-muted)]">
                This portfolio does not claim professional employment, synthetic accuracy scores, fake dataset statistics, or commercial software deployment. All presented methodologies represent genuine academic coursework completed at COMSATS University Islamabad.
              </p>
            </div>
          </div>
        </div>
      )}
    </CaseStudyModalShell>
  );
};

export default CreditRiskCaseStudyModal;
