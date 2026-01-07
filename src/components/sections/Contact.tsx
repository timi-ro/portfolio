'use client';

import { resume } from '@/data/resume';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { ContactForm } from '@/components/ui/ContactForm';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { CirclesPattern } from '@/components/ui/patterns/CirclesPattern';

export default function Contact() {
  const { email, linkedin, github } = resume.personalInfo;

  return (
    <section id="contact" className="relative bg-[#08080C] py-32">
      {/* Decorative circles */}
      <CirclesPattern size={250} rings={[120, 80, 40]} opacity={0.1} className="left-20 top-70" />
      <CirclesPattern size={250} rings={[120, 80, 40]} opacity={0.1} className="right-20 top-70" />

      <div className="max-w-7xl mx-auto px-10 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeInSection>
            <SectionHeader label="GET IN TOUCH" className="mb-8" />
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h2 className="text-5xl font-extralight text-white mb-12">
              Let&apos;s build something
                <span className="text-5xl font-normal bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                    &nbsp;extraordinary
                </span>
            </h2>
          </FadeInSection>
        </div>

        {/* Contact Form */}
        <FadeInSection delay={0.2}>
          <ContactForm />
        </FadeInSection>

        {/* Social Links */}
        <FadeInSection delay={0.3}>
          <div className="mt-16 border-t border-zinc-800 pt-12">
            <p className="text-center text-zinc-500 text-sm mb-6">Or connect with me on</p>
            <SocialLinks
              linkedin={linkedin}
              github={github}
              email={email}
            />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}