'use client';

import { lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import { SectionLoader } from '@/components/ui/SectionLoader';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

// Lazy load sections below the fold for better initial load performance
const About = lazy(() => import('@/components/sections/About'));
const Experience = lazy(() => import('@/components/sections/Experience'));
const Skills = lazy(() => import('@/components/sections/Skills'));
const Contact = lazy(() => import('@/components/sections/Contact'));

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <Hero />

      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Experience />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>

      <ScrollToTop />
    </div>
  );
}
