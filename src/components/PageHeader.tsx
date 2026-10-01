import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  badge: string;
  badgeIcon?: React.ReactNode;
  title: string;
  description: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  badgeIcon,
  title,
  description,
}) => {
  return (
    <div className="relative mb-12 border-b border-[var(--theme-border)] pb-8 pt-6 sm:mb-16 sm:pb-10">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-2 text-xs font-medium text-[var(--theme-text-muted)]"
      >
        <Link
          to="/"
          className="flex items-center gap-1.5 transition-colors hover:text-[var(--theme-accent)]"
        >
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3 w-3 opacity-40" />
        <span className="font-semibold text-[var(--theme-accent)]">
          {title}
        </span>
      </nav>

      {/* Pill Badge */}
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--theme-accent)]/25 bg-[var(--theme-accent)]/10 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-[var(--theme-accent)] uppercase">
        {badgeIcon && <span className="h-3.5 w-3.5">{badgeIcon}</span>}
        <span>{badge}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--theme-text)] sm:text-4xl lg:text-5xl">
        {title}
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--theme-text-secondary)] sm:text-base">
        {description}
      </p>
    </div>
  );
};
