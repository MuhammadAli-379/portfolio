import React, { useEffect, useState } from 'react';
import { 
  X, 
  Printer, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Upload, 
  Paperclip,
  Check
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, data }) => {
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

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

  const handlePrint = () => {
    window.print();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFileName(e.target.files[0].name);
    }
  };

  const cleanPhone = data.profile.phone.replace(/[\s-]/g, '');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-500" />
            <span id="resume-modal-title" className="text-sm font-bold text-slate-900 dark:text-white">
              Curriculum Vitae (CV) Summary
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Attach Real CV File (Client local attachment) */}
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">
              <Paperclip className="w-3.5 h-3.5 text-cyan-500" />
              <span>{attachedFileName ? 'CV Attached' : 'Attach Real CV'}</span>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-medium transition-colors cursor-pointer"
              title="Print formatted CV to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Clean Paper Resume Body */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-white text-slate-900 font-sans space-y-7 select-text">
          
          {attachedFileName && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between no-print">
              <span className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                Custom CV file attached: <strong>{attachedFileName}</strong>
              </span>
              <button onClick={() => setAttachedFileName(null)} className="text-emerald-700 underline text-[11px]">Remove</button>
            </div>
          )}

          {/* Header Block */}
          <div className="border-b-2 border-slate-900 pb-5">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              {data.profile.name}
            </h1>
            <p className="text-base font-bold text-slate-700 mt-1">
              {data.profile.professionalTitle}
            </p>
            <p className="text-xs text-slate-600">
              {data.profile.degree} · {data.profile.university} (5th Semester • Section {data.profile.section})
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700 font-mono">
              <a href={`mailto:${data.profile.email}`} className="hover:underline">Email: {data.profile.email}</a>
              <span>·</span>
              <a href={`tel:${cleanPhone}`} className="hover:underline">Phone: {data.profile.phone}</a>
              <span>·</span>
              <span>Location: {data.profile.location}</span>
            </div>
          </div>

          {/* Profile Statement */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Professional Profile
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {data.profile.biography}
            </p>
          </div>

          {/* Career Objective */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Career Objective
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              "{data.profile.careerObjective}"
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Education
            </h2>
            <div className="text-xs">
              <div className="flex justify-between items-baseline font-bold text-slate-900">
                <span>{data.education.degree}</span>
                <span className="font-mono text-slate-600">{data.education.currentStatus}</span>
              </div>
              <div className="text-slate-700">
                {data.education.institution} ({data.education.campus}) · {data.education.semester}, Section {data.education.section}
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex items-start gap-1.5">
                  <span className="font-semibold">• {skill.name}:</span>
                  <span className="text-slate-600 font-mono text-[11px]">
                    {skill.levelDescriptor || skill.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Academic Projects
            </h2>
            <div className="space-y-3 text-xs">
              {data.projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span className="flex items-center gap-2">
                      {proj.title}
                      <span className="text-[10px] font-mono font-normal px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                        {proj.projectType}
                      </span>
                    </span>
                    <span className="font-mono text-slate-500 font-normal">[{proj.tools.join(', ')}]</span>
                  </div>
                  <ul className="space-y-0.5 text-slate-700 text-[11px]">
                    {proj.points.map((pt, i) => (
                      <li key={i}>• {pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Languages
            </h2>
            <div className="flex gap-4 text-xs text-slate-700">
              {data.profile.languages.map((l) => (
                <span key={l.language}>• <strong>{l.language}:</strong> {l.proficiency}</span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
