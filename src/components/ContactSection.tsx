import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Languages,
  Send,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { StudentProfile } from '../types/portfolio';
import { useReveal } from '../hooks/useReveal';

interface ContactSectionProps {
  profile: StudentProfile;
}

const inputClasses =
  'w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background-soft)] px-3.5 py-2.5 text-[var(--theme-text)] placeholder:text-[var(--theme-text-muted)] transition-colors focus:border-[var(--theme-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]';

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const leftColRef = useReveal<HTMLDivElement>();
  const formColRef = useReveal<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(profile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const cleanPhone = profile.phone.replace(/[\s-]/g, '');

  return (
    <section id="contact" className="relative border-t border-[var(--theme-border)] bg-[var(--theme-background)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">
            <Mail className="h-3.5 w-3.5" />
            <span>Connect &amp; Inquiries</span>
          </div>
          <h2 className="text-gradient text-3xl font-bold tracking-tight sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--theme-text-secondary)] sm:text-base">
            Open to discussing internship placements, entry-level Data Analyst
            positions, and academic collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left column */}
          <div ref={leftColRef} className="reveal space-y-4 lg:col-span-5">
            {/* Email */}
            <div className="card-hover group flex items-center justify-between rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-sm">
              <a href={`mailto:${profile.email}`} className="flex min-w-0 flex-1 items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] transition-colors group-hover:bg-[var(--theme-accent)]/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-mono uppercase text-[var(--theme-text-muted)]">
                    Email Address (Click to Compose)
                  </span>
                  <span className="block truncate text-sm font-semibold text-[var(--theme-text)] transition-colors group-hover:text-[var(--theme-accent)]">
                    {profile.email}
                  </span>
                </div>
              </a>
              <button
                onClick={handleCopyEmail}
                className="ml-2 shrink-0 rounded-lg p-2 text-[var(--theme-text-muted)] transition-colors hover:bg-[var(--theme-background-soft)] hover:text-[var(--theme-accent)]"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {/* Phone */}
            <div className="card-hover group flex items-center justify-between rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-sm">
              <a href={`tel:${cleanPhone}`} className="flex min-w-0 flex-1 items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] transition-colors group-hover:bg-[var(--theme-accent)]/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] font-mono uppercase text-[var(--theme-text-muted)]">
                    Phone (Click to Call)
                  </span>
                  <span className="block truncate font-mono text-sm font-semibold text-[var(--theme-text)] transition-colors group-hover:text-[var(--theme-accent)]">
                    {profile.phone}
                  </span>
                </div>
              </a>
              <button
                onClick={handleCopyPhone}
                className="ml-2 shrink-0 rounded-lg p-2 text-[var(--theme-text-muted)] transition-colors hover:bg-[var(--theme-background-soft)] hover:text-[var(--theme-accent)]"
                title="Copy phone number"
                aria-label="Copy phone number"
              >
                {copiedPhone ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {/* Location */}
            <div className="card-hover rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-[var(--theme-text-muted)]">
                    Primary Location
                  </span>
                  <span className="block text-sm font-semibold text-[var(--theme-text)]">
                    {profile.location}
                  </span>
                  <span className="mt-0.5 block text-xs text-[var(--theme-text-secondary)]">
                    {profile.university} · {profile.campus}
                  </span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="card-hover rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--theme-accent)]/20 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                  <Languages className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-[var(--theme-text-muted)]">
                    Spoken Languages
                  </span>
                  <span className="text-xs text-[var(--theme-text-secondary)]">
                    Communication Proficiency
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="flex items-center justify-between rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-2.5">
                  <span className="font-semibold text-[var(--theme-text)]">English</span>
                  <span className="font-mono text-[11px] text-[var(--theme-text-muted)]">Fluent</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background-soft)] p-2.5">
                  <span className="font-semibold text-[var(--theme-text)]">Urdu</span>
                  <span className="font-mono text-[11px] text-[var(--theme-text-muted)]">Native</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — message form */}
          <div ref={formColRef} className="reveal lg:col-span-7">
            <div className="card-hover rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[var(--theme-text)]">Send a Direct Message</h3>
                <p className="mt-1 text-xs text-[var(--theme-text-secondary)]">
                  Have an internship, project, or role to discuss with{' '}
                  {profile.name}? Send a note below.
                </p>
              </div>

              {submitted ? (
                <div className="animate-scale-in space-y-3 rounded-xl border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-[var(--theme-accent)]" />
                  <h4 className="text-sm font-semibold text-[var(--theme-text)]">
                    Message Form Processed
                  </h4>
                  <p className="mx-auto max-w-md text-xs text-[var(--theme-text-secondary)]">
                    Thank you, {formData.name}. You can also email directly at{' '}
                    <a href={`mailto:${profile.email}`} className="font-semibold text-[var(--theme-accent)] underline">
                      {profile.email}
                    </a>{' '}
                    or call{' '}
                    <a href={`tel:${cleanPhone}`} className="font-mono font-semibold text-[var(--theme-accent)] underline">
                      {profile.phone}
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="text-xs font-medium text-[var(--theme-accent)] underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className="font-semibold text-[var(--theme-text)]">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Professor / Recruiter"
                        className={inputClasses}
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="font-semibold text-[var(--theme-text)]">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@organization.com"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-subject" className="font-semibold text-[var(--theme-text)]">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Data Analyst Internship / University Project"
                      className={inputClasses}
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="font-semibold text-[var(--theme-text)]">
                      Message Content *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter details about your inquiry or opportunity..."
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-shine flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--theme-primary)] px-4 py-2.5 font-medium text-white shadow-[0_6px_18px_-4px_color-mix(in_srgb,var(--theme-primary)_50%,transparent)] transition-colors hover:bg-[var(--theme-primary-light)]"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};