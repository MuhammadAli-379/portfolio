import React, { useEffect, useState } from 'react';
import { 
  X, 
  Calendar, 
  LineChart, 
  CheckCircle2, 
  Filter, 
  Sparkles, 
  GraduationCap, 
  TrendingUp, 
  Database, 
  Layers,
  BookOpen,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { AcademicProject } from '../types/portfolio';

interface TimeSeriesCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: AcademicProject;
}

export const TimeSeriesCaseStudyModal: React.FC<TimeSeriesCaseStudyModalProps> = ({
  isOpen,
  onClose,
  project
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'outcomes'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ts-case-study-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur sticky top-0 z-20 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-semibold uppercase tracking-wider">
                <GraduationCap className="w-3 h-3" />
                {project.projectType}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-[11px]">
                {project.semesterTag}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                COMSATS University Islamabad
              </span>
            </div>

            <h2 id="ts-case-study-title" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {project.title}
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Course: <span className="text-slate-900 dark:text-slate-200 font-semibold">{project.courseName}</span> · Focus: <span className="text-slate-900 dark:text-slate-200 font-semibold">{project.focus}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close case study modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-medium bg-slate-50/60 dark:bg-slate-950/40 px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Overview & Problem
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'workflow'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Preparation & Engineering
          </button>
          <button
            onClick={() => setActiveTab('outcomes')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'outcomes'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Key Learning & Analytics Context
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-5 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Summary */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2">
                <span className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Project Overview
                </span>
                <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  {project.description}
                </p>
                <div className="pt-2 text-[11px] font-mono text-slate-500">
                  Semester 4 Individual Coursework · Course: Business Data Analysis
                </div>
              </div>

              {/* Business Problem */}
              <div className="p-5 rounded-2xl border border-cyan-500/20 bg-cyan-50/40 dark:bg-cyan-950/20 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-500" />
                  Business Problem
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.businessProblem}
                </p>
              </div>

              {/* Capabilities & Tags */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
                  Demonstrated Capabilities:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span 
                      key={t}
                      className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="space-y-5">
              
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-cyan-500" />
                  Key Methodological Stages
                </h4>
                <ul className="space-y-2.5 text-xs">
                  {project.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools Used */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500">Core Technologies:</span>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs text-slate-900 dark:text-slate-100 font-semibold">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'outcomes' && (
            <div className="space-y-6">
              
              {/* Learning Outcomes */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                  Key Learning Outcomes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.learningOutcomes?.map((outcome, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-xs text-slate-800 dark:text-slate-200 font-medium">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perspective */}
              <div className="p-5 rounded-2xl border border-cyan-500/30 bg-cyan-50/30 dark:bg-cyan-950/20 space-y-2">
                <span className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Business Analytics Perspective
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  "{project.businessAnalyticsPerspective}"
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            Individual Academic Project · COMSATS University Islamabad
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
