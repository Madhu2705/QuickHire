import React from 'react';
import { motion } from 'framer-motion';

const ContactHero = () => {
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
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Recruiter contact</p>
            <h1 className="text-5xl font-bold leading-tight">Talk to the hiring team that powers modern recruiting.</h1>
            <p className="max-w-xl text-lg text-slate-300">Whether you want a demo, enterprise onboarding, or help with your hiring workflows, our recruiter support team is ready to connect.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40"
          >
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Reach out</p>
              <div>
                <p className="text-3xl font-semibold text-white">Recruiter support</p>
                <p className="mt-2 text-slate-400">Get a quick response from our recruiter success team.</p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 text-slate-200">
              <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Email</p>
                <p className="mt-2 text-lg font-semibold">recruiters@quickhire.io</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Phone</p>
                <p className="mt-2 text-lg font-semibold">+1 (555) 786-4490</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Office</p>
                <p className="mt-2 text-lg font-semibold">San Francisco, CA</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
