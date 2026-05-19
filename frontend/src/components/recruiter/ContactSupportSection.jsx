import React from 'react';
import { Mail, Headphones } from 'lucide-react';

const ContactSupportSection = () => {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Recruiter support</p>
            <h2 className="mt-4 text-4xl font-bold">We’re here for your hiring needs</h2>
            <p className="mt-4 text-slate-300">Get fast help from our recruiter success team whenever you need product support, onboarding guidance, or feature recommendations.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[2rem] bg-white/5 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-500 text-white">
                <Headphones size={24} />
              </div>
              <p className="text-lg font-semibold text-white">Dedicated account support</p>
              <p className="mt-3 text-slate-300">Personal onboarding and strategy help for teams scaling hiring across roles.</p>
            </div>
            <div className="rounded-[2rem] bg-white/5 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-500 text-white">
                <Mail size={24} />
              </div>
              <p className="text-lg font-semibold text-white">Priority recruiter inbox</p>
              <p className="mt-3 text-slate-300">Reach us with feature requests, hiring questions, and application workflow support.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupportSection;
