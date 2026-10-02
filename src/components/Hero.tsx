import React, { useState } from 'react';
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
  // Magnetic effect coordinates for primary CTA (fine pointer & normal motion only)
  const [ctaOffset, setCtaOffset] = useState({ x: 0, y: 0 });

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isFinePointer && !isReducedMotion) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
      setCtaOffset({ x, y });
    }
  };

  const handleCtaMouseLeave = () => {
    setCtaOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      aria-label="Introduction & Overview"
      className="
        relative
        flex
        min-h-[85vh]
        items-center
        overflow-hidden
        bg-[var(--theme-background)]
        pt-28
        pb-16
        sm:pt-32
        sm:pb-20
        lg:pt-36
      "
    >
      {/* ═════════════════ Soft Ambient Surface Light (Quieter Glows) ═════════════════ */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-[var(--theme-accent)]/[0.04]
          blur-3xl
          sm:h-96
          sm:w-96
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          top-1/4
          h-80
          w-80
          rounded-full
          bg-[var(--theme-primary)]/[0.07]
          blur-3xl
          sm:h-96
          sm:w-96
        "
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">

          {/* ═════════════════ LEFT — Identity & Editorial Pitch ═════════════════ */}

          <div className="lg:col-span-7">

            {/* Line 1: Headline */}
            <div className="hero-reveal-1">
              <h1
                className="
                  font-display
                  text-4xl
                  font-medium
                  leading-[1.06]
                  tracking-tight
                  text-[var(--theme-text)]
                  sm:text-5xl
                  lg:text-[clamp(2.75rem,4.5vw+0.5rem,4.25rem)]
                "
              >
                {profile.name}
              </h1>
            </div>

            {/* Line 2: Professional Title Subtitle */}
            <div className="hero-reveal-2">
              <p
                className="
                  mt-3
                  font-sans
                  text-xl
                  font-semibold
                  tracking-tight
                  text-[var(--theme-accent)]
                  sm:text-2xl
                "
              >
                {profile.professionalTitle}
              </p>
            </div>

            {/* Line 3: Academic Snapshot Badge */}
            <div className="hero-reveal-3">
              <p
                className="
                  mt-3
                  font-mono
                  text-xs
                  font-medium
                  tracking-wider
                  text-[var(--theme-text-muted)]
                  sm:text-sm
                "
              >
                {profile.degree.replace('Bachelor of Science (BS) – ', 'BS ')}
                {' · '}
                {profile.university}
              </p>
            </div>

            {/* Line 4: Body Pitch */}
            <div className="hero-reveal-4">
              <p
                className="
                  mt-5
                  max-w-xl
                  font-sans
                  text-base
                  leading-relaxed
                  text-[var(--theme-text-secondary)]
                  sm:text-lg
                "
              >
                {profile.heroPitch}
              </p>
            </div>

            {/* Line 5: Stack Chips (Smaller, Lighter, Mono-labeled) */}
            <div className="hero-reveal-5">
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {CORE_STACK.map((tool) => (
                  <span
                    key={tool}
                    className="
                      inline-flex
                      items-center
                      rounded-full
                      border
                      border-[var(--theme-border)]
                      bg-[var(--theme-surface)]/80
                      px-3
                      py-1
                      font-mono
                      text-[11px]
                      font-medium
                      tracking-wider
                      text-[var(--theme-text-secondary)]
                      transition-colors
                      duration-200
                      hover:border-[var(--theme-accent)]/50
                      hover:text-[var(--theme-accent)]
                    "
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Line 6: Action Buttons (Both Retained, 44px Targets, Magnetic on Primary) */}
            <div className="hero-reveal-6">
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/projects"
                  onMouseMove={handleCtaMouseMove}
                  onMouseLeave={handleCtaMouseLeave}
                  style={{
                    transform:
                      ctaOffset.x || ctaOffset.y
                        ? `translate(${ctaOffset.x}px, ${ctaOffset.y}px)`
                        : undefined,
                  }}
                  className="
                    group
                    inline-flex
                    min-h-[44px]
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[var(--theme-primary-light)]/40
                    bg-[var(--theme-primary)]
                    px-5.5
                    py-2.5
                    font-sans
                    text-xs
                    font-semibold
                    text-white
                    shadow-sm
                    transition-all
                    duration-200
                    hover:border-[var(--theme-accent)]/70
                    hover:shadow-md
                    active:scale-[0.98]
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--theme-accent)]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[var(--theme-background)]
                  "
                  aria-label="View Projects"
                >
                  <span>View Projects</span>
                  <ArrowRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-200
                      group-hover:translate-x-1
                    "
                  />
                </Link>

                <Link
                  to="/contact"
                  className="
                    inline-flex
                    min-h-[44px]
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[var(--theme-border)]
                    bg-[var(--theme-surface)]
                    px-5.5
                    py-2.5
                    font-sans
                    text-xs
                    font-semibold
                    text-[var(--theme-text)]
                    shadow-xs
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-[var(--theme-accent)]/50
                    hover:bg-[var(--theme-background-soft)]
                    active:scale-[0.98]
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--theme-accent)]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[var(--theme-background)]
                  "
                  aria-label="Contact Me"
                >
                  <span>Contact Me</span>
                </Link>
              </div>
            </div>

          </div>

          {/* ═════════════════ RIGHT — Profile Summary Card ═════════════════ */}

          <div className="lg:col-span-5">
            <div className="hero-reveal-card">
              <div
                className="
                  rounded-2xl
                  border
                  border-[var(--theme-border)]
                  bg-[var(--theme-surface)]
                  p-6
                  shadow-xs
                  transition-all
                  duration-300
                  hover:border-[var(--theme-border)]/80
                  sm:p-7
                "
              >
                {/* Section 1: Business Data Analytics */}
                <div>
                  <p
                    className="
                      font-mono
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.18em]
                      text-[var(--theme-text-muted)]
                    "
                  >
                    Business Data Analytics
                  </p>

                  <p
                    className="
                      mt-2
                      font-sans
                      text-sm
                      font-semibold
                      text-[var(--theme-text)]
                    "
                  >
                    {profile.semester}, {profile.university}
                  </p>
                </div>

                {/* Section 2: Core Stack */}
                <div
                  className="
                    mt-5
                    border-t
                    border-[var(--theme-border)]
                    pt-5
                  "
                >
                  <p
                    className="
                      font-mono
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.18em]
                      text-[var(--theme-text-muted)]
                    "
                  >
                    Core Stack
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {CORE_STACK.map((tool) => (
                      <span
                        key={tool}
                        className="
                          flex
                          items-center
                          gap-2
                          font-mono
                          text-xs
                          font-medium
                          text-[var(--theme-text)]
                        "
                      >
                        <span
                          aria-hidden="true"
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-[var(--theme-accent)]
                          "
                        />
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Section 3: Objective */}
                <div
                  className="
                    mt-5
                    border-t
                    border-[var(--theme-border)]
                    pt-5
                  "
                >
                  <p
                    className="
                      font-mono
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.18em]
                      text-[var(--theme-text-muted)]
                    "
                  >
                    Objective
                  </p>

                  <p
                    className="
                      mt-2
                      font-sans
                      text-sm
                      font-semibold
                      text-[var(--theme-accent)]
                    "
                  >
                    Data Analyst / BI Intern
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
