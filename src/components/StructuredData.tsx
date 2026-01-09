import { resume } from '@/data/resume';

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: resume.personalInfo.name,
    jobTitle: resume.personalInfo.role,
    description: resume.personalInfo.intro,
    email: resume.personalInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Istanbul',
      addressCountry: 'TR',
    },
    sameAs: [
      `https://${resume.personalInfo.linkedin}`,
      `https://${resume.personalInfo.github}`,
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Backend Software Engineering',
    },
    knowsAbout: resume.skills.map(skill => skill.name),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}