import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Filter,
  CheckCircle2,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { AcademicProject } from '../types/portfolio';
import { CaseStudyModalShell } from './CaseStudyModalShell';

interface TimeSeriesCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: AcademicProject;
}

const LIVE_DEMO_URL = 'https://sales-forecasting-intelligence.vercel.app/';

export const TimeSeriesCaseStudyModal: React.FC<TimeSeriesCaseStudyModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'outcomes'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview & Problem' },
    { id: 'workflow', label: 'Preparation & Engineering' },
    { id: 'outcomes', label: 'Key Learning & Analytics Context' },
  ];

  return (
    <CaseStudyModalShell
      isOpen={isOpen}
      onClose={onClose}
      projectNumber="01"
      category="Business Data Analysis"
      title={project.title}
      subtitle={project.semesterTag || 'Semester 4 • Individual Project'}
      metadataText={`Course: ${project.courseName || 'Business Data Analysis'} • Focus: ${project.focus || 'Temporal Feature Engineering'}`}
      liveDemoUrl={LIVE_DEMO_URL}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as 'overview' | 'workflow' | 'outcomes')}
    >
      {/* ================= TAB 1: OVERVIEW & PROBLEM ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Block */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-5 sm:p-6 space-y-3 shadow-none">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--theme-accent)] font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
              <span>Project Overview</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)]">
              Temporal Preprocessing &amp; Feature Formulation
            </h3>
            <p className="max-w-[68ch] font-body text-[16px] sm:text-[17px] leading-relaxed text-[var(--theme-text)]/90">
              {project.description}
            </p>
            <div className="pt-1 font-mono text-xs text-[var(--theme-text-muted)]">
              Individual Academic Coursework · COMSATS University Islamabad · Department of Management Sciences
            </div>
          </div>

          {/* Business Problem */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-3 shadow-none">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--theme-accent)] font-semibold">
              <BookOpen className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
              <span>Business Context</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)]">
              Business Problem &amp; Forecasting Context
            </h3>
            <p className="max-w-[68ch] font-body text-[16px] sm:text-[17px] leading-relaxed text-[var(--theme-text)]/90">
              {project.businessProblem}
            </p>
          </div>

          {/* Demonstrated Capabilities & Tags */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-3 shadow-none">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--theme-accent)] font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
              <span>Demonstrated Capabilities</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)]">
              Methods &amp; Preprocessing Techniques
            </h3>
            <ul className="flex flex-wrap gap-2 pt-1" aria-label="Demonstrated capabilities">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center rounded-md border border-[var(--theme-border)]/60 bg-[var(--theme-background-soft)]/60 px-3 py-1 font-mono text-[11px] text-[var(--theme-text-secondary)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ================= TAB 2: WORKFLOW & PREPARATION ================= */}
      {activeTab === 'workflow' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4 shadow-none">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--theme-accent)] font-semibold">
              <Filter className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
              <span>Pipeline Architecture</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)]">
              Key Methodological Stages
            </h3>
            <ul className="space-y-3" aria-label="Methodological stages">
              {project.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-4 w-4 text-[var(--theme-accent)] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span className="max-w-[68ch] font-body text-[16px] sm:text-[17px] leading-relaxed text-[var(--theme-text)]/90">
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Environment */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-none">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[var(--theme-accent)]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">
                Core Computational Technologies:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-1 font-mono text-xs font-semibold text-[var(--theme-text)]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: OUTCOMES & ANALYTICS PERSPECTIVE ================= */}
      {activeTab === 'outcomes' && (
        <div className="space-y-6">
          {/* Learning Outcomes */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 sm:p-6 space-y-4 shadow-none">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--theme-accent)] font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
              <span>Analytical Competencies</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)]">
              Key Learning Outcomes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.learningOutcomes?.map((outcome, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/40 p-4 flex items-start gap-3 shadow-none"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-[10px] font-bold bg-[var(--theme-accent)]/15 text-[var(--theme-accent)]">
                    {i + 1}
                  </span>
                  <span className="font-body text-xs sm:text-sm text-[var(--theme-text)] font-medium leading-relaxed">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Perspective */}
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 p-5 sm:p-6 space-y-3 shadow-none">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--theme-accent)] font-semibold">
              <TrendingUp className="h-3.5 w-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
              <span>Strategic Impact</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--theme-text)]">
              Business Analytics Perspective
            </h3>
            <p className="max-w-[68ch] font-body text-[16px] sm:text-[17px] leading-relaxed text-[var(--theme-text)]/90 italic">
              "{project.businessAnalyticsPerspective}"
            </p>
          </div>
        </div>
      )}
    </CaseStudyModalShell>
  );
};

export default TimeSeriesCaseStudyModal;
