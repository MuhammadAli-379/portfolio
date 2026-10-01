import React, { useState } from 'react';
import {
 FileSpreadsheet,
 Database,
 Code2,
 BarChart3,
 Filter,
 PieChart,
 TrendingUp,
 Layers,
 Sparkles,
 CheckCircle2,
 ChevronDown,
} from 'lucide-react';

import { SkillItem } from '../types/portfolio';
import { PageHeader } from '../components/PageHeader';
import { PageNavigation } from '../components/PageNavigation';

interface SkillsSectionProps {
 skills: SkillItem[];
}

const iconComponentMap: Record<string, React.ElementType> = {
 FileSpreadsheet,
 Database,
 Code2,
 BarChart3,
 Filter,
 PieChart,
 TrendingUp,
 Layers,
};

type SkillFilter = 'all' | 'core' | 'bi' | 'methodology';

const filters: {
 id: SkillFilter;
 label: string;
}[] = [
 {
 id: 'all',
 label: 'All Skills',
 },
 {
 id: 'core',
 label: 'Core Tools',
 },
 {
 id: 'bi',
 label: 'Business Intelligence',
 },
 {
 id: 'methodology',
 label: 'Methodology',
 },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({
 skills,
}) => {
 const [selectedFilter, setSelectedFilter] =
 useState<SkillFilter>('all');

 const filteredSkills =
 selectedFilter === 'all'
 ? skills
 : skills.filter(
 (skill) => skill.category === selectedFilter
 );

 return (
  <div
  id="skills"
  className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[var(--theme-background)] pt-28 pb-20 sm:pt-32 sm:pb-24"
  >
 {/* =====================================================
 Background Atmosphere
 ===================================================== */}

 <div
 className="
 absolute
 -top-40
 -right-40

 w-[420px]
 h-[420px]

 rounded-full

 bg-[var(--theme-combined)]/[0.035]

 blur-[110px]

 pointer-events-none
 "
 aria-hidden="true"
 />

 <div
 className="
 absolute
 -bottom-48
 -left-40

 w-[380px]
 h-[380px]

 rounded-full

 bg-[var(--theme-combined)]/[0.025]

 blur-[110px]

 pointer-events-none
 "
 aria-hidden="true"
 />

 <div
 className="
 max-w-7xl
 mx-auto
 px-4
 sm:px-6
 lg:px-8

 relative
 z-10
 "
 >
  {/* Dedicated Page Header */}
  <PageHeader
    badge="Technical Competencies"
    badgeIcon={<Code2 className="h-3.5 w-3.5" />}
    title="Skills & Toolkit"
    description="A practical toolkit built through Business Data Analytics coursework, laboratory exercises, and project-based work across data preparation, analysis, visualization, and business intelligence."
  />

  <div
  className="
  flex
  flex-col
  lg:flex-row
  lg:items-center
  lg:justify-between

  gap-5

  mb-10
  "
  >
  <div>
    <h3 className="text-base font-bold text-[var(--theme-text)]">
      Skill Matrix & Competencies
    </h3>
    <p className="text-xs text-[var(--theme-text-secondary)]">
      Filter by domain or browse all analytical tools
    </p>
  </div>

 {/* =================================================
 Filter Controls
 ================================================= */}

 <div
 className="
 w-full
 lg:w-auto

 flex
 flex-col
 sm:flex-row

 gap-2

 p-1.5

 rounded-xl

 bg-[var(--theme-light)]

 border
 border-[var(--theme-combined)]

 shadow-sm
 "
 role="tablist"
 aria-label="Filter technical skills"
 >
 {filters.map((filter) => {
 const isActive =
 selectedFilter === filter.id;

 const count =
 filter.id === 'all'
 ? skills.length
 : skills.filter(
 (skill) =>
 skill.category === filter.id
 ).length;

 return (
 <button
 key={filter.id}
 type="button"
 role="tab"
 aria-selected={isActive}
 onClick={() =>
 setSelectedFilter(filter.id)
 }
 className={`
 group

 flex
 items-center
 justify-between
 sm:justify-center
 gap-2

 px-3
 py-2.5
 sm:py-2

 rounded-lg

 text-[11px]
 sm:text-[10px]

 uppercase
 tracking-[0.06em]

 font-semibold

 transition-all
 duration-200

 cursor-pointer

 ${
 isActive
 ? `
 bg-[var(--theme-combined)]

 text-[var(--theme-light)]

 shadow-sm
 shadow-[var(--theme-combined)]/15
 `
 : `
 text-[var(--theme-combined)]/65

 hover:text-[var(--theme-combined)]

 hover:bg-[var(--theme-light)]

 `
 }
 `}
 >
 <span>{filter.label}</span>

 <span
 className={`
 min-w-5
 h-5
 px-1.5

 inline-flex
 items-center
 justify-center

 rounded-md

 text-[9px]
 font-mono

 ${
 isActive
 ? `
 bg-[var(--theme-light)]/15
 text-[var(--theme-light)]
 `
 : `
 bg-[var(--theme-combined)]/[0.06]

 text-[var(--theme-combined)]/55

 `
 }
 `}
 >
 {count}
 </span>
 </button>
 );
 })}
 </div>
 </div>

 {/* ===================================================
 Results Indicator
 =================================================== */}

 <div
 className="
 flex
 items-center
 justify-between

 mb-5
 px-1

 text-[10px]
 sm:text-[11px]

 font-mono
 uppercase
 tracking-[0.12em]
 "
 >
 <span
 className="
 text-[var(--theme-combined)]/55

 "
 >
 Showing
 <span
 className="
 ml-1.5

 text-[var(--theme-combined)]

 font-semibold
 "
 >
 {filteredSkills.length}
 </span>{' '}
 competencies
 </span>

 <span
 className="
 hidden
 sm:inline

 text-[var(--theme-combined)]/55

 "
 >
 Practical Â· Project-Based
 </span>
 </div>

 {/* ===================================================
 Skills Grid
 =================================================== */}

 {filteredSkills.length > 0 ? (
 <div
 className="
 grid
 grid-cols-1
 sm:grid-cols-2
 lg:grid-cols-4

 gap-4
 sm:gap-5
 "
 >
 {filteredSkills.map((skill) => {
 const Icon =
 iconComponentMap[skill.iconName] ||
 Layers;

 return (
 <article
 key={skill.id}
 className="
 group

 relative

 flex
 flex-col
 justify-between

 min-h-[245px]

 p-5
 sm:p-6

 rounded-2xl

 border
 border-[var(--theme-combined)]

 bg-[var(--theme-light)]

 shadow-[0_3px_16px_rgba(74,0,16,0.035)]

 overflow-hidden

 transition-all
 duration-300

 hover:-translate-y-1

 hover:border-[var(--theme-combined)]/30

 hover:shadow-[0_12px_30px_rgba(74,0,16,0.10)]

 "
 >
 {/* Card Accent */}

 <div
 className="
 absolute
 top-0
 left-5
 right-5

 h-px

 bg-gradient-to-r
 from-transparent
 via-[var(--theme-combined)]/30
 to-transparent

 opacity-0
 group-hover:opacity-100

 transition-opacity
 duration-300
 "
 aria-hidden="true"
 />

 <div>
 {/* Icon + Level */}

 <div
 className="
 flex
 items-center
 justify-between

 mb-5
 "
 >
 <div
 className="
 relative

 w-11
 h-11

 rounded-xl

 flex
 items-center
 justify-center

 bg-[var(--theme-combined)]/[0.06]

 border
 border-[var(--theme-combined)]/12

 text-[var(--theme-combined)]

 transition-all
 duration-300

 group-hover:bg-[var(--theme-combined)]/[0.10]

 group-hover:border-[var(--theme-combined)]/25

 "
 >
 <Icon className="w-5 h-5" />

 <span
 className="
 absolute
 -right-1
 -bottom-1

 w-2.5
 h-2.5

 rounded-full

 bg-[var(--theme-combined)]

 border-2
 border-[var(--theme-light)]

 "
 aria-hidden="true"
 />
 </div>

 {skill.levelDescriptor && (
 <span
 className="
 inline-flex
 items-center

 px-2
 py-1

 rounded-md

 bg-[var(--theme-light)]

 border
 border-[var(--theme-combined)]

 text-[9px]
 font-mono
 font-semibold

 uppercase
 tracking-wide

 text-[var(--theme-combined)]

 "
 >
 {skill.levelDescriptor}
 </span>
 )}
 </div>

 {/* Title */}

 <h3
 className="
 text-[15px]

 font-bold
 tracking-tight

 text-[var(--theme-combined)]

 transition-colors
 duration-200

 group-hover:text-[var(--theme-combined)]

 "
 >
 {skill.name}
 </h3>

 {/* Description */}

 <p
 className="
 mt-2.5

 text-xs
 sm:text-[13px]

 leading-6

 text-[var(--theme-combined)]/75

 "
 >
 {skill.description}
 </p>
 </div>

 {/* =================================================
 Card Footer
 ================================================= */}

 <div
 className="
 mt-6
 pt-3.5

 border-t
 border-[var(--theme-combined)]

 flex
 items-center
 justify-between
 gap-3
 "
 >
 <span
 className="
 inline-flex
 items-center
 gap-1.5

 text-[9px]

 font-mono
 font-medium

 uppercase
 tracking-[0.08em]

 text-[var(--theme-combined)]/55

 "
 >
 <span
 className="
 w-1.5
 h-1.5

 rounded-full

 bg-[var(--theme-combined)]

 "
 />

 {skill.category}
 </span>

 <span
 className="
 inline-flex
 items-center
 gap-1

 text-[10px]

 font-semibold

 text-[var(--theme-combined)]

 "
 >
 <CheckCircle2 className="w-3.5 h-3.5" />

 Practiced
 </span>
 </div>
 </article>
 );
 })}
 </div>
 ) : (
 /* =================================================
 Empty State
 ================================================= */

 <div
 className="
 flex
 flex-col
 items-center
 justify-center

 py-16

 rounded-2xl

 border
 border-dashed
 border-[var(--theme-combined)]

 bg-[var(--theme-light)]

 text-center
 "
 >
 <div
 className="
 w-10
 h-10

 rounded-xl

 flex
 items-center
 justify-center

 bg-[var(--theme-combined)]/[0.07]

 text-[var(--theme-combined)]

 "
 >
 <Layers className="w-5 h-5" />
 </div>

 <p
 className="
 mt-3

 text-sm
 font-semibold

 text-[var(--theme-combined)]

 "
 >
 No competencies in this category
 </p>

 <p
 className="
 mt-1

 text-xs

 text-[var(--theme-combined)]/65

 "
 >
 Try another skill category.
 </p>
 </div>
 )}

 {/* ===================================================
 Integrity Statement
 =================================================== */}

 <div
 className="
 relative

 mt-10

 p-4
 sm:p-5

 rounded-xl

 border
 border-[var(--theme-combined)]

 bg-[var(--theme-light)]

 flex
 items-start
 gap-3.5
 "
 >
 <div
 className="
 shrink-0

 w-8
 h-8

 rounded-lg

 flex
 items-center
 justify-center

 bg-[var(--theme-combined)]/[0.10]

 border
 border-[var(--theme-combined)]/20

 text-[var(--theme-combined)]

 "
 >
 <Sparkles className="w-4 h-4" />
 </div>

 <div className="min-w-0">
 <p
 className="
 text-[11px]

 font-semibold

 text-[var(--theme-combined)]

 "
 >
 Skills Transparency
 </p>

 <p
 className="
 mt-1

 text-xs
 leading-5

 text-[var(--theme-combined)]/65

 "
 >
 Skills reflect practical competencies developed
 through university coursework, laboratory exercises,
 and hands-on projects. No artificial proficiency
 percentages are claimed.
 </p>
 </div>
 </div>

 {/* Page Navigation */}
 <PageNavigation
   prev={{ label: 'About Me', path: '/about' }}
   next={{ label: 'Academic Projects', path: '/projects' }}
 />
 </div>
 </div>
 );
};
