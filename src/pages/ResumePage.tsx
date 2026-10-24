import React, { useEffect, useState } from 'react';
import { Download, Printer, CheckCircle2, ArrowRight } from 'lucide-react';
import { api } from '../lib/api';
import { SiteSettings, Experience, Education, Certification, Skill } from '../types';

export const ResumePage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResume() {
      try {
        const [sets, exps, edus, certs, sks] = await Promise.all([
          api.getSettings(),
          api.getExperience(),
          api.getEducation(),
          api.getCertifications(),
          api.getSkills()
        ]);
        setSettings(sets);
        setExperiences(exps);
        setEducations(edus);
        setCertifications(certs);
        setSkills(sks);
      } catch (err) {
        console.error('Failed to load resume:', err);
      } finally {
        setLoading(false);
      }
    }
    loadResume();
    api.trackEvent('pageview', '/resume');
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const driveCvUrl = settings?.cvUrl || 'https://drive.google.com/file/d/1UXIU_UTu3Bl1gWbGD0ezrg00QSrYDrMK/view?usp=drive_link';

  const handleDownload = () => {
    api.trackEvent('download_cv', '/resume');
    window.open(driveCvUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const ownerName = settings?.ownerName || 'Anam Fatima';
  const headline = settings?.title || 'Full Stack Developer | WordPress Developer | SEO Specialist';
  const email = settings?.contact?.email || 'anamdeveloper255@gmail.com';
  const phone = settings?.contact?.phone || '03218361368';
  const location = settings?.contact?.location || 'Remote / Worldwide';
  const bio = settings?.bio || 'Full Stack Developer with expertise in scalable web applications, bespoke WordPress engineering, and technical search engine optimization.';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Curriculum Vitae
          </span>
          <h1 className="text-3xl font-heading font-extrabold text-white mt-1">
            Professional Resume
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print</span>
          </button>
          <a
            href={driveCvUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => api.trackEvent('download_cv', '/resume')}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>View CV (Google Drive)</span>
          </a>
        </div>
      </div>

      {/* Main Resume Paper Container */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#1E293B]/80 border border-slate-800 text-slate-300 space-y-10 shadow-xl print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        
        {/* Header Block */}
        <div className="border-b border-slate-700/80 pb-8 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white print:text-black">
            {ownerName}
          </h2>
          <p className="text-base font-mono text-cyan-400 print:text-blue-700 font-semibold">
            {headline}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 print:text-slate-600 pt-2 font-mono">
            <span>{email}</span>
            <span>·</span>
            <span>{phone}</span>
            <span>·</span>
            <span>{location}</span>
            <span>·</span>
            <a href="https://github.com/anamfatima" target="_blank" rel="noreferrer" className="hover:underline">github.com/anamfatima</a>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-blue-700 font-bold">
            Executive Summary
          </h3>
          <p className="text-sm leading-relaxed text-slate-300 print:text-slate-800">
            {bio}
          </p>
        </div>

        {/* Core Competencies */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-blue-700 font-bold">
            Technical Competencies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {['Frontend', 'Backend', 'WordPress', 'Databases & APIs', 'SEO', 'Tools & Workflow'].map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              if (catSkills.length === 0) return null;
              return (
                <div key={cat} className="p-3 rounded-xl bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-200">
                  <div className="font-semibold text-white print:text-black mb-1">{cat}</div>
                  <div className="text-slate-400 print:text-slate-700 leading-snug">
                    {catSkills.map((s) => s.name).join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Professional Experience */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-blue-700 font-bold border-b border-slate-800 print:border-slate-200 pb-2">
            Professional Experience
          </h3>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                  <div>
                    <span className="font-bold text-white print:text-black">{exp.role}</span>
                    <span className="text-cyan-400 print:text-blue-700"> — {exp.company}</span>
                    <span className="text-slate-500"> ({exp.location})</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 print:text-slate-600">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300 print:text-slate-800">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 print:text-blue-700 font-bold">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Credentials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800 print:border-slate-200">
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-blue-700 font-bold">
              Education
            </h3>
            {educations.map((edu) => (
              <div key={edu.id} className="text-xs space-y-1">
                <div className="font-bold text-white print:text-black">{edu.degree}</div>
                <div className="text-slate-400 print:text-slate-600">{edu.institution} ({edu.startYear} – {edu.endYear})</div>
                <p className="text-slate-400 print:text-slate-700">{edu.details}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-blue-700 font-bold">
              Certifications
            </h3>
            {certifications.map((cert) => (
              <div key={cert.id} className="text-xs space-y-0.5">
                <div className="font-bold text-white print:text-black">{cert.title}</div>
                <div className="text-slate-400 print:text-slate-600">{cert.issuer} · {cert.issueDate}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
