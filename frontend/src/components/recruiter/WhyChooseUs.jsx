import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, ClipboardList, Zap } from 'lucide-react';

const features = [
  {
    title: 'Smart Hiring',
    description: 'Find the right fit with data-driven shortlisting and intelligent role matching.',
    icon: Cpu
  },
  {
    title: 'AI Candidate Matching',
    description: 'Use machine learning to surface candidates who meet your goals faster.',
    icon: Sparkles
  },
  {
    title: 'Easy Job Posting',
    description: 'Publish roles in seconds with optimized templates and audience targeting.',
    icon: ClipboardList
  },
  {
    title: 'Real-Time Applications',
    description: 'Track candidate progress live and collaborate with your hiring team instantly.',
    icon: Zap
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Recruiter features</p>
          <h2 className="mt-4 text-4xl font-bold">Why QuickHire is the recruiter choice</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Designed to support hiring teams with fast job creation, candidate discovery, and collaborative selection tools.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-sky-400/30"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-lg">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
