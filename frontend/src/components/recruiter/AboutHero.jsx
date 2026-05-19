import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Sparkles } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-indigo-600 to-violet-700 px-6 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_40%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">
              <Sparkles size={16} /> Recruiter-first hiring platform
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Connecting Recruiters With Top Talent
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-100/90">
              QuickHire helps hiring teams discover, shortlist, and hire exceptional candidates with intelligent matching, streamlined workflows, and powerful recruitment tools.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/recruiter/post-job"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 transition"
              >
                Post a Job
              </a>
              <a
                href="/recruiter/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition"
              >
                View Dashboard
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
              <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-sky-300/25 blur-3xl" />
              <div className="absolute left-6 bottom-12 h-24 w-24 rounded-full bg-violet-400/20 blur-3xl" />
              <div className="space-y-6">
                <div className="rounded-[1.5rem] bg-slate-950/95 p-8 text-white shadow-lg">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="inline-flex rounded-3xl bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">Live roles</span>
                    <span className="inline-flex items-center gap-2 rounded-3xl bg-sky-500/20 px-3 py-2 text-sm text-sky-100">
                      <Briefcase size={16} /> 120+ new
                    </span>
                  </div>
                  <div className="rounded-[1.5rem] bg-white/10 p-6">
                    <div className="mb-4 h-44 rounded-3xl bg-gradient-to-br from-sky-500 to-violet-500" />
                    <p className="text-sm text-slate-300">Candidate pipelines, quick reviews, and priority job promotion all in one recruiter console.</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: 'Fast posting', value: '2 min setup' },
                    { title: 'Top candidates', value: 'AI curated' }
                  ].map((item) => (
                    <div key={item.title} className="rounded-3xl border border-white/10 bg-white/10 p-5 text-slate-100">
                      <p className="text-sm text-slate-300">{item.title}</p>
                      <p className="mt-2 text-xl font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
