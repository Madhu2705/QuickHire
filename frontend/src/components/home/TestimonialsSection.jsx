import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/homepageData';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Trusted stories</p>
          <h2 className="mt-4 text-4xl font-bold">What QuickHire users say</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Real feedback from candidates and recruiters who accelerate hiring with our platform.</p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-between">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group basis-1/3 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-900/20 backdrop-blur-xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-violet-500 text-white text-lg font-bold">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-slate-300">{item.role}</p>
                </div>
              </div>
              <p className="text-slate-200 leading-7">“{item.quote}”</p>
              <div className="mt-6 flex items-center gap-2 text-amber-300">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} size={16} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
