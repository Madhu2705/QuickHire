import React from 'react';
import { motion } from 'framer-motion';

const RecruiterAboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">For recruiters</p>
            <h1 className="text-5xl font-bold leading-tight">Empower hiring with a smarter recruiter experience.</h1>
            <p className="max-w-xl text-lg text-slate-300">QuickHire helps hiring teams surface qualified candidates faster and move hiring decisions forward with clarity.</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="/recruiter/contact" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400">
                Contact sales
              </a>
              <a href="/recruiter/about" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/15">
                Learn about QuickHire
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-slate-950/40"
          >
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Recruiter success</p>
              <div>
                <p className="text-3xl font-semibold text-white">Streamline candidate review and collaboration.</p>
                <p className="mt-2 text-slate-400">From posting roles to shortlisting finalists, QuickHire keeps each step aligned with your hiring goals.</p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 text-slate-200">
              <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Live hiring insights</p>
                <p className="mt-2 text-lg font-semibold">Track candidate flow in real time.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Team collaboration</p>
                <p className="mt-2 text-lg font-semibold">Share candidate feedback instantly.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RecruiterAboutHero;
