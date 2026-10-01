import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Code2,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Mail,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { StudentProfile } from '../types/portfolio';

interface HomeSectionExplorerProps {
  profile: StudentProfile;
}

export const HomeSectionExplorer: React.FC<HomeSectionExplorerProps> = ({ profile }) => {
  const sections = [
    {
      title: 'About Me',
      subtitle: 'Background & Profile',
      description: 'Undergraduate background at COMSATS University Islamabad, academic focus, career objectives, and multilingual fluency.',
      path: '/about',
      icon: User,
      badge: 'Profile',
      stats: 'Semester 5 · Section C',
    },
    {
      title: 'Skills & Toolkit',
      subtitle: 'Technical Competencies',
      description: 'Applied proficiencies in Excel modeling, SQL queries, Python data analytics, Power BI dashboards, and data cleaning.',
      path: '/skills',
      icon: Code2,
      badge: 'Core Tools',
      stats: 'Excel · SQL · Python · Power BI',
    },
    {
      title: 'Academic Projects',
      subtitle: 'Applied Coursework',
      description: 'Five analytical projects spanning credit risk modeling, time-series forecasting, e-commerce schemas, and financial ratios.',
      path: '/projects',
      icon: FolderKanban,
      badge: '5 Projects',
      stats: 'Case Studies & Live Demos',
    },
    {
      title: 'Experience & Practicum',
      subtitle: 'Practical Capabilities',
      description: 'Demonstrated readiness in data preparation, business problem formulation, KPI analysis, and structured reporting workflows.',
      path: '/experience',
      icon: Briefcase,
      badge: 'Pathway',
      stats: 'Open to Placements',
    },
    {
      title: 'Education & Honors',
      subtitle: 'Academic Credentials',
      description: 'BS Business Data Analytics syllabus, institutional coursework modules, certifications, and academic milestones.',
      path: '/education',
      icon: GraduationCap,
      badge: 'BS BDA',
      stats: 'COMSATS Islamabad',
    },
    {
      title: 'Contact & Connect',
      subtitle: 'Get in Touch',
      description: 'Direct communication channels for internship opportunities, project collaborations, and professional networking.',
      path: '/contact',
      icon: Mail,
      badge: 'Inquiries',
      stats: 'Quick Response',
    },
  ];

  return (
    <section className="relative border-t border-[var(--theme-border)] bg-[var(--theme-surface)]/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-[var(--theme-accent)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--theme-accent)]">
              Portfolio Directory
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--theme-text)] sm:text-4xl">
            Explore Dedicated Sections
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[var(--theme-text-secondary)] sm:text-base">
            Browse comprehensive standalone pages highlighting coursework, analytical tools, project case studies, and academic credentials.
          </p>
        </div>

        {/* Grid of Section Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link
                key={sec.path}
                to={sec.path}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--theme-primary-light)] hover:shadow-lg"
              >
                {/* Top band / badge */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] transition-colors group-hover:bg-[var(--theme-accent)]/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-background-soft)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--theme-text-muted)]">
                      {sec.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[var(--theme-text)] transition-colors group-hover:text-[var(--theme-accent)]">
                    {sec.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-[var(--theme-text-muted)]">
                    {sec.subtitle}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-[var(--theme-text-secondary)] line-clamp-3">
                    {sec.description}
                  </p>
                </div>

                {/* Footer link */}
                <div className="mt-6 flex items-center justify-between border-t border-[var(--theme-border)] pt-4 text-xs font-semibold">
                  <span className="text-[11px] text-[var(--theme-text-muted)]">
                    {sec.stats}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[var(--theme-accent)] transition-transform group-hover:translate-x-1">
                    <span>View Page</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
