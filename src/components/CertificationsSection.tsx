import React from 'react';
import {
  Award,
  Clock3,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';

interface CertificationsSectionProps {
  notice: string;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  notice,
}) => {
  const plannedCredentials = [
    'Power BI Analytics',
    'Advanced SQL',
    'Python for Data Analysis',
  ];

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-background-soft)] py-20 sm:py-24 dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-background-soft)]"
    >
      {/* Subtle Background Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-[var(--color-burgundy)]/[0.035] blur-3xl dark:bg-[var(--color-burgundy)]/[0.12]" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[var(--color-gold)]/[0.025] blur-3xl dark:bg-[var(--color-gold)]/[0.06]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-12 sm:mb-14">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[var(--color-burgundy)] dark:text-[var(--color-burgundy-light)]">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]">
              <Award className="h-3.5 w-3.5" />
            </span>

            <span>Professional Credentials</span>
          </div>

          <div className="max-w-3xl">
            <h2
              id="certifications-heading"
              className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-[2.65rem] dark:text-[var(--color-dark-text)]"
            >
              Certifications
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base dark:text-[var(--color-dark-text-muted)]">
              Professional credentials and structured learning pathways being
              developed alongside undergraduate studies in business data
              analytics.
            </p>
          </div>
        </div>

        {/* Certification Status Card */}
        <div className="mx-auto max-w-4xl">
          <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(128,0,32,0.28)] hover:shadow-[var(--shadow-burgundy)] dark:border-[var(--color-dark-border)] dark:bg-[var(--color-dark-surface)]">

            {/* Burgundy → Gold Accent */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-burgundy-dark)] via-[var(--color-burgundy)] to-[var(--color-gold)]"
            />

            <div className="p-6 sm:p-8 lg:p-10">

              {/* Status */}
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(128,0,32,0.18)] bg-[var(--color-burgundy-soft)] px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--color-burgundy)] dark:border-[rgba(166,61,85,0.3)] dark:bg-[rgba(128,0,32,0.16)] dark:text-[var(--color-burgundy-light)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-burgundy)] dark:bg-[var(--color-burgundy-light)]" />
                  Credential Development
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
                  <Clock3 className="h-3.5 w-3.5 text-[var(--color-gold)]" />
                  <span>Currently in progress</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">

                {/* Icon */}
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgba(201,162,39,0.3)] bg-[rgba(201,162,39,0.08)] text-[var(--color-gold)] shadow-sm">
                    <ShieldCheck
                      className="h-8 w-8"
                      strokeWidth={1.7}
                    />
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-burgundy)] text-white dark:border-[var(--color-dark-surface)]"
                  >
                    <Sparkles className="h-3 w-3" />
                  </div>
                </div>

                {/* Copy */}
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
                      Professional Development
                    </span>

                    <span className="text-[10px] text-[var(--color-text-muted)]">
                      •
                    </span>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
                      Data Analytics &amp; BI
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[var(--color-text)] sm:text-2xl dark:text-[var(--color-dark-text)]">
                    Professional Courses &amp; Credentials in Progress
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]">
                    {notice}
                  </p>
                </div>
              </div>

              {/* Planned Credentials */}
              <div className="mt-8 border-t border-[var(--color-border-light)] pt-7 dark:border-[var(--color-dark-border-light)]">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
                      Current Learning Focus
                    </h4>

                    <p className="mt-1 text-[11px] text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
                      Areas being developed for future professional credentials.
                    </p>
                  </div>

                  <Sparkles className="hidden h-4 w-4 shrink-0 text-[var(--color-gold)] sm:block" />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {plannedCredentials.map((credential) => (
                    <div
                      key={credential}
                      className="group/item rounded-xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] p-4 transition-colors duration-200 hover:border-[rgba(128,0,32,0.2)] dark:border-[var(--color-dark-border-light)] dark:bg-[var(--color-dark-background-soft)] dark:hover:border-[rgba(166,61,85,0.35)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-burgundy-soft)] text-[var(--color-burgundy)] dark:bg-[rgba(128,0,32,0.18)] dark:text-[var(--color-burgundy-light)]">
                          <Award className="h-4 w-4" />
                        </div>

                        <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
                          Planned
                        </span>
                      </div>

                      <p className="mt-3 text-xs font-semibold leading-5 text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
                        {credential}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transparency Note */}
              <div className="mt-7 flex items-start gap-3 rounded-xl border border-[rgba(201,162,39,0.18)] bg-[rgba(201,162,39,0.035)] p-4 dark:border-[rgba(212,175,55,0.2)] dark:bg-[rgba(212,175,55,0.045)]">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-gold)]" />

                <p className="text-[11px] leading-5 text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]">
                  <span className="font-semibold text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
                    Credential transparency:
                  </span>{' '}
                  Only completed and verifiable certifications should be listed
                  as credentials. Courses and learning pathways remain clearly
                  marked as in progress until formally completed.
                </p>
              </div>
            </div>

            {/* Footer Strip */}
            <div className="flex items-center justify-between border-t border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-6 py-3 dark:border-[var(--color-dark-border-light)] dark:bg-[var(--color-dark-background-soft)] sm:px-8">
              <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
                Section · Certifications
              </span>

              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 text-[var(--color-burgundy)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[var(--color-burgundy-light)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};