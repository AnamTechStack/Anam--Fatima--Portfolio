import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { api } from '../lib/api';
import { SiteSettings } from '../types';

export const PublicLayout: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    api.getSettings().then(setSettings).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-[#F8FAFC]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer settings={settings} />
    </div>
  );
};
