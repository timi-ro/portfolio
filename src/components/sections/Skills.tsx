'use client';

import { useMemo } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { resume } from '@/data/resume';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { GeometricPattern } from '@/components/ui/patterns/GeometricPattern';

export default function Skills() {
  // Memoize expensive skills grouping calculation
  const skillsByCategory = useMemo(() => {
    return resume.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill.name);
      return acc;
    }, {} as Record<string, string[]>);
  }, []);

  // Define order of categories
  const categoryOrder = useMemo(() => [
    'AI & LLM',
    'Backend',
    'Frontend',
    'Database',
    'Architecture',
    'DevOps',
    'Data Engineering',
    'Monitoring',
    'Testing',
    'Cloud',
    'Leadership'
  ], []);

  const skillCategories = useMemo(() => {
    return categoryOrder
      .filter(category => skillsByCategory[category])
      .map(category => ({
        title: category,
        skills: skillsByCategory[category]
      }));
  }, [categoryOrder, skillsByCategory]);

  return (
    <section id="skills" className="relative bg-[#0A0A0F] py-20">
      {/* Decorative geometric shape */}
      <GeometricPattern className="left-16 top-48" />

      <div className="max-w-7xl mx-auto px-20 relative z-10">
        <FadeInSection>
          <SectionHeader label="EXPERTISE" className="mb-20" />
        </FadeInSection>

        <div className="grid lg:grid-cols-3 gap-12">
          {skillCategories.map((category, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <div>
                <div className="text-lg font-light text-white mb-4">{category.title}</div>
                <div className="w-full h-px bg-zinc-800 mb-6"></div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <SkillBadge key={i} skill={skill} />
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