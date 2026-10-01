import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface PageNavigationProps {
  prev?: {
    label: string;
    path: string;
  };
  next?: {
    label: string;
    path: string;
  };
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  prev,
  next,
}) => {
  return (
    <div className="mt-16 flex flex-col gap-4 border-t border-[var(--theme-border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
      {prev ? (
        <Link
          to={prev.path}
          className="group inline-flex items-center gap-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 text-xs font-semibold text-[var(--theme-text)] shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-[var(--theme-primary-light)] hover:bg-[var(--theme-surface-soft)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 text-[var(--theme-accent)]" />
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-[var(--theme-text-muted)]">Previous</span>
            <span>{prev.label}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next && (
        <Link
          to={next.path}
          className="group ml-auto inline-flex items-center gap-2 rounded-xl border border-[var(--theme-primary-light)]/40 bg-[var(--theme-primary)] px-5 py-3 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--theme-primary-light)]"
        >
          <div className="text-right">
            <span className="block text-[10px] uppercase tracking-wider text-white/70">Next Page</span>
            <span>{next.label}</span>
          </div>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 text-[var(--theme-accent)]" />
        </Link>
      )}
    </div>
  );
};
