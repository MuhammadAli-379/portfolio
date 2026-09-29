import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
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
  GraduationCap,
  UserCheck,
  TrendingUp,
  LineChart,
  Grid,
} from 'lucide-react';
import { AcademicProject } from '../types/portfolio';

interface CreditRiskCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: AcademicProject;
  initialTab?: 'overview' | 'workflow' | 'models' | 'outcomes';
}

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

  const visualJourneySteps = [
    { num: '01', label: 'Dataset', stepIdx: 1 },
    { num: '02', label: 'Cleaning', stepIdx: 2 },
    { num: '03', label: 'Statistics', stepIdx: 3 },
    { num: '04', label: 'Outlier Analysis', stepIdx: 4 },
    { num: '05', label: 'Visualization', stepIdx: 5 },
    { num: '06', label: 'Feature Prep', stepIdx: 6 },
    { num: '07', label: 'Regression', stepIdx: 7 },
    { num: '08', label: 'Classification', stepIdx: 8 },
    { num: '09', label: 'PCA', stepIdx: 9 },
    { num: '10', label: 'Evaluation', stepIdx: 10 },
  ];

  const tabs: { id: typeof activeTab; label: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview, Team & Problem' },
    {
      id: 'workflow',
      label: (
        <span className="flex items-center gap-1.5">
          <span>10-Step Technical Workflow</span>
          <span className="rounded bg-[var(--theme-accent)]/10 px-1.5 py-0.5 font-mono text-[10px] text-[var(--theme-accent)]">
            10 Steps
          </span>
        </span>
      ),
    },
    { id: 'models', label: 'ML Models, PCA & Confusion Matrix' },
    { id: 'outcomes', label: 'What I Learned & Perspective' },
  ];

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex h-screen w-full flex-col overflow-hidden bg-[var(--theme-background)]"
      role="page"
      aria-labelledby="case-study-title"
    >
      <div
        className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--theme-surface)]"
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-4 sm:p-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                <Users className="h-3 w-3" />
                Group Academic Project
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-[var(--theme-primary-light)]/30 bg-[var(--theme-primary-light)]/10 px-2.5 py-0.5 font-mono text-[11px] text-[var(--theme-primary-light)]">
                <GraduationCap className="h-3 w-3" />
                Semester 4 • Machine Learning Coursework
              </span>
              <span className="hidden font-mono text-[11px] text-[var(--theme-text-muted)] sm:inline">
                COMSATS University Islamabad • Dept. of Management Sciences
              </span>
            </div>

            <h2 id="case-study-title" className="text-gradient text-xl font-bold tracking-tight sm:text-2xl">
              {project.title}
            </h2>

            <p className="text-xs font-medium text-[var(--theme-text-secondary)]">
              Course: <span className="font-semibold text-[var(--theme-text)]">{project.courseName}</span> · Instructor:{' '}
              <span className="font-semibold text-[var(--theme-text)]">{project.instructor || 'Sir Ali Usama'}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-2 text-xs font-semibold text-[var(--theme-text-secondary)] transition-all hover:border-[var(--theme-accent)] hover:bg-[var(--theme-background-soft)] hover:text-[var(--theme-text)]"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Projects</span>
            <span className="sm:hidden">Back</span>
          </button>
        </div>

        <div className="project-card card-hover space-y-3 rounded-2xl border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/5 p-5 sm:p-6">
    <h3>Credit Risk Analytics</h3>

    <p>
        An interactive credit risk analytics application built with Streamlit
        for analyzing borrower risk and generating data-driven insights.
    </p>

    <div className="project-buttons">
        <a
            href="https://credit-risk-app-live-demo.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn live-demo-btn inline-flex items-center justify-center rounded-xl bg-[var(--theme-accent)] px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-90"
        >
            🚀 Live Demo
        </a>
    </div>
