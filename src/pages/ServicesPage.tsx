import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { api } from '../lib/api';
import { Service } from '../types';
import { ServiceCard } from '../components/ServiceCard';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await api.getServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
    api.trackEvent('pageview', '/services');
  }, []);

  const workflowSteps = [
    {
      num: '01',
      title: 'Strategy, Scoping & Requirements',
      desc: 'Deep-dive discovery to analyze business objectives, technical constraints, search landscape, and user persona requirements.'
    },
    {
      num: '02',
      title: 'Architecture & System Design',
      desc: 'Defining normalized database schemas, modular component hierarchies, API contracts, and responsive layout foundations.'
    },
    {
      num: '03',
      title: 'Clean Engineering & CMS Integration',
      desc: 'Strict TypeScript and modern PHP coding with zero page-builder bloat, high security standards, and WCAG AA compliance.'
    },
    {
      num: '04',
      title: 'Core Web Vitals & Search Audit',
      desc: 'Benchmarking performance under simulated network throttling to ensure 95+ PageSpeed scores and valid JSON-LD schema.'
    },
    {
      num: '05',
      title: 'Deployment & Continuous Reliability',
      desc: 'Automated CI/CD deployment, server cache configuration, automated database backups, and client CMS walkthrough.'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          Services & Engagements
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white text-balance">
          High-Impact Engineering & Technical SEO
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Partner with Anam Fatima for bespoke full-stack applications, custom WordPress theme architectures, and data-backed technical SEO audits.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Structured Work Process (Clean Editorial Numbering, no slop) */}
      <section className="space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Methodology
          </span>
          <h2 className="text-2xl font-heading font-bold text-white mt-1">
            Proven Engineering & Delivery Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {workflowSteps.map((step) => (
            <div key={step.num} className="p-6 rounded-2xl bg-[#1E293B]/60 border border-slate-800 space-y-3">
              <span className="text-2xl font-mono font-bold text-cyan-400/80">
                {step.num}
              </span>
              <h3 className="text-sm font-heading font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/50 via-slate-900 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
            Need a Custom Architecture or Audit?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl">
            Whether you have detailed specifications or are exploring technical feasibility, let's schedule an initial technical discussion.
          </p>
        </div>
        <Link
          to="/contact"
          className="px-6 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-all whitespace-nowrap flex items-center gap-2"
        >
          <span>Book a Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
