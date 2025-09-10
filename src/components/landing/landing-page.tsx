'use client';

import { useState, useEffect } from 'react';
import { Preloader } from './preloader';
import { HeroSection } from './hero-section';
import { AboutSection } from './about-section';
import { FeaturesSection } from './features-section';
import { TestimonialsSection } from './testimonials-section';
import { FooterSection } from './footer-section';

export function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Preloader />}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FooterSection />
      </div>
    </>
  );
}