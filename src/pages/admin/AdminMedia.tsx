import React, { useEffect, useState, useRef } from 'react';
import { Upload, Copy, Check, Trash2, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { api } from '../../lib/api';
import { MediaAsset } from '../../types';

export const AdminMedia: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await api.getMedia();
      setMediaList(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit.');
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        await api.uploadMedia({
          fileName: file.name,
          base64Data,
          altText: file.name.replace(/\.[^/.]+$/, '')
        });
        await loadMedia();
      } catch (err: any) {
        alert(err.message || 'Upload failed');
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this asset from storage?')) {
      try {
        await api.deleteMedia(id);
        await loadMedia();
      } catch (e) {
        alert('Failed to delete asset');
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Assets & Files
          </span>
          <h1 className="text-2xl font-heading font-bold text-white mt-1">
            Media Library
          </h1>
          <p className="text-xs text-slate-400">
            Upload and manage project thumbnails, diagrams, and profile portraits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp,image/svg+xml,application/pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Processing File...' : 'Upload Image / Asset'}</span>
          </button>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : mediaList.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#1E293B]/60 border border-slate-800 text-slate-400 space-y-2">
          <ImageIcon className="w-8 h-8 mx-auto text-slate-600" />
          <p className="text-sm">No media files stored yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaList.map((asset) => (
            <div
              key={asset.id}
              className="group rounded-2xl bg-[#1E293B]/70 border border-slate-800 overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-video w-full bg-slate-900 relative overflow-hidden">
                <img
                  src={asset.url}
                  alt={asset.altText}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-4 space-y-2">
                <div className="text-xs font-semibold text-white truncate" title={asset.fileName}>
                  {asset.fileName}
                </div>
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>{(asset.fileSize / 1024).toFixed(0)} KB</span>
                  <span>{new Date(asset.uploadedAt).toLocaleDateString()}</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleCopy(asset.url, asset.id)}
                    className="p-1.5 text-slate-300 hover:text-cyan-400 rounded bg-slate-800 flex items-center gap-1"
                    title="Copy Public URL"
                  >
                    {copiedId === asset.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[11px]">{copiedId === asset.id ? 'Copied' : 'Copy URL'}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(asset.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded bg-slate-800"
                    title="Delete File"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
