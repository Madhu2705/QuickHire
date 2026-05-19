import React from 'react';
import { Heart, Linkedin, Github, Mail, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4 mb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-2xl font-bold text-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-violet-500 text-white">
                Q
              </div>
              QuickHire
            </div>
            <p className="text-sm text-slate-400">
              QuickHire helps candidates and recruiters move faster with trusted hiring workflows and polished career tools.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition"><Github size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition"><Instagram size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition"><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400 mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/jobs" className="hover:text-white transition">Jobs</a></li>
              <li><a href="/recruiter/about" className="hover:text-white transition">About</a></li>
              <li><a href="/recruiter/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400 mb-5">Support</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400 mb-5">Contact</h4>
            <p className="text-sm text-slate-300">hello@quickhire.com</p>
            <p className="text-sm text-slate-300 mt-2">+1 (800) 555-0199</p>
            <p className="text-sm text-slate-300 mt-2">123 Career Ave, New York, NY</p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-sm text-slate-500 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} QuickHire. Made with <Heart size={14} className="inline text-sky-500" /> for ambitious professionals.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
