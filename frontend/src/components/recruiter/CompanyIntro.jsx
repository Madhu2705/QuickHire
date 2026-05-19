import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, FileText } from 'lucide-react';

const stats = [
  { label: 'Recruiters', value: '10K+', icon: Users },
  { label: 'Candidates', value: '50K+', icon: Briefcase },
  { label: 'Jobs Posted', value: '100K+', icon: FileText }
];

const CompanyIntro = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] bg-gradient-to-br from-white to-slate-100 p-6 shadow-2xl shadow-slate-900/10"
        >
          <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="rounded-[1.75rem] overflow-hidden bg-slate-950 text-white shadow-xl">
            <div className="h-96 bg-[linear-gradient(160deg,#0f172a_0%,#2563eb_40%,#7c3aed_100%)]" />
            <div className="p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Recruiting intelligence</p>
              <h2 className="mt-5 text-3xl font-bold">Build a hiring engine that scales</h2>
              <p className="mt-4 text-slate-300">QuickHire provides the strategic tools you need to attract top talent, reduce time-to-hire, and keep every role moving forward.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="max-w-xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-500">Platform mission</p>
            <h3 className="text-4xl font-bold text-slate-950">A modern recruitment experience designed for growth-focused teams.</h3>
            <p className="text-lg leading-8 text-slate-600">From candidate discovery to final offer, QuickHire streamlines each recruiting step with powerful automation, live analytics, and collaborative hiring workflows.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-100 text-sky-700">
                    <Icon size={20} />
                  </div>
                  <p className="text-3xl font-semibold text-slate-950">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyIntro;
