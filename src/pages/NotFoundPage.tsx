import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass, Layers, Mail } from 'lucide-react';
import { api } from '../lib/api';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    api.trackEvent('pageview', '/404');
  }, []);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-lg w-full text-center space-y-8 bg-[#1E293B]/60 p-8 sm:p-12 rounded-3xl border border-slate-800">
        
        {/* Visual 404 Badge */}
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded-full">
            HTTP 404 — Page Not Found
          </span>
          <div className="text-7xl sm:text-8xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
            404
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-heading font-bold text-white">
            Lost in the Stack?
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            The route or resource you are looking for has been relocated, refactored, or does not exist in this deployment.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/projects"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4" />
            <span>View Projects</span>
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Anam</span>
          </Link>
        </div>

        {/* Technical Footer */}
        <div className="pt-6 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
          Error Code: ROUTE_NOT_FOUND · ATS Diagnostic
        </div>
      </div>
    </div>
  );
};
