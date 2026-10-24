import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  Mail,
  CheckCircle,
  ExternalLink,
  Layers,
  Sparkles,
  Zap,
  Code2
} from 'lucide-react';
import { api } from '../lib/api';
import { SiteSettings, Project, Service, Skill, Testimonial, BlogPost } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { ServiceCard } from '../components/ServiceCard';
import { SkillCard } from '../components/SkillCard';

export const HomePage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [sets, projs, srvs, sks, tests, blogs] = await Promise.all([
          api.getSettings(),
          api.getProjects(),
          api.getServices(),
          api.getSkills(),
          api.getTestimonials(),
          api.getBlogPosts()
        ]);
        setSettings(sets);
        setFeaturedProjects(projs.filter((p) => p.isFeatured));
        setServices(srvs.slice(0, 3));
        setSkills(sks.slice(0, 8));
        setTestimonials(tests.slice(0, 2));
        setRecentPosts(blogs.slice(0, 2));
      } catch (err) {
        console.error('Failed loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
    api.trackEvent('pageview', '/');
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const ownerName = settings?.ownerName || 'Anam Fatima';
  const headline = settings?.title || 'Full Stack Developer | WordPress Developer | SEO Specialist';
  const shortIntro = settings?.shortIntro || 'Engineering high-performance web systems, custom CMS architectures, and search-optimized experiences.';
  const isAvailable = settings?.availability?.isAvailable ?? true;
  const statusText = settings?.availability?.statusText || 'Available for Full-time Roles & High-Impact Contracts';

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      
      {/* 1. Hero Section (Split-Screen Hero with 1 dominant visual container) */}
      <section className="pt-8 md:pt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Availability status line */}
            <div className="flex items-center gap-2.5 text-xs font-mono">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAvailable ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isAvailable ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </span>
              <span className="text-slate-300">
                {statusText}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Hello, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">{ownerName}</span>.
            </h1>

            {/* Professional title subtitle */}
            <p className="text-base sm:text-lg font-mono text-cyan-400/90 font-medium">
              {headline}
            </p>

            {/* Short introduction copy */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {shortIntro}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/projects"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/30 transition-all flex items-center gap-2"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="px-5 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 hover:text-white border border-slate-700/80 rounded-lg transition-all"
              >
                Contact Me
              </Link>
              <a
                href={settings?.cvUrl || 'https://drive.google.com/file/d/1UXIU_UTu3Bl1gWbGD0ezrg00QSrYDrMK/view?usp=drive_link'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-lg flex items-center gap-1.5 transition-colors"
                title="View Resume on Google Drive"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>View CV (Drive)</span>
              </a>
              <Link
                to="/resume"
                className="px-3 py-2.5 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors"
              >
                Interactive CV
              </Link>
            </div>

            {/* Social verification bar */}
            <div className="pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-3 text-slate-400 text-xs">
              <span className="font-mono text-slate-500">Connect:</span>
              <a
                href={settings?.socials?.linkedin || 'https://www.linkedin.com/in/atechstack/'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
              >
                LinkedIn
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href="https://wa.me/923218361368"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors font-medium"
              >
                WhatsApp
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={settings?.socials?.facebook || 'https://web.facebook.com/ATechStack'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={settings?.socials?.instagram || 'https://www.instagram.com/atechstack/'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <a
                href={`mailto:${settings?.contact?.email || 'anamdeveloper255@gmail.com'}`}
                className="hover:text-white transition-colors"
              >
                Email
              </a>
            </div>
          </div>

          {/* Right Column: High-Fidelity Studio Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-blue-500/20 via-slate-800/40 to-slate-900 border border-slate-800/80 shadow-2xl">
              <img
                src={settings?.profileImage || '/uploads/anam_fatima_portrait.jpg'}
                alt={ownerName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top rounded-[22px]"
              />
              <div className="absolute inset-0 rounded-[22px] bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-30 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Full-width KPI / Engineering Standards Strip below split */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white font-mono tabular-nums">
              &lt;800ms
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Avg. Page Load Target
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-cyan-400 font-mono tabular-nums">
              99/100
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Core Web Vitals Benchmark
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white font-mono tabular-nums">
              4+ Years
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Engineering Experience
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-blue-400 font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Clean Semantic Standards
            </div>
          </div>
        </div>
      </section>

      {/* 2. Professional Introduction / Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1E293B]/40 border border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              The Engineering Creed
            </span>
            <h2 className="text-2xl font-heading font-bold text-white mt-2">
              Performance First. Zero Bloat. Maximum Impact.
            </h2>
          </div>
          <div className="md:col-span-2 space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              I believe modern web engineering has lost touch with speed and simplicity. Bulky visual page builders and unoptimized JavaScript frameworks routinely push multimegabyte bundles down users' connections.
            </p>
            <p>
              My approach focuses on clean semantic foundations, strict TypeScript contracts, modular Gutenberg architectures, and comprehensive technical SEO. The result is software that loads instantaneously, ranks higher in search engines, and converts visitors into loyal clients.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Selected Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
              Production Applications & Architectures
            </h2>
          </div>
          <Link
            to="/projects"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            <span>Browse All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 4. Core Services Offered */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Capabilities & Deliverables
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Engineering Solutions for Modern Brands
          </h2>
          <p className="text-slate-400 text-sm">
            From bespoke full-stack systems to custom WordPress theme architectures and technical search optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 5. Skills Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Technology Stack
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
              Skills, Frameworks & Core Competencies
            </h2>
          </div>
          <Link
            to="/skills"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            <span>View Full Skills Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* 6. Testimonials (Genuine Feedback) */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Client & Peer Endorsements
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              Trusted by Engineering Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="p-8 bg-[#1E293B]/70 border border-slate-800 rounded-2xl flex flex-col justify-between"
              >
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic mb-6">
                  "{test.content}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-cyan-300 font-bold text-sm">
                    {test.clientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {test.clientName}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {test.role} · {test.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Latest Articles (Blog Insights) */}
      {recentPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Technical Insights
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
                Articles on Performance & Architecture
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
            >
              <span>Read All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <article
                key={post.id}
                className="p-6 sm:p-8 bg-[#1E293B]/60 hover:bg-[#1E293B] border border-slate-800 rounded-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-2">
                    <span className="text-cyan-400">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTimeMinutes} min read</span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-white hover:text-cyan-300 transition-colors mb-2">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">
                    Published {new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 8. Contact Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 p-8 sm:p-14 text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Let's Collaborate
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white text-balance">
              Have a Project in Mind or an Open Engineering Position?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              I am always eager to discuss challenging full-stack engineering, bespoke WordPress developments, or technical SEO optimizations.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-6 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${settings?.contact?.email || 'anamdeveloper255@gmail.com'}`}
              className="px-6 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700/80 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Email Anam Directly</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
