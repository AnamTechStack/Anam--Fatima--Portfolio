import React, { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Star,
  Check,
  X,
  ExternalLink,
  Github,
  Layers,
  AlertCircle
} from 'lucide-react';
import { api } from '../../lib/api';
import { Project } from '../../types';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    featuredImage: '/uploads/project_enterprise_saas.jpg',
    category: 'Full Stack Development',
    techStack: 'React, TypeScript, Node.js',
    status: 'completed' as 'completed' | 'in-progress' | 'planned',
    isFeatured: false,
    isPublished: true,
    completionDate: '2026-03-01',
    liveUrl: '',
    githubUrl: '',
    challenges: '',
    implementationDetails: '',
    keyFeatures: 'Real-time telemetry, RBAC permissions, Sub-second queries',
    displayOrder: 1,
    seoTitle: '',
    seoDescription: ''
  });

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      featuredImage: '/uploads/project_enterprise_saas.jpg',
      category: 'Full Stack Development',
      techStack: 'React, TypeScript, Tailwind CSS',
      status: 'completed',
      isFeatured: false,
      isPublished: true,
      completionDate: new Date().toISOString().split('T')[0],
      liveUrl: '',
      githubUrl: '',
      challenges: '',
      implementationDetails: '',
      keyFeatures: 'High performance, Scalable schema, Accessible UI',
      displayOrder: projects.length + 1,
      seoTitle: '',
      seoDescription: ''
    });
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      featuredImage: p.featuredImage,
      category: p.category,
      techStack: p.techStack.join(', '),
      status: p.status,
      isFeatured: p.isFeatured,
      isPublished: p.isPublished,
      completionDate: p.completionDate,
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl,
      challenges: p.challenges,
      implementationDetails: p.implementationDetails,
      keyFeatures: p.keyFeatures.join(', '),
      displayOrder: p.displayOrder,
      seoTitle: p.seoTitle,
      seoDescription: p.seoDescription
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    setSubmitting(true);
    setError(null);

    const payload: Partial<Project> = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortDescription: formData.shortDescription.trim(),
      fullDescription: formData.fullDescription.trim(),
      featuredImage: formData.featuredImage.trim() || '/uploads/project_enterprise_saas.jpg',
      category: formData.category,
      techStack: formData.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      status: formData.status,
      isFeatured: formData.isFeatured,
      isPublished: formData.isPublished,
      completionDate: formData.completionDate,
      liveUrl: formData.liveUrl.trim(),
      githubUrl: formData.githubUrl.trim(),
      challenges: formData.challenges.trim(),
      implementationDetails: formData.implementationDetails.trim(),
      keyFeatures: formData.keyFeatures.split(',').map((s) => s.trim()).filter(Boolean),
      displayOrder: Number(formData.displayOrder) || 1,
      seoTitle: formData.seoTitle.trim() || formData.title.trim(),
      seoDescription: formData.seoDescription.trim() || formData.shortDescription.trim()
    };

    try {
      if (editingProject?.id) {
        await api.updateProject(editingProject.id, payload);
      } else {
        await api.createProject(payload);
      }
      setIsModalOpen(false);
      await loadProjects();
    } catch (err: any) {
      setError(err.message || 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteProject(id);
      setDeleteConfirmId(null);
      await loadProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to delete project');
    }
  };

  const togglePublish = async (p: Project) => {
    try {
      await api.updateProject(p.id, { isPublished: !p.isPublished });
      await loadProjects();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const toggleFeatured = async (p: Project) => {
    try {
      await api.updateProject(p.id, { isFeatured: !p.isFeatured });
      await loadProjects();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Content Management
          </span>
          <h1 className="text-2xl font-heading font-bold text-white mt-1">
            Projects Portfolio Manager
          </h1>
          <p className="text-xs text-slate-400">
            Create, edit, publish/unpublish, and order case studies across the public website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#1E293B]/60 border border-slate-800 text-slate-400 space-y-3">
          <Layers className="w-8 h-8 mx-auto text-slate-600" />
          <p className="text-sm">No projects currently exist in the database.</p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg"
          >
            Create First Project
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#1E293B]/70 border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Title & Slug</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Tech Stack</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4 text-center">Order</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{p.title}</div>
                      <div className="text-[11px] font-mono text-cyan-400">/{p.slug}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      {p.category}
                    </td>
                    <td className="py-3.5 px-4 text-[11px] font-mono text-slate-400 max-w-[200px] truncate">
                      {p.techStack.join(', ')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => togglePublish(p)}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                          p.isPublished
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {p.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleFeatured(p)}
                        className={`p-1 rounded transition-colors ${
                          p.isFeatured ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono tabular-nums">
                      {p.displayOrder}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 rounded hover:bg-slate-800"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {deleteConfirmId === p.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="px-2 py-1 bg-rose-600 text-white rounded text-[10px] font-semibold"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-[10px]"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl my-8 p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-heading font-bold text-white">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Title */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-slate-300">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-slate-300">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. pulseanalytics-suite"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-slate-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="WordPress Development">WordPress Development</option>
                    <option value="SEO & Performance">SEO & Performance</option>
                    <option value="API Integration">API Integration</option>
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-slate-300">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>

                {/* Featured Image URL */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-300">Featured Image URL</label>
                  <input
                    type="text"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Tech Stack */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-300">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    placeholder="React, TypeScript, Node.js, PostgreSQL"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Short Description */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-300">Short Summary</label>
                  <textarea
                    rows={2}
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Full Description */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-300">Full Architecture Description</label>
                  <textarea
                    rows={4}
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Challenges & Solutions */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-300">Technical Challenges & Solutions</label>
                  <textarea
                    rows={2}
                    value={formData.challenges}
                    onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Key Features */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-300">Key Features (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.keyFeatures}
                    onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Live URL */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-slate-300">Live Demo URL</label>
                  <input
                    type="text"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* GitHub URL */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-slate-300">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Display Order */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-slate-300">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Release Date */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-slate-300">Completion Date</label>
                  <input
                    type="date"
                    value={formData.completionDate}
                    onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Checkboxes: isPublished & isFeatured */}
                <div className="flex items-center gap-6 sm:col-span-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-white">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                    />
                    <span>Publish Immediately</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-white">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                    />
                    <span>Mark as Featured (★ Home Page)</span>
                  </label>
                </div>

              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm"
                >
                  {submitting ? 'Saving...' : 'Save Project'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
