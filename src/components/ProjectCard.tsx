import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col bg-[#1E293B]/70 hover:bg-[#1E293B] border border-slate-800/80 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-200">
      
      {/* Media Container with Live Preview Link */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <a
          href={project.liveUrl || `/projects/${project.slug}`}
          target={project.liveUrl ? '_blank' : '_self'}
          rel="noreferrer"
          className="block w-full h-full cursor-pointer"
          title={`Open ${project.title}`}
        >
          {!imgError ? (
            <img
              src={project.featuredImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400 p-6 text-center">
              <Layers className="w-8 h-8 text-slate-500 mb-2" />
              <p className="text-xs font-medium text-slate-300">{project.title}</p>
            </div>
          )}
        </a>

        {/* Quick action bar overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              title="Live Demo"
              aria-label={`Open ${project.title} live demo`}
              className="p-1.5 bg-slate-950/80 hover:bg-slate-950 text-white rounded-md backdrop-blur-sm transition-colors shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              title="Source Code"
              aria-label="Source Code"
              className="p-1.5 bg-slate-950/80 hover:bg-slate-950 text-white rounded-md backdrop-blur-sm transition-colors shadow-md"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-1">
        
        {/* Zero-Pill clean metadata with typographic separators */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-mono">
          <span className="text-cyan-400 font-medium">{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.completionDate ? new Date(project.completionDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '2026'}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-heading font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:underline flex items-center gap-1.5"
            >
              <span>{project.title}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
            </a>
          ) : (
            <Link to={`/projects/${project.slug}`} className="hover:underline">
              {project.title}
            </Link>
          )}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 font-mono mb-4">
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <React.Fragment key={tech}>
              <span className="text-slate-300">{tech}</span>
              {idx < Math.min(project.techStack.length, 4) - 1 && (
                <span className="text-slate-600" aria-hidden="true">/</span>
              )}
            </React.Fragment>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-slate-500">+{project.techStack.length - 4}</span>
          )}
        </div>

        {/* Primary View Project Action & Case Study Link */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold pt-3 border-t border-slate-800/80">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all text-xs font-medium"
            >
              <span>View Project</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-slate-500 text-xs">Proprietary Architecture</span>
          )}

          <Link
            to={`/projects/${project.slug}`}
            className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors text-xs ml-auto"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
