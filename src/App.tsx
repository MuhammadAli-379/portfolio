import React, {
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Sparkles } from 'lucide-react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import { loadSavedPortfolioData } from './data/portfolioData';
import { PortfolioData } from './types/portfolio';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './pages/About';
import {
  ThemeId,
  ThemeMode,
  LightId,
} from './components/ThemeSwitcher';

/* =====================================================
   Lazy-loaded pages / sections
===================================================== */

const SkillsSection = lazy(() =>
  import('./pages/SkillsSection').then((m) => ({
    default: m.SkillsSection,
  }))
);

const ProjectsSection = lazy(() =>
  import('./pages/ProjectsSection').then((m) => ({
    default: m.ProjectsSection,
  }))
);

const EducationSection = lazy(() =>
  import('./pages/EducationSection').then((m) => ({
    default: m.EducationSection,
  }))
);

const ContactSection = lazy(() =>
  import('./pages/ContactSection').then((m) => ({
    default: m.ContactSection,
  }))
);

const AnalyticsMindset = lazy(() =>
  import('./pages/AnalyticsMindset').then((m) => ({
    default: m.AnalyticsMindset,
  }))
);

const ExperienceSection = lazy(() =>
  import('./pages/ExperienceSection').then((m) => ({
    default: m.ExperienceSection,
  }))
);

const AnalyticsPlayground = lazy(() =>
  import('./components/AnalyticsPlayground').then((m) => ({
    default: m.AnalyticsPlayground,
  }))
);

const CertificationsSection = lazy(() =>
  import('./components/CertificationsSection').then((m) => ({
    default: m.CertificationsSection,
  }))
);

const AchievementsSection = lazy(() =>
  import('./components/AchievementsSection').then((m) => ({
    default: m.AchievementsSection,
  }))
);

const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({
    default: m.Footer,
  }))
);

const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({
    default: m.ResumeModal,
  }))
);

const AskPortfolioModal = lazy(() =>
  import('./components/AskPortfolioModal').then((m) => ({
    default: m.AskPortfolioModal,
  }))
);

const EditDataDrawer = lazy(() =>
  import('./components/EditDataDrawer').then((m) => ({
    default: m.EditDataDrawer,
  }))
);

/* =====================================================
   Storage
===================================================== */

const STORAGE_KEYS = {
  theme: 'bda_portfolio_theme',
  mode: 'bda_portfolio_mode',
  light: 'bda_portfolio_light',
} as const;

const VALID_THEMES: ThemeId[] = [
  'burgundy',
  'navy',
  'charcoal',
  'grey',
  'silver',
];

const DEFAULT_THEME: ThemeId = 'burgundy';
const DEFAULT_MODE: ThemeMode = 'light';
const DEFAULT_LIGHT: LightId = 'analyst-slate';

function readStorage<T extends string>(
  key: string,
  fallback: T,
  valid?: T[]
): T {
  try {
    const value = localStorage.getItem(key) as T | null;

    if (value && (!valid || valid.includes(value))) {
      return value;
    }

    return fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors
  }
}

/* =====================================================
   Error Boundary
===================================================== */

class SectionErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: unknown) {
    console.error('Section failed to render:', error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

/* =====================================================
   Scroll Progress
===================================================== */

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = document.documentElement;

      const max = scrollHeight - clientHeight;

      setProgress(
        max > 0
          ? (scrollTop / max) * 100
          : 0
      );
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-0.5">
      <div
        className="h-full bg-[var(--theme-accent)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* =====================================================
   Back To Top
===================================================== */

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 480);
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
      aria-label="Back to top"
      className="
        fixed bottom-4 left-4 z-40
        flex h-10 w-10 items-center justify-center
        rounded-full
        border border-[var(--theme-border)]
        bg-[var(--theme-surface)]
        text-[var(--theme-text)]
        shadow-lg
      "
    >
      ↑
    </button>
  );
}

/* =====================================================
   Main Application
===================================================== */

