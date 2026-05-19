import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Users, Briefcase, ShieldCheck } from 'lucide-react';
import { heroStats } from '../../data/homepageData';

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-slate-950/5">
      <div className="absolute inset-x-0 -top-20 h-80 bg-gradient-to-r from-cyan-400/20 via-indigo-300/10 to-violet-500/20 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950">
              Find Your Dream Job With Ease
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              QuickHire connects ambitious candidates with trusted employers through a polished job search experience, smart career tools, and instant application workflows.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-violet-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 hover:scale-[1.02] transition"
              >
                Get Started
                <ArrowRight size={18} className="ml-2" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {heroStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm shadow-slate-200/50">
                    <div className="flex items-center gap-3 text-slate-900">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                        <Icon size={20} />
                      </span>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-500 via-violet-600 to-indigo-700 p-6 shadow-2xl shadow-slate-900/15">
              <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -right-10 top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <div className="relative grid gap-6 rounded-[1.75rem] border border-white/10 bg-white/10 p-6 text-white backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/75">Recruitment</p>
                    <h2 className="text-2xl font-bold">QuickHire Portal</h2>
                  </div>
                  <div className="rounded-3xl bg-white/15 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    Live
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-3xl bg-white/12 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-3xl bg-white/20 flex items-center justify-center">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-white/80">Top talent matched</p>
                        <p className="font-semibold text-white">Skill-based hiring</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-white/12 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-3xl bg-white/20 flex items-center justify-center">
                        <Users size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-white/80">Active network</p>
                        <p className="font-semibold text-white">Instant applications</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/20 bg-white/10 p-5">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/20 text-white">
                      <ShieldCheck size={20} />
                    </span>
                    <div>
                      <p className="text-sm text-white/80">Trusted by 5K+ companies</p>
                      <p className="text-lg font-semibold">Fast hiring outcomes</p>
                    </div>
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

export default HeroSection;
