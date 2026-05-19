import React from 'react';
import { motion } from 'framer-motion';
import { serviceCards } from '../../data/homepageData';

const ServicesSection = () => {
  return (
    <section id="companies" className="relative overflow-hidden bg-slate-950 text-white py-24">
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-slate-900/70 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Premium career tools</p>
          <h2 className="mt-4 text-4xl font-bold">Tools Designed to Move Your Career Forward</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">QuickHire gives you the modern toolkit for job search, employer insights, resume power, and interview preparation.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {serviceCards.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-sky-400/20"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-violet-600 text-white shadow-lg">
                  <Icon size={24} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-slate-300 mb-6">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
