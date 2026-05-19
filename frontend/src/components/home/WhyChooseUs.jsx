import React from 'react';
import { motion } from 'framer-motion';
import { whyFeatures, statsBadge, appHighlights } from '../../data/homepageData';
import { Star, MapPin, CalendarDays } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <span className="inline-flex items-center rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
              Why Choose QuickHire
            </span>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              QuickHire brings AI-powered matching, verified employer networks, and a secure experience so both candidates and recruiters reach goals faster.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {whyFeatures.map((feature) => (
                <div key={feature} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                  <p className="font-semibold text-slate-900 mb-2">{feature}</p>
                  <p className="text-slate-500 text-sm">Experience fast outcomes backed by a trusted sourcing platform.</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {appHighlights.map((highlight) => {
                const Icon = highlight.icon;
                return (
                  <div key={highlight.title} className="flex items-start gap-4 rounded-3xl bg-slate-950/5 p-5">
                    <span className="mt-1 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-600">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">{highlight.title}</h3>
                      <p className="text-slate-600">{highlight.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-sky-200/60 blur-3xl" />
            <div className="absolute right-0 bottom-10 h-32 w-32 rounded-full bg-violet-300/60 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
              <div className="flex items-center justify-between gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-950/95 p-6 text-white shadow-lg">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-300">Active base</p>
                  <p className="mt-3 text-3xl font-bold">50K+</p>
                </div>
                <div className="rounded-3xl bg-white/10 px-4 py-3 text-sm">Active Users</div>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-100 p-6">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-white">
                      <Star size={20} />
                    </span>
                    <div>
                      <p className="text-lg font-semibold text-slate-950">Premium hiring experience</p>
                      <p className="text-slate-600">Effortless application tracking for every role.</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
                    <div className="font-semibold text-slate-950">Fast Hiring</div>
                    <p className="mt-2">Hiring cycles that move at pace with real world demand.</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
                    <div className="font-semibold text-slate-950">Trusted Companies</div>
                    <p className="mt-2">Verified employers with real open roles and fast response.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
