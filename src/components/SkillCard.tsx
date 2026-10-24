import React from 'react';
import {
  Code,
  FileCode,
  Layout,
  Server,
  Cpu,
  Layers,
  Boxes,
  Database,
  Search,
  GitBranch,
  ShieldCheck,
  Terminal,
  Globe
} from 'lucide-react';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code,
  FileCode,
  Layout,
  Server,
  Cpu,
  Layers,
  Boxes,
  Database,
  Search,
  GitBranch,
  ShieldCheck,
  Terminal,
  Globe
};

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const IconComponent = iconMap[skill.iconName] || Code;

  return (
    <div className="p-5 bg-[#1E293B]/70 border border-slate-800 rounded-xl hover:border-slate-700 hover:bg-[#1E293B] transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center">
            <IconComponent className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-xs font-mono text-slate-400">
            {skill.yearsOfExperience}y exp
          </span>
        </div>

        <h4 className="text-sm font-heading font-semibold text-white mb-1.5">
          {skill.name}
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          {skill.description}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
          <span>Proficiency</span>
          <span className="text-slate-200 tabular-nums">{skill.proficiency}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${skill.proficiency}%` }}
          />
        </div>
      </div>
    </div>
  );
};
