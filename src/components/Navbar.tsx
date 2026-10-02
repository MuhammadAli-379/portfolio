import React, { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  FileText,
  Sparkles,
  GraduationCap,
  SlidersHorizontal,
  ChevronRight,
  Home,
  User,
  Code2,
  FolderKanban,
  Briefcase,
  Mail,
  ArrowUpRight,
} from 'lucide-react';

import {
  NavLink,
  Link,
  useLocation,
} from 'react-router-dom';

import { StudentProfile } from '../types/portfolio';

import {
  ThemeSwitcher,
  ThemeId,
  ThemeMode,
  LightId,
} from './ThemeSwitcher';

interface NavbarProps {
  profile: StudentProfile;
  theme: ThemeId;
  mode: ThemeMode;
  light: LightId;

  onThemeChange: (theme: ThemeId) => void;
  onModeChange: (mode: ThemeMode) => void;
  onLightChange: (light: LightId) => void;

  onOpenResume: () => void;
  onOpenAssistant: () => void;
  onOpenCustomize?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  theme,
  mode,
  light,
  onThemeChange,
  onLightChange,
  onModeChange,
  onOpenResume,
  onOpenAssistant,
  onOpenCustomize,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Magnetic effect coordinates for primary CTA on desktop
  const [ctaOffset, setCtaOffset] = useState({ x: 0, y: 0 });

  // Refs for mobile drawer focus trap & focus return
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const wasMobileMenuOpen = useRef(false);

  const location = useLocation();

  /* =====================================================
     Navigation Items (Dedicated Separate Pages)
  ===================================================== */

  const navItems: NavItem[] = [
    {
      label: 'Home',
      path: '/',
      icon: <Home className="h-3.5 w-3.5" />,
    },
    {
      label: 'About',
      path: '/about',
      icon: <User className="h-3.5 w-3.5" />,
    },
    {
      label: 'Skills',
      path: '/skills',
      icon: <Code2 className="h-3.5 w-3.5" />,
    },
    {
      label: 'Projects',
      path: '/projects',
      icon: <FolderKanban className="h-3.5 w-3.5" />,
    },
    {
      label: 'Experience',
      path: '/experience',
      icon: <Briefcase className="h-3.5 w-3.5" />,
    },
    {
      label: 'Education',
      path: '/education',
      icon: <GraduationCap className="h-3.5 w-3.5" />,
    },
    {
      label: 'Contact',
      path: '/contact',
      icon: <Mail className="h-3.5 w-3.5" />,
    },
  ];

  /* =====================================================
     Scroll State & Indicator
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight > 0) {
        setScrollProgress(
          Math.min((scrollY / documentHeight) * 100, 100)
        );
      } else {
        setScrollProgress(0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  /* =====================================================
     Close Mobile Menu on Route Change
  ===================================================== */

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  /* =====================================================
     Mobile Menu Focus Trap, Escape Key & Scroll Lock
  ===================================================== */

