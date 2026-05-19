import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import LatestJobsSection from '../components/home/LatestJobsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

const HomePage = () => {
  return (
    <div className="bg-slate-50 text-slate-950">
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUs />
        <LatestJobsSection />
        <TestimonialsSection />
      </main>
    </div>
  );
};

export default HomePage;
