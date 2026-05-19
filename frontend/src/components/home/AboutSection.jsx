import React from 'react';
import { motion } from 'framer-motion';
import { aboutFeatures } from '../../data/homepageData';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-sky-50 text-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
              Helping candidates land the next career move
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-950">
              We Help Candidates Build Successful Careers
            </h2>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              QuickHire blends intelligent matching, a polished resume experience, and modern job search tools to help candidates and employers move faster and more confidently.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {aboutFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-violet-600 text-white shadow-lg mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <a
              href="/register"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-600 to-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:scale-[1.01] transition"
            >
              Start Your Profile
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