  useEffect(() => {
    if (mobileMenuOpen) {
      wasMobileMenuOpen.current = true;
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus first interactive element inside drawer
      const timer = setTimeout(() => {
        if (mobileDrawerRef.current) {
          const focusables = mobileDrawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length > 0) {
            focusables[0].focus();
          }
        }
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          return;
        }

        if (e.key === 'Tab' && mobileDrawerRef.current) {
          const focusables = Array.from(
            mobileDrawerRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          );

          if (focusables.length === 0) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      // Return focus to menu button when closed
      if (wasMobileMenuOpen.current) {
        menuButtonRef.current?.focus();
        wasMobileMenuOpen.current = false;
      }
    }
  }, [mobileMenuOpen]);

  /* =====================================================
     Magnetic Hover for Primary CTA (Desktop Fine-Pointer Only,
     Disabled on Touch & under prefers-reduced-motion)
  ===================================================== */

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  /* =====================================================
     Shared Control Button Styling (44px touch targets)
  ===================================================== */

  const controlButton = `
    flex
    min-h-[44px]
    min-w-[44px]
    h-11
    w-11
    shrink-0
    cursor-pointer
    items-center
    justify-center
    rounded-xl
    border
    border-[var(--theme-border)]
    bg-[var(--theme-surface)]
    text-[var(--theme-text-muted)]
    shadow-sm
    transition-all
    duration-200

    hover:-translate-y-0.5
    hover:border-[var(--theme-accent)]/50
    hover:bg-[var(--theme-background-soft)]
    hover:text-[var(--theme-text)]

    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-[var(--theme-accent)]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[var(--theme-background)]
  `;

  return (
    <>
      {/* =================================================
          Scroll Progress Indicator
      ================================================= */}
      <div
        className="
          pointer-events-none
          fixed
          left-0
          right-0
          top-0
          z-[70]
          h-[2px]
          bg-transparent
        "
        aria-hidden="true"
      >
        <div
          className="
            h-full
            bg-[var(--theme-accent)]
            transition-[width]
            duration-150
            ease-out
          "
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* =================================================
          Header Container
      ================================================= */}
      <header
        className={`
          fixed
          left-0
          right-0
          top-0
          z-50
          transition-all
          duration-300
          ${
            isScrolled
              ? `
                border-b
                border-[var(--theme-border)]
                bg-[var(--theme-background)]/85
                shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                backdrop-blur-xl
              `
              : `
                border-b
                border-transparent
                bg-transparent
              `
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-20
            max-w-7xl
            items-center
            justify-between
            gap-3
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* =================================================
              Brand
          ================================================= */}
          <Link
            to="/"
            aria-label={`Go to home page - ${profile.name}`}
            className="
              group
              flex
              min-h-[44px]
              min-w-0
              shrink-0
              items-center
              gap-3
              rounded-xl
              pr-2
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--theme-accent)]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[var(--theme-background)]
            "
          >
            <div
              className="
                relative
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--theme-border)]
                bg-[var(--theme-surface)]
                text-[var(--theme-accent)]
                shadow-sm
                transition-all
                duration-200
                group-hover:border-[var(--theme-accent)]/60
                group-hover:-translate-y-0.5
              "
            >
              <GraduationCap className="h-5 w-5" />

              <span
                aria-hidden="true"
                className="
                  absolute
                  -bottom-0.5
                  -right-0.5
                  h-2.5
                  w-2.5
                  rounded-full
                  border-2
                  border-[var(--theme-background)]
                  bg-[var(--theme-accent)]
                "
              />
            </div>

            <div className="min-w-0">
              <span
                className="
                  block
                  max-w-[155px]
                  truncate
                  font-display
                  text-base
                  font-semibold
                  tracking-tight
                  text-[var(--theme-text)]
                  transition-colors
                  group-hover:text-[var(--theme-accent)]
                  sm:max-w-none
                  sm:text-lg
                "
              >
                {profile.name}
              </span>

              <span
                className="
                  hidden
                  truncate
                  font-mono
                  text-[9.5px]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-[var(--theme-text-muted)]
                  sm:block
                "
              >
                {profile.professionalTitle}
              </span>
            </div>
          </Link>

          {/* =================================================
              Desktop Navigation (7 Dedicated Pages)
          ================================================= */}
          <nav
            className="
              hidden
              items-center
              gap-1
              rounded-full
              border
              border-[var(--theme-border)]
              bg-[var(--theme-surface)]/75
              p-1.5
              shadow-sm
              backdrop-blur-md
              lg:flex
            "
            aria-label="Main Navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `
                  relative
                  flex
                  min-h-[36px]
                  items-center
                  gap-1.5
                  rounded-full
                  px-3.5
                  py-1.5
                  font-sans
                  text-xs
                  font-medium
                  tracking-wide
                  transition-all
                  duration-200
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--theme-accent)]

