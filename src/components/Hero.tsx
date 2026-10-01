import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { StudentProfile } from '../types/portfolio';

interface HeroProps {
  profile: StudentProfile;
  onOpenResume: () => void;
  onOpenAssistant: () => void;
}

const CORE_STACK = ['Excel', 'SQL', 'Python', 'Power BI'];

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section
      id="home"
      className="
        relative flex min-h-[88vh] items-center overflow-hidden
        bg-[var(--theme-background)]
        pt-32 pb-20
      "
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">

          {/* ═════════════════ LEFT — Identity ═════════════════ */}

          <div className="lg:col-span-7">

            <h1
              className="
                text-5xl font-extrabold leading-[1.02]
                tracking-tight
                text-[var(--theme-text)]
                sm:text-6xl
                lg:text-[3.75rem]
              "
            >
              {profile.name}
            </h1>

            <p
              className="
                mt-3 text-xl font-semibold
                text-[#2563EB]
                sm:text-2xl
              "
            >
              {profile.professionalTitle}
            </p>

            <p
              className="
                mt-3 text-sm font-medium
                text-[var(--theme-text-secondary)]
              "
            >
              {profile.degree.replace('Bachelor of Science (BS) – ', 'BS ')}
              {' · '}
              {profile.university}
            </p>

            <p
              className="
                mt-6 max-w-xl text-base leading-relaxed
                text-[var(--theme-text-secondary)]
                sm:text-lg
              "
            >
              {profile.heroPitch}
            </p>

            {/* Tag chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {CORE_STACK.map((tool) => (
                <span
                  key={tool}
                  className="
                    rounded-full border
                    border-[var(--theme-border)]
                    bg-[var(--theme-surface)]
                    px-3.5 py-1.5
                    text-xs font-semibold
                    text-[var(--theme-text)]
                  "
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* CTAs — exactly two */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/projects"
                className="
                  group inline-flex items-center gap-2
                  rounded-lg
                  bg-[#0F172A] px-5 py-3
                  text-sm font-semibold text-white
                  shadow-[0_4px_14px_rgba(15,23,42,0.18)]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#1E293B]
                  hover:shadow-[0_6px_20px_rgba(15,23,42,0.24)]
                "
              >
                View Projects
                <ArrowRight
                  className="
                    h-4 w-4
                    transition-transform duration-200
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <Link
                to="/contact"
                className="
                  inline-flex items-center gap-2
                  rounded-lg border
                  border-[var(--theme-border)]
                  bg-[var(--theme-surface)]
                  px-5 py-3
                  text-sm font-semibold
                  text-[var(--theme-text)]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-[#2563EB]/40
                  hover:bg-[#EFF6FF]
                "
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* ═════════════════ RIGHT — Profile Card ═════════════════ */}

          <div className="lg:col-span-5">
            <div
              className="
                rounded-xl border
                border-[var(--theme-border)]
                bg-[var(--theme-surface)]
                p-6
                shadow-[0_1px_3px_rgba(15,23,42,0.06)]
              "
            >
              <p
                className="
                  text-[11px] font-semibold uppercase tracking-[0.08em]
                  text-[var(--theme-text-secondary)]
                "
              >
                Business Data Analytics
              </p>

              <p
                className="
                  mt-2 text-sm font-medium
                  text-[var(--theme-text)]
                "
              >
                {profile.semester}, {profile.university}
              </p>

              <div
                className="
                  mt-6 border-t
                  border-[var(--theme-border)]
                  pt-5
                "
              >
                <p
                  className="
                    text-[11px] font-semibold uppercase tracking-[0.08em]
                    text-[var(--theme-text-secondary)]
                  "
                >
                  Core Stack
                </p>

                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                  {CORE_STACK.map((tool) => (
                    <span
                      key={tool}
                      className="
                        text-sm font-semibold
                        text-[var(--theme-text)]
                      "
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="
                  mt-6 border-t
                  border-[var(--theme-border)]
                  pt-5
                "
              >
                <p
                  className="
                    text-[11px] font-semibold uppercase tracking-[0.08em]
                    text-[var(--theme-text-secondary)]
                  "
                >
                  Objective
                </p>

                <p
                  className="
                    mt-2 text-sm font-medium
                    text-[#2563EB]
                  "
                >
                  Data Analyst / BI Intern
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
