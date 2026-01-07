'use client';

import { resume } from '@/data/resume';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechTag } from '@/components/ui/TechTag';
import { FadeInSection } from '@/components/ui/FadeInSection';

export default function Experience() {
  return (
    <section id="experience" className="relative bg-[#08080C] py-20">
      <div className="max-w-7xl mx-auto px-20">
        <FadeInSection>
          <SectionHeader label="EXPERIENCE" className="mb-10" />
        </FadeInSection>

        <div className="space-y-0">
          {resume.experience.map((exp, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <div className="border-t border-zinc-800 py-10 grid lg:grid-cols-[200px,1fr,300px] gap-12">
                {/* Date & Company */}
                <div>
                  <div className="text-xs tracking-[0.2em] text-zinc-600 mb-6">{exp.duration.toUpperCase()}</div>
                  <div className="text-2xl font-light text-white mb-2">{exp.company}</div>
                  <div className="text-sm text-zinc-600">Remote</div>
                </div>

                {/* Role & Highlights */}
                <div>
                  <div className="text-base font-medium text-cyan-500 mb-6">{exp.role}</div>
                  <div className="space-y-4">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="text-sm text-zinc-500 flex items-start gap-3">
                        <span className="text-zinc-700 mt-1">◆</span>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 content-start">
                  {exp.technologies.map((tech, i) => (
                    <TechTag key={i} tech={tech} />
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}