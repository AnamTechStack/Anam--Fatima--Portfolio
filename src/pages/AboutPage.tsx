import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight, CheckCircle2, Award, GraduationCap, Briefcase } from 'lucide-react';
import { api } from '../lib/api';
import { SiteSettings, Experience, Education, Certification } from '../types';

export const AboutPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [sets, exps, edus, certs] = await Promise.all([
          api.getSettings(),
          api.getExperience(),
          api.getEducation(),
          api.getCertifications()
        ]);
        setSettings(sets);
        setExperiences(exps);
        setEducations(edus);
        setCertifications(certs);
      } catch (err) {
        console.error('Failed to load about data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
    api.trackEvent('pageview', '/about');
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const ownerName = settings?.ownerName || 'Anam Fatima';
  const bio = settings?.bio || 'Full Stack Developer & WordPress SEO Specialist.';
  const approach = settings?.developmentApproach || 'Semantic structure, zero-bloat architecture, and performance-first engineering.';
  const careerGoals = settings?.careerGoals || 'To architect resilient enterprise-grade applications and drive high search performance.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* 1. Header & Hero Bio */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            About Anam Fatima
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white text-balance leading-tight">
            Engineering Web Systems with Precision & Purpose
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            {bio}
          </p>
          <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono text-cyan-400">
              Core Technical Approach
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {approach}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-all flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/resume"
              className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>View Full CV</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm aspect-square rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
            <img
              src={settings?.profileImage || '/uploads/anam_fatima_portrait.jpg'}
              alt={ownerName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* 2. Career Goals & Tech Interests */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-[#1E293B]/60 border border-slate-800 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Trajectory
          </span>
          <h2 className="text-xl font-heading font-bold text-white">
            Career Goals & Vision
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {careerGoals}
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-[#1E293B]/60 border border-slate-800 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Focus Areas
          </span>
          <h2 className="text-xl font-heading font-bold text-white">
            Technical Interests & Specializations
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {settings?.techInterests || 'Modern React ecosystems, custom WordPress architectures, and high-performance technical SEO.'}
          </p>
        </div>
      </section>

      {/* 3. Experience Timeline */}
      <section className="space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Work History
          </span>
          <h2 className="text-2xl font-heading font-bold text-white mt-1">
            Professional Experience Timeline
          </h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#1E293B]/70 border border-slate-800 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-white">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-cyan-400 font-medium">
                    {exp.company} <span className="text-slate-500">·</span> {exp.location}
                  </p>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-slate-800/80 px-3 py-1 rounded-md self-start sm:self-auto">
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </div>
              </div>

              <ul className="space-y-2 text-sm text-slate-300">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-slate-400">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="bg-slate-800 px-2.5 py-1 rounded text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Education & Certifications */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Education */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Academic Background
            </span>
            <h2 className="text-xl font-heading font-bold text-white mt-1">
              Education
            </h2>
          </div>

          <div className="space-y-4">
            {educations.map((edu) => (
              <div key={edu.id} className="p-6 rounded-2xl bg-[#1E293B]/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">
                    {edu.degree}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    {edu.startYear} – {edu.endYear}
                  </span>
                </div>
                <p className="text-xs font-medium text-cyan-400">
                  {edu.institution} · {edu.location}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Credentials
            </span>
            <h2 className="text-xl font-heading font-bold text-white mt-1">
              Certifications & Accreditations
            </h2>
          </div>

          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-6 rounded-2xl bg-[#1E293B]/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">
                    {cert.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    {cert.issueDate}
                  </span>
                </div>
                <p className="text-xs font-medium text-cyan-400">
                  Issuer: {cert.issuer}
                </p>
                {cert.credentialId && (
                  <p className="text-[11px] font-mono text-slate-400">
                    Credential ID: {cert.credentialId}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
