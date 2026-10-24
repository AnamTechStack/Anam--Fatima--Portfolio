import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Twitter, Linkedin, Check } from 'lucide-react';
import { api } from '../lib/api';
import { BlogPost, SiteSettings } from '../types';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      setLoading(true);
      try {
        const [postData, settingsData] = await Promise.all([
          api.getBlogPost(slug),
          api.getSettings()
        ]);
        setPost(postData);
        setSettings(settingsData);
      } catch (err) {
        console.error('Failed to load blog post:', err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
    if (slug) {
      api.trackEvent('pageview', `/blog/${slug}`);
    }
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-3xl font-heading font-bold text-white">Article Not Found</h1>
        <p className="text-slate-400 text-sm">
          The requested article could not be located or is not yet published.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button */}
      <div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>{post.category}</span>
          <span className="text-slate-600">·</span>
          <span>{post.readingTimeMinutes} min read</span>
          <span className="text-slate-600">·</span>
          <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white leading-tight text-balance">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author bar & share controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
              <img
                src={settings?.profileImage || '/uploads/anam_fatima_portrait.jpg'}
                alt={post.author}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{post.author}</p>
              <p className="text-[11px] text-slate-400 font-mono">Full Stack & SEO Specialist</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="Copy Link"
              className="p-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
              aria-label="Share on X"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      {post.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <img
            src={post.coverImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* Article Body Content */}
      <article className="prose prose-invert max-w-none text-slate-300 text-base leading-relaxed space-y-6">
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h2 key={idx} className="text-xl sm:text-2xl font-heading font-bold text-white pt-4">
                {paragraph.replace('### ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n- ');
            return (
              <ul key={idx} className="list-disc pl-5 space-y-1 text-slate-300">
                {items.map((item, i) => (
                  <li key={i}>{item.replace(/^- /, '')}</li>
                ))}
              </ul>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}
      </article>

      {/* Tags */}
      <div className="pt-6 border-t border-slate-800 flex items-center gap-2 flex-wrap">
        <span className="text-xs font-mono text-slate-500">Filed under:</span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-mono bg-slate-800/80 text-slate-300 rounded border border-slate-700/60"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Author Bio Box */}
      <div className="p-8 rounded-2xl bg-[#1E293B]/70 border border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-700">
          <img
            src={settings?.profileImage || '/uploads/anam_fatima_portrait.jpg'}
            alt={post.author}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-base font-heading font-semibold text-white">
            Written by {post.author}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {settings?.bio || 'Full Stack Developer & WordPress SEO Specialist passionate about performant web architectures and data-driven optimization.'}
          </p>
          <div className="pt-1">
            <Link to="/about" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">
              Read more about Anam's background →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
