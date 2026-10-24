import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Code, X } from 'lucide-react';
import { api } from '../../lib/api';
import { Skill } from '../../types';

export const AdminSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend' as Skill['category'],
    description: '',
    proficiency: 90,
    yearsOfExperience: 3,
    iconName: 'Code',
    displayOrder: 1,
    isVisible: true
  });

  const loadSkills = async () => {
    setLoading(true);
    try {
      const data = await api.getSkills();
      setSkills(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Frontend',
      description: '',
      proficiency: 90,
      yearsOfExperience: 3,
      iconName: 'Code',
      displayOrder: skills.length + 1,
      isVisible: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (s: Skill) => {
    setEditingSkill(s);
    setFormData({
      name: s.name,
      category: s.category,
      description: s.description,
      proficiency: s.proficiency,
      yearsOfExperience: s.yearsOfExperience,
      iconName: s.iconName,
      displayOrder: s.displayOrder,
      isVisible: s.isVisible
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      if (editingSkill) {
        await api.updateSkill(editingSkill.id, formData);
      } else {
        await api.createSkill(formData);
      }
      setIsModalOpen(false);
      await loadSkills();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      await api.deleteSkill(id);
      await loadSkills();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Capabilities
          </span>
          <h1 className="text-2xl font-heading font-bold text-white mt-1">
            Skills & Competencies Manager
          </h1>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="rounded-2xl bg-[#1E293B]/70 border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Skill</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-center">Proficiency</th>
              <th className="py-3 px-4 text-center">Exp (Yrs)</th>
              <th className="py-3 px-4 text-center">Visible</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {skills.map((s) => (
              <tr key={s.id} className="hover:bg-slate-800/40">
                <td className="py-3.5 px-4 font-semibold text-white">
                  {s.name}
                  <div className="text-[11px] text-slate-400 font-normal">{s.description}</div>
                </td>
                <td className="py-3.5 px-4 font-mono text-cyan-400">{s.category}</td>
                <td className="py-3.5 px-4 text-center font-mono tabular-nums">{s.proficiency}%</td>
                <td className="py-3.5 px-4 text-center font-mono tabular-nums">{s.yearsOfExperience}y</td>
                <td className="py-3.5 px-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${s.isVisible ? 'bg-emerald-950/60 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                    {s.isVisible ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEditModal(s)} className="p-1.5 text-slate-400 hover:text-cyan-400">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 text-slate-400 hover:text-rose-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#1E293B] border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold text-white">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="WordPress">WordPress</option>
                  <option value="Databases & APIs">Databases & APIs</option>
                  <option value="SEO">SEO</option>
                  <option value="Tools & Workflow">Tools & Workflow</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Proficiency ({formData.proficiency}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={formData.proficiency}
                    onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value, 10) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Years of Exp</label>
                  <input
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  id="vis"
                  className="rounded"
                />
                <label htmlFor="vis" className="text-white">Visible on Public Site</label>
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
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
