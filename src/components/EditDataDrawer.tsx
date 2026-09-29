import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  SlidersHorizontal, 
  Download, 
  Check, 
  FileJson,
  Users,
  ShieldAlert,
  TrendingUp,
  Database,
  BarChart3
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { savePortfolioData, resetPortfolioData } from '../data/portfolioData';

interface EditDataDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onUpdateData: (newData: PortfolioData) => void;
}

export const EditDataDrawer: React.FC<EditDataDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
}) => {
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'projects' | 'export'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  React.useEffect(() => {
    setFormData(data);
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleProfileChange = (field: keyof typeof formData.profile, val: string) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: val,
      },
    }));
  };

  const handleEducationChange = (field: keyof typeof formData.education, val: string) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: val,
      },
    }));
  };

  const handleContributionChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      creditRiskContribution: val,
      projects: prev.projects.map((p) =>
        p.id === 'credit-risk-analytics' ? { ...p, myContribution: val } : p
      ),
    }));
  };

  const handleToggleRegNumbers = (val: boolean) => {
    setFormData((prev) => ({
      ...prev,
      showRegistrationNumbers: val,
      projects: prev.projects.map((p) =>
        p.id === 'credit-risk-analytics' ? { ...p, showRegNumbers: val } : p
      ),
    }));
  };

  const handleSave = () => {
    savePortfolioData(formData);
    onUpdateData(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleReset = () => {
    if (confirm("Reset customizations back to Muhammad Abubakar's default CV information?")) {
      const reset = resetPortfolioData();
      setFormData(reset);
      onUpdateData(reset);
    }
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_data_${formData.profile.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const creditRiskProj = formData.projects.find((p) => p.id === 'credit-risk-analytics');
  const contributionText = formData.creditRiskContribution || creditRiskProj?.myContribution || "Add my specific contribution here.";
  const showRegNums = formData.showRegistrationNumbers ?? creditRiskProj?.showRegNumbers ?? false;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-drawer-title"
    >
      <div 
        className="w-full max-w-xl h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 id="edit-drawer-title" className="text-sm font-bold text-slate-900 dark:text-white">
                Customize Portfolio
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Update information locally in your browser
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-medium bg-slate-50/50 dark:bg-slate-950/40 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2.5 px-3 text-center border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Profile & Objective
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-2.5 px-3 text-center border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'projects'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Projects & Team
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`py-2.5 px-3 text-center border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'academic'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Academic & Contact
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`py-2.5 px-3 text-center border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'export'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Backup / Reset
          </button>
        </div>

        {/* Drawer Body Form */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 text-xs text-slate-700 dark:text-slate-300">
          
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-900 dark:text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-900 dark:text-white">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={formData.profile.professionalTitle}
                  onChange={(e) => handleProfileChange('professionalTitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-900 dark:text-white">
                  Hero Statement
                </label>
                <input
                  type="text"
                  value={formData.profile.heroPitch}
                  onChange={(e) => handleProfileChange('heroPitch', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-900 dark:text-white">
                  Career Objective
                </label>
                <textarea
                  rows={4}
                  value={formData.profile.careerObjective}
                  onChange={(e) => handleProfileChange('careerObjective', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white leading-relaxed resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-900 dark:text-white">
                  Profile / About Me
                </label>
                <textarea
                  rows={5}
                  value={formData.profile.biography}
                  onChange={(e) => handleProfileChange('biography', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white leading-relaxed resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1.5">
                <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 uppercase font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Credit Risk Analytics — Group Project Settings
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Customize your personal contribution notes and privacy settings for the group academic project.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-900 dark:text-white block">
                  My Contribution (Muhammad Abubakar)
                </label>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Clearly describe your personal responsibilities in the group project (e.g. data preprocessing, regression models, visualization).
                </p>
                <textarea
                  rows={4}
                  value={contributionText}
                  onChange={(e) => handleContributionChange(e.target.value)}
                  placeholder="e.g. Conducted data loading, missing value imputation using median/mode, and evaluated regression and logistic classification models."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white leading-relaxed resize-none"
                />
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="showRegNumbers"
                    checked={showRegNums}
                    onChange={(e) => handleToggleRegNumbers(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                  />
                  <label htmlFor="showRegNumbers" className="cursor-pointer">
                    <span className="font-semibold text-slate-900 dark:text-white block">
                      Display Student Registration Numbers Publicly
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                      Per academic privacy guidelines, group member registration numbers are kept hidden by default unless enabled here.
                    </span>
                  </label>
                </div>
              </div>

              {/* Project 3 Information Card */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Diversified Portfolio Analysis — Academic Assignment
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Financial Management — Assignment #3. 7-Year Historical Analysis (2019–2025) across Fauji Fertilizer, Lucky Cement, Pakistan Petroleum, and Habib Bank relative to KSE-100 benchmark.
                </p>
                <div className="pt-1 text-[11px] text-slate-500 dark:text-slate-400 italic">
                  Note: Presented strictly as an academic coursework assignment for educational purposes.
                </div>
              </div>

              {/* Project 4 Information Card */}
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 uppercase font-semibold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  E-Commerce Database Design & Normalization — Individual Project
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Semester 3 · Database Systems. Transformed 9 initial base tables into 19 normalized 3NF entities spanning customer management, catalog, orders, payments, and shipping.
                </p>
                <div className="pt-1 text-[11px] text-slate-500 dark:text-slate-400 italic">
                  Skills: ERD Modeling, 1NF, 2NF, 3NF, Primary & Foreign Keys, Cardinality, Relational Architecture.
                </div>
              </div>

              {/* Project 5 Information Card */}
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-2">
                <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 uppercase font-semibold flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Financial Ratio Analysis — Academic Assignment (Business Finance)
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Business Finance · FY 2021–2025. Five-year comparative analysis of OGDC, PPL, and MARI. DuPont decomposition, horizontal & common-size statements, 4-tier risk matrix, PESTEL analysis, and DCF valuation framework.
                </p>
                <div className="pt-1 text-[11px] text-slate-500 dark:text-slate-400 italic">
                  Skills: Ratio Analysis, DuPont Decomposition, Horizontal & Vertical Analysis, Valuation Multiples, Corporate Finance.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-900 dark:text-white">
                    Semester
                  </label>
                  <input
                    type="text"
                    value={formData.profile.semester}
                    onChange={(e) => handleProfileChange('semester', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-900 dark:text-white">
                    Section
                  </label>
                  <input
                    type="text"
                    value={formData.profile.section}
                    onChange={(e) => handleProfileChange('section', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-900 dark:text-white">
                  Degree
                </label>
                <input
                  type="text"
                  value={formData.profile.degree}
                  onChange={(e) => handleProfileChange('degree', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-900 dark:text-white">
                  University
                </label>
                <input
                  type="text"
                  value={formData.profile.university}
                  onChange={(e) => handleProfileChange('university', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-900 dark:text-white">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-900 dark:text-white">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.profile.location}
                  onChange={(e) => handleProfileChange('location', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                  <FileJson className="w-4 h-4 text-cyan-500" />
                  <span>Download Backup JSON</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Save a copy of your customized portfolio configurations.
                </p>
                <button
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
              </div>

              <div className="p-4 rounded-xl border border-red-500/20 bg-red-50/5 dark:bg-red-950/10 space-y-2">
                <span className="text-xs font-semibold text-red-700 dark:text-red-400 block">
                  Reset Data
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Revert back to default Muhammad Abubakar verified CV information.
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to CV Defaults</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" />
                Saved!
              </span>
            )}
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
