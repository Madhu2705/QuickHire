import React from 'react';
import RecruiterAboutHero from './RecruiterAboutHero';
import CompanyIntro from './CompanyIntro';
import WhyChooseUs from './WhyChooseUs';
import RecruitmentTimeline from './RecruitmentTimeline';
import TeamSection from './TeamSection';
import TestimonialsSlider from './TestimonialsSlider';
import RecruiterCTASection from './RecruiterCTASection';

const RecruiterAboutPage = () => {
  return (
    <main className="bg-slate-950 text-slate-100">
      <RecruiterAboutHero />

      <CompanyIntro />
      <WhyChooseUs />
      <RecruitmentTimeline />
      <TeamSection />
      <TestimonialsSlider />
      <RecruiterCTASection />
    </main>
  );
};

export default RecruiterAboutPage;
