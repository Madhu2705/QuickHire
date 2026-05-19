import React from 'react';
import { Mail, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';
import { topHeaderInfo } from '../../data/homepageData';

const TopHeader = () => {
  return (
    <div className="bg-gradient-to-r from-violet-600 via-sky-600 to-cyan-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-3 text-sm font-medium">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <a href={`mailto:${topHeaderInfo.email}`} className="hover:text-slate-100 transition">
              {topHeaderInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <a href={`tel:${topHeaderInfo.phone}`} className="hover:text-slate-100 transition">
              {topHeaderInfo.phone}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {topHeaderInfo.socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.url}
                aria-label={social.label}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
