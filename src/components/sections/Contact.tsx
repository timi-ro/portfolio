import { resume } from '@/data/resume';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/ui/ContactForm';

export default function Contact() {
  const { email } = resume.personalInfo;

  return (
    <section id="contact" aria-label="Contact" className="scroll-mt-16 pt-24">
      <SectionHeading>Contact</SectionHeading>

      <Reveal>
        <p className="text-[17px] leading-relaxed text-muted">
          Whether it&apos;s a role, a project or a question about my work, I&apos;m happy to hear from you.
          Email is the quickest way to reach me:{' '}
          <a href={`mailto:${email}`} className="font-medium text-accent hover:underline underline-offset-4">
            {email}
          </a>
          . You can also send a message using the form below.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <ContactForm className="mt-10" />
      </Reveal>
    </section>
  );
}
