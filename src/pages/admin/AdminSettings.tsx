import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../../lib/api';
import { SiteSettings } from '../../types';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getSettings();
        setSettings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      await api.updateSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          System Configuration
        </span>
        <h1 className="text-2xl font-heading font-bold text-white mt-1">
          Portfolio & Global Site Settings
        </h1>
        <p className="text-xs text-slate-400">
          Update branding, hero text, contact information, availability badges, and SEO metadata.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Settings successfully saved and persisted to database.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        
        {/* Brand & Identity */}
        <section className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            Identity & Branding
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-mono mb-1">Brand Name</label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-mono mb-1">Owner Name</label>
              <input
                type="text"
                value={settings.ownerName}
                onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-mono mb-1">Professional Title</label>
              <input
                type="text"
                value={settings.title}
                onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-mono mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>
        </section>

        {/* Hero & Bio */}
        <section className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            Biographies & Approach
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-mono mb-1">Hero Short Introduction</label>
              <textarea
                rows={2}
                value={settings.shortIntro}
                onChange={(e) => setSettings({ ...settings, shortIntro: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-mono mb-1">Detailed Bio</label>
              <textarea
                rows={4}
                value={settings.bio}
                onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-mono mb-1">Development Approach</label>
              <textarea
                rows={3}
                value={settings.developmentApproach}
                onChange={(e) => setSettings({ ...settings, developmentApproach: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-mono mb-1">Profile Photo URL</label>
              <input
                type="text"
                value={settings.profileImage}
                onChange={(e) => setSettings({ ...settings, profileImage: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>
        </section>

        {/* Availability & Inquiries */}
        <section className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            Availability & Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="availCheck"
                checked={settings.availability.isAvailable}
                onChange={(e) => setSettings({
                  ...settings,
                  availability: { ...settings.availability, isAvailable: e.target.checked }
                })}
                className="rounded"
              />
              <label htmlFor="availCheck" className="text-white font-medium">Currently Available for New Roles & Engagements</label>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-mono mb-1">Availability Status Label</label>
              <input
                type="text"
                value={settings.availability.statusText}
                onChange={(e) => setSettings({
                  ...settings,
                  availability: { ...settings.availability, statusText: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-mono mb-1">Contact Email</label>
              <input
                type="email"
                value={settings.contact.email}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, email: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-mono mb-1">Location / Timezone</label>
              <input
                type="text"
                value={settings.contact.location}
                onChange={(e) => setSettings({
                  ...settings,
                  contact: { ...settings.contact, location: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="p-6 rounded-2xl bg-[#1E293B]/70 border border-slate-800 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 font-mono">
            Social Media & Code Profiles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-mono mb-1">GitHub URL</label>
              <input
                type="text"
                value={settings.socials.github}
                onChange={(e) => setSettings({
                  ...settings,
                  socials: { ...settings.socials, github: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-mono mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={settings.socials.linkedin}
                onChange={(e) => setSettings({
                  ...settings,
                  socials: { ...settings.socials, linkedin: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-mono mb-1">Twitter / X URL</label>
              <input
                type="text"
                value={settings.socials.twitter}
                onChange={(e) => setSettings({
                  ...settings,
                  socials: { ...settings.socials, twitter: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-mono mb-1">WhatsApp URL</label>
              <input
                type="text"
                value={settings.socials.whatsapp}
                onChange={(e) => setSettings({
                  ...settings,
                  socials: { ...settings.socials, whatsapp: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>
        </section>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs rounded-lg shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Persisting Changes...' : 'Save All Settings'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
