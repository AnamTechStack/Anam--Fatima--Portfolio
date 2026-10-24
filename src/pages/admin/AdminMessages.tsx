import React, { useEffect, useState } from 'react';
import { Mail, Search, Check, Trash2, Archive, RefreshCw, MailOpen } from 'lucide-react';
import { api } from '../../lib/api';
import { ContactMessage } from '../../types';

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminMessages();
      setMessages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const toggleRead = async (msg: ContactMessage) => {
    try {
      const updated = await api.updateAdminMessage(msg.id, { isRead: !msg.isRead });
      setMessages(messages.map((m) => (m.id === msg.id ? updated : m)));
      if (activeMessage?.id === msg.id) setActiveMessage(updated);
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const toggleArchive = async (msg: ContactMessage) => {
    try {
      const updated = await api.updateAdminMessage(msg.id, { isArchived: !msg.isArchived });
      setMessages(messages.map((m) => (m.id === msg.id ? updated : m)));
      if (activeMessage?.id === msg.id) setActiveMessage(updated);
    } catch (e) {
      alert('Failed to update archive state');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Permanently delete this inquiry?')) {
      try {
        await api.deleteAdminMessage(id);
        setMessages(messages.filter((m) => m.id !== id));
        if (activeMessage?.id === id) setActiveMessage(null);
      } catch (e) {
        alert('Failed to delete message');
      }
    }
  };

  const filtered = messages.filter((m) => {
    if (filter === 'unread' && m.isRead) return false;
    if (filter === 'archived' && !m.isArchived) return false;
    if (filter === 'all' && m.isArchived) return false;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Inquiries
          </span>
          <h1 className="text-2xl font-heading font-bold text-white mt-1">
            Contact Inbox
          </h1>
          <p className="text-xs text-slate-400">
            Private communications received via the website contact form.
          </p>
        </div>

        <button
          onClick={loadMessages}
          className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 bg-[#1E293B]/70 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Active Inbox ({messages.filter((m) => !m.isArchived).length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-lg ${filter === 'unread' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Unread ({messages.filter((m) => !m.isRead && !m.isArchived).length})
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`px-3 py-1.5 rounded-lg ${filter === 'archived' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Archived ({messages.filter((m) => m.isArchived).length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
          />
        </div>
      </div>

      {/* Two-Pane Workspace: List on left, details on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[400px]">
        
        {/* Messages List */}
        <div className="lg:col-span-5 rounded-2xl bg-[#1E293B]/70 border border-slate-800 overflow-hidden divide-y divide-slate-800/80">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No inquiries found in this view.
            </div>
          ) : (
            filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setActiveMessage(msg);
                  if (!msg.isRead) toggleRead(msg);
                }}
                className={`p-4 cursor-pointer transition-colors ${
                  activeMessage?.id === msg.id ? 'bg-blue-900/30' : 'hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-semibold ${!msg.isRead ? 'text-cyan-300 font-bold' : 'text-slate-200'}`}>
                    {msg.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs text-white font-medium truncate mb-1">
                  {msg.subject || 'General Inquiry'}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {msg.message}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Message Details Pane */}
        <div className="lg:col-span-7 rounded-2xl bg-[#1E293B]/70 border border-slate-800 p-6 flex flex-col justify-between">
          {activeMessage ? (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="border-b border-slate-800 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-heading font-bold text-white">
                    {activeMessage.subject || 'General Inquiry'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRead(activeMessage)}
                      className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800"
                      title={activeMessage.isRead ? 'Mark as Unread' : 'Mark as Read'}
                    >
                      {activeMessage.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => toggleArchive(activeMessage)}
                      className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800"
                      title={activeMessage.isArchived ? 'Unarchive' : 'Archive'}
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(activeMessage.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded bg-slate-800"
                      title="Delete Permanently"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-0.5">
                  <p><span className="text-slate-500 font-mono">From:</span> {activeMessage.name} &lt;<a href={`mailto:${activeMessage.email}`} className="text-cyan-400 hover:underline">{activeMessage.email}</a>&gt;</p>
                  <p><span className="text-slate-500 font-mono">Sent:</span> {new Date(activeMessage.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {activeMessage.message}
              </div>

              {/* Direct Reply Button */}
              <div className="pt-4">
                <a
                  href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject || 'Your Inquiry')}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email Client</span>
                </a>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs text-center p-8 space-y-2">
              <Mail className="w-8 h-8 text-slate-600" />
              <p>Select a message from the list to view its full contents and reply.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
