import React from 'react';

const ContactFormSection = () => {
  return (
    <section className="py-24 bg-sky-50 text-slate-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-[2rem] border border-sky-200 bg-white p-10 shadow-2xl shadow-slate-900/10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-500">Send a message</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-950">Schedule a recruiter consultation</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">Tell us about your hiring needs and we’ll connect you with the right recruiter success specialist.</p>
          </div>

          <form className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  type="text"
                  className="mt-3 w-full rounded-3xl border border-sky-200 bg-slate-50 px-5 py-4 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  className="mt-3 w-full rounded-3xl border border-sky-200 bg-slate-50 px-5 py-4 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                  placeholder="you@company.com"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Company</span>
              <input
                type="text"
                className="mt-3 w-full rounded-3xl border border-sky-200 bg-slate-50 px-5 py-4 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                placeholder="Company name"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">How can we help?</span>
              <textarea
                rows="5"
                className="mt-3 w-full rounded-3xl border border-sky-200 bg-slate-50 px-5 py-4 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                placeholder="Share your hiring goals, team size, and timeline."
              />
            </label>

            <button type="submit" className="inline-flex items-center justify-center rounded-full bg-sky-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-500">
              Send inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
