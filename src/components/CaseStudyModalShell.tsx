import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink } from 'lucide-react';

export interface TabItem {
  id: string;
  label: React.ReactNode;
}

export interface CaseStudyModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
  projectNumber: string;
  category: string;
  title: string;
  subtitle?: string;
  metadataText?: string;
  liveDemoUrl?: string;
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  subHeader?: React.ReactNode;
  children: React.ReactNode;
}

export const CaseStudyModalShell: React.FC<CaseStudyModalShellProps> = ({
  isOpen,
  onClose,
  projectNumber,
  category,
  title,
  subtitle,
  metadataText,
  liveDemoUrl,
  tabs,
  activeTab,
  onTabChange,
  subHeader,
  children,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [tabContentKey, setTabContentKey] = useState(activeTab);
  const [isFadingTab, setIsFadingTab] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

  // Synchronize state with body attribute to hide floating elements (Ask AI button)
  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute('data-modal-open', 'true');
    } else {
      document.body.removeAttribute('data-modal-open');
    }
    return () => {
      document.body.removeAttribute('data-modal-open');
    };
  }, [isOpen]);

  // Handle open / close animation sequence & unmount
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement | null;
      setIsRendered(true);
      const frame = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(frame);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Robust body scroll lock preserving exact scroll position (no layout jump)
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const originalStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = originalStyles.overflow;
      document.body.style.position = originalStyles.position;
      document.body.style.top = originalStyles.top;
      document.body.style.width = originalStyles.width;
      window.scrollTo(0, scrollY);

      // Return focus to exact opener button
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  // Handle Escape key and focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isRendered) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isRendered, handleKeyDown]);

  // Tab change with quick opacity crossfade
  const handleTabSelect = (newTabId: string) => {
    if (newTabId === activeTab) return;
    setIsFadingTab(true);
    setTimeout(() => {
      onTabChange(newTabId);
      setTabContentKey(newTabId);
      setIsFadingTab(false);
    }, 100);
  };

  // Keyboard navigation for tab bar (ArrowLeft / ArrowRight / Home / End)
  const handleTabListKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    if (currentIndex === -1) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      handleTabSelect(tabs[nextIndex].id);
      const nextTabButton = tabListRef.current?.querySelector<HTMLElement>(
        `#tab-${tabs[nextIndex].id}`
      );
      nextTabButton?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      handleTabSelect(tabs[prevIndex].id);
      const prevTabButton = tabListRef.current?.querySelector<HTMLElement>(
        `#tab-${tabs[prevIndex].id}`
      );
      prevTabButton?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      handleTabSelect(tabs[0].id);
      const firstTabButton = tabListRef.current?.querySelector<HTMLElement>(
        `#tab-${tabs[0].id}`
      );
      firstTabButton?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      handleTabSelect(tabs[tabs.length - 1].id);
      const lastTabButton = tabListRef.current?.querySelector<HTMLElement>(
        `#tab-${tabs[tabs.length - 1].id}`
      );
      lastTabButton?.focus();
    }
  };

  if (!isRendered) return null;

  const modalMarkup = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center
        overflow-y-auto sm:p-4 md:p-6
        transition-opacity duration-200 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.74)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Centered Panel Desktop, Fullscreen Sheet Mobile (Strict 1100px Max-Width Cap) */}
      <div
        ref={modalRef}
        className={`
          relative flex flex-col w-full
          max-w-[1100px] mx-auto
          h-full sm:h-auto sm:max-h-[92vh]
          rounded-none sm:rounded-xl
          border-0 sm:border border-[var(--theme-border)]
          bg-[var(--theme-surface)]
          text-[var(--theme-text)]
          shadow-none overflow-hidden
          transition-all duration-200 ease-out
          ${
            isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 sm:scale-[0.98]'
          }
        `}
        style={{
          maxWidth: '1100px',
          width: '100%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= STICKY HEADER (Full 24px top padding, never clipped) ================= */}
        <header className="sticky top-0 z-20 flex flex-col border-b border-[var(--theme-border)] bg-[var(--theme-surface)] shrink-0">
          <div className="flex items-start justify-between gap-4 pt-6 px-5 sm:px-8 pb-4">
            <div className="min-w-0 flex-1 space-y-1.5">
              {/* Mono Project Number + Category */}
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--theme-accent)] tracking-wider">
                <span>{projectNumber}</span>
                <span className="opacity-40" aria-hidden="true">/</span>
                <span>{category}</span>
              </div>

              {/* Title in Newsreader Serif */}
              <h2
                id="case-study-title"
                className="font-display text-xl sm:text-2xl lg:text-3xl font-normal leading-tight text-[var(--theme-text)] tracking-tight"
              >
                {title}
              </h2>

              {/* Metadata: Line 1 (Type/Semester) and Line 2 (Course/Focus, 12px, muted, max-w 68ch) */}
              <div className="pt-0.5 space-y-0.5">
                {subtitle && (
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs text-[var(--theme-text-secondary)] font-medium">
                    <span>{subtitle}</span>
                  </div>
                )}
                {metadataText && (
                  <p className="font-mono text-[12px] text-[var(--theme-text-muted)] max-w-[68ch] leading-relaxed">
                    {metadataText}
                  </p>
                )}
              </div>
            </div>

            {/* Header Right Actions: Live Demo (Desktop) & Close Button */}
            <div className="flex items-center gap-3 shrink-0 pt-0.5">
              {liveDemoUrl && (
                <a
                  href={liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo: ${title}`}
                  style={{
                    backgroundColor: 'var(--theme-accent)',
                    color: 'var(--theme-accent-contrast)',
                    borderColor: 'var(--theme-accent)',
                  }}
                  className="
                    hidden sm:inline-flex
                    btn-accent-primary
                    min-h-[44px]
                    items-center
                    justify-center
                    gap-2
                    rounded-[9px]
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    shadow-none
                    transition-all
                    duration-200
                    hover:brightness-110
                    active:scale-[0.98]
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--theme-accent)]
                  "
                >
                  <span style={{ color: 'var(--theme-accent-contrast)' }}>Live Demo</span>
                  <ExternalLink
                    className="h-3.5 w-3.5"
                    style={{ color: 'var(--theme-accent-contrast)' }}
                    aria-hidden="true"
                  />
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="
                  inline-flex
                  min-h-[44px]
                  min-w-[44px]
                  items-center
                  justify-center
                  rounded-[9px]
                  border
                  border-[var(--theme-border)]
                  bg-[var(--theme-surface)]
                  text-[var(--theme-text-muted)]
                  transition-colors
                  duration-200
                  hover:border-[var(--theme-accent)]
                  hover:bg-[var(--theme-background-soft)]
                  hover:text-[var(--theme-text)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--theme-accent)]
                  cursor-pointer
                "
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Optional Sub-Header Area (e.g. Pipeline tracker in Credit Risk, Company Dots in Financial Ratio) */}
          {subHeader && (
            <div className="border-t border-[var(--theme-border)] bg-[var(--theme-background-soft)]/50 px-5 sm:px-8 py-2.5">
              {subHeader}
            </div>
          )}

          {/* ================= STICKY TAB BAR (44px targets, horizontally scrollable on mobile) ================= */}
          <div className="relative border-t border-[var(--theme-border)] bg-[var(--theme-surface)]">
            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Case study sections"
              onKeyDown={handleTabListKeyDown}
              className="
                flex
                overflow-x-auto
                no-scrollbar
                px-4 sm:px-8
                gap-1 sm:gap-2
              "
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={`tabpanel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleTabSelect(tab.id)}
                    className={`
                      relative
                      inline-flex
                      min-h-[44px]
                      items-center
                      gap-2
                      px-3.5 sm:px-4
                      text-xs
                      font-medium
                      whitespace-nowrap
                      transition-colors
                      duration-150
                      cursor-pointer
                      focus:outline-none
                      focus-visible:text-[var(--theme-text)]
                      ${
                        isActive
                          ? 'text-[var(--theme-text)] font-semibold'
                          : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)]'
                      }
                    `}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--theme-accent)]"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* ================= SCROLLABLE CONTENT BODY (Thin neutral scrollbar) ================= */}
        <main
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className={`
            flex-1
            overflow-y-auto
            modal-scrollbar
            p-5 sm:p-7 lg:p-8
            space-y-6
            transition-opacity
            duration-100
            ${isFadingTab ? 'opacity-40' : 'opacity-100'}
          `}
        >
          {children}
        </main>

        {/* ================= MOBILE STICKY FOOTER CTA (390px safe area) ================= */}
        <footer className="sticky bottom-0 z-20 flex items-center justify-between border-t border-[var(--theme-border)] bg-[var(--theme-surface)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
          {liveDemoUrl ? (
            <a
              href={liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo: ${title}`}
              style={{
                backgroundColor: 'var(--theme-accent)',
                color: 'var(--theme-accent-contrast)',
                borderColor: 'var(--theme-accent)',
              }}
              className="
                btn-accent-primary
                w-full
                min-h-[44px]
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-[9px]
                px-4
                py-2.5
                text-xs
                font-semibold
                shadow-none
                transition-all
                duration-200
                hover:brightness-110
                active:scale-[0.98]
              "
            >
              <span style={{ color: 'var(--theme-accent-contrast)' }}>Live Demo</span>
              <ExternalLink
                className="h-3.5 w-3.5"
                style={{ color: 'var(--theme-accent-contrast)' }}
                aria-hidden="true"
              />
            </a>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full min-h-[44px] inline-flex items-center justify-center rounded-[9px] border border-[var(--theme-border)] bg-[var(--theme-surface)] text-xs font-semibold text-[var(--theme-text)]"
            >
              Close
            </button>
          )}
        </footer>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalMarkup, document.body)
    : modalMarkup;
};
