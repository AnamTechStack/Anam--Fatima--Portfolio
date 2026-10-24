import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '../lib/api';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    api.trackEvent('pageview', '/privacy');
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
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm font-mono">
          Last Updated: March 2026 · ATS (Anam Tech Stack) Portfolio & Consultancy
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none text-slate-300 space-y-8 text-sm sm:text-base leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            <span>1. Commitment to Privacy</span>
          </h2>
          <p>
            Anam Fatima (operating ATS — Anam Tech Stack) values your privacy. This Privacy Policy outlines how your personal data and browsing activity are collected, processed, and safeguarded when visiting this portfolio website (<span className="text-cyan-300 font-mono">anam-portfolio.unaux.com</span> or allied deployment domains).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-cyan-400" />
            <span>2. Information We Collect</span>
          </h2>
          <p>
            We strictly limit data collection to information essential for professional inquiries, project collaborations, and performance monitoring:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>
              <strong>Direct Inquiries:</strong> When you submit the contact form or send an email to <span className="text-cyan-300 font-mono">anamdeveloper255@gmail.com</span>, we collect your name, email address, subject, and message content to respond to your technical requests.
            </li>
            <li>
              <strong>Technical Telemetry:</strong> Anonymized usage events (such as page views, resume views, and interaction timestamps) are logged to ensure Core Web Vitals performance and assess site reliability. We do not sell, rent, or monetize visitor data.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>3. How Information is Used</span>
          </h2>
          <p>The information collected is used solely to:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>Respond to freelance, contract, or full-time employment proposals.</li>
            <li>Schedule technical consultations and software architecture reviews.</li>
            <li>Diagnose site errors, monitor uptime, and maintain WCAG AA accessibility standards.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <span>4. Third-Party Links & External Services</span>
          </h2>
          <p>
            This portfolio contains links to external client deliverables, code repositories, Google Drive documents, and social profiles (e.g., GitHub, LinkedIn, WhatsApp). We are not responsible for the privacy practices of external third-party sites and recommend reading their respective policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-white">
            5. Contact Information
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to have your submitted contact message deleted from our records, please reach out directly:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm space-y-1 font-mono">
            <p className="text-white font-semibold">Anam Fatima — Full Stack Developer</p>
            <p className="text-slate-400">Email: <a href="mailto:anamdeveloper255@gmail.com" className="text-cyan-400 hover:underline">anamdeveloper255@gmail.com</a></p>
            <p className="text-slate-400">WhatsApp: <a href="https://wa.me/923218361368" className="text-cyan-400 hover:underline">03218361368 (+92 321 8361368)</a></p>
          </div>
        </section>

      </div>
    </div>
  );
};
