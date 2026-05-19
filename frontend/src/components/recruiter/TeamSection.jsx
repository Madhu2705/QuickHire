import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, MessageCircle } from 'lucide-react';

const team = [
  { name: 'Ariana Cole', role: 'Head of Talent', image: '', socials: ['linkedin', 'twitter'] },
  { name: 'Marcus Lee', role: 'Recruitment Lead', image: '', socials: ['linkedin'] },
  { name: 'Sara Nguyen', role: 'Hiring Operations', image: '', socials: ['twitter'] }
];

const iconMap = {
  linkedin: Linkedin,
  twitter: Twitter,
  message: MessageCircle
};

const TeamSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Recruiter leadership</p>
          <h2 className="mt-4 text-4xl font-bold text-slate-950">Meet the team behind hiring success</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">A collaborative team that builds the tools and workflows recruiters need every day.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
            >
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-sky-500 to-violet-500 text-white text-2xl font-bold">
                {member.name.split(' ').map((part) => part[0]).join('')}
              </div>
              <h3 className="text-2xl font-semibold text-slate-950">{member.name}</h3>
              <p className="mt-2 text-slate-600">{member.role}</p>
              <div className="mt-6 flex items-center gap-3">
                {member.socials.map((network) => {
                  const Icon = iconMap[network] || MessageCircle;
                  return (
                    <button
                      key={network}
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-white text-slate-700 shadow-sm hover:bg-slate-100 transition"
                      aria-label={network}
                    >
                      <Icon size={18} />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
