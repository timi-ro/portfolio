'use client';

import { resume } from '@/data/resume';
import Image from 'next/image';
import AsymmetricBlob from '@/components/AsymmetricBlob';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatCard } from '@/components/ui/StatCard';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { GridPattern } from '@/components/ui/patterns/GridPattern';
import { getAssetPath } from '@/lib/config';

export default function Hero() {
  const { name, role, location } = resume.personalInfo;

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0A0A0F] to-[#111118] pt-32 pb-20">
      {/* Grid pattern overlay */}
      <GridPattern />

      <div className="max-w-[1440px] mx-auto px-4 md:px-20 relative z-10">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12 pt-8 lg:pt-0">
          {/* Left Side - Content */}
          <div className="w-full lg:w-[55%] lg:max-w-[650px] space-y-8 pt-0 lg:pt-32">
            <FadeInSection delay={0.1}>
              <SectionHeader label={role} className="text-xs tracking-[0.25em] font-medium" />
            </FadeInSection>

            {/* Name - Large Typography */}
            <FadeInSection delay={0.2}>
              <div>
                <h1 className="text-7xl lg:text-[96px] font-extralight text-white leading-none mb-4">
                  Fatemeh
                </h1>
                <h1 className="text-7xl lg:text-[96px] font-normal bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 bg-clip-text text-transparent leading-none">
                  Rostami
                </h1>
              </div>
            </FadeInSection>

            {/* CTA Buttons */}
            <FadeInSection delay={0.3}>
              <div className="flex flex-wrap gap-4 pt-6">
                <Button href="#about" variant="primary">
                  About Me
                </Button>
                <Button href="#experience" variant="secondary">
                  My Experiences →
                </Button>
              </div>
            </FadeInSection>

            {/* Stats */}
            <FadeInSection delay={0.4}>
              <div className="pt-12">
                <div className="h-px bg-zinc-800 mb-8 max-w-[500px]"></div>
                <div className="grid grid-cols-3 gap-8 lg:gap-12 max-w-[500px]">
                  <StatCard value="7+" label="Years Experience" />
                  <StatCard value="86%" label="Test Coverage" />
                  <StatCard value="43%" label="Performance Gain" />
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Right Side - Asymmetric Profile Image */}
          <FadeInSection delay={0.2} direction="right" className="relative w-full lg:w-[500px] h-[400px] lg:h-[600px] flex-shrink-0 -mt-12 lg:-mt-8">
            <div className="absolute inset-0">
              <AsymmetricBlob />
            </div>

            {/* Profile Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[280px] h-[350px] lg:w-[450px] lg:h-[580px]">
                <Image
                  src={getAssetPath("/profile.png")}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 280px, 450px"
                  className="object-contain relative z-10"
                  style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.5))' }}
                  priority
                />
              </div>
            </div>

            {/* Location Badge */}
            <div className="absolute bottom-0 left-0 bg-[#0A0A0F] border border-zinc-800 px-6 lg:px-8 py-4 lg:py-6 z-20">
              <SectionHeader label="BASED IN" className="text-[10px] tracking-[0.3em] mb-2" />
              <div className="text-sm lg:text-base font-light text-white">{location}</div>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="text-[10px] tracking-[0.3em] text-zinc-600">SCROLL</div>
        <div className="w-px h-12 bg-zinc-600"></div>
      </div>
    </section>
  );
}