</div>

        {/* Pipeline Tracker */}
        <div className="no-scrollbar overflow-x-auto border-b border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 sm:px-6">
          <div className="flex min-w-max items-center gap-1 font-mono text-[11px]">
            <span className="mr-2 flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-widest text-[var(--theme-text-muted)]">
              <Activity className="h-3 w-3 text-[var(--theme-accent)]" />
              Pipeline:
            </span>
            {visualJourneySteps.map((step, idx) => (
              <React.Fragment key={step.num}>
                <button
                  onClick={() => {
                    setActiveTab('workflow');
                    setExpandedStep(step.stepIdx);
                  }}
                  className="flex items-center gap-1 rounded-md px-2 py-1 transition-colors"
                  style={
                    activeTab === 'workflow' && expandedStep === step.stepIdx
                      ? { backgroundColor: 'var(--theme-accent)', color: '#FFFFFF', fontWeight: 700 }
                      : { backgroundColor: 'var(--theme-background-soft)', color: 'var(--theme-text-secondary)' }
                  }
                >
                  <span className="text-[9px] opacity-75">{step.num}</span>
                  <span>{step.label}</span>
                </button>
                {idx < visualJourneySteps.length - 1 && (
                  <span className="text-[var(--theme-border)]">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex overflow-x-auto border-b border-[var(--theme-border)] bg-[var(--theme-background-soft)]/60 px-4 text-xs font-medium sm:px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 transition-colors ${
                activeTab === tab.id
                  ? 'border-[var(--theme-accent)] font-bold text-[var(--theme-accent)]'
                  : 'border-transparent text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 space-y-8 overflow-y-auto p-5 text-xs text-[var(--theme-text-secondary)] sm:p-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="card-hover space-y-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-5 sm:p-6">
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--theme-accent)]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Project Executive Summary
                </span>
                <p className="text-sm leading-relaxed text-[var(--theme-text)]">
                  Credit Risk Analytics is a group academic project completed for the
                  Business Data Analysis course at COMSATS University Islamabad. The
                  project explored a credit-risk dataset through data loading and
                  cleaning, missing-value handling, descriptive statistics, outlier
                  analysis, visualization, regression modelling, logistic
                  classification, dimensionality reduction using PCA, and
                  confusion-matrix evaluation.
                </p>
                <p className="text-xs leading-relaxed text-[var(--theme-text-secondary)]">
                  The project provided practical experience in preparing structured
                  financial data for analysis and applying statistical and
                  machine-learning techniques to a credit-risk problem.
                </p>
                <div className="flex items-center gap-1.5 pt-2 font-mono text-[11px] text-amber-500">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>
                    Academic Coursework Notice: This project was conducted strictly as
                    academic coursework and was not developed for an actual commercial
                    bank, lender, or financial corporation.
                  </span>
                </div>
              </div>

              <div className="card-hover space-y-2 rounded-2xl border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/5 p-5 sm:p-6">
                <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--theme-text)]">
                  <BookOpen className="h-4 w-4 text-[var(--theme-accent)]" />
                  Business Problem
                </h3>
                <p className="text-xs leading-relaxed text-[var(--theme-text-secondary)] sm:text-sm">
                  {project.businessProblem}
                </p>
                <p className="pt-1 font-mono text-[11px] text-[var(--theme-text-muted)]">
                  Analysis context: Purely academic investigation of risk factors using
                  statistical methods and machine learning pipelines.
                </p>
              </div>

              <div className="card-hover space-y-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--theme-text)]">
                    <Database className="h-4 w-4 text-[var(--theme-accent)]" />
                    Dataset: {project.dataset?.datasetName || 'GiveMeSomeCredit'}
                  </h3>
                  <span className="rounded bg-[var(--theme-accent)]/10 px-2 py-0.5 font-mono text-[11px] text-[var(--theme-accent)]">
                    File: {project.dataset?.filename || 'cs-training.csv'}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[var(--theme-text-secondary)]">
                  {project.dataset?.description}
                </p>
                <div className="grid grid-cols-1 gap-3 pt-2 text-xs sm:grid-cols-2">
                  <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-3">
                    <span className="mb-1 block font-mono text-[10px] uppercase text-[var(--theme-text-muted)]">
                      Target Variable
                    </span>
                    <span className="font-mono font-bold text-[var(--theme-text)]">SeriousDlqin2yrs</span>
                    <span className="mt-0.5 block text-[11px] text-[var(--theme-text-muted)]">
                      Binary classification target (0 = No Delinquency, 1 = Serious
                      Delinquency within 2 years)
                    </span>
                  </div>
                  <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-3">
                    <span className="mb-1 block font-mono text-[10px] uppercase text-[var(--theme-text-muted)]">
                      Academic Integrity Policy
                    </span>
                    <span className="font-semibold text-[var(--theme-text)]">Zero Synthetic Statistics</span>
                    <span className="mt-0.5 block text-[11px] text-[var(--theme-text-muted)]">
                      No invented customer counts, commercial revenues, real-world
                      clients, or artificial accuracy scores are published.
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-hover space-y-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-2 border-b border-[var(--theme-border)] pb-3 sm:flex-row sm:items-center">
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                      Collaborative Academic Group Project
                    </span>
                    <h3 className="mt-0.5 flex items-center gap-2 text-base font-bold text-[var(--theme-text)]">
                      <Users className="h-4 w-4 text-[var(--theme-accent)]" />
                      Project Team
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--theme-text-muted)]">
                    5 Members · Coursework Team
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {project.groupMembers?.map((member) => {
                    const isCurrentUser = member.name === 'Muhammad Abubakar';
                    return (
                      <div
                        key={member.name}
                        className="flex items-center justify-between rounded-xl border p-3"
                        style={
                          isCurrentUser
                            ? { borderColor: 'color-mix(in srgb, var(--theme-accent) 50%, transparent)', backgroundColor: 'color-mix(in srgb, var(--theme-accent) 10%, transparent)' }
                            : { borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-background-soft)' }
                        }
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                            style={
                              isCurrentUser
                                ? { backgroundColor: 'var(--theme-accent)', color: '#FFFFFF' }
                                : { backgroundColor: 'var(--theme-border)', color: 'var(--theme-text-secondary)' }
                            }
                          >
                            {member.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <span className="block truncate font-semibold text-[var(--theme-text)]">
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
                          <span className="shrink-0 rounded bg-[var(--theme-accent)]/20 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-[var(--theme-accent)]">
                            You
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-1.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase text-[var(--theme-accent)]">
                      <UserCheck className="h-3.5 w-3.5" />
                      My Contribution (Muhammad Abubakar)
                    </span>
                    <span className="font-mono text-[10px] text-[var(--theme-text-muted)]">
                      Editable in Customize Drawer
                    </span>
                  </div>
                  <p className="text-xs italic leading-relaxed text-[var(--theme-text)]">
                    {project.myContribution || 'Add my specific contribution here.'}
                  </p>
                  <p className="text-[10px] text-[var(--theme-text-muted)]">
                    Transparent Collaboration Statement: Does not imply that Muhammad
                    Abubakar individually completed every task; this is a collaborative
                    academic group project.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)]">
                  Project Technologies &amp; Analytical Topics
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background-soft)] px-2.5 py-1 font-mono text-[11px] text-[var(--theme-text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WORKFLOW */}
          {activeTab === 'workflow' && (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-2 border-b border-[var(--theme-border)] pb-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="flex items-center gap-2 text-base font-bold text-[var(--theme-text)]">
                    <Layers className="h-4 w-4 text-[var(--theme-accent)]" />
                    10-Step Analytical Workflow
                  </h3>
                  <p className="text-xs text-[var(--theme-text-muted)]">
                    Click each step to expand technical details, methods, and rationale.
                  </p>
                </div>
                <button
                  onClick={() => setExpandedStep(expandedStep === 10 ? 1 : expandedStep + 1)}
                  className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 font-mono text-xs text-[var(--theme-accent)] transition-colors hover:bg-[var(--theme-background-soft)]"
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
                      className="overflow-hidden rounded-xl border transition-all"
                      style={
                        isExpanded
                          ? { borderColor: 'color-mix(in srgb, var(--theme-accent) 50%, transparent)', backgroundColor: 'var(--theme-surface)' }
                          : { borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-background-soft)' }
                      }
                    >
                      <button
                        onClick={() => setExpandedStep(isExpanded ? 0 : stepNum)}
                        className="flex w-full items-center justify-between gap-3 p-4 text-left"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold"
                            style={
                              isExpanded
                                ? { backgroundColor: 'var(--theme-accent)', color: '#FFFFFF' }
                                : { backgroundColor: 'var(--theme-border)', color: 'var(--theme-text-secondary)' }
                            }
                          >
                            {step.stepNumber}
                          </span>
                          <div className="min-w-0">
                            <h4 className="truncate text-sm font-bold text-[var(--theme-text)]">
                              {step.title}
                            </h4>
                            <p className="mt-0.5 truncate text-[11px] text-[var(--theme-text-muted)]">
                              {step.shortSummary}
                            </p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 shrink-0 text-[var(--theme-accent)]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 shrink-0 text-[var(--theme-text-muted)]" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="space-y-4 border-t border-[var(--theme-border)] px-5 pb-5 pt-1">
                          <div className="space-y-2 pt-2">
                            <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)]">
                              Actions Conducted
                            </span>
                            <ul className="space-y-1.5 text-xs">
                              {step.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-2">
                                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--theme-accent)]" />
                                  <span className="leading-relaxed text-[var(--theme-text-secondary)]">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {step.rationale && (
                            <div className="rounded-lg border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/5 p-3.5 text-xs">
                              <span className="mb-1 block font-mono text-[10px] font-semibold uppercase text-[var(--theme-accent)]">
                                Analytical Rationale
                              </span>
                              <p className="italic leading-relaxed text-[var(--theme-text-secondary)]">
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
                                  className="rounded bg-[var(--theme-background-soft)] px-2 py-0.5 font-mono text-[11px] text-[var(--theme-text-secondary)]"
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

          {/* TAB 3: MODELS */}
          {activeTab === 'models' && (
            <div className="space-y-6">
              {/* Linear Regression */}
              <div className="card-hover space-y-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                      Continuous Target Modeling
                    </span>
                    <h3 className="mt-0.5 flex items-center gap-2 text-base font-bold text-[var(--theme-text)]">
                      <LineChart className="h-4 w-4 text-[var(--theme-accent)]" />
                      Linear Regression Analysis
                    </h3>
                  </div>
                  <span className="rounded bg-[var(--theme-background-soft)] px-2 py-0.5 font-mono text-[11px] text-[var(--theme-text-muted)]">
                    80/20 Train-Test Split
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-[var(--theme-text-secondary)]">
                  Linear Regression was used to investigate relationships between
                  numerical target variables and other available features. The project
                  evaluated three distinct numerical prediction targets:
                </p>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {[
                    { label: 'Target A', name: 'MonthlyIncome', desc: 'Predicting income based on credit lines, debt obligations, and age.' },
                    { label: 'Target B', name: 'DebtRatio', desc: 'Predicting monthly debt obligations as a ratio of individual income.' },
                    { label: 'Target C', name: 'Age', desc: 'Evaluating relationships between borrower age and length of credit profile.' },
                  ].map((t) => (
                    <div key={t.label} className="space-y-1 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-3.5">
                      <span className="font-mono text-[10px] font-semibold uppercase text-[var(--theme-accent)]">{t.label}</span>
                      <h5 className="text-xs font-bold text-[var(--theme-text)]">{t.name}</h5>
                      <p className="text-[11px] text-[var(--theme-text-muted)]">{t.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-[11px] text-amber-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    Evaluation Metrics: R² Score and Mean Squared Error (MSE)
                  </span>
                  <span className="font-mono font-semibold">Evaluation results available in the original academic report.</span>
                </div>
              </div>

              {/* Logistic Regression */}
              <div className="card-hover space-y-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                      Binary Classification
                    </span>
                    <h3 className="mt-0.5 flex items-center gap-2 text-base font-bold text-[var(--theme-text)]">
                      <BrainCircuit className="h-4 w-4 text-[var(--theme-accent)]" />
                      Logistic Regression (Credit Risk Classification)
                    </h3>
                  </div>
                  <span className="rounded bg-[var(--theme-accent)]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[var(--theme-accent)]">
                    Target: SeriousDlqin2yrs
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-[var(--theme-text-secondary)]">
                  Logistic Regression was used as a binary classification approach to
                  examine whether the target class could be predicted from the
                  available financial and credit-related features.
                </p>

                <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                  <div className="space-y-1 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-3.5">
                    <span className="block font-mono text-[10px] uppercase text-[var(--theme-text-muted)]">Model Pipeline</span>
                    <span className="block font-bold text-[var(--theme-text)]">
                      Feature-Target Separation → Train/Test Split → Logit Fit
                    </span>
                    <p className="text-[11px] text-[var(--theme-text-muted)]">
                      Calculates class probabilities via the standard logistic sigmoid function.
                    </p>
                  </div>
                  <div className="space-y-1 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-3.5">
                    <span className="block font-mono text-[10px] uppercase text-[var(--theme-text-muted)]">Academic Context</span>
                    <span className="block font-bold text-[var(--theme-text)]">Academic Machine Learning Exercise</span>
                    <p className="text-[11px] text-[var(--theme-text-muted)]">
                      No synthetic accuracy percentage is claimed. Suitable for academic
                      exploration, not commercial lending.
                    </p>
                  </div>
                </div>
              </div>

              {/* PCA */}
              <div className="card-hover space-y-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                      Dimensionality Reduction
                    </span>
                    <h3 className="mt-0.5 flex items-center gap-2 text-base font-bold text-[var(--theme-text)]">
                      <Grid className="h-4 w-4 text-[var(--theme-accent)]" />
                      Principal Component Analysis (PCA)
                    </h3>
                  </div>
                  <span className="rounded bg-[var(--theme-primary-light)]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[var(--theme-primary-light)]">
                    n_components = 0.95 (95% Target)
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-[var(--theme-text-secondary)]">
                  Principal Component Analysis (PCA) was used as a
                  dimensionality-reduction technique, configured to preserve 95% of
                  cumulative explained variance across orthogonal feature directions.
                </p>

                <div className="space-y-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-4">
                  <span className="block font-mono text-[10px] font-semibold uppercase text-[var(--theme-accent)]">
                    Why Feature Standardization (StandardScaler) is Critical Before PCA:
                  </span>
                  <p className="text-xs leading-relaxed text-[var(--theme-text-secondary)]">
                    Standardization is critical before PCA so that features measured in
                    large units (such as MonthlyIncome in thousands) do not artificially
                    dominate principal directions over features measured on small
                    scales (such as ratios or counts). StandardScaler transforms all
                    features to zero mean and unit variance.
                  </p>
                </div>

                <div className="space-y-2 rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-background-soft)]/40 p-4">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-[var(--theme-text-muted)]">Cumulative Explained Variance Representation:</span>
                    <span className="rounded bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-500">
                      Illustrative visualization — not project output
                    </span>
                  </div>

                  <div className="flex h-28 w-full items-end justify-between gap-2 px-2 pt-4">
                    {[
                      { pc: 'PC1', v: 38 },
                      { pc: 'PC2', v: 24 },
                      { pc: 'PC3', v: 16 },
                      { pc: 'PC4', v: 10 },
                      { pc: 'PC5', v: 7 },
                      { pc: '...', v: 5 },
                    ].map((bar, bIdx) => (
                      <div key={bIdx} className="flex flex-1 flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t transition-all hover:opacity-80"
                          style={{
                            height: `${bar.v * 2}px`,
                            backgroundColor: 'color-mix(in srgb, var(--theme-accent) 55%, transparent)',
                            borderTop: '1px solid var(--theme-accent)',
                          }}
                        />
                        <span className="font-mono text-[10px] text-[var(--theme-text-muted)]">{bar.pc}</span>
                      </div>
                    ))}
                  </div>
                  <p className="pt-1 text-center font-mono text-[10px] text-[var(--theme-text-muted)]">
                    PCA was configured to retain 95% of total variance. The portfolio
                    does not claim a specific resulting number of components beyond
                    verified documentation.
                  </p>
                </div>
              </div>

              {/* Confusion Matrix */}
              <div className="card-hover space-y-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                      Classification Diagnostics
                    </span>
                    <h3 className="mt-0.5 flex items-center gap-2 text-base font-bold text-[var(--theme-text)]">
                      <Binary className="h-4 w-4 text-[var(--theme-accent)]" />
                      Confusion Matrix Evaluation
                    </h3>
                  </div>
                  <span className="rounded bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-500">
                    Illustrative visualization — not project output
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-[var(--theme-text-secondary)]">
                  A confusion matrix provides significantly more detail than raw
                  accuracy alone, particularly when class distributions are imbalanced
                  (as is typical in credit delinquency where defaults are a small
                  minority of borrowers). Click a quadrant below to inspect its credit
                  risk implication:
                </p>

                {/* Quadrants — semantic colors kept fixed (universal meaning: success/warning/error) */}
                <div className="mx-auto grid max-w-lg grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'tp' as const, color: 'emerald', label: 'True Positive (TP)', title: 'Default correctly detected', desc: 'Actual Defaulter → Predicted Defaulter' },
                    { id: 'fp' as const, color: 'amber', label: 'False Positive (FP)', title: 'Type I Error (False Alarm)', desc: 'Good Borrower → Predicted Defaulter' },
                    { id: 'fn' as const, color: 'rose', label: 'False Negative (FN)', title: 'Type II Error (Missed Default)', desc: 'Actual Defaulter → Predicted Good' },
                    { id: 'tn' as const, color: 'accent', label: 'True Negative (TN)', title: 'Good borrower approved', desc: 'Good Borrower → Predicted Good' },
                  ].map((q) => {
                    const isActive = activeConfusionQuadrant === q.id;
                    const colorMap: Record<string, string> = {
                      emerald: 'rgb(16 185 129)',
                      amber: 'rgb(245 158 11)',
                      rose: 'rgb(244 63 94)',
                      accent: 'var(--theme-accent)',
                    };
                    return (
                      <button
                        key={q.id}
                        onClick={() => setActiveConfusionQuadrant(q.id)}
                        className="rounded-xl border p-3.5 text-left transition-all"
                        style={
                          isActive
                            ? {
                                borderColor: colorMap[q.color],
                                backgroundColor: `color-mix(in srgb, ${colorMap[q.color]} 12%, transparent)`,
                              }
                            : { borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-background-soft)' }
                        }
                      >
                        <span className="block font-mono text-[10px] font-bold uppercase" style={{ color: colorMap[q.color] }}>
                          {q.label}
                        </span>
                        <span className="mt-1 block text-xs font-bold text-[var(--theme-text)]">{q.title}</span>
                        <span className="mt-0.5 block text-[10px] text-[var(--theme-text-muted)]">{q.desc}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-4 text-xs">
                  {activeConfusionQuadrant === 'tp' && (
                    <p className="leading-relaxed text-[var(--theme-text)]">
                      <strong>True Positive (TP) Context:</strong> Identifies credit
                      applicants who experienced serious delinquency as predicted. In
                      lending risk management, high sensitivity (recall) on TP protects
                      loan capital from default exposure.
                    </p>
                  )}
                  {activeConfusionQuadrant === 'fp' && (
                    <p className="leading-relaxed text-[var(--theme-text)]">
                      <strong>False Positive (FP) / Type I Error:</strong> Flags a
                      creditworthy borrower as high-risk. This carries the business cost
                      of lost interest income and damaged customer relationship.
                    </p>
                  )}
                  {activeConfusionQuadrant === 'fn' && (
                    <p className="leading-relaxed text-[var(--theme-text)]">
                      <strong>False Negative (FN) / Type II Error:</strong> Approves a
                      borrower who subsequently defaults. In risk modeling, this is
                      commonly the most financially costly classification failure.
                    </p>
                  )}
                  {activeConfusionQuadrant === 'tn' && (
                    <p className="leading-relaxed text-[var(--theme-text)]">
                      <strong>True Negative (TN) Context:</strong> Correctly recognizes
                      responsible borrowers who maintain spotless repayment over the
                      2-year horizon, safely expanding the loan portfolio.
                    </p>
                  )}
                </div>

                <div className="rounded-lg bg-[var(--theme-background-soft)] p-3 text-center font-mono text-[11px] text-[var(--theme-text-muted)]">
                  Notice: Specific confusion matrix numerical counts and sensitivity
                  percentages are preserved in the original submitted academic report
                  to prevent synthetic reporting.
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OUTCOMES */}
          {activeTab === 'outcomes' && (
            <div className="space-y-6">
              <div className="card-hover space-y-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6">
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                    Core Competencies Developed
                  </span>
                  <h3 className="mt-0.5 flex items-center gap-2 text-base font-bold text-[var(--theme-text)]">
                    <CheckCircle2 className="h-4 w-4 text-[var(--theme-accent)]" />
                    What I Learned
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {project.learningOutcomes?.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-3"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--theme-accent)]/10 font-mono text-[10px] font-bold text-[var(--theme-accent)]">
                        {idx + 1}
                      </div>
                      <span className="text-xs font-medium text-[var(--theme-text)]">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-hover space-y-3 rounded-2xl border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/5 p-5 sm:p-6">
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--theme-accent)]">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Business Analytics Perspective
                </span>
                <h4 className="text-sm font-bold text-[var(--theme-text)]">
                  Connecting Academic Modeling with Commercial Decision Context
                </h4>
                <p className="text-xs leading-relaxed text-[var(--theme-text-secondary)] sm:text-sm">
                  {project.businessAnalyticsPerspective}
                </p>
                <div className="border-t border-[var(--theme-accent)]/20 pt-2 font-mono text-[11px] text-[var(--theme-text-muted)]">
                  Key Takeaway: Rigorous preprocessing and statistical diagnostics are
                  vital before any machine-learning model can offer meaningful risk
                  intelligence to financial stakeholders.
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-[var(--theme-text)]">
                    Academic Transparency &amp; Truthfulness
                  </h5>
                  <p className="text-[11px] leading-relaxed text-[var(--theme-text-muted)]">
                    This portfolio does not claim professional employment, synthetic
                    accuracy scores, fake dataset statistics, or commercial software
                    deployment. All presented methodologies represent genuine academic
                    coursework completed at COMSATS University Islamabad.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-4 sm:flex-row sm:p-5">
          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--theme-text-muted)]">
            <span>Course: BDA • 4th Semester</span>
            <span>·</span>
            <span>COMSATS Islamabad</span>
          </div>

          <button
            onClick={onClose}
            className="btn-shine w-full rounded-xl bg-[var(--theme-primary)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--theme-primary-light)] sm:w-auto"
          >
            Back to Projects
          </button>
        </div>
      </div>
    </div>
  );
};

