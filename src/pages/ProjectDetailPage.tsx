import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { api } from '../lib/api';
import { Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    async function loadProject() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await api.getProject(slug);
        setProject(data);
        setActiveImage(data.featuredImage);

        // Fetch related projects
        const allProjs = await api.getProjects();
        const related = allProjs
          .filter((p) => p.id !== data.id && (p.category === data.category || p.techStack.some((t) => data.techStack.includes(t))))
          .slice(0, 2);
        setRelatedProjects(related);
      } catch (err) {
        console.error('Project not found:', err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
    if (slug) {
      api.trackEvent('pageview', `/projects/${slug}`);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-heading font-bold text-white">Project Not Found</h1>
        <p className="text-slate-400 text-sm">
          The requested project case study could not be found or has not been published yet.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects Archive</span>
        </Link>
      </div>
    );
  }

  const gallery = [project.featuredImage, ...(project.galleryImages || [])].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Back button */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects Archive</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>{project.category}</span>
          <span className="text-slate-600">·</span>
          <span>Status: {project.status.toUpperCase()}</span>
          <span className="text-slate-600">·</span>
          <span>Completed: {project.completionDate}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white text-balance leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <span>Live Demonstration</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* Gallery & Showcase Image */}
      <div className="space-y-4">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
          <img
            src={activeImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Thumbnail Selector if multiple images */}
        {gallery.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  activeImage === img ? 'border-cyan-400 opacity-100' : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Deep-Dive Grid: Details, Tech Stack & Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Detailed Overview */}
          <section className="space-y-3">
            <h2 className="text-xl font-heading font-bold text-white border-b border-slate-800 pb-3">
              Project Architecture & Overview
            </h2>
            <div className="text-slate-300 text-sm leading-relaxed space-y-4">
              <p>{project.fullDescription}</p>
            </div>
          </section>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-heading font-bold text-white border-b border-slate-800 pb-3">
                Key Architectural Features
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
                {project.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1E293B]/50 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Challenges & Solutions */}
          {project.challenges && (
            <section className="space-y-3">
              <h2 className="text-xl font-heading font-bold text-white border-b border-slate-800 pb-3">
                Challenges Overcome
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.challenges}
              </p>
            </section>
          )}

          {/* Implementation Details */}
          {project.implementationDetails && (
            <section className="space-y-3">
              <h2 className="text-xl font-heading font-bold text-white border-b border-slate-800 pb-3">
                Implementation Details
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.implementationDetails}
              </p>
            </section>
          )}

        </div>

        {/* Sidebar Column: Tech Stack & Specs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 space-y-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-3">
              Technical Specifications
            </h3>

            {/* Tech Stack */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-mono">Technologies Used:</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono bg-slate-800 text-slate-200 rounded-md border border-slate-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Status */}
            <div className="space-y-1 text-xs font-mono">
              <span className="text-slate-400">Status:</span>
              <p className="text-slate-200 capitalize">{project.status}</p>
            </div>

            {/* Completion */}
            <div className="space-y-1 text-xs font-mono">
              <span className="text-slate-400">Release Date:</span>
              <p className="text-slate-200">{project.completionDate}</p>
            </div>

            {/* Inquire CTA */}
            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 mb-3">
                Need a similar full-stack application or custom WordPress architecture?
              </p>
              <Link
                to="/contact"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Discuss Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="pt-12 border-t border-slate-800 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-white">
            Related Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
