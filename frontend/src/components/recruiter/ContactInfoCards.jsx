import React from 'react';
import { MapPin, Briefcase, ShieldCheck } from 'lucide-react';

const cards = [
  {
    title: 'Smart recruiter tools',
    description: 'Access candidate pipelines, bulk messaging, and shortlisting workflows all in one place.',
    icon: Briefcase
  },
  {
    title: 'Trusted hiring support',
    description: 'Work directly with our recruiter success specialists for faster onboarding and best practices.',
    icon: ShieldCheck
  },
  {
    title: 'Local consulting',
    description: 'Connect with our recruiting experts in regional hubs for tailored hiring campaigns.',
    icon: MapPin
  }
];

const ContactInfoCards = () => {
  return (
    <section className="py-20 bg-slate-950 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-3">
          {cards.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-500 text-white">
                <Icon size={28} />
              </div>
              <h3 className="text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-4 text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoCards;
