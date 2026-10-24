import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, ArrowUpRight, Github, Linkedin, Twitter, MessageCircle, Facebook, Instagram, Phone } from 'lucide-react';
import { api } from '../lib/api';
import { SiteSettings } from '../types';

export const ContactPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await api.getSettings();
        setSettings(data);
      } catch (e) {
        console.error(e);
      }
    }
    loadSettings();
    api.trackEvent('pageview', '/contact');
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await api.submitContact(formData);
      setSuccessMessage(res.message || 'Your inquiry was delivered securely. Anam will reply promptly.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: ''
      });
      setErrors({});
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit contact form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const email = settings?.contact?.email || 'anamdeveloper255@gmail.com';
  const location = settings?.contact?.location || 'Remote / Worldwide';
  const isAvailable = settings?.availability?.isAvailable ?? true;
  const statusText = settings?.availability?.statusText || 'Available for Full-time Roles & High-Impact Contracts';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="space-y-4 max-w-2xl">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          Initiate Contact
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white text-balance">
          Let’s Discuss Your Next Engineering Project
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Whether you are looking to hire a dedicated full-stack engineer, build a custom high-performance WordPress platform, or optimize Core Web Vitals, I’d love to connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Direct Info & Channels */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Availability Card */}
          <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2.5 text-xs font-mono">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAvailable ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isAvailable ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </span>
              <span className="text-slate-200 font-semibold">
                Current Availability
              </span>
            </div>
            <p className="text-sm text-slate-300">
              {statusText}
            </p>
            <div className="text-xs text-slate-400 font-mono">
              Typical response time: Within 24 business hours.
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Direct Contact
            </h3>
            
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-[#1E293B]/50 hover:bg-[#1E293B] border border-slate-800 text-sm text-slate-200 hover:text-cyan-400 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-950/60 text-cyan-400 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="block text-[11px] text-slate-400 font-mono">Email Address</span>
                <span className="font-medium text-white">{email}</span>
              </div>
            </a>

            <a
              href="https://wa.me/923218361368"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-[#1E293B]/50 hover:bg-[#1E293B] border border-slate-800 text-sm text-slate-200 hover:text-emerald-400 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-950/60 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="block text-[11px] text-slate-400 font-mono">WhatsApp & Phone</span>
                <span className="font-medium text-white">03218361368 (+92 321 8361368)</span>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#1E293B]/50 border border-slate-800 text-sm text-slate-200">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 font-mono">Location & Timezone</span>
                <span className="font-medium text-white">{location}</span>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Professional Profiles
            </h3>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={settings?.socials?.linkedin || 'https://www.linkedin.com/in/atechstack/'}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 text-xs font-mono rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={settings?.socials?.facebook || 'https://web.facebook.com/ATechStack'}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 text-xs font-mono rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Facebook className="w-3.5 h-3.5 text-blue-400" />
                <span>Facebook</span>
              </a>
              <a
                href={settings?.socials?.instagram || 'https://www.instagram.com/atechstack/'}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 text-xs font-mono rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram</span>
              </a>
              <a
                href={settings?.socials?.github || 'https://github.com/anamfatima'}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 text-xs font-mono rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Database-Connected Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#1E293B]/70 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-heading font-bold text-white">
                Send a Direct Message
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Submissions are stored securely in the database and monitored in the private admin inbox.
              </p>
            </div>

            {successMessage && (
              <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 text-xs flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Honeypot field (hidden from real users, tricks spambots) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-300">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Elena Vance"
                  className={`w-full px-4 py-2.5 bg-slate-900 border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.name ? 'border-rose-500' : 'border-slate-700/80 focus:border-cyan-400'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-rose-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-300">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="e.g. elena@company.com"
                  className={`w-full px-4 py-2.5 bg-slate-900 border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-500' : 'border-slate-700/80 focus:border-cyan-400'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-400">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-300">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Full-Stack Contract Inquiry or Custom WordPress Project"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block text-xs font-mono text-slate-300">
                  Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  placeholder="Please describe your project scope, timeline, or engineering opportunity..."
                  className={`w-full px-4 py-2.5 bg-slate-900 border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.message ? 'border-rose-500' : 'border-slate-700/80 focus:border-cyan-400'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
