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
        aria-label={`Change theme (currently ${mode})`}
        title={`${mode === 'dark' ? 'Dark' : 'Light'} theme`}
        className="
          group flex h-9 items-center gap-2 rounded-xl
          border border-[var(--theme-border)]
          bg-[var(--theme-surface)]
          text-[var(--theme-text)]
          px-2.5 shadow-sm transition-all duration-200
          hover:-translate-y-0.5 hover:shadow-lg
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-[var(--theme-accent)]
        "
      >
        {mode === 'dark' ? (
          <Moon className="h-4 w-4 opacity-90" />
        ) : (
          <Sun className="h-4 w-4 opacity-90" />
        )}
        <ChevronDown
          className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="
            absolute right-0 top-[calc(100%+0.6rem)] z-50 w-60
            overflow-hidden rounded-2xl
            border border-[var(--theme-border)]
            bg-[var(--theme-surface)]
            text-[var(--theme-text)]
            p-3 shadow-[0_18px_50px_rgba(0,0,0,0.4)]
          "
        >
          {/* MODE */}
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] opacity-60 mb-2">
            Mode
          </p>

          <div
            role="tablist"
            className="
              grid grid-cols-2 gap-1 rounded-xl
              border border-[var(--theme-border)]
              p-1 mb-4
            "
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'dark'}
              onClick={() => onModeChange('dark')}
              className={`
                flex items-center justify-center gap-1.5
                rounded-lg py-1.5 text-xs font-semibold
                transition-all duration-150
                ${
                  mode === 'dark'
                    ? 'bg-[var(--theme-primary)] text-white'
                    : 'opacity-60 hover:opacity-100'
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
                flex items-center justify-center gap-1.5
                rounded-lg py-1.5 text-xs font-semibold
                transition-all duration-150
                ${
                  mode === 'light'
                    ? 'bg-[var(--theme-primary)] text-white'
                    : 'opacity-60 hover:opacity-100'
                }
              `}
            >
              <Sun className="h-3.5 w-3.5" />
              Light
            </button>
          </div>

          {/* COLOR */}
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] opacity-60 mb-2">
            {mode === 'dark' ? 'Theme' : 'Light'}
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
                    flex w-full items-center gap-2.5
                    rounded-lg px-2 py-2 text-left
                    text-xs font-medium transition-all duration-150
                    ${isActive ? 'bg-white/5' : 'hover:bg-white/5'}
                  `}
                >
                  <span
                    className={`
                      flex h-3.5 w-3.5 shrink-0 items-center justify-center
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
                        className="h-1.5 w-1.5 rounded-full"
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