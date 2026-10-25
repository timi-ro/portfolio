import { resume } from '@/data/resume';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export default function About() {
  return (
    <section id="about" aria-label="About" className="scroll-mt-16 pt-8 lg:pt-0">
      <SectionHeading>About</SectionHeading>
      <div className="space-y-5 text-[17px] leading-relaxed text-muted">
        {resume.personalInfo.about.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <p>{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
