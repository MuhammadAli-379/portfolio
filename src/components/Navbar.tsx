import React, { useEffect, useState } from 'react';
import {
  Menu,
  X,
  FileText,
  Sparkles,
  GraduationCap,
  SlidersHorizontal,
  ChevronRight,
  Home,
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
  const [isScrolled, setIsScrolled] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [scrollProgress, setScrollProgress] =
    useState(0);

  const location = useLocation();

  /* =====================================================
     Navigation Items
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
    },
    {
      label: 'Skills',
      path: '/skills',
    },
    {
      label: 'Projects',
      path: '/projects',
    },
    {
      label: 'Education',
      path: '/education',
    },
    {
      label: 'Contact',
      path: '/contact',
    },
  ];

  /* =====================================================
     Scroll State
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 24);

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (documentHeight > 0) {
        setScrollProgress(
          Math.min(
            (scrollY / documentHeight) * 100,
            100
          )
        );
      } else {
        setScrollProgress(0);
      }
    };

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, [location.pathname]);

  /* =====================================================
     Close Mobile Menu On Route Change
  ===================================================== */

  useEffect(() => {
    setMobileMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [location.pathname]);

  /* =====================================================
     Shared Button Styling
  ===================================================== */

  const controlButton = `
    flex
    h-9
    w-9
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

    hover:-translate-y-px
    hover:border-[var(--theme-primary-light)]
    hover:bg-[var(--theme-surface-soft)]
    hover:text-[var(--theme-primary-light)]

    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-[var(--theme-accent)]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[var(--theme-background)]
  `;

  return (
    <>
      {/* =================================================
          Scroll Progress
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
            bg-gradient-to-r
            from-[var(--theme-primary)]
            via-[var(--theme-primary-light)]
            to-[var(--theme-accent)]
            transition-[width]
            duration-100
          "
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      {/* =================================================
          Header
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
                bg-[var(--theme-background)]/90
                shadow-[0_8px_30px_rgba(0,0,0,0.12)]
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
            h-[72px]
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
            aria-label="Go to Home"
            className="
              group
              flex
              min-w-0
              shrink-0
              items-center
              gap-3
            "
          >
            <div
              className="
                relative
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--theme-primary)]
                text-white
                shadow-[0_5px_15px_rgba(0,0,0,0.16)]
                transition-all
                duration-200
                group-hover:-translate-y-px
              "
            >
              <GraduationCap
                className="h-[17px] w-[17px]"
              />

              <span
                aria-hidden="true"
                className="
                  absolute
                  -bottom-1
                  -right-1
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
                  max-w-[150px]
                  truncate
                  text-sm
                  font-bold
                  tracking-tight
                  text-[var(--theme-text)]
                  transition-colors
                  group-hover:text-[var(--theme-primary-light)]
                  sm:max-w-none
                  sm:text-[15px]
                "
              >
                {profile.name}
              </span>

              <span
                className="
                  hidden
                  truncate
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.15em]
                  text-[var(--theme-text-muted)]
                  sm:block
                "
              >
                {profile.professionalTitle}
              </span>
            </div>
          </Link>

          {/* =================================================
              Desktop Navigation
          ================================================= */}

          <nav
            className="
              hidden
              items-center
              gap-0.5
              rounded-2xl
              border
              border-[var(--theme-border)]
              bg-[var(--theme-surface)]/80
              p-1
              backdrop-blur-sm
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
                  items-center
                  gap-1.5
                  rounded-xl
                  px-3
                  py-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.1em]
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? `
                        bg-[var(--theme-background)]
                        text-[var(--theme-primary-light)]
                        shadow-sm
                      `
                      : `
                        text-[var(--theme-text-muted)]
                        hover:bg-[var(--theme-background-soft)]
                        hover:text-[var(--theme-primary-light)]
                      `
                  }
                `}
              >
                {item.icon && item.icon}

                <span>
                  {item.label}
                </span>

                {/* Active underline */}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-0.5
                    left-1/2
                    h-[2px]
                    w-4
                    -translate-x-1/2
                    rounded-full
                    bg-[var(--theme-accent)]
                    opacity-0
                    transition-opacity
                    duration-200
                  "
                  data-active="underline"
                />
              </NavLink>
            ))}
          </nav>

          {/* =================================================
              Actions
          ================================================= */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
            "
          >
            {/* Assistant */}

            <button
              type="button"
              onClick={onOpenAssistant}
              className="
                hidden
                cursor-pointer
                items-center
                gap-1.5
                rounded-xl
                border
                border-transparent
                bg-[#0F172A]
                px-3
                py-2
                text-[10px]
                font-semibold
                text-white
                shadow-[0_2px_10px_rgba(15,23,42,0.18)]
                transition-all
                duration-200
                hover:-translate-y-px
                hover:shadow-[0_4px_18px_rgba(37,99,235,0.35)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--theme-accent)]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--theme-background)]
                sm:flex
              "
              aria-label="Ask Portfolio Assistant"
              title="Ask Portfolio Assistant"
            >
              <Sparkles
                className="
                  h-3.5
                  w-3.5
                  text-[#2563EB]
                "
              />

              <span className="hidden md:inline">
                Ask Portfolio AI
              </span>
            </button>

            {/* CV */}

            <button
              type="button"
              onClick={onOpenResume}
              className="
                flex
                cursor-pointer
                items-center
                gap-1.5
                rounded-xl
                bg-[var(--theme-primary)]
                px-3.5
                py-2
                text-[10px]
                font-bold
                text-white
                shadow-[0_5px_15px_rgba(0,0,0,0.15)]
                transition-all
                duration-200
                hover:-translate-y-px
                hover:bg-[var(--theme-primary-light)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--theme-accent)]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[var(--theme-background)]
              "
              aria-label="View Academic Resume"
              title="View Academic Resume"
            >
              <FileText className="h-3.5 w-3.5" />

              <span className="hidden sm:inline">
                View CV
              </span>
            </button>

            {/* Theme */}

            <ThemeSwitcher
              theme={theme}
              mode={mode}
              light={light}
              onThemeChange={onThemeChange}
              onLightChange={onLightChange}
              onModeChange={onModeChange}
            />

            {/* Customize */}

            {onOpenCustomize && (
              <button
                type="button"
                onClick={onOpenCustomize}
                className={controlButton}
                aria-label="Customize portfolio"
                title="Customize portfolio"
              >
                <SlidersHorizontal
                  className="h-[17px] w-[17px]"
                />
              </button>
            )}

            {/* Mobile Menu */}

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(
                  (open) => !open
                )
              }
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
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* =================================================
            Mobile Menu
        ================================================= */}

        {mobileMenuOpen && (
          <div
            className="
              border-t
              border-[var(--theme-border)]
              bg-[var(--theme-background)]/98
              px-4
              pb-5
              pt-3
              shadow-[0_15px_35px_rgba(0,0,0,0.12)]
              backdrop-blur-xl
              lg:hidden
            "
          >
            {/* Profile */}

            <div
              className="
                mb-3
                flex
                items-center
                gap-3
                border-b
                border-[var(--theme-border)]
                pb-4
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--theme-primary)]
                  text-white
                "
              >
                <GraduationCap className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-xs
                    font-bold
                    text-[var(--theme-text)]
                  "
                >
                  {profile.name}
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[10px]
                    text-[var(--theme-text-muted)]
                  "
                >
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
                  bg-[var(--theme-primary)]/10
                  px-2.5
                  py-1
                  text-[9px]
                  font-semibold
                  text-[var(--theme-primary-light)]
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Available
              </span>
            </div>

            {/* Mobile Links */}

            <nav
              className="grid grid-cols-2 gap-1.5"
              aria-label="Mobile Navigation"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    px-3.5
                    py-3
                    text-xs
                    font-semibold
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? `
                          border-[var(--theme-primary)]/20
                          bg-[var(--theme-primary)]/10
                          text-[var(--theme-primary-light)]
                        `
                        : `
                          border-transparent
                          text-[var(--theme-text-muted)]
                          hover:border-[var(--theme-border)]
                          hover:bg-[var(--theme-surface-soft)]
                          hover:text-[var(--theme-primary-light)]
                        `
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}

                    {item.label}
                  </span>

                  <ChevronRight
                    className="
                      h-3.5
                      w-3.5
                      opacity-50
                    "
                  />
                </NavLink>
              ))}
            </nav>

            {/* Mobile Actions */}

            <div
              className="
                mt-4
                border-t
                border-[var(--theme-border)]
                pt-4
              "
            >
              {/* Theme */}

              <div
                className="
                  mb-2
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-[var(--theme-border)]
                  bg-[var(--theme-surface)]
                  px-3
                  py-2.5
                "
              >
                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      text-[var(--theme-text)]
                    "
                  >
                    Color Theme
                  </p>

                  <p
                    className="
                      text-[9px]
                      text-[var(--theme-text-muted)]
                    "
                  >
                    {theme === 'burgundy'
                      ? 'Burgundy & Gold'
                      : theme === 'navy'
                        ? 'Navy & Light Blue'
                        : theme === 'charcoal'
                          ? 'Charcoal & Slate'
                          : theme === 'grey'
                            ? 'Grey & Silver'
                            : 'Silver & Gold'}
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

              <div className="grid grid-cols-2 gap-2">
                {/* Mobile CV */}

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[var(--theme-primary)]
                    px-3
                    py-3
                    text-xs
                    font-bold
                    text-white
                    transition-colors
                    hover:bg-[var(--theme-primary-light)]
                  "
                >
                  <FileText className="h-3.5 w-3.5" />

                  View CV
                </button>

                {/* Mobile Assistant */}

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAssistant();
                  }}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-transparent
                    bg-[#0F172A]
                    px-3
                    py-3
                    text-xs
                    font-bold
                    text-white
                    transition-all
                    hover:shadow-[0_4px_18px_rgba(37,99,235,0.35)]
                  "
                >
                  <Sparkles
                    className="
                      h-3.5
                      w-3.5
                      text-[#2563EB]
                    "
                  />

                  Ask Portfolio AI
                </button>
              </div>
            </div>

            {/* Hint */}

            <div
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-1.5
                text-[9px]
                text-[var(--theme-text-muted)]
              "
            >
              <span>
                Explore the portfolio
              </span>

              <ChevronRight
                className="
                  h-3
                  w-3
                  text-[var(--theme-accent)]
                "
              />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