function AppContent() {
  const [data, setData] =
    useState<PortfolioData>(
      loadSavedPortfolioData
    );

  const [theme, setTheme] =
    useState<ThemeId>(() =>
      readStorage(
        STORAGE_KEYS.theme,
        DEFAULT_THEME,
        VALID_THEMES
      )
    );

  const [mode, setMode] =
    useState<ThemeMode>(() =>
      readStorage(
        STORAGE_KEYS.mode,
        DEFAULT_MODE
      )
    );

  const [light, setLight] =
    useState<LightId>(() =>
      readStorage(
        STORAGE_KEYS.light,
        DEFAULT_LIGHT
      )
    );

  const [isResumeOpen, setIsResumeOpen] =
    useState(false);

  const [isAssistantOpen, setIsAssistantOpen] =
    useState(false);

  const [isCustomizeOpen, setIsCustomizeOpen] =
    useState(false);

  /* ===================================================
     Theme
  =================================================== */

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-theme', theme);
    root.setAttribute('data-mode', mode);
    root.setAttribute('data-light', light);

    root.classList.remove('dark', 'light');

    root.style.colorScheme = mode;

    writeStorage(
      STORAGE_KEYS.theme,
      theme
    );

    writeStorage(
      STORAGE_KEYS.mode,
      mode
    );

    writeStorage(
      STORAGE_KEYS.light,
      light
    );
  }, [theme, mode, light]);

  /* ===================================================
     Metadata
  =================================================== */

  useEffect(() => {
    const name =
      data.profile?.name || 'Portfolio';

    document.title =
      `${name} | Business Data Analyst | COMSATS Islamabad`;

    return () => {
      document.title =
        'Business Data Analyst Portfolio';
    };
  }, [data.profile?.name]);

  /* ===================================================
     Actions
  =================================================== */

  const openResume = () =>
    setIsResumeOpen(true);

  const openAssistant = () =>
    setIsAssistantOpen(true);

  const openCustomizer = () =>
    setIsCustomizeOpen(true);

  const sectionFallback = useMemo(
    () => (
      <div
        aria-hidden="true"
        className="h-32 w-full"
      />
    ),
    []
  );

  return (
    <div
      className="
        min-h-screen overflow-x-hidden
        bg-[var(--theme-background)]
        text-[var(--theme-text)]
        transition-colors duration-300
      "
    >
      <ScrollProgressBar />

      <Navbar
        profile={data.profile}
        theme={theme}
        onThemeChange={setTheme}
        mode={mode}
        onModeChange={setMode}
        light={light}
        onLightChange={setLight}
        onOpenResume={openResume}
        onOpenAssistant={openAssistant}
        onOpenCustomize={openCustomizer}
      />

      <main
        id="main-content"
        className="
          relative isolate
          overflow-hidden
          bg-transparent
        "
      >
        <Routes>

          {/* ================= HOME ================= */}

          <Route
            path="/"
            element={
              <>
                <Hero
                  profile={data.profile}
                  onOpenResume={openResume}
                  onOpenAssistant={openAssistant}
                />

                <Suspense fallback={sectionFallback}>
                  <SectionErrorBoundary>
                    <AnalyticsMindset
                      workflow={data.workflow}
                    />
                  </SectionErrorBoundary>

                  <SectionErrorBoundary>
                    <AnalyticsPlayground />
                  </SectionErrorBoundary>
                </Suspense>
              </>
            }
          />

          {/* ================= ABOUT ================= */}

          <Route
            path="/about"
            element={
              <About
                profile={data.profile}
              />
            }
          />

          {/* ================= SKILLS ================= */}

          <Route
            path="/skills"
            element={
              <Suspense fallback={sectionFallback}>
                <SectionErrorBoundary>
                  <SkillsSection
                    skills={data.skills}
                  />
                </SectionErrorBoundary>
              </Suspense>
            }
          />

          {/* ================= PROJECTS ================= */}

          <Route
            path="/projects"
            element={
              <Suspense fallback={sectionFallback}>
                <SectionErrorBoundary>
                  <ProjectsSection
                    projects={data.projects}
                  />
                </SectionErrorBoundary>
              </Suspense>
            }
          />

          {/* ================= EDUCATION ================= */}

          <Route
            path="/education"
            element={
              <Suspense fallback={sectionFallback}>
                <SectionErrorBoundary>
                  <EducationSection
                    education={data.education}
                  />
                </SectionErrorBoundary>

                <SectionErrorBoundary>
                  <ExperienceSection
                    experienceStatement={
                      data.experienceStatement
                    }
                  />
                </SectionErrorBoundary>

                <SectionErrorBoundary>
                  <CertificationsSection
                    notice={
                      data.certificationsNotice
                    }
                  />
                </SectionErrorBoundary>

                <SectionErrorBoundary>
                  <AchievementsSection
                    notice={
                      data.achievementsNotice
                    }
                  />
                </SectionErrorBoundary>
              </Suspense>
            }
          />

          {/* ================= CONTACT ================= */}

          <Route
            path="/contact"
            element={
              <Suspense fallback={sectionFallback}>
                <SectionErrorBoundary>
                  <ContactSection
                    profile={data.profile}
                  />
                </SectionErrorBoundary>
              </Suspense>
            }
          />

        </Routes>
      </main>

      {/* ================= FOOTER ================= */}

      <Suspense fallback={null}>
        <Footer
          profile={data.profile}
        />
      </Suspense>

      <BackToTopButton />

      {/* ================= AI BUTTON ================= */}

      <div
        className="
          fixed bottom-4 right-4 z-40
          sm:bottom-6 sm:right-6
        "
      >
        <button
          type="button"
          onClick={openAssistant}
          className="
            group inline-flex items-center gap-2
            rounded-full
            border border-[var(--theme-primary-light)]
            bg-[var(--theme-primary)]
            px-4 py-2.5
            text-white
            shadow-lg
            transition-all duration-200
            hover:-translate-y-0.5
          "
        >
          <span
            className="
              flex h-7 w-7
              items-center justify-center
              rounded-full
              border border-[var(--theme-accent)]/25
              bg-[var(--theme-accent)]/10
            "
          >
            <Sparkles
              className="
                h-3.5 w-3.5
                text-[var(--theme-accent)]
              "
            />
          </span>

          <span className="text-xs font-semibold">
            Ask Portfolio AI
          </span>
        </button>
      </div>

      {/* ================= MODALS ================= */}

      <Suspense fallback={null}>

        {isResumeOpen && (
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() =>
              setIsResumeOpen(false)
            }
            data={data}
          />
        )}

        {isAssistantOpen && (
          <AskPortfolioModal
            isOpen={isAssistantOpen}
            onClose={() =>
              setIsAssistantOpen(false)
            }
            data={data}
          />
        )}

        {isCustomizeOpen && (
          <EditDataDrawer
            isOpen={isCustomizeOpen}
            onClose={() =>
              setIsCustomizeOpen(false)
            }
            data={data}
            onUpdateData={setData}
          />
        )}

      </Suspense>
    </div>
  );
}

/* =====================================================
   Router
===================================================== */

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
