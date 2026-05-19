import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Nicole Ramirez',
    title: 'Recruiting Manager',
    quote: 'QuickHire helped me reduce our time-to-hire by 40%. The candidate matching is incredibly precise.',
    rating: 5
  },
  {
    name: 'Derek Patel',
    title: 'Talent Acquisition Lead',
    quote: 'The dashboard keeps our team aligned and makes reviewing applications fast and intuitive.',
    rating: 5
  },
  {
    name: 'Hannah Kim',
    title: 'Head of People Ops',
    quote: 'The platform feels premium, and our hiring managers love the candidate insights.',
    rating: 5
  }
];

const TestimonialsSlider = () => {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Success stories</p>
          <h2 className="mt-4 text-4xl font-bold">Recruiter success stories</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Trusted by hiring teams who want better talent outcomes and faster decision-making.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-violet-500 text-white text-lg font-bold">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-slate-300">{item.title}</p>
                </div>
              </div>
              <p className="text-slate-200 leading-8">“{item.quote}”</p>
              <div className="mt-6 flex gap-1 text-amber-300">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={index} size={18} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
