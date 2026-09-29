import React from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  LineChart,
  Search,
  Sparkles,
} from 'lucide-react';

interface ExperienceSectionProps {
  experienceStatement: string;
}

// ─── Capability data — single source of truth ────────────────────────────────

interface Capability {
  icon: React.ElementType;
  label: string;
  detail: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: FileSpreadsheet,
    label: 'Excel',
    detail: 'Data analysis & reporting',
  },
  {
    icon: Database,
    label: 'SQL',
    detail: 'Basic–intermediate querying',
  },
  {
    icon: LineChart,
    label: 'Python',
    detail: 'Pandas & NumPy workflows',
  },
  {
    icon: Search,
    label: 'Power BI',
    detail: 'Dashboards & KPI reporting',
  },
];

const FOCUS_POINTS = [
  'Data preparation & cleaning',
  'KPI analysis & reporting',
  'Business intelligence workflows',
  'Analytical problem solving',
] as const;

// ─── Sub-components ──────────────────────────────────────────────────────────

const CapabilityCard: React.FC<{ capability: Capability }> = ({
  capability,
}) => {
  const Icon = capability.icon;

  return (
    <div className="rounded-xl border border-[var(--color-border-light)] bg-[var(--color-surface-soft)] p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--color-burgundy)]/25 hover:shadow-[var(--shadow-soft)] motion-reduce:transition-none dark:border-[var(--color-dark-border-light)] dark:bg-[var(--color-dark-surface-soft)] dark:hover:border-[var(--color-burgundy-light)]/30">
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-burgundy)]/15 bg-[var(--color-burgundy-soft)] text-[var(--color-burgundy)] dark:border-[var(--color-burgundy-light)]/20 dark:bg-[var(--color-burgundy)]/10 dark:text-[var(--color-burgundy-light)]"
          aria-hidden="true"
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--color-text)]">
            {capability.label}
          </p>
          <p className="mt-0.5 text-[11px] text-[var(--color-text-muted)]">
            {capability.detail}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experienceStatement,
}) => {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-background)] py-20 sm:py-24"
    >
      {/* Decorative ambient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full bg-[var(--color-burgundy)]/5 blur-3xl dark:bg-[var(--color-burgundy)]/10"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <header className="mb-10 max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-[var(--color-burgundy)] dark:text-[var(--color-burgundy-light)]">
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide">
              Professional pathway
            </span>
          </div>

          <h2
            id="experience-heading"
            className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl"
          >
            Experience &amp; Practicum
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
            A developing professional profile focused on applying business
            analytics, data tools, and structured problem-solving in practical
            environments.
          </p>
        </header>

        {/* ── Main opportunity panel ── */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)]">

          {/* Top accent stripe */}
          <div
            aria-hidden="true"
            className="h-1 bg-gradient-to-r from-[var(--color-burgundy-dark)] via-[var(--color-burgundy)] to-[var(--color-gold)]"
          />

          <div className="grid lg:grid-cols-[1.35fr_0.65fr]">

            {/* ── Left: main content ── */}
            <div className="p-6 sm:p-8 lg:p-10">

              {/* Availability status */}
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-burgundy)]/20 bg-[var(--color-burgundy-soft)] px-3 py-1.5 text-[11px] font-semibold text-[var(--color-burgundy-dark)] dark:border-[var(--color-burgundy-light)]/25 dark:bg-[var(--color-burgundy)]/10 dark:text-[var(--color-burgundy-light)]"
                role="status"
                aria-label="Availability: Open to professional opportunities"
              >
                {/* Ping suppressed for reduced-motion users */}
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-burgundy-light)] opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-burgundy)] dark:bg-[var(--color-burgundy-light)]" />
                </span>
                Open to professional opportunities
              </div>

              <h3 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-[var(--color-text)] sm:text-3xl">
                {experienceStatement}
              </h3>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-secondary)]">
                Equipped with practical experience in data preparation,
                analytical workflows, KPI reporting, visualization, and
                business-oriented problem solving. Interested in opportunities
                where structured analysis can support clearer reporting and
                better-informed business decisions.
              </p>

              {/* Capability highlights */}
              <div
                className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
                aria-label="Capability highlights"
              >
                {CAPABILITIES.map((capability) => (
                  <CapabilityCard
                    key={capability.label}
                    capability={capability}
                  />
                ))}
              </div>
            </div>

            {/* ── Right: professional summary panel ── */}
            <div className="border-t border-[var(--color-border)] bg-[var(--color-background-soft)] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10 dark:bg-[var(--color-dark-background-soft)]">

              <div className="flex h-full flex-col justify-between">

                <div>
                  {/* Sparkles icon — decorative */}
                  <div
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                    aria-hidden="true"
                  >
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <p className="text-[10px] font-semibold text-[var(--color-text-muted)]">
                    Professional focus
                  </p>

                  <h4 className="mt-2 text-lg font-bold text-[var(--color-text)]">
                    Business data analytics
                  </h4>

                  <p className="mt-3 text-xs leading-6 text-[var(--color-text-secondary)]">
                    Combining analytical thinking with practical business
                    tools to transform structured data into useful insights,
                    reports, and decision-support outputs.
                  </p>

                  {/* Focus points list */}
                  <ul
                    className="mt-6 space-y-3"
                    aria-label="Areas of professional focus"
                  >
                    {FOCUS_POINTS.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs text-[var(--color-text-secondary)]"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-burgundy)] dark:text-[var(--color-burgundy-light)]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <a
                    href="#contact"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-burgundy)] px-5 py-3 text-xs font-semibold text-white shadow-[var(--shadow-burgundy)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-burgundy-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-burgundy)] motion-reduce:transition-none dark:bg-[var(--color-burgundy-light)] dark:text-[var(--color-burgundy-deep)] dark:hover:bg-[#e4b3be] dark:focus-visible:outline-[var(--color-burgundy-light)]"
                  >
                    <span>Discuss opportunities</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </a>

                  <p className="mt-3 text-center text-[10px] text-[var(--color-text-muted)]">
                    Connect through the portfolio contact section
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom note ── */}
        <aside
          className="mt-5 flex items-start gap-2.5 rounded-xl border border-[var(--color-border-light)] bg-[var(--color-surface-soft)] px-4 py-3 text-[11px] leading-5 text-[var(--color-text-muted)] dark:border-[var(--color-dark-border-light)] dark:bg-[var(--color-dark-surface-soft)]"
          aria-label="Career readiness note"
        >
          <CheckCircle2
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-gold)]"
            aria-hidden="true"
          />
          <span>
            <span className="font-semibold text-[var(--color-text-secondary)]">
              Career readiness:
            </span>{' '}
            This section presents current practical capabilities without
            assigning artificial proficiency percentages or unsupported
            professional experience.
          </span>
        </aside>

      </div>
    </section>
  );
};