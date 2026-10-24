import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Download, FileText, GraduationCap, Award, Briefcase } from 'lucide-react';
import { api } from '../../lib/api';
import { Experience, Education, Certification } from '../../types';

export const AdminResume: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  // Experience modal state
  const [expModal, setExpModal] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [expForm, setExpForm] = useState({
    role: '',
    company: '',
    location: 'Remote',
    startDate: '2024',
    endDate: 'Present',
    current: true,
    description: '',
    technologies: '',
    displayOrder: 1
  });

  // Education modal state
  const [eduModal, setEduModal] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [eduForm, setEduForm] = useState({
    degree: '',
    institution: '',
    location: 'Remote',
    startYear: '2018',
    endYear: '2022',
    details: '',
    displayOrder: 1
  });

  // Certification modal state
  const [certModal, setCertModal] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    issueDate: '2024',
    credentialId: '',
    credentialUrl: '',
    isVisible: true,
    displayOrder: 1
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [exps, edus, certs] = await Promise.all([
        api.getExperience(),
        api.getEducation(),
        api.getCertifications()
      ]);
      setExperiences(exps);
      setEducations(edus);
      setCertifications(certs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Experience Handlers
  const openExpModal = (exp?: Experience) => {
    if (exp) {
      setEditingExp(exp);
      setExpForm({
        role: exp.role,
        company: exp.company,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate,
        current: exp.current,
        description: exp.description.join('\n'),
        technologies: exp.technologies.join(', '),
        displayOrder: exp.displayOrder
      });
    } else {
      setEditingExp(null);
      setExpForm({
        role: '',
        company: '',
        location: 'Remote',
        startDate: '2024',
        endDate: 'Present',
        current: true,
        description: 'Lead engineering and deliver scalable web solutions.\nOptimize Core Web Vitals to sub-800ms load times.',
        technologies: 'React, TypeScript, Node.js',
        displayOrder: experiences.length + 1
      });
    }
    setExpModal(true);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      role: expForm.role.trim(),
      company: expForm.company.trim(),
      location: expForm.location.trim(),
      startDate: expForm.startDate.trim(),
      endDate: expForm.endDate.trim(),
      current: expForm.current,
      description: expForm.description.split('\n').filter(Boolean),
      technologies: expForm.technologies.split(',').map((s) => s.trim()).filter(Boolean),
      displayOrder: Number(expForm.displayOrder) || 1
    };

    try {
      if (editingExp) {
        await api.updateExperience(editingExp.id, payload);
      } else {
        await api.createExperience(payload);
      }
      setExpModal(false);
      await loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (confirm('Delete this experience entry?')) {
      await api.deleteExperience(id);
      await loadData();
    }
  };

  // Education Handlers
  const openEduModal = (edu?: Education) => {
    if (edu) {
      setEditingEdu(edu);
      setEduForm({
        degree: edu.degree,
        institution: edu.institution,
        location: edu.location,
        startYear: edu.startYear,
        endYear: edu.endYear,
        details: edu.details,
        displayOrder: edu.displayOrder
      });
    } else {
      setEditingEdu(null);
      setEduForm({
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University Department of Computer Science',
        location: 'Honors',
        startYear: '2018',
        endYear: '2022',
        details: 'Specialization in Software Engineering, Algorithms, and Distributed Systems.',
        displayOrder: educations.length + 1
      });
    }
    setEduModal(true);
  };

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      degree: eduForm.degree.trim(),
      institution: eduForm.institution.trim(),
      location: eduForm.location.trim(),
      startYear: eduForm.startYear.trim(),
      endYear: eduForm.endYear.trim(),
      details: eduForm.details.trim(),
      displayOrder: Number(eduForm.displayOrder) || 1
    };

    try {
      if (editingEdu) {
        await api.updateEducation(editingEdu.id, payload);
      } else {
        await api.createEducation(payload);
      }
      setEduModal(false);
      await loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteEdu = async (id: string) => {
    if (confirm('Delete this education entry?')) {
      await api.deleteEducation(id);
      await loadData();
    }
  };

  // Certification Handlers
  const openCertModal = (cert?: Certification) => {
    if (cert) {
      setEditingCert(cert);
      setCertForm({
        title: cert.title,
        issuer: cert.issuer,
        issueDate: cert.issueDate,
        credentialId: cert.credentialId || '',
        credentialUrl: cert.credentialUrl || '',
        isVisible: cert.isVisible,
        displayOrder: cert.displayOrder
      });
    } else {
      setEditingCert(null);
      setCertForm({
        title: '',
        issuer: '',
        issueDate: '2024',
        credentialId: '',
        credentialUrl: '',
        isVisible: true,
        displayOrder: certifications.length + 1
      });
    }
    setCertModal(true);
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: certForm.title.trim(),
      issuer: certForm.issuer.trim(),
      issueDate: certForm.issueDate.trim(),
      credentialId: certForm.credentialId.trim(),
      credentialUrl: certForm.credentialUrl.trim(),
      isVisible: certForm.isVisible,
      displayOrder: Number(certForm.displayOrder) || 1
    };

    try {
      if (editingCert) {
        await api.updateCertification(editingCert.id, payload);
      } else {
        await api.createCertification(payload);
      }
      setCertModal(false);
      await loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (confirm('Delete this certification?')) {
      await api.deleteCertification(id);
      await loadData();
    }
  };

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          Resume & Career History
        </span>
        <h1 className="text-2xl font-heading font-bold text-white mt-1">
          Experience, Education & Credentials Manager
        </h1>
        <p className="text-xs text-slate-400">
          All entries directly drive the public /about and /resume pages and printable CV.
        </p>
      </div>

      {/* 1. Work Experience Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-white font-mono uppercase">
              Work Experience ({experiences.length})
            </h2>
          </div>
          <button
            onClick={() => openExpModal()}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Position</span>
          </button>
        </div>

        <div className="space-y-3">
          {experiences.map((exp) => (
            <div key={exp.id} className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white text-sm">{exp.role}</h3>
                  <span className="text-cyan-400 text-xs font-mono">@{exp.company}</span>
                  <span className="text-slate-500 text-xs font-mono">({exp.startDate} – {exp.current ? 'Present' : exp.endDate})</span>
                </div>
                <ul className="text-xs text-slate-300 list-disc pl-4 space-y-0.5">
                  {exp.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
                <div className="text-[11px] font-mono text-slate-400">
                  Tech: {exp.technologies.join(', ')}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => openExpModal(exp)} className="p-1.5 text-slate-400 hover:text-cyan-400">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDeleteExp(exp.id)} className="p-1.5 text-slate-400 hover:text-rose-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Education Section */}
      <section className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-white font-mono uppercase">
              Academic Degrees & Education ({educations.length})
            </h2>
          </div>
          <button
            onClick={() => openEduModal()}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Degree</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {educations.map((edu) => (
            <div key={edu.id} className="p-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 flex items-start justify-between gap-4">
              <div className="space-y-1 text-xs">
                <h3 className="font-semibold text-white text-sm">{edu.degree}</h3>
                <p className="text-cyan-400 font-mono">{edu.institution} ({edu.startYear} – {edu.endYear})</p>
                <p className="text-slate-300 leading-relaxed">{edu.details}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEduModal(edu)} className="p-1.5 text-slate-400 hover:text-cyan-400">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDeleteEdu(edu.id)} className="p-1.5 text-slate-400 hover:text-rose-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Certifications Section */}
      <section className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-white font-mono uppercase">
              Certifications & Accreditations ({certifications.length})
            </h2>
          </div>
          <button
            onClick={() => openCertModal()}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="p-4 rounded-xl bg-[#1E293B]/70 border border-slate-800 flex flex-col justify-between">
              <div className="space-y-1 text-xs">
                <h3 className="font-semibold text-white text-xs">{cert.title}</h3>
                <p className="text-cyan-400 font-mono">{cert.issuer} · {cert.issueDate}</p>
                {cert.credentialId && (
                  <p className="text-[11px] font-mono text-slate-400">ID: {cert.credentialId}</p>
                )}
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button onClick={() => openCertModal(cert)} className="p-1 text-slate-400 hover:text-cyan-400">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDeleteCert(cert.id)} className="p-1 text-slate-400 hover:text-rose-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Modal */}
      {expModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#1E293B] border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold text-white">
                {editingExp ? 'Edit Work Position' : 'Add Work Position'}
              </h3>
              <button onClick={() => setExpModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveExp} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Role / Job Title *</label>
                  <input
                    type="text"
                    required
                    value={expForm.role}
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Start Year</label>
                  <input
                    type="text"
                    value={expForm.startDate}
                    onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-mono mb-1">End Year</label>
                  <input
                    type="text"
                    value={expForm.endDate}
                    onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Order</label>
                  <input
                    type="number"
                    value={expForm.displayOrder}
                    onChange={(e) => setExpForm({ ...expForm, displayOrder: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Accomplishments (one per line)</label>
                <textarea
                  rows={4}
                  value={expForm.description}
                  onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Technologies Used (comma-separated)</label>
                <input
                  type="text"
                  value={expForm.technologies}
                  onChange={(e) => setExpForm({ ...expForm, technologies: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setExpModal(false)}
                  className="px-3 py-1.5 bg-slate-800 rounded text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 rounded text-white font-semibold"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {eduModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#1E293B] border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold text-white">
                {editingEdu ? 'Edit Degree' : 'Add Degree'}
              </h3>
              <button onClick={() => setEduModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdu} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Degree Title *</label>
                <input
                  type="text"
                  required
                  value={eduForm.degree}
                  onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  value={eduForm.institution}
                  onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Start Year</label>
                  <input
                    type="text"
                    value={eduForm.startYear}
                    onChange={(e) => setEduForm({ ...eduForm, startYear: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-mono mb-1">End Year</label>
                  <input
                    type="text"
                    value={eduForm.endYear}
                    onChange={(e) => setEduForm({ ...eduForm, endYear: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Details & Specialization</label>
                <textarea
                  rows={3}
                  value={eduForm.details}
                  onChange={(e) => setEduForm({ ...eduForm, details: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEduModal(false)}
                  className="px-3 py-1.5 bg-slate-800 rounded text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 rounded text-white font-semibold"
                >
                  Save Degree
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {certModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#1E293B] border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold text-white">
                {editingCert ? 'Edit Certification' : 'Add Certification'}
              </h3>
              <button onClick={() => setCertModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Certification Title *</label>
                <input
                  type="text"
                  required
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Issuer *</label>
                  <input
                    type="text"
                    required
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-mono mb-1">Issue Year / Date</label>
                  <input
                    type="text"
                    value={certForm.issueDate}
                    onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Credential ID (optional)</label>
                <input
                  type="text"
                  value={certForm.credentialId}
                  onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCertModal(false)}
                  className="px-3 py-1.5 bg-slate-800 rounded text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 rounded text-white font-semibold"
                >
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
