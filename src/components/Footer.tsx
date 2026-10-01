import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  Phone, 
  GraduationCap, 
  ShieldCheck 
} from 'lucide-react';
import { StudentProfile } from '../types/portfolio';

interface FooterProps {
  profile: StudentProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Objective', href: '/#objective' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Mindset', href: '/#mindset' },
    { label: 'Education', href: '/#education' },
    { label: 'Contact', href: '/#contact' },
  ];

  const cleanPhone = profile.phone.replace(/[\s-]/g, '');

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-100 dark:border-slate-800/80">
          
          {/* Brand Info */}
          <div className="space-y-1.5 max-w-sm">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-500" />
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                {profile.name}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              {profile.professionalTitle} · {profile.degree}
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              {profile.university} · {profile.semester} • Section {profile.section}
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Direct Communication & Top */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1.5"
              title="Email Muhammad Abubakar"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-500" />
              <span className="hidden sm:inline font-mono text-[11px]">Email</span>
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1.5 font-mono"
              title="Call Muhammad Abubakar"
              aria-label="Phone"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-500" />
              <span className="hidden sm:inline text-[11px]">Call</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
              title="Back to top"
              aria-label="Back to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-mono">Top</span>
            </button>
          </div>

        </div>

        {/* Bottom Sub-row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} {profile.name} · All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
            <span>COMSATS University Islamabad · BS Business Data Analytics (Section C)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
