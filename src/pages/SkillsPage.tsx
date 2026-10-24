import React, { useEffect, useState, useMemo } from 'react';
import { Search, Layers, RefreshCw } from 'lucide-react';
import { api } from '../lib/api';
import { Skill } from '../types';
import { SkillCard } from '../components/SkillCard';

export const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadSkills() {
      try {
        const data = await api.getSkills();
        setSkills(data);
      } catch (err) {
        console.error('Failed to load skills:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSkills();
    api.trackEvent('pageview', '/skills');
  }, []);

  const categories = useMemo(() => {
    return ['All', 'Frontend', 'Backend', 'WordPress', 'Databases & APIs', 'SEO', 'Tools & Workflow'];
  }, []);

  const filteredSkills = useMemo(() => {
    return skills.filter((s) => {
      const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [skills, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-4 max-w-2xl">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          Technical Capabilities
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white text-balance">
          Skills, Tools & Engineering Stack
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          A transparent self-assessment of technical competencies across full-stack engineering, WordPress systems, and technical search engine optimization.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#1E293B]/70 border border-slate-800">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills, tools, frameworks..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl bg-[#1E293B]/40 border border-dashed border-slate-800 space-y-4">
          <Layers className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">No skills match your filter</h3>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}

      {/* Engineering Philosophy Callout */}
      <div className="p-8 rounded-2xl bg-[#1E293B]/50 border border-slate-800 text-slate-300 text-sm leading-relaxed space-y-2">
        <h3 className="text-white font-heading font-semibold text-base">
          Philosophy on Tooling & Proficiency
        </h3>
        <p>
          I view frameworks and libraries as ephemeral tools in service of fundamental computer science principles: cache invalidation, algorithmic efficiency, semantic accessibility, and user-centric latency minimization.
        </p>
      </div>

    </div>
  );
};
