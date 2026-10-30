import { resume } from '@/data/resume';

export function StructuredData() {
  const current = resume.experience.filter((exp) => exp.period.endsWith('Present'));
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
    worksFor: current.map((exp) => ({
      '@type': 'Organization',
      name: exp.company,
      url: exp.companyUrl,
    })),
    knowsAbout: resume.skills.map(skill => skill.name),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}