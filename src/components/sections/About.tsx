'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { DotsPattern } from '@/components/ui/patterns/DotsPattern';
import { CirclesPattern } from '@/components/ui/patterns/CirclesPattern';

export default function About() {
  return (
    <section id="about" className="relative bg-[#0A0A0F] py-20">
      {/* Dots pattern */}
      <DotsPattern />

      {/* Decorative circles */}
      <CirclesPattern className="right-20 top-24" />

      <div className="max-w-7xl mx-auto px-20 relative z-10">
        <div className="grid lg:grid-cols-[400px,1fr] gap-20">
          {/* Left - Title */}
          <FadeInSection>
            <div>
              <SectionHeader label="ABOUT" className="mb-12" />
              <h2 className="text-5xl font-extralight text-white leading-tight">
                  Crafting Clean, Scalable Backend Architecture
              </h2>
            </div>
          </FadeInSection>

          {/* Right - Content */}
          <FadeInSection delay={0.2}>
            <div className="space-y-8 text-lg font-light text-zinc-400 leading-relaxed">
              <p>
                I'm a <span className="text-white">Backend Software Engineer</span> with 7+ years of expertise
                in building high-performance web applications.
              </p>
              <p>
                At RetreatGuru, I refactored monolithic WordPress application into modern
                <span className="text-cyan-500"> Laravel architecture with Docker and Kubernetes</span>,
                improving performance by ~43%. I've built PHP ETL pipelines extracting AWS S3 backups
                and transforming data for BI and marketing analytics.
              </p>
              <p>
                I believe in clean code, comprehensive testing (85%+ coverage), and establishing
                architectural patterns that reduce code review time by 40% while maintaining
                high quality standards using PSR-12 and PHPStan level 8.
              </p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}