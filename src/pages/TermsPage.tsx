import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileCheck2, ArrowLeft, ShieldAlert, Award, RefreshCw, Mail } from 'lucide-react';
import { api } from '../lib/api';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    api.trackEvent('pageview', '/terms');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      
      {/* Back button */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-cyan-400 text-xs font-mono">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Terms & Conditions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-sm font-mono">
          Effective Date: March 2026 · ATS (Anam Tech Stack)
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none text-slate-300 space-y-8 text-sm sm:text-base leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>1. Acceptance of Terms</span>
          </h2>
          <p>
            By accessing or browsing the ATS (Anam Tech Stack) portfolio website, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service and all applicable software licensing and copyright laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <span>2. Intellectual Property & Code Samples</span>
          </h2>
          <p>
            The software architectures, technical case studies, design systems, and blog articles authored by Anam Fatima on this site are protected by copyright. Open-source repositories linked from this portfolio are governed by their respective repository licenses (e.g., MIT or Apache 2.0). Client project branding, logos, and proprietary assets remain the property of their respective owners.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-cyan-400" />
            <span>3. Freelance & Engineering Engagements</span>
          </h2>
          <p>
            Inquiries submitted through this portfolio do not constitute a binding contract until formal project milestones, scopes of work, and service agreements are mutually signed by both parties. Deliverables, timelines, and payment terms will be explicitly specified in individual statements of work.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span>4. Inquiries & Legal Notices</span>
          </h2>
          <p>
            For questions regarding contracts, development availability, or terms clarification:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-1 font-mono">
            <p className="text-white font-semibold">Anam Fatima — Full Stack Developer & SEO Specialist</p>
            <p className="text-slate-400">Email: <a href="mailto:anamdeveloper255@gmail.com" className="text-cyan-400 hover:underline">anamdeveloper255@gmail.com</a></p>
            <p className="text-slate-400">WhatsApp: <a href="https://wa.me/923218361368" className="text-cyan-400 hover:underline">03218361368 (+92 321 8361368)</a></p>
          </div>
        </section>

      </div>
    </div>
  );
};
