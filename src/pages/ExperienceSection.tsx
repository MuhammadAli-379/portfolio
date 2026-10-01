import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Database,
  FileSpreadsheet,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PageNavigation } from '../components/PageNavigation';

interface ExperienceSectionProps {
  experienceStatement: string;
  certificationsNotice?: string;
  notice?: string;
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

const PLANNED_CREDENTIALS = [
  'Power BI Analytics',
  'Advanced SQL',
  'Python for Data Analysis',
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

// ─── Main Component ──────────────────────────────────────────────────────────

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experienceStatement,
  certificationsNotice,
  notice,
}) => {
  const location = useLocation();
  const isStandalonePage = location.pathname === '/experience';
  const effectiveNotice =
    certificationsNotice ||
    notice ||
    'Certifications will be added as I complete relevant professional courses and credentials.';

  const content = (
    <div className="space-y-16 sm:space-y-20">
      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1: Professional pathway — Experience & Practicum
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="relative"
      >
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
                  <Link
                    to="/contact"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-burgundy)] px-5 py-3 text-xs font-semibold text-white shadow-[var(--shadow-burgundy)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-burgundy-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-burgundy)] motion-reduce:transition-none dark:bg-[var(--color-burgundy-light)] dark:text-[var(--color-burgundy-deep)] dark:hover:bg-[#e4b3be] dark:focus-visible:outline-[var(--color-burgundy-light)]"
                  >
                    <span>Discuss opportunities</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </Link>

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
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2: Professional Credentials — Certifications
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="certifications"
        aria-labelledby="certifications-heading"
        className="relative"
      >
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
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
            {/* Burgundy → Gold Accent Stripe */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-burgundy-dark)] via-[var(--color-burgundy)] to-[var(--color-gold)]"
            />

            <div className="p-6 sm:p-8 lg:p-10">
              {/* Status Row */}
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
                    {effectiveNotice}
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
                  {PLANNED_CREDENTIALS.map((credential) => (
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
      </section>
    </div>
  );

  // If viewed on dedicated /experience page route, wrap in full-page layout with PageHeader and PageNavigation
  if (isStandalonePage) {
    return (
      <div
        id="experience-page"
        className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[var(--theme-background)] pt-28 pb-20 sm:pt-32 sm:pb-24"
      >
        {/* Ambient decorative backgrounds */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-[var(--color-burgundy)]/5 blur-3xl dark:bg-[var(--color-burgundy)]/10" />
          <div className="absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-[var(--color-gold)]/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Dedicated Page Header */}
          <PageHeader
            badge="Professional Pathway"
            badgeIcon={<Briefcase className="h-3.5 w-3.5" />}
            title="Experience &amp; Credentials"
            description="A developing professional profile focused on applying business analytics, data tools, structured problem-solving, and professional credentials in practical environments."
          />

          {/* Both Sections: Experience & Practicum + Certifications */}
          {content}

          {/* Page Navigation */}
          <PageNavigation
            prev={{ label: 'Academic Projects', path: '/projects' }}
            next={{ label: 'Education & Academics', path: '/education' }}
          />
        </div>
      </div>
    );
  }

  // If embedded in a section flow (e.g., home page)
  return (
    <div className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-background)] py-20 sm:py-24">
      {/* Ambient decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full bg-[var(--color-burgundy)]/5 blur-3xl dark:bg-[var(--color-burgundy)]/10"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </div>
  );
};
