import React from 'react';
import { Link } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  FileQuestion,
  ExternalLink,
  MessageCircle,
  Phone
} from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings?: SiteSettings | null;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = 2026;
  const email = settings?.contact?.email || 'anamdeveloper255@gmail.com';
  const phone = settings?.contact?.phone || '03218361368';
  const whatsappNumber = '923218361368';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Anam, I saw your portfolio and would like to discuss a project.')}`;
  
  const linkedin = settings?.socials?.linkedin || 'https://www.linkedin.com/in/atechstack/';
  const facebook = settings?.socials?.facebook || 'https://web.facebook.com/ATechStack';
  const instagram = settings?.socials?.instagram || 'https://www.instagram.com/atechstack/';
  const github = settings?.socials?.github || 'https://github.com/anamfatima';
  const cvUrl = settings?.cvUrl || 'https://drive.google.com/file/d/1UXIU_UTu3Bl1gWbGD0ezrg00QSrYDrMK/view?usp=drive_link';

  return (
    <footer className="w-full bg-[#0B1120] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
          
          {/* Brand & Identity Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-md shadow-blue-500/20">
                ATS
              </span>
              <span className="font-heading font-bold text-white text-lg">
                Anam Fatima
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Full Stack Developer & WordPress SEO Specialist engineering scalable web apps, custom CMS architectures, and high-performance search solutions.
            </p>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl border border-slate-700/80 shadow-sm transition-all text-xs font-semibold group"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span>WhatsApp: {phone}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>
            </div>

            {/* Professional Monochrome Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                aria-label="LinkedIn Profile"
                title="LinkedIn (atechstack)"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                aria-label="Facebook Page"
                title="Facebook (ATechStack)"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                aria-label="Instagram Profile"
                title="Instagram (atechstack)"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="w-9 h-9 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                aria-label="Send Email"
                title={`Email (${email})`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  About Anam
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-cyan-400 transition-colors">
                  Projects Showcase
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-cyan-400 transition-colors">
                  Skills & Tech Stack
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-cyan-400 transition-colors">
                  Technical Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resume & CV Link Section */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Resume & Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>View CV (Google Drive)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <Link to="/resume" className="hover:text-cyan-400 transition-colors">
                  Interactive Resume
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link to="/404" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <FileQuestion className="w-3.5 h-3.5 text-slate-500" />
                  <span>Status & 404</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Availability Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Direct Contact
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-mono text-slate-500 uppercase">Email Address</p>
                <a
                  href={`mailto:${email}`}
                  className="inline-block text-cyan-400 hover:text-cyan-300 font-medium text-xs break-all"
                >
                  {email}
                </a>
              </div>

              <div>
                <p className="text-[11px] font-mono text-slate-500 uppercase">WhatsApp & Phone</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-emerald-400 font-medium text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{phone}</span>
                </a>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs text-white bg-blue-600 hover:bg-blue-500 px-3.5 py-2 rounded-lg font-semibold shadow-sm transition-all"
                >
                  <span>Open Contact Form</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider & copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} Anam Fatima (ATS — Anam Tech Stack). All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/admin" className="hover:text-slate-300 transition-colors">
              Admin Portal
            </Link>
            <span aria-hidden="true">·</span>
            <span>WCAG AA Accessible</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
