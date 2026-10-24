import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Sparkles } from 'lucide-react';
import { api } from '../../lib/api';
import { Service } from '../../types';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    iconName: 'Layers',
    features: 'Custom architecture, High performance, SEO-friendly',
    startingPrice: 'Project-based pricing',
    ctaText: 'Inquire Now',
    isPublished: true,
    displayOrder: 1
  });

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await api.getServices();
      setServices(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      iconName: 'Layers',
      features: 'Feature 1, Feature 2, Feature 3',
      startingPrice: 'Tailored quotation',
      ctaText: 'Discuss Scope',
      isPublished: true,
      displayOrder: services.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (srv: Service) => {
    setEditingService(srv);
    setFormData({
      title: srv.title,
      description: srv.description,
      iconName: srv.iconName,
      features: srv.features.join(', '),
      startingPrice: srv.startingPrice,
      ctaText: srv.ctaText,
      isPublished: srv.isPublished,
      displayOrder: srv.displayOrder
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const payload: Partial<Service> = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      iconName: formData.iconName,
      features: formData.features.split(',').map((f) => f.trim()).filter(Boolean),
      startingPrice: formData.startingPrice.trim(),
      ctaText: formData.ctaText.trim(),
      isPublished: formData.isPublished,
      displayOrder: Number(formData.displayOrder) || 1
    };

    try {
      if (editingService) {
        await api.updateService(editingService.id, payload);
      } else {
        await api.createService(payload);
      }
      setIsModalOpen(false);
      await loadServices();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this service?')) {
      await api.deleteService(id);
      await loadServices();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Services
          </span>
          <h1 className="text-2xl font-heading font-bold text-white mt-1">
            Services & Offerings Manager
          </h1>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.id} className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400">Order: {s.displayOrder}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${s.isPublished ? 'bg-emerald-950/60 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                  {s.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{s.description}</p>
              <ul className="text-xs text-slate-400 space-y-1 mb-4">
                {s.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400">{s.startingPrice}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => openEditModal(s)} className="p-1.5 text-slate-400 hover:text-cyan-400">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(s.id)} className="p-1.5 text-slate-400 hover:text-rose-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#1E293B] border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Deliverables & Features (comma-separated)</label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Starting Price / Scope</label>
                  <input
                    type="text"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-mono mb-1">CTA Label</label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  id="pub"
                  className="rounded"
                />
                <label htmlFor="pub" className="text-white">Publish Service</label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 rounded text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 rounded text-white font-semibold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
