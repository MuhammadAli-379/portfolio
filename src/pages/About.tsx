import React from 'react';
import {
  Building2,
  MapPin,
  Target,
  Languages,
  Compass,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  User,
} from 'lucide-react';
import { StudentProfile } from '../types/portfolio';
import { useReveal } from '../hooks/useReveal';
import { PageHeader } from '../components/PageHeader';
import { PageNavigation } from '../components/PageNavigation';

interface AboutProps {
  profile: StudentProfile;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const cardRef = useReveal<HTMLDivElement>();
  const bioRef = useReveal<HTMLDivElement>();
  const objectiveRef = useReveal<HTMLDivElement>();
  const snapshotRef = useReveal<HTMLDivElement>();
  const languagesRef = useReveal<HTMLDivElement>();

  return (
    <div
      id="about"
      className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[var(--theme-background)] pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      {/* Ambient glow accents */}
      <div
        aria-hidden="true"
        className="glow-accent pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full"
      />
      <div
        aria-hidden="true"
        className="glow-accent pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Dedicated Page Header */}
        <PageHeader
          badge="Profile & Background"
          badgeIcon={<User className="h-3.5 w-3.5" />}
          title="About Me"
          description="Business Data Analytics undergraduate at COMSATS University Islamabad, developing practical expertise in data analysis, business intelligence, and technology-driven decision making."
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Profile Card */}
          <div className="lg:col-span-5">
            <div
              ref={cardRef}
              className="reveal card-hover relative mx-auto max-w-md overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-[0_20px_60px_var(--theme-shadow)]"
            >
              {/* Header band */}
              <div className="relative h-24 overflow-hidden bg-[var(--theme-primary)]">
                <div className="absolute -right-10 -top-20 h-48 w-48 rounded-full border border-white/10" />
                <div className="absolute right-10 -bottom-20 h-40 w-40 rounded-full border border-white/5" />

                <div className="absolute left-6 top-5 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-white" strokeWidth={1.8} />
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                    Business Data Analytics
                  </span>
                </div>
              </div>

              {/* Profile Content */}
              <div className="relative px-6 pb-6">
                {/* Monogram */}
                <div className="-mt-12 mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-[var(--theme-surface)] bg-[var(--theme-primary)] shadow-lg">
                  <span className="font-mono text-2xl font-bold tracking-widest text-white">
                    MA
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--theme-text)]">
                    {profile.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--theme-accent)]">
                    {profile.professionalTitle}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--theme-text-secondary)]">
                    COMSATS University Islamabad · Section {profile.section}
                  </p>
                </div>

                <div className="my-6 h-px bg-[var(--theme-border)]" />

                {/* Profile Details */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <Building2 className="h-4 w-4 text-[var(--theme-accent)]" />
                      <span className="text-xs text-[var(--theme-text-secondary)]">University</span>
                    </div>
                    <span className="text-right text-xs font-semibold text-[var(--theme-text)]">
                      COMSATS Islamabad
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-[var(--theme-accent)]" />
                      <span className="text-xs text-[var(--theme-text-secondary)]">Location</span>
                    </div>
                    <span className="text-right text-xs font-medium text-[var(--theme-text)]">
                      {profile.location}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <Compass className="h-4 w-4 text-[var(--theme-accent)]" />
                      <span className="text-xs text-[var(--theme-text-secondary)]">Academic Status</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {profile.currentStatus}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <Languages className="h-4 w-4 text-[var(--theme-accent)]" />
                      <span className="text-xs text-[var(--theme-text-secondary)]">Languages</span>
                    </div>
                    <span className="max-w-[190px] text-right text-xs font-medium leading-5 text-[var(--theme-text)]">
                      English · Urdu
                    </span>
                  </div>
                </div>

                {/* Availability Badge */}
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background-soft)] px-3.5 py-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--theme-accent)]" />
                  <span className="text-xs font-medium text-[var(--theme-text)]">
                    Open to internship opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7">
            {/* Academic Profile */}
            <div ref={bioRef} className="reveal mb-9">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--theme-accent)]/10">
                  <GraduationCap className="h-5 w-5 text-[var(--theme-accent)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--theme-text)]">
                  Academic Profile &amp; Focus
                </h3>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-[var(--theme-text-secondary)] sm:text-base">
                {profile.biography}
              </p>
            </div>

            {/* Career Objective */}
            <div
              ref={objectiveRef}
              id="objective"
              className="reveal card-hover relative mb-9 overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-[var(--theme-accent)]" />
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-accent)]/10">
                  <Target className="h-5 w-5 text-[var(--theme-accent)]" />
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--theme-accent)]">
                    Career Objective
                  </p>
                  <p className="text-sm leading-7 text-[var(--theme-text)] sm:text-base">
                    {profile.careerObjective}
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Snapshot */}
            <div ref={snapshotRef} className="reveal mb-9">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--theme-text-secondary)]">
                  Academic Snapshot
                </span>
                <span className="ml-4 h-px flex-1 bg-[var(--theme-border)]" />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    label: 'Degree',
                    value: 'BS Business Data Analytics',
                    sub: 'COMSATS University',
                  },
                  {
                    label: 'Semester',
                    value: String(profile.semester),
                    sub: '5th of 8 Semesters',
                  },
                  {
                    label: 'Section',
                    value: `Section ${profile.section}`,
                    sub: 'Class Cohort C',
                  },
                  {
                    label: 'Status',
                    value: 'Currently Studying',
                    sub: 'Internship Ready',
                  },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className={`reveal card-hover stagger-${Math.min(i + 1, 5)} rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4`}
                  >
                    <span className="text-[10px] uppercase tracking-wide text-[var(--theme-text-secondary)]">
                      {item.label}
                    </span>
                    <p className="mt-2 text-xs font-bold leading-5 text-[var(--theme-text)]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[10px] text-[var(--theme-text-secondary)]">
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div ref={languagesRef} className="reveal">
              <div className="mb-3 flex items-center gap-3">
                <Languages className="h-4 w-4 text-[var(--theme-accent)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--theme-text-secondary)]">
                  Communication &amp; Languages
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.languages.map((lang) => (
                  <div
                    key={lang.language}
                    className="card-hover inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-2"
                  >
                    <span className="text-xs font-semibold text-[var(--theme-text)]">
                      {lang.language}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[var(--theme-accent)]" />
                    <span className="text-[10px] text-[var(--theme-text-secondary)]">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Page Navigation */}
        <PageNavigation
          prev={{ label: 'Home', path: '/' }}
          next={{ label: 'Skills & Toolkit', path: '/skills' }}
        />
      </div>
    </div>
  );
};