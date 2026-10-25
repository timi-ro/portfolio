import { Fragment } from 'react';
import { resume } from '@/data/resume';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const categoryOrder = [
  'AI & LLM',
  'Backend',
  'Frontend',
  'Database',
  'Architecture',
  'DevOps',
  'Data Engineering',
  'Cloud',
  'Integrations',
  'Monitoring',
  'Testing',
  'Leadership',
];

// Display names for categories whose data key is shorter
const categoryLabels: Record<string, string> = {
  Integrations: 'Auth & Integrations',
  Monitoring: 'Monitoring & Security',
};

export default function Skills() {
  const skillsByCategory = resume.skills.reduce((acc, skill) => {
    (acc[skill.category] ??= []).push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  const categories = categoryOrder.filter((category) => skillsByCategory[category]);

  return (
    <section id="skills" aria-label="Skills" className="scroll-mt-16 pt-24">
      <SectionHeading>Skills</SectionHeading>

      <dl className="divide-y divide-line border-y border-line">
        {categories.map((category, i) => (
          <Reveal
            key={category}
            delay={Math.min(i * 0.05, 0.3)}
            className="grid gap-x-8 gap-y-1 py-4 sm:grid-cols-[8.5rem_1fr]"
          >
            <dt className="text-sm font-medium text-ink sm:pt-px">{categoryLabels[category] ?? category}</dt>
            <dd className="text-[15px] leading-relaxed text-muted">
              {skillsByCategory[category].map((skill, i) => (
                <Fragment key={skill}>
                  {i > 0 && <span className="text-accent-2"> · </span>}
                  {skill}
                </Fragment>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
