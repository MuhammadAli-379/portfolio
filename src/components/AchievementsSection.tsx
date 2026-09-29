import React from 'react';
import {
  Trophy,
  Medal,
  Sparkles,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

interface AchievementsSectionProps {
  notice: string;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  notice,
}) => {
  const headerRef = useReveal<HTMLDivElement>();
  const cardRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="relative overflow-hidden border-t border-[var(--theme-border)] bg-[var(--theme-background)] py-20 sm:py-24"
    >
      {/* Ambient glow accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow-accent absolute -right-32 top-0 h-72 w-72 rounded-full" />
        <div className="glow-accent absolute -left-32 bottom-0 h-64 w-64 rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="reveal mb-12 sm:mb-14">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[var(--theme-accent)]">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background-soft)]">
              <Trophy className="h-3.5 w-3.5" />
            </span>
            <span>Honors &amp; Milestones</span>
          </div>

          <div className="max-w-3xl">
            <h2
              id="achievements-heading"
              className="text-gradient text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.65rem]"
            >
              Achievements
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--theme-text-muted)] sm:text-base">
              Academic recognitions, extracurricular activities, competitions,
              and university milestones documented throughout the undergraduate
              journey.
            </p>
          </div>
        </div>

        {/* Milestone Card */}
        <div className="mx-auto max-w-4xl">
          <div
            ref={cardRef}
            className="card-hover group relative overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-[var(--shadow-soft)]"
          >
            {/* Top Accent */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1"
              style={{
                background: `linear-gradient(90deg, var(--theme-primary), var(--theme-primary-light), var(--theme-accent))`,
              }}
            />

            <div className="p-6 sm:p-8 lg:p-10">
              {/* Status Row */}
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div
                  className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--theme-accent)]"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--theme-accent) 30%, transparent)',
                    backgroundColor: 'color-mix(in srgb, var(--theme-accent) 12%, transparent)',
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--theme-accent)]" />
                  Academic Record
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--theme-text-muted)]">
                  <Clock className="h-3.5 w-3.5 text-[var(--theme-accent)]" />
                  <span>Milestones in progress</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
                {/* Icon */}
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] shadow-sm">
                    <Medal className="h-8 w-8" strokeWidth={1.7} />
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--theme-surface)] bg-[var(--theme-primary)] text-white"
                  >
                    <Sparkles className="h-3 w-3" />
                  </div>
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[var(--theme-accent)]">
                      Academic Development
                    </span>
                    <span className="text-[10px] text-[var(--theme-text-muted)]">•</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">
                      COMSATS University Islamabad
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[var(--theme-text)] sm:text-2xl">
                    Academic Milestones &amp; Activities
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--theme-text-secondary)]">
                    {notice}
                  </p>
                </div>
              </div>

              {/* Bottom Information Strip */}
              <div className="mt-8 grid gap-3 border-t border-[var(--theme-border)] pt-6 sm:grid-cols-2">
                <div className="card-hover rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-[var(--theme-primary-light)]" />
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">
                      Recognition
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--theme-text-secondary)]">
                    Academic and extracurricular milestones will be presented
                    as they are formally documented.
                  </p>
                </div>

                <div
                  className="card-hover rounded-xl border p-4"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--theme-accent) 20%, transparent)',
                    backgroundColor: 'color-mix(in srgb, var(--theme-accent) 6%, transparent)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[var(--theme-accent)]" />
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">
                      Ongoing Development
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--theme-text-secondary)]">
                    Continued participation in coursework, projects, and
                    analytical learning activities.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="flex items-center justify-between border-t border-[var(--theme-border)] bg-[var(--theme-background-soft)] px-6 py-3 sm:px-8">
              <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[var(--theme-text-muted)]">
                Section · Achievements
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 text-[var(--theme-accent)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};