import React, { useState } from 'react';
import {
  Database,
  Filter,
  Search,
  Cpu,
  BarChart3,
  MessageSquareQuote,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Workflow,
} from 'lucide-react';
import { AnalyticsWorkflowStep } from '../types/portfolio';
import { useReveal } from '../hooks/useReveal';

interface AnalyticsMindsetProps {
  workflow: AnalyticsWorkflowStep[];
}

const iconMap: Record<string, React.ElementType> = {
  Database,
  Filter,
  Search,
  Cpu,
  BarChart3,
  MessageSquareQuote,
  CheckCircle2,
};

export const AnalyticsMindset: React.FC<AnalyticsMindsetProps> = ({ workflow }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = workflow[activeStepIndex] || workflow[0];
  const headerRef = useReveal<HTMLDivElement>();
  const progressPct = ((activeStepIndex + 1) / workflow.length) * 100;

  return (
    <section
      id="mindset"
      className="relative border-t border-[var(--theme-border)] bg-[var(--theme-background)] py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="reveal mb-14">
          <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            <Workflow className="h-3.5 w-3.5" />
            <span>Methodology &amp; Lifecycle</span>
          </div>

          <h2 className="text-gradient text-3xl font-bold tracking-tight sm:text-4xl">
            Analytics Mindset
          </h2>

          <p className="mt-2 max-w-3xl text-sm text-[var(--theme-text-secondary)] sm:text-base">
            The end-to-end framework I practice to convert unstructured
            business phenomena into empirical decision clarity.
          </p>
        </div>

        {/* Step Timeline */}
        <div className="mb-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {workflow.map((item, idx) => {
              const IconComponent = iconMap[item.iconName] || Database;
              const isSelected = activeStepIndex === idx;

              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStepIndex(idx)}
                  aria-pressed={isSelected}
                  className={`
                    card-hover group relative overflow-hidden rounded-xl border p-3
                    text-left transition-colors
                    ${
                      isSelected
                        ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 shadow-[0_8px_24px_-6px_color-mix(in_srgb,var(--theme-accent)_40%,transparent)]'
                        : 'border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-accent)]/50'
                    }
                  `}
                >
                  {isSelected && (
                    <div
                      className="absolute left-0 right-0 top-0 h-0.5 bg-[var(--theme-accent)]"
                      aria-hidden="true"
                    />
                  )}

                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[var(--theme-text-muted)]">
                      0{item.step}
                    </span>
                    <IconComponent
                      className={`h-4 w-4 transition-colors ${
                        isSelected
                          ? 'text-[var(--theme-accent)]'
                          : 'text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)]'
                      }`}
                    />
                  </div>

                  <p className="truncate text-xs font-semibold text-[var(--theme-text)]">
                    {item.name}
                  </p>
                  <p className="truncate text-[10px] text-[var(--theme-text-muted)]">
                    {item.shortTitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Progress bar across the 7 stages */}
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[var(--theme-border)]">
            <div
              className="h-full rounded-full bg-[var(--theme-accent)] transition-[width] duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Active Stage Detail Card */}
        <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-[var(--theme-border)] pb-6 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                {React.createElement(iconMap[activeStep.iconName] || Database, {
                  className: 'w-5 h-5',
                })}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-[var(--theme-accent)]">
                    Stage {activeStep.step} of {workflow.length}
                  </span>
                  <span className="text-[var(--theme-text-muted)]" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-xs font-medium text-[var(--theme-text-secondary)]">
                    {activeStep.subtitle}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--theme-text)]">
                  {activeStep.name}
                </h3>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() =>
                  setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : workflow.length - 1))
                }
                className="flex items-center gap-1 rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-xs font-medium text-[var(--theme-text)] transition-colors hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)]"
                aria-label="Previous Stage"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={() =>
                  setActiveStepIndex((prev) => (prev < workflow.length - 1 ? prev + 1 : 0))
                }
                className="btn-shine flex items-center gap-1 rounded-lg bg-[var(--theme-primary)] px-3 py-1.5 text-xs font-medium text-white shadow-[0_4px_14px_-2px_color-mix(in_srgb,var(--theme-primary)_45%,transparent)] transition-colors hover:bg-[var(--theme-primary-light)]"
                aria-label="Next Stage"
              >
                <span>Next Stage</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Body — fades in fresh on every stage change */}
          <div key={activeStepIndex} className="animate-fade-in grid grid-cols-1 gap-6 pt-6 md:grid-cols-3">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">
                Methodology Overview
              </span>
              <p className="text-sm leading-relaxed text-[var(--theme-text-secondary)]">
                {activeStep.description}
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">
                Applied Techniques &amp; Tools
              </span>
              <ul className="space-y-1.5 text-xs text-[var(--theme-text-secondary)]">
                {activeStep.techniques.map((tech) => (
                  <li key={tech} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--theme-accent)]" aria-hidden="true" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div>
                <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">
                  Business Strategic Value
                </span>
                <p className="text-xs leading-relaxed text-[var(--theme-text-secondary)]">
                  {activeStep.businessValue}
                </p>
              </div>
              <div>
                <span className="mb-1 block text-xs font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">
                  Tangible Deliverable
                </span>
                <p className="font-mono text-xs leading-relaxed text-[var(--theme-text-secondary)]">
                  {activeStep.deliverables}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};