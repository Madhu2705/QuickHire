import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Clipboard, Eye, Award } from 'lucide-react';

const steps = [
  { title: 'Find the right company', description: 'Browse employer profiles and discover companies that match your values.', icon: UserPlus },
  { title: 'Explore open roles', description: 'Review job descriptions, requirements, and company culture before applying.', icon: Clipboard },
  { title: 'Submit your application', description: 'Send your resume, cover letter, and relevant details directly through QuickHire.', icon: Eye },
  { title: 'Track your progress', description: 'Stay updated as your application moves through review, interviews, and next steps.', icon: Award }
];

const RecruitmentTimeline = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Recruitment process</p>
          <h2 className="mt-4 text-4xl font-bold text-slate-950">A hiring process made for candidates</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Follow four simple steps to discover roles, apply confidently, and track your candidate journey.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-600">
                  <Icon size={24} />
                </div>
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Step {idx + 1}</span>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-slate-600">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecruitmentTimeline;
