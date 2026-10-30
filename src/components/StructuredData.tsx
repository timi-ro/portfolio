import { resume } from '@/data/resume';

export function StructuredData() {
  const [current] = resume.experience;
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
      `https://${resume.personalInfo.stackoverflow}`,
      `https://${resume.personalInfo.medium}`,
    ],
    worksFor: {
      '@type': 'Organization',
      name: current.company,
      url: current.companyUrl,
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