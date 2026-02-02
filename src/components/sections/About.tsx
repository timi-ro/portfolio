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
                  Building RAG Systems & Intelligent APIs
              </h2>
            </div>
          </FadeInSection>

          {/* Right - Content */}
          <FadeInSection delay={0.2}>
            <div className="space-y-8 text-lg font-light text-zinc-400 leading-relaxed">
              <p>
                I'm a <span className="text-white">Backend Engineer expanding into AI Application Development</span>, leveraging
                6+ years of backend expertise to build intelligent systems.
              </p>
              <p>
                Currently building <span className="text-cyan-500">RAG systems with LangChain and vector databases</span>,
                AI-powered workflow automation (SmartOps Copilot, Rizon Prime), and intelligent APIs
                that integrate LLM capabilities into backend services.
              </p>
              <p>
                My foundation in <span className="text-cyan-500">Laravel, Symfony, API architecture, and microservices</span> combined
                with data engineering experience (ETL pipelines, Snowflake, analytics at scale) gives me
                a unique edge in building production-ready AI applications.
              </p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}