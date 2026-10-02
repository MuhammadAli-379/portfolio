import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';

export type ThemeId = 'burgundy' | 'navy' | 'charcoal' | 'grey' | 'silver';

export type ThemeMode = 'dark' | 'light';

export type LightId =
  | 'analyst-slate'
  | 'warm-sand'
  | 'pearl-bronze'
  | 'antique-ivory'
  | 'cool-platinum'
  | 'baby-pink';

interface ThemeSwitcherProps {
  theme: ThemeId;
  mode: ThemeMode;
  light: LightId;
  onThemeChange: (theme: ThemeId) => void;
  onModeChange: (mode: ThemeMode) => void;
  onLightChange: (light: LightId) => void;
}

const DARK_THEMES: { id: ThemeId; name: string }[] = [
  { id: 'burgundy', name: 'Burgundy & Black' },
  { id: 'navy', name: 'Navy & Light Blue' },
  { id: 'charcoal', name: 'Charcoal & Slate' },
  { id: 'grey', name: 'Grey & Silver' },
  { id: 'silver', name: 'Silver & Gold' },
];

const LIGHT_THEMES: { id: LightId; name: string }[] = [
  { id: 'analyst-slate', name: 'Analyst Slate (Navy & Blue)' },
  { id: 'warm-sand', name: 'Warm Sand' },
  { id: 'pearl-bronze', name: 'Pearl & Bronze' },
  { id: 'antique-ivory', name: 'Antique Ivory' },
  { id: 'cool-platinum', name: 'Cool Platinum' },
  { id: 'baby-pink', name: 'Baby Pink' },
];

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  theme,
  mode,
  light,
  onThemeChange,
  onModeChange,
  onLightChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const colors = useMemo(
    () => (mode === 'dark' ? DARK_THEMES : LIGHT_THEMES),
    [mode]
  );
  const activeId = mode === 'dark' ? theme : light;

  const handleSelect = (id: string) => {
    if (mode === 'dark') {
      onThemeChange(id as ThemeId);
    } else {
      onLightChange(id as LightId);
    }
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((c) => !c)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Change theme (currently ${mode} mode, ${mode === 'dark' ? theme : light})`}
        title={`${mode === 'dark' ? 'Dark' : 'Light'} theme`}
        className="
          group flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-xl
          border border-[var(--theme-border)]
          bg-[var(--theme-surface)]
          text-[var(--theme-text)]
          px-3 shadow-sm transition-all duration-200
          hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--theme-accent)]/50
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[var(--theme-accent)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--theme-background)]
        "
      >
        {mode === 'dark' ? (
          <Moon className="h-4 w-4 text-[var(--theme-accent)]" />
        ) : (
          <Sun className="h-4 w-4 text-[var(--theme-accent)]" />
        )}
        <ChevronDown
          className={`h-3.5 w-3.5 text-[var(--theme-text-secondary)] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="
            absolute right-0 top-[calc(100%+0.6rem)] z-50 w-64
            overflow-hidden rounded-2xl
            border border-[var(--theme-border)]
            bg-[var(--theme-surface)]
            text-[var(--theme-text)]
            p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            backdrop-blur-md
          "
        >
          {/* MODE */}
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--theme-text-muted)] mb-2.5 font-medium">
            Mode
          </p>

          <div
            role="tablist"
            className="
              grid grid-cols-2 gap-1 rounded-xl
              border border-[var(--theme-border)]
              bg-[var(--theme-background-soft)]
              p-1 mb-4
            "
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'dark'}
              onClick={() => onModeChange('dark')}
              className={`
                flex min-h-[40px] items-center justify-center gap-1.5
                rounded-lg py-2 text-xs font-semibold
                transition-all duration-150
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]
                ${
                  mode === 'dark'
                    ? 'bg-[var(--theme-primary)] text-white shadow-sm'
                    : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface)]'
                }
              `}
            >
              <Moon className="h-3.5 w-3.5" />
              Dark
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'light'}
              onClick={() => onModeChange('light')}
              className={`
                flex min-h-[40px] items-center justify-center gap-1.5
                rounded-lg py-2 text-xs font-semibold
                transition-all duration-150
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]
                ${
                  mode === 'light'
                    ? 'bg-[var(--theme-primary)] text-white shadow-sm'
                    : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface)]'
                }
              `}
            >
              <Sun className="h-3.5 w-3.5" />
              Light
            </button>
          </div>

          {/* COLOR */}
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--theme-text-muted)] mb-2.5 font-medium">
            {mode === 'dark' ? 'Theme' : 'Light Palette'}
          </p>

          <div className="space-y-1">
            {colors.map((c) => {
              const isActive = c.id === activeId;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => handleSelect(c.id)}
                  className={`
                    flex min-h-[44px] w-full items-center gap-3
                    rounded-xl px-3 py-2.5 text-left
                    text-xs font-medium transition-all duration-150
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]
                    ${isActive ? 'bg-[var(--theme-background-soft)] text-[var(--theme-accent)] font-semibold border border-[var(--theme-border)]' : 'text-[var(--theme-text)] hover:bg-[var(--theme-background-soft)]'}
                  `}
                >
                  <span
                    className={`
                      flex h-4 w-4 shrink-0 items-center justify-center
                      rounded-full border-2 transition-colors
                      ${
                        isActive
                          ? 'border-[var(--theme-accent)]'
                          : 'border-[var(--theme-border)]'
                      }
                    `}
                  >
                    {isActive && (
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: 'var(--theme-accent)' }}
                      />
                    )}
                  </span>
                  <span className="truncate">{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};