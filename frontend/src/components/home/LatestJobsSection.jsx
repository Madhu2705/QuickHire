import React from 'react';
import { motion } from 'framer-motion';
import { latestJobs } from '../../data/homepageData';
import { MapPin, DollarSign } from 'lucide-react';

const LatestJobsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Latest openings</p>
          <h2 className="mt-4 text-4xl font-bold text-slate-950">Explore top jobs today</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Browse our featured roles from leading companies and apply to the opportunities that match your ambitions.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {latestJobs.map((job, idx) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex h-14 w-14 items-center justify-center rounded-3xl text-white ${job.logoColor}`}>
                  {job.company.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">{job.company}</p>
                  <p className="text-lg font-semibold text-slate-950">{job.title}</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="flex items-center gap-2 text-slate-600 text-sm">
                  <MapPin size={16} /> {job.location}
                </p>
                <p className="flex items-center gap-2 text-slate-600 text-sm">
                  <DollarSign size={16} /> {job.salary}
                </p>
              </div>
              <button className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:scale-[1.01] transition">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestJobsSection;