                  ${
                    isActive
                      ? `
                        bg-[var(--theme-primary)]/15
                        text-[var(--theme-accent)]
                        font-semibold
                        shadow-xs
                      `
                      : `
                        text-[var(--theme-text-secondary)]
                        hover:bg-[var(--theme-background-soft)]
                        hover:text-[var(--theme-text)]
                      `
                  }
                `}
              >
                {item.icon && (
                  <span className="opacity-80 transition-opacity group-hover:opacity-100">
                    {item.icon}
                  </span>
                )}

                <span>{item.label}</span>

                {/* Animated underline indicator */}
                <span
                  aria-hidden="true"
                  className={`
                    absolute
                    bottom-1
                    left-3
                    right-3
                    h-[2px]
                    rounded-full
                    bg-[var(--theme-accent)]
                    transition-all
                    duration-200
                    ${
                      location.pathname === item.path ||
                      (item.path === '/' && location.pathname === '')
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-75'
                    }
                  `}
                />
              </NavLink>
            ))}
          </nav>

          {/* =================================================
              Actions Bar
          ================================================= */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Ask AI Trigger */}
            <button
              type="button"
              onClick={onOpenAssistant}
              className="
                group
                hidden
                min-h-[44px]
                cursor-pointer
                items-center
                gap-2
                rounded-xl
                border
                border-[var(--theme-border)]
                bg-[var(--theme-surface)]
                px-3.5
                py-2
                text-xs
                font-medium
                text-[var(--theme-text)]
                shadow-xs
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[var(--theme-accent)]/50
                hover:bg-[var(--theme-background-soft)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--theme-accent)]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--theme-background)]
                sm:flex
              "
              aria-label="Ask Portfolio AI assistant about Abubakar's projects and coursework"
              title="Ask Portfolio AI assistant"
            >
              <Sparkles
                className="
                  h-4
                  w-4
                  text-[var(--theme-accent)]
                  transition-transform
                  duration-200
                  group-hover:scale-110
                "
              />
              <span className="hidden md:inline">
                Ask Portfolio AI
              </span>
            </button>

            {/* View CV Trigger (Primary CTA with magnetic desktop feel) */}
            <button
              type="button"
              onClick={onOpenResume}
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={handleCtaMouseLeave}
              style={{
                transform: `translate(${ctaOffset.x}px, ${ctaOffset.y}px)`,
              }}
              className="
                group
                flex
                min-h-[44px]
                cursor-pointer
                items-center
                gap-2
                rounded-xl
                border
                border-[var(--theme-primary-light)]/40
                bg-[var(--theme-primary)]
                px-4
                py-2.5
                font-sans
                text-xs
                font-semibold
                text-white
                shadow-sm
                transition-transform
                duration-150
                ease-out
                hover:shadow-md
                hover:border-[var(--theme-accent)]/70
                active:scale-[0.98]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--theme-accent)]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--theme-background)]
              "
              aria-label="View academic resume and curriculum vitae"
              title="View CV"
            >
              <FileText className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" />
              <span>View CV</span>
              <ArrowUpRight className="hidden h-3 w-3 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:inline" />
            </button>

            {/* Theme Switcher */}
            <ThemeSwitcher
              theme={theme}
              mode={mode}
              light={light}
              onThemeChange={onThemeChange}
              onLightChange={onLightChange}
              onModeChange={onModeChange}
            />

            {/* Portfolio Customizer Trigger (if enabled) */}
            {onOpenCustomize && (
              <button
                type="button"
                onClick={onOpenCustomize}
                className={controlButton}
                aria-label="Customize portfolio content and metrics"
                title="Customize portfolio"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            )}

            {/* Mobile Menu Toggle Button (44px target) */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className={`
                ${controlButton}
                lg:hidden
              `}
              aria-label={
                mobileMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-panel"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-[var(--theme-text)]" />
              ) : (
                <Menu className="h-5 w-5 text-[var(--theme-text)]" />
              )}
            </button>
          </div>
        </div>

        {/* =================================================
            Accessible Mobile Navigation Drawer
        ================================================= */}
        {mobileMenuOpen && (
          <div
            ref={mobileDrawerRef}
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="
              max-h-[calc(100vh-5rem)]
              overflow-y-auto
              overscroll-contain
              border-t
              border-[var(--theme-border)]
              bg-[var(--theme-background)]/95
              px-4
              pb-6
              pt-3.5
              shadow-[0_20px_40px_rgba(0,0,0,0.4)]
              backdrop-blur-2xl
              lg:hidden
            "
          >
            {/* Student Profile Card Snapshot */}
            <div
              className="
                mb-3.5
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-[var(--theme-border)]
                bg-[var(--theme-surface)]
                p-3
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--theme-primary)]
                  text-white
                "
              >
                <GraduationCap className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-[var(--theme-text)]">
                  {profile.name}
                </p>
                <p className="truncate font-mono text-[10px] text-[var(--theme-text-muted)]">
                  {profile.professionalTitle}
                </p>
              </div>

              <span
                className="
                  ml-auto
                  flex
                  shrink-0
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-emerald-500/30
                  bg-emerald-500/10
                  px-2.5
                  py-1
                  text-[10px]
                  font-medium
                  text-emerald-400
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            </div>

            {/* Mobile Nav Links (All 7 links with 44px+ touch targets) */}
            <nav
              className="grid grid-cols-2 gap-2"
              aria-label="Mobile Menu Links"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex
                    min-h-[48px]
                    items-center
                    justify-between
                    rounded-xl
                    border
                    px-3.5
                    py-3
                    text-xs
                    font-medium
                    transition-all
                    duration-200
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--theme-accent)]

                    ${
                      isActive
                        ? `
                          border-[var(--theme-accent)]/50
                          bg-[var(--theme-primary)]/15
                          text-[var(--theme-accent)]
                          font-semibold
                          shadow-xs
                        `
                        : `
                          border-[var(--theme-border)]
                          bg-[var(--theme-surface)]
                          text-[var(--theme-text-secondary)]
                          hover:border-[var(--theme-accent)]/40
                          hover:bg-[var(--theme-background-soft)]
                          hover:text-[var(--theme-text)]
                        `
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>

                  <ChevronRight className="h-3.5 w-3.5 text-[var(--theme-text-muted)]" />
                </NavLink>
              ))}
            </nav>

            {/* Mobile Quick Action Buttons */}
            <div className="mt-4 space-y-2.5 border-t border-[var(--theme-border)] pt-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="
                    flex
                    min-h-[48px]
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[var(--theme-primary)]
                    px-3
                    py-3
                    text-xs
                    font-semibold
                    text-white
                    shadow-sm
                    transition-all
                    active:scale-[0.98]
                    hover:bg-[var(--theme-primary-light)]
                  "
                >
                  <FileText className="h-4 w-4" />
                  <span>View CV</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAssistant();
                  }}
                  className="
                    flex
                    min-h-[48px]
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[var(--theme-border)]
                    bg-[var(--theme-surface)]
                    px-3
                    py-3
                    text-xs
                    font-semibold
                    text-[var(--theme-text)]
                    shadow-sm
                    transition-all
                    active:scale-[0.98]
                    hover:border-[var(--theme-accent)]/50
                  "
                >
                  <Sparkles className="h-4 w-4 text-[var(--theme-accent)]" />
                  <span>Ask AI</span>
                </button>
              </div>

              {/* Theme selector snapshot row */}
              <div
                className="
                  flex
                  min-h-[48px]
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-[var(--theme-border)]
                  bg-[var(--theme-surface)]
                  px-3.5
                  py-2
                "
              >
                <div>
                  <p className="font-sans text-[11px] font-semibold text-[var(--theme-text)]">
                    Color Palette & Theme
                  </p>
                  <p className="font-mono text-[9px] text-[var(--theme-text-muted)]">
                    {mode === 'dark'
                      ? theme === 'burgundy'
                        ? 'Obsidian & Champagne'
                        : theme === 'navy'
                          ? 'Navy & Ice Blue'
                          : theme === 'charcoal'
                            ? 'Charcoal & Amber'
                            : theme === 'grey'
                              ? 'Grey & Fawn'
                              : 'Silver & Gold'
                      : light}
                  </p>
                </div>

                <ThemeSwitcher
                  theme={theme}
                  mode={mode}
                  light={light}
                  onThemeChange={onThemeChange}
                  onLightChange={onLightChange}
                  onModeChange={onModeChange}
                />
              </div>
            </div>

            {/* Mobile Footer Hint */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-[var(--theme-text-muted)]">
              <span>Explore the portfolio</span>
              <ChevronRight className="h-3 w-3 text-[var(--theme-accent)]" />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
