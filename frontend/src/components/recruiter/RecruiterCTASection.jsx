import React from 'react';
import { motion } from 'framer-motion';

const RecruiterCTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-12 shadow-2xl shadow-slate-950/20 backdrop-blur-xl"
        >
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <div>
              <h2 className="mt-4 text-4xl font-bold">Give your recruiting team the tools to win.</h2>
              <p className="mt-4 max-w-2xl text-slate-300">Book a demo and see how QuickHire simplifies candidate sourcing, evaluation, and talent coordination.</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <a href="/recruiter/contact" className="rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400">
                Book a demo
              </a>
              <a href="/jobs" className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/15">
                View hiring roles
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecruiterCTASection;
