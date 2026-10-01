import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { EducationInfo } from '../types/portfolio';
import { PageNavigation } from '../components/PageNavigation';

interface EducationSectionProps {
  education: EducationInfo;
}

// ─── Snapshot card data — single source of truth ────────────────────────────

interface SnapshotItem {
  icon: React.ReactNode;
  label: string;
  value: (edu: EducationInfo) => string;
  sub: string;
  accent: 'burgundy' | 'gold';
}

const SNAPSHOT_ITEMS: SnapshotItem[] = [
  {
    icon: <CalendarDays className="h-4 w-4" aria-hidden="true" />,
    label: 'Current progress',
    value: (edu) => edu.semester,
    sub: 'Junior undergraduate year',
    accent: 'burgundy',
  },
  {
    icon: <BookOpen className="h-4 w-4" aria-hidden="true" />,
    label: 'Cohort section',
    value: (edu) => `Section ${edu.section}`,
    sub: 'Business data analytics',
    accent: 'burgundy',
  },
  {
    icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
    label: 'Institutional focus',
    value: () => 'Analytics & BI',
    sub: 'Data-driven business decisions',
    accent: 'burgundy',
  },
];

// ─── Accent class maps ───────────────────────────────────────────────────────

const iconWrapClasses = {
  burgundy:
    'border-[var(--color-burgundy)]/15 bg-[var(--color-burgundy-soft)] text-[var(--color-burgundy)] dark:border-[var(--color-burgundy-light)]/20 dark:bg-[var(--color-burgundy)]/10 dark:text-[var(--color-burgundy-light)]',
  gold: 'border-[var(--color-gold)]/25 bg-[var(--color-gold)]/10 text-[var(--color-gold)]',
};

// ─── Sub-components ──────────────────────────────────────────────────────────

interface SnapshotCardProps {
  item: SnapshotItem;
  education: EducationInfo;
}

