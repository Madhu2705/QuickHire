import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const NewsletterSection = () => {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="py-24 bg-gradient-to-r from-violet-700 via-sky-600 to-cyan-500 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-10 shadow-2xl shadow-slate-900/25 backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                <Mail size={16} /> Newsletter
              </span>
              <h2 className="mt-6 text-4xl font-bold">Stay ahead with curated job alerts</h2>
              <p className="mt-4 max-w-xl text-lg text-slate-100">Subscribe to get weekly updates on the latest roles, company news, and talent trends.</p>
            </div>

            <form className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 shadow-sm shadow-slate-900/10">
              <div className="flex flex-col gap-4 sm:flex-row">
                <label className="sr-only" htmlFor="newsletter-email">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-3xl border border-white/20 bg-white/15 px-5 py-4 text-slate-950 placeholder:text-slate-500 outline-none focus:border-white focus:ring-4 focus:ring-white/20"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-3xl bg-white px-6 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/10 hover:bg-slate-100 transition"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-4 text-sm text-slate-200">No spam — just fresh job updates and hiring insights.</p>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsletterSection;
