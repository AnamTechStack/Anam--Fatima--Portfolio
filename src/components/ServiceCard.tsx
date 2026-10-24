import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Layers,
  Search,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code,
  Layers,
  Search,
  ShieldCheck,
  Sparkles
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = iconMap[service.iconName] || Layers;

  return (
    <div className="flex flex-col justify-between p-6 sm:p-8 bg-[#1E293B]/70 border border-slate-800 rounded-2xl hover:border-slate-700 hover:bg-[#1E293B] transition-all">
      <div>
        <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/40 text-cyan-400 flex items-center justify-center mb-6">
          <IconComponent className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-heading font-semibold text-white mb-3">
          {service.title}
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="space-y-2.5 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Deliverables & Capabilities:
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
        <div>
          <span className="block text-[11px] text-slate-400 font-mono">Scope & Investment</span>
          <span className="text-xs font-semibold text-white">{service.startingPrice || 'Flexible project rates'}</span>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all"
        >
          <span>{service.ctaText || 'Inquire'}</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