const SnapshotCard: React.FC<SnapshotCardProps> = ({ item, education }) => (
  <div className="rounded-xl border border-[var(--color-border-light)] bg-[var(--color-surface-soft)] p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--color-burgundy)]/25 motion-reduce:transition-none dark:border-[var(--color-dark-border-light)] dark:bg-[var(--color-dark-surface-soft)] dark:hover:border-[var(--color-burgundy-light)]/30">
    <div
      className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg border ${iconWrapClasses[item.accent]}`}
    >
      {item.icon}
    </div>

    <p className="text-[11px] font-medium text-[var(--color-text-muted)]">
      {item.label}
    </p>

    <p className="mt-1 text-sm font-bold text-[var(--color-text)]">
      {item.value(education)}
    </p>

    <p className="mt-0.5 text-[11px] text-[var(--color-text-muted)]">
      {item.sub}
    </p>
  </div>
);

// ─── Main component ──────────────────────────────────────────────────────────

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
}) => {
  const location = useLocation();
  const isStandalonePage = location.pathname === '/education';

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className={`relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-background)] ${
        isStandalonePage ? 'min-h-[calc(100vh-72px)] pt-28 pb-20 sm:pt-32 sm:pb-24' : 'py-20 sm:py-24'
      }`}
    >
      {/* Ambient decorative backgrounds — hidden from assistive tech */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[var(--color-burgundy)]/5 blur-3xl dark:bg-[var(--color-burgundy)]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 bg-[radial-gradient(circle,rgba(201,162,39,0.07),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <header className="mb-10 max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-[var(--color-burgundy)] dark:text-[var(--color-burgundy-light)]">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide">
              Academic qualifications
            </span>
          </div>

          <h2
            id="education-heading"
            className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl"
          >
            Education
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
            Undergraduate development in business analytics, information
            systems, and data-driven decision support.
          </p>
        </header>

        {/* ── Main card ── */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)]">

          {/* Top accent stripe */}
          <div
            aria-hidden="true"
            className="h-1 bg-gradient-to-r from-[var(--color-burgundy-dark)] via-[var(--color-burgundy)] to-[var(--color-gold)]"
          />

          <div className="p-6 sm:p-8 lg:p-10">

            {/* ── Degree header row ── */}
            <div className="flex flex-col gap-6 border-b border-[var(--color-border-light)] pb-7 dark:border-[var(--color-dark-border-light)] lg:flex-row lg:items-start lg:justify-between">

              {/* Institution + degree */}
              <div className="flex gap-4">
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-burgundy)]/20 bg-[var(--color-burgundy-soft)] text-[var(--color-burgundy)] dark:border-[var(--color-burgundy-light)]/25 dark:bg-[var(--color-burgundy)]/10 dark:text-[var(--color-burgundy-light)]"
                >
                  <GraduationCap className="h-6 w-6" />
                </div>

                <div>
                  <p className="mb-1 text-[10px] font-semibold text-[var(--color-burgundy)] dark:text-[var(--color-burgundy-light)]">
                    Undergraduate — BS program
                  </p>

                  <h3 className="text-xl font-bold tracking-tight text-[var(--color-text)] sm:text-2xl">
                    {education.degree}
                  </h3>

                  <p className="mt-1.5 text-sm font-semibold text-[var(--color-text-secondary)]">
                    {education.institution}
                  </p>
                </div>
              </div>

              {/* Status + location */}
              <div className="flex flex-row flex-wrap items-center gap-3 lg:flex-col lg:items-end">
                {/* Enrollment status badge */}
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-burgundy)]/20 bg-[var(--color-burgundy-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--color-burgundy-dark)] dark:border-[var(--color-burgundy-light)]/25 dark:bg-[var(--color-burgundy)]/10 dark:text-[var(--color-burgundy-light)]"
                  // Surface the live status to screen readers without the animation noise
                  role="status"
                  aria-label={`Enrollment status: ${education.currentStatus}`}
                >
                  {/* Pulse dot — suppressed for reduced-motion users */}
                  <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-burgundy-light)] opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-burgundy)] dark:bg-[var(--color-burgundy-light)]" />
                  </span>
                  {education.currentStatus}
                </span>

                {/* Campus */}
                <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                  <MapPin className="h-3.5 w-3.5 text-[var(--color-gold)]" aria-hidden="true" />
                  {education.campus}
                </span>
              </div>
            </div>

            {/* ── Academic snapshot ── */}
            <div
              className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3"
              aria-label="Academic snapshot"
            >
              {SNAPSHOT_ITEMS.map((item) => (
                <SnapshotCard
                  key={item.label}
                  item={item}
                  education={education}
                />
              ))}
            </div>

            {/* ── Overview ── */}
            <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">

              <div className="max-w-3xl">
                <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold text-[var(--color-text-muted)]">
                  <span aria-hidden="true" className="h-px w-5 bg-[var(--color-gold)]" />
                  Academic overview
                </div>

                <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
                  {education.overview}
                </p>
              </div>

              {/* Status chip — visible at all breakpoints now */}
              <div className="flex items-center gap-2 rounded-xl border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-gold)]" aria-hidden="true" />
                <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">
                  Active academic development
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Privacy note ── */}
        <aside
          className="mt-5 flex items-start gap-3 rounded-xl border border-[var(--color-border-light)] bg-[var(--color-surface-soft)] px-4 py-3.5 dark:border-[var(--color-dark-border-light)] dark:bg-[var(--color-dark-surface-soft)]"
          aria-label="Academic privacy notice"
        >
          <CheckCircle2
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-gold)]"
            aria-hidden="true"
          />

          <p className="text-[11px] leading-5 text-[var(--color-text-muted)]">
            <span className="font-semibold text-[var(--color-text-secondary)]">
              Academic privacy:
            </span>{' '}
            Transcript records and individual letter grades are not published
            on the public portfolio. Verification may be requested through the{' '}
            <a
              href="#contact"
              className="font-medium text-[var(--color-burgundy)] underline-offset-2 hover:underline dark:text-[var(--color-burgundy-light)]"
            >
              contact channel
            </a>
            .
          </p>
        </aside>

        {isStandalonePage && (
          <PageNavigation
            prev={{ label: 'Experience & Credentials', path: '/experience' }}
            next={{ label: 'Contact', path: '/contact' }}
          />
        )}

      </div>
    </section>
  );
};